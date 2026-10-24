// Copies the built plugin into deck/files/decky, where the installer picks it up.
import { copyFileSync, mkdirSync, rmSync } from "node:fs";

const target = "../deck/files/decky";
rmSync(target, { recursive: true, force: true });
mkdirSync(`${target}/dist`, { recursive: true });
for (const file of ["plugin.json", "package.json", "main.py"]) {
  copyFileSync(file, `${target}/${file}`);
}
copyFileSync("../LICENSE", `${target}/LICENSE`);
copyFileSync("dist/index.js", `${target}/dist/index.js`);
console.log(`Packaged into ${target}`);
