var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
  }
});

// node_modules/webpack-sources/lib/Source.js
var require_Source = __commonJS({
  "node_modules/webpack-sources/lib/Source.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Source = class {
      source() {
        throw new Error("Abstract");
      }
      buffer() {
        const source = this.source();
        if (Buffer.isBuffer(source))
          return source;
        return Buffer.from(source, "utf-8");
      }
      size() {
        return this.buffer().length;
      }
      map(options) {
        return null;
      }
      sourceAndMap(options) {
        return {
          source: this.source(),
          map: this.map(options)
        };
      }
      updateHash(hash) {
        throw new Error("Abstract");
      }
    };
    module.exports = Source;
  }
});

// node_modules/webpack-sources/lib/helpers/getGeneratedSourceInfo.js
var require_getGeneratedSourceInfo = __commonJS({
  "node_modules/webpack-sources/lib/helpers/getGeneratedSourceInfo.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var CHAR_CODE_NEW_LINE = "\n".charCodeAt(0);
    var getGeneratedSourceInfo = (source) => {
      if (source === void 0) {
        return {};
      }
      const lastLineStart = source.lastIndexOf("\n");
      if (lastLineStart === -1) {
        return {
          generatedLine: 1,
          generatedColumn: source.length,
          source
        };
      }
      let generatedLine = 2;
      for (let i = 0; i < lastLineStart; i++) {
        if (source.charCodeAt(i) === CHAR_CODE_NEW_LINE)
          generatedLine++;
      }
      return {
        generatedLine,
        generatedColumn: source.length - lastLineStart - 1,
        source
      };
    };
    module.exports = getGeneratedSourceInfo;
  }
});

// node_modules/webpack-sources/lib/helpers/splitIntoLines.js
var require_splitIntoLines = __commonJS({
  "node_modules/webpack-sources/lib/helpers/splitIntoLines.js"(exports, module) {
    init_esm_shims();
    var splitIntoLines = (str) => {
      const results = [];
      const len = str.length;
      let i = 0;
      for (; i < len; ) {
        const cc = str.charCodeAt(i);
        if (cc === 10) {
          results.push("\n");
          i++;
        } else {
          let j = i + 1;
          while (j < len && str.charCodeAt(j) !== 10)
            j++;
          results.push(str.slice(i, j + 1));
          i = j + 1;
        }
      }
      return results;
    };
    module.exports = splitIntoLines;
  }
});

// node_modules/webpack-sources/lib/helpers/streamChunksOfRawSource.js
var require_streamChunksOfRawSource = __commonJS({
  "node_modules/webpack-sources/lib/helpers/streamChunksOfRawSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var getGeneratedSourceInfo = require_getGeneratedSourceInfo();
    var splitIntoLines = require_splitIntoLines();
    var streamChunksOfRawSource = (source, onChunk, onSource, onName) => {
      let line = 1;
      const matches = splitIntoLines(source);
      let match;
      for (match of matches) {
        onChunk(match, line, 0, -1, -1, -1, -1);
        line++;
      }
      return matches.length === 0 || match.endsWith("\n") ? {
        generatedLine: matches.length + 1,
        generatedColumn: 0
      } : {
        generatedLine: matches.length,
        generatedColumn: match.length
      };
    };
    module.exports = (source, onChunk, onSource, onName, finalSource) => {
      return finalSource ? getGeneratedSourceInfo(source) : streamChunksOfRawSource(source, onChunk, onSource, onName);
    };
  }
});

// node_modules/webpack-sources/lib/RawSource.js
var require_RawSource = __commonJS({
  "node_modules/webpack-sources/lib/RawSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var streamChunksOfRawSource = require_streamChunksOfRawSource();
    var Source = require_Source();
    var RawSource2 = class extends Source {
      constructor(value, convertToString = false) {
        super();
        const isBuffer = Buffer.isBuffer(value);
        if (!isBuffer && typeof value !== "string") {
          throw new TypeError("argument 'value' must be either string of Buffer");
        }
        this._valueIsBuffer = !convertToString && isBuffer;
        this._value = convertToString && isBuffer ? void 0 : value;
        this._valueAsBuffer = isBuffer ? value : void 0;
        this._valueAsString = isBuffer ? void 0 : value;
      }
      isBuffer() {
        return this._valueIsBuffer;
      }
      source() {
        if (this._value === void 0) {
          this._value = this._valueAsBuffer.toString("utf-8");
        }
        return this._value;
      }
      buffer() {
        if (this._valueAsBuffer === void 0) {
          this._valueAsBuffer = Buffer.from(this._value, "utf-8");
        }
        return this._valueAsBuffer;
      }
      map(options) {
        return null;
      }
      /**
       * @param {object} options options
       * @param {function(string, number, number, number, number, number, number): void} onChunk called for each chunk of code
       * @param {function(number, string, string)} onSource called for each source
       * @param {function(number, string)} onName called for each name
       * @returns {void}
       */
      streamChunks(options, onChunk, onSource, onName) {
        if (this._value === void 0) {
          this._value = Buffer.from(this._valueAsBuffer, "utf-8");
        }
        if (this._valueAsString === void 0) {
          this._valueAsString = typeof this._value === "string" ? this._value : this._value.toString("utf-8");
        }
        return streamChunksOfRawSource(
          this._valueAsString,
          onChunk,
          onSource,
          onName,
          !!(options && options.finalSource)
        );
      }
      updateHash(hash) {
        if (this._valueAsBuffer === void 0) {
          this._valueAsBuffer = Buffer.from(this._value, "utf-8");
        }
        hash.update("RawSource");
        hash.update(this._valueAsBuffer);
      }
    };
    module.exports = RawSource2;
  }
});

// node_modules/webpack-sources/lib/helpers/createMappingsSerializer.js
var require_createMappingsSerializer = __commonJS({
  "node_modules/webpack-sources/lib/helpers/createMappingsSerializer.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
      ""
    );
    var CONTINUATION_BIT = 32;
    var createMappingsSerializer = (options) => {
      const linesOnly = options && options.columns === false;
      return linesOnly ? createLinesOnlyMappingsSerializer() : createFullMappingsSerializer();
    };
    var createFullMappingsSerializer = () => {
      let currentLine = 1;
      let currentColumn = 0;
      let currentSourceIndex = 0;
      let currentOriginalLine = 1;
      let currentOriginalColumn = 0;
      let currentNameIndex = 0;
      let activeMapping = false;
      let activeName = false;
      let initial = true;
      return (generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
        if (activeMapping && currentLine === generatedLine) {
          if (sourceIndex === currentSourceIndex && originalLine === currentOriginalLine && originalColumn === currentOriginalColumn && !activeName && nameIndex < 0) {
            return "";
          }
        } else {
          if (sourceIndex < 0) {
            return "";
          }
        }
        let str;
        if (currentLine < generatedLine) {
          str = ";".repeat(generatedLine - currentLine);
          currentLine = generatedLine;
          currentColumn = 0;
          initial = false;
        } else if (initial) {
          str = "";
          initial = false;
        } else {
          str = ",";
        }
        const writeValue = (value) => {
          const sign = value >>> 31 & 1;
          const mask = value >> 31;
          const absValue = value + mask ^ mask;
          let data = absValue << 1 | sign;
          for (; ; ) {
            const sextet = data & 31;
            data >>= 5;
            if (data === 0) {
              str += ALPHABET[sextet];
              break;
            } else {
              str += ALPHABET[sextet | CONTINUATION_BIT];
            }
          }
        };
        writeValue(generatedColumn - currentColumn);
        currentColumn = generatedColumn;
        if (sourceIndex >= 0) {
          activeMapping = true;
          if (sourceIndex === currentSourceIndex) {
            str += "A";
          } else {
            writeValue(sourceIndex - currentSourceIndex);
            currentSourceIndex = sourceIndex;
          }
          writeValue(originalLine - currentOriginalLine);
          currentOriginalLine = originalLine;
          if (originalColumn === currentOriginalColumn) {
            str += "A";
          } else {
            writeValue(originalColumn - currentOriginalColumn);
            currentOriginalColumn = originalColumn;
          }
          if (nameIndex >= 0) {
            writeValue(nameIndex - currentNameIndex);
            currentNameIndex = nameIndex;
            activeName = true;
          } else {
            activeName = false;
          }
        } else {
          activeMapping = false;
        }
        return str;
      };
    };
    var createLinesOnlyMappingsSerializer = () => {
      let lastWrittenLine = 0;
      let currentLine = 1;
      let currentSourceIndex = 0;
      let currentOriginalLine = 1;
      return (generatedLine, _generatedColumn, sourceIndex, originalLine, _originalColumn, _nameIndex) => {
        if (sourceIndex < 0) {
          return "";
        }
        if (lastWrittenLine === generatedLine) {
          return "";
        }
        let str;
        const writeValue = (value) => {
          const sign = value >>> 31 & 1;
          const mask = value >> 31;
          const absValue = value + mask ^ mask;
          let data = absValue << 1 | sign;
          for (; ; ) {
            const sextet = data & 31;
            data >>= 5;
            if (data === 0) {
              str += ALPHABET[sextet];
              break;
            } else {
              str += ALPHABET[sextet | CONTINUATION_BIT];
            }
          }
        };
        lastWrittenLine = generatedLine;
        if (generatedLine === currentLine + 1) {
          currentLine = generatedLine;
          if (sourceIndex === currentSourceIndex) {
            currentSourceIndex = sourceIndex;
            if (originalLine === currentOriginalLine + 1) {
              currentOriginalLine = originalLine;
              return ";AACA";
            } else {
              str = ";AA";
              writeValue(originalLine - currentOriginalLine);
              currentOriginalLine = originalLine;
              return str + "A";
            }
          } else {
            str = ";A";
            writeValue(sourceIndex - currentSourceIndex);
            currentSourceIndex = sourceIndex;
            writeValue(originalLine - currentOriginalLine);
            currentOriginalLine = originalLine;
            return str + "A";
          }
        } else {
          str = ";".repeat(generatedLine - currentLine);
          currentLine = generatedLine;
          if (sourceIndex === currentSourceIndex) {
            currentSourceIndex = sourceIndex;
            if (originalLine === currentOriginalLine + 1) {
              currentOriginalLine = originalLine;
              return str + "AACA";
            } else {
              str += "AA";
              writeValue(originalLine - currentOriginalLine);
              currentOriginalLine = originalLine;
              return str + "A";
            }
          } else {
            str += "A";
            writeValue(sourceIndex - currentSourceIndex);
            currentSourceIndex = sourceIndex;
            writeValue(originalLine - currentOriginalLine);
            currentOriginalLine = originalLine;
            return str + "A";
          }
        }
      };
    };
    module.exports = createMappingsSerializer;
  }
});

