
// correct tsup bug to compiled __dirmame 
// fix a bug in tsup parsing __dirname compilation

const fs = require('fs');

const filePath = './dist/index.js';
const originalContent = fs.readFileSync(filePath, 'utf8');

const replacePath = "process.cwd() + '/node_modules/tdewolffminify-webpack-plugin/node_modules/@tdewolff/minify'";

let updatedContent = originalContent.replace(
  /__dirname\s*=\s*_path\.dirname\.call\(void\s*0,\s*_url\.fileURLToPath\.call\(void\s*0,\s*importMetaUrl\)\);/,
  `__dirname = ${replacePath};`
);
updatedContent = updatedContent.replace(/var\s+version\s*=\s*require2\(".\/package.json"\)\.version;/, '');
fs.writeFileSync(filePath, updatedContent, 'utf8');

