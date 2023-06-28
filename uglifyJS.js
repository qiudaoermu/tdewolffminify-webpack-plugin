const { RawSource } = require('webpack-sources');
const UglifyJS = require('uglify-js');
class Tdewolffminify {
  apply(compiler) {
    compiler.hooks.compilation.tap('Tdewolffminify', (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: 'Tdewolffminify',
          stage: compilation.constructor.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
        },
        async (assets) => {
          for (const assetName of Object.keys(assets)) {
            if (assetName.endsWith('.js')) {
              const asset = assets[assetName];
              const minifiedContent = this.minifyContent(asset.source());
              if (minifiedContent) {

                compilation.updateAsset(assetName, new RawSource(minifiedContent));
              }
            }
          }
        }
      );
    });
  }

  minifyContent(content) {
    // Perform minification here
    // Return the minified content
    const minified = UglifyJS.minify(content);

    if (minified.error) {
      console.error('Minification error:', minified.error);
      return content;
    }
    return minified.code;
  }
}

module.exports = Tdewolffminify;
