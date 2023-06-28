import { defineConfig } from "tsup";
import { exec } from 'child_process';
const scriptPath = './script/ast-replace.js';

export default defineConfig({
  onSuccess() {
    // Start some long running task
    // Like a server
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing shell script: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Shell script returned an error: ${stderr}`);
        return;
      }

      console.log(`Shell script output: ${stdout}`);
    });

  },
  entry: ["./index.ts"],
  bundle: true,
  format: ["esm", "cjs"],
  target: "node20",
  clean: true,
  dts: true,
  splitting: true,
  shims: true,
  platform: 'node',
});