// node_modules/webpack-sources/lib/helpers/getFromStreamChunks.js
var require_getFromStreamChunks = __commonJS({
  "node_modules/webpack-sources/lib/helpers/getFromStreamChunks.js"(exports) {
    "use strict";
    init_esm_shims();
    var createMappingsSerializer = require_createMappingsSerializer();
    exports.getSourceAndMap = (inputSource, options) => {
      let code = "";
      let mappings = "";
      let sources = [];
      let sourcesContent = [];
      let names = [];
      const addMapping = createMappingsSerializer(options);
      const { source } = inputSource.streamChunks(
        Object.assign({}, options, { finalSource: true }),
        (chunk, generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
          if (chunk !== void 0)
            code += chunk;
          mappings += addMapping(
            generatedLine,
            generatedColumn,
            sourceIndex,
            originalLine,
            originalColumn,
            nameIndex
          );
        },
        (sourceIndex, source2, sourceContent) => {
          while (sources.length < sourceIndex) {
            sources.push(null);
          }
          sources[sourceIndex] = source2;
          if (sourceContent !== void 0) {
            while (sourcesContent.length < sourceIndex) {
              sourcesContent.push(null);
            }
            sourcesContent[sourceIndex] = sourceContent;
          }
        },
        (nameIndex, name) => {
          while (names.length < nameIndex) {
            names.push(null);
          }
          names[nameIndex] = name;
        }
      );
      return {
        source: source !== void 0 ? source : code,
        map: mappings.length > 0 ? {
          version: 3,
          file: "x",
          mappings,
          sources,
          sourcesContent: sourcesContent.length > 0 ? sourcesContent : void 0,
          names
        } : null
      };
    };
    exports.getMap = (source, options) => {
      let mappings = "";
      let sources = [];
      let sourcesContent = [];
      let names = [];
      const addMapping = createMappingsSerializer(options);
      source.streamChunks(
        Object.assign({}, options, { source: false, finalSource: true }),
        (chunk, generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
          mappings += addMapping(
            generatedLine,
            generatedColumn,
            sourceIndex,
            originalLine,
            originalColumn,
            nameIndex
          );
        },
        (sourceIndex, source2, sourceContent) => {
          while (sources.length < sourceIndex) {
            sources.push(null);
          }
          sources[sourceIndex] = source2;
          if (sourceContent !== void 0) {
            while (sourcesContent.length < sourceIndex) {
              sourcesContent.push(null);
            }
            sourcesContent[sourceIndex] = sourceContent;
          }
        },
        (nameIndex, name) => {
          while (names.length < nameIndex) {
            names.push(null);
          }
          names[nameIndex] = name;
        }
      );
      return mappings.length > 0 ? {
        version: 3,
        file: "x",
        mappings,
        sources,
        sourcesContent: sourcesContent.length > 0 ? sourcesContent : void 0,
        names
      } : null;
    };
  }
});

// node_modules/webpack-sources/lib/helpers/splitIntoPotentialTokens.js
var require_splitIntoPotentialTokens = __commonJS({
  "node_modules/webpack-sources/lib/helpers/splitIntoPotentialTokens.js"(exports, module) {
    init_esm_shims();
    var splitIntoPotentialTokens = (str) => {
      const len = str.length;
      if (len === 0)
        return null;
      const results = [];
      let i = 0;
      for (; i < len; ) {
        const s = i;
        block: {
          let cc = str.charCodeAt(i);
          while (cc !== 10 && cc !== 59 && cc !== 123 && cc !== 125) {
            if (++i >= len)
              break block;
            cc = str.charCodeAt(i);
          }
          while (cc === 59 || cc === 32 || cc === 123 || cc === 125 || cc === 13 || cc === 9) {
            if (++i >= len)
              break block;
            cc = str.charCodeAt(i);
          }
          if (cc === 10) {
            i++;
          }
        }
        results.push(str.slice(s, i));
      }
      return results;
    };
    module.exports = splitIntoPotentialTokens;
  }
});

// node_modules/webpack-sources/lib/OriginalSource.js
var require_OriginalSource = __commonJS({
  "node_modules/webpack-sources/lib/OriginalSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var { getMap, getSourceAndMap } = require_getFromStreamChunks();
    var splitIntoLines = require_splitIntoLines();
    var getGeneratedSourceInfo = require_getGeneratedSourceInfo();
    var Source = require_Source();
    var splitIntoPotentialTokens = require_splitIntoPotentialTokens();
    var OriginalSource = class extends Source {
      constructor(value, name) {
        super();
        const isBuffer = Buffer.isBuffer(value);
        this._value = isBuffer ? void 0 : value;
        this._valueAsBuffer = isBuffer ? value : void 0;
        this._name = name;
      }
      getName() {
        return this._name;
      }
      source() {
        if (this._value === void 0) {
          this._value = this._valueAsBuffer.toString("utf-8");
        }
        return this._value;
      }
      buffer() {
        if (this._valueAsBuffer === void 0) {
          this._valueAsBuffer = Buffer.from(this._value, "utf-8");
        }
        return this._valueAsBuffer;
      }
      map(options) {
        return getMap(this, options);
      }
      sourceAndMap(options) {
        return getSourceAndMap(this, options);
      }
      /**
       * @param {object} options options
       * @param {function(string, number, number, number, number, number, number): void} onChunk called for each chunk of code
       * @param {function(number, string, string)} onSource called for each source
       * @param {function(number, string)} onName called for each name
       * @returns {void}
       */
      streamChunks(options, onChunk, onSource, onName) {
        if (this._value === void 0) {
          this._value = this._valueAsBuffer.toString("utf-8");
        }
        onSource(0, this._name, this._value);
        const finalSource = !!(options && options.finalSource);
        if (!options || options.columns !== false) {
          const matches = splitIntoPotentialTokens(this._value);
          let line = 1;
          let column = 0;
          if (matches !== null) {
            for (const match of matches) {
              const isEndOfLine = match.endsWith("\n");
              if (isEndOfLine && match.length === 1) {
                if (!finalSource)
                  onChunk(match, line, column, -1, -1, -1, -1);
              } else {
                const chunk = finalSource ? void 0 : match;
                onChunk(chunk, line, column, 0, line, column, -1);
              }
              if (isEndOfLine) {
                line++;
                column = 0;
              } else {
                column += match.length;
              }
            }
          }
          return {
            generatedLine: line,
            generatedColumn: column,
            source: finalSource ? this._value : void 0
          };
        } else if (finalSource) {
          const result = getGeneratedSourceInfo(this._value);
          const { generatedLine, generatedColumn } = result;
          if (generatedColumn === 0) {
            for (let line = 1; line < generatedLine; line++)
              onChunk(void 0, line, 0, 0, line, 0, -1);
          } else {
            for (let line = 1; line <= generatedLine; line++)
              onChunk(void 0, line, 0, 0, line, 0, -1);
          }
          return result;
        } else {
          let line = 1;
          const matches = splitIntoLines(this._value);
          let match;
          for (match of matches) {
            onChunk(finalSource ? void 0 : match, line, 0, 0, line, 0, -1);
            line++;
          }
          return matches.length === 0 || match.endsWith("\n") ? {
            generatedLine: matches.length + 1,
            generatedColumn: 0,
            source: finalSource ? this._value : void 0
          } : {
            generatedLine: matches.length,
            generatedColumn: match.length,
            source: finalSource ? this._value : void 0
          };
        }
      }
      updateHash(hash) {
        if (this._valueAsBuffer === void 0) {
          this._valueAsBuffer = Buffer.from(this._value, "utf-8");
        }
        hash.update("OriginalSource");
        hash.update(this._valueAsBuffer);
        hash.update(this._name || "");
      }
    };
    module.exports = OriginalSource;
  }
});

// node_modules/webpack-sources/lib/helpers/getSource.js
var require_getSource = __commonJS({
  "node_modules/webpack-sources/lib/helpers/getSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var getSource = (sourceMap, index) => {
      if (index < 0)
        return null;
      const { sourceRoot, sources } = sourceMap;
      const source = sources[index];
      if (!sourceRoot)
        return source;
      if (sourceRoot.endsWith("/"))
        return sourceRoot + source;
      return sourceRoot + "/" + source;
    };
    module.exports = getSource;
  }
});

// node_modules/webpack-sources/lib/helpers/readMappings.js
var require_readMappings = __commonJS({
  "node_modules/webpack-sources/lib/helpers/readMappings.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var CONTINUATION_BIT = 32;
    var END_SEGMENT_BIT = 64;
    var NEXT_LINE = END_SEGMENT_BIT | 1;
    var INVALID = END_SEGMENT_BIT | 2;
    var DATA_MASK = 31;
    var ccToValue = new Uint8Array("z".charCodeAt(0) + 1);
    {
      ccToValue.fill(INVALID);
      for (let i = 0; i < ALPHABET.length; i++) {
        ccToValue[ALPHABET.charCodeAt(i)] = i;
      }
      ccToValue[",".charCodeAt(0)] = END_SEGMENT_BIT;
      ccToValue[";".charCodeAt(0)] = NEXT_LINE;
    }
    var ccMax = ccToValue.length - 1;
    var readMappings = (mappings, onMapping) => {
      const currentData = new Uint32Array([0, 0, 1, 0, 0]);
      let currentDataPos = 0;
      let currentValue = 0;
      let currentValuePos = 0;
      let generatedLine = 1;
      let generatedColumn = -1;
      for (let i = 0; i < mappings.length; i++) {
        const cc = mappings.charCodeAt(i);
        if (cc > ccMax)
          continue;
        const value = ccToValue[cc];
        if ((value & END_SEGMENT_BIT) !== 0) {
          if (currentData[0] > generatedColumn) {
            if (currentDataPos === 1) {
              onMapping(generatedLine, currentData[0], -1, -1, -1, -1);
            } else if (currentDataPos === 4) {
              onMapping(
                generatedLine,
                currentData[0],
                currentData[1],
                currentData[2],
                currentData[3],
                -1
              );
            } else if (currentDataPos === 5) {
              onMapping(
                generatedLine,
                currentData[0],
                currentData[1],
                currentData[2],
                currentData[3],
                currentData[4]
              );
            }
            generatedColumn = currentData[0];
          }
          currentDataPos = 0;
          if (value === NEXT_LINE) {
            generatedLine++;
            currentData[0] = 0;
            generatedColumn = -1;
          }
        } else if ((value & CONTINUATION_BIT) === 0) {
          currentValue |= value << currentValuePos;
          const finalValue = currentValue & 1 ? -(currentValue >> 1) : currentValue >> 1;
          currentData[currentDataPos++] += finalValue;
          currentValuePos = 0;
          currentValue = 0;
        } else {
          currentValue |= (value & DATA_MASK) << currentValuePos;
          currentValuePos += 5;
        }
      }
      if (currentDataPos === 1) {
        onMapping(generatedLine, currentData[0], -1, -1, -1, -1);
      } else if (currentDataPos === 4) {
        onMapping(
          generatedLine,
          currentData[0],
          currentData[1],
          currentData[2],
          currentData[3],
          -1
        );
      } else if (currentDataPos === 5) {
        onMapping(
          generatedLine,
          currentData[0],
          currentData[1],
          currentData[2],
          currentData[3],
          currentData[4]
        );
      }
    };
    module.exports = readMappings;
  }
});

