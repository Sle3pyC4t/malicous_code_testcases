#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { promisify } from "util";
import stream from "stream";
import os from "os";
import fetch from "node-fetch";
import { createWriteStream } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = process.cwd();
const clientDir = path.join(rootDir, "client");
const templateDir = path.join(__dirname, "../templates");
const mainJsTemplate = path.join(templateDir, "main.js");
const installerTemplate = path.join(templateDir, "installer.nsi");
const installerOutPath = path.join(rootDir, "installer.nsi");
const pipeline = promisify(stream.pipeline);

async function moveReactFiles() {
  const allFiles = await fs.readdir(rootDir);
  await fs.ensureDir(clientDir);

  const exclude = [
    "client",
    "node_modules",
    "templates",
    "main.js",
    "installer.nsi",
    "dist",
  ];

  for (const file of allFiles) {
    if (!exclude.includes(file)) {
      await fs.move(path.join(rootDir, file), path.join(clientDir, file), {
        overwrite: true,
      });
    }
  }

  console.log(chalk.green("✅ React files moved to /client"));
}

async function buildReactApp() {
  const spinner = ora("📦 Installing and building React app...").start();
  try {
    execSync("npm install", { cwd: clientDir, stdio: "ignore" });
    execSync("npm run build", { cwd: clientDir });
    spinner.succeed("✅ React build completed");
  } catch (e) {
    spinner.fail("❌ React build failed");
    process.exit(1);
  }
}

async function installElectron() {
  const spinner = ora("⚡ Installing Electron...").start();
  try {
    execSync(
      "npm install electron @electron/packager concurrently vite electron-builder --save-dev",
      {
        cwd: rootDir,
      }
    );
    spinner.succeed("✅ Electron & dependencies installed");
  } catch (e) {
    spinner.fail("❌ Electron install failed");
    process.exit(1);
  }
}

async function updatePackageJson(appMeta) {
  const packageJsonPath = path.join(rootDir, "package.json");
  const content = {
    name: appMeta.name,
    version: appMeta.version,
    main: "main.js",
    scripts: {
      start: "electron .",
      dev: 'concurrently "vite" "electron ."',
      build: "electron-builder --win --x64",
      pack: "electron-builder --dir",
      dist: "electron-builder",
    },
    dependencies: {
      concurrently: "^9.1.2",
      vite: "^6.3.4",
    },
    devDependencies: {
      electron: "^36.0.1",
      "electron-builder": "^26.0.12",
    },
    build: {
      appId: `com.${appMeta.publisher
        .toLowerCase()
        .replace(/\s/g, "")}.${appMeta.name.toLowerCase().replace(/\s/g, "")}`,
      productName: appMeta.name,
      copyright: `Copyright © ${new Date().getFullYear()} ${appMeta.publisher}`,
      directories: {
        output: "dist",
      },
      files: ["main.js", "package.json", "client/dist/**/*"],
      win: {
        target: "nsis",
        icon: "build/icon.ico",
      },
      nsis: {
        oneClick: false,
        perMachine: true,
        allowToChangeInstallationDirectory: true,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: "Comprify POS",
      },
    },
  };

  await fs.writeJson(packageJsonPath, content, { spaces: 2 });
  console.log(chalk.green("✅ package.json configured"));
}

async function checkNSIS() {
  try {
    execSync("makensis /VERSION", { stdio: "ignore" });
    return true;
  } catch (_) {
    const { download } = await inquirer.prompt([
      {
        type: "confirm",
        name: "download",
        message: "NSIS not found. Download portable NSIS?",
        default: true,
      },
    ]);

    if (!download) return false;

    const spinner = ora("⬇️ Downloading NSIS...").start();
    try {
      const url =
        "https://sourceforge.net/projects/nsis/files/NSIS%203/3.09/nsis-3.09-portable.zip/download";
      const tempDir = os.tmpdir();
      const zipPath = path.join(tempDir, "nsis.zip");
      const extractPath = path.join(tempDir, "nsis");

      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      await pipeline(res.body, createWriteStream(zipPath));

      const AdmZip = (await import("adm-zip")).default;
      const zip = new AdmZip(zipPath);
      zip.extractAllTo(extractPath, true);

      const exePath = path.join(
        extractPath,
        "nsis-3.09-portable",
        "makensis.exe"
      );
      process.env.PATH += `;${path.dirname(exePath)}`;

      spinner.succeed("✅ NSIS ready");
      return true;
    } catch (e) {
      spinner.fail("❌ Failed to download NSIS");
      return false;
    }
  }
}

async function generateInstallerScript(details) {
  // Escape double quotes for NSIS, but don't alter spaces or characters in folder name
  const nsisSafeName = details.name.replace(/"/g, '\\"');
  const buildDirName = `${details.name}-win32-x64`; // Use the actual folder name as generated by electron-packager

  let content = await fs.readFile(installerTemplate, "utf8");
  content =
    `!define APP_NAME "${nsisSafeName}"\n` +
    `!define APP_VERSION "${details.version}"\n` +
    `!define APP_PUBLISHER "${details.publisher}"\n` +
    `!define APP_BUILD_DIR "${buildDirName}"\n` +
    content;

  await fs.writeFile(installerOutPath, content);
  console.log("✅ installer.nsi created");
}

async function buildElectronApp(appName) {
  console.log("🔨 Building Electron app...");

  execSync(
    `npx @electron/packager . "${appName}" --overwrite --platform=win32 --arch=x64 --out=dist --prune=true --ignore="^/client$|^/templates$|^/node_modules$|^/dist$"`,
    { stdio: "inherit" }
  );
}

async function makeInstaller() {
  console.log("📦 Creating installer...");
  execSync(`makensis ${installerOutPath}`, { stdio: "inherit" });
  console.log(chalk.green("\n🎉 Installer created successfully!"));
}

async function main() {
  console.log(chalk.cyanBright("🚀 React to Electron CLI\n"));

  await moveReactFiles();
  await buildReactApp();
  await installElectron();
  await fs.copy(mainJsTemplate, path.join(rootDir, "main.js"));

  const { wantInstaller } = await inquirer.prompt([
    {
      type: "confirm",
      name: "wantInstaller",
      message: "Do you want to generate an installer (.exe)?",
    },
  ]);

  if (wantInstaller) {
    const nsisReady = await checkNSIS();
    if (!nsisReady) return;

    const metadata = await inquirer.prompt([
      { name: "name", message: "App Name", default: "My Electron App" },
      { name: "version", message: "Version", default: "1.0.0" },
      { name: "publisher", message: "Publisher", default: "Your Company" },
    ]);

    await updatePackageJson(metadata);
    await generateInstallerScript(metadata);
    await buildElectronApp(metadata.name);
    await makeInstaller();
  }

  const { runNow } = await inquirer.prompt([
    {
      type: "confirm",
      name: "runNow",
      message: "Do you want to run the Electron app now?",
    },
  ]);

  if (runNow) {
    execSync("npx electron .", { stdio: "inherit" });
  } else {
    console.log(chalk.cyan("🎉 All done!"));
  }
}

main().catch((e) => {
  console.error(chalk.red("❌ Error:"), e);
  process.exit(1);
});
