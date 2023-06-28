## tdewolffminify-webpack-plugin
webpack plugin minify asset with [@tdewolff/minify](https://github.com/tdewolff/minify) base on **Go**


## Require

webpack >=5

node.js >=16

## Install

```
npm i tdewolffminify-webpack-plugin
```

## Use

```
const { Tdewolffminify } = require('tdewolffminify-webpack-plugin');

...
plugins:[
  new Tdewolffminify({
    'js-precision': 0,
    'js-keep-var-names': false,
    'js-no-nullish-operator': false,
  })
]

```