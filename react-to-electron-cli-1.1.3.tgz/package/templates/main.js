const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const fs = require("fs");

// Register a secure custom protocol before app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true, // Turn ON for security
    },
  });

  const indexPath = path.join(__dirname, "client", "dist", "index.html");

  // Check if build output exists
  if (!fs.existsSync(indexPath)) {
    console.error("❌ Error: index.html not found at:", indexPath);
    console.log(
      'ℹ️ Please build your frontend first (e.g., run "npm run build" in client folder)'
    );
    app.quit();
    return;
  }

  // Setup custom protocol to load local files securely
  protocol.registerFileProtocol("app", (request, callback) => {
    const url = request.url.slice(6); // Remove "app://"
    const fullPath = path.join(__dirname, "client", "dist", ...url.split("/"));
    callback({ path: fullPath });
  });

  // Load the index.html via the custom protocol
  win.loadURL("app://./index.html");

  win.once("ready-to-show", () => {
    win.show();
    if (!app.isPackaged) {
      win.webContents.openDevTools(); // DevTools only in development
    }
  });

  win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error("❌ Failed to load page:", errorDescription);
  });
}

// App lifecycle
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
