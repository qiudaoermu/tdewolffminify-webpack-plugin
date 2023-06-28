// If your plugin is direct dependent to the html webpack plugin:
import { string,config } from '@tdewolff/minify';
import {
	RawSource,
} from 'webpack-sources';


export class Tdewolffminify {
  constructor(options) {
    const configs= options || {};
    config(configs)
  }
  minifyContent(content) {
     // Minify the content using tdewolff/minify
    const minifiedCode = string('application/javascript', content)
   
    return minifiedCode;
  }
  apply(compiler) {
   
    const pluginName = 'tdewolffminify-webpack-plugin';
    compiler.hooks.compilation.tap(pluginName, (compilation, options) => {
       // Tap into the processAssets hook
       compilation.hooks.processAssets.tapPromise(
        {
          name: pluginName,
           // Set the stage as PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE
          stage:
            compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
          additionalAssets: true,
        },
        async (assets) => {
          for (const assetName of Object.keys(assets)) {
            if (assetName.endsWith('.js')) {
              const asset = assets[assetName];
              // Minify the asset's source code
              const minifiedContent = this.minifyContent(asset.source());
              
              if (minifiedContent) {
                // Update the asset with the minified content
                compilation.updateAsset(assetName, new RawSource(minifiedContent));
              }
            }
          }
        }
      );
    });
  }
};

