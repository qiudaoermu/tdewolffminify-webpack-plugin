const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const filePath = './dist/index.js';
const originalContent = fs.readFileSync(filePath, 'utf8');

// Parse the original code into an AST
const ast = parser.parse(originalContent, {
  sourceType: 'module',
});

// Traverse the AST and modify the necessary parts
traverse(ast, {
  VariableDeclaration(path) {
    const declarations = path.get('declarations');
    declarations.forEach((declaration) => {
      if (declaration.node.id.name === '__dirname') {
        const replacement = parser.parseExpression(
          "path.join(process.cwd(), 'node_modules/tdewolffminify-webpack-plugin/node_modules/@tdewolff/minify')"
        );
        declaration.node.init = replacement;
      }
    });
  },
  VariableDeclarator(path) {
    if (path.node.id.name === 'version') {
      path.parentPath.remove();
    }
  },
});

// Generate the updated code from the modified AST
const updatedCode = generator(ast).code;

// Write the updated code back to the file
fs.writeFileSync(filePath, updatedCode, 'utf8');

console.log('Shell.js execution completed');