// node_modules/webpack-sources/lib/helpers/streamChunksOfSourceMap.js
var require_streamChunksOfSourceMap = __commonJS({
  "node_modules/webpack-sources/lib/helpers/streamChunksOfSourceMap.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var getGeneratedSourceInfo = require_getGeneratedSourceInfo();
    var getSource = require_getSource();
    var readMappings = require_readMappings();
    var splitIntoLines = require_splitIntoLines();
    var streamChunksOfSourceMapFull = (source, sourceMap, onChunk, onSource, onName) => {
      const lines = splitIntoLines(source);
      if (lines.length === 0) {
        return {
          generatedLine: 1,
          generatedColumn: 0
        };
      }
      const { sources, sourcesContent, names, mappings } = sourceMap;
      for (let i = 0; i < sources.length; i++) {
        onSource(
          i,
          getSource(sourceMap, i),
          sourcesContent && sourcesContent[i] || void 0
        );
      }
      if (names) {
        for (let i = 0; i < names.length; i++) {
          onName(i, names[i]);
        }
      }
      const lastLine = lines[lines.length - 1];
      const lastNewLine = lastLine.endsWith("\n");
      const finalLine = lastNewLine ? lines.length + 1 : lines.length;
      const finalColumn = lastNewLine ? 0 : lastLine.length;
      let currentGeneratedLine = 1;
      let currentGeneratedColumn = 0;
      let mappingActive = false;
      let activeMappingSourceIndex = -1;
      let activeMappingOriginalLine = -1;
      let activeMappingOriginalColumn = -1;
      let activeMappingNameIndex = -1;
      const onMapping = (generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
        if (mappingActive && currentGeneratedLine <= lines.length) {
          let chunk;
          const mappingLine = currentGeneratedLine;
          const mappingColumn = currentGeneratedColumn;
          const line = lines[currentGeneratedLine - 1];
          if (generatedLine !== currentGeneratedLine) {
            chunk = line.slice(currentGeneratedColumn);
            currentGeneratedLine++;
            currentGeneratedColumn = 0;
          } else {
            chunk = line.slice(currentGeneratedColumn, generatedColumn);
            currentGeneratedColumn = generatedColumn;
          }
          if (chunk) {
            onChunk(
              chunk,
              mappingLine,
              mappingColumn,
              activeMappingSourceIndex,
              activeMappingOriginalLine,
              activeMappingOriginalColumn,
              activeMappingNameIndex
            );
          }
          mappingActive = false;
        }
        if (generatedLine > currentGeneratedLine && currentGeneratedColumn > 0) {
          if (currentGeneratedLine <= lines.length) {
            const chunk = lines[currentGeneratedLine - 1].slice(
              currentGeneratedColumn
            );
            onChunk(
              chunk,
              currentGeneratedLine,
              currentGeneratedColumn,
              -1,
              -1,
              -1,
              -1
            );
          }
          currentGeneratedLine++;
          currentGeneratedColumn = 0;
        }
        while (generatedLine > currentGeneratedLine) {
          if (currentGeneratedLine <= lines.length) {
            onChunk(
              lines[currentGeneratedLine - 1],
              currentGeneratedLine,
              0,
              -1,
              -1,
              -1,
              -1
            );
          }
          currentGeneratedLine++;
        }
        if (generatedColumn > currentGeneratedColumn) {
          if (currentGeneratedLine <= lines.length) {
            const chunk = lines[currentGeneratedLine - 1].slice(
              currentGeneratedColumn,
              generatedColumn
            );
            onChunk(
              chunk,
              currentGeneratedLine,
              currentGeneratedColumn,
              -1,
              -1,
              -1,
              -1
            );
          }
          currentGeneratedColumn = generatedColumn;
        }
        if (sourceIndex >= 0 && (generatedLine < finalLine || generatedLine === finalLine && generatedColumn < finalColumn)) {
          mappingActive = true;
          activeMappingSourceIndex = sourceIndex;
          activeMappingOriginalLine = originalLine;
          activeMappingOriginalColumn = originalColumn;
          activeMappingNameIndex = nameIndex;
        }
      };
      readMappings(mappings, onMapping);
      onMapping(finalLine, finalColumn, -1, -1, -1, -1);
      return {
        generatedLine: finalLine,
        generatedColumn: finalColumn
      };
    };
    var streamChunksOfSourceMapLinesFull = (source, sourceMap, onChunk, onSource, _onName) => {
      const lines = splitIntoLines(source);
      if (lines.length === 0) {
        return {
          generatedLine: 1,
          generatedColumn: 0
        };
      }
      const { sources, sourcesContent, mappings } = sourceMap;
      for (let i = 0; i < sources.length; i++) {
        onSource(
          i,
          getSource(sourceMap, i),
          sourcesContent && sourcesContent[i] || void 0
        );
      }
      let currentGeneratedLine = 1;
      const onMapping = (generatedLine, _generatedColumn, sourceIndex, originalLine, originalColumn, _nameIndex) => {
        if (sourceIndex < 0 || generatedLine < currentGeneratedLine || generatedLine > lines.length) {
          return;
        }
        while (generatedLine > currentGeneratedLine) {
          if (currentGeneratedLine <= lines.length) {
            onChunk(
              lines[currentGeneratedLine - 1],
              currentGeneratedLine,
              0,
              -1,
              -1,
              -1,
              -1
            );
          }
          currentGeneratedLine++;
        }
        if (generatedLine <= lines.length) {
          onChunk(
            lines[generatedLine - 1],
            generatedLine,
            0,
            sourceIndex,
            originalLine,
            originalColumn,
            -1
          );
          currentGeneratedLine++;
        }
      };
      readMappings(mappings, onMapping);
      for (; currentGeneratedLine <= lines.length; currentGeneratedLine++) {
        onChunk(
          lines[currentGeneratedLine - 1],
          currentGeneratedLine,
          0,
          -1,
          -1,
          -1,
          -1
        );
      }
      const lastLine = lines[lines.length - 1];
      const lastNewLine = lastLine.endsWith("\n");
      const finalLine = lastNewLine ? lines.length + 1 : lines.length;
      const finalColumn = lastNewLine ? 0 : lastLine.length;
      return {
        generatedLine: finalLine,
        generatedColumn: finalColumn
      };
    };
    var streamChunksOfSourceMapFinal = (source, sourceMap, onChunk, onSource, onName) => {
      const result = getGeneratedSourceInfo(source);
      const { generatedLine: finalLine, generatedColumn: finalColumn } = result;
      if (finalLine === 1 && finalColumn === 0)
        return result;
      const { sources, sourcesContent, names, mappings } = sourceMap;
      for (let i = 0; i < sources.length; i++) {
        onSource(
          i,
          getSource(sourceMap, i),
          sourcesContent && sourcesContent[i] || void 0
        );
      }
      if (names) {
        for (let i = 0; i < names.length; i++) {
          onName(i, names[i]);
        }
      }
      let mappingActiveLine = 0;
      const onMapping = (generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
        if (generatedLine >= finalLine && (generatedColumn >= finalColumn || generatedLine > finalLine)) {
          return;
        }
        if (sourceIndex >= 0) {
          onChunk(
            void 0,
            generatedLine,
            generatedColumn,
            sourceIndex,
            originalLine,
            originalColumn,
            nameIndex
          );
          mappingActiveLine = generatedLine;
        } else if (mappingActiveLine === generatedLine) {
          onChunk(void 0, generatedLine, generatedColumn, -1, -1, -1, -1);
          mappingActiveLine = 0;
        }
      };
      readMappings(mappings, onMapping);
      return result;
    };
    var streamChunksOfSourceMapLinesFinal = (source, sourceMap, onChunk, onSource, _onName) => {
      const result = getGeneratedSourceInfo(source);
      const { generatedLine, generatedColumn } = result;
      if (generatedLine === 1 && generatedColumn === 0) {
        return {
          generatedLine: 1,
          generatedColumn: 0
        };
      }
      const { sources, sourcesContent, mappings } = sourceMap;
      for (let i = 0; i < sources.length; i++) {
        onSource(
          i,
          getSource(sourceMap, i),
          sourcesContent && sourcesContent[i] || void 0
        );
      }
      const finalLine = generatedColumn === 0 ? generatedLine - 1 : generatedLine;
      let currentGeneratedLine = 1;
      const onMapping = (generatedLine2, _generatedColumn, sourceIndex, originalLine, originalColumn, _nameIndex) => {
        if (sourceIndex >= 0 && currentGeneratedLine <= generatedLine2 && generatedLine2 <= finalLine) {
          onChunk(
            void 0,
            generatedLine2,
            0,
            sourceIndex,
            originalLine,
            originalColumn,
            -1
          );
          currentGeneratedLine = generatedLine2 + 1;
        }
      };
      readMappings(mappings, onMapping);
      return result;
    };
    module.exports = (source, sourceMap, onChunk, onSource, onName, finalSource, columns) => {
      if (columns) {
        return finalSource ? streamChunksOfSourceMapFinal(
          source,
          sourceMap,
          onChunk,
          onSource,
          onName
        ) : streamChunksOfSourceMapFull(
          source,
          sourceMap,
          onChunk,
          onSource,
          onName
        );
      } else {
        return finalSource ? streamChunksOfSourceMapLinesFinal(
          source,
          sourceMap,
          onChunk,
          onSource,
          onName
        ) : streamChunksOfSourceMapLinesFull(
          source,
          sourceMap,
          onChunk,
          onSource,
          onName
        );
      }
    };
  }
});

