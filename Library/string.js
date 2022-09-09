// get a list of all unicode characters
var chars = [];
for (var i = 0; i < 65536; i++) {
    chars.push(String.fromCharCode(i));
}
console.log(`Characters: ${chars.join('')}`);