// node_modules/webpack-sources/lib/helpers/streamChunksOfCombinedSourceMap.js
var require_streamChunksOfCombinedSourceMap = __commonJS({
  "node_modules/webpack-sources/lib/helpers/streamChunksOfCombinedSourceMap.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var streamChunksOfSourceMap = require_streamChunksOfSourceMap();
    var splitIntoLines = require_splitIntoLines();
    var streamChunksOfCombinedSourceMap = (source, sourceMap, innerSourceName, innerSource, innerSourceMap, removeInnerSource, onChunk, onSource, onName, finalSource, columns) => {
      let sourceMapping = /* @__PURE__ */ new Map();
      let nameMapping = /* @__PURE__ */ new Map();
      const sourceIndexMapping = [];
      const nameIndexMapping = [];
      const nameIndexValueMapping = [];
      let innerSourceIndex = -2;
      const innerSourceIndexMapping = [];
      const innerSourceIndexValueMapping = [];
      const innerSourceContents = [];
      const innerSourceContentLines = [];
      const innerNameIndexMapping = [];
      const innerNameIndexValueMapping = [];
      const innerSourceMapLineData = [];
      const findInnerMapping = (line, column) => {
        if (line > innerSourceMapLineData.length)
          return -1;
        const { mappingsData } = innerSourceMapLineData[line - 1];
        let l = 0;
        let r = mappingsData.length / 5;
        while (l < r) {
          let m = l + r >> 1;
          if (mappingsData[m * 5] <= column) {
            l = m + 1;
          } else {
            r = m;
          }
        }
        if (l === 0)
          return -1;
        return l - 1;
      };
      return streamChunksOfSourceMap(
        source,
        sourceMap,
        (chunk, generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
          if (sourceIndex === innerSourceIndex) {
            const idx = findInnerMapping(originalLine, originalColumn);
            if (idx !== -1) {
              const { chunks, mappingsData } = innerSourceMapLineData[originalLine - 1];
              const mi = idx * 5;
              const innerSourceIndex2 = mappingsData[mi + 1];
              const innerOriginalLine = mappingsData[mi + 2];
              let innerOriginalColumn = mappingsData[mi + 3];
              let innerNameIndex = mappingsData[mi + 4];
              if (innerSourceIndex2 >= 0) {
                const innerChunk = chunks[idx];
                const innerGeneratedColumn = mappingsData[mi];
                const locationInChunk = originalColumn - innerGeneratedColumn;
                if (locationInChunk > 0) {
                  let originalSourceLines = innerSourceIndex2 < innerSourceContentLines.length ? innerSourceContentLines[innerSourceIndex2] : null;
                  if (originalSourceLines === void 0) {
                    const originalSource = innerSourceContents[innerSourceIndex2];
                    originalSourceLines = originalSource ? splitIntoLines(originalSource) : null;
                    innerSourceContentLines[innerSourceIndex2] = originalSourceLines;
                  }
                  if (originalSourceLines !== null) {
                    const originalChunk = innerOriginalLine <= originalSourceLines.length ? originalSourceLines[innerOriginalLine - 1].slice(
                      innerOriginalColumn,
                      innerOriginalColumn + locationInChunk
                    ) : "";
                    if (innerChunk.slice(0, locationInChunk) === originalChunk) {
                      innerOriginalColumn += locationInChunk;
                      innerNameIndex = -1;
                    }
                  }
                }
                let sourceIndex2 = innerSourceIndex2 < innerSourceIndexMapping.length ? innerSourceIndexMapping[innerSourceIndex2] : -2;
                if (sourceIndex2 === -2) {
                  const [source2, sourceContent] = innerSourceIndex2 < innerSourceIndexValueMapping.length ? innerSourceIndexValueMapping[innerSourceIndex2] : [null, void 0];
                  let globalIndex = sourceMapping.get(source2);
                  if (globalIndex === void 0) {
                    sourceMapping.set(source2, globalIndex = sourceMapping.size);
                    onSource(globalIndex, source2, sourceContent);
                  }
                  sourceIndex2 = globalIndex;
                  innerSourceIndexMapping[innerSourceIndex2] = sourceIndex2;
                }
                let finalNameIndex = -1;
                if (innerNameIndex >= 0) {
                  finalNameIndex = innerNameIndex < innerNameIndexMapping.length ? innerNameIndexMapping[innerNameIndex] : -2;
                  if (finalNameIndex === -2) {
                    const name = innerNameIndex < innerNameIndexValueMapping.length ? innerNameIndexValueMapping[innerNameIndex] : void 0;
                    if (name) {
                      let globalIndex = nameMapping.get(name);
                      if (globalIndex === void 0) {
                        nameMapping.set(name, globalIndex = nameMapping.size);
                        onName(globalIndex, name);
                      }
                      finalNameIndex = globalIndex;
                    } else {
                      finalNameIndex = -1;
                    }
                    innerNameIndexMapping[innerNameIndex] = finalNameIndex;
                  }
                } else if (nameIndex >= 0) {
                  let originalSourceLines = innerSourceContentLines[innerSourceIndex2];
                  if (originalSourceLines === void 0) {
                    const originalSource = innerSourceContents[innerSourceIndex2];
                    originalSourceLines = originalSource ? splitIntoLines(originalSource) : null;
                    innerSourceContentLines[innerSourceIndex2] = originalSourceLines;
                  }
                  if (originalSourceLines !== null) {
                    const name = nameIndexValueMapping[nameIndex];
                    const originalName = innerOriginalLine <= originalSourceLines.length ? originalSourceLines[innerOriginalLine - 1].slice(
                      innerOriginalColumn,
                      innerOriginalColumn + name.length
                    ) : "";
                    if (name === originalName) {
                      finalNameIndex = nameIndex < nameIndexMapping.length ? nameIndexMapping[nameIndex] : -2;
                      if (finalNameIndex === -2) {
                        const name2 = nameIndexValueMapping[nameIndex];
                        if (name2) {
                          let globalIndex = nameMapping.get(name2);
                          if (globalIndex === void 0) {
                            nameMapping.set(name2, globalIndex = nameMapping.size);
                            onName(globalIndex, name2);
                          }
                          finalNameIndex = globalIndex;
                        } else {
                          finalNameIndex = -1;
                        }
                        nameIndexMapping[nameIndex] = finalNameIndex;
                      }
                    }
                  }
                }
                onChunk(
                  chunk,
                  generatedLine,
                  generatedColumn,
                  sourceIndex2,
                  innerOriginalLine,
                  innerOriginalColumn,
                  finalNameIndex
                );
                return;
              }
            }
            if (removeInnerSource) {
              onChunk(chunk, generatedLine, generatedColumn, -1, -1, -1, -1);
              return;
            } else {
              if (sourceIndexMapping[sourceIndex] === -2) {
                let globalIndex = sourceMapping.get(innerSourceName);
                if (globalIndex === void 0) {
                  sourceMapping.set(source, globalIndex = sourceMapping.size);
                  onSource(globalIndex, innerSourceName, innerSource);
                }
                sourceIndexMapping[sourceIndex] = globalIndex;
              }
            }
          }
          const finalSourceIndex = sourceIndex < 0 || sourceIndex >= sourceIndexMapping.length ? -1 : sourceIndexMapping[sourceIndex];
          if (finalSourceIndex < 0) {
            onChunk(chunk, generatedLine, generatedColumn, -1, -1, -1, -1);
          } else {
            let finalNameIndex = -1;
            if (nameIndex >= 0 && nameIndex < nameIndexMapping.length) {
              finalNameIndex = nameIndexMapping[nameIndex];
              if (finalNameIndex === -2) {
                const name = nameIndexValueMapping[nameIndex];
                let globalIndex = nameMapping.get(name);
                if (globalIndex === void 0) {
                  nameMapping.set(name, globalIndex = nameMapping.size);
                  onName(globalIndex, name);
                }
                finalNameIndex = globalIndex;
                nameIndexMapping[nameIndex] = finalNameIndex;
              }
            }
            onChunk(
              chunk,
              generatedLine,
              generatedColumn,
              finalSourceIndex,
              originalLine,
              originalColumn,
              finalNameIndex
            );
          }
        },
        (i, source2, sourceContent) => {
          if (source2 === innerSourceName) {
            innerSourceIndex = i;
            if (innerSource !== void 0)
              sourceContent = innerSource;
            else
              innerSource = sourceContent;
            sourceIndexMapping[i] = -2;
            streamChunksOfSourceMap(
              sourceContent,
              innerSourceMap,
              (chunk, generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
                while (innerSourceMapLineData.length < generatedLine) {
                  innerSourceMapLineData.push({
                    mappingsData: [],
                    chunks: []
                  });
                }
                const data = innerSourceMapLineData[generatedLine - 1];
                data.mappingsData.push(
                  generatedColumn,
                  sourceIndex,
                  originalLine,
                  originalColumn,
                  nameIndex
                );
                data.chunks.push(chunk);
              },
              (i2, source3, sourceContent2) => {
                innerSourceContents[i2] = sourceContent2;
                innerSourceContentLines[i2] = void 0;
                innerSourceIndexMapping[i2] = -2;
                innerSourceIndexValueMapping[i2] = [source3, sourceContent2];
              },
              (i2, name) => {
                innerNameIndexMapping[i2] = -2;
                innerNameIndexValueMapping[i2] = name;
              },
              false,
              columns
            );
          } else {
            let globalIndex = sourceMapping.get(source2);
            if (globalIndex === void 0) {
              sourceMapping.set(source2, globalIndex = sourceMapping.size);
              onSource(globalIndex, source2, sourceContent);
            }
            sourceIndexMapping[i] = globalIndex;
          }
        },
        (i, name) => {
          nameIndexMapping[i] = -2;
          nameIndexValueMapping[i] = name;
        },
        finalSource,
        columns
      );
    };
    module.exports = streamChunksOfCombinedSourceMap;
  }
});

// node_modules/webpack-sources/lib/SourceMapSource.js
var require_SourceMapSource = __commonJS({
  "node_modules/webpack-sources/lib/SourceMapSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Source = require_Source();
    var streamChunksOfSourceMap = require_streamChunksOfSourceMap();
    var streamChunksOfCombinedSourceMap = require_streamChunksOfCombinedSourceMap();
    var { getMap, getSourceAndMap } = require_getFromStreamChunks();
    var SourceMapSource = class extends Source {
      constructor(value, name, sourceMap, originalSource, innerSourceMap, removeOriginalSource) {
        super();
        const valueIsBuffer = Buffer.isBuffer(value);
        this._valueAsString = valueIsBuffer ? void 0 : value;
        this._valueAsBuffer = valueIsBuffer ? value : void 0;
        this._name = name;
        this._hasSourceMap = !!sourceMap;
        const sourceMapIsBuffer = Buffer.isBuffer(sourceMap);
        const sourceMapIsString = typeof sourceMap === "string";
        this._sourceMapAsObject = sourceMapIsBuffer || sourceMapIsString ? void 0 : sourceMap;
        this._sourceMapAsString = sourceMapIsString ? sourceMap : void 0;
        this._sourceMapAsBuffer = sourceMapIsBuffer ? sourceMap : void 0;
        this._hasOriginalSource = !!originalSource;
        const originalSourceIsBuffer = Buffer.isBuffer(originalSource);
        this._originalSourceAsString = originalSourceIsBuffer ? void 0 : originalSource;
        this._originalSourceAsBuffer = originalSourceIsBuffer ? originalSource : void 0;
        this._hasInnerSourceMap = !!innerSourceMap;
        const innerSourceMapIsBuffer = Buffer.isBuffer(innerSourceMap);
        const innerSourceMapIsString = typeof innerSourceMap === "string";
        this._innerSourceMapAsObject = innerSourceMapIsBuffer || innerSourceMapIsString ? void 0 : innerSourceMap;
        this._innerSourceMapAsString = innerSourceMapIsString ? innerSourceMap : void 0;
        this._innerSourceMapAsBuffer = innerSourceMapIsBuffer ? innerSourceMap : void 0;
        this._removeOriginalSource = removeOriginalSource;
      }
      _ensureValueBuffer() {
        if (this._valueAsBuffer === void 0) {
          this._valueAsBuffer = Buffer.from(this._valueAsString, "utf-8");
        }
      }
      _ensureValueString() {
        if (this._valueAsString === void 0) {
          this._valueAsString = this._valueAsBuffer.toString("utf-8");
        }
      }
      _ensureOriginalSourceBuffer() {
        if (this._originalSourceAsBuffer === void 0 && this._hasOriginalSource) {
          this._originalSourceAsBuffer = Buffer.from(
            this._originalSourceAsString,
            "utf-8"
          );
        }
      }
      _ensureOriginalSourceString() {
        if (this._originalSourceAsString === void 0 && this._hasOriginalSource) {
          this._originalSourceAsString = this._originalSourceAsBuffer.toString(
            "utf-8"
          );
        }
      }
      _ensureInnerSourceMapObject() {
        if (this._innerSourceMapAsObject === void 0 && this._hasInnerSourceMap) {
          this._ensureInnerSourceMapString();
          this._innerSourceMapAsObject = JSON.parse(this._innerSourceMapAsString);
        }
      }
      _ensureInnerSourceMapBuffer() {
        if (this._innerSourceMapAsBuffer === void 0 && this._hasInnerSourceMap) {
          this._ensureInnerSourceMapString();
          this._innerSourceMapAsBuffer = Buffer.from(
            this._innerSourceMapAsString,
            "utf-8"
          );
        }
      }
      _ensureInnerSourceMapString() {
        if (this._innerSourceMapAsString === void 0 && this._hasInnerSourceMap) {
          if (this._innerSourceMapAsBuffer !== void 0) {
            this._innerSourceMapAsString = this._innerSourceMapAsBuffer.toString(
              "utf-8"
            );
          } else {
            this._innerSourceMapAsString = JSON.stringify(
              this._innerSourceMapAsObject
            );
          }
        }
      }
      _ensureSourceMapObject() {
        if (this._sourceMapAsObject === void 0) {
          this._ensureSourceMapString();
          this._sourceMapAsObject = JSON.parse(this._sourceMapAsString);
        }
      }
      _ensureSourceMapBuffer() {
        if (this._sourceMapAsBuffer === void 0) {
          this._ensureSourceMapString();
          this._sourceMapAsBuffer = Buffer.from(this._sourceMapAsString, "utf-8");
        }
      }
      _ensureSourceMapString() {
        if (this._sourceMapAsString === void 0) {
          if (this._sourceMapAsBuffer !== void 0) {
            this._sourceMapAsString = this._sourceMapAsBuffer.toString("utf-8");
          } else {
            this._sourceMapAsString = JSON.stringify(this._sourceMapAsObject);
          }
        }
      }
      getArgsAsBuffers() {
        this._ensureValueBuffer();
        this._ensureSourceMapBuffer();
        this._ensureOriginalSourceBuffer();
        this._ensureInnerSourceMapBuffer();
        return [
          this._valueAsBuffer,
          this._name,
          this._sourceMapAsBuffer,
          this._originalSourceAsBuffer,
          this._innerSourceMapAsBuffer,
          this._removeOriginalSource
        ];
      }
      buffer() {
        this._ensureValueBuffer();
        return this._valueAsBuffer;
      }
      source() {
        this._ensureValueString();
        return this._valueAsString;
      }
      map(options) {
        if (!this._hasInnerSourceMap) {
          this._ensureSourceMapObject();
          return this._sourceMapAsObject;
        }
        return getMap(this, options);
      }
      sourceAndMap(options) {
        if (!this._hasInnerSourceMap) {
          this._ensureValueString();
          this._ensureSourceMapObject();
          return {
            source: this._valueAsString,
            map: this._sourceMapAsObject
          };
        }
        return getSourceAndMap(this, options);
      }
      streamChunks(options, onChunk, onSource, onName) {
        this._ensureValueString();
        this._ensureSourceMapObject();
        this._ensureOriginalSourceString();
        if (this._hasInnerSourceMap) {
          this._ensureInnerSourceMapObject();
          return streamChunksOfCombinedSourceMap(
            this._valueAsString,
            this._sourceMapAsObject,
            this._name,
            this._originalSourceAsString,
            this._innerSourceMapAsObject,
            this._removeOriginalSource,
            onChunk,
            onSource,
            onName,
            !!(options && options.finalSource),
            !!(options && options.columns !== false)
          );
        } else {
          return streamChunksOfSourceMap(
            this._valueAsString,
            this._sourceMapAsObject,
            onChunk,
            onSource,
            onName,
            !!(options && options.finalSource),
            !!(options && options.columns !== false)
          );
        }
      }
      updateHash(hash) {
        this._ensureValueBuffer();
        this._ensureSourceMapBuffer();
        this._ensureOriginalSourceBuffer();
        this._ensureInnerSourceMapBuffer();
        hash.update("SourceMapSource");
        hash.update(this._valueAsBuffer);
        hash.update(this._sourceMapAsBuffer);
        if (this._hasOriginalSource) {
          hash.update(this._originalSourceAsBuffer);
        }
        if (this._hasInnerSourceMap) {
          hash.update(this._innerSourceMapAsBuffer);
        }
        hash.update(this._removeOriginalSource ? "true" : "false");
      }
    };
    module.exports = SourceMapSource;
  }
});

// node_modules/webpack-sources/lib/helpers/streamChunks.js
var require_streamChunks = __commonJS({
  "node_modules/webpack-sources/lib/helpers/streamChunks.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var streamChunksOfRawSource = require_streamChunksOfRawSource();
    var streamChunksOfSourceMap = require_streamChunksOfSourceMap();
    module.exports = (source, options, onChunk, onSource, onName) => {
      if (typeof source.streamChunks === "function") {
        return source.streamChunks(options, onChunk, onSource, onName);
      } else {
        const sourceAndMap = source.sourceAndMap(options);
        if (sourceAndMap.map) {
          return streamChunksOfSourceMap(
            sourceAndMap.source,
            sourceAndMap.map,
            onChunk,
            onSource,
            onName,
            !!(options && options.finalSource),
            !!(options && options.columns !== false)
          );
        } else {
          return streamChunksOfRawSource(
            sourceAndMap.source,
            onChunk,
            onSource,
            onName,
            !!(options && options.finalSource)
          );
        }
      }
    };
  }
});

// node_modules/webpack-sources/lib/helpers/streamAndGetSourceAndMap.js
var require_streamAndGetSourceAndMap = __commonJS({
  "node_modules/webpack-sources/lib/helpers/streamAndGetSourceAndMap.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var createMappingsSerializer = require_createMappingsSerializer();
    var streamChunks = require_streamChunks();
    var streamAndGetSourceAndMap = (inputSource, options, onChunk, onSource, onName) => {
      let code = "";
      let mappings = "";
      let sources = [];
      let sourcesContent = [];
      let names = [];
      const addMapping = createMappingsSerializer(
        Object.assign({}, options, { columns: true })
      );
      const finalSource = !!(options && options.finalSource);
      const { generatedLine, generatedColumn, source } = streamChunks(
        inputSource,
        options,
        (chunk, generatedLine2, generatedColumn2, sourceIndex, originalLine, originalColumn, nameIndex) => {
          if (chunk !== void 0)
            code += chunk;
          mappings += addMapping(
            generatedLine2,
            generatedColumn2,
            sourceIndex,
            originalLine,
            originalColumn,
            nameIndex
          );
          return onChunk(
            finalSource ? void 0 : chunk,
            generatedLine2,
            generatedColumn2,
            sourceIndex,
            originalLine,
            originalColumn,
            nameIndex
          );
        },
        (sourceIndex, source2, sourceContent) => {
          while (sources.length < sourceIndex) {
            sources.push(null);
          }
          sources[sourceIndex] = source2;
          if (sourceContent !== void 0) {
            while (sourcesContent.length < sourceIndex) {
              sourcesContent.push(null);
            }
            sourcesContent[sourceIndex] = sourceContent;
          }
          return onSource(sourceIndex, source2, sourceContent);
        },
        (nameIndex, name) => {
          while (names.length < nameIndex) {
            names.push(null);
          }
          names[nameIndex] = name;
          return onName(nameIndex, name);
        }
      );
      const resultSource = source !== void 0 ? source : code;
      return {
        result: {
          generatedLine,
          generatedColumn,
          source: finalSource ? resultSource : void 0
        },
        source: resultSource,
        map: mappings.length > 0 ? {
          version: 3,
          file: "x",
          mappings,
          sources,
          sourcesContent: sourcesContent.length > 0 ? sourcesContent : void 0,
          names
        } : null
      };
    };
    module.exports = streamAndGetSourceAndMap;
  }
});

// node_modules/webpack-sources/lib/CachedSource.js
var require_CachedSource = __commonJS({
  "node_modules/webpack-sources/lib/CachedSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Source = require_Source();
    var streamChunksOfSourceMap = require_streamChunksOfSourceMap();
    var streamChunksOfRawSource = require_streamChunksOfRawSource();
    var streamAndGetSourceAndMap = require_streamAndGetSourceAndMap();
    var mapToBufferedMap = (map) => {
      if (typeof map !== "object" || !map)
        return map;
      const bufferedMap = Object.assign({}, map);
      if (map.mappings) {
        bufferedMap.mappings = Buffer.from(map.mappings, "utf-8");
      }
      if (map.sourcesContent) {
        bufferedMap.sourcesContent = map.sourcesContent.map(
          (str) => str && Buffer.from(str, "utf-8")
        );
      }
      return bufferedMap;
    };
    var bufferedMapToMap = (bufferedMap) => {
      if (typeof bufferedMap !== "object" || !bufferedMap)
        return bufferedMap;
      const map = Object.assign({}, bufferedMap);
      if (bufferedMap.mappings) {
        map.mappings = bufferedMap.mappings.toString("utf-8");
      }
      if (bufferedMap.sourcesContent) {
        map.sourcesContent = bufferedMap.sourcesContent.map(
          (buffer) => buffer && buffer.toString("utf-8")
        );
      }
      return map;
    };
    var CachedSource = class extends Source {
      constructor(source, cachedData) {
        super();
        this._source = source;
        this._cachedSourceType = cachedData ? cachedData.source : void 0;
        this._cachedSource = void 0;
        this._cachedBuffer = cachedData ? cachedData.buffer : void 0;
        this._cachedSize = cachedData ? cachedData.size : void 0;
        this._cachedMaps = cachedData ? cachedData.maps : /* @__PURE__ */ new Map();
        this._cachedHashUpdate = cachedData ? cachedData.hash : void 0;
      }
      getCachedData() {
        const bufferedMaps = /* @__PURE__ */ new Map();
        for (const pair of this._cachedMaps) {
          let cacheEntry = pair[1];
          if (cacheEntry.bufferedMap === void 0) {
            cacheEntry.bufferedMap = mapToBufferedMap(
              this._getMapFromCacheEntry(cacheEntry)
            );
          }
          bufferedMaps.set(pair[0], {
            map: void 0,
            bufferedMap: cacheEntry.bufferedMap
          });
        }
        if (this._cachedSource) {
          this.buffer();
        }
        return {
          buffer: this._cachedBuffer,
          source: this._cachedSourceType !== void 0 ? this._cachedSourceType : typeof this._cachedSource === "string" ? true : Buffer.isBuffer(this._cachedSource) ? false : void 0,
          size: this._cachedSize,
          maps: bufferedMaps,
          hash: this._cachedHashUpdate
        };
      }
      originalLazy() {
        return this._source;
      }
      original() {
        if (typeof this._source === "function")
          this._source = this._source();
        return this._source;
      }
      source() {
        const source = this._getCachedSource();
        if (source !== void 0)
          return source;
        return this._cachedSource = this.original().source();
      }
      _getMapFromCacheEntry(cacheEntry) {
        if (cacheEntry.map !== void 0) {
          return cacheEntry.map;
        } else if (cacheEntry.bufferedMap !== void 0) {
          return cacheEntry.map = bufferedMapToMap(cacheEntry.bufferedMap);
        }
      }
      _getCachedSource() {
        if (this._cachedSource !== void 0)
          return this._cachedSource;
        if (this._cachedBuffer && this._cachedSourceType !== void 0) {
          return this._cachedSource = this._cachedSourceType ? this._cachedBuffer.toString("utf-8") : this._cachedBuffer;
        }
      }
      buffer() {
        if (this._cachedBuffer !== void 0)
          return this._cachedBuffer;
        if (this._cachedSource !== void 0) {
          if (Buffer.isBuffer(this._cachedSource)) {
            return this._cachedBuffer = this._cachedSource;
          }
          return this._cachedBuffer = Buffer.from(this._cachedSource, "utf-8");
        }
        if (typeof this.original().buffer === "function") {
          return this._cachedBuffer = this.original().buffer();
        }
        const bufferOrString = this.source();
        if (Buffer.isBuffer(bufferOrString)) {
          return this._cachedBuffer = bufferOrString;
        }
        return this._cachedBuffer = Buffer.from(bufferOrString, "utf-8");
      }
      size() {
        if (this._cachedSize !== void 0)
          return this._cachedSize;
        if (this._cachedBuffer !== void 0) {
          return this._cachedSize = this._cachedBuffer.length;
        }
        const source = this._getCachedSource();
        if (source !== void 0) {
          return this._cachedSize = Buffer.byteLength(source);
        }
        return this._cachedSize = this.original().size();
      }
      sourceAndMap(options) {
        const key = options ? JSON.stringify(options) : "{}";
        const cacheEntry = this._cachedMaps.get(key);
        if (cacheEntry !== void 0) {
          const map2 = this._getMapFromCacheEntry(cacheEntry);
          return { source: this.source(), map: map2 };
        }
        let source = this._getCachedSource();
        let map;
        if (source !== void 0) {
          map = this.original().map(options);
        } else {
          const sourceAndMap = this.original().sourceAndMap(options);
          source = sourceAndMap.source;
          map = sourceAndMap.map;
          this._cachedSource = source;
        }
        this._cachedMaps.set(key, {
          map,
          bufferedMap: void 0
        });
        return { source, map };
      }
      streamChunks(options, onChunk, onSource, onName) {
        const key = options ? JSON.stringify(options) : "{}";
        if (this._cachedMaps.has(key) && (this._cachedBuffer !== void 0 || this._cachedSource !== void 0)) {
          const { source: source2, map: map2 } = this.sourceAndMap(options);
          if (map2) {
            return streamChunksOfSourceMap(
              source2,
              map2,
              onChunk,
              onSource,
              onName,
              !!(options && options.finalSource),
              true
            );
          } else {
            return streamChunksOfRawSource(
              source2,
              onChunk,
              onSource,
              onName,
              !!(options && options.finalSource)
            );
          }
        }
        const { result, source, map } = streamAndGetSourceAndMap(
          this.original(),
          options,
          onChunk,
          onSource,
          onName
        );
        this._cachedSource = source;
        this._cachedMaps.set(key, {
          map,
          bufferedMap: void 0
        });
        return result;
      }
      map(options) {
        const key = options ? JSON.stringify(options) : "{}";
        const cacheEntry = this._cachedMaps.get(key);
        if (cacheEntry !== void 0) {
          return this._getMapFromCacheEntry(cacheEntry);
        }
        const map = this.original().map(options);
        this._cachedMaps.set(key, {
          map,
          bufferedMap: void 0
        });
        return map;
      }
      updateHash(hash) {
        if (this._cachedHashUpdate !== void 0) {
          for (const item of this._cachedHashUpdate)
            hash.update(item);
          return;
        }
        const update = [];
        let currentString = void 0;
        const tracker = {
          update: (item) => {
            if (typeof item === "string" && item.length < 10240) {
              if (currentString === void 0) {
                currentString = item;
              } else {
                currentString += item;
                if (currentString.length > 102400) {
                  update.push(Buffer.from(currentString));
                  currentString = void 0;
                }
              }
            } else {
              if (currentString !== void 0) {
                update.push(Buffer.from(currentString));
                currentString = void 0;
              }
              update.push(item);
            }
          }
        };
        this.original().updateHash(tracker);
        if (currentString !== void 0) {
          update.push(Buffer.from(currentString));
        }
        for (const item of update)
          hash.update(item);
        this._cachedHashUpdate = update;
      }
    };
    module.exports = CachedSource;
  }
});

// node_modules/webpack-sources/lib/ConcatSource.js
var require_ConcatSource = __commonJS({
  "node_modules/webpack-sources/lib/ConcatSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Source = require_Source();
    var RawSource2 = require_RawSource();
    var streamChunks = require_streamChunks();
    var { getMap, getSourceAndMap } = require_getFromStreamChunks();
    var stringsAsRawSources = /* @__PURE__ */ new WeakSet();
    var ConcatSource = class extends Source {
      constructor() {
        super();
        this._children = [];
        for (let i = 0; i < arguments.length; i++) {
          const item = arguments[i];
          if (item instanceof ConcatSource) {
            for (const child of item._children) {
              this._children.push(child);
            }
          } else {
            this._children.push(item);
          }
        }
        this._isOptimized = arguments.length === 0;
      }
      getChildren() {
        if (!this._isOptimized)
          this._optimize();
        return this._children;
      }
      add(item) {
        if (item instanceof ConcatSource) {
          for (const child of item._children) {
            this._children.push(child);
          }
        } else {
          this._children.push(item);
        }
        this._isOptimized = false;
      }
      addAllSkipOptimizing(items) {
        for (const item of items) {
          this._children.push(item);
        }
      }
      buffer() {
        if (!this._isOptimized)
          this._optimize();
        const buffers = [];
        for (const child of this._children) {
          if (typeof child.buffer === "function") {
            buffers.push(child.buffer());
          } else {
            const bufferOrString = child.source();
            if (Buffer.isBuffer(bufferOrString)) {
              buffers.push(bufferOrString);
            } else {
              buffers.push(Buffer.from(bufferOrString, "utf-8"));
            }
          }
        }
        return Buffer.concat(buffers);
      }
      source() {
        if (!this._isOptimized)
          this._optimize();
        let source = "";
        for (const child of this._children) {
          source += child.source();
        }
        return source;
      }
      size() {
        if (!this._isOptimized)
          this._optimize();
        let size = 0;
        for (const child of this._children) {
          size += child.size();
        }
        return size;
      }
      map(options) {
        return getMap(this, options);
      }
      sourceAndMap(options) {
        return getSourceAndMap(this, options);
      }
      streamChunks(options, onChunk, onSource, onName) {
        if (!this._isOptimized)
          this._optimize();
        if (this._children.length === 1)
          return this._children[0].streamChunks(options, onChunk, onSource, onName);
        let currentLineOffset = 0;
        let currentColumnOffset = 0;
        let sourceMapping = /* @__PURE__ */ new Map();
        let nameMapping = /* @__PURE__ */ new Map();
        const finalSource = !!(options && options.finalSource);
        let code = "";
        let needToCloseMapping = false;
        for (const item of this._children) {
          const sourceIndexMapping = [];
          const nameIndexMapping = [];
          let lastMappingLine = 0;
          const { generatedLine, generatedColumn, source } = streamChunks(
            item,
            options,
            // eslint-disable-next-line no-loop-func
            (chunk, generatedLine2, generatedColumn2, sourceIndex, originalLine, originalColumn, nameIndex) => {
              const line = generatedLine2 + currentLineOffset;
              const column = generatedLine2 === 1 ? generatedColumn2 + currentColumnOffset : generatedColumn2;
              if (needToCloseMapping) {
                if (generatedLine2 !== 1 || generatedColumn2 !== 0) {
                  onChunk(
                    void 0,
                    currentLineOffset + 1,
                    currentColumnOffset,
                    -1,
                    -1,
                    -1,
                    -1
                  );
                }
                needToCloseMapping = false;
              }
              const resultSourceIndex = sourceIndex < 0 || sourceIndex >= sourceIndexMapping.length ? -1 : sourceIndexMapping[sourceIndex];
              const resultNameIndex = nameIndex < 0 || nameIndex >= nameIndexMapping.length ? -1 : nameIndexMapping[nameIndex];
              lastMappingLine = resultSourceIndex < 0 ? 0 : generatedLine2;
              if (finalSource) {
                if (chunk !== void 0)
                  code += chunk;
                if (resultSourceIndex >= 0) {
                  onChunk(
                    void 0,
                    line,
                    column,
                    resultSourceIndex,
                    originalLine,
                    originalColumn,
                    resultNameIndex
                  );
                }
              } else {
                if (resultSourceIndex < 0) {
                  onChunk(chunk, line, column, -1, -1, -1, -1);
                } else {
                  onChunk(
                    chunk,
                    line,
                    column,
                    resultSourceIndex,
                    originalLine,
                    originalColumn,
                    resultNameIndex
                  );
                }
              }
            },
            (i, source2, sourceContent) => {
              let globalIndex = sourceMapping.get(source2);
              if (globalIndex === void 0) {
                sourceMapping.set(source2, globalIndex = sourceMapping.size);
                onSource(globalIndex, source2, sourceContent);
              }
              sourceIndexMapping[i] = globalIndex;
            },
            (i, name) => {
              let globalIndex = nameMapping.get(name);
              if (globalIndex === void 0) {
                nameMapping.set(name, globalIndex = nameMapping.size);
                onName(globalIndex, name);
              }
              nameIndexMapping[i] = globalIndex;
            }
          );
          if (source !== void 0)
            code += source;
          if (needToCloseMapping) {
            if (generatedLine !== 1 || generatedColumn !== 0) {
              onChunk(
                void 0,
                currentLineOffset + 1,
                currentColumnOffset,
                -1,
                -1,
                -1,
                -1
              );
              needToCloseMapping = false;
            }
          }
          if (generatedLine > 1) {
            currentColumnOffset = generatedColumn;
          } else {
            currentColumnOffset += generatedColumn;
          }
          needToCloseMapping = needToCloseMapping || finalSource && lastMappingLine === generatedLine;
          currentLineOffset += generatedLine - 1;
        }
        return {
          generatedLine: currentLineOffset + 1,
          generatedColumn: currentColumnOffset,
          source: finalSource ? code : void 0
        };
      }
      updateHash(hash) {
        if (!this._isOptimized)
          this._optimize();
        hash.update("ConcatSource");
        for (const item of this._children) {
          item.updateHash(hash);
        }
      }
      _optimize() {
        const newChildren = [];
        let currentString = void 0;
        let currentRawSources = void 0;
        const addStringToRawSources = (string2) => {
          if (currentRawSources === void 0) {
            currentRawSources = string2;
          } else if (Array.isArray(currentRawSources)) {
            currentRawSources.push(string2);
          } else {
            currentRawSources = [
              typeof currentRawSources === "string" ? currentRawSources : currentRawSources.source(),
              string2
            ];
          }
        };
        const addSourceToRawSources = (source) => {
          if (currentRawSources === void 0) {
            currentRawSources = source;
          } else if (Array.isArray(currentRawSources)) {
            currentRawSources.push(source.source());
          } else {
            currentRawSources = [
              typeof currentRawSources === "string" ? currentRawSources : currentRawSources.source(),
              source.source()
            ];
          }
        };
        const mergeRawSources = () => {
          if (Array.isArray(currentRawSources)) {
            const rawSource = new RawSource2(currentRawSources.join(""));
            stringsAsRawSources.add(rawSource);
            newChildren.push(rawSource);
          } else if (typeof currentRawSources === "string") {
            const rawSource = new RawSource2(currentRawSources);
            stringsAsRawSources.add(rawSource);
            newChildren.push(rawSource);
          } else {
            newChildren.push(currentRawSources);
          }
        };
        for (const child of this._children) {
          if (typeof child === "string") {
            if (currentString === void 0) {
              currentString = child;
            } else {
              currentString += child;
            }
          } else {
            if (currentString !== void 0) {
              addStringToRawSources(currentString);
              currentString = void 0;
            }
            if (stringsAsRawSources.has(child)) {
              addSourceToRawSources(child);
            } else {
              if (currentRawSources !== void 0) {
                mergeRawSources();
                currentRawSources = void 0;
              }
              newChildren.push(child);
            }
          }
        }
        if (currentString !== void 0) {
          addStringToRawSources(currentString);
        }
        if (currentRawSources !== void 0) {
          mergeRawSources();
        }
        this._children = newChildren;
        this._isOptimized = true;
      }
    };
    module.exports = ConcatSource;
  }
});

// node_modules/webpack-sources/lib/ReplaceSource.js
var require_ReplaceSource = __commonJS({
  "node_modules/webpack-sources/lib/ReplaceSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var { getMap, getSourceAndMap } = require_getFromStreamChunks();
    var streamChunks = require_streamChunks();
    var Source = require_Source();
    var splitIntoLines = require_splitIntoLines();
    var hasStableSort = typeof process === "object" && process.versions && typeof process.versions.v8 === "string" && !/^[0-6]\./.test(process.versions.v8);
    var MAX_SOURCE_POSITION = 536870912;
    var Replacement = class {
      constructor(start, end, content, name) {
        this.start = start;
        this.end = end;
        this.content = content;
        this.name = name;
        if (!hasStableSort) {
          this.index = -1;
        }
      }
    };
    var ReplaceSource = class extends Source {
      constructor(source, name) {
        super();
        this._source = source;
        this._name = name;
        this._replacements = [];
        this._isSorted = true;
      }
      getName() {
        return this._name;
      }
      getReplacements() {
        this._sortReplacements();
        return this._replacements;
      }
      replace(start, end, newValue, name) {
        if (typeof newValue !== "string")
          throw new Error(
            "insertion must be a string, but is a " + typeof newValue
          );
        this._replacements.push(new Replacement(start, end, newValue, name));
        this._isSorted = false;
      }
      insert(pos, newValue, name) {
        if (typeof newValue !== "string")
          throw new Error(
            "insertion must be a string, but is a " + typeof newValue + ": " + newValue
          );
        this._replacements.push(new Replacement(pos, pos - 1, newValue, name));
        this._isSorted = false;
      }
      source() {
        if (this._replacements.length === 0) {
          return this._source.source();
        }
        let current = this._source.source();
        let pos = 0;
        const result = [];
        this._sortReplacements();
        for (const replacement of this._replacements) {
          const start = Math.floor(replacement.start);
          const end = Math.floor(replacement.end + 1);
          if (pos < start) {
            const offset = start - pos;
            result.push(current.slice(0, offset));
            current = current.slice(offset);
            pos = start;
          }
          result.push(replacement.content);
          if (pos < end) {
            const offset = end - pos;
            current = current.slice(offset);
            pos = end;
          }
        }
        result.push(current);
        return result.join("");
      }
      map(options) {
        if (this._replacements.length === 0) {
          return this._source.map(options);
        }
        return getMap(this, options);
      }
      sourceAndMap(options) {
        if (this._replacements.length === 0) {
          return this._source.sourceAndMap(options);
        }
        return getSourceAndMap(this, options);
      }
      original() {
        return this._source;
      }
      _sortReplacements() {
        if (this._isSorted)
          return;
        if (hasStableSort) {
          this._replacements.sort(function(a, b) {
            const diff1 = a.start - b.start;
            if (diff1 !== 0)
              return diff1;
            const diff2 = a.end - b.end;
            if (diff2 !== 0)
              return diff2;
            return 0;
          });
        } else {
          this._replacements.forEach((repl, i) => repl.index = i);
          this._replacements.sort(function(a, b) {
            const diff1 = a.start - b.start;
            if (diff1 !== 0)
              return diff1;
            const diff2 = a.end - b.end;
            if (diff2 !== 0)
              return diff2;
            return a.index - b.index;
          });
        }
        this._isSorted = true;
      }
      streamChunks(options, onChunk, onSource, onName) {
        this._sortReplacements();
        const repls = this._replacements;
        let pos = 0;
        let i = 0;
        let replacmentEnd = -1;
        let nextReplacement = i < repls.length ? Math.floor(repls[i].start) : MAX_SOURCE_POSITION;
        let generatedLineOffset = 0;
        let generatedColumnOffset = 0;
        let generatedColumnOffsetLine = 0;
        const sourceContents = [];
        const nameMapping = /* @__PURE__ */ new Map();
        const nameIndexMapping = [];
        const checkOriginalContent = (sourceIndex, line2, column, expectedChunk) => {
          let content = sourceIndex < sourceContents.length ? sourceContents[sourceIndex] : void 0;
          if (content === void 0)
            return false;
          if (typeof content === "string") {
            content = splitIntoLines(content);
            sourceContents[sourceIndex] = content;
          }
          const contentLine = line2 <= content.length ? content[line2 - 1] : null;
          if (contentLine === null)
            return false;
          return contentLine.slice(column, column + expectedChunk.length) === expectedChunk;
        };
        let { generatedLine, generatedColumn } = streamChunks(
          this._source,
          Object.assign({}, options, { finalSource: false }),
          (chunk, generatedLine2, generatedColumn2, sourceIndex, originalLine, originalColumn, nameIndex) => {
            let chunkPos = 0;
            let endPos = pos + chunk.length;
            if (replacmentEnd > pos) {
              if (replacmentEnd >= endPos) {
                const line3 = generatedLine2 + generatedLineOffset;
                if (chunk.endsWith("\n")) {
                  generatedLineOffset--;
                  if (generatedColumnOffsetLine === line3) {
                    generatedColumnOffset += generatedColumn2;
                  }
                } else if (generatedColumnOffsetLine === line3) {
                  generatedColumnOffset -= chunk.length;
                } else {
                  generatedColumnOffset = -chunk.length;
                  generatedColumnOffsetLine = line3;
                }
                pos = endPos;
                return;
              }
              chunkPos = replacmentEnd - pos;
              if (checkOriginalContent(
                sourceIndex,
                originalLine,
                originalColumn,
                chunk.slice(0, chunkPos)
              )) {
                originalColumn += chunkPos;
              }
              pos += chunkPos;
              const line2 = generatedLine2 + generatedLineOffset;
              if (generatedColumnOffsetLine === line2) {
                generatedColumnOffset -= chunkPos;
              } else {
                generatedColumnOffset = -chunkPos;
                generatedColumnOffsetLine = line2;
              }
              generatedColumn2 += chunkPos;
            }
            if (nextReplacement < endPos) {
              do {
                let line2 = generatedLine2 + generatedLineOffset;
                if (nextReplacement > pos) {
                  const offset2 = nextReplacement - pos;
                  const chunkSlice = chunk.slice(chunkPos, chunkPos + offset2);
                  onChunk(
                    chunkSlice,
                    line2,
                    generatedColumn2 + (line2 === generatedColumnOffsetLine ? generatedColumnOffset : 0),
                    sourceIndex,
                    originalLine,
                    originalColumn,
                    nameIndex < 0 || nameIndex >= nameIndexMapping.length ? -1 : nameIndexMapping[nameIndex]
                  );
                  generatedColumn2 += offset2;
                  chunkPos += offset2;
                  pos = nextReplacement;
                  if (checkOriginalContent(
                    sourceIndex,
                    originalLine,
                    originalColumn,
                    chunkSlice
                  )) {
                    originalColumn += chunkSlice.length;
                  }
                }
                const { content, name } = repls[i];
                let matches2 = splitIntoLines(content);
                let replacementNameIndex = nameIndex;
                if (sourceIndex >= 0 && name) {
                  let globalIndex = nameMapping.get(name);
                  if (globalIndex === void 0) {
                    globalIndex = nameMapping.size;
                    nameMapping.set(name, globalIndex);
                    onName(globalIndex, name);
                  }
                  replacementNameIndex = globalIndex;
                }
                for (let m = 0; m < matches2.length; m++) {
                  const contentLine = matches2[m];
                  onChunk(
                    contentLine,
                    line2,
                    generatedColumn2 + (line2 === generatedColumnOffsetLine ? generatedColumnOffset : 0),
                    sourceIndex,
                    originalLine,
                    originalColumn,
                    replacementNameIndex
                  );
                  replacementNameIndex = -1;
                  if (m === matches2.length - 1 && !contentLine.endsWith("\n")) {
                    if (generatedColumnOffsetLine === line2) {
                      generatedColumnOffset += contentLine.length;
                    } else {
                      generatedColumnOffset = contentLine.length;
                      generatedColumnOffsetLine = line2;
                    }
                  } else {
                    generatedLineOffset++;
                    line2++;
                    generatedColumnOffset = -generatedColumn2;
                    generatedColumnOffsetLine = line2;
                  }
                }
                replacmentEnd = Math.max(
                  replacmentEnd,
                  Math.floor(repls[i].end + 1)
                );
                i++;
                nextReplacement = i < repls.length ? Math.floor(repls[i].start) : MAX_SOURCE_POSITION;
                const offset = chunk.length - endPos + replacmentEnd - chunkPos;
                if (offset > 0) {
                  if (replacmentEnd >= endPos) {
                    let line4 = generatedLine2 + generatedLineOffset;
                    if (chunk.endsWith("\n")) {
                      generatedLineOffset--;
                      if (generatedColumnOffsetLine === line4) {
                        generatedColumnOffset += generatedColumn2;
                      }
                    } else if (generatedColumnOffsetLine === line4) {
                      generatedColumnOffset -= chunk.length - chunkPos;
                    } else {
                      generatedColumnOffset = chunkPos - chunk.length;
                      generatedColumnOffsetLine = line4;
                    }
                    pos = endPos;
                    return;
                  }
                  const line3 = generatedLine2 + generatedLineOffset;
                  if (checkOriginalContent(
                    sourceIndex,
                    originalLine,
                    originalColumn,
                    chunk.slice(chunkPos, chunkPos + offset)
                  )) {
                    originalColumn += offset;
                  }
                  chunkPos += offset;
                  pos += offset;
                  if (generatedColumnOffsetLine === line3) {
                    generatedColumnOffset -= offset;
                  } else {
                    generatedColumnOffset = -offset;
                    generatedColumnOffsetLine = line3;
                  }
                  generatedColumn2 += offset;
                }
              } while (nextReplacement < endPos);
            }
            if (chunkPos < chunk.length) {
              const chunkSlice = chunkPos === 0 ? chunk : chunk.slice(chunkPos);
              const line2 = generatedLine2 + generatedLineOffset;
              onChunk(
                chunkSlice,
                line2,
                generatedColumn2 + (line2 === generatedColumnOffsetLine ? generatedColumnOffset : 0),
                sourceIndex,
                originalLine,
                originalColumn,
                nameIndex < 0 ? -1 : nameIndexMapping[nameIndex]
              );
            }
            pos = endPos;
          },
          (sourceIndex, source, sourceContent) => {
            while (sourceContents.length < sourceIndex)
              sourceContents.push(void 0);
            sourceContents[sourceIndex] = sourceContent;
            onSource(sourceIndex, source, sourceContent);
          },
          (nameIndex, name) => {
            let globalIndex = nameMapping.get(name);
            if (globalIndex === void 0) {
              globalIndex = nameMapping.size;
              nameMapping.set(name, globalIndex);
              onName(globalIndex, name);
            }
            nameIndexMapping[nameIndex] = globalIndex;
          }
        );
        let remainer = "";
        for (; i < repls.length; i++) {
          remainer += repls[i].content;
        }
        let line = generatedLine + generatedLineOffset;
        let matches = splitIntoLines(remainer);
        for (let m = 0; m < matches.length; m++) {
          const contentLine = matches[m];
          onChunk(
            contentLine,
            line,
            generatedColumn + (line === generatedColumnOffsetLine ? generatedColumnOffset : 0),
            -1,
            -1,
            -1,
            -1
          );
          if (m === matches.length - 1 && !contentLine.endsWith("\n")) {
            if (generatedColumnOffsetLine === line) {
              generatedColumnOffset += contentLine.length;
            } else {
              generatedColumnOffset = contentLine.length;
              generatedColumnOffsetLine = line;
            }
          } else {
            generatedLineOffset++;
            line++;
            generatedColumnOffset = -generatedColumn;
            generatedColumnOffsetLine = line;
          }
        }
        return {
          generatedLine: line,
          generatedColumn: generatedColumn + (line === generatedColumnOffsetLine ? generatedColumnOffset : 0)
        };
      }
      updateHash(hash) {
        this._sortReplacements();
        hash.update("ReplaceSource");
        this._source.updateHash(hash);
        hash.update(this._name || "");
        for (const repl of this._replacements) {
          hash.update(`${repl.start}${repl.end}${repl.content}${repl.name}`);
        }
      }
    };
    module.exports = ReplaceSource;
  }
});

// node_modules/webpack-sources/lib/PrefixSource.js
var require_PrefixSource = __commonJS({
  "node_modules/webpack-sources/lib/PrefixSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Source = require_Source();
    var RawSource2 = require_RawSource();
    var streamChunks = require_streamChunks();
    var { getMap, getSourceAndMap } = require_getFromStreamChunks();
    var REPLACE_REGEX = /\n(?=.|\s)/g;
    var PrefixSource = class extends Source {
      constructor(prefix, source) {
        super();
        this._source = typeof source === "string" || Buffer.isBuffer(source) ? new RawSource2(source, true) : source;
        this._prefix = prefix;
      }
      getPrefix() {
        return this._prefix;
      }
      original() {
        return this._source;
      }
      source() {
        const node = this._source.source();
        const prefix = this._prefix;
        return prefix + node.replace(REPLACE_REGEX, "\n" + prefix);
      }
      // TODO efficient buffer() implementation
      map(options) {
        return getMap(this, options);
      }
      sourceAndMap(options) {
        return getSourceAndMap(this, options);
      }
      streamChunks(options, onChunk, onSource, onName) {
        const prefix = this._prefix;
        const prefixOffset = prefix.length;
        const linesOnly = !!(options && options.columns === false);
        const { generatedLine, generatedColumn, source } = streamChunks(
          this._source,
          options,
          (chunk, generatedLine2, generatedColumn2, sourceIndex, originalLine, originalColumn, nameIndex) => {
            if (generatedColumn2 !== 0) {
              generatedColumn2 += prefixOffset;
            } else if (chunk !== void 0) {
              if (linesOnly || sourceIndex < 0) {
                chunk = prefix + chunk;
              } else if (prefixOffset > 0) {
                onChunk(prefix, generatedLine2, generatedColumn2, -1, -1, -1, -1);
                generatedColumn2 += prefixOffset;
              }
            } else if (!linesOnly) {
              generatedColumn2 += prefixOffset;
            }
            onChunk(
              chunk,
              generatedLine2,
              generatedColumn2,
              sourceIndex,
              originalLine,
              originalColumn,
              nameIndex
            );
          },
          onSource,
          onName
        );
        return {
          generatedLine,
          generatedColumn: generatedColumn === 0 ? 0 : prefixOffset + generatedColumn,
          source: source !== void 0 ? prefix + source.replace(REPLACE_REGEX, "\n" + prefix) : void 0
        };
      }
      updateHash(hash) {
        hash.update("PrefixSource");
        this._source.updateHash(hash);
        hash.update(this._prefix);
      }
    };
    module.exports = PrefixSource;
  }
});

// node_modules/webpack-sources/lib/SizeOnlySource.js
var require_SizeOnlySource = __commonJS({
  "node_modules/webpack-sources/lib/SizeOnlySource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Source = require_Source();
    var SizeOnlySource = class extends Source {
      constructor(size) {
        super();
        this._size = size;
      }
      _error() {
        return new Error(
          "Content and Map of this Source is not available (only size() is supported)"
        );
      }
      size() {
        return this._size;
      }
      source() {
        throw this._error();
      }
      buffer() {
        throw this._error();
      }
      map(options) {
        throw this._error();
      }
      updateHash() {
        throw this._error();
      }
    };
    module.exports = SizeOnlySource;
  }
});

// node_modules/webpack-sources/lib/CompatSource.js
var require_CompatSource = __commonJS({
  "node_modules/webpack-sources/lib/CompatSource.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var Source = require_Source();
    var CompatSource = class extends Source {
      static from(sourceLike) {
        return sourceLike instanceof Source ? sourceLike : new CompatSource(sourceLike);
      }
      constructor(sourceLike) {
        super();
        this._sourceLike = sourceLike;
      }
      source() {
        return this._sourceLike.source();
      }
      buffer() {
        if (typeof this._sourceLike.buffer === "function") {
          return this._sourceLike.buffer();
        }
        return super.buffer();
      }
      size() {
        if (typeof this._sourceLike.size === "function") {
          return this._sourceLike.size();
        }
        return super.size();
      }
      map(options) {
        if (typeof this._sourceLike.map === "function") {
          return this._sourceLike.map(options);
        }
        return super.map(options);
      }
      sourceAndMap(options) {
        if (typeof this._sourceLike.sourceAndMap === "function") {
          return this._sourceLike.sourceAndMap(options);
        }
        return super.sourceAndMap(options);
      }
      updateHash(hash) {
        if (typeof this._sourceLike.updateHash === "function") {
          return this._sourceLike.updateHash(hash);
        }
        if (typeof this._sourceLike.map === "function") {
          throw new Error(
            "A Source-like object with a 'map' method must also provide an 'updateHash' method"
          );
        }
        hash.update(this.buffer());
      }
    };
    module.exports = CompatSource;
  }
});

// node_modules/webpack-sources/lib/index.js
var require_lib = __commonJS({
  "node_modules/webpack-sources/lib/index.js"(exports) {
    init_esm_shims();
    var defineExport = (name, fn) => {
      let value;
      Object.defineProperty(exports, name, {
        get: () => {
          if (fn !== void 0) {
            value = fn();
            fn = void 0;
          }
          return value;
        },
        configurable: true
      });
    };
    defineExport("Source", () => require_Source());
    defineExport("RawSource", () => require_RawSource());
    defineExport("OriginalSource", () => require_OriginalSource());
    defineExport("SourceMapSource", () => require_SourceMapSource());
    defineExport("CachedSource", () => require_CachedSource());
    defineExport("ConcatSource", () => require_ConcatSource());
    defineExport("ReplaceSource", () => require_ReplaceSource());
    defineExport("PrefixSource", () => require_PrefixSource());
    defineExport("SizeOnlySource", () => require_SizeOnlySource());
    defineExport("CompatSource", () => require_CompatSource());
  }
});

// index.ts
init_esm_shims();

// node_modules/@tdewolff/minify/index.js
init_esm_shims();
import { createRequire } from "node:module";
import { dirname } from "path";
import { fileURLToPath } from "url";
var require2 = createRequire(import.meta.url);
var __dirname = dirname(fileURLToPath(import.meta.url));
var { string, config, file } = require2("node-gyp-build")(__dirname);
var version = require2("./package.json").version;

// index.ts
var import_webpack_sources = __toESM(require_lib());
var Tdewolffminify = class {
  constructor(options) {
    const configs = options || {};
    config(configs);
  }
  minifyContent(content) {
    const minifiedCode = string("application/javascript", content);
    return minifiedCode;
  }
  apply(compiler) {
    const pluginName = "tdewolffminify-webpack-plugin";
    compiler.hooks.compilation.tap(pluginName, (compilation, options) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: pluginName,
          // Set the stage as PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
          additionalAssets: true
        },
        async (assets) => {
          for (const assetName of Object.keys(assets)) {
            if (assetName.endsWith(".js")) {
              const asset = assets[assetName];
              const minifiedContent = this.minifyContent(asset.source());
              if (minifiedContent) {
                compilation.updateAsset(assetName, new import_webpack_sources.RawSource(minifiedContent));
              }
            }
          }
        }
      );
    });
  }
};
export {
  Tdewolffminify
};
