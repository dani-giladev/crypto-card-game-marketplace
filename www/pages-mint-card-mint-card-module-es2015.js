(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-mint-card-mint-card-module"],{

/***/ "+X07":
/*!************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bitswap/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  wantlist: __webpack_require__(/*! ./wantlist */ "e18V")(config),
  wantlistForPeer: __webpack_require__(/*! ./wantlist-for-peer */ "Z+3+")(config),
  stat: __webpack_require__(/*! ./stat */ "i4cb")(config),
  unwant: __webpack_require__(/*! ./unwant */ "m9jS")(config)
})


/***/ }),

/***/ "+k5y":
/*!*******************************************!*\
  !*** ./node_modules/is-circular/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Node = __webpack_require__(/*! ./lib/node */ "BeX1")

module.exports = isCircular

/**
 * checks whether the object is circular
 * @param  {object}  obj - object to check circularity for
 * @return {Boolean} true if obj is circular, false if it is not
 */
function isCircular (obj) {
  if (!(obj instanceof Object)) {
    throw new TypeError('"obj" must be an object (or inherit from it)')
  }
  return _isCircular(obj)
}

/**
 * @private
 * checks whether the object is circular
 * @param  {object}  obj - object to check circularity for
 * @param  {Node}    parentList - linked-list that contains all the object's parents
 * @return {Boolean} true if obj is circular, false if it is not
 */
function _isCircular (obj, parentList) {
  parentList = new Node(obj, parentList)

  // breadth-first search for circular object
  for (var key in obj) {
    var val = obj[key]
    if (val instanceof Object) {
      if (parentList.contains(val) || _isCircular(val, parentList)) {
        return true
      }
    }
  }

  return false
}


/***/ }),

/***/ "+p9T":
/*!****************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/name/pubsub/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  cancel: __webpack_require__(/*! ./cancel */ "f5lt")(config),
  state: __webpack_require__(/*! ./state */ "tyBi")(config),
  subs: __webpack_require__(/*! ./subs */ "Jx8+")(config)
})


/***/ }),

/***/ "/+H3":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  get: __webpack_require__(/*! ./get */ "SBVZ")(config),
  put: __webpack_require__(/*! ./put */ "Hyoh")(config),
  findProvs: __webpack_require__(/*! ./find-provs */ "DmgN")(config),
  findPeer: __webpack_require__(/*! ./find-peer */ "HGUD")(config),
  provide: __webpack_require__(/*! ./provide */ "EqY/")(config),
  // find closest peerId to given peerId
  query: __webpack_require__(/*! ./query */ "4NwU")(config)
})


/***/ }),

/***/ "/0/u":
/*!**************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multibase/src/base.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

class Base {
  constructor (name, code, implementation, alphabet) {
    this.name = name
    this.code = code
    this.codeBuf = Buffer.from(this.code)
    this.alphabet = alphabet
    this.engine = implementation(alphabet)
  }

  encode (buf) {
    return this.engine.encode(buf)
  }

  decode (string) {
    for (const char of string) {
      if (this.alphabet && this.alphabet.indexOf(char) < 0) {
        throw new Error(`invalid character '${char}' in '${string}'`)
      }
    }
    return this.engine.decode(string)
  }
}

module.exports = Base


/***/ }),

/***/ "/jff":
/*!***************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multibase/src/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 *
 * @module Multibase
 */


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const constants = __webpack_require__(/*! ./constants */ "wil5")

/** @typedef {import("./base")} Base */

/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @returns {Buffer}
 * @throws {Error} Will throw if the encoding is not supported
 */
function multibase (nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer')
  }
  const enc = encoding(nameOrCode)
  validEncode(enc.name, buf)
  return Buffer.concat([enc.codeBuf, buf])
}

/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function encode (nameOrCode, buf) {
  const enc = encoding(nameOrCode)

  return Buffer.concat([enc.codeBuf, Buffer.from(enc.encode(buf))])
}

/**
 * Takes a buffer or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Buffer|string} data
 * @returns {Buffer}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function decode (data) {
  if (Buffer.isBuffer(data)) {
    data = data.toString()
  }
  const prefix = data[0]

  // Make all encodings case-insensitive except the ones that include upper and lower chars in the alphabet
  if (['f', 'F', 'v', 'V', 't', 'T', 'b', 'B', 'c', 'C', 'h', 'k', 'K'].includes(prefix)) {
    data = data.toLowerCase()
  }
  const enc = encoding(data[0])
  return Buffer.from(enc.decode(data.substring(1)))
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} data
 * @returns {boolean}
 */
function isEncoded (data) {
  if (Buffer.isBuffer(data)) {
    data = data.toString()
  }

  // Ensure bufOrString is a string
  if (Object.prototype.toString.call(data) !== '[object String]') {
    return false
  }

  try {
    const enc = encoding(data[0])
    return enc.name
  } catch (err) {
    return false
  }
}

/**
 * Validate encoded data
 *
 * @param {string} name
 * @param {Buffer} buf
 * @returns {undefined}
 * @throws {Error} Will throw if the encoding is not supported
 */
function validEncode (name, buf) {
  const enc = encoding(name)
  enc.decode(buf.toString())
}

/**
 * Get the encoding by name or code
 *
 * @param {string} nameOrCode
 * @returns {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encoding (nameOrCode) {
  if (constants.names[nameOrCode]) {
    return constants.names[nameOrCode]
  } else if (constants.codes[nameOrCode]) {
    return constants.codes[nameOrCode]
  } else {
    throw new Error(`Unsupported encoding: ${nameOrCode}`)
  }
}

/**
 * Get encoding from data
 *
 * @param {string|Buffer} data
 * @returns {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encodingFromData (data) {
  if (Buffer.isBuffer(data)) {
    data = data.toString()
  }

  return encoding(data[0])
}

exports = module.exports = multibase
exports.encode = encode
exports.decode = decode
exports.isEncoded = isEncoded
exports.encoding = encoding
exports.encodingFromData = encodingFromData
exports.names = Object.freeze(constants.names)
exports.codes = Object.freeze(constants.codes)


/***/ }),

/***/ "/jzG":
/*!********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/patch/set-data.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const multipartRequest = __webpack_require__(/*! ../../lib/multipart-request */ "VWqr")
const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure(api => {
  return async (cid, data, options = {}) => {
    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const { Hash } = await (await api.post('object/patch/set-data', {
      timeout: options.timeout,
      signal,
      searchParams: toUrlSearchParams({
        arg: [
          `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`
        ],
        ...options
      }),
      ...(
        await multipartRequest(data, controller, options.headers)
      )
    })).json()

    return new CID(Hash)
  }
})


/***/ }),

/***/ "/qR/":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/mint-card-form/mint-card-form.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<form (ngSubmit)=\"mintCard($event)\">\n    <ion-list lines=\"full\" class=\"ion-margin\">\n        <ion-list-header lines=\"full\">\n          <ion-label>\n              <b>Introduce las propiedades de la nueva carta</b>\n          </ion-label>\n        </ion-list-header>     \n\n        <ion-item>\n          <ion-label position=\"floating\">Nombre</ion-label>\n          <ion-input\n                  [(ngModel)]=\"name\"\n                  position=\"floating\"\n                  name=\"name\"\n                  placeholder=\"Nombre de la carta\" \n              ></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label position=\"floating\">Descripción</ion-label>\n          <ion-textarea\n              [(ngModel)]=\"description\"\n              position=\"floating\"\n              name=\"description\"\n              rows=3\n              placeholder=\"Descripción\"\n          ></ion-textarea>        \n        </ion-item>\n        \n        <ion-item>\n            <ion-label position=\"floating\">Color</ion-label>\n            <ion-select interface=\"popover\"\n              [(ngModel)]=\"color\"\n              position=\"floating\"\n              name=\"color\"\n            >\n                <ion-select-option value=\"0\">Blanco</ion-select-option>\n                <ion-select-option value=\"1\">Azul</ion-select-option>\n                <ion-select-option value=\"2\">Amarillo</ion-select-option>\n                <ion-select-option value=\"3\">Verde</ion-select-option>\n                <ion-select-option value=\"4\">Rojo</ion-select-option>\n                <ion-select-option value=\"5\">Negro</ion-select-option>\n            </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label position=\"floating\">Tipo</ion-label>\n            <ion-select interface=\"popover\"\n              [(ngModel)]=\"type\"\n              position=\"floating\"\n              name=\"type\"\n            >\n                <ion-select-option value=\"0\">Criatura</ion-select-option>\n                <ion-select-option value=\"1\">Hechizo</ion-select-option>\n                <ion-select-option value=\"2\">Reliquia</ion-select-option>\n            </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label position=\"floating\">Maná</ion-label>\n            <ion-select interface=\"popover\"\n              [(ngModel)]=\"mana\"\n              position=\"floating\"\n              name=\"mana\"\n            >\n                <ion-select-option value=\"1\">1</ion-select-option>\n                <ion-select-option value=\"2\">2</ion-select-option>\n                <ion-select-option value=\"3\">3</ion-select-option>\n                <ion-select-option value=\"4\">4</ion-select-option>\n                <ion-select-option value=\"5\">5</ion-select-option>\n            </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label position=\"floating\">Ataque</ion-label>\n            <ion-select interface=\"popover\"\n              [(ngModel)]=\"attack\"\n              position=\"floating\"\n              name=\"attack\"\n            >\n                <ion-select-option value=\"1\">1</ion-select-option>\n                <ion-select-option value=\"2\">2</ion-select-option>\n                <ion-select-option value=\"3\">3</ion-select-option>\n                <ion-select-option value=\"4\">4</ion-select-option>\n                <ion-select-option value=\"5\">5</ion-select-option>\n            </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label position=\"floating\">Defensa</ion-label>\n            <ion-select interface=\"popover\"\n              [(ngModel)]=\"guard\"\n              position=\"floating\"\n              name=\"guard\"\n            >\n                <ion-select-option value=\"1\">1</ion-select-option>\n                <ion-select-option value=\"2\">2</ion-select-option>\n                <ion-select-option value=\"3\">3</ion-select-option>\n                <ion-select-option value=\"4\">4</ion-select-option>\n                <ion-select-option value=\"5\">5</ion-select-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n          <ion-label position=\"floating\">Precio en ethers</ion-label>\n          <ion-input\n              [(ngModel)]=\"price\"\n              position=\"floating\"\n              type=\"number\" \n              name=\"price\"\n              placeholder=\"Precio\"\n          ></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label stacked>Selecciona imagen</ion-label>\n            <ion-input type=\"file\" accept=\"image/*\" (change)=\"handleFileInput($event.target.files)\" ></ion-input>\n        </ion-item>   \n        \n    </ion-list>\n\n    <ion-button type=\"submit\" color=\"success\" class=\"ion-margin\" style=\"text-transform:none\">Mintar carta</ion-button>\n</form>\n");

/***/ }),

/***/ "/w41":
/*!************************************************!*\
  !*** ./node_modules/multiaddr-to-uri/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")

const reduceValue = (_, v) => v
const tcpUri = (str, port, parts, opts) => {
  // return tcp when explicitly requested
  if (opts && opts.assumeHttp === false) return `tcp://${str}:${port}`
  // check if tcp is the last protocol in multiaddr
  let protocol = 'tcp'
  let explicitPort = `:${port}`
  const last = parts[parts.length - 1]
  if (last.protocol === 'tcp') {
    // assume http and produce clean urls
    protocol = port === '443' ? 'https' : 'http'
    explicitPort = port === '443' || port === '80' ? '' : explicitPort
  }
  return `${protocol}://${str}${explicitPort}`
}

const Reducers = {
  ip4: reduceValue,
  ip6: (str, content, i, parts) => (
    parts.length === 1 && parts[0].protocol === 'ip6'
      ? content
      : `[${content}]`
  ),
  tcp: (str, content, i, parts, opts) => (
    parts.some(p => ['http', 'https', 'ws', 'wss'].includes(p.protocol))
      ? `${str}:${content}`
      : tcpUri(str, content, parts, opts)
  ),
  udp: (str, content) => `udp://${str}:${content}`,
  dnsaddr: reduceValue,
  dns4: reduceValue,
  dns6: reduceValue,
  ipfs: (str, content) => `${str}/ipfs/${content}`,
  p2p: (str, content) => `${str}/p2p/${content}`,
  http: str => `http://${str}`,
  https: str => `https://${str}`,
  ws: str => `ws://${str}`,
  wss: str => `wss://${str}`,
  'p2p-websocket-star': str => `${str}/p2p-websocket-star`,
  'p2p-webrtc-star': str => `${str}/p2p-webrtc-star`,
  'p2p-webrtc-direct': str => `${str}/p2p-webrtc-direct`
}

module.exports = (multiaddr, opts) => {
  const ma = Multiaddr(multiaddr)
  const parts = multiaddr.toString().split('/').slice(1)
  return ma
    .tuples()
    .map(tuple => ({
      protocol: parts.shift(),
      content: tuple[1] ? parts.shift() : null
    }))
    .reduce((str, part, i, parts) => {
      const reduce = Reducers[part.protocol]
      if (!reduce) throw new Error(`Unsupported protocol ${part.protocol}`)
      return reduce(str, part.content, i, parts, opts)
    }, '')
}


/***/ }),

/***/ "0PGX":
/*!***************************************************!*\
  !*** ./node_modules/protons/src/compile/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encodings = __webpack_require__(/*! ./encodings */ "9ayt")
var compileDecode = __webpack_require__(/*! ./decode */ "t2Ja")
var compileEncode = __webpack_require__(/*! ./encode */ "nDvq")
var compileEncodingLength = __webpack_require__(/*! ./encoding-length */ "h0HT")
var varint = __webpack_require__(/*! varint */ "JhIh")

var flatten = function (values) {
  if (!values) return null
  var result = {}
  Object.keys(values).forEach(function (k) {
    result[k] = values[k].value
  })
  return result
}

module.exports = function (schema, extraEncodings) {
  var messages = {}
  var enums = {}
  var cache = {}

  var visit = function (schema, prefix) {
    if (schema.enums) {
      schema.enums.forEach(function (e) {
        e.id = prefix + (prefix ? '.' : '') + e.name
        enums[e.id] = e
        visit(e, e.id)
      })
    }
    if (schema.messages) {
      schema.messages.forEach(function (m) {
        m.id = prefix + (prefix ? '.' : '') + m.name
        messages[m.id] = m
        m.fields.forEach(function (f) {
          if (!f.map) return

          var name = 'Map_' + f.map.from + '_' + f.map.to
          var map = {
            name: name,
            enums: [],
            messages: [],
            fields: [{
              name: 'key',
              type: f.map.from,
              tag: 1,
              repeated: false,
              required: true
            }, {
              name: 'value',
              type: f.map.to,
              tag: 2,
              repeated: false,
              required: false
            }],
            extensions: null,
            id: prefix + (prefix ? '.' : '') + name
          }

          if (!messages[map.id]) {
            messages[map.id] = map
            schema.messages.push(map)
          }
          f.type = name
          f.repeated = true
        })
        visit(m, m.id)
      })
    }
  }

  visit(schema, '')

  var compileEnum = function (e) {
    var values = Object.keys(e.values || []).map(function (k) {
      return parseInt(e.values[k].value, 10)
    })

    var encode = function encode (val, buf, offset) {
      if (!values.length || values.indexOf(val) === -1) {
        throw new Error('Invalid enum value: ' + val)
      }
      varint.encode(val, buf, offset)
      encode.bytes = varint.encode.bytes
      return buf
    }

    var decode = function decode (buf, offset) {
      var val = varint.decode(buf, offset)
      if (!values.length || values.indexOf(val) === -1) {
        throw new Error('Invalid enum value: ' + val)
      }
      decode.bytes = varint.decode.bytes
      return val
    }

    return encodings.make(0, encode, decode, varint.encodingLength)
  }

  var compileMessage = function (m, exports) {
    m.messages.forEach(function (nested) {
      exports[nested.name] = resolve(nested.name, m.id)
    })

    m.enums.forEach(function (val) {
      exports[val.name] = flatten(val.values)
    })

    exports.type = 2
    exports.message = true
    exports.name = m.name

    var oneofs = {}

    m.fields.forEach(function (f) {
      if (!f.oneof) return
      if (!oneofs[f.oneof]) oneofs[f.oneof] = []
      oneofs[f.oneof].push(f.name)
    })

    var enc = m.fields.map(function (f) {
      return resolve(f.type, m.id)
    })

    var encodingLength = compileEncodingLength(m, enc, oneofs)
    var encode = compileEncode(m, resolve, enc, oneofs, encodingLength)
    var decode = compileDecode(m, resolve, enc)

    // end of compilation - return all the things

    encode.bytes = decode.bytes = 0

    exports.buffer = true
    exports.encode = encode
    exports.decode = decode
    exports.encodingLength = encodingLength

    return exports
  }

  var resolve = function (name, from, compile) {
    if (extraEncodings && extraEncodings[name]) return extraEncodings[name]
    if (encodings[name]) return encodings[name]

    var m = (from ? from + '.' + name : name).split('.')
      .map(function (part, i, list) {
        return list.slice(0, i).concat(name).join('.')
      })
      .reverse()
      .reduce(function (result, id) {
        return result || messages[id] || enums[id]
      }, null)

    if (compile === false) return m
    if (!m) throw new Error('Could not resolve ' + name)

    if (m.values) return compileEnum(m)
    var res = cache[m.id] || compileMessage(m, cache[m.id] = {})
    return res
  }

  return (schema.enums || []).concat((schema.messages || []).map(function (message) {
    return resolve(message.id)
  }))
}


/***/ }),

/***/ "0qpk":
/*!***************************************************!*\
  !*** ./node_modules/ipfs-utils/src/http/error.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class TimeoutError extends Error {
  constructor (message = 'Request timed out') {
    super(message)
    this.name = 'TimeoutError'
  }
}
exports.TimeoutError = TimeoutError

class AbortError extends Error {
  constructor (message = 'The operation was aborted.') {
    super(message)
    this.name = 'AbortError'
  }
}
exports.AbortError = AbortError

class HTTPError extends Error {
  constructor (response) {
    super(response.statusText)
    this.name = 'HTTPError'
    this.response = response
  }
}
exports.HTTPError = HTTPError


/***/ }),

/***/ 10:
/*!**************************************************!*\
  !*** ipfs-utils/src/files/glob-source (ignored) ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1upd":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.findSources = (args) => {
  /** @type {Record<any, any>} */
  let options = {}
  let sources = []

  if (!Array.isArray(args[args.length - 1]) && typeof args[args.length - 1] === 'object') {
    options = args.pop()
  }

  if (args.length === 1 && Array.isArray(args[0])) {
    // support ipfs.files.cp([src, dest], opts)
    sources = args[0]
  } else {
    // support ipfs.files.cp(src, dest, opts) and ipfs.files.cp(src1, src2, dest, opts)
    sources = args
  }

  return {
    sources,
    options
  }
}


/***/ }),

/***/ "1yqE":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/swarm/addrs.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('swarm/addrs', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    const { Addrs } = await res.json()

    return Object.keys(Addrs).map(id => ({
      id,
      addrs: (Addrs[id] || []).map(a => multiaddr(a))
    }))
  }
})


/***/ }),

/***/ "2sSE":
/*!*************************************!*\
  !*** ./node_modules/it-tar/pack.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const BufferList = __webpack_require__(/*! bl/BufferList */ "XDq5")
const { S_IFMT, S_IFBLK, S_IFCHR, S_IFDIR, S_IFIFO, S_IFLNK } = __webpack_require__(/*! iso-constants */ "aqcA")
const concat = __webpack_require__(/*! it-concat */ "2tji")
const Headers = __webpack_require__(/*! ./pack-headers */ "drbO")

const DMODE = parseInt('755', 8)
const FMODE = parseInt('644', 8)

const END_OF_TAR = Buffer.alloc(1024)

function modeToType (mode) {
  switch (mode & S_IFMT) {
    case S_IFBLK: return 'block-device'
    case S_IFCHR: return 'character-device'
    case S_IFDIR: return 'directory'
    case S_IFIFO: return 'fifo'
    case S_IFLNK: return 'symlink'
  }
  return 'file'
}

function getPadding (size) {
  size &= 511
  if (size) return new BufferList(END_OF_TAR.slice(0, 512 - size))
}

function encode (header) {
  if (!header.pax) {
    const encoded = Headers.encode(header)
    if (encoded) return encoded
  }
  return encodePax(header)
}

function encodePax (header) {
  const paxHeader = Headers.encodePax({
    name: header.name,
    linkname: header.linkname,
    pax: header.pax
  })

  const newHeader = {
    name: 'PaxHeader',
    mode: header.mode,
    uid: header.uid,
    gid: header.gid,
    size: paxHeader.length,
    mtime: header.mtime,
    type: 'pax-header',
    linkname: header.linkname && 'PaxHeader',
    uname: header.uname,
    gname: header.gname,
    devmajor: header.devmajor,
    devminor: header.devminor
  }

  return new BufferList([
    Headers.encode(newHeader),
    paxHeader,
    getPadding(paxHeader.length),
    Headers.encode({ ...newHeader, size: header.size, type: header.type })
  ])
}

module.exports = () => async function * (source) {
  for await (let { header, body } of source) {
    if (!header.size || header.type === 'symlink') header.size = 0
    if (!header.type) header.type = modeToType(header.mode)
    if (!header.mode) header.mode = header.type === 'directory' ? DMODE : FMODE
    if (!header.uid) header.uid = 0
    if (!header.gid) header.gid = 0
    if (!header.mtime) header.mtime = new Date()

    if (typeof body === 'string') body = Buffer.from(body)

    if (Buffer.isBuffer(body) || BufferList.isBufferList(body)) {
      header.size = body.length
      yield new BufferList([encode(header), body, getPadding(header.size)])
      continue
    }

    if (header.type === 'symlink' && !header.linkname) {
      header.linkname = (await concat(body)).toString()
      yield encode(header)
      continue
    }

    yield encode(header)

    if (header.type !== 'file' && header.type !== 'contiguous-file') {
      continue
    }

    let written = 0
    for await (const chunk of body) {
      written += chunk.length
      yield BufferList.isBufferList(chunk) ? chunk : new BufferList(chunk)
    }

    if (written !== header.size) { // corrupting tar
      throw new Error('size mismatch')
    }

    const overflow = getPadding(header.size)
    if (overflow) yield overflow
  }

  yield new BufferList(END_OF_TAR)
}


/***/ }),

/***/ "2tji":
/*!*****************************************!*\
  !*** ./node_modules/it-concat/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BufferList = __webpack_require__(/*! bl/BufferList */ "XDq5")

const TypeDefault = {
  string: () => '',
  buffer: () => BufferList()
}

module.exports = async (source, options) => {
  options = options || {}

  if (options.type && !TypeDefault[options.type]) {
    throw new Error(`invalid type "${options.type}"`)
  }

  let res, type
  for await (const chunk of source) {
    if (!res) {
      type = options.type || (typeof chunk === 'string' ? 'string' : 'buffer')
      res = TypeDefault[type]()
    }

    if (type === 'string') {
      res += chunk
    } else {
      res.append(chunk)
    }
  }

  return res || TypeDefault[options.type || 'buffer']()
}


/***/ }),

/***/ "3JDX":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "FGiv");

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "3bCg":
/*!****************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/util.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const protons = __webpack_require__(/*! protons */ "lqh9")
const proto = protons(__webpack_require__(/*! ./dag.proto */ "S2GJ"))
const DAGLink = __webpack_require__(/*! ./dag-link/dagLink */ "i5gV")
const DAGNode = __webpack_require__(/*! ./dag-node/dagNode */ "AU6k")
const { serializeDAGNodeLike } = __webpack_require__(/*! ./serialize */ "fAHA")
const genCid = __webpack_require__(/*! ./genCid */ "BaaY")

exports = module.exports

exports.codec = genCid.codec
exports.defaultHashAlg = genCid.defaultHashAlg

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Object} binaryBlob - Encoded IPLD Node
 * @param {Object} [userOptions] - Options to create the CID
 * @param {number} [userOptions.cidVersion=1] - CID version number
 * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
 * @returns {Promise.<CID>}
 */
const cid = (binaryBlob, userOptions) => {
  return genCid.cid(binaryBlob, userOptions)
}

/**
 * Serialize internal representation into a binary PB block.
 *
 * @param {Object} node - Internal representation of a CBOR block
 * @returns {Buffer} - The encoded binary representation
 */
const serialize = (node) => {
  if (DAGNode.isDAGNode(node)) {
    return node.serialize()
  } else {
    return serializeDAGNodeLike(node.Data, node.Links)
  }
}

/**
 * Deserialize PB block into the internal representation.
 *
 * @param {Buffer} buffer - Binary representation of a PB block
 * @returns {Object} - An object that conforms to the IPLD Data Model
 */
const deserialize = (buffer) => {
  const pbn = proto.PBNode.decode(buffer)

  const links = pbn.Links.map((link) => {
    return new DAGLink(link.Name, link.Tsize, link.Hash)
  })

  const data = pbn.Data == null ? Buffer.alloc(0) : pbn.Data

  return new DAGNode(data, links, buffer.length)
}

exports.serialize = serialize
exports.deserialize = deserialize
exports.cid = cid


/***/ }),

/***/ "3c13":
/*!***************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pubsub/subscribe.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const multibase = __webpack_require__(/*! multibase */ "/jff")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const log = __webpack_require__(/*! debug */ "NOtv")('ipfs-http-client:pubsub:subscribe')
const SubscriptionTracker = __webpack_require__(/*! ./subscription-tracker */ "eue8")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure((api, options) => {
  const subsTracker = SubscriptionTracker.singleton()
  const publish = __webpack_require__(/*! ./publish */ "6mRj")(options)

  return async (topic, handler, options = {}) => {
    options.signal = subsTracker.subscribe(topic, handler, options.signal)

    let res

    // In Firefox, the initial call to fetch does not resolve until some data
    // is received. If this doesn't happen within 1 second send an empty message
    // to kickstart the process.
    const ffWorkaround = setTimeout(async () => {
      log(`Publishing empty message to "${topic}" to resolve subscription request`)
      try {
        await publish(topic, Buffer.alloc(0), options)
      } catch (err) {
        log('Failed to publish empty message', err)
      }
    }, 1000)

    try {
      res = await api.post('pubsub/sub', {
        timeout: options.timeout,
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: topic,
          ...options
        }),
        headers: options.headers
      })
    } catch (err) { // Initial subscribe fail, ensure we clean up
      subsTracker.unsubscribe(topic, handler)
      throw err
    }

    clearTimeout(ffWorkaround)

    readMessages(res.ndjson(), {
      onMessage: handler,
      onEnd: () => subsTracker.unsubscribe(topic, handler),
      onError: options.onError
    })
  }
})

async function readMessages (msgStream, { onMessage, onEnd, onError }) {
  onError = onError || log

  try {
    for await (const msg of msgStream) {
      try {
        onMessage({
          from: multibase.encode('base58btc', Buffer.from(msg.from, 'base64')).toString().slice(1),
          data: Buffer.from(msg.data, 'base64'),
          seqno: Buffer.from(msg.seqno, 'base64'),
          topicIDs: msg.topicIDs
        })
      } catch (err) {
        err.message = `Failed to parse pubsub message: ${err.message}`
        onError(err, false, msg) // Not fatal
      }
    }
  } catch (err) {
    // FIXME: In testing with Chrome, err.type is undefined (should not be!)
    // Temporarily use the name property instead.
    if (err.type !== 'aborted' && err.name !== 'AbortError') {
      onError(err, true) // Fatal
    }
  } finally {
    onEnd()
  }
}


/***/ }),

/***/ "3jrw":
/*!****************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-node/addLink.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const sortLinks = __webpack_require__(/*! ./sortLinks */ "bKHj")
const DAGLink = __webpack_require__(/*! ../dag-link */ "YMSI")

const asDAGLink = (link) => {
  if (DAGLink.isDAGLink(link)) {
    // It's a DAGLink instance
    // no need to do anything
    return link
  }

  // DAGNode.isDagNode() would be more appropriate here, but it can't be used
  // as it would lead to circular dependencies as `addLink` is called from
  // within the DAGNode object.
  if (!('cid' in link ||
        'hash' in link ||
        'Hash' in link ||
        'multihash' in link)) {
    throw new Error('Link must be a DAGLink or DAGLink-like. Convert the DAGNode into a DAGLink via `node.toDAGLink()`.')
  }

  // It's a Object with name, multihash/hash/cid and size
  return new DAGLink(link.Name || link.name, link.Tsize || link.size, link.Hash || link.multihash || link.hash || link.cid)
}

const addLink = (node, link) => {
  const dagLink = asDAGLink(link)
  node._links.push(dagLink)
  node._links = sortLinks(node._links)
}

module.exports = addLink


/***/ }),

/***/ "3l4a":
/*!**************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/cat.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * cat (path, options = {}) {
    const res = await api.post('cat', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: typeof path === 'string' ? path : new CID(path).toString(),
        ...options
      }),
      headers: options.headers
    })

    yield * res.iterator()
  }
})


/***/ }),

/***/ "4DvY":
/*!*************************************!*\
  !*** ./node_modules/is-ip/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const ipRegex = __webpack_require__(/*! ip-regex */ "K7+2");

const isIp = string => ipRegex({exact: true}).test(string);
isIp.v4 = string => ipRegex.v4({exact: true}).test(string);
isIp.v6 = string => ipRegex.v6({exact: true}).test(string);
isIp.version = string => isIp(string) ? (isIp.v4(string) ? 4 : 6) : undefined;

module.exports = isIp;


/***/ }),

/***/ "4NwU":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/query.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * query (peerId, options = {}) {
    const res = await api.post('dht/query', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: new CID(peerId),
        ...options
      }),
      headers: options.headers
    })

    for await (let message of res.ndjson()) {
      message = toCamel(message)
      message.id = new CID(message.id)
      message.responses = (message.responses || []).map(({ ID, Addrs }) => ({
        id: ID,
        addrs: (Addrs || []).map(a => multiaddr(a))
      }))
      yield message
    }
  }
})


/***/ }),

/***/ "4WaI":
/*!*****************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pin/ls.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * ls (options = {}) {
    if (options.paths) {
      options.paths = Array.isArray(options.paths) ? options.paths : [options.paths]
    }

    const res = await api.post('pin/ls', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options,
        arg: (options.paths || []).map(path => `${path}`),
        stream: true
      }),
      headers: options.headers
    })

    for await (const pin of res.ndjson()) {
      yield { cid: new CID(pin.Cid), type: pin.Type }
    }
  }
})


/***/ }),

/***/ "4b23":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/*! exports provided: nanoid, customAlphabet, customRandom, urlAlphabet, random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nanoid", function() { return nanoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customAlphabet", function() { return customAlphabet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customRandom", function() { return customRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "evf3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlAlphabet", function() { return _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__["urlAlphabet"]; });

// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.



if (true) {
  // All bundlers will remove this block in the production bundle.
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID. If you use Expo, install `expo-random` ' +
        'and use `nanoid/async`.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))

let customRandom = (alphabet, size, getRandom) => {
  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
  // values closer to the alphabet size. The bitmask calculates the closest
  // `2^31 - 1` number, which exceeds the alphabet size.
  // For example, the bitmask for the alphabet size 30 is 31 (00011111).
  // `Math.clz32` is not used, because it is not available in browsers.
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  // Though, the bitmask solution is not perfect since the bytes exceeding
  // the alphabet size are refused. Therefore, to reliably generate the ID,
  // the random bytes redundancy has to be satisfied.

  // Note: every hardware random generator call is performance expensive,
  // because the system call for entropy collection takes a lot of time.
  // So, to avoid additional system calls, extra bytes are requested in advance.

  // Next, a step determines how many random bytes to generate.
  // The number of random bytes gets decided upon the ID size, mask,
  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
  // according to benchmarks).

  // `-~f => Math.ceil(f)` if f is a float
  // `-~i => i + 1` if i is an integer
  let step = -~((1.6 * mask * size) / alphabet.length)

  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      // A compact alternative for `for (var i = 0; i < step; i++)`.
      let j = step
      while (j--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}

let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)

let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))

  // A compact alternative for `for (var i = 0; i < step; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    let byte = bytes[size] & 63
    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36)
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}




/***/ }),

/***/ "55j7":
/*!**************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dns.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (domain, options = {}) => {
    const res = await api.post('dns', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: domain,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return data.Path
  }
})


/***/ }),

/***/ "58cU":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/diag/sys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('diag/sys', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "5ARu":
/*!**********************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-cbor/src/resolver.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const util = __webpack_require__(/*! ./util */ "zVFY")

/**
 * Resolves a path within a CBOR block.
 *
 * Returns the value or a link and the partial mising path. This way the
 * IPLD Resolver can fetch the link and continue to resolve.
 *
 * @param {Buffer} binaryBlob - Binary representation of a CBOR block
 * @param {string} [path='/'] - Path that should be resolved
 * @returns {Object} result - Result of the path it it was resolved successfully
 * @returns {*} result.value - Value the path resolves to
 * @returns {string} result.remainderPath - If the path resolves half-way to a
 *   link, then the `remainderPath` is the part after the link that can be used
 *   for further resolving
 */
exports.resolve = (binaryBlob, path) => {
  let node = util.deserialize(binaryBlob)

  const parts = path.split('/').filter(Boolean)
  while (parts.length) {
    const key = parts.shift()
    if (node[key] === undefined) {
      throw new Error(`Object has no property '${key}'`)
    }

    node = node[key]
    if (CID.isCID(node)) {
      return {
        value: node,
        remainderPath: parts.join('/')
      }
    }
  }

  return {
    value: node,
    remainderPath: ''
  }
}

const traverse = function * (node, path) {
  // Traverse only objects and arrays
  if (Buffer.isBuffer(node) || CID.isCID(node) || typeof node === 'string' ||
      node === null) {
    return
  }
  for (const item of Object.keys(node)) {
    const nextpath = path === undefined ? item : path + '/' + item
    yield nextpath
    yield * traverse(node[item], nextpath)
  }
}

/**
 * Return all available paths of a block.
 *
 * @generator
 * @param {Buffer} binaryBlob - Binary representation of a CBOR block
 * @yields {string} - A single path
 */
exports.tree = function * (binaryBlob) {
  const node = util.deserialize(binaryBlob)

  yield * traverse(node)
}


/***/ }),

/***/ "5o7P":
/*!*************************************************************************!*\
  !*** ./node_modules/ipfs-core-utils/src/files/normalise-input/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const normaliseContent = __webpack_require__(/*! ./normalise-content */ "l9qE")
const normaliseInput = __webpack_require__(/*! ./normalise-input */ "zor/")

/*
 * Transforms any of the `ipfs.add` input types into
 *
 * ```
 * AsyncIterable<{ path, mode, mtime, content: AsyncIterable<Buffer> }>
 * ```
 *
 * See https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
 *
 * @param input Object
 * @return AsyncInterable<{ path, mode, mtime, content: AsyncIterable<Buffer> }>
 */
module.exports = (input) => normaliseInput(input, normaliseContent)


/***/ }),

/***/ "6T3m":
/*!***************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multiaddr/src/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const codec = __webpack_require__(/*! ./codec */ "WAPC")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const protocols = __webpack_require__(/*! ./protocols-table */ "UBdu")
const varint = __webpack_require__(/*! varint */ "JhIh")
const multibase = __webpack_require__(/*! multibase */ "pRS+")
const CID = __webpack_require__(/*! cids */ "iARh")
const withIs = __webpack_require__(/*! class-is */ "7BLb")
const inspect = Symbol.for('nodejs.util.inspect.custom')

/**
 * Creates a [multiaddr](https://github.com/multiformats/multiaddr) from
 * a Buffer, String or another Multiaddr instance
 * public key.
 * @class Multiaddr
 * @param {(String|Buffer|Multiaddr)} addr - If String or Buffer, needs to adhere
 * to the address format of a [multiaddr](https://github.com/multiformats/multiaddr#string-format)
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 */
const Multiaddr = withIs.proto(function (addr) {
  if (!(this instanceof Multiaddr)) {
    return new Multiaddr(addr)
  }

  // default
  if (addr == null) {
    addr = ''
  }

  if (addr instanceof Buffer) {
    /**
     * @type {Buffer} - The raw bytes representing this multiaddress
     */
    this.buffer = codec.fromBuffer(addr)
  } else if (typeof addr === 'string' || addr instanceof String) {
    if (addr.length > 0 && addr.charAt(0) !== '/') {
      throw new Error(`multiaddr "${addr}" must start with a "/"`)
    }
    this.buffer = codec.fromString(addr)
  } else if (addr.buffer && addr.protos && addr.protoCodes) { // Multiaddr
    this.buffer = codec.fromBuffer(addr.buffer) // validate + copy buffer
  } else {
    throw new Error('addr must be a string, Buffer, or another Multiaddr')
  }
}, { className: 'Multiaddr', symbolName: '@multiformats/js-multiaddr/multiaddr' })

/**
 * Returns Multiaddr as a String
 *
 * @returns {String}
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').toString()
 * // '/ip4/127.0.0.1/tcp/4001'
 */
Multiaddr.prototype.toString = function toString () {
  return codec.bufferToString(this.buffer)
}

/**
 * Returns Multiaddr as a JSON encoded object
 *
 * @returns {String}
 * @example
 * JSON.stringify(Multiaddr('/ip4/127.0.0.1/tcp/4001'))
 * // '/ip4/127.0.0.1/tcp/4001'
 */
Multiaddr.prototype.toJSON = Multiaddr.prototype.toString

/**
 * Returns Multiaddr as a convinient options object to be used with net.createConnection
 *
 * @returns {{family: String, host: String, transport: String, port: Number}}
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').toOptions()
 * // { family: 'ipv4', host: '127.0.0.1', transport: 'tcp', port: 4001 }
 */
Multiaddr.prototype.toOptions = function toOptions () {
  const opts = {}
  const parsed = this.toString().split('/')
  opts.family = parsed[1] === 'ip4' ? 'ipv4' : 'ipv6'
  opts.host = parsed[2]
  opts.transport = parsed[3]
  opts.port = parseInt(parsed[4])
  return opts
}

/**
 * Returns Multiaddr as a human-readable string.
 * For post Node.js v10.0.0.
 * https://nodejs.org/api/deprecations.html#deprecations_dep0079_custom_inspection_function_on_objects_via_inspect
 *
 * @returns {String}
 * @example
 * console.log(Multiaddr('/ip4/127.0.0.1/tcp/4001'))
 * // '<Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>'
 */
Multiaddr.prototype[inspect] = function inspectCustom () {
  return '<Multiaddr ' +
    this.buffer.toString('hex') + ' - ' +
    codec.bufferToString(this.buffer) + '>'
}

/**
 * Returns Multiaddr as a human-readable string.
 * Fallback for pre Node.js v10.0.0.
 * https://nodejs.org/api/deprecations.html#deprecations_dep0079_custom_inspection_function_on_objects_via_inspect
 *
 * @returns {String}
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').inspect()
 * // '<Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>'
 */
Multiaddr.prototype.inspect = function inspect () {
  return '<Multiaddr ' +
    this.buffer.toString('hex') + ' - ' +
    codec.bufferToString(this.buffer) + '>'
}

/**
 * Returns the protocols the Multiaddr is defined with, as an array of objects, in
 * left-to-right order. Each object contains the protocol code, protocol name,
 * and the size of its address space in bits.
 * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
 *
 * @returns {Array.<Object>} protocols - All the protocols the address is composed of
 * @returns {Number} protocols[].code
 * @returns {Number} protocols[].size
 * @returns {String} protocols[].name
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').protos()
 * // [ { code: 4, size: 32, name: 'ip4' },
 * //   { code: 6, size: 16, name: 'tcp' } ]
 */
Multiaddr.prototype.protos = function protos () {
  return this.protoCodes().map(code => Object.assign({}, protocols(code)))
}

/**
 * Returns the codes of the protocols in left-to-right order.
 * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
 *
 * @returns {Array.<Number>} protocol codes
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').protoCodes()
 * // [ 4, 6 ]
 */
Multiaddr.prototype.protoCodes = function protoCodes () {
  const codes = []
  const buf = this.buffer
  let i = 0
  while (i < buf.length) {
    const code = varint.decode(buf, i)
    const n = varint.decode.bytes

    const p = protocols(code)
    const size = codec.sizeForAddr(p, buf.slice(i + n))

    i += (size + n)
    codes.push(code)
  }

  return codes
}

/**
 * Returns the names of the protocols in left-to-right order.
 * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
 *
 * @return {Array.<String>} protocol names
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').protoNames()
 * // [ 'ip4', 'tcp' ]
 */
Multiaddr.prototype.protoNames = function protoNames () {
  return this.protos().map(proto => proto.name)
}

/**
 * Returns a tuple of parts
 *
 * @return {Array.<Array>} tuples
 * @return {Number} tuples[].0 code of protocol
 * @return {Buffer} tuples[].1 contents of address
 * @example
 * Multiaddr("/ip4/127.0.0.1/tcp/4001").tuples()
 * // [ [ 4, <Buffer 7f 00 00 01> ], [ 6, <Buffer 0f a1> ] ]
 */
Multiaddr.prototype.tuples = function tuples () {
  return codec.bufferToTuples(this.buffer)
}

/**
 * Returns a tuple of string/number parts
 *
 * @return {Array.<Array>} tuples
 * @return {Number} tuples[].0 code of protocol
 * @return {(String|Number)} tuples[].1 contents of address
 * @example
 * Multiaddr("/ip4/127.0.0.1/tcp/4001").stringTuples()
 * // [ [ 4, '127.0.0.1' ], [ 6, 4001 ] ]
 */
Multiaddr.prototype.stringTuples = function stringTuples () {
  const t = codec.bufferToTuples(this.buffer)
  return codec.tuplesToStringTuples(t)
}

/**
 * Encapsulates a Multiaddr in another Multiaddr
 *
 * @param {Multiaddr} addr - Multiaddr to add into this Multiaddr
 * @return {Multiaddr}
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
 *
 * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 *
 * const mh3 = mh1.encapsulate(mh2)
 * // <Multiaddr 0408080808060438047f000001060fa1 - /ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001>
 *
 * mh3.toString()
 * // '/ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001'
 */
Multiaddr.prototype.encapsulate = function encapsulate (addr) {
  addr = Multiaddr(addr)
  return Multiaddr(this.toString() + addr.toString())
}

/**
 * Decapsulates a Multiaddr from another Multiaddr
 *
 * @param {Multiaddr} addr - Multiaddr to remove from this Multiaddr
 * @return {Multiaddr}
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
 *
 * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 *
 * const mh3 = mh1.encapsulate(mh2)
 * // <Multiaddr 0408080808060438047f000001060fa1 - /ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001>
 *
 * mh3.decapsulate(mh2).toString()
 * // '/ip4/8.8.8.8/tcp/1080'
 */
Multiaddr.prototype.decapsulate = function decapsulate (addr) {
  addr = addr.toString()
  const s = this.toString()
  const i = s.lastIndexOf(addr)
  if (i < 0) {
    throw new Error('Address ' + this + ' does not contain subaddress: ' + addr)
  }
  return Multiaddr(s.slice(0, i))
}

/**
 * A more reliable version of `decapsulate` if you are targeting a
 * specific code, such as 421 (the `p2p` protocol code). The last index of the code
 * will be removed from the `Multiaddr`, and a new instance will be returned.
 * If the code is not present, the original `Multiaddr` is returned.
 *
 * @param {Number} code The code of the protocol to decapsulate from this Multiaddr
 * @return {Multiaddr}
 * @example
 * const addr = Multiaddr('/ip4/0.0.0.0/tcp/8080/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSupNKC')
 * // <Multiaddr 0400... - /ip4/0.0.0.0/tcp/8080/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSupNKC>
 *
 * addr.decapsulateCode(421).toString()
 * // '/ip4/0.0.0.0/tcp/8080'
 *
 * Multiaddr('/ip4/127.0.0.1/tcp/8080').decapsulateCode(421).toString()
 * // '/ip4/127.0.0.1/tcp/8080'
 */
Multiaddr.prototype.decapsulateCode = function decapsulateCode (code) {
  const tuples = this.tuples()
  for (let i = tuples.length - 1; i >= 0; i--) {
    if (tuples[i][0] === code) {
      return Multiaddr(codec.tuplesToBuffer(tuples.slice(0, i)))
    }
  }
  return this
}

/**
 * Extract the peerId if the multiaddr contains one
 *
 * @return {String|null} peerId - The id of the peer or null if invalid or missing from the ma
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080/ipfs/QmValidBase58string')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080/ipfs/QmValidBase58string>
 *
 * // should return QmValidBase58string or null if the id is missing or invalid
 * const peerId = mh1.getPeerId()
 */
Multiaddr.prototype.getPeerId = function getPeerId () {
  let b58str = null
  try {
    const tuples = this.stringTuples().filter((tuple) => {
      if (tuple[0] === protocols.names.ipfs.code) {
        return true
      }
    })

    // Get the last id
    b58str = tuples.pop()[1]
    // Get multihash, unwrap from CID if needed
    b58str = multibase.encode('base58btc', new CID(b58str).multihash).toString().slice(1)
  } catch (e) {
    b58str = null
  }

  return b58str
}

/**
 * Extract the path if the multiaddr contains one
 *
 * @return {String|null} path - The path of the multiaddr, or null if no path protocol is present
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080/unix/tmp/p2p.sock')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080/unix/tmp/p2p.sock>
 *
 * // should return utf8 string or null if the id is missing or invalid
 * const path = mh1.getPath()
 */
Multiaddr.prototype.getPath = function getPath () {
  let path = null
  try {
    path = this.stringTuples().filter((tuple) => {
      const proto = protocols(tuple[0])
      if (proto.path) {
        return true
      }
    })[0][1]
  } catch (e) {
    path = null
  }

  return path
}

/**
 * Checks if two Multiaddrs are the same
 *
 * @param {Multiaddr} addr
 * @return {Bool}
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
 *
 * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 *
 * mh1.equals(mh1)
 * // true
 *
 * mh1.equals(mh2)
 * // false
 */
Multiaddr.prototype.equals = function equals (addr) {
  return this.buffer.equals(addr.buffer)
}

/**
 * Gets a Multiaddrs node-friendly address object. Note that protocol information
 * is left out: in Node (and most network systems) the protocol is unknowable
 * given only the address.
 *
 * Has to be a ThinWaist Address, otherwise throws error
 *
 * @returns {{family: String, address: String, port: Number}}
 * @throws {Error} Throws error if Multiaddr is not a Thin Waist address
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').nodeAddress()
 * // {family: 'IPv4', address: '127.0.0.1', port: '4001'}
 */
Multiaddr.prototype.nodeAddress = function nodeAddress () {
  const codes = this.protoCodes()
  const names = this.protoNames()
  const parts = this.toString().split('/').slice(1)

  if (parts.length < 4) {
    throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6}/{address}/{tcp, udp}/{port}".')
  } else if (codes[0] !== 4 && codes[0] !== 41 && codes[0] !== 54 && codes[0] !== 55) {
    throw new Error(`no protocol with name: "'${names[0]}'". Must have a valid family name: "{ip4, ip6, dns4, dns6}".`)
  } else if (parts[2] !== 'tcp' && parts[2] !== 'udp') {
    throw new Error(`no protocol with name: "'${names[1]}'". Must have a valid transport protocol: "{tcp, udp}".`)
  }

  return {
    family: (codes[0] === 41 || codes[0] === 55) ? 6 : 4,
    address: parts[1], // ip addr
    port: parseInt(parts[3]) // tcp or udp port
  }
}

/**
 * Creates a Multiaddr from a node-friendly address object
 *
 * @param {{family: String, address: String, port: Number}} addr
 * @param {String} transport
 * @returns {Multiaddr} multiaddr
 * @throws {Error} Throws error if addr is not truthy
 * @throws {Error} Throws error if transport is not truthy
 * @example
 * Multiaddr.fromNodeAddress({address: '127.0.0.1', port: '4001'}, 'tcp')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 */
Multiaddr.fromNodeAddress = function fromNodeAddress (addr, transport) {
  if (!addr) throw new Error('requires node address object')
  if (!transport) throw new Error('requires transport protocol')
  let ip
  switch (addr.family) {
    case 'IPv4':
      ip = 'ip4'
      break
    case 'IPv6':
      ip = 'ip6'
      break
    default:
      throw Error(`Invalid addr family. Got '${addr.family}' instead of 'IPv4' or 'IPv6'`)
  }
  return Multiaddr('/' + [ip, addr.address, transport, addr.port].join('/'))
}

// TODO find a better example, not sure about it's good enough
/**
 * Returns if a Multiaddr is a Thin Waist address or not.
 *
 * Thin Waist is if a Multiaddr adheres to the standard combination of:
 *
 * `{IPv4, IPv6}/{TCP, UDP}`
 *
 * @param {Multiaddr} [addr] - Defaults to using `this` instance
 * @returns {Boolean} isThinWaistAddress
 * @example
 * const mh1 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 * const mh2 = Multiaddr('/ip4/192.168.2.1/tcp/5001')
 * // <Multiaddr 04c0a80201061389 - /ip4/192.168.2.1/tcp/5001>
 * const mh3 = mh1.encapsulate(mh2)
 * // <Multiaddr 047f000001060fa104c0a80201061389 - /ip4/127.0.0.1/tcp/4001/ip4/192.168.2.1/tcp/5001>
 * mh1.isThinWaistAddress()
 * // true
 * mh2.isThinWaistAddress()
 * // true
 * mh3.isThinWaistAddress()
 * // false
 */
Multiaddr.prototype.isThinWaistAddress = function isThinWaistAddress (addr) {
  const protos = (addr || this).protos()

  if (protos.length !== 2) {
    return false
  }

  if (protos[0].code !== 4 && protos[0].code !== 41) {
    return false
  }
  if (protos[1].code !== 6 && protos[1].code !== 273) {
    return false
  }
  return true
}

/**
 * Object containing table, names and codes of all supported protocols.
 * To get the protocol values from a Multiaddr, you can use
 * [`.protos()`](#multiaddrprotos),
 * [`.protoCodes()`](#multiaddrprotocodes) or
 * [`.protoNames()`](#multiaddrprotonames)
 *
 * @instance
 * @returns {{table: Array, names: Object, codes: Object}}
 *
 */
Multiaddr.protocols = protocols

/**
 * Returns if something is a Multiaddr that is a name
 *
 * @param {Multiaddr} addr
 * @return {Bool} isName
 */
Multiaddr.isName = function isName (addr) {
  if (!Multiaddr.isMultiaddr(addr)) {
    return false
  }

  // if a part of the multiaddr is resolvable, then return true
  return addr.protos().some((proto) => proto.resolvable)
}

/**
 * Returns an array of multiaddrs, by resolving the multiaddr that is a name
 *
 * @async
 * @param {Multiaddr} addr
 * @return {Multiaddr[]}
 */
Multiaddr.resolve = function resolve (addr) {
  if (!Multiaddr.isMultiaddr(addr) || !Multiaddr.isName(addr)) {
    return Promise.reject(Error('not a valid name'))
  }

  /*
   * Needs more consideration from spec design:
   *   - what to return
   *   - how to achieve it in the browser?
   */
  return Promise.reject(new Error('not implemented yet'))
}

exports = module.exports = Multiaddr


/***/ }),

/***/ "6mRj":
/*!*************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pubsub/publish.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const multipartRequest = __webpack_require__(/*! ../lib/multipart-request */ "VWqr")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure(api => {
  return async (topic, data, options = {}) => {
    const searchParams = toUrlSearchParams({
      arg: topic,
      ...options
    })

    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const res = await api.post('pubsub/pub', {
      timeout: options.timeout,
      signal,
      searchParams,
      ...(
        await multipartRequest(data, controller, options.headers)
      )
    })

    await res.text()
  }
})


/***/ }),

/***/ "7HFm":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/name/publish.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (path, options = {}) => {
    const res = await api.post('name/publish', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    })

    return toCamel(await res.json())
  }
})


/***/ }),

/***/ "7HbT":
/*!*********************************************!*\
  !*** ./node_modules/signed-varint/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var varint = __webpack_require__(/*! varint */ "JhIh")
exports.encode = function encode (v, b, o) {
  v = v >= 0 ? v*2 : v*-2 - 1
  var r = varint.encode(v, b, o)
  encode.bytes = varint.encode.bytes
  return r
}
exports.decode = function decode (b, o) {
  var v = varint.decode(b, o)
  decode.bytes = varint.decode.bytes
  return v & 1 ? (v+1) / -2 : v / 2
}

exports.encodingLength = function (v) {
  return varint.encodingLength(v >= 0 ? v*2 : v*-2 - 1)
}


/***/ }),

/***/ "7PTn":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/stats/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  bitswap: __webpack_require__(/*! ../bitswap/stat */ "i4cb")(config),
  bw: __webpack_require__(/*! ./bw */ "K7js")(config),
  repo: __webpack_require__(/*! ../repo/stat */ "o7bL")(config)
})


/***/ }),

/***/ "84If":
/*!********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/profiles/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  apply: __webpack_require__(/*! ./apply */ "9znx")(config),
  list: __webpack_require__(/*! ./list */ "S/E/")(config)
})


/***/ }),

/***/ "8OLg":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bootstrap/rm.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (addr, options = {}) => {
    if (addr && typeof addr === 'object' && !Multiaddr.isMultiaddr(addr)) {
      options = addr
      addr = null
    }

    const res = await api.post('bootstrap/rm', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addr,
        ...options
      }),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "8niS":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  chmod: __webpack_require__(/*! ./chmod */ "nvdC")(config),
  cp: __webpack_require__(/*! ./cp */ "zykU")(config),
  flush: __webpack_require__(/*! ./flush */ "eGpl")(config),
  ls: __webpack_require__(/*! ./ls */ "U2WC")(config),
  mkdir: __webpack_require__(/*! ./mkdir */ "fsky")(config),
  mv: __webpack_require__(/*! ./mv */ "uxy4")(config),
  read: __webpack_require__(/*! ./read */ "BrGM")(config),
  rm: __webpack_require__(/*! ./rm */ "ce/j")(config),
  stat: __webpack_require__(/*! ./stat */ "UaHm")(config),
  touch: __webpack_require__(/*! ./touch */ "V4wN")(config),
  write: __webpack_require__(/*! ./write */ "eZY8")(config)
})


/***/ }),

/***/ "9ayt":
/*!*******************************************************!*\
  !*** ./node_modules/protons/src/compile/encodings.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var varint = __webpack_require__(/*! varint */ "JhIh")
var svarint = __webpack_require__(/*! signed-varint */ "7HbT")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

var encoder = function (type, encode, decode, encodingLength) {
  encode.bytes = decode.bytes = 0

  return {
    type: type,
    encode: encode,
    decode: decode,
    encodingLength: encodingLength
  }
}

exports.make = encoder

exports.bytes = (function () {
  var bufferLength = function (val) {
    return Buffer.isBuffer(val) ? val.length : Buffer.byteLength(val)
  }

  var encodingLength = function (val) {
    var len = bufferLength(val)
    return varint.encodingLength(len) + len
  }

  var encode = function (val, buffer, offset) {
    var oldOffset = offset
    var len = bufferLength(val)

    varint.encode(len, buffer, offset)
    offset += varint.encode.bytes

    if (val instanceof Uint8Array) buffer.set(val, offset)
    else buffer.write(val, offset, len)
    offset += len

    encode.bytes = offset - oldOffset
    return buffer
  }

  var decode = function (buffer, offset) {
    var oldOffset = offset

    var len = varint.decode(buffer, offset)
    offset += varint.decode.bytes

    var val = buffer.slice(offset, offset + len)
    offset += val.length

    decode.bytes = offset - oldOffset
    return val
  }

  return encoder(2, encode, decode, encodingLength)
})()

exports.string = (function () {
  var encodingLength = function (val) {
    var len = Buffer.byteLength(val)
    return varint.encodingLength(len) + len
  }

  var encode = function (val, buffer, offset) {
    var oldOffset = offset
    var len = Buffer.byteLength(val)

    varint.encode(len, buffer, offset, 'utf-8')
    offset += varint.encode.bytes

    buffer.write(val, offset, len)
    offset += len

    encode.bytes = offset - oldOffset
    return buffer
  }

  var decode = function (buffer, offset) {
    var oldOffset = offset

    var len = varint.decode(buffer, offset)
    offset += varint.decode.bytes

    var val = buffer.toString('utf-8', offset, offset + len)
    offset += len

    decode.bytes = offset - oldOffset
    return val
  }

  return encoder(2, encode, decode, encodingLength)
})()

exports.bool = (function () {
  var encodingLength = function (val) {
    return 1
  }

  var encode = function (val, buffer, offset) {
    buffer[offset] = val ? 1 : 0
    encode.bytes = 1
    return buffer
  }

  var decode = function (buffer, offset) {
    var bool = buffer[offset] > 0
    decode.bytes = 1
    return bool
  }

  return encoder(0, encode, decode, encodingLength)
})()

exports.int32 = (function () {
  var decode = function (buffer, offset) {
    var val = varint.decode(buffer, offset)
    decode.bytes = varint.decode.bytes
    return val > 2147483647 ? val - 4294967296 : val
  }

  var encode = function (val, buffer, offset) {
    varint.encode(val < 0 ? val + 4294967296 : val, buffer, offset)
    encode.bytes = varint.encode.bytes
    return buffer
  }

  var encodingLength = function (val) {
    return varint.encodingLength(val < 0 ? val + 4294967296 : val)
  }

  return encoder(0, encode, decode, encodingLength)
})()

exports.int64 = (function () {
  var decode = function (buffer, offset) {
    var val = varint.decode(buffer, offset)
    if (val >= Math.pow(2, 63)) {
      var limit = 9
      while (buffer[offset + limit - 1] === 0xff) limit--
      limit = limit || 9
      var subset = Buffer.allocUnsafe(limit)
      buffer.copy(subset, 0, offset, offset + limit)
      subset[limit - 1] = subset[limit - 1] & 0x7f
      val = -1 * varint.decode(subset, 0)
      decode.bytes = 10
    } else {
      decode.bytes = varint.decode.bytes
    }
    return val
  }

  var encode = function (val, buffer, offset) {
    if (val < 0) {
      var last = offset + 9
      varint.encode(val * -1, buffer, offset)
      offset += varint.encode.bytes - 1
      buffer[offset] = buffer[offset] | 0x80
      while (offset < last - 1) {
        offset++
        buffer[offset] = 0xff
      }
      buffer[last] = 0x01
      encode.bytes = 10
    } else {
      varint.encode(val, buffer, offset)
      encode.bytes = varint.encode.bytes
    }
    return buffer
  }

  var encodingLength = function (val) {
    return val < 0 ? 10 : varint.encodingLength(val)
  }

  return encoder(0, encode, decode, encodingLength)
})()

exports.sint32 =
exports.sint64 = (function () {
  return encoder(0, svarint.encode, svarint.decode, svarint.encodingLength)
})()

exports.uint32 =
exports.uint64 =
exports.enum =
exports.varint = (function () {
  return encoder(0, varint.encode, varint.decode, varint.encodingLength)
})()

// we cannot represent these in javascript so we just use buffers
exports.fixed64 =
exports.sfixed64 = (function () {
  var encodingLength = function (val) {
    return 8
  }

  var encode = function (val, buffer, offset) {
    buffer.set(val, offset)
    encode.bytes = 8
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.slice(offset, offset + 8)
    decode.bytes = 8
    return val
  }

  return encoder(1, encode, decode, encodingLength)
})()

exports.double = (function () {
  var encodingLength = function (val) {
    return 8
  }

  var encode = function (val, buffer, offset) {
    buffer.writeDoubleLE(val, offset)
    encode.bytes = 8
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readDoubleLE(offset)
    decode.bytes = 8
    return val
  }

  return encoder(1, encode, decode, encodingLength)
})()

exports.fixed32 = (function () {
  var encodingLength = function (val) {
    return 4
  }

  var encode = function (val, buffer, offset) {
    buffer.writeUInt32LE(val, offset)
    encode.bytes = 4
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readUInt32LE(offset)
    decode.bytes = 4
    return val
  }

  return encoder(5, encode, decode, encodingLength)
})()

exports.sfixed32 = (function () {
  var encodingLength = function (val) {
    return 4
  }

  var encode = function (val, buffer, offset) {
    buffer.writeInt32LE(val, offset)
    encode.bytes = 4
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readInt32LE(offset)
    decode.bytes = 4
    return val
  }

  return encoder(5, encode, decode, encodingLength)
})()

exports.float = (function () {
  var encodingLength = function (val) {
    return 4
  }

  var encode = function (val, buffer, offset) {
    buffer.writeFloatLE(val, offset)
    encode.bytes = 4
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readFloatLE(offset)
    decode.bytes = 4
    return val
  }

  return encoder(5, encode, decode, encodingLength)
})()


/***/ }),

/***/ "9eVR":
/*!************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/swarm/connect.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (addrs, options = {}) => {
    addrs = Array.isArray(addrs) ? addrs : [addrs]

    const res = await api.post('swarm/connect', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addrs.map(addr => `${addr}`),
        ...options
      }),
      headers: options.headers
    })
    const { Strings } = await res.json()

    return Strings || []
  }
})


/***/ }),

/***/ "9znx":
/*!********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/profiles/apply.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (profile, options = {}) => {
    const res = await api.post('config/profile/apply', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: profile,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return {
      original: data.OldCfg, updated: data.NewCfg
    }
  }
})


/***/ }),

/***/ "AREZ":
/*!****************************************!*\
  !*** ./node_modules/borc/src/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// exports.Commented = require('./commented')
exports.Diagnose = __webpack_require__(/*! ./diagnose */ "jpl7")
exports.Decoder = __webpack_require__(/*! ./decoder */ "hDHj")
exports.Encoder = __webpack_require__(/*! ./encoder */ "LcfU")
exports.Simple = __webpack_require__(/*! ./simple */ "UHYx")
exports.Tagged = __webpack_require__(/*! ./tagged */ "IrRL")

// exports.comment = exports.Commented.comment
exports.decodeAll = exports.Decoder.decodeAll
exports.decodeFirst = exports.Decoder.decodeFirst
exports.diagnose = exports.Diagnose.diagnose
exports.encode = exports.Encoder.encode
exports.decode = exports.Decoder.decode

exports.leveldb = {
  decode: exports.Decoder.decodeAll,
  encode: exports.Encoder.encode,
  buffer: true,
  name: 'cbor'
}


/***/ }),

/***/ "AU6k":
/*!****************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-node/dagNode.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const withIs = __webpack_require__(/*! class-is */ "7BLb")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const sortLinks = __webpack_require__(/*! ./sortLinks */ "bKHj")
const DAGLink = __webpack_require__(/*! ../dag-link/dagLink */ "i5gV")
const { serializeDAGNode } = __webpack_require__(/*! ../serialize.js */ "fAHA")
const toDAGLink = __webpack_require__(/*! ./toDagLink */ "lpP5")
const addLink = __webpack_require__(/*! ./addLink */ "3jrw")
const rmLink = __webpack_require__(/*! ./rmLink */ "iLaE")

class DAGNode {
  constructor (data, links = [], serializedSize = null) {
    if (!data) {
      data = Buffer.alloc(0)
    }
    if (typeof data === 'string') {
      data = Buffer.from(data)
    }
    if (!Buffer.isBuffer(data)) {
      throw new Error('Passed \'data\' is not a buffer or a string!')
    }

    if (serializedSize !== null && typeof serializedSize !== 'number') {
      throw new Error('Passed \'serializedSize\' must be a number!')
    }

    links = links.map((link) => {
      return DAGLink.isDAGLink(link)
        ? link
        : DAGLink.util.createDagLinkFromB58EncodedHash(link)
    })
    links = sortLinks(links)

    this._data = data
    this._links = links
    this._serializedSize = serializedSize
    this._size = null
  }

  toJSON () {
    if (!this._json) {
      this._json = Object.freeze({
        data: this.Data,
        links: this._links.map((l) => l.toJSON()),
        size: this.size
      })
    }

    return Object.assign({}, this._json)
  }

  toString () {
    return `DAGNode <data: "${this.Data.toString('base64')}", links: ${this.Links.length}, size: ${this.size}>`
  }

  _invalidateCached () {
    this._serializedSize = null
    this._size = null
  }

  addLink (link) {
    this._invalidateCached()
    return addLink(this, link)
  }

  rmLink (link) {
    this._invalidateCached()
    return rmLink(this, link)
  }

  // @returns {Promise.<DAGLink>}
  toDAGLink (options) {
    return toDAGLink(this, options)
  }

  serialize () {
    return serializeDAGNode({
      Data: this._data,
      Links: this._links
    })
  }

  get size () {
    if (this._size === null) {
      if (this._serializedSize === null) {
        this._serializedSize = this.serialize().length
      }
      this._size = this._links.reduce((sum, l) => sum + l.Tsize, this._serializedSize)
    }

    return this._size
  }

  set size (size) {
    throw new Error("Can't set property: 'size' is immutable")
  }

  // Getters for backwards compatible path resolving
  get Data () {
    return this._data
  }

  set Data (_) {
    throw new Error("Can't set property: 'Data' is immutable")
  }

  get Links () {
    return this._links.map((link) => {
      return {
        Name: link.Name,
        Tsize: link.Tsize,
        Hash: link.Hash
      }
    })
  }

  set Links (_) {
    throw new Error("Can't set property: 'Links' is immutable")
  }
}

exports = module.exports = withIs(DAGNode, { className: 'DAGNode', symbolName: '@ipld/js-ipld-dag-pb/dagnode' })


/***/ }),

/***/ "AVB3":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/diag/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  net: __webpack_require__(/*! ./net */ "rH8i")(config),
  sys: __webpack_require__(/*! ./sys */ "58cU")(config),
  cmds: __webpack_require__(/*! ./cmds */ "T4LB")(config)
})


/***/ }),

/***/ "BaTB":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/name/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  publish: __webpack_require__(/*! ./publish */ "7HFm")(config),
  resolve: __webpack_require__(/*! ./resolve */ "pB5f")(config),
  pubsub: __webpack_require__(/*! ./pubsub */ "+p9T")(config)
})


/***/ }),

/***/ "BaaY":
/*!******************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/genCid.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const multicodec = __webpack_require__(/*! multicodec */ "OuWa")
const multihashing = __webpack_require__(/*! multihashing-async */ "d9A7")

exports = module.exports

exports.codec = multicodec.DAG_PB
exports.defaultHashAlg = multicodec.SHA2_256

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Object} binaryBlob - Encoded IPLD Node
 * @param {Object} [userOptions] - Options to create the CID
 * @param {number} [userOptions.cidVersion=1] - CID version number
 * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
 * @returns {Promise.<CID>}
 */
const cid = async (binaryBlob, userOptions) => {
  const defaultOptions = { cidVersion: 1, hashAlg: exports.defaultHashAlg }
  const options = Object.assign(defaultOptions, userOptions)

  const multihash = await multihashing(binaryBlob, options.hashAlg)
  const codecName = multicodec.print[exports.codec]
  const cid = new CID(options.cidVersion, codecName, multihash)

  return cid
}

exports.cid = cid


/***/ }),

/***/ "BeX1":
/*!**********************************************!*\
  !*** ./node_modules/is-circular/lib/node.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Node

/**
 * a linked-list node
 * @class
 * @param {any} value - node's value
 * @param {Node} next - next node
 */
function Node (value, next) {
  this.value = value
  this.next = next
}

/**
 * checks if this node or any of its children has the value
 * @param {any} value - value to check if linked-list contains
 * @return {boolean} true if the list contains the value; false if not
 */
Node.prototype.contains = function (value) {
  var cursor = this

  while (cursor) {
    if (cursor.value === value) return true
    cursor = cursor.next
  }

  return false
}


/***/ }),

/***/ "BrGM":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/read.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const toIterable = __webpack_require__(/*! stream-to-it/source */ "JUCO")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * read (path, options = {}) {
    const res = await api.post('files/read', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        count: options.count || options.length,
        ...options
      }),
      headers: options.headers
    })

    for await (const chunk of toIterable(res.body)) {
      yield Buffer.from(chunk)
    }
  }
})


/***/ }),

/***/ "BwFZ":
/*!*************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bootstrap/list.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('bootstrap/list', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "ByUX":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/swarm/peers.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await (await api.post('swarm/peers', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })).json()

    return (res.Peers || []).map(peer => {
      const info = {}
      try {
        info.addr = multiaddr(peer.Addr)
        info.peer = peer.Peer
      } catch (error) {
        info.error = error
        info.rawPeerInfo = peer
      }
      if (peer.Muxer) {
        info.muxer = peer.Muxer
      }
      if (peer.Latency) {
        info.latency = peer.Latency
      }
      if (peer.Streams) {
        info.streams = peer.Streams
      }
      if (peer.Direction != null) {
        info.direction = peer.Direction
      }
      return info
    })
  }
})


/***/ }),

/***/ "CN9R":
/*!*******************************************************!*\
  !*** ./node_modules/protocol-buffers-schema/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ./parse */ "kfWR")
var stringify = __webpack_require__(/*! ./stringify */ "DQ9f")

module.exports = parse
module.exports.parse = parse
module.exports.stringify = stringify


/***/ }),

/***/ "Cr3x":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/core.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-env browser */
const Multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const toUri = __webpack_require__(/*! multiaddr-to-uri */ "/w41")
const { isBrowser, isWebWorker } = __webpack_require__(/*! ipfs-utils/src/env */ "KYSR")
const { URL } = __webpack_require__(/*! iso-url */ "Fq86")
const parseDuration = __webpack_require__(/*! parse-duration */ "PLmP").default
const log = __webpack_require__(/*! debug */ "NOtv")('ipfs-http-client:lib:error-handler')
const HTTP = __webpack_require__(/*! ipfs-utils/src/http */ "Zws2")
const merge = __webpack_require__(/*! merge-options */ "T8vI")

const isMultiaddr = (input) => {
  try {
    Multiaddr(input) // eslint-disable-line no-new
    return true
  } catch (e) {
    return false
  }
}

const normalizeInput = (options = {}) => {
  if (isMultiaddr(options)) {
    options = { url: toUri(options) }
  } else if (typeof options === 'string') {
    options = { url: options }
  }

  const url = new URL(options.url)
  if (options.apiPath) {
    url.pathname = options.apiPath
  } else if (url.pathname === '/' || url.pathname === undefined) {
    url.pathname = 'api/v0'
  }
  if (!options.url) {
    if (isBrowser || isWebWorker) {
      url.protocol = options.protocol || location.protocol
      url.hostname = options.host || location.hostname
      url.port = options.port || location.port
    } else {
      url.hostname = options.host || 'localhost'
      url.port = options.port || '5001'
      url.protocol = options.protocol || 'http'
    }
  }
  options.url = url

  return options
}

const errorHandler = async (response) => {
  let msg

  try {
    if ((response.headers.get('Content-Type') || '').startsWith('application/json')) {
      const data = await response.json()
      log(data)
      msg = data.Message || data.message
    } else {
      msg = await response.text()
    }
  } catch (err) {
    log('Failed to parse error response', err)
    // Failed to extract/parse error message from response
    msg = err.message
  }

  let error = new HTTP.HTTPError(response)

  // This is what go-ipfs returns where there's a timeout
  if (msg && msg.includes('context deadline exceeded')) {
    error = new HTTP.TimeoutError(response)
  }

  // If we managed to extract a message from the response, use it
  if (msg) {
    error.message = msg
  }

  throw error
}

const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g
const kebabCase = (str) => {
  return str.replace(KEBAB_REGEX, function (match) {
    return '-' + match.toLowerCase()
  })
}

const parseTimeout = (value) => {
  return typeof value === 'string' ? parseDuration(value) : value
}

/**
 * @typedef {Object} ClientOptions
 * @prop {string} [host]
 * @prop {number} [port]
 * @prop {string} [protocol]
 * @prop {Headers|Record<string, string>} [headers] - Request headers.
 * @prop {number|string} [timeout] - Amount of time until request should timeout in ms or humand readable. https://www.npmjs.com/package/parse-duration for valid string values.
 * @prop {string} [apiPath] - Path to the API.
 * @prop {URL|string} [url] - Full API URL.
 */

class Client extends HTTP {
  /**
   *
   * @param {ClientOptions|URL|Multiaddr|string} options
   */
  constructor (options = {}) {
    /** @type {ClientOptions} */
    const opts = normalizeInput(options)
    super({
      timeout: parseTimeout(opts.timeout) || 60000 * 20,
      headers: opts.headers,
      base: normalizeInput(opts.url).toString(),
      handleError: errorHandler,
      transformSearchParams: (search) => {
        const out = new URLSearchParams()

        // @ts-ignore https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
        for (const [key, value] of search) {
          if (
            value !== 'undefined' &&
            value !== 'null' &&
            key !== 'signal'
          ) {
            out.append(kebabCase(key), value)
          }

          // server timeouts are strings
          if (key === 'timeout' && !isNaN(value)) {
            out.append(kebabCase(key), value)
          }
        }

        return out
      }
    })

    delete this.get
    delete this.put
    delete this.delete
    delete this.options

    const fetch = this.fetch

    this.fetch = (resource, options = {}) => {
      return fetch.call(this, resource, merge(options, {
        method: 'POST'
      }))
    }
  }
}

Client.errorHandler = errorHandler

module.exports = Client


/***/ }),

/***/ "CrJr":
/*!****************************************************************************!*\
  !*** ./node_modules/ipld-raw/node_modules/multihashing-async/src/utils.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

const fromNumberTo32BitBuf = (number) => {
  const bytes = new Array(4)

  for (let i = 0; i < 4; i++) {
    bytes[i] = number & 0xff
    number = number >> 8
  }

  return Buffer.from(bytes)
}

module.exports = {
  fromNumberTo32BitBuf
}


/***/ }),

/***/ "CuFS":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/refs/local.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * refsLocal (options = {}) {
    const res = await api.post('refs/local', {
      timeout: options.timeout,
      signal: options.signal,
      transform: toCamel,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    yield * res.ndjson()
  }
})


/***/ }),

/***/ "D13v":
/*!************************************************!*\
  !*** ./node_modules/it-tar/extract-headers.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const BufferList = __webpack_require__(/*! bl/BufferList */ "XDq5")

var ZERO_OFFSET = '0'.charCodeAt(0)
var USTAR_MAGIC = Buffer.from('ustar\x00', 'binary')
var GNU_MAGIC = Buffer.from('ustar\x20', 'binary')
var GNU_VER = Buffer.from('\x20\x00', 'binary')
var MAGIC_OFFSET = 257
var VERSION_OFFSET = 263

var clamp = function (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

var toType = function (flag) {
  switch (flag) {
    case 0:
      return 'file'
    case 1:
      return 'link'
    case 2:
      return 'symlink'
    case 3:
      return 'character-device'
    case 4:
      return 'block-device'
    case 5:
      return 'directory'
    case 6:
      return 'fifo'
    case 7:
      return 'contiguous-file'
    case 72:
      return 'pax-header'
    case 55:
      return 'pax-global-header'
    case 27:
      return 'gnu-long-link-path'
    case 28:
    case 30:
      return 'gnu-long-path'
  }

  return null
}

var indexOf = function (block, num, offset, end) {
  for (; offset < end; offset++) {
    if (block.get(offset) === num) return offset
  }
  return end
}

var cksum = function (block) {
  var sum = 8 * 32
  for (var i = 0; i < 148; i++) sum += block.get(i)
  for (var j = 156; j < 512; j++) sum += block.get(j)
  return sum
}

/* Copied from the node-tar repo and modified to meet
 * tar-stream coding standard.
 *
 * Source: https://github.com/npm/node-tar/blob/51b6627a1f357d2eb433e7378e5f05e83b7aa6cd/lib/header.js#L349
 */
function parse256 (buf) {
  // first byte MUST be either 80 or FF
  // 80 for positive, FF for 2's comp
  var positive
  if (buf.get(0) === 0x80) positive = true
  else if (buf.get(0) === 0xFF) positive = false
  else return null

  // build up a base-256 tuple from the least sig to the highest
  var zero = false
  var tuple = []
  for (var i = buf.length - 1; i > 0; i--) {
    var byte = buf.get(i)
    if (positive) tuple.push(byte)
    else if (zero && byte === 0) tuple.push(0)
    else if (zero) {
      zero = false
      tuple.push(0x100 - byte)
    } else tuple.push(0xFF - byte)
  }

  var sum = 0
  var l = tuple.length
  for (i = 0; i < l; i++) {
    sum += tuple[i] * Math.pow(256, i)
  }

  return positive ? sum : -1 * sum
}

var decodeOct = function (val, offset, length) {
  val = val.shallowSlice(offset, offset + length)
  offset = 0

  // If prefixed with 0x80 then parse as a base-256 integer
  if (val.get(offset) & 0x80) {
    return parse256(val)
  } else {
    // Older versions of tar can prefix with spaces
    while (offset < val.length && val.get(offset) === 32) offset++
    var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length)
    while (offset < end && val.get(offset) === 0) offset++
    if (end === offset) return 0
    return parseInt(val.shallowSlice(offset, end).toString(), 8)
  }
}

var decodeStr = function (val, offset, length, encoding) {
  return val.shallowSlice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding)
}

exports.decodeLongPath = function (buf, encoding) {
  buf = BufferList.isBufferList(buf) ? buf : new BufferList(buf)
  return decodeStr(buf, 0, buf.length, encoding)
}

exports.decodePax = function (buf) {
  buf = BufferList.isBufferList(buf) ? buf : new BufferList(buf)
  var result = {}

  while (buf.length) {
    var i = 0
    while (i < buf.length && buf.get(i) !== 32) i++
    var len = parseInt(buf.shallowSlice(0, i).toString(), 10)
    if (!len) return result

    var b = buf.shallowSlice(i + 1, len - 1).toString()
    var keyIndex = b.indexOf('=')
    if (keyIndex === -1) return result
    result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1)

    buf = buf.shallowSlice(len)
  }

  return result
}

exports.decode = function (buf, filenameEncoding) {
  buf = BufferList.isBufferList(buf) ? buf : new BufferList(buf)
  var typeflag = buf.get(156) === 0 ? 0 : buf.get(156) - ZERO_OFFSET

  var name = decodeStr(buf, 0, 100, filenameEncoding)
  var mode = decodeOct(buf, 100, 8)
  var uid = decodeOct(buf, 108, 8)
  var gid = decodeOct(buf, 116, 8)
  var size = decodeOct(buf, 124, 12)
  var mtime = decodeOct(buf, 136, 12)
  var type = toType(typeflag)
  var linkname = buf.get(157) === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding)
  var uname = decodeStr(buf, 265, 32)
  var gname = decodeStr(buf, 297, 32)
  var devmajor = decodeOct(buf, 329, 8)
  var devminor = decodeOct(buf, 337, 8)

  var c = cksum(buf)

  // checksum is still initial value if header was null.
  if (c === 8 * 32) return null

  // valid checksum
  if (c !== decodeOct(buf, 148, 8)) throw new Error('Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?')

  if (USTAR_MAGIC.compare(buf.slice(MAGIC_OFFSET, MAGIC_OFFSET + 6)) === 0) {
    // ustar (posix) format.
    // prepend prefix, if present.
    if (buf.get(345)) name = decodeStr(buf, 345, 155, filenameEncoding) + '/' + name
  } else if (GNU_MAGIC.compare(buf.slice(MAGIC_OFFSET, MAGIC_OFFSET + 6)) === 0 &&
             GNU_VER.compare(buf.slice(VERSION_OFFSET, VERSION_OFFSET + 2)) === 0) {
    // 'gnu'/'oldgnu' format. Similar to ustar, but has support for incremental and
    // multi-volume tarballs.
  } else {
    throw new Error('Invalid tar header: unknown format.')
  }

  // to support old tar versions that use trailing / to indicate dirs
  if (typeflag === 0 && name && name[name.length - 1] === '/') typeflag = 5

  return {
    name: name,
    mode: mode,
    uid: uid,
    gid: gid,
    size: size,
    mtime: new Date(1000 * mtime),
    type: type,
    linkname: linkname,
    uname: uname,
    gname: gname,
    devmajor: devmajor,
    devminor: devminor
  }
}


/***/ }),

/***/ "D2y0":
/*!***********************************************************************!*\
  !*** ./node_modules/merge-options/node_modules/is-plain-obj/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = value => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};


/***/ }),

/***/ "DQ9f":
/*!***********************************************************!*\
  !*** ./node_modules/protocol-buffers-schema/stringify.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var onfield = function (f, result) {
  var prefix = f.repeated ? 'repeated' : f.required ? 'required' : 'optional'
  if (f.type === 'map') prefix = 'map<' + f.map.from + ',' + f.map.to + '>'
  if (f.oneof) prefix = ''

  var opts = Object.keys(f.options || {}).map(function (key) {
    return key + ' = ' + f.options[key]
  }).join(',')

  if (opts) opts = ' [' + opts + ']'

  result.push((prefix ? prefix + ' ' : '') + (f.map === 'map' ? '' : f.type + ' ') + f.name + ' = ' + f.tag + opts + ';')
  return result
}

var onmessage = function (m, result) {
  result.push('message ' + m.name + ' {')

  if (!m.options) m.options = {}
  onoption(m.options, result)

  if (!m.enums) m.enums = []
  m.enums.forEach(function (e) {
    result.push(onenum(e, []))
  })

  if (!m.messages) m.messages = []
  m.messages.forEach(function (m) {
    result.push(onmessage(m, []))
  })

  var oneofs = {}

  if (!m.fields) m.fields = []
  m.fields.forEach(function (f) {
    if (f.oneof) {
      if (!oneofs[f.oneof]) oneofs[f.oneof] = []
      oneofs[f.oneof].push(onfield(f, []))
    } else {
      result.push(onfield(f, []))
    }
  })

  Object.keys(oneofs).forEach(function (n) {
    oneofs[n].unshift('oneof ' + n + ' {')
    oneofs[n].push('}')
    result.push(oneofs[n])
  })

  result.push('}', '')
  return result
}

var onenum = function (e, result) {
  result.push('enum ' + e.name + ' {')
  if (!e.options) e.options = {}
  var options = onoption(e.options, [])
  if (options.length > 1) {
    result.push(options.slice(0, -1))
  }
  Object.keys(e.values).map(function (v) {
    var val = onenumvalue(e.values[v])
    result.push([v + ' = ' + val + ';'])
  })
  result.push('}', '')
  return result
}

var onenumvalue = function (v, result) {
  var opts = Object.keys(v.options || {}).map(function (key) {
    return key + ' = ' + v.options[key]
  }).join(',')

  if (opts) opts = ' [' + opts + ']'
  var val = v.value + opts
  return val
}

var onoption = function (o, result) {
  var keys = Object.keys(o)
  keys.forEach(function (option) {
    var v = o[option]
    if (~option.indexOf('.')) option = '(' + option + ')'

    var type = typeof v

    if (type === 'object') {
      v = onoptionMap(v, [])
      if (v.length) result.push('option ' + option + ' = {', v, '};')
    } else {
      if (type === 'string' && option !== 'optimize_for') v = '"' + v + '"'
      result.push('option ' + option + ' = ' + v + ';')
    }
  })
  if (keys.length > 0) {
    result.push('')
  }

  return result
}

var onoptionMap = function (o, result) {
  var keys = Object.keys(o)
  keys.forEach(function (k) {
    var v = o[k]

    var type = typeof v

    if (type === 'object') {
      if (Array.isArray(v)) {
        v.forEach(function (v) {
          v = onoptionMap(v, [])
          if (v.length) result.push(k + ' {', v, '}')
        })
      } else {
        v = onoptionMap(v, [])
        if (v.length) result.push(k + ' {', v, '}')
      }
    } else {
      if (type === 'string') v = '"' + v + '"'
      result.push(k + ': ' + v)
    }
  })

  return result
}

var onservices = function (s, result) {
  result.push('service ' + s.name + ' {')

  if (!s.options) s.options = {}
  onoption(s.options, result)
  if (!s.methods) s.methods = []
  s.methods.forEach(function (m) {
    result.push(onrpc(m, []))
  })

  result.push('}', '')
  return result
}

var onrpc = function (rpc, result) {
  var def = 'rpc ' + rpc.name + '('
  if (rpc.client_streaming) def += 'stream '
  def += rpc.input_type + ') returns ('
  if (rpc.server_streaming) def += 'stream '
  def += rpc.output_type + ')'

  if (!rpc.options) rpc.options = {}

  var options = onoption(rpc.options, [])
  if (options.length > 1) {
    result.push(def + ' {', options.slice(0, -1), '}')
  } else {
    result.push(def + ';')
  }

  return result
}

var indent = function (lvl) {
  return function (line) {
    if (Array.isArray(line)) return line.map(indent(lvl + '  ')).join('\n')
    return lvl + line
  }
}

module.exports = function (schema) {
  var result = []

  result.push('syntax = "proto' + schema.syntax + '";', '')

  if (schema.package) result.push('package ' + schema.package + ';', '')

  if (!schema.options) schema.options = {}

  onoption(schema.options, result)

  if (!schema.enums) schema.enums = []
  schema.enums.forEach(function (e) {
    onenum(e, result)
  })

  if (!schema.messages) schema.messages = []
  schema.messages.forEach(function (m) {
    onmessage(m, result)
  })

  if (schema.services) {
    schema.services.forEach(function (s) {
      onservices(s, result)
    })
  }
  return result.map(indent('')).join('\n')
}


/***/ }),

/***/ "DbO0":
/*!*****************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/key/rm.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (name, options = {}) => {
    const res = await api.post('key/rm', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return toCamel(data.Keys[0])
  }
})


/***/ }),

/***/ "Dbhl":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/data.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function data (cid, options = {}) {
    const res = await api.post('object/data', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.arrayBuffer()

    return Buffer.from(data)
  }
})


/***/ }),

/***/ "DeBz":
/*!*************************************************************!*\
  !*** ./node_modules/any-signal/abort-controller.browser.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-env browser */

module.exports = AbortController


/***/ }),

/***/ "DgJx":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/block/get.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Block = __webpack_require__(/*! ipld-block */ "rvZ0")
const CID = __webpack_require__(/*! cids */ "iARh")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, options = {}) => {
    cid = new CID(cid)

    const res = await api.post('block/get', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cid.toString(),
        ...options
      }),
      headers: options.headers
    })

    return new Block(Buffer.from(await res.arrayBuffer()), cid)
  }
})


/***/ }),

/***/ "DmgN":
/*!*************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/find-provs.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const { Provider } = __webpack_require__(/*! ./response-types */ "o23V")

module.exports = configure(api => {
  return async function * findProvs (cid, options = {}) {
    const res = await api.post('dht/findprovs', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${new CID(cid)}`,
        ...options
      }),
      headers: options.headers
    })

    for await (const message of res.ndjson()) {
      if (message.Type === Provider && message.Responses) {
        for (const { ID, Addrs } of message.Responses) {
          yield {
            id: ID,
            addrs: (Addrs || []).map(a => multiaddr(a))
          }
        }
      }
    }
  }
})


/***/ }),

/***/ "E1bq":
/*!*************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-link/util.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DAGLink = __webpack_require__(/*! ./dagLink */ "i5gV")

function createDagLinkFromB58EncodedHash (link) {
  return new DAGLink(
    link.Name || link.name || '',
    link.Tsize || link.Size || link.size || 0,
    link.Hash || link.hash || link.multihash || link.cid
  )
}

exports = module.exports
exports.createDagLinkFromB58EncodedHash = createDagLinkFromB58EncodedHash


/***/ }),

/***/ "E8hM":
/*!****************************************************************************!*\
  !*** ./node_modules/ipld-raw/node_modules/multihashing-async/src/blake.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const blake = __webpack_require__(/*! blakejs */ "yPZT")

const minB = 0xb201
const minS = 0xb241

const blake2b = {
  init: blake.blake2bInit,
  update: blake.blake2bUpdate,
  digest: blake.blake2bFinal
}

const blake2s = {
  init: blake.blake2sInit,
  update: blake.blake2sUpdate,
  digest: blake.blake2sFinal
}

// Note that although this function doesn't do any asynchronous work, we mark
// the function as async because it must return a Promise to match the API
// for other functions that do perform asynchronous work (see sha.browser.js)
// eslint-disable-next-line
const makeB2Hash = (size, hf) => async (data) => {
  const ctx = hf.init(size, null)
  hf.update(ctx, data)
  return Buffer.from(hf.digest(ctx))
}

module.exports = (table) => {
  for (let i = 0; i < 64; i++) {
    table[minB + i] = makeB2Hash(i + 1, blake2b)
  }
  for (let i = 0; i < 32; i++) {
    table[minS + i] = makeB2Hash(i + 1, blake2s)
  }
}


/***/ }),

/***/ "Ekfz":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/key/import.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (name, pem, password, options = {}) => {
    if (typeof password !== 'string') {
      options = password || {}
      password = null
    }

    const res = await api.post('key/import', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name,
        pem,
        password,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return toCamel(data)
  }
})


/***/ }),

/***/ "EqY/":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/provide.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * provide (cids, options = {}) {
    cids = Array.isArray(cids) ? cids : [cids]

    const res = await api.post('dht/provide', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cids.map(cid => new CID(cid).toString()),
        ...options
      }),
      headers: options.headers
    })

    for await (let message of res.ndjson()) {
      message = toCamel(message)
      message.id = new CID(message.id)
      if (message.responses) {
        message.responses = message.responses.map(({ ID, Addrs }) => ({
          id: ID,
          addrs: (Addrs || []).map(a => multiaddr(a))
        }))
      } else {
        message.responses = []
      }
      yield message
    }
  }
})


/***/ }),

/***/ "FGiv":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "FOxu":
/*!*****************************************!*\
  !*** ./node_modules/blakejs/blake2b.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Blake2B in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch

var util = __webpack_require__(/*! ./util */ "gyeY")

// 64-bit unsigned addition
// Sets v[a,a+1] += v[b,b+1]
// v should be a Uint32Array
function ADD64AA (v, a, b) {
  var o0 = v[a] + v[b]
  var o1 = v[a + 1] + v[b + 1]
  if (o0 >= 0x100000000) {
    o1++
  }
  v[a] = o0
  v[a + 1] = o1
}

// 64-bit unsigned addition
// Sets v[a,a+1] += b
// b0 is the low 32 bits of b, b1 represents the high 32 bits
function ADD64AC (v, a, b0, b1) {
  var o0 = v[a] + b0
  if (b0 < 0) {
    o0 += 0x100000000
  }
  var o1 = v[a + 1] + b1
  if (o0 >= 0x100000000) {
    o1++
  }
  v[a] = o0
  v[a + 1] = o1
}

// Little-endian byte access
function B2B_GET32 (arr, i) {
  return (arr[i] ^
  (arr[i + 1] << 8) ^
  (arr[i + 2] << 16) ^
  (arr[i + 3] << 24))
}

// G Mixing function
// The ROTRs are inlined for speed
function B2B_G (a, b, c, d, ix, iy) {
  var x0 = m[ix]
  var x1 = m[ix + 1]
  var y0 = m[iy]
  var y1 = m[iy + 1]

  ADD64AA(v, a, b) // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
  ADD64AC(v, a, x0, x1) // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
  var xor0 = v[d] ^ v[a]
  var xor1 = v[d + 1] ^ v[a + 1]
  v[d] = xor1
  v[d + 1] = xor0

  ADD64AA(v, c, d)

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor0 >>> 24) ^ (xor1 << 8)
  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8)

  ADD64AA(v, a, b)
  ADD64AC(v, a, y0, y1)

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
  xor0 = v[d] ^ v[a]
  xor1 = v[d + 1] ^ v[a + 1]
  v[d] = (xor0 >>> 16) ^ (xor1 << 16)
  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16)

  ADD64AA(v, c, d)

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor1 >>> 31) ^ (xor0 << 1)
  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1)
}

// Initialization Vector
var BLAKE2B_IV32 = new Uint32Array([
  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
])

var SIGMA8 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
]

// These are offsets into a uint64 buffer.
// Multiply them all by 2 to make them offsets into a uint32 buffer,
// because this is Javascript and we don't have uint64s
var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }))

// Compression function. 'last' flag indicates last block.
// Note we're representing 16 uint64s as 32 uint32s
var v = new Uint32Array(32)
var m = new Uint32Array(32)
function blake2bCompress (ctx, last) {
  var i = 0

  // init work variables
  for (i = 0; i < 16; i++) {
    v[i] = ctx.h[i]
    v[i + 16] = BLAKE2B_IV32[i]
  }

  // low 64 bits of offset
  v[24] = v[24] ^ ctx.t
  v[25] = v[25] ^ (ctx.t / 0x100000000)
  // high 64 bits not supported, offset may not be higher than 2**53-1

  // last block flag set ?
  if (last) {
    v[28] = ~v[28]
    v[29] = ~v[29]
  }

  // get little-endian words
  for (i = 0; i < 32; i++) {
    m[i] = B2B_GET32(ctx.b, 4 * i)
  }

  // twelve rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 64)
  for (i = 0; i < 12; i++) {
    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1])
    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3])
    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5])
    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7])
    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9])
    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11])
    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13])
    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15])
  }
  // util.debugPrint('   (i=12) v[16]', v, 64)

  for (i = 0; i < 16; i++) {
    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16]
  }
  // util.debugPrint('h[8]', ctx.h, 64)
}

// Creates a BLAKE2b hashing context
// Requires an output length between 1 and 64 bytes
// Takes an optional Uint8Array key
function blake2bInit (outlen, key) {
  if (outlen === 0 || outlen > 64) {
    throw new Error('Illegal output length, expected 0 < length <= 64')
  }
  if (key && key.length > 64) {
    throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64')
  }

  // state, 'param block'
  var ctx = {
    b: new Uint8Array(128),
    h: new Uint32Array(16),
    t: 0, // input count
    c: 0, // pointer within buffer
    outlen: outlen // output length in bytes
  }

  // initialize hash state
  for (var i = 0; i < 16; i++) {
    ctx.h[i] = BLAKE2B_IV32[i]
  }
  var keylen = key ? key.length : 0
  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen

  // key the hash, if applicable
  if (key) {
    blake2bUpdate(ctx, key)
    // at the end
    ctx.c = 128
  }

  return ctx
}

// Updates a BLAKE2b streaming hash
// Requires hash context and Uint8Array (byte array)
function blake2bUpdate (ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 128) { // buffer full ?
      ctx.t += ctx.c // add counters
      blake2bCompress(ctx, false) // compress (not last)
      ctx.c = 0 // counter to zero
    }
    ctx.b[ctx.c++] = input[i]
  }
}

// Completes a BLAKE2b streaming hash
// Returns a Uint8Array containing the message digest
function blake2bFinal (ctx) {
  ctx.t += ctx.c // mark last block offset

  while (ctx.c < 128) { // fill up with zeros
    ctx.b[ctx.c++] = 0
  }
  blake2bCompress(ctx, true) // final block flag = 1

  // little endian convert and store
  var out = new Uint8Array(ctx.outlen)
  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = ctx.h[i >> 2] >> (8 * (i & 3))
  }
  return out
}

// Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64
function blake2b (input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 64
  input = util.normalizeInput(input)

  // do the math
  var ctx = blake2bInit(outlen, key)
  blake2bUpdate(ctx, input)
  return blake2bFinal(ctx)
}

// Computes the BLAKE2B hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64
function blake2bHex (input, key, outlen) {
  var output = blake2b(input, key, outlen)
  return util.toHex(output)
}

module.exports = {
  blake2b: blake2b,
  blake2bHex: blake2bHex,
  blake2bInit: blake2bInit,
  blake2bUpdate: blake2bUpdate,
  blake2bFinal: blake2bFinal
}


/***/ }),

/***/ "FeRZ":
/*!***********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/to-url-search-params.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const modeToString = __webpack_require__(/*! ./mode-to-string */ "JX3q")
const mtimeToObject = __webpack_require__(/*! ./mtime-to-object */ "gq3O")

module.exports = ({ arg, searchParams, hashAlg, mtime, mode, ...options } = {}) => {
  if (searchParams) {
    options = {
      ...options,
      ...searchParams
    }
  }

  if (hashAlg) {
    options.hash = hashAlg
  }

  if (mtime != null) {
    mtime = mtimeToObject(mtime)

    options.mtime = mtime.secs
    options.mtimeNsecs = mtime.nsecs
  }

  if (mode != null) {
    options.mode = modeToString(mode)
  }

  if (options.timeout && !isNaN(options.timeout)) {
    // server API expects timeouts as strings
    options.timeout = `${options.timeout}ms`
  }

  if (arg === undefined || arg === null) {
    arg = []
  } else if (!Array.isArray(arg)) {
    arg = [arg]
  }

  const urlSearchParams = new URLSearchParams(options)

  arg.forEach(arg => urlSearchParams.append('arg', arg))

  return urlSearchParams
}


/***/ }),

/***/ "FfdA":
/*!***************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/swarm/disconnect.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (addrs, options = {}) => {
    addrs = Array.isArray(addrs) ? addrs : [addrs]

    const res = await api.post('swarm/disconnect', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addrs.map(addr => `${addr}`),
        ...options
      }),
      headers: options.headers
    })
    const { Strings } = await res.json()

    return Strings || []
  }
})


/***/ }),

/***/ "FoBi":
/*!***************************************************!*\
  !*** ./src/app/pages/mint-card/mint-card.page.ts ***!
  \***************************************************/
/*! exports provided: MintCardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MintCardPage", function() { return MintCardPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_mint_card_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./mint-card.page.html */ "ebln");
/* harmony import */ var _mint_card_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mint-card.page.scss */ "sk5w");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/global.service */ "4WDQ");






let MintCardPage = class MintCardPage {
    constructor(route, router, globalService) {
        this.route = route;
        this.router = router;
        this.globalService = globalService;
        if (!globalService.isDevel && !this.globalService.userIsLogged)
            this.router.navigate(['/login'], {});
    }
    ngOnInit() {
    }
};
MintCardPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"] }
];
MintCardPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-mint-card',
        template: _raw_loader_mint_card_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_mint_card_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], MintCardPage);



/***/ }),

/***/ "Fq86":
/*!***************************************!*\
  !*** ./node_modules/iso-url/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
    URLWithLegacySupport,
    format,
    URLSearchParams,
    defaultBase
} = __webpack_require__(/*! ./src/url */ "HwtC");
const relative = __webpack_require__(/*! ./src/relative */ "PV6L");

module.exports = {
    URL: URLWithLegacySupport,
    URLSearchParams,
    format,
    relative,
    defaultBase
};


/***/ }),

/***/ "GUAX":
/*!**************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-node/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__(/*! ./dagNode */ "AU6k")


/***/ }),

/***/ "HGUD":
/*!************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/find-peer.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const { FinalPeer } = __webpack_require__(/*! ./response-types */ "o23V")

module.exports = configure(api => {
  return async function findPeer (peerId, options = {}) {
    const res = await api.post('dht/findpeer', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(peerId) ? new CID(peerId) : peerId}`,
        ...options
      }),
      headers: options.headers
    })

    for await (const data of res.ndjson()) {
      if (data.Type === FinalPeer && data.Responses) {
        const { ID, Addrs } = data.Responses[0]
        return {
          id: ID,
          addrs: (Addrs || []).map(a => multiaddr(a))
        }
      }
    }

    throw new Error('not found')
  }
})


/***/ }),

/***/ "HLqp":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/put.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const { DAGNode } = __webpack_require__(/*! ipld-dag-pb */ "yFpY")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const multipartRequest = __webpack_require__(/*! ../lib/multipart-request */ "VWqr")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure(api => {
  return async (obj, options = {}) => {
    let tmpObj = {
      Data: null,
      Links: []
    }

    if (Buffer.isBuffer(obj)) {
      if (!options.enc) {
        tmpObj = {
          Data: obj.toString(),
          Links: []
        }
      }
    } else if (DAGNode.isDAGNode(obj)) {
      tmpObj = {
        Data: obj.Data.toString(),
        Links: obj.Links.map(l => ({
          Name: l.Name,
          Hash: l.Hash.toString(),
          Size: l.Tsize
        }))
      }
    } else if (typeof obj === 'object') {
      tmpObj.Data = obj.Data.toString()
      tmpObj.Links = obj.Links
    } else {
      throw new Error('obj not recognized')
    }

    let buf
    if (Buffer.isBuffer(obj) && options.enc) {
      buf = obj
    } else {
      options.enc = 'json'
      buf = Buffer.from(JSON.stringify(tmpObj))
    }

    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const res = await api.post('object/put', {
      timeout: options.timeout,
      signal,
      searchParams: toUrlSearchParams(options),
      ...(
        await multipartRequest(buf, controller, options.headers)
      )
    })

    const { Hash } = await res.json()

    return new CID(Hash)
  }
})


/***/ }),

/***/ "HwtC":
/*!*************************************************!*\
  !*** ./node_modules/iso-url/src/url-browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const defaultBase = self.location ?
    self.location.protocol + '//' + self.location.host :
    '';
const URL = self.URL;

class URLWithLegacySupport {
    constructor(url = '', base = defaultBase) {
        this.super = new URL(url, base);
        this.path = this.pathname + this.search;
        this.auth =
            this.username && this.password ?
                this.username + ':' + this.password :
                null;

        this.query =
            this.search && this.search.startsWith('?') ?
                this.search.slice(1) :
                null;
    }

    get hash() {
        return this.super.hash;
    }
    get host() {
        return this.super.host;
    }
    get hostname() {
        return this.super.hostname;
    }
    get href() {
        return this.super.href;
    }
    get origin() {
        return this.super.origin;
    }
    get password() {
        return this.super.password;
    }
    get pathname() {
        return this.super.pathname;
    }
    get port() {
        return this.super.port;
    }
    get protocol() {
        return this.super.protocol;
    }
    get search() {
        return this.super.search;
    }
    get searchParams() {
        return this.super.searchParams;
    }
    get username() {
        return this.super.username;
    }

    set hash(hash) {
        this.super.hash = hash;
    }
    set host(host) {
        this.super.host = host;
    }
    set hostname(hostname) {
        this.super.hostname = hostname;
    }
    set href(href) {
        this.super.href = href;
    }
    set origin(origin) {
        this.super.origin = origin;
    }
    set password(password) {
        this.super.password = password;
    }
    set pathname(pathname) {
        this.super.pathname = pathname;
    }
    set port(port) {
        this.super.port = port;
    }
    set protocol(protocol) {
        this.super.protocol = protocol;
    }
    set search(search) {
        this.super.search = search;
    }
    set searchParams(searchParams) {
        this.super.searchParams = searchParams;
    }
    set username(username) {
        this.super.username = username;
    }

    createObjectURL(o) {
        return this.super.createObjectURL(o);
    }
    revokeObjectURL(o) {
        this.super.revokeObjectURL(o);
    }
    toJSON() {
        return this.super.toJSON();
    }
    toString() {
        return this.super.toString();
    }
    format() {
        return this.toString();
    }
}

function format(obj) {
    if (typeof obj === 'string') {
        const url = new URL(obj);

        return url.toString();
    }

    if (!(obj instanceof URL)) {
        const userPass =
            obj.username && obj.password ?
                `${obj.username}:${obj.password}@` :
                '';
        const auth = obj.auth ? obj.auth + '@' : '';
        const port = obj.port ? ':' + obj.port : '';
        const protocol = obj.protocol ? obj.protocol + '//' : '';
        const host = obj.host || '';
        const hostname = obj.hostname || '';
        const search = obj.search || (obj.query ? '?' + obj.query : '');
        const hash = obj.hash || '';
        const pathname = obj.pathname || '';
        const path = obj.path || pathname + search;

        return `${protocol}${userPass || auth}${host ||
            hostname + port}${path}${hash}`;
    }
}

module.exports = {
    URLWithLegacySupport,
    URLSearchParams: self.URLSearchParams,
    defaultBase,
    format
};


/***/ }),

/***/ "Hyoh":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/put.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const multipartRequest = __webpack_require__(/*! ../lib/multipart-request */ "VWqr")

module.exports = configure(api => {
  return async function * put (key, value, options = {}) {
    const res = await api.post('dht/put', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: key,
        ...options
      }),
      ...(
        await multipartRequest(value, options.headers)
      )
    })

    for await (let message of res.ndjson()) {
      message = toCamel(message)
      message.id = new CID(message.id)
      if (message.responses) {
        message.responses = message.responses.map(({ ID, Addrs }) => ({
          id: ID,
          addrs: (Addrs || []).map(a => multiaddr(a))
        }))
      }
      yield message
    }
  }
})


/***/ }),

/***/ "I2fb":
/*!*******************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-cbor/src/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.util = __webpack_require__(/*! ./util.js */ "zVFY")
exports.resolver = __webpack_require__(/*! ./resolver.js */ "5ARu")
exports.codec = exports.util.codec
exports.defaultHashAlg = exports.util.defaultHashAlg


/***/ }),

/***/ "IrRL":
/*!*****************************************!*\
  !*** ./node_modules/borc/src/tagged.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A CBOR tagged item, where the tag does not have semantics specified at the
 * moment, or those semantics threw an error during parsing. Typically this will
 * be an extension point you're not yet expecting.
 */
class Tagged {
  /**
   * Creates an instance of Tagged.
   *
   * @param {Number} tag - the number of the tag
   * @param {any} value - the value inside the tag
   * @param {Error} err - the error that was thrown parsing the tag, or null
   */
  constructor (tag, value, err) {
    this.tag = tag
    this.value = value
    this.err = err
    if (typeof this.tag !== 'number') {
      throw new Error('Invalid tag type (' + (typeof this.tag) + ')')
    }
    if ((this.tag < 0) || ((this.tag | 0) !== this.tag)) {
      throw new Error('Tag must be a positive integer: ' + this.tag)
    }
  }

  /**
   * Convert to a String
   *
   * @returns {String} string of the form '1(2)'
   */
  toString () {
    return `${this.tag}(${JSON.stringify(this.value)})`
  }

  /**
   * Push the simple value onto the CBOR stream
   *
   * @param {cbor.Encoder} gen The generator to push onto
   * @returns {number}
   */
  encodeCBOR (gen) {
    gen._pushTag(this.tag)
    return gen.pushAny(this.value)
  }

  /**
   * If we have a converter for this type, do the conversion.  Some converters
   * are built-in.  Additional ones can be passed in.  If you want to remove
   * a built-in converter, pass a converter in whose value is 'null' instead
   * of a function.
   *
   * @param {Object} converters - keys in the object are a tag number, the value
   *   is a function that takes the decoded CBOR and returns a JavaScript value
   *   of the appropriate type.  Throw an exception in the function on errors.
   * @returns {any} - the converted item
   */
  convert (converters) {
    var er, f
    f = converters != null ? converters[this.tag] : undefined
    if (typeof f !== 'function') {
      f = Tagged['_tag' + this.tag]
      if (typeof f !== 'function') {
        return this
      }
    }
    try {
      return f.call(Tagged, this.value)
    } catch (error) {
      er = error
      this.err = er
      return this
    }
  }
}

module.exports = Tagged


/***/ }),

/***/ "IrvS":
/*!**********************************************************************************!*\
  !*** ./node_modules/ipld-raw/node_modules/multihashing-async/src/sha.browser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable require-await */


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const multihash = __webpack_require__(/*! multihashes */ "yP9g")

const crypto = self.crypto || self.msCrypto

const digest = async (data, alg) => {
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context'
    )
  }
  switch (alg) {
    case 'sha1':
      return Buffer.from(await crypto.subtle.digest({ name: 'SHA-1' }, data))
    case 'sha2-256':
      return Buffer.from(await crypto.subtle.digest({ name: 'SHA-256' }, data))
    case 'sha2-512':
      return Buffer.from(await crypto.subtle.digest({ name: 'SHA-512' }, data))
    case 'dbl-sha2-256': {
      const d = await crypto.subtle.digest({ name: 'SHA-256' }, data)
      return Buffer.from(await crypto.subtle.digest({ name: 'SHA-256' }, d))
    }
    default:
      throw new Error(`${alg} is not a supported algorithm`)
  }
}

module.exports = {
  factory: (alg) => async (data) => {
    return digest(data, alg)
  },
  digest,
  multihashing: async (buf, alg, length) => {
    const h = await digest(buf, alg, length)
    return multihash.encode(h, alg, length)
  }
}


/***/ }),

/***/ "JNLs":
/*!*******************************************************************!*\
  !*** ./node_modules/murmurhash3js-revisited/lib/murmurHash3js.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* jshint -W086: true */
// +----------------------------------------------------------------------+
// | murmurHash3js.js v3.0.1 // https://github.com/pid/murmurHash3js
// | A javascript implementation of MurmurHash3's x86 hashing algorithms. |
// |----------------------------------------------------------------------|
// | Copyright (c) 2012-2015 Karan Lyons                                       |
// | https://github.com/karanlyons/murmurHash3.js/blob/c1778f75792abef7bdd74bc85d2d4e1a3d25cfe9/murmurHash3.js |
// | Freely distributable under the MIT license.                          |
// +----------------------------------------------------------------------+

;(function (root, undefined) {
    'use strict';

    // Create a local object that'll be exported or referenced globally.
    var library = {
        'version': '3.0.0',
        'x86': {},
        'x64': {},
        'inputValidation': true
    };

    // PRIVATE FUNCTIONS
    // -----------------

    function _validBytes(bytes) {
        // check the input is an array or a typed array
        if (!Array.isArray(bytes) && !ArrayBuffer.isView(bytes)) {
            return false;
        }

        // check all bytes are actually bytes
        for (var i = 0; i < bytes.length; i++) {
            if (!Number.isInteger(bytes[i]) || bytes[i] < 0 || bytes[i] > 255) {
                return false;
            }
        }
        return true;
    }

    function _x86Multiply(m, n) {
        //
        // Given two 32bit ints, returns the two multiplied together as a
        // 32bit int.
        //

        return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
    }

    function _x86Rotl(m, n) {
        //
        // Given a 32bit int and an int representing a number of bit positions,
        // returns the 32bit int rotated left by that number of positions.
        //

        return (m << n) | (m >>> (32 - n));
    }

    function _x86Fmix(h) {
        //
        // Given a block, returns murmurHash3's final x86 mix of that block.
        //

        h ^= h >>> 16;
        h = _x86Multiply(h, 0x85ebca6b);
        h ^= h >>> 13;
        h = _x86Multiply(h, 0xc2b2ae35);
        h ^= h >>> 16;

        return h;
    }

    function _x64Add(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // added together as a 64bit int (as an array of two 32bit ints).
        //

        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];

        o[3] += m[3] + n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;

        o[2] += m[2] + n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[1] += m[1] + n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[0] += m[0] + n[0];
        o[0] &= 0xffff;

        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }

    function _x64Multiply(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // multiplied together as a 64bit int (as an array of two 32bit ints).
        //

        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];

        o[3] += m[3] * n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;

        o[2] += m[2] * n[3];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[2] += m[3] * n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[1] += m[1] * n[3];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[1] += m[2] * n[2];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[1] += m[3] * n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
        o[0] &= 0xffff;

        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }

    function _x64Rotl(m, n) {
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) rotated left by that number of positions.
        //

        n %= 64;

        if (n === 32) {
            return [m[1], m[0]];
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
        } else {
            n -= 32;
            return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
        }
    }

    function _x64LeftShift(m, n) {
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) shifted left by that number of positions.
        //

        n %= 64;

        if (n === 0) {
            return m;
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
        } else {
            return [m[1] << (n - 32), 0];
        }
    }

    function _x64Xor(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // xored together as a 64bit int (as an array of two 32bit ints).
        //

        return [m[0] ^ n[0], m[1] ^ n[1]];
    }

    function _x64Fmix(h) {
        //
        // Given a block, returns murmurHash3's final x64 mix of that block.
        // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
        // only place where we need to right shift 64bit ints.)
        //

        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [0xff51afd7, 0xed558ccd]);
        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
        h = _x64Xor(h, [0, h[0] >>> 1]);

        return h;
    }

    // PUBLIC FUNCTIONS
    // ----------------

    library.x86.hash32 = function (bytes, seed) {
        //
        // Given a string and an optional seed as an int, returns a 32 bit hash
        // using the x86 flavor of MurmurHash3, as an unsigned int.
        //
        if (library.inputValidation && !_validBytes(bytes)) {
            return undefined;
        }
        seed = seed || 0;

        var remainder = bytes.length % 4;
        var blocks = bytes.length - remainder;

        var h1 = seed;

        var k1 = 0;

        var c1 = 0xcc9e2d51;
        var c2 = 0x1b873593;

        for (var i = 0; i < blocks; i = i + 4) {
            k1 = (bytes[i]) | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);

            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);

            h1 ^= k1;
            h1 = _x86Rotl(h1, 13);
            h1 = _x86Multiply(h1, 5) + 0xe6546b64;
        }

        k1 = 0;

        switch (remainder) {
            case 3:
                k1 ^= bytes[i + 2] << 16;

            case 2:
                k1 ^= bytes[i + 1] << 8;

            case 1:
                k1 ^= bytes[i];
                k1 = _x86Multiply(k1, c1);
                k1 = _x86Rotl(k1, 15);
                k1 = _x86Multiply(k1, c2);
                h1 ^= k1;
        }

        h1 ^= bytes.length;
        h1 = _x86Fmix(h1);

        return h1 >>> 0;
    };

    library.x86.hash128 = function (bytes, seed) {
        //
        // Given a string and an optional seed as an int, returns a 128 bit
        // hash using the x86 flavor of MurmurHash3, as an unsigned hex.
        //
        if (library.inputValidation && !_validBytes(bytes)) {
            return undefined;
        }

        seed = seed || 0;
        var remainder = bytes.length % 16;
        var blocks = bytes.length - remainder;

        var h1 = seed;
        var h2 = seed;
        var h3 = seed;
        var h4 = seed;

        var k1 = 0;
        var k2 = 0;
        var k3 = 0;
        var k4 = 0;

        var c1 = 0x239b961b;
        var c2 = 0xab0e9789;
        var c3 = 0x38b34ae5;
        var c4 = 0xa1e38b93;

        for (var i = 0; i < blocks; i = i + 16) {
            k1 = (bytes[i]) | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);
            k2 = (bytes[i + 4]) | (bytes[i + 5] << 8) | (bytes[i + 6] << 16) | (bytes[i + 7] << 24);
            k3 = (bytes[i + 8]) | (bytes[i + 9] << 8) | (bytes[i + 10] << 16) | (bytes[i + 11] << 24);
            k4 = (bytes[i + 12]) | (bytes[i + 13] << 8) | (bytes[i + 14] << 16) | (bytes[i + 15] << 24);

            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);
            h1 ^= k1;

            h1 = _x86Rotl(h1, 19);
            h1 += h2;
            h1 = _x86Multiply(h1, 5) + 0x561ccd1b;

            k2 = _x86Multiply(k2, c2);
            k2 = _x86Rotl(k2, 16);
            k2 = _x86Multiply(k2, c3);
            h2 ^= k2;

            h2 = _x86Rotl(h2, 17);
            h2 += h3;
            h2 = _x86Multiply(h2, 5) + 0x0bcaa747;

            k3 = _x86Multiply(k3, c3);
            k3 = _x86Rotl(k3, 17);
            k3 = _x86Multiply(k3, c4);
            h3 ^= k3;

            h3 = _x86Rotl(h3, 15);
            h3 += h4;
            h3 = _x86Multiply(h3, 5) + 0x96cd1c35;

            k4 = _x86Multiply(k4, c4);
            k4 = _x86Rotl(k4, 18);
            k4 = _x86Multiply(k4, c1);
            h4 ^= k4;

            h4 = _x86Rotl(h4, 13);
            h4 += h1;
            h4 = _x86Multiply(h4, 5) + 0x32ac3b17;
        }

        k1 = 0;
        k2 = 0;
        k3 = 0;
        k4 = 0;

        switch (remainder) {
            case 15:
                k4 ^= bytes[i + 14] << 16;

            case 14:
                k4 ^= bytes[i + 13] << 8;

            case 13:
                k4 ^= bytes[i + 12];
                k4 = _x86Multiply(k4, c4);
                k4 = _x86Rotl(k4, 18);
                k4 = _x86Multiply(k4, c1);
                h4 ^= k4;

            case 12:
                k3 ^= bytes[i + 11] << 24;

            case 11:
                k3 ^= bytes[i + 10] << 16;

            case 10:
                k3 ^= bytes[i + 9] << 8;

            case 9:
                k3 ^= bytes[i + 8];
                k3 = _x86Multiply(k3, c3);
                k3 = _x86Rotl(k3, 17);
                k3 = _x86Multiply(k3, c4);
                h3 ^= k3;

            case 8:
                k2 ^= bytes[i + 7] << 24;

            case 7:
                k2 ^= bytes[i + 6] << 16;

            case 6:
                k2 ^= bytes[i + 5] << 8;

            case 5:
                k2 ^= bytes[i + 4];
                k2 = _x86Multiply(k2, c2);
                k2 = _x86Rotl(k2, 16);
                k2 = _x86Multiply(k2, c3);
                h2 ^= k2;

            case 4:
                k1 ^= bytes[i + 3] << 24;

            case 3:
                k1 ^= bytes[i + 2] << 16;

            case 2:
                k1 ^= bytes[i + 1] << 8;

            case 1:
                k1 ^= bytes[i];
                k1 = _x86Multiply(k1, c1);
                k1 = _x86Rotl(k1, 15);
                k1 = _x86Multiply(k1, c2);
                h1 ^= k1;
        }

        h1 ^= bytes.length;
        h2 ^= bytes.length;
        h3 ^= bytes.length;
        h4 ^= bytes.length;

        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;

        h1 = _x86Fmix(h1);
        h2 = _x86Fmix(h2);
        h3 = _x86Fmix(h3);
        h4 = _x86Fmix(h4);

        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;

        return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
    };

    library.x64.hash128 = function (bytes, seed) {
        //
        // Given a string and an optional seed as an int, returns a 128 bit
        // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
        //
        if (library.inputValidation && !_validBytes(bytes)) {
            return undefined;
        }
        seed = seed || 0;

        var remainder = bytes.length % 16;
        var blocks = bytes.length - remainder;

        var h1 = [0, seed];
        var h2 = [0, seed];

        var k1 = [0, 0];
        var k2 = [0, 0];

        var c1 = [0x87c37b91, 0x114253d5];
        var c2 = [0x4cf5ad43, 0x2745937f];

        for (var i = 0; i < blocks; i = i + 16) {
            k1 = [(bytes[i + 4]) | (bytes[i + 5] << 8) | (bytes[i + 6] << 16) | (bytes[i + 7] << 24), (bytes[i]) |
                (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24)];
            k2 = [(bytes[i + 12]) | (bytes[i + 13] << 8) | (bytes[i + 14] << 16) | (bytes[i + 15] << 24), (bytes[i + 8]) |
                (bytes[i + 9] << 8) | (bytes[i + 10] << 16) | (bytes[i + 11] << 24)];

            k1 = _x64Multiply(k1, c1);
            k1 = _x64Rotl(k1, 31);
            k1 = _x64Multiply(k1, c2);
            h1 = _x64Xor(h1, k1);

            h1 = _x64Rotl(h1, 27);
            h1 = _x64Add(h1, h2);
            h1 = _x64Add(_x64Multiply(h1, [0, 5]), [0, 0x52dce729]);

            k2 = _x64Multiply(k2, c2);
            k2 = _x64Rotl(k2, 33);
            k2 = _x64Multiply(k2, c1);
            h2 = _x64Xor(h2, k2);

            h2 = _x64Rotl(h2, 31);
            h2 = _x64Add(h2, h1);
            h2 = _x64Add(_x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
        }

        k1 = [0, 0];
        k2 = [0, 0];

        switch (remainder) {
            case 15:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 14]], 48));

            case 14:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 13]], 40));

            case 13:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 12]], 32));

            case 12:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 11]], 24));

            case 11:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 10]], 16));

            case 10:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 9]], 8));

            case 9:
                k2 = _x64Xor(k2, [0, bytes[i + 8]]);
                k2 = _x64Multiply(k2, c2);
                k2 = _x64Rotl(k2, 33);
                k2 = _x64Multiply(k2, c1);
                h2 = _x64Xor(h2, k2);

            case 8:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 7]], 56));

            case 7:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 6]], 48));

            case 6:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 5]], 40));

            case 5:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 4]], 32));

            case 4:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 3]], 24));

            case 3:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 2]], 16));

            case 2:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 1]], 8));

            case 1:
                k1 = _x64Xor(k1, [0, bytes[i]]);
                k1 = _x64Multiply(k1, c1);
                k1 = _x64Rotl(k1, 31);
                k1 = _x64Multiply(k1, c2);
                h1 = _x64Xor(h1, k1);
        }

        h1 = _x64Xor(h1, [0, bytes.length]);
        h2 = _x64Xor(h2, [0, bytes.length]);

        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);

        h1 = _x64Fmix(h1);
        h2 = _x64Fmix(h2);

        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);

        return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
    };

    // INITIALIZATION
    // --------------

    // Export murmurHash3 for CommonJS, either as an AMD module or just as part
    // of the global object.
    if (true) {

        if ( true && module.exports) {
            exports = module.exports = library;
        }

        exports.murmurHash3 = library;

    } else {}
})(this);


/***/ }),

/***/ "JUCO":
/*!*********************************************!*\
  !*** ./node_modules/stream-to-it/source.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = readable => {
  // Node.js stream
  if (readable[Symbol.asyncIterator]) return readable

  // Browser ReadableStream
  if (readable.getReader) {
    return (async function * () {
      const reader = readable.getReader()

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) return
          yield value
        }
      } finally {
        reader.releaseLock()
      }
    })()
  }

  throw new Error('unknown stream')
}


/***/ }),

/***/ "JX3q":
/*!*****************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/mode-to-string.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (mode) => {
  if (mode === undefined || mode === null) {
    return undefined
  }

  if (typeof mode === 'string' || mode instanceof String) {
    return mode
  }

  return mode.toString(8).padStart(4, '0')
}


/***/ }),

/***/ "Ju59":
/*!********************************************************************************!*\
  !*** ./node_modules/ipfs-core-utils/node_modules/ipfs-utils/src/globalthis.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable no-undef */
/* eslint-disable no-extend-native */
/* eslint-disable strict */

// polyfill for globalThis
// https://v8.dev/features/globalthis
// https://mathiasbynens.be/notes/globalthis
(function () {
  if (typeof globalThis === 'object') return
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function () {
      return this
    },
    configurable: true
  })
  __magic__.globalThis = __magic__
  delete Object.prototype.__magic__
}())

module.exports = globalThis


/***/ }),

/***/ "Jx8+":
/*!***************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/name/pubsub/subs.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('name/pubsub/subs', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    const data = await res.json()

    return data.Strings || []
  }
})


/***/ }),

/***/ "Jzoq":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-utils/src/http/fetch.browser.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-env browser */

const { TimeoutError, AbortError } = __webpack_require__(/*! ./error */ "0qpk")

/**
 * @typedef {RequestInit & ExtraFetchOptions} FetchOptions
 * @typedef {Object} ExtraFetchOptions
 * @property {number} [timeout]
 * @property {URLSearchParams} [searchParams]
 * @property {function({total:number, loaded:number, lengthComputable:boolean}):void} [onUploadProgress]
 * @property {function({total:number, loaded:number, lengthComputable:boolean}):void} [onDownloadProgress]
 * @property {string} [overrideMimeType]
 * @returns {Promise<Response>}
 */

/**
 * @param {string|URL} url
 * @param {FetchOptions} [options]
 * @returns {Promise<Response>}
 */
const fetch = (url, options = {}) => {
  const request = new XMLHttpRequest()
  request.open(options.method || 'GET', url.toString(), true)

  const { timeout } = options
  if (timeout > 0 && timeout < Infinity) {
    request.timeout = options.timeout
  }

  if (options.overrideMimeType != null) {
    request.overrideMimeType(options.overrideMimeType)
  }

  if (options.headers) {
    for (const [name, value] of options.headers.entries()) {
      request.setRequestHeader(name, value)
    }
  }

  if (options.signal) {
    options.signal.onabort = () => request.abort()
  }

  if (options.onDownloadProgress) {
    request.onprogress = options.onDownloadProgress
  }

  if (options.onUploadProgress) {
    request.upload.onprogress = options.onUploadProgress
  }

  return new Promise((resolve, reject) => {
    /**
     * @param {Event} event
     */
    const handleEvent = (event) => {
      switch (event.type) {
        case 'error': {
          resolve(Response.error())
          break
        }
        case 'load': {
          resolve(
            new ResponseWithURL(request.responseURL, request.response, {
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders())
            })
          )
          break
        }
        case 'timeout': {
          reject(new TimeoutError())
          break
        }
        case 'abort': {
          reject(new AbortError())
          break
        }
        default: {
          break
        }
      }
    }
    request.onerror = handleEvent
    request.onload = handleEvent
    request.ontimeout = handleEvent
    request.onabort = handleEvent

    request.send(options.body)
  })
}
exports.fetch = fetch
exports.Request = Request
exports.Headers = Headers

/**
 * @param {string} input
 * @returns {Headers}
 */
const parseHeaders = (input) => {
  const headers = new Headers()
  for (const line of input.trim().split(/[\r\n]+/)) {
    const index = line.indexOf(': ')
    if (index > 0) {
      headers.set(line.slice(0, index), line.slice(index + 1))
    }
  }

  return headers
}

class ResponseWithURL extends Response {
  /**
   * @param {string} url
   * @param {string|Blob|ArrayBufferView|ArrayBuffer|FormData|ReadableStream<Uint8Array>} body
   * @param {ResponseInit} options
   */
  constructor (url, body, options) {
    super(body, options)
    Object.defineProperty(this, 'url', { value: url })
  }
}


/***/ }),

/***/ "K2jH":
/*!*************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/replace.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const multipartRequest = __webpack_require__(/*! ../lib/multipart-request */ "VWqr")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure(api => {
  return async (config, options = {}) => {
    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const res = await api.post('config/replace', {
      timeout: options.timeout,
      signal,
      searchParams: toUrlSearchParams(options),
      ...(
        await multipartRequest(Buffer.from(JSON.stringify(config)), controller, options.headers)
      )
    })

    return res.text()
  }
})


/***/ }),

/***/ "K7+2":
/*!***********************************************************!*\
  !*** ./node_modules/is-ip/node_modules/ip-regex/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const word = '[a-fA-F\\d:]';
const b = options => options && options.includeBoundaries ?
	`(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))` :
	'';

const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';

const v6seg = '[a-fA-F\\d]{1,4}';
const v6 = `
(?:
(?:${v6seg}:){7}(?:${v6seg}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${v4}|(?::${v6seg}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(?::${v6seg}){0,1}:${v4}|(?::${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(?::${v6seg}){0,2}:${v4}|(?::${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(?::${v6seg}){0,3}:${v4}|(?::${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(?::${v6seg}){0,4}:${v4}|(?::${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`.replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

// Pre-compile only the exact regexes because adding a global flag make regexes stateful
const v46Exact = new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
const v4exact = new RegExp(`^${v4}$`);
const v6exact = new RegExp(`^${v6}$`);

const ip = options => options && options.exact ?
	v46Exact :
	new RegExp(`(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(options)})`, 'g');

ip.v4 = options => options && options.exact ? v4exact : new RegExp(`${b(options)}${v4}${b(options)}`, 'g');
ip.v6 = options => options && options.exact ? v6exact : new RegExp(`${b(options)}${v6}${b(options)}`, 'g');

module.exports = ip;


/***/ }),

/***/ "K7js":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/stats/bw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { BigNumber } = __webpack_require__(/*! bignumber.js */ "kB5k")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * bw (options = {}) {
    const res = await api.post('stats/bw', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers,
      transform: (stats) => ({
        totalIn: new BigNumber(stats.TotalIn),
        totalOut: new BigNumber(stats.TotalOut),
        rateIn: new BigNumber(stats.RateIn),
        rateOut: new BigNumber(stats.RateOut)
      })
    })

    yield * res.ndjson()
  }
})


/***/ }),

/***/ "KYSR":
/*!********************************************!*\
  !*** ./node_modules/ipfs-utils/src/env.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
const isElectron = __webpack_require__(/*! is-electron */ "Y6bo")

const IS_ENV_WITH_DOM = typeof window === 'object' && typeof document === 'object' && document.nodeType === 9
const IS_ELECTRON = isElectron()
const IS_BROWSER = IS_ENV_WITH_DOM && !IS_ELECTRON
const IS_ELECTRON_MAIN = IS_ELECTRON && !IS_ENV_WITH_DOM
const IS_ELECTRON_RENDERER = IS_ELECTRON && IS_ENV_WITH_DOM
const IS_NODE =  true && typeof process !== 'undefined' && typeof process.release !== 'undefined' && process.release.name === 'node' && !IS_ELECTRON
// eslint-disable-next-line no-undef
const IS_WEBWORKER = typeof importScripts === 'function' && typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope
const IS_TEST = typeof process !== 'undefined' && typeof process.env !== 'undefined' && "development" === 'test'

module.exports = {
  isTest: IS_TEST,
  isElectron: IS_ELECTRON,
  isElectronMain: IS_ELECTRON_MAIN,
  isElectronRenderer: IS_ELECTRON_RENDERER,
  isNode: IS_NODE,
  /**
   * Detects browser main thread  **NOT** web worker or service worker
   */
  isBrowser: IS_BROWSER,
  isWebWorker: IS_WEBWORKER,
  isEnvWithDom: IS_ENV_WITH_DOM
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! process/browser */ "8oxB")))

/***/ }),

/***/ "LHaF":
/*!************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/getAll.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('config/show', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return data
  }
})


/***/ }),

/***/ "LcfU":
/*!******************************************!*\
  !*** ./node_modules/borc/src/encoder.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const { URL } = __webpack_require__(/*! iso-url */ "Fq86")
const Bignumber = __webpack_require__(/*! bignumber.js */ "kB5k").BigNumber

const utils = __webpack_require__(/*! ./utils */ "XuWj")
const constants = __webpack_require__(/*! ./constants */ "hb4V")
const MT = constants.MT
const NUMBYTES = constants.NUMBYTES
const SHIFT32 = constants.SHIFT32
const SYMS = constants.SYMS
const TAG = constants.TAG
const HALF = (constants.MT.SIMPLE_FLOAT << 5) | constants.NUMBYTES.TWO
const FLOAT = (constants.MT.SIMPLE_FLOAT << 5) | constants.NUMBYTES.FOUR
const DOUBLE = (constants.MT.SIMPLE_FLOAT << 5) | constants.NUMBYTES.EIGHT
const TRUE = (constants.MT.SIMPLE_FLOAT << 5) | constants.SIMPLE.TRUE
const FALSE = (constants.MT.SIMPLE_FLOAT << 5) | constants.SIMPLE.FALSE
const UNDEFINED = (constants.MT.SIMPLE_FLOAT << 5) | constants.SIMPLE.UNDEFINED
const NULL = (constants.MT.SIMPLE_FLOAT << 5) | constants.SIMPLE.NULL

const MAXINT_BN = new Bignumber('0x20000000000000')
const BUF_NAN = Buffer.from('f97e00', 'hex')
const BUF_INF_NEG = Buffer.from('f9fc00', 'hex')
const BUF_INF_POS = Buffer.from('f97c00', 'hex')

function toType (obj) {
  // [object Type]
  // --------8---1
  return ({}).toString.call(obj).slice(8, -1)
}

/**
 * Transform JavaScript values into CBOR bytes
 *
 */
class Encoder {
  /**
   * @param {Object} [options={}]
   * @param {function(Buffer)} options.stream
   */
  constructor (options) {
    options = options || {}

    this.streaming = typeof options.stream === 'function'
    this.onData = options.stream

    this.semanticTypes = [
      [URL, this._pushUrl],
      [Bignumber, this._pushBigNumber]
    ]

    const addTypes = options.genTypes || []
    const len = addTypes.length
    for (let i = 0; i < len; i++) {
      this.addSemanticType(
        addTypes[i][0],
        addTypes[i][1]
      )
    }

    this._reset()
  }

  addSemanticType (type, fun) {
    const len = this.semanticTypes.length
    for (let i = 0; i < len; i++) {
      const typ = this.semanticTypes[i][0]
      if (typ === type) {
        const old = this.semanticTypes[i][1]
        this.semanticTypes[i][1] = fun
        return old
      }
    }
    this.semanticTypes.push([type, fun])
    return null
  }

  push (val) {
    if (!val) {
      return true
    }

    this.result[this.offset] = val
    this.resultMethod[this.offset] = 0
    this.resultLength[this.offset] = val.length
    this.offset++

    if (this.streaming) {
      this.onData(this.finalize())
    }

    return true
  }

  pushWrite (val, method, len) {
    this.result[this.offset] = val
    this.resultMethod[this.offset] = method
    this.resultLength[this.offset] = len
    this.offset++

    if (this.streaming) {
      this.onData(this.finalize())
    }

    return true
  }

  _pushUInt8 (val) {
    return this.pushWrite(val, 1, 1)
  }

  _pushUInt16BE (val) {
    return this.pushWrite(val, 2, 2)
  }

  _pushUInt32BE (val) {
    return this.pushWrite(val, 3, 4)
  }

  _pushDoubleBE (val) {
    return this.pushWrite(val, 4, 8)
  }

  _pushNaN () {
    return this.push(BUF_NAN)
  }

  _pushInfinity (obj) {
    const half = (obj < 0) ? BUF_INF_NEG : BUF_INF_POS
    return this.push(half)
  }

  _pushFloat (obj) {
    const b2 = Buffer.allocUnsafe(2)

    if (utils.writeHalf(b2, obj)) {
      if (utils.parseHalf(b2) === obj) {
        return this._pushUInt8(HALF) && this.push(b2)
      }
    }

    const b4 = Buffer.allocUnsafe(4)
    b4.writeFloatBE(obj, 0)
    if (b4.readFloatBE(0) === obj) {
      return this._pushUInt8(FLOAT) && this.push(b4)
    }

    return this._pushUInt8(DOUBLE) && this._pushDoubleBE(obj)
  }

  _pushInt (obj, mt, orig) {
    const m = mt << 5
    if (obj < 24) {
      return this._pushUInt8(m | obj)
    }

    if (obj <= 0xff) {
      return this._pushUInt8(m | NUMBYTES.ONE) && this._pushUInt8(obj)
    }

    if (obj <= 0xffff) {
      return this._pushUInt8(m | NUMBYTES.TWO) && this._pushUInt16BE(obj)
    }

    if (obj <= 0xffffffff) {
      return this._pushUInt8(m | NUMBYTES.FOUR) && this._pushUInt32BE(obj)
    }

    if (obj <= Number.MAX_SAFE_INTEGER) {
      return this._pushUInt8(m | NUMBYTES.EIGHT) &&
        this._pushUInt32BE(Math.floor(obj / SHIFT32)) &&
        this._pushUInt32BE(obj % SHIFT32)
    }

    if (mt === MT.NEG_INT) {
      return this._pushFloat(orig)
    }

    return this._pushFloat(obj)
  }

  _pushIntNum (obj) {
    if (obj < 0) {
      return this._pushInt(-obj - 1, MT.NEG_INT, obj)
    } else {
      return this._pushInt(obj, MT.POS_INT)
    }
  }

  _pushNumber (obj) {
    switch (false) {
      case (obj === obj): // eslint-disable-line
        return this._pushNaN(obj)
      case isFinite(obj):
        return this._pushInfinity(obj)
      case ((obj % 1) !== 0):
        return this._pushIntNum(obj)
      default:
        return this._pushFloat(obj)
    }
  }

  _pushString (obj) {
    const len = Buffer.byteLength(obj, 'utf8')
    return this._pushInt(len, MT.UTF8_STRING) && this.pushWrite(obj, 5, len)
  }

  _pushBoolean (obj) {
    return this._pushUInt8(obj ? TRUE : FALSE)
  }

  _pushUndefined (obj) {
    return this._pushUInt8(UNDEFINED)
  }

  _pushArray (gen, obj) {
    const len = obj.length
    if (!gen._pushInt(len, MT.ARRAY)) {
      return false
    }
    for (let j = 0; j < len; j++) {
      if (!gen.pushAny(obj[j])) {
        return false
      }
    }
    return true
  }

  _pushTag (tag) {
    return this._pushInt(tag, MT.TAG)
  }

  _pushDate (gen, obj) {
    // Round date, to get seconds since 1970-01-01 00:00:00 as defined in
    // Sec. 2.4.1 and get a possibly more compact encoding. Note that it is
    // still allowed to encode fractions of seconds which can be achieved by
    // changing overwriting the encode function for Date objects.
    return gen._pushTag(TAG.DATE_EPOCH) && gen.pushAny(Math.round(obj / 1000))
  }

  _pushBuffer (gen, obj) {
    return gen._pushInt(obj.length, MT.BYTE_STRING) && gen.push(obj)
  }

  _pushNoFilter (gen, obj) {
    return gen._pushBuffer(gen, obj.slice())
  }

  _pushRegexp (gen, obj) {
    return gen._pushTag(TAG.REGEXP) && gen.pushAny(obj.source)
  }

  _pushSet (gen, obj) {
    if (!gen._pushInt(obj.size, MT.ARRAY)) {
      return false
    }
    for (const x of obj) {
      if (!gen.pushAny(x)) {
        return false
      }
    }
    return true
  }

  _pushUrl (gen, obj) {
    return gen._pushTag(TAG.URI) && gen.pushAny(obj.format())
  }

  _pushBigint (obj) {
    let tag = TAG.POS_BIGINT
    if (obj.isNegative()) {
      obj = obj.negated().minus(1)
      tag = TAG.NEG_BIGINT
    }
    let str = obj.toString(16)
    if (str.length % 2) {
      str = '0' + str
    }
    const buf = Buffer.from(str, 'hex')
    return this._pushTag(tag) && this._pushBuffer(this, buf)
  }

  _pushBigNumber (gen, obj) {
    if (obj.isNaN()) {
      return gen._pushNaN()
    }
    if (!obj.isFinite()) {
      return gen._pushInfinity(obj.isNegative() ? -Infinity : Infinity)
    }
    if (obj.isInteger()) {
      return gen._pushBigint(obj)
    }
    if (!(gen._pushTag(TAG.DECIMAL_FRAC) &&
      gen._pushInt(2, MT.ARRAY))) {
      return false
    }

    const dec = obj.decimalPlaces()
    const slide = obj.multipliedBy(new Bignumber(10).pow(dec))
    if (!gen._pushIntNum(-dec)) {
      return false
    }
    if (slide.abs().isLessThan(MAXINT_BN)) {
      return gen._pushIntNum(slide.toNumber())
    } else {
      return gen._pushBigint(slide)
    }
  }

  _pushMap (gen, obj) {
    if (!gen._pushInt(obj.size, MT.MAP)) {
      return false
    }

    return this._pushRawMap(
      obj.size,
      Array.from(obj)
    )
  }

  _pushObject (obj) {
    if (!obj) {
      return this._pushUInt8(NULL)
    }

    var len = this.semanticTypes.length
    for (var i = 0; i < len; i++) {
      if (obj instanceof this.semanticTypes[i][0]) {
        return this.semanticTypes[i][1].call(obj, this, obj)
      }
    }

    var f = obj.encodeCBOR
    if (typeof f === 'function') {
      return f.call(obj, this)
    }

    var keys = Object.keys(obj)
    var keyLength = keys.length
    if (!this._pushInt(keyLength, MT.MAP)) {
      return false
    }

    return this._pushRawMap(
      keyLength,
      keys.map((k) => [k, obj[k]])
    )
  }

  _pushRawMap (len, map) {
    // Sort keys for canoncialization
    // 1. encode key
    // 2. shorter key comes before longer key
    // 3. same length keys are sorted with lower
    //    byte value before higher

    map = map.map(function (a) {
      a[0] = Encoder.encode(a[0])
      return a
    }).sort(utils.keySorter)

    for (var j = 0; j < len; j++) {
      if (!this.push(map[j][0])) {
        return false
      }

      if (!this.pushAny(map[j][1])) {
        return false
      }
    }

    return true
  }

  /**
   * Alias for `.pushAny`
   *
   * @param {*} obj
   * @returns {boolean} true on success
   */
  write (obj) {
    return this.pushAny(obj)
  }

  /**
   * Push any supported type onto the encoded stream
   *
   * @param {any} obj
   * @returns {boolean} true on success
   */
  pushAny (obj) {
    var typ = toType(obj)

    switch (typ) {
      case 'Number':
        return this._pushNumber(obj)
      case 'String':
        return this._pushString(obj)
      case 'Boolean':
        return this._pushBoolean(obj)
      case 'Object':
        return this._pushObject(obj)
      case 'Array':
        return this._pushArray(this, obj)
      case 'Uint8Array':
        return this._pushBuffer(this, Buffer.isBuffer(obj) ? obj : Buffer.from(obj))
      case 'Null':
        return this._pushUInt8(NULL)
      case 'Undefined':
        return this._pushUndefined(obj)
      case 'Map':
        return this._pushMap(this, obj)
      case 'Set':
        return this._pushSet(this, obj)
      case 'URL':
        return this._pushUrl(this, obj)
      case 'BigNumber':
        return this._pushBigNumber(this, obj)
      case 'Date':
        return this._pushDate(this, obj)
      case 'RegExp':
        return this._pushRegexp(this, obj)
      case 'Symbol':
        switch (obj) {
          case SYMS.NULL:
            return this._pushObject(null)
          case SYMS.UNDEFINED:
            return this._pushUndefined(undefined)
          // TODO: Add pluggable support for other symbols
          default:
            throw new Error('Unknown symbol: ' + obj.toString())
        }
      default:
        throw new Error('Unknown type: ' + typeof obj + ', ' + (obj ? obj.toString() : ''))
    }
  }

  finalize () {
    if (this.offset === 0) {
      return null
    }

    var result = this.result
    var resultLength = this.resultLength
    var resultMethod = this.resultMethod
    var offset = this.offset

    // Determine the size of the buffer
    var size = 0
    var i = 0

    for (; i < offset; i++) {
      size += resultLength[i]
    }

    var res = Buffer.allocUnsafe(size)
    var index = 0
    var length = 0

    // Write the content into the result buffer
    for (i = 0; i < offset; i++) {
      length = resultLength[i]

      switch (resultMethod[i]) {
        case 0:
          result[i].copy(res, index)
          break
        case 1:
          res.writeUInt8(result[i], index, true)
          break
        case 2:
          res.writeUInt16BE(result[i], index, true)
          break
        case 3:
          res.writeUInt32BE(result[i], index, true)
          break
        case 4:
          res.writeDoubleBE(result[i], index, true)
          break
        case 5:
          res.write(result[i], index, length, 'utf8')
          break
        default:
          throw new Error('unkown method')
      }

      index += length
    }

    var tmp = res

    this._reset()

    return tmp
  }

  _reset () {
    this.result = []
    this.resultMethod = []
    this.resultLength = []
    this.offset = 0
  }

  /**
   * Encode the given value
   * @param {*} o
   * @returns {Buffer}
   */
  static encode (o) {
    const enc = new Encoder()
    const ret = enc.pushAny(o)
    if (!ret) {
      throw new Error('Failed to encode input')
    }

    return enc.finalize()
  }
}

module.exports = Encoder


/***/ }),

/***/ "LwYs":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  data: __webpack_require__(/*! ./data */ "Dbhl")(config),
  get: __webpack_require__(/*! ./get */ "wN3e")(config),
  links: __webpack_require__(/*! ./links */ "Tv+W")(config),
  new: __webpack_require__(/*! ./new */ "zDE9")(config),
  patch: __webpack_require__(/*! ./patch */ "yMIr")(config),
  put: __webpack_require__(/*! ./put */ "HLqp")(config),
  stat: __webpack_require__(/*! ./stat */ "NMoP")(config)
})


/***/ }),

/***/ "MSQn":
/*!**************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/get.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Tar = __webpack_require__(/*! it-tar */ "TOie")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * get (path, options = {}) {
    const res = await api.post('get', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(path) ? new CID(path) : path}`,
        ...options
      }),
      headers: options.headers
    })

    const extractor = Tar.extract()

    for await (const { header, body } of extractor(res.iterator())) {
      if (header.type === 'directory') {
        yield {
          path: header.name
        }
      } else {
        yield {
          path: header.name,
          content: body
        }
      }
    }
  }
})


/***/ }),

/***/ "MVac":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/block/rm.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * rm (cid, options = {}) {
    if (!Array.isArray(cid)) {
      cid = [cid]
    }

    const res = await api.post('block/rm', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cid.map(cid => new CID(cid).toString()),
        'stream-channels': true,
        ...options
      }),
      headers: options.headers
    })

    for await (const removed of res.ndjson()) {
      yield toCoreInterface(removed)
    }
  }
})

function toCoreInterface (removed) {
  const out = {
    cid: new CID(removed.Hash)
  }

  if (removed.Error) {
    out.error = new Error(removed.Error)
  }

  return out
}


/***/ }),

/***/ "MZMc":
/*!*****************************************!*\
  !*** ./node_modules/blakejs/blake2s.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// BLAKE2s hash function in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch

var util = __webpack_require__(/*! ./util */ "gyeY")

// Little-endian byte access.
// Expects a Uint8Array and an index
// Returns the little-endian uint32 at v[i..i+3]
function B2S_GET32 (v, i) {
  return v[i] ^ (v[i + 1] << 8) ^ (v[i + 2] << 16) ^ (v[i + 3] << 24)
}

// Mixing function G.
function B2S_G (a, b, c, d, x, y) {
  v[a] = v[a] + v[b] + x
  v[d] = ROTR32(v[d] ^ v[a], 16)
  v[c] = v[c] + v[d]
  v[b] = ROTR32(v[b] ^ v[c], 12)
  v[a] = v[a] + v[b] + y
  v[d] = ROTR32(v[d] ^ v[a], 8)
  v[c] = v[c] + v[d]
  v[b] = ROTR32(v[b] ^ v[c], 7)
}

// 32-bit right rotation
// x should be a uint32
// y must be between 1 and 31, inclusive
function ROTR32 (x, y) {
  return (x >>> y) ^ (x << (32 - y))
}

// Initialization Vector.
var BLAKE2S_IV = new Uint32Array([
  0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
  0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19])

var SIGMA = new Uint8Array([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0])

// Compression function. "last" flag indicates last block
var v = new Uint32Array(16)
var m = new Uint32Array(16)
function blake2sCompress (ctx, last) {
  var i = 0
  for (i = 0; i < 8; i++) { // init work variables
    v[i] = ctx.h[i]
    v[i + 8] = BLAKE2S_IV[i]
  }

  v[12] ^= ctx.t // low 32 bits of offset
  v[13] ^= (ctx.t / 0x100000000) // high 32 bits
  if (last) { // last block flag set ?
    v[14] = ~v[14]
  }

  for (i = 0; i < 16; i++) { // get little-endian words
    m[i] = B2S_GET32(ctx.b, 4 * i)
  }

  // ten rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 32)
  for (i = 0; i < 10; i++) {
    // util.debugPrint('   (i=' + i + ')  v[16]', v, 32)
    B2S_G(0, 4, 8, 12, m[SIGMA[i * 16 + 0]], m[SIGMA[i * 16 + 1]])
    B2S_G(1, 5, 9, 13, m[SIGMA[i * 16 + 2]], m[SIGMA[i * 16 + 3]])
    B2S_G(2, 6, 10, 14, m[SIGMA[i * 16 + 4]], m[SIGMA[i * 16 + 5]])
    B2S_G(3, 7, 11, 15, m[SIGMA[i * 16 + 6]], m[SIGMA[i * 16 + 7]])
    B2S_G(0, 5, 10, 15, m[SIGMA[i * 16 + 8]], m[SIGMA[i * 16 + 9]])
    B2S_G(1, 6, 11, 12, m[SIGMA[i * 16 + 10]], m[SIGMA[i * 16 + 11]])
    B2S_G(2, 7, 8, 13, m[SIGMA[i * 16 + 12]], m[SIGMA[i * 16 + 13]])
    B2S_G(3, 4, 9, 14, m[SIGMA[i * 16 + 14]], m[SIGMA[i * 16 + 15]])
  }
  // util.debugPrint('   (i=10) v[16]', v, 32)

  for (i = 0; i < 8; i++) {
    ctx.h[i] ^= v[i] ^ v[i + 8]
  }
  // util.debugPrint('h[8]', ctx.h, 32)
}

// Creates a BLAKE2s hashing context
// Requires an output length between 1 and 32 bytes
// Takes an optional Uint8Array key
function blake2sInit (outlen, key) {
  if (!(outlen > 0 && outlen <= 32)) {
    throw new Error('Incorrect output length, should be in [1, 32]')
  }
  var keylen = key ? key.length : 0
  if (key && !(keylen > 0 && keylen <= 32)) {
    throw new Error('Incorrect key length, should be in [1, 32]')
  }

  var ctx = {
    h: new Uint32Array(BLAKE2S_IV), // hash state
    b: new Uint32Array(64), // input block
    c: 0, // pointer within block
    t: 0, // input count
    outlen: outlen // output length in bytes
  }
  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen

  if (keylen > 0) {
    blake2sUpdate(ctx, key)
    ctx.c = 64 // at the end
  }

  return ctx
}

// Updates a BLAKE2s streaming hash
// Requires hash context and Uint8Array (byte array)
function blake2sUpdate (ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 64) { // buffer full ?
      ctx.t += ctx.c // add counters
      blake2sCompress(ctx, false) // compress (not last)
      ctx.c = 0 // counter to zero
    }
    ctx.b[ctx.c++] = input[i]
  }
}

// Completes a BLAKE2s streaming hash
// Returns a Uint8Array containing the message digest
function blake2sFinal (ctx) {
  ctx.t += ctx.c // mark last block offset
  while (ctx.c < 64) { // fill up with zeros
    ctx.b[ctx.c++] = 0
  }
  blake2sCompress(ctx, true) // final block flag = 1

  // little endian convert and store
  var out = new Uint8Array(ctx.outlen)
  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = (ctx.h[i >> 2] >> (8 * (i & 3))) & 0xFF
  }
  return out
}

// Computes the BLAKE2S hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64
function blake2s (input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 32
  input = util.normalizeInput(input)

  // do the math
  var ctx = blake2sInit(outlen, key)
  blake2sUpdate(ctx, input)
  return blake2sFinal(ctx)
}

// Computes the BLAKE2S hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64
function blake2sHex (input, key, outlen) {
  var output = blake2s(input, key, outlen)
  return util.toHex(output)
}

module.exports = {
  blake2s: blake2s,
  blake2sHex: blake2sHex,
  blake2sInit: blake2sInit,
  blake2sUpdate: blake2sUpdate,
  blake2sFinal: blake2sFinal
}


/***/ }),

/***/ "Mz1a":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/log/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  tail: __webpack_require__(/*! ./tail */ "QtIJ")(config),
  ls: __webpack_require__(/*! ./ls */ "dKtH")(config),
  level: __webpack_require__(/*! ./level */ "O/Lq")(config)
})


/***/ }),

/***/ "NGSY":
/*!***************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/swarm/localAddrs.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('swarm/addrs/local', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    const { Strings } = await res.json()

    return (Strings || []).map(a => multiaddr(a))
  }
})


/***/ }),

/***/ "NMoP":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/stat.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, options = {}) => {
    const res = await api.post('object/stat', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`,
        ...options
      }),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "NOtv":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "3JDX")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! process/browser */ "8oxB")))

/***/ }),

/***/ "O/Lq":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/log/level.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (subsystem, level, options = {}) => {
    const res = await api.post('log/level', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          subsystem,
          level
        ],
        ...options
      }),
      headers: options.headers
    })

    return toCamel(await res.json())
  }
})


/***/ }),

/***/ "O9UC":
/*!*****************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pubsub/unsubscribe.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const SubscriptionTracker = __webpack_require__(/*! ./subscription-tracker */ "eue8")

module.exports = api => {
  const subsTracker = SubscriptionTracker.singleton()
  // eslint-disable-next-line require-await
  return async (topic, handler) => subsTracker.unsubscribe(topic, handler)
}


/***/ }),

/***/ "OtBE":
/*!*************************************************************************!*\
  !*** ./src/app/components/mint-card-form/mint-card-form.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtaW50LWNhcmQtZm9ybS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "Oud2":
/*!********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/patch/add-link.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, dLink, options = {}) => {
    const res = await api.post('object/patch/add-link', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`,
          dLink.Name || dLink.name || '',
          (dLink.Hash || dLink.cid || '').toString() || null
        ],
        ...options
      }),
      headers: options.headers
    })

    const { Hash } = await res.json()

    return new CID(Hash)
  }
})


/***/ }),

/***/ "PLmP":
/*!***********************************************!*\
  !*** ./node_modules/parse-duration/index.mjs ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parse; });
let duration = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([a-zµμ]*)/ig


/**
 * conversion ratios
 */

parse.nanosecond =
parse.ns = 1 / 1e6

parse['µs'] =
parse['μs'] =
parse.us =
parse.microsecond = 1 / 1e3

parse.millisecond =
parse.ms = 1

parse.second =
parse.sec =
parse.s = parse.ms * 1000

parse.minute =
parse.min =
parse.m = parse.s * 60

parse.hour =
parse.hr =
parse.h = parse.m * 60

parse.day =
parse.d = parse.h * 24

parse.week =
parse.wk =
parse.w = parse.d * 7

parse.month =
parse.b =
parse.d * (365.25 / 12)

parse.year =
parse.yr =
parse.y = parse.d * 365.25

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */

function parse(str='', format='ms'){
  var result = null
  // ignore commas
  str = str.replace(/(\d),(\d)/g, '$1$2')
  str.replace(duration, function(_, n, units){
    units = parse[units] || parse[units.toLowerCase().replace(/s$/, '')]
    if (units) result = (result || 0) + parseFloat(n, 10) * units
  })

  return result && (result / parse[format])
}


/***/ }),

/***/ "PV6L":
/*!**********************************************!*\
  !*** ./node_modules/iso-url/src/relative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { URLWithLegacySupport, format } = __webpack_require__(/*! ./url */ "HwtC");

module.exports = (url, location = {}, protocolMap = {}, defaultProtocol) => {
    let protocol = location.protocol ?
        location.protocol.replace(':', '') :
        'http';

    // Check protocol map
    protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ':';
    let urlParsed;

    try {
        urlParsed = new URLWithLegacySupport(url);
    } catch (err) {
        urlParsed = {};
    }

    const base = Object.assign({}, location, {
        protocol: protocol || urlParsed.protocol,
        host: location.host || urlParsed.host
    });

    return new URLWithLegacySupport(url, format(base)).toString();
};


/***/ }),

/***/ "Prmx":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/set.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (key, value, options = {}) => {
    if (typeof key !== 'string') {
      throw new Error('Invalid key type')
    }

    const params = {
      arg: [
        key,
        value
      ],
      ...options
    }

    if (typeof value === 'boolean') {
      params.arg[1] = value.toString()
      params.bool = true
    } else if (typeof value !== 'string') {
      params.arg[1] = JSON.stringify(value)
      params.json = true
    }

    const res = await api.post('config', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(params),
      headers: options.headers
    })

    return toCamel(await res.json())
  }
})


/***/ }),

/***/ "Q8Jw":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/key/rename.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (oldName, newName, options = {}) => {
    const res = await api.post('key/rename', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          oldName,
          newName
        ],
        ...options
      }),
      headers: options.headers
    })

    return toCamel(await res.json())
  }
})


/***/ }),

/***/ "QNVV":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pubsub/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  ls: __webpack_require__(/*! ./ls */ "k5gp")(config),
  peers: __webpack_require__(/*! ./peers */ "SRLA")(config),
  publish: __webpack_require__(/*! ./publish */ "6mRj")(config),
  subscribe: __webpack_require__(/*! ./subscribe */ "3c13")(config),
  unsubscribe: __webpack_require__(/*! ./unsubscribe */ "O9UC")(config)
})


/***/ }),

/***/ "QWpB":
/*!*******************************************************!*\
  !*** ./node_modules/murmurhash3js-revisited/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/murmurHash3js */ "JNLs");


/***/ }),

/***/ "QZb+":
/*!***************************************************!*\
  !*** ./node_modules/ipfs-utils/src/globalthis.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable no-undef */
/* eslint-disable no-extend-native */
/* eslint-disable strict */

// polyfill for globalThis
// https://v8.dev/features/globalthis
// https://mathiasbynens.be/notes/globalthis
(function () {
  if (typeof globalThis === 'object') return
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function () {
      return this
    },
    configurable: true
  })
  __magic__.globalThis = __magic__
  delete Object.prototype.__magic__
}())

module.exports = globalThis


/***/ }),

/***/ "QcWL":
/*!**************************************!*\
  !*** ./node_modules/it-all/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Collects all values from an (async) iterable into an array and returns it.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 */
const all = async (source) => {
  const arr = []

  for await (const entry of source) {
    arr.push(entry)
  }

  return arr
}

module.exports = all


/***/ }),

/***/ "Qj6C":
/*!****************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/mount.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ./lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('dns', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    return toCamel(await res.json())
  }
})


/***/ }),

/***/ "QtIJ":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/log/tail.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * tail (options = {}) {
    const res = await api.post('log/tail', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    yield * res.ndjson()
  }
})


/***/ }),

/***/ "Qx5Q":
/*!**************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bootstrap/reset.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('bootstrap/add', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options,
        default: true
      }),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "RJ23":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-utils/src/files/url-source.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Http = __webpack_require__(/*! ../http */ "Zws2")

module.exports = async function * urlSource (url, options) {
  const http = new Http()
  const response = await http.get(url, options)

  yield {
    path: decodeURIComponent(new URL(url).pathname.split('/').pop() || ''),
    content: response.iterator()
  }
}


/***/ }),

/***/ "RRrQ":
/*!***************************************!*\
  !*** ./node_modules/p-defer/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const pDefer = () => {
	const deferred = {};

	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});

	return deferred;
};

module.exports = pDefer;


/***/ }),

/***/ "RfEX":
/*!*****************************************************!*\
  !*** ./src/app/pages/mint-card/mint-card.module.ts ***!
  \*****************************************************/
/*! exports provided: MintCardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MintCardPageModule", function() { return MintCardPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _mint_card_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mint-card-routing.module */ "jLSz");
/* harmony import */ var src_app_components_mint_card_form_mint_card_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/components/mint-card-form/mint-card-form.component */ "qxGA");
/* harmony import */ var _mint_card_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mint-card.page */ "FoBi");








let MintCardPageModule = class MintCardPageModule {
};
MintCardPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _mint_card_routing_module__WEBPACK_IMPORTED_MODULE_5__["MintCardPageRoutingModule"]
        ],
        declarations: [_mint_card_page__WEBPACK_IMPORTED_MODULE_7__["MintCardPage"], src_app_components_mint_card_form_mint_card_form_component__WEBPACK_IMPORTED_MODULE_6__["MintCardFormComponent"]]
    })
], MintCardPageModule);



/***/ }),

/***/ "S/E/":
/*!*******************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/profiles/list.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('config/profile/list', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    const data = await res.json()

    return data.map(profile => toCamel(profile))
  }
})


/***/ }),

/***/ "S/MC":
/*!************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multiaddr/src/ip.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const isIp = __webpack_require__(/*! is-ip */ "4DvY")

const isIP = isIp
const isV4 = isIp.v4
const isV6 = isIp.v6

// Copied from https://github.com/indutny/node-ip/blob/master/lib/ip.js#L7
const toBuffer = function (ip, buff, offset) {
  offset = ~~offset

  var result

  if (isV4(ip)) {
    result = buff || Buffer.alloc(offset + 4)
    ip.split(/\./g).map(function (byte) {
      result[offset++] = parseInt(byte, 10) & 0xff
    })
  } else if (isV6(ip)) {
    var sections = ip.split(':', 8)

    var i
    for (i = 0; i < sections.length; i++) {
      var isv4 = isV4(sections[i])
      var v4Buffer

      if (isv4) {
        v4Buffer = toBuffer(sections[i])
        sections[i] = v4Buffer.slice(0, 2).toString('hex')
      }

      if (v4Buffer && ++i < 8) {
        sections.splice(i, 0, v4Buffer.slice(2, 4).toString('hex'))
      }
    }

    if (sections[0] === '') {
      while (sections.length < 8) sections.unshift('0')
    } else if (sections[sections.length - 1] === '') {
      while (sections.length < 8) sections.push('0')
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ''; i++);
      var argv = [i, '1']
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push('0')
      }
      sections.splice.apply(sections, argv)
    }

    result = buff || Buffer.alloc(offset + 16)
    for (i = 0; i < sections.length; i++) {
      var word = parseInt(sections[i], 16)
      result[offset++] = (word >> 8) & 0xff
      result[offset++] = word & 0xff
    }
  }

  if (!result) {
    throw Error('Invalid ip address: ' + ip)
  }

  return result
}

// Copied from https://github.com/indutny/node-ip/blob/master/lib/ip.js#L63
const toString = function (buff, offset, length) {
  offset = ~~offset
  length = length || (buff.length - offset)

  var result = []
  var string
  if (length === 4) {
    // IPv4
    for (let i = 0; i < length; i++) {
      result.push(buff[offset + i])
    }
    string = result.join('.')
  } else if (length === 16) {
    // IPv6
    for (let i = 0; i < length; i += 2) {
      result.push(buff.readUInt16BE(offset + i).toString(16))
    }
    string = result.join(':')
    string = string.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3')
    string = string.replace(/:{3,4}/, '::')
  }

  return string
}

module.exports = {
  isIP,
  isV4,
  isV6,
  toBuffer,
  toString
}


/***/ }),

/***/ "S2GJ":
/*!*********************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag.proto.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = `// An IPFS MerkleDAG Link
message PBLink {

  // multihash of the target object
  optional bytes Hash = 1;

  // utf string name. should be unique per object
  optional string Name = 2;

  // cumulative size of target object
  optional uint64 Tsize = 3;
}

// An IPFS MerkleDAG Node
message PBNode {

  // refs to other objects
  repeated PBLink Links = 2;

  // opaque user data
  optional bytes Data = 1;
}`


/***/ }),

/***/ "S5LB":
/*!*********************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multihashes/src/constants.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint quote-props: off */


const names = Object.freeze({
  'identity': 0x00,
  'sha1': 0x11,
  'sha2-256': 0x12,
  'sha2-512': 0x13,
  'sha3-512': 0x14,
  'sha3-384': 0x15,
  'sha3-256': 0x16,
  'sha3-224': 0x17,
  'shake-128': 0x18,
  'shake-256': 0x19,
  'keccak-224': 0x1a,
  'keccak-256': 0x1b,
  'keccak-384': 0x1c,
  'keccak-512': 0x1d,
  'blake3': 0x1e,
  'murmur3-128': 0x22,
  'murmur3-32': 0x23,
  'dbl-sha2-256': 0x56,
  'md4': 0xd4,
  'md5': 0xd5,
  'bmt': 0xd6,
  'sha2-256-trunc254-padded': 0x1012,
  'ripemd-128': 0x1052,
  'ripemd-160': 0x1053,
  'ripemd-256': 0x1054,
  'ripemd-320': 0x1055,
  'x11': 0x1100,
  'sm3-256': 0x534d,
  'blake2b-8': 0xb201,
  'blake2b-16': 0xb202,
  'blake2b-24': 0xb203,
  'blake2b-32': 0xb204,
  'blake2b-40': 0xb205,
  'blake2b-48': 0xb206,
  'blake2b-56': 0xb207,
  'blake2b-64': 0xb208,
  'blake2b-72': 0xb209,
  'blake2b-80': 0xb20a,
  'blake2b-88': 0xb20b,
  'blake2b-96': 0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8': 0xb241,
  'blake2s-16': 0xb242,
  'blake2s-24': 0xb243,
  'blake2s-32': 0xb244,
  'blake2s-40': 0xb245,
  'blake2s-48': 0xb246,
  'blake2s-56': 0xb247,
  'blake2s-64': 0xb248,
  'blake2s-72': 0xb249,
  'blake2s-80': 0xb24a,
  'blake2s-88': 0xb24b,
  'blake2s-96': 0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'skein256-8': 0xb301,
  'skein256-16': 0xb302,
  'skein256-24': 0xb303,
  'skein256-32': 0xb304,
  'skein256-40': 0xb305,
  'skein256-48': 0xb306,
  'skein256-56': 0xb307,
  'skein256-64': 0xb308,
  'skein256-72': 0xb309,
  'skein256-80': 0xb30a,
  'skein256-88': 0xb30b,
  'skein256-96': 0xb30c,
  'skein256-104': 0xb30d,
  'skein256-112': 0xb30e,
  'skein256-120': 0xb30f,
  'skein256-128': 0xb310,
  'skein256-136': 0xb311,
  'skein256-144': 0xb312,
  'skein256-152': 0xb313,
  'skein256-160': 0xb314,
  'skein256-168': 0xb315,
  'skein256-176': 0xb316,
  'skein256-184': 0xb317,
  'skein256-192': 0xb318,
  'skein256-200': 0xb319,
  'skein256-208': 0xb31a,
  'skein256-216': 0xb31b,
  'skein256-224': 0xb31c,
  'skein256-232': 0xb31d,
  'skein256-240': 0xb31e,
  'skein256-248': 0xb31f,
  'skein256-256': 0xb320,
  'skein512-8': 0xb321,
  'skein512-16': 0xb322,
  'skein512-24': 0xb323,
  'skein512-32': 0xb324,
  'skein512-40': 0xb325,
  'skein512-48': 0xb326,
  'skein512-56': 0xb327,
  'skein512-64': 0xb328,
  'skein512-72': 0xb329,
  'skein512-80': 0xb32a,
  'skein512-88': 0xb32b,
  'skein512-96': 0xb32c,
  'skein512-104': 0xb32d,
  'skein512-112': 0xb32e,
  'skein512-120': 0xb32f,
  'skein512-128': 0xb330,
  'skein512-136': 0xb331,
  'skein512-144': 0xb332,
  'skein512-152': 0xb333,
  'skein512-160': 0xb334,
  'skein512-168': 0xb335,
  'skein512-176': 0xb336,
  'skein512-184': 0xb337,
  'skein512-192': 0xb338,
  'skein512-200': 0xb339,
  'skein512-208': 0xb33a,
  'skein512-216': 0xb33b,
  'skein512-224': 0xb33c,
  'skein512-232': 0xb33d,
  'skein512-240': 0xb33e,
  'skein512-248': 0xb33f,
  'skein512-256': 0xb340,
  'skein512-264': 0xb341,
  'skein512-272': 0xb342,
  'skein512-280': 0xb343,
  'skein512-288': 0xb344,
  'skein512-296': 0xb345,
  'skein512-304': 0xb346,
  'skein512-312': 0xb347,
  'skein512-320': 0xb348,
  'skein512-328': 0xb349,
  'skein512-336': 0xb34a,
  'skein512-344': 0xb34b,
  'skein512-352': 0xb34c,
  'skein512-360': 0xb34d,
  'skein512-368': 0xb34e,
  'skein512-376': 0xb34f,
  'skein512-384': 0xb350,
  'skein512-392': 0xb351,
  'skein512-400': 0xb352,
  'skein512-408': 0xb353,
  'skein512-416': 0xb354,
  'skein512-424': 0xb355,
  'skein512-432': 0xb356,
  'skein512-440': 0xb357,
  'skein512-448': 0xb358,
  'skein512-456': 0xb359,
  'skein512-464': 0xb35a,
  'skein512-472': 0xb35b,
  'skein512-480': 0xb35c,
  'skein512-488': 0xb35d,
  'skein512-496': 0xb35e,
  'skein512-504': 0xb35f,
  'skein512-512': 0xb360,
  'skein1024-8': 0xb361,
  'skein1024-16': 0xb362,
  'skein1024-24': 0xb363,
  'skein1024-32': 0xb364,
  'skein1024-40': 0xb365,
  'skein1024-48': 0xb366,
  'skein1024-56': 0xb367,
  'skein1024-64': 0xb368,
  'skein1024-72': 0xb369,
  'skein1024-80': 0xb36a,
  'skein1024-88': 0xb36b,
  'skein1024-96': 0xb36c,
  'skein1024-104': 0xb36d,
  'skein1024-112': 0xb36e,
  'skein1024-120': 0xb36f,
  'skein1024-128': 0xb370,
  'skein1024-136': 0xb371,
  'skein1024-144': 0xb372,
  'skein1024-152': 0xb373,
  'skein1024-160': 0xb374,
  'skein1024-168': 0xb375,
  'skein1024-176': 0xb376,
  'skein1024-184': 0xb377,
  'skein1024-192': 0xb378,
  'skein1024-200': 0xb379,
  'skein1024-208': 0xb37a,
  'skein1024-216': 0xb37b,
  'skein1024-224': 0xb37c,
  'skein1024-232': 0xb37d,
  'skein1024-240': 0xb37e,
  'skein1024-248': 0xb37f,
  'skein1024-256': 0xb380,
  'skein1024-264': 0xb381,
  'skein1024-272': 0xb382,
  'skein1024-280': 0xb383,
  'skein1024-288': 0xb384,
  'skein1024-296': 0xb385,
  'skein1024-304': 0xb386,
  'skein1024-312': 0xb387,
  'skein1024-320': 0xb388,
  'skein1024-328': 0xb389,
  'skein1024-336': 0xb38a,
  'skein1024-344': 0xb38b,
  'skein1024-352': 0xb38c,
  'skein1024-360': 0xb38d,
  'skein1024-368': 0xb38e,
  'skein1024-376': 0xb38f,
  'skein1024-384': 0xb390,
  'skein1024-392': 0xb391,
  'skein1024-400': 0xb392,
  'skein1024-408': 0xb393,
  'skein1024-416': 0xb394,
  'skein1024-424': 0xb395,
  'skein1024-432': 0xb396,
  'skein1024-440': 0xb397,
  'skein1024-448': 0xb398,
  'skein1024-456': 0xb399,
  'skein1024-464': 0xb39a,
  'skein1024-472': 0xb39b,
  'skein1024-480': 0xb39c,
  'skein1024-488': 0xb39d,
  'skein1024-496': 0xb39e,
  'skein1024-504': 0xb39f,
  'skein1024-512': 0xb3a0,
  'skein1024-520': 0xb3a1,
  'skein1024-528': 0xb3a2,
  'skein1024-536': 0xb3a3,
  'skein1024-544': 0xb3a4,
  'skein1024-552': 0xb3a5,
  'skein1024-560': 0xb3a6,
  'skein1024-568': 0xb3a7,
  'skein1024-576': 0xb3a8,
  'skein1024-584': 0xb3a9,
  'skein1024-592': 0xb3aa,
  'skein1024-600': 0xb3ab,
  'skein1024-608': 0xb3ac,
  'skein1024-616': 0xb3ad,
  'skein1024-624': 0xb3ae,
  'skein1024-632': 0xb3af,
  'skein1024-640': 0xb3b0,
  'skein1024-648': 0xb3b1,
  'skein1024-656': 0xb3b2,
  'skein1024-664': 0xb3b3,
  'skein1024-672': 0xb3b4,
  'skein1024-680': 0xb3b5,
  'skein1024-688': 0xb3b6,
  'skein1024-696': 0xb3b7,
  'skein1024-704': 0xb3b8,
  'skein1024-712': 0xb3b9,
  'skein1024-720': 0xb3ba,
  'skein1024-728': 0xb3bb,
  'skein1024-736': 0xb3bc,
  'skein1024-744': 0xb3bd,
  'skein1024-752': 0xb3be,
  'skein1024-760': 0xb3bf,
  'skein1024-768': 0xb3c0,
  'skein1024-776': 0xb3c1,
  'skein1024-784': 0xb3c2,
  'skein1024-792': 0xb3c3,
  'skein1024-800': 0xb3c4,
  'skein1024-808': 0xb3c5,
  'skein1024-816': 0xb3c6,
  'skein1024-824': 0xb3c7,
  'skein1024-832': 0xb3c8,
  'skein1024-840': 0xb3c9,
  'skein1024-848': 0xb3ca,
  'skein1024-856': 0xb3cb,
  'skein1024-864': 0xb3cc,
  'skein1024-872': 0xb3cd,
  'skein1024-880': 0xb3ce,
  'skein1024-888': 0xb3cf,
  'skein1024-896': 0xb3d0,
  'skein1024-904': 0xb3d1,
  'skein1024-912': 0xb3d2,
  'skein1024-920': 0xb3d3,
  'skein1024-928': 0xb3d4,
  'skein1024-936': 0xb3d5,
  'skein1024-944': 0xb3d6,
  'skein1024-952': 0xb3d7,
  'skein1024-960': 0xb3d8,
  'skein1024-968': 0xb3d9,
  'skein1024-976': 0xb3da,
  'skein1024-984': 0xb3db,
  'skein1024-992': 0xb3dc,
  'skein1024-1000': 0xb3dd,
  'skein1024-1008': 0xb3de,
  'skein1024-1016': 0xb3df,
  'skein1024-1024': 0xb3e0,
  'poseidon-bls12_381-a2-fc1': 0xb401,
  'poseidon-bls12_381-a2-fc1-sc': 0xb402
})

module.exports = { names }


/***/ }),

/***/ "SBVZ":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/get.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const { Value } = __webpack_require__(/*! ./response-types */ "o23V")

module.exports = configure(api => {
  return async function get (key, options = {}) {
    const res = await api.post('dht/get', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: Buffer.isBuffer(key) ? key.toString() : key,
        ...options
      }),
      headers: options.headers
    })

    for await (const message of res.ndjson()) {
      if (message.Type === Value) {
        return Buffer.from(message.Extra, 'base64')
      }
    }

    throw new Error('not found')
  }
})


/***/ }),

/***/ "SR7S":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/repo/gc.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * gc (options = {}) {
    const res = await api.post('repo/gc', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers,
      transform: (res) => {
        return {
          err: res.Error ? new Error(res.Error) : null,
          cid: (res.Key || {})['/'] ? new CID(res.Key['/']) : null
        }
      }
    })

    yield * res.ndjson()
  }
})


/***/ }),

/***/ "SRLA":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pubsub/peers.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (topic, options = {}) => {
    if (!options && typeof topic === 'object') {
      options = topic || {}
      topic = null
    }

    const res = await api.post('pubsub/peers', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: topic,
        ...options
      }),
      headers: options.headers
    })

    const { Strings } = await res.json()

    return Strings || []
  }
})


/***/ }),

/***/ "SSOD":
/*!**************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bootstrap/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  add: __webpack_require__(/*! ./add */ "peGt")(config),
  clear: __webpack_require__(/*! ./clear */ "aDK8")(config),
  rm: __webpack_require__(/*! ./rm */ "8OLg")(config),
  reset: __webpack_require__(/*! ./reset */ "Qx5Q")(config),
  list: __webpack_require__(/*! ./list */ "BwFZ")(config)
})


/***/ }),

/***/ "T4LB":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/diag/cmds.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('diag/cmds', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "T8vI":
/*!*********************************************!*\
  !*** ./node_modules/merge-options/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isOptionObject = __webpack_require__(/*! is-plain-obj */ "D2y0");

const {hasOwnProperty} = Object.prototype;
const {propertyIsEnumerable} = Object;
const defineProperty = (obj, name, value) => Object.defineProperty(obj, name, {
	value,
	writable: true,
	enumerable: true,
	configurable: true
});

const globalThis = this;
const defaultMergeOpts = {
	concatArrays: false,
	ignoreUndefined: false
};

const getEnumerableOwnPropertyKeys = value => {
	const keys = [];

	for (const key in value) {
		if (hasOwnProperty.call(value, key)) {
			keys.push(key);
		}
	}

	/* istanbul ignore else  */
	if (Object.getOwnPropertySymbols) {
		const symbols = Object.getOwnPropertySymbols(value);

		for (const symbol of symbols) {
			if (propertyIsEnumerable.call(value, symbol)) {
				keys.push(symbol);
			}
		}
	}

	return keys;
};

function clone(value) {
	if (Array.isArray(value)) {
		return cloneArray(value);
	}

	if (isOptionObject(value)) {
		return cloneOptionObject(value);
	}

	return value;
}

function cloneArray(array) {
	const result = array.slice(0, 0);

	getEnumerableOwnPropertyKeys(array).forEach(key => {
		defineProperty(result, key, clone(array[key]));
	});

	return result;
}

function cloneOptionObject(obj) {
	const result = Object.getPrototypeOf(obj) === null ? Object.create(null) : {};

	getEnumerableOwnPropertyKeys(obj).forEach(key => {
		defineProperty(result, key, clone(obj[key]));
	});

	return result;
}

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {string[]} keys keys to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */
const mergeKeys = (merged, source, keys, config) => {
	keys.forEach(key => {
		if (typeof source[key] === 'undefined' && config.ignoreUndefined) {
			return;
		}

		// Do not recurse into prototype chain of merged
		if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
			defineProperty(merged, key, merge(merged[key], source[key], config));
		} else {
			defineProperty(merged, key, clone(source[key]));
		}
	});

	return merged;
};

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 *
 * see [Array.prototype.concat ( ...arguments )](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat)
 */
const concatArrays = (merged, source, config) => {
	let result = merged.slice(0, 0);
	let resultIndex = 0;

	[merged, source].forEach(array => {
		const indices = [];

		// `result.concat(array)` with cloning
		for (let k = 0; k < array.length; k++) {
			if (!hasOwnProperty.call(array, k)) {
				continue;
			}

			indices.push(String(k));

			if (array === merged) {
				// Already cloned
				defineProperty(result, resultIndex++, array[k]);
			} else {
				defineProperty(result, resultIndex++, clone(array[k]));
			}
		}

		// Merge non-index keys
		result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter(key => !indices.includes(key)), config);
	});

	return result;
};

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */
function merge(merged, source, config) {
	if (config.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
		return concatArrays(merged, source, config);
	}

	if (!isOptionObject(source) || !isOptionObject(merged)) {
		return clone(source);
	}

	return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config);
}

module.exports = function (...options) {
	const config = merge(clone(defaultMergeOpts), (this !== globalThis && this) || {}, defaultMergeOpts);
	let merged = {_: {}};

	for (const option of options) {
		if (option === undefined) {
			continue;
		}

		if (!isOptionObject(option)) {
			throw new TypeError('`' + option + '` is not an Option Object');
		}

		merged = merge(merged, {_: option}, config);
	}

	return merged._;
};


/***/ }),

/***/ "TOie":
/*!**************************************!*\
  !*** ./node_modules/it-tar/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.extract = __webpack_require__(/*! ./extract */ "kFje")
exports.pack = __webpack_require__(/*! ./pack */ "2sSE")


/***/ }),

/***/ "TVkR":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pin/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  add: __webpack_require__(/*! ./add */ "xPLB")(config),
  rm: __webpack_require__(/*! ./rm */ "WRJq")(config),
  ls: __webpack_require__(/*! ./ls */ "4WaI")(config)
})


/***/ }),

/***/ "TgPM":
/*!********************************************!*\
  !*** ./node_modules/ipld-raw/src/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const CID = __webpack_require__(/*! cids */ "iARh")
const multihashing = __webpack_require__(/*! multihashing-async */ "d9A7")
const multicodec = __webpack_require__(/*! multicodec */ "OuWa")

// binary resolver
module.exports = {
  codec: multicodec.RAW,
  defaultHashAlg: multicodec.SHA2_256,
  resolver: {
    /**
     * Resolves a path within a Raw block.
     *
     * Always returns the raw data as value without any remainderPath.
     *
     * @param {Buffer} binaryBlob - Binary representation of a PB block
     * @param {string} [path='/'] - Path that should be resolved.  Must be '/' or an exception is thrown
     * @returns {Object} result - Result of the path it it was resolved successfully
     * @returns {*} result.value - The raw data
     * @returns {string} result.remainderPath - An empty string
     */
    resolve: (binaryBlob, path) => {
      if (path !== '/') {
        throw new Error('Only the root path / may be resolved')
      }

      return {
        value: binaryBlob,
        remainderPath: ''
      }
    },
    /**
     * Return all available paths of a block.
     *
     * @generator
     * @param {Buffer} binaryBlob - The raw data
     * @returns {Object} - Finished generator with `done: true`
     */
    tree: (binaryBlob) => {
      return {
        done: true
      }
    }
  },
  util: {
    deserialize: (data) => {
      return data
    },
    serialize: (data) => {
      return data
    },
    /**
     * Calculate the CID of the binary blob.
     *
     * @param {Object} binaryBlob - Encoded IPLD Node
     * @param {Object} [userOptions] - Options to create the CID
     * @param {number} [userOptions.cidVersion=1] - CID version number
     * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
     * @returns {Promise.<CID>}
     */
    cid: async (binaryBlob, userOptions) => {
      const defaultOptions = { cidVersion: 1, hashAlg: module.exports.defaultHashAlg }
      const options = Object.assign(defaultOptions, userOptions)

      const multihash = await multihashing(binaryBlob, options.hashAlg)
      const codecName = multicodec.print[module.exports.codec]
      const cid = new CID(options.cidVersion, codecName, multihash)

      return cid
    }
  }
}


/***/ }),

/***/ "Tv+W":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/links.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const { DAGLink } = __webpack_require__(/*! ipld-dag-pb */ "yFpY")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, options = {}) => {
    const res = await api.post('object/links', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return (data.Links || []).map(l => new DAGLink(l.Name, l.Size, l.Hash))
  }
})


/***/ }),

/***/ "U2WC":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/ls.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const toCamelWithMetadata = __webpack_require__(/*! ../lib/object-to-camel-with-metadata */ "Ycwt")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * ls (path, options = {}) {
    if (!path || typeof path !== 'string') {
      throw new Error('ipfs.files.ls requires a path')
    }

    const res = await api.post('files/ls', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: CID.isCID(path) ? `/ipfs/${path}` : path,
        // default long to true, diverges from go-ipfs where its false by default
        long: true,
        ...options,
        stream: true
      }),
      headers: options.headers
    })

    for await (const result of res.ndjson()) {
      // go-ipfs does not yet support the "stream" option
      if ('Entries' in result) {
        for (const entry of result.Entries || []) {
          yield toCoreInterface(toCamelWithMetadata(entry))
        }
      } else {
        yield toCoreInterface(toCamelWithMetadata(result))
      }
    }
  }
})

function toCoreInterface (entry) {
  if (entry.hash) entry.cid = new CID(entry.hash)
  delete entry.hash
  return entry
}


/***/ }),

/***/ "UBdu":
/*!*************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multiaddr/src/protocols-table.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Protocols (proto) {
  if (typeof (proto) === 'number') {
    if (Protocols.codes[proto]) {
      return Protocols.codes[proto]
    }

    throw new Error('no protocol with code: ' + proto)
  } else if (typeof (proto) === 'string' || proto instanceof String) {
    if (Protocols.names[proto]) {
      return Protocols.names[proto]
    }

    throw new Error('no protocol with name: ' + proto)
  }

  throw new Error('invalid protocol id type: ' + proto)
}

const V = -1
Protocols.lengthPrefixedVarSize = V
Protocols.V = V

Protocols.table = [
  [4, 32, 'ip4'],
  [6, 16, 'tcp'],
  [33, 16, 'dccp'],
  [41, 128, 'ip6'],
  [42, V, 'ip6zone'],
  [53, V, 'dns', 'resolvable'],
  [54, V, 'dns4', 'resolvable'],
  [55, V, 'dns6', 'resolvable'],
  [56, V, 'dnsaddr', 'resolvable'],
  [132, 16, 'sctp'],
  [273, 16, 'udp'],
  [275, 0, 'p2p-webrtc-star'],
  [276, 0, 'p2p-webrtc-direct'],
  [277, 0, 'p2p-stardust'],
  [290, 0, 'p2p-circuit'],
  [301, 0, 'udt'],
  [302, 0, 'utp'],
  [400, V, 'unix', false, 'path'],
  // `ipfs` is added before `p2p` for legacy support.
  // All text representations will default to `p2p`, but `ipfs` will
  // still be supported
  [421, V, 'ipfs'],
  // `p2p` is the preferred name for 421, and is now the default
  [421, V, 'p2p'],
  [443, 0, 'https'],
  [444, 96, 'onion'],
  [445, 296, 'onion3'],
  [446, V, 'garlic64'],
  [460, 0, 'quic'],
  [477, 0, 'ws'],
  [478, 0, 'wss'],
  [479, 0, 'p2p-websocket-star'],
  [480, 0, 'http'],
  [777, V, 'memory']
]

Protocols.names = {}
Protocols.codes = {}

// populate tables
Protocols.table.map(row => {
  const proto = p.apply(null, row)
  Protocols.codes[proto.code] = proto
  Protocols.names[proto.name] = proto
})

Protocols.object = p

function p (code, size, name, resolvable, path) {
  return {
    code,
    size,
    name,
    resolvable: Boolean(resolvable),
    path: Boolean(path)
  }
}

module.exports = Protocols


/***/ }),

/***/ "UHYx":
/*!*****************************************!*\
  !*** ./node_modules/borc/src/simple.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const constants = __webpack_require__(/*! ./constants */ "hb4V")
const MT = constants.MT
const SIMPLE = constants.SIMPLE
const SYMS = constants.SYMS

/**
 * A CBOR Simple Value that does not map onto a known constant.
 */
class Simple {
  /**
   * Creates an instance of Simple.
   *
   * @param {integer} value - the simple value's integer value
   */
  constructor (value) {
    if (typeof value !== 'number') {
      throw new Error('Invalid Simple type: ' + (typeof value))
    }
    if ((value < 0) || (value > 255) || ((value | 0) !== value)) {
      throw new Error('value must be a small positive integer: ' + value)
    }
    this.value = value
  }

  /**
   * Debug string for simple value
   *
   * @returns {string} simple(value)
   */
  toString () {
    return 'simple(' + this.value + ')'
  }

  /**
   * Debug string for simple value
   *
   * @returns {string} simple(value)
   */
  inspect () {
    return 'simple(' + this.value + ')'
  }

  /**
   * Push the simple value onto the CBOR stream
   *
   * @param {cbor.Encoder} gen The generator to push onto
   * @returns {number}
   */
  encodeCBOR (gen) {
    return gen._pushInt(this.value, MT.SIMPLE_FLOAT)
  }

  /**
   * Is the given object a Simple?
   *
   * @param {any} obj - object to test
   * @returns {bool} - is it Simple?
   */
  static isSimple (obj) {
    return obj instanceof Simple
  }

  /**
   * Decode from the CBOR additional information into a JavaScript value.
   * If the CBOR item has no parent, return a "safe" symbol instead of
   * `null` or `undefined`, so that the value can be passed through a
   * stream in object mode.
   *
   * @param {Number} val - the CBOR additional info to convert
   * @param {bool} hasParent - Does the CBOR item have a parent?
   * @returns {(null|undefined|Boolean|Symbol)} - the decoded value
   */
  static decode (val, hasParent) {
    if (hasParent == null) {
      hasParent = true
    }
    switch (val) {
      case SIMPLE.FALSE:
        return false
      case SIMPLE.TRUE:
        return true
      case SIMPLE.NULL:
        if (hasParent) {
          return null
        } else {
          return SYMS.NULL
        }
      case SIMPLE.UNDEFINED:
        if (hasParent) {
          return undefined
        } else {
          return SYMS.UNDEFINED
        }
      case -1:
        if (!hasParent) {
          throw new Error('Invalid BREAK')
        }
        return SYMS.BREAK
      default:
        return new Simple(val)
    }
  }
}

module.exports = Simple


/***/ }),

/***/ "UUTy":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/version.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ./lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('version', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    const data = await res.json()

    return toCamel(data)
  }
})


/***/ }),

/***/ "UaHm":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/stat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const toCamelWithMetadata = __webpack_require__(/*! ../lib/object-to-camel-with-metadata */ "Ycwt")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (path, options = {}) => {
    if (typeof path !== 'string') {
      options = path || {}
      path = '/'
    }

    const res = await api.post('files/stat', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    data.WithLocality = data.WithLocality || false
    return toCoreInterface(toCamelWithMetadata(data))
  }
})

function toCoreInterface (entry) {
  entry.cid = new CID(entry.hash)
  delete entry.hash
  return entry
}


/***/ }),

/***/ "UmrH":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/block/stat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, options = {}) => {
    const res = await api.post('block/stat', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: new CID(cid).toString(),
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return { cid: new CID(data.Key), size: data.Size }
  }
})


/***/ }),

/***/ "V4wN":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/touch.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function touch (path, options = {}) {
    const res = await api.post('files/touch', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    })

    await res.text()
  }
})


/***/ }),

/***/ "VG8o":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/swarm/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  addrs: __webpack_require__(/*! ./addrs */ "1yqE")(config),
  connect: __webpack_require__(/*! ./connect */ "9eVR")(config),
  disconnect: __webpack_require__(/*! ./disconnect */ "FfdA")(config),
  localAddrs: __webpack_require__(/*! ./localAddrs */ "NGSY")(config),
  peers: __webpack_require__(/*! ./peers */ "ByUX")(config)
})


/***/ }),

/***/ "VWqr":
/*!********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/multipart-request.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const normaliseInput = __webpack_require__(/*! ipfs-core-utils/src/files/normalise-input */ "5o7P")
const toStream = __webpack_require__(/*! ./to-stream */ "t2O4")
const { nanoid } = __webpack_require__(/*! nanoid */ "4b23")
const modeToString = __webpack_require__(/*! ../lib/mode-to-string */ "JX3q")
const mtimeToObject = __webpack_require__(/*! ../lib/mtime-to-object */ "gq3O")
const merge = __webpack_require__(/*! merge-options */ "T8vI").bind({ ignoreUndefined: true })

async function multipartRequest (source = '', abortController, headers = {}, boundary = `-----------------------------${nanoid()}`) {
  async function * streamFiles (source) {
    try {
      let index = 0

      for await (const { content, path, mode, mtime } of normaliseInput(source)) {
        let fileSuffix = ''
        const type = content ? 'file' : 'dir'

        if (index > 0) {
          yield '\r\n'

          fileSuffix = `-${index}`
        }

        yield `--${boundary}\r\n`
        yield `Content-Disposition: form-data; name="${type}${fileSuffix}"; filename="${encodeURIComponent(path)}"\r\n`
        yield `Content-Type: ${content ? 'application/octet-stream' : 'application/x-directory'}\r\n`

        if (mode !== null && mode !== undefined) {
          yield `mode: ${modeToString(mode)}\r\n`
        }

        if (mtime != null) {
          const {
            secs, nsecs
          } = mtimeToObject(mtime)

          yield `mtime: ${secs}\r\n`

          if (nsecs != null) {
            yield `mtime-nsecs: ${nsecs}\r\n`
          }
        }

        yield '\r\n'

        if (content) {
          yield * content
        }

        index++
      }
    } catch (err) {
      // workaround for https://github.com/node-fetch/node-fetch/issues/753
      abortController.abort(err)
    } finally {
      yield `\r\n--${boundary}--\r\n`
    }
  }

  return {
    headers: merge(headers, {
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    }),
    body: await toStream(streamFiles(source))
  }
}

module.exports = multipartRequest


/***/ }),

/***/ "Vpuf":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dag/get.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const dagPB = __webpack_require__(/*! ipld-dag-pb */ "yFpY")
const dagCBOR = __webpack_require__(/*! ipld-dag-cbor */ "I2fb")
const raw = __webpack_require__(/*! ipld-raw */ "TgPM")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")

const resolvers = {
  'dag-cbor': dagCBOR.resolver,
  'dag-pb': dagPB.resolver,
  raw: raw.resolver
}

module.exports = configure((api, options) => {
  const getBlock = __webpack_require__(/*! ../block/get */ "DgJx")(options)
  const dagResolve = __webpack_require__(/*! ./resolve */ "b/+6")(options)

  return async (cid, options = {}) => {
    const resolved = await dagResolve(cid, options)
    const block = await getBlock(resolved.cid, options)
    const dagResolver = resolvers[block.cid.codec]

    if (!dagResolver) {
      throw Object.assign(
        new Error(`Missing IPLD format "${block.cid.codec}"`),
        { missingMulticodec: cid.codec }
      )
    }

    if (block.cid.codec === 'raw' && !resolved.remPath) {
      resolved.remainderPath = '/'
    }

    return dagResolver.resolve(block.data, resolved.remainderPath)
  }
})


/***/ }),

/***/ "WAPC":
/*!***************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multiaddr/src/codec.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const convert = __webpack_require__(/*! ./convert */ "kv0P")
const protocols = __webpack_require__(/*! ./protocols-table */ "UBdu")
const varint = __webpack_require__(/*! varint */ "JhIh")

// export codec
module.exports = {
  stringToStringTuples,
  stringTuplesToString,

  tuplesToStringTuples,
  stringTuplesToTuples,

  bufferToTuples,
  tuplesToBuffer,

  bufferToString,
  stringToBuffer,

  fromString,
  fromBuffer,
  validateBuffer,
  isValidBuffer,
  cleanPath,

  ParseError,
  protoFromTuple,

  sizeForAddr
}

// string -> [[str name, str addr]... ]
function stringToStringTuples (str) {
  const tuples = []
  const parts = str.split('/').slice(1) // skip first empty elem
  if (parts.length === 1 && parts[0] === '') {
    return []
  }

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p]
    const proto = protocols(part)

    if (proto.size === 0) {
      tuples.push([part])
      continue
    }

    p++ // advance addr part
    if (p >= parts.length) {
      throw ParseError('invalid address: ' + str)
    }

    // if it's a path proto, take the rest
    if (proto.path) {
      tuples.push([
        part,
        // TODO: should we need to check each path part to see if it's a proto?
        // This would allow for other protocols to be added after a unix path,
        // however it would have issues if the path had a protocol name in the path
        cleanPath(parts.slice(p).join('/'))
      ])
      break
    }

    tuples.push([part, parts[p]])
  }

  return tuples
}

// [[str name, str addr]... ] -> string
function stringTuplesToString (tuples) {
  const parts = []
  tuples.map(tup => {
    const proto = protoFromTuple(tup)
    parts.push(proto.name)
    if (tup.length > 1) {
      parts.push(tup[1])
    }
  })

  return cleanPath(parts.join('/'))
}

// [[str name, str addr]... ] -> [[int code, Buffer]... ]
function stringTuplesToTuples (tuples) {
  return tuples.map(tup => {
    if (!Array.isArray(tup)) {
      tup = [tup]
    }
    const proto = protoFromTuple(tup)
    if (tup.length > 1) {
      return [proto.code, convert.toBuffer(proto.code, tup[1])]
    }
    return [proto.code]
  })
}

// [[int code, Buffer]... ] -> [[str name, str addr]... ]
function tuplesToStringTuples (tuples) {
  return tuples.map(tup => {
    const proto = protoFromTuple(tup)
    if (tup.length > 1) {
      return [proto.code, convert.toString(proto.code, tup[1])]
    }
    return [proto.code]
  })
}

// [[int code, Buffer ]... ] -> Buffer
function tuplesToBuffer (tuples) {
  return fromBuffer(Buffer.concat(tuples.map(tup => {
    const proto = protoFromTuple(tup)
    let buf = Buffer.from(varint.encode(proto.code))

    if (tup.length > 1) {
      buf = Buffer.concat([buf, tup[1]]) // add address buffer
    }

    return buf
  })))
}

function sizeForAddr (p, addr) {
  if (p.size > 0) {
    return p.size / 8
  } else if (p.size === 0) {
    return 0
  } else {
    const size = varint.decode(addr)
    return size + varint.decode.bytes
  }
}

// Buffer -> [[int code, Buffer ]... ]
function bufferToTuples (buf) {
  const tuples = []
  let i = 0
  while (i < buf.length) {
    const code = varint.decode(buf, i)
    const n = varint.decode.bytes

    const p = protocols(code)

    const size = sizeForAddr(p, buf.slice(i + n))

    if (size === 0) {
      tuples.push([code])
      i += n
      continue
    }

    const addr = buf.slice(i + n, i + n + size)

    i += (size + n)

    if (i > buf.length) { // did not end _exactly_ at buffer.length
      throw ParseError('Invalid address buffer: ' + buf.toString('hex'))
    }

    // ok, tuple seems good.
    tuples.push([code, addr])
  }

  return tuples
}

// Buffer -> String
function bufferToString (buf) {
  const a = bufferToTuples(buf)
  const b = tuplesToStringTuples(a)
  return stringTuplesToString(b)
}

// String -> Buffer
function stringToBuffer (str) {
  str = cleanPath(str)
  const a = stringToStringTuples(str)
  const b = stringTuplesToTuples(a)

  return tuplesToBuffer(b)
}

// String -> Buffer
function fromString (str) {
  return stringToBuffer(str)
}

// Buffer -> Buffer
function fromBuffer (buf) {
  const err = validateBuffer(buf)
  if (err) throw err
  return Buffer.from(buf) // copy
}

function validateBuffer (buf) {
  try {
    bufferToTuples(buf) // try to parse. will throw if breaks
  } catch (err) {
    return err
  }
}

function isValidBuffer (buf) {
  return validateBuffer(buf) === undefined
}

function cleanPath (str) {
  return '/' + str.trim().split('/').filter(a => a).join('/')
}

function ParseError (str) {
  return new Error('Error parsing address: ' + str)
}

function protoFromTuple (tup) {
  const proto = protocols(tup[0])
  return proto
}


/***/ }),

/***/ "WRJq":
/*!*****************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pin/rm.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (path, options = {}) => {
    const res = await api.post('pin/rm', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${path}`,
        ...options
      }),
      headers: options.headers
    })

    const data = await res.json()

    return (data.Pins || []).map(cid => ({ cid: new CID(cid) }))
  }
})


/***/ }),

/***/ "Wbuh":
/*!**************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/add.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const addAll = __webpack_require__(/*! ./add-all */ "dPKy")
const last = __webpack_require__(/*! it-last */ "mXWM")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")

module.exports = (options) => {
  const all = addAll(options)

  return configure(() => {
    return async function add (input, options = {}) { // eslint-disable-line require-await
      return last(all(input, options))
    }
  })(options)
}


/***/ }),

/***/ "WkWz":
/*!*****************************************************************************!*\
  !*** ./node_modules/ipld-raw/node_modules/multihashing-async/src/crypto.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const sha3 = __webpack_require__(/*! js-sha3 */ "zNmP")
const mur = __webpack_require__(/*! murmurhash3js-revisited */ "QWpB")
const { factory: sha } = __webpack_require__(/*! ./sha */ "IrvS")
const { fromNumberTo32BitBuf } = __webpack_require__(/*! ./utils */ "CrJr")

// Note that although this function doesn't do any asynchronous work, we mark
// the function as async because it must return a Promise to match the API
// for other functions that do perform asynchronous work (see sha.browser.js)
// eslint-disable-next-line
const hash = (algorithm) => async (data) => {
  switch (algorithm) {
    case 'sha3-224':
      return Buffer.from(sha3.sha3_224.arrayBuffer(data))
    case 'sha3-256':
      return Buffer.from(sha3.sha3_256.arrayBuffer(data))
    case 'sha3-384':
      return Buffer.from(sha3.sha3_384.arrayBuffer(data))
    case 'sha3-512':
      return Buffer.from(sha3.sha3_512.arrayBuffer(data))
    case 'shake-128':
      return Buffer.from(sha3.shake128.create(128).update(data).arrayBuffer())
    case 'shake-256':
      return Buffer.from(sha3.shake256.create(256).update(data).arrayBuffer())
    case 'keccak-224':
      return Buffer.from(sha3.keccak224.arrayBuffer(data))
    case 'keccak-256':
      return Buffer.from(sha3.keccak256.arrayBuffer(data))
    case 'keccak-384':
      return Buffer.from(sha3.keccak384.arrayBuffer(data))
    case 'keccak-512':
      return Buffer.from(sha3.keccak512.arrayBuffer(data))
    case 'murmur3-128':
      return Buffer.from(mur.x64.hash128(data), 'hex')
    case 'murmur3-32':
      return fromNumberTo32BitBuf(mur.x86.hash32(data))

    default:
      throw new TypeError(`${algorithm} is not a supported algorithm`)
  }
}

const identity = data => Buffer.from(data)

module.exports = {
  identity,
  sha1: sha('sha1'),
  sha2256: sha('sha2-256'),
  sha2512: sha('sha2-512'),
  dblSha2256: sha('dbl-sha2-256'),
  sha3224: hash('sha3-224'),
  sha3256: hash('sha3-256'),
  sha3384: hash('sha3-384'),
  sha3512: hash('sha3-512'),
  shake128: hash('shake-128'),
  shake256: hash('shake-256'),
  keccak224: hash('keccak-224'),
  keccak256: hash('keccak-256'),
  keccak384: hash('keccak-384'),
  keccak512: hash('keccak-512'),
  murmur3128: hash('murmur3-128'),
  murmur332: hash('murmur3-32'),
  addBlake: __webpack_require__(/*! ./blake */ "E8hM")
}


/***/ }),

/***/ "WpBr":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/key/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  gen: __webpack_require__(/*! ./gen */ "hX3S")(config),
  list: __webpack_require__(/*! ./list */ "mzU7")(config),
  rename: __webpack_require__(/*! ./rename */ "Q8Jw")(config),
  rm: __webpack_require__(/*! ./rm */ "DbO0")(config),
  export: __webpack_require__(/*! ./export */ "vwWl")(config),
  import: __webpack_require__(/*! ./import */ "Ekfz")(config)
})


/***/ }),

/***/ "WuXv":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dag/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  get: __webpack_require__(/*! ./get */ "Vpuf")(config),
  put: __webpack_require__(/*! ./put */ "Y1bx")(config),
  resolve: __webpack_require__(/*! ./resolve */ "b/+6")(config)
})


/***/ }),

/***/ "XDq5":
/*!***********************************************************!*\
  !*** ./node_modules/it-tar/node_modules/bl/BufferList.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const symbol = Symbol.for('BufferList')

function BufferList (buf) {
  if (!(this instanceof BufferList)) {
    return new BufferList(buf)
  }

  BufferList._init.call(this, buf)
}

BufferList._init = function _init (buf) {
  Object.defineProperty(this, symbol, { value: true })

  this._bufs = []
  this.length = 0

  if (buf) {
    this.append(buf)
  }
}

BufferList.prototype._new = function _new (buf) {
  return new BufferList(buf)
}

BufferList.prototype._offset = function _offset (offset) {
  if (offset === 0) {
    return [0, 0]
  }

  let tot = 0

  for (let i = 0; i < this._bufs.length; i++) {
    const _t = tot + this._bufs[i].length
    if (offset < _t || i === this._bufs.length - 1) {
      return [i, offset - tot]
    }
    tot = _t
  }
}

BufferList.prototype._reverseOffset = function (blOffset) {
  const bufferId = blOffset[0]
  let offset = blOffset[1]

  for (let i = 0; i < bufferId; i++) {
    offset += this._bufs[i].length
  }

  return offset
}

BufferList.prototype.get = function get (index) {
  if (index > this.length || index < 0) {
    return undefined
  }

  const offset = this._offset(index)

  return this._bufs[offset[0]][offset[1]]
}

BufferList.prototype.slice = function slice (start, end) {
  if (typeof start === 'number' && start < 0) {
    start += this.length
  }

  if (typeof end === 'number' && end < 0) {
    end += this.length
  }

  return this.copy(null, 0, start, end)
}

BufferList.prototype.copy = function copy (dst, dstStart, srcStart, srcEnd) {
  if (typeof srcStart !== 'number' || srcStart < 0) {
    srcStart = 0
  }

  if (typeof srcEnd !== 'number' || srcEnd > this.length) {
    srcEnd = this.length
  }

  if (srcStart >= this.length) {
    return dst || Buffer.alloc(0)
  }

  if (srcEnd <= 0) {
    return dst || Buffer.alloc(0)
  }

  const copy = !!dst
  const off = this._offset(srcStart)
  const len = srcEnd - srcStart
  let bytes = len
  let bufoff = (copy && dstStart) || 0
  let start = off[1]

  // copy/slice everything
  if (srcStart === 0 && srcEnd === this.length) {
    if (!copy) {
      // slice, but full concat if multiple buffers
      return this._bufs.length === 1
        ? this._bufs[0]
        : Buffer.concat(this._bufs, this.length)
    }

    // copy, need to copy individual buffers
    for (let i = 0; i < this._bufs.length; i++) {
      this._bufs[i].copy(dst, bufoff)
      bufoff += this._bufs[i].length
    }

    return dst
  }

  // easy, cheap case where it's a subset of one of the buffers
  if (bytes <= this._bufs[off[0]].length - start) {
    return copy
      ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes)
      : this._bufs[off[0]].slice(start, start + bytes)
  }

  if (!copy) {
    // a slice, we need something to copy in to
    dst = Buffer.allocUnsafe(len)
  }

  for (let i = off[0]; i < this._bufs.length; i++) {
    const l = this._bufs[i].length - start

    if (bytes > l) {
      this._bufs[i].copy(dst, bufoff, start)
      bufoff += l
    } else {
      this._bufs[i].copy(dst, bufoff, start, start + bytes)
      bufoff += l
      break
    }

    bytes -= l

    if (start) {
      start = 0
    }
  }

  // safeguard so that we don't return uninitialized memory
  if (dst.length > bufoff) return dst.slice(0, bufoff)

  return dst
}

BufferList.prototype.shallowSlice = function shallowSlice (start, end) {
  start = start || 0
  end = typeof end !== 'number' ? this.length : end

  if (start < 0) {
    start += this.length
  }

  if (end < 0) {
    end += this.length
  }

  if (start === end) {
    return this._new()
  }

  const startOffset = this._offset(start)
  const endOffset = this._offset(end)
  const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1)

  if (endOffset[1] === 0) {
    buffers.pop()
  } else {
    buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1])
  }

  if (startOffset[1] !== 0) {
    buffers[0] = buffers[0].slice(startOffset[1])
  }

  return this._new(buffers)
}

BufferList.prototype.toString = function toString (encoding, start, end) {
  return this.slice(start, end).toString(encoding)
}

BufferList.prototype.consume = function consume (bytes) {
  // first, normalize the argument, in accordance with how Buffer does it
  bytes = Math.trunc(bytes)
  // do nothing if not a positive number
  if (Number.isNaN(bytes) || bytes <= 0) return this

  while (this._bufs.length) {
    if (bytes >= this._bufs[0].length) {
      bytes -= this._bufs[0].length
      this.length -= this._bufs[0].length
      this._bufs.shift()
    } else {
      this._bufs[0] = this._bufs[0].slice(bytes)
      this.length -= bytes
      break
    }
  }

  return this
}

BufferList.prototype.duplicate = function duplicate () {
  const copy = this._new()

  for (let i = 0; i < this._bufs.length; i++) {
    copy.append(this._bufs[i])
  }

  return copy
}

BufferList.prototype.append = function append (buf) {
  if (buf == null) {
    return this
  }

  if (buf.buffer) {
    // append a view of the underlying ArrayBuffer
    this._appendBuffer(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength))
  } else if (Array.isArray(buf)) {
    for (let i = 0; i < buf.length; i++) {
      this.append(buf[i])
    }
  } else if (this._isBufferList(buf)) {
    // unwrap argument into individual BufferLists
    for (let i = 0; i < buf._bufs.length; i++) {
      this.append(buf._bufs[i])
    }
  } else {
    // coerce number arguments to strings, since Buffer(number) does
    // uninitialized memory allocation
    if (typeof buf === 'number') {
      buf = buf.toString()
    }

    this._appendBuffer(Buffer.from(buf))
  }

  return this
}

BufferList.prototype._appendBuffer = function appendBuffer (buf) {
  this._bufs.push(buf)
  this.length += buf.length
}

BufferList.prototype.indexOf = function (search, offset, encoding) {
  if (encoding === undefined && typeof offset === 'string') {
    encoding = offset
    offset = undefined
  }

  if (typeof search === 'function' || Array.isArray(search)) {
    throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.')
  } else if (typeof search === 'number') {
    search = Buffer.from([search])
  } else if (typeof search === 'string') {
    search = Buffer.from(search, encoding)
  } else if (this._isBufferList(search)) {
    search = search.slice()
  } else if (Array.isArray(search.buffer)) {
    search = Buffer.from(search.buffer, search.byteOffset, search.byteLength)
  } else if (!Buffer.isBuffer(search)) {
    search = Buffer.from(search)
  }

  offset = Number(offset || 0)

  if (isNaN(offset)) {
    offset = 0
  }

  if (offset < 0) {
    offset = this.length + offset
  }

  if (offset < 0) {
    offset = 0
  }

  if (search.length === 0) {
    return offset > this.length ? this.length : offset
  }

  const blOffset = this._offset(offset)
  let blIndex = blOffset[0] // index of which internal buffer we're working on
  let buffOffset = blOffset[1] // offset of the internal buffer we're working on

  // scan over each buffer
  for (; blIndex < this._bufs.length; blIndex++) {
    const buff = this._bufs[blIndex]

    while (buffOffset < buff.length) {
      const availableWindow = buff.length - buffOffset

      if (availableWindow >= search.length) {
        const nativeSearchResult = buff.indexOf(search, buffOffset)

        if (nativeSearchResult !== -1) {
          return this._reverseOffset([blIndex, nativeSearchResult])
        }

        buffOffset = buff.length - search.length + 1 // end of native search window
      } else {
        const revOffset = this._reverseOffset([blIndex, buffOffset])

        if (this._match(revOffset, search)) {
          return revOffset
        }

        buffOffset++
      }
    }

    buffOffset = 0
  }

  return -1
}

BufferList.prototype._match = function (offset, search) {
  if (this.length - offset < search.length) {
    return false
  }

  for (let searchOffset = 0; searchOffset < search.length; searchOffset++) {
    if (this.get(offset + searchOffset) !== search[searchOffset]) {
      return false
    }
  }
  return true
}

;(function () {
  const methods = {
    readDoubleBE: 8,
    readDoubleLE: 8,
    readFloatBE: 4,
    readFloatLE: 4,
    readInt32BE: 4,
    readInt32LE: 4,
    readUInt32BE: 4,
    readUInt32LE: 4,
    readInt16BE: 2,
    readInt16LE: 2,
    readUInt16BE: 2,
    readUInt16LE: 2,
    readInt8: 1,
    readUInt8: 1,
    readIntBE: null,
    readIntLE: null,
    readUIntBE: null,
    readUIntLE: null
  }

  for (const m in methods) {
    (function (m) {
      if (methods[m] === null) {
        BufferList.prototype[m] = function (offset, byteLength) {
          return this.slice(offset, offset + byteLength)[m](0, byteLength)
        }
      } else {
        BufferList.prototype[m] = function (offset = 0) {
          return this.slice(offset, offset + methods[m])[m](0)
        }
      }
    }(m))
  }
}())

// Used internally by the class and also as an indicator of this object being
// a `BufferList`. It's not possible to use `instanceof BufferList` in a browser
// environment because there could be multiple different copies of the
// BufferList class and some `BufferList`s might be `BufferList`s.
BufferList.prototype._isBufferList = function _isBufferList (b) {
  return b instanceof BufferList || BufferList.isBufferList(b)
}

BufferList.isBufferList = function isBufferList (b) {
  return b != null && b[symbol]
}

module.exports = BufferList


/***/ }),

/***/ "XW02":
/*!**************************************!*\
  !*** ./node_modules/it-map/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Takes an (async) iterable and returns one with each item mapped by the passed
 * function.
 *
 * @template I,O
 * @param {AsyncIterable<I>|Iterable<I>} source
 * @param {function(I):O|Promise<O>} func
 * @returns {AsyncIterable<O>}
 */
const map = async function * (source, func) {
  for await (const val of source) {
    yield func(val)
  }
}

module.exports = map


/***/ }),

/***/ "XuWj":
/*!****************************************!*\
  !*** ./node_modules/borc/src/utils.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const Bignumber = __webpack_require__(/*! bignumber.js */ "kB5k").BigNumber

const constants = __webpack_require__(/*! ./constants */ "hb4V")
const SHIFT32 = constants.SHIFT32
const SHIFT16 = constants.SHIFT16
const MAX_SAFE_HIGH = 0x1fffff

exports.parseHalf = function parseHalf (buf) {
  var exp, mant, sign
  sign = buf[0] & 0x80 ? -1 : 1
  exp = (buf[0] & 0x7C) >> 2
  mant = ((buf[0] & 0x03) << 8) | buf[1]
  if (!exp) {
    return sign * 5.9604644775390625e-8 * mant
  } else if (exp === 0x1f) {
    return sign * (mant ? 0 / 0 : 2e308)
  } else {
    return sign * Math.pow(2, exp - 25) * (1024 + mant)
  }
}

function toHex (n) {
  if (n < 16) {
    return '0' + n.toString(16)
  }

  return n.toString(16)
}

exports.arrayBufferToBignumber = function (buf) {
  const len = buf.byteLength
  let res = ''
  for (let i = 0; i < len; i++) {
    res += toHex(buf[i])
  }

  return new Bignumber(res, 16)
}

// convert an Object into a Map
exports.buildMap = (obj) => {
  const res = new Map()
  const keys = Object.keys(obj)
  const length = keys.length
  for (let i = 0; i < length; i++) {
    res.set(keys[i], obj[keys[i]])
  }
  return res
}

exports.buildInt32 = (f, g) => {
  return f * SHIFT16 + g
}

exports.buildInt64 = (f1, f2, g1, g2) => {
  const f = exports.buildInt32(f1, f2)
  const g = exports.buildInt32(g1, g2)

  if (f > MAX_SAFE_HIGH) {
    return new Bignumber(f).times(SHIFT32).plus(g)
  } else {
    return (f * SHIFT32) + g
  }
}

exports.writeHalf = function writeHalf (buf, half) {
  // assume 0, -0, NaN, Infinity, and -Infinity have already been caught

  // HACK: everyone settle in.  This isn't going to be pretty.
  // Translate cn-cbor's C code (from Carsten Borman):

  // uint32_t be32;
  // uint16_t be16, u16;
  // union {
  //   float f;
  //   uint32_t u;
  // } u32;
  // u32.f = float_val;

  const u32 = Buffer.allocUnsafe(4)
  u32.writeFloatBE(half, 0)
  const u = u32.readUInt32BE(0)

  // if ((u32.u & 0x1FFF) == 0) { /* worth trying half */

  // hildjj: If the lower 13 bits are 0, we won't lose anything in the conversion
  if ((u & 0x1FFF) !== 0) {
    return false
  }

  //   int s16 = (u32.u >> 16) & 0x8000;
  //   int exp = (u32.u >> 23) & 0xff;
  //   int mant = u32.u & 0x7fffff;

  var s16 = (u >> 16) & 0x8000 // top bit is sign
  const exp = (u >> 23) & 0xff // then 5 bits of exponent
  const mant = u & 0x7fffff

  //   if (exp == 0 && mant == 0)
  //     ;              /* 0.0, -0.0 */

  // hildjj: zeros already handled.  Assert if you don't believe me.

  //   else if (exp >= 113 && exp <= 142) /* normalized */
  //     s16 += ((exp - 112) << 10) + (mant >> 13);
  if ((exp >= 113) && (exp <= 142)) {
    s16 += ((exp - 112) << 10) + (mant >> 13)

  //   else if (exp >= 103 && exp < 113) { /* denorm, exp16 = 0 */
  //     if (mant & ((1 << (126 - exp)) - 1))
  //       goto float32;         /* loss of precision */
  //     s16 += ((mant + 0x800000) >> (126 - exp));
  } else if ((exp >= 103) && (exp < 113)) {
    if (mant & ((1 << (126 - exp)) - 1)) {
      return false
    }
    s16 += ((mant + 0x800000) >> (126 - exp))

    //   } else if (exp == 255 && mant == 0) { /* Inf */
    //     s16 += 0x7c00;

    // hildjj: Infinity already handled

  //   } else
  //     goto float32;           /* loss of range */
  } else {
    return false
  }

  //   ensure_writable(3);
  //   u16 = s16;
  //   be16 = hton16p((const uint8_t*)&u16);
  buf.writeUInt16BE(s16, 0)
  return true
}

exports.keySorter = function (a, b) {
  var lenA = a[0].byteLength
  var lenB = b[0].byteLength

  if (lenA > lenB) {
    return 1
  }

  if (lenB > lenA) {
    return -1
  }

  return a[0].compare(b[0])
}

// Adapted from http://www.2ality.com/2012/03/signedzero.html
exports.isNegativeZero = (x) => {
  return x === 0 && (1 / x < 0)
}

exports.nextPowerOf2 = (n) => {
  let count = 0
  // First n in the below condition is for
  // the case where n is 0
  if (n && !(n & (n - 1))) {
    return n
  }

  while (n !== 0) {
    n >>= 1
    count += 1
  }

  return 1 << count
}


/***/ }),

/***/ "Y1bx":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dag/put.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const dagCBOR = __webpack_require__(/*! ipld-dag-cbor */ "I2fb")
const dagPB = __webpack_require__(/*! ipld-dag-pb */ "yFpY")
const ipldRaw = __webpack_require__(/*! ipld-raw */ "TgPM")
const CID = __webpack_require__(/*! cids */ "iARh")
const multihash = __webpack_require__(/*! multihashes */ "yP9g")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const multipartRequest = __webpack_require__(/*! ../lib/multipart-request */ "VWqr")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")
const multicodec = __webpack_require__(/*! multicodec */ "OuWa")

module.exports = configure((api, opts) => {
  const formats = {
    [multicodec.DAG_PB]: dagPB,
    [multicodec.DAG_CBOR]: dagCBOR,
    [multicodec.RAW]: ipldRaw
  }

  const ipldOptions = (opts && opts.ipld) || {}
  const configuredFormats = (ipldOptions && ipldOptions.formats) || []
  configuredFormats.forEach(format => {
    formats[format.codec] = format
  })

  return async (dagNode, options = {}) => {
    if (options.cid && (options.format || options.hashAlg)) {
      throw new Error('Failed to put DAG node. Provide either `cid` OR `format` and `hashAlg` options')
    } else if ((options.format && !options.hashAlg) || (!options.format && options.hashAlg)) {
      throw new Error('Failed to put DAG node. Provide `format` AND `hashAlg` options')
    }

    if (options.cid) {
      const cid = new CID(options.cid)
      options = {
        ...options,
        format: cid.codec,
        hashAlg: multihash.decode(cid.multihash).name
      }
      delete options.cid
    }

    options = {
      format: 'dag-cbor',
      hashAlg: 'sha2-256',
      inputEnc: 'raw',
      ...options
    }

    const number = multicodec.getNumber(options.format)
    let format = formats[number]

    if (!format) {
      if (opts && opts.ipld && opts.ipld.loadFormat) {
        format = await opts.ipld.loadFormat(options.format)
      }

      if (!format) {
        throw new Error('Format unsupported - please add support using the options.ipld.formats or options.ipld.loadFormat options')
      }
    }

    if (!format.util || !format.util.serialize) {
      throw new Error('Format does not support utils.serialize function')
    }

    const serialized = format.util.serialize(dagNode)

    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const res = await api.post('dag/put', {
      timeout: options.timeout,
      signal,
      searchParams: toUrlSearchParams(options),
      ...(
        await multipartRequest(serialized, controller, options.headers)
      )
    })
    const data = await res.json()

    return new CID(data.Cid['/'])
  }
})


/***/ }),

/***/ "Y6bo":
/*!*******************************************!*\
  !*** ./node_modules/is-electron/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// https://github.com/electron/electron/issues/2288
function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

module.exports = isElectron;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! process/browser */ "8oxB")))

/***/ }),

/***/ "YBeJ":
/*!************************************************************!*\
  !*** ./node_modules/browser-readablestream-to-it/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


async function * browserReadableStreamToIt (stream) {
  const reader = stream.getReader()

  while (true) {
    const result = await reader.read()

    if (result.done) {
      return
    }

    yield result.value
  }
}

module.exports = browserReadableStreamToIt


/***/ }),

/***/ "YMSI":
/*!**************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-link/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__(/*! ./dagLink */ "i5gV")
exports.util = __webpack_require__(/*! ./util */ "E1bq")


/***/ }),

/***/ "Ycwt":
/*!********************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/object-to-camel-with-metadata.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ./object-to-camel */ "d2a1")

function toCamelWithMetadata (entry) {
  const file = toCamel(entry)

  if (Object.prototype.hasOwnProperty.call(file, 'mode')) {
    file.mode = parseInt(file.mode, 8)
  }

  if (Object.prototype.hasOwnProperty.call(file, 'mtime')) {
    file.mtime = {
      secs: file.mtime,
      nsecs: file.mtimeNsecs || 0
    }

    delete file.mtimeNsecs
  }

  return file
}

module.exports = toCamelWithMetadata


/***/ }),

/***/ "YtaI":
/*!*************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/cids/src/cid-util.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mh = __webpack_require__(/*! multihashes */ "yP9g")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
var CIDUtil = {
  /**
   * Test if the given input is a valid CID object.
   * Returns an error message if it is not.
   * Returns undefined if it is a valid CID.
   *
   * @param {any} other
   * @returns {string}
   */
  checkCIDComponents: function (other) {
    if (other == null) {
      return 'null values are not valid CIDs'
    }

    if (!(other.version === 0 || other.version === 1)) {
      return 'Invalid version, must be a number equal to 1 or 0'
    }

    if (typeof other.codec !== 'string') {
      return 'codec must be string'
    }

    if (other.version === 0) {
      if (other.codec !== 'dag-pb') {
        return "codec must be 'dag-pb' for CIDv0"
      }
      if (other.multibaseName !== 'base58btc') {
        return "multibaseName must be 'base58btc' for CIDv0"
      }
    }

    if (!Buffer.isBuffer(other.multihash)) {
      return 'multihash must be a Buffer'
    }

    try {
      mh.validate(other.multihash)
    } catch (err) {
      let errorMsg = err.message
      if (!errorMsg) { // Just in case mh.validate() throws an error with empty error message
        errorMsg = 'Multihash validation failed'
      }
      return errorMsg
    }
  }
}

module.exports = CIDUtil


/***/ }),

/***/ "Z+3+":
/*!************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bitswap/wantlist-for-peer.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (peerId, options = {}) => {
    peerId = typeof peerId === 'string' ? peerId : new CID(peerId).toString()

    const res = await (await api.post('bitswap/wantlist', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options,
        peer: peerId
      }),
      headers: options.headers
    })).json()

    return (res.Keys || []).map(k => new CID(k['/']))
  }
})


/***/ }),

/***/ "Z9Fn":
/*!*******************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/patch/rm-link.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, dLink, options = {}) => {
    const res = await api.post('object/patch/rm-link', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`,
          dLink.Name || dLink.name || null
        ],
        ...options
      }),
      headers: options.headers
    })

    const { Hash } = await res.json()

    return new CID(Hash)
  }
})


/***/ }),

/***/ "Zws2":
/*!*********************************************!*\
  !*** ./node_modules/ipfs-utils/src/http.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable no-undef */


const { fetch, Request, Headers } = __webpack_require__(/*! ./http/fetch */ "Jzoq")
const { TimeoutError, HTTPError } = __webpack_require__(/*! ./http/error */ "0qpk")
const merge = __webpack_require__(/*! merge-options */ "T8vI").bind({ ignoreUndefined: true })
const { URL, URLSearchParams } = __webpack_require__(/*! iso-url */ "Fq86")
const TextDecoder = __webpack_require__(/*! ./text-decoder */ "eYAs")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")

const timeout = (promise, ms, abortController) => {
  if (ms === undefined) {
    return promise
  }

  const start = Date.now()

  const timedOut = () => {
    const time = Date.now() - start

    return time >= ms
  }

  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      if (timedOut()) {
        reject(new TimeoutError())
        abortController.abort()
      }
    }, ms)

    const after = (next) => {
      return (res) => {
        clearTimeout(timeoutID)

        if (timedOut()) {
          reject(new TimeoutError())
          return
        }

        next(res)
      }
    }

    promise
      .then(after(resolve), after(reject))
  })
}

const defaults = {
  headers: {},
  throwHttpErrors: true,
  credentials: 'same-origin',
  transformSearchParams: p => p
}

/**
 * @typedef {Object} APIOptions - creates a new type named 'SpecialType'
 * @prop {any} [body] - Request body
 * @prop {Object} [json] - JSON shortcut
 * @prop {string} [method] - GET, POST, PUT, DELETE, etc.
 * @prop {string} [base] - The base URL to use in case url is a relative URL
 * @prop {Headers|Record<string, string>} [headers] - Request header.
 * @prop {number} [timeout] - Amount of time until request should timeout in ms.
 * @prop {AbortSignal} [signal] - Signal to abort the request.
 * @prop {URLSearchParams|Object} [searchParams] - URL search param.
 * @prop {string} [credentials]
 * @prop {boolean} [throwHttpErrors]
 * @prop {function(URLSearchParams): URLSearchParams } [transformSearchParams]
 * @prop {function(any): any} [transform] - When iterating the response body, transform each chunk with this function.
 * @prop {function(Response): Promise<void>} [handleError] - Handle errors
 * @prop {function({total:number, loaded:number, lengthComputable:boolean}):void} [onUploadProgress] - Can be passed to track upload progress
 * @prop {function({total:number, loaded:number, lengthComputable:boolean}):void} [onDownloadProgress] - Can be passed to track download progress
 */

class HTTP {
  /**
   *
   * @param {APIOptions} options
   */
  constructor (options = {}) {
    /** @type {APIOptions} */
    this.opts = merge(defaults, options)
  }

  /**
   * Fetch
   *
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  async fetch (resource, options = {}) {
    /** @type {APIOptions} */
    const opts = merge(this.opts, options)
    opts.headers = new Headers(opts.headers)

    // validate resource type
    if (typeof resource !== 'string' && !(resource instanceof URL || resource instanceof Request)) {
      throw new TypeError('`resource` must be a string, URL, or Request')
    }

    // validate resource format and normalize with prefixUrl
    if (opts.base && typeof opts.base === 'string' && typeof resource === 'string') {
      if (resource.startsWith('/')) {
        throw new Error('`resource` must not begin with a slash when using `base`')
      }

      if (!opts.base.endsWith('/')) {
        opts.base += '/'
      }

      resource = opts.base + resource
    }

    // TODO: try to remove the logic above or fix URL instance input without trailing '/'
    const url = new URL(resource, opts.base)

    if (opts.searchParams) {
      url.search = opts.transformSearchParams(new URLSearchParams(opts.searchParams))
    }

    if (opts.json !== undefined) {
      opts.body = JSON.stringify(opts.json)
      opts.headers.set('content-type', 'application/json')
    }

    const abortController = new AbortController()
    const signal = anySignal([abortController.signal, opts.signal])

    const response = await timeout(fetch(url, {
      ...opts,
      signal,
      timeout: undefined
    }), opts.timeout, abortController)

    if (!response.ok && opts.throwHttpErrors) {
      if (opts.handleError) {
        await opts.handleError(response)
      }
      throw new HTTPError(response)
    }

    response.iterator = function () {
      const it = streamToAsyncIterator(response.body)

      if (!isAsyncIterator(it)) {
        throw new Error('Can\'t convert fetch body into a Async Iterator:')
      }

      return it
    }

    response.ndjson = async function * () {
      for await (const chunk of ndjson(response.iterator())) {
        if (options.transform) {
          yield options.transform(chunk)
        } else {
          yield chunk
        }
      }
    }

    return response
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  post (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'POST'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  get (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'GET'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  put (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'PUT'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  delete (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'DELETE'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  options (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'OPTIONS'
    })
  }
}

/**
 * Parses NDJSON chunks from an iterator
 *
 * @param {AsyncGenerator<Uint8Array, void, any>} source
 * @returns {AsyncGenerator<Object, void, any>}
 */
const ndjson = async function * (source) {
  const decoder = new TextDecoder()
  let buf = ''

  for await (const chunk of source) {
    buf += decoder.decode(chunk, { stream: true })
    const lines = buf.split(/\r?\n/)

    for (let i = 0; i < lines.length - 1; i++) {
      const l = lines[i].trim()
      if (l.length > 0) {
        yield JSON.parse(l)
      }
    }
    buf = lines[lines.length - 1]
  }
  buf += decoder.decode()
  buf = buf.trim()
  if (buf.length !== 0) {
    yield JSON.parse(buf)
  }
}

const streamToAsyncIterator = function (source) {
  if (isAsyncIterator(source)) {
    // Workaround for https://github.com/node-fetch/node-fetch/issues/766
    if (Object.prototype.hasOwnProperty.call(source, 'readable') && Object.prototype.hasOwnProperty.call(source, 'writable')) {
      const iter = source[Symbol.asyncIterator]()

      const wrapper = {
        next: iter.next.bind(iter),
        return: () => {
          source.destroy()

          return iter.return()
        },
        [Symbol.asyncIterator]: () => {
          return wrapper
        }
      }

      return wrapper
    }

    return source
  }

  const reader = source.getReader()

  return {
    next () {
      return reader.read()
    },
    return () {
      reader.releaseLock()
      return {}
    },
    [Symbol.asyncIterator] () {
      return this
    }
  }
}

const isAsyncIterator = (obj) => {
  return typeof obj === 'object' &&
  obj !== null &&
  // typeof obj.next === 'function' &&
  typeof obj[Symbol.asyncIterator] === 'function'
}

HTTP.HTTPError = HTTPError
HTTP.TimeoutError = TimeoutError
HTTP.streamToAsyncIterator = streamToAsyncIterator

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.post = (resource, options) => new HTTP(options).post(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.get = (resource, options) => new HTTP(options).get(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.put = (resource, options) => new HTTP(options).put(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.delete = (resource, options) => new HTTP(options).delete(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.options = (resource, options) => new HTTP(options).options(resource, options)

module.exports = HTTP


/***/ }),

/***/ "aDK8":
/*!**************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bootstrap/clear.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('bootstrap/rm', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options,
        all: true
      }),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "aqcA":
/*!*****************************************************!*\
  !*** ./node_modules/iso-constants/index.browser.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = {
    'RTLD_LAZY': 1,
    'RTLD_NOW': 2,
    'RTLD_GLOBAL': 256,
    'RTLD_LOCAL': 0,
    'RTLD_DEEPBIND': 8,
    'E2BIG': 7,
    'EACCES': 13,
    'EADDRINUSE': 98,
    'EADDRNOTAVAIL': 99,
    'EAFNOSUPPORT': 97,
    'EAGAIN': 11,
    'EALREADY': 114,
    'EBADF': 9,
    'EBADMSG': 74,
    'EBUSY': 16,
    'ECANCELED': 125,
    'ECHILD': 10,
    'ECONNABORTED': 103,
    'ECONNREFUSED': 111,
    'ECONNRESET': 104,
    'EDEADLK': 35,
    'EDESTADDRREQ': 89,
    'EDOM': 33,
    'EDQUOT': 122,
    'EEXIST': 17,
    'EFAULT': 14,
    'EFBIG': 27,
    'EHOSTUNREACH': 113,
    'EIDRM': 43,
    'EILSEQ': 84,
    'EINPROGRESS': 115,
    'EINTR': 4,
    'EINVAL': 22,
    'EIO': 5,
    'EISCONN': 106,
    'EISDIR': 21,
    'ELOOP': 40,
    'EMFILE': 24,
    'EMLINK': 31,
    'EMSGSIZE': 90,
    'EMULTIHOP': 72,
    'ENAMETOOLONG': 36,
    'ENETDOWN': 100,
    'ENETRESET': 102,
    'ENETUNREACH': 101,
    'ENFILE': 23,
    'ENOBUFS': 105,
    'ENODATA': 61,
    'ENODEV': 19,
    'ENOENT': 2,
    'ENOEXEC': 8,
    'ENOLCK': 37,
    'ENOLINK': 67,
    'ENOMEM': 12,
    'ENOMSG': 42,
    'ENOPROTOOPT': 92,
    'ENOSPC': 28,
    'ENOSR': 63,
    'ENOSTR': 60,
    'ENOSYS': 38,
    'ENOTCONN': 107,
    'ENOTDIR': 20,
    'ENOTEMPTY': 39,
    'ENOTSOCK': 88,
    'ENOTSUP': 95,
    'ENOTTY': 25,
    'ENXIO': 6,
    'EOPNOTSUPP': 95,
    'EOVERFLOW': 75,
    'EPERM': 1,
    'EPIPE': 32,
    'EPROTO': 71,
    'EPROTONOSUPPORT': 93,
    'EPROTOTYPE': 91,
    'ERANGE': 34,
    'EROFS': 30,
    'ESPIPE': 29,
    'ESRCH': 3,
    'ESTALE': 116,
    'ETIME': 62,
    'ETIMEDOUT': 110,
    'ETXTBSY': 26,
    'EWOULDBLOCK': 11,
    'EXDEV': 18,
    'PRIORITY_LOW': 19,
    'PRIORITY_BELOW_NORMAL': 10,
    'PRIORITY_NORMAL': 0,
    'PRIORITY_ABOVE_NORMAL': -7,
    'PRIORITY_HIGH': -14,
    'PRIORITY_HIGHEST': -20,
    'SIGHUP': 1,
    'SIGINT': 2,
    'SIGQUIT': 3,
    'SIGILL': 4,
    'SIGTRAP': 5,
    'SIGABRT': 6,
    'SIGIOT': 6,
    'SIGBUS': 7,
    'SIGFPE': 8,
    'SIGKILL': 9,
    'SIGUSR1': 10,
    'SIGSEGV': 11,
    'SIGUSR2': 12,
    'SIGPIPE': 13,
    'SIGALRM': 14,
    'SIGTERM': 15,
    'SIGCHLD': 17,
    'SIGSTKFLT': 16,
    'SIGCONT': 18,
    'SIGSTOP': 19,
    'SIGTSTP': 20,
    'SIGTTIN': 21,
    'SIGTTOU': 22,
    'SIGURG': 23,
    'SIGXCPU': 24,
    'SIGXFSZ': 25,
    'SIGVTALRM': 26,
    'SIGPROF': 27,
    'SIGWINCH': 28,
    'SIGIO': 29,
    'SIGPOLL': 29,
    'SIGPWR': 30,
    'SIGSYS': 31,
    'SIGUNUSED': 31,
    'UV_FS_SYMLINK_DIR': 1,
    'UV_FS_SYMLINK_JUNCTION': 2,
    'O_RDONLY': 0,
    'O_WRONLY': 1,
    'O_RDWR': 2,
    'UV_DIRENT_UNKNOWN': 0,
    'UV_DIRENT_FILE': 1,
    'UV_DIRENT_DIR': 2,
    'UV_DIRENT_LINK': 3,
    'UV_DIRENT_FIFO': 4,
    'UV_DIRENT_SOCKET': 5,
    'UV_DIRENT_CHAR': 6,
    'UV_DIRENT_BLOCK': 7,
    'S_IFMT': 61440,
    'S_IFREG': 32768,
    'S_IFDIR': 16384,
    'S_IFCHR': 8192,
    'S_IFBLK': 24576,
    'S_IFIFO': 4096,
    'S_IFLNK': 40960,
    'S_IFSOCK': 49152,
    'O_CREAT': 64,
    'O_EXCL': 128,
    'UV_FS_O_FILEMAP': 0,
    'O_NOCTTY': 256,
    'O_TRUNC': 512,
    'O_APPEND': 1024,
    'O_DIRECTORY': 65536,
    'O_NOATIME': 262144,
    'O_NOFOLLOW': 131072,
    'O_SYNC': 1052672,
    'O_DSYNC': 4096,
    'O_DIRECT': 16384,
    'O_NONBLOCK': 2048,
    'S_IRWXU': 448,
    'S_IRUSR': 256,
    'S_IWUSR': 128,
    'S_IXUSR': 64,
    'S_IRWXG': 56,
    'S_IRGRP': 32,
    'S_IWGRP': 16,
    'S_IXGRP': 8,
    'S_IRWXO': 7,
    'S_IROTH': 4,
    'S_IWOTH': 2,
    'S_IXOTH': 1,
    'F_OK': 0,
    'R_OK': 4,
    'W_OK': 2,
    'X_OK': 1,
    'UV_FS_COPYFILE_EXCL': 1,
    'COPYFILE_EXCL': 1,
    'UV_FS_COPYFILE_FICLONE': 2,
    'COPYFILE_FICLONE': 2,
    'UV_FS_COPYFILE_FICLONE_FORCE': 4,
    'COPYFILE_FICLONE_FORCE': 4,
    'OPENSSL_VERSION_NUMBER': 269488319,
    'SSL_OP_ALL': 2147485780,
    'SSL_OP_ALLOW_NO_DHE_KEX': 1024,
    'SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION': 262144,
    'SSL_OP_CIPHER_SERVER_PREFERENCE': 4194304,
    'SSL_OP_CISCO_ANYCONNECT': 32768,
    'SSL_OP_COOKIE_EXCHANGE': 8192,
    'SSL_OP_CRYPTOPRO_TLSEXT_BUG': 2147483648,
    'SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS': 2048,
    'SSL_OP_EPHEMERAL_RSA': 0,
    'SSL_OP_LEGACY_SERVER_CONNECT': 4,
    'SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER': 0,
    'SSL_OP_MICROSOFT_SESS_ID_BUG': 0,
    'SSL_OP_MSIE_SSLV2_RSA_PADDING': 0,
    'SSL_OP_NETSCAPE_CA_DN_BUG': 0,
    'SSL_OP_NETSCAPE_CHALLENGE_BUG': 0,
    'SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG': 0,
    'SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG': 0,
    'SSL_OP_NO_COMPRESSION': 131072,
    'SSL_OP_NO_ENCRYPT_THEN_MAC': 524288,
    'SSL_OP_NO_QUERY_MTU': 4096,
    'SSL_OP_NO_RENEGOTIATION': 1073741824,
    'SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION': 65536,
    'SSL_OP_NO_SSLv2': 0,
    'SSL_OP_NO_SSLv3': 33554432,
    'SSL_OP_NO_TICKET': 16384,
    'SSL_OP_NO_TLSv1': 67108864,
    'SSL_OP_NO_TLSv1_1': 268435456,
    'SSL_OP_NO_TLSv1_2': 134217728,
    'SSL_OP_NO_TLSv1_3': 536870912,
    'SSL_OP_PKCS1_CHECK_1': 0,
    'SSL_OP_PKCS1_CHECK_2': 0,
    'SSL_OP_PRIORITIZE_CHACHA': 2097152,
    'SSL_OP_SINGLE_DH_USE': 0,
    'SSL_OP_SINGLE_ECDH_USE': 0,
    'SSL_OP_SSLEAY_080_CLIENT_DH_BUG': 0,
    'SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG': 0,
    'SSL_OP_TLS_BLOCK_PADDING_BUG': 0,
    'SSL_OP_TLS_D5_BUG': 0,
    'SSL_OP_TLS_ROLLBACK_BUG': 8388608,
    'ENGINE_METHOD_RSA': 1,
    'ENGINE_METHOD_DSA': 2,
    'ENGINE_METHOD_DH': 4,
    'ENGINE_METHOD_RAND': 8,
    'ENGINE_METHOD_EC': 2048,
    'ENGINE_METHOD_CIPHERS': 64,
    'ENGINE_METHOD_DIGESTS': 128,
    'ENGINE_METHOD_PKEY_METHS': 512,
    'ENGINE_METHOD_PKEY_ASN1_METHS': 1024,
    'ENGINE_METHOD_ALL': 65535,
    'ENGINE_METHOD_NONE': 0,
    'DH_CHECK_P_NOT_SAFE_PRIME': 2,
    'DH_CHECK_P_NOT_PRIME': 1,
    'DH_UNABLE_TO_CHECK_GENERATOR': 4,
    'DH_NOT_SUITABLE_GENERATOR': 8,
    'ALPN_ENABLED': 1,
    'RSA_PKCS1_PADDING': 1,
    'RSA_SSLV23_PADDING': 2,
    'RSA_NO_PADDING': 3,
    'RSA_PKCS1_OAEP_PADDING': 4,
    'RSA_X931_PADDING': 5,
    'RSA_PKCS1_PSS_PADDING': 6,
    'RSA_PSS_SALTLEN_DIGEST': -1,
    'RSA_PSS_SALTLEN_MAX_SIGN': -2,
    'RSA_PSS_SALTLEN_AUTO': -2,
    'defaultCoreCipherList': 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
    'TLS1_VERSION': 769,
    'TLS1_1_VERSION': 770,
    'TLS1_2_VERSION': 771,
    'TLS1_3_VERSION': 772,
    'POINT_CONVERSION_COMPRESSED': 2,
    'POINT_CONVERSION_UNCOMPRESSED': 4,
    'POINT_CONVERSION_HYBRID': 6
};



/***/ }),

/***/ "b/+6":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dag/resolve.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (ipfsPath, options = {}) => {
    const res = await api.post('dag/resolve', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${ipfsPath}${options.path ? `/${options.path}`.replace(/\/[/]+/g, '/') : ''}`,
        ...options
      }),
      headers: options.headers
    })

    const data = await res.json()

    return { cid: new CID(data.Cid['/']), remainderPath: data.RemPath }
  }
})


/***/ }),

/***/ "bKHj":
/*!******************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-node/sortLinks.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const sort = __webpack_require__(/*! stable */ "fgPD")

const linkSort = (a, b) => {
  return Buffer.compare(a.nameAsBuffer, b.nameAsBuffer)
}

/**
 *
 * @param {Array} links
 * @returns {Array}
 */
const sortLinks = (links) => {
  return sort(links, linkSort)
}

module.exports = sortLinks


/***/ }),

/***/ "ce/j":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/rm.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const { findSources } = __webpack_require__(/*! ./utils */ "1upd")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (...args) => {
    const { sources, options } = findSources(args)

    const res = await api.post('files/rm', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: sources,
        ...options
      }),
      headers: options.headers
    })

    await res.text()
  }
})


/***/ }),

/***/ "d2a1":
/*!******************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/object-to-camel.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Convert object properties to camel case.
// NOT recursive!
// e.g.
// AgentVersion => agentVersion
// ID => id
module.exports = obj => {
  if (obj == null) return obj
  const caps = /^[A-Z]+$/
  return Object.keys(obj).reduce((camelObj, k) => {
    if (caps.test(k)) { // all caps
      camelObj[k.toLowerCase()] = obj[k]
    } else if (caps.test(k[0])) { // pascal
      camelObj[k[0].toLowerCase() + k.slice(1)] = obj[k]
    } else {
      camelObj[k] = obj[k]
    }
    return camelObj
  }, {})
}


/***/ }),

/***/ "d9A7":
/*!****************************************************************************!*\
  !*** ./node_modules/ipld-raw/node_modules/multihashing-async/src/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const errcode = __webpack_require__(/*! err-code */ "tqrP")
const multihash = __webpack_require__(/*! multihashes */ "yP9g")
const crypto = __webpack_require__(/*! ./crypto */ "WkWz")

/**
 * Hash the given `buf` using the algorithm specified by `alg`.
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} alg - The algorithm to use eg 'sha1'
 * @param {number} [length] - Optionally trim the result to this length.
 * @returns {Promise<Buffer>}
 */
async function Multihashing (buf, alg, length) {
  const digest = await Multihashing.digest(buf, alg, length)
  return multihash.encode(digest, alg, length)
}

/**
 * The `buffer` module for easy use in the browser.
 *
 * @type {Buffer}
 */
Multihashing.Buffer = Buffer // for browser things

/**
 * Expose multihash itself, to avoid silly double requires.
 */
Multihashing.multihash = multihash

/**
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} alg - The algorithm to use eg 'sha1'
 * @param {number} [length] - Optionally trim the result to this length.
 * @returns {Promise<Buffer>}
 */
Multihashing.digest = async (buf, alg, length) => {
  const hash = Multihashing.createHash(alg)
  const digest = await hash(buf)
  return length ? digest.slice(0, length) : digest
}

/**
 * Creates a function that hashes with the given algorithm
 *
 * @param {string|number} alg - The algorithm to use eg 'sha1'
 *
 * @returns {function} - The hash function corresponding to `alg`
 */
Multihashing.createHash = function (alg) {
  if (!alg) {
    throw errcode(new Error('hash algorithm must be specified'), 'ERR_HASH_ALGORITHM_NOT_SPECIFIED')
  }

  alg = multihash.coerceCode(alg)
  if (!Multihashing.functions[alg]) {
    throw errcode(new Error(`multihash function '${alg}' not yet supported`), 'ERR_HASH_ALGORITHM_NOT_SUPPORTED')
  }

  return Multihashing.functions[alg]
}

/**
 * Mapping of multihash codes to their hashing functions.
 * @type {Object}
 */
Multihashing.functions = {
  // identity
  0x00: crypto.identity,
  // sha1
  0x11: crypto.sha1,
  // sha2-256
  0x12: crypto.sha2256,
  // sha2-512
  0x13: crypto.sha2512,
  // sha3-512
  0x14: crypto.sha3512,
  // sha3-384
  0x15: crypto.sha3384,
  // sha3-256
  0x16: crypto.sha3256,
  // sha3-224
  0x17: crypto.sha3224,
  // shake-128
  0x18: crypto.shake128,
  // shake-256
  0x19: crypto.shake256,
  // keccak-224
  0x1A: crypto.keccak224,
  // keccak-256
  0x1B: crypto.keccak256,
  // keccak-384
  0x1C: crypto.keccak384,
  // keccak-512
  0x1D: crypto.keccak512,
  // murmur3-128
  0x22: crypto.murmur3128,
  // murmur3-32
  0x23: crypto.murmur332,
  // dbl-sha2-256
  0x56: crypto.dblSha2256
}

// add blake functions
crypto.addBlake(Multihashing.functions)

Multihashing.validate = async (buf, hash) => {
  const newHash = await Multihashing(buf, multihash.decode(hash).name)

  return Buffer.compare(hash, newHash) === 0
}

module.exports = Multihashing


/***/ }),

/***/ "dKtH":
/*!*****************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/log/ls.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('log/ls', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    const data = await res.json()
    return data.Strings
  }
})


/***/ }),

/***/ "dP3G":
/*!******************************************!*\
  !*** ./node_modules/any-signal/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const AbortController = __webpack_require__(/*! ./abort-controller */ "DeBz")

/**
 * Takes an array of AbortSignals and returns a single signal.
 * If any signals are aborted, the returned signal will be aborted.
 * @param {Array<AbortSignal>} signals
 * @returns {AbortSignal}
 */
function anySignal (signals) {
  const controller = new AbortController()

  function onAbort () {
    controller.abort()

    for (const signal of signals) {
      if (!signal || !signal.removeEventListener) continue
      signal.removeEventListener('abort', onAbort)
    }
  }

  for (const signal of signals) {
    if (!signal || !signal.addEventListener) continue
    if (signal.aborted) {
      onAbort()
      break
    }
    signal.addEventListener('abort', onAbort)
  }

  return controller.signal
}

module.exports = anySignal
module.exports.anySignal = anySignal


/***/ }),

/***/ "dPKy":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/add-all.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const toCamel = __webpack_require__(/*! ./lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const multipartRequest = __webpack_require__(/*! ./lib/multipart-request */ "VWqr")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure((api) => {
  return async function * addAll (input, options = {}) {
    const progressFn = options.progress

    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const res = await api.post('add', {
      searchParams: toUrlSearchParams({
        'stream-channels': true,
        ...options,
        progress: Boolean(progressFn)
      }),
      timeout: options.timeout,
      signal,
      ...(
        await multipartRequest(input, controller, options.headers)
      )
    })

    for await (let file of res.ndjson()) {
      file = toCamel(file)

      if (progressFn && file.bytes) {
        progressFn(file.bytes)
      } else {
        yield toCoreInterface(file)
      }
    }
  }
})

function toCoreInterface ({ name, hash, size, mode, mtime, mtimeNsecs }) {
  const output = {
    path: name,
    cid: new CID(hash),
    size: parseInt(size)
  }

  if (mode != null) {
    output.mode = parseInt(mode, 8)
  }

  if (mtime != null) {
    output.mtime = {
      secs: mtime,
      nsecs: mtimeNsecs || 0
    }
  }

  return output
}


/***/ }),

/***/ "drbO":
/*!*********************************************!*\
  !*** ./node_modules/it-tar/pack-headers.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

var alloc = Buffer.alloc

var ZEROS = '0000000000000000000'
var SEVENS = '7777777777777777777'
var ZERO_OFFSET = '0'.charCodeAt(0)
var USTAR_MAGIC = Buffer.from('ustar\x00', 'binary')
var USTAR_VER = Buffer.from('00', 'binary')
var MASK = parseInt('7777', 8)
var MAGIC_OFFSET = 257
var VERSION_OFFSET = 263

var toTypeflag = function (flag) {
  switch (flag) {
    case 'file':
      return 0
    case 'link':
      return 1
    case 'symlink':
      return 2
    case 'character-device':
      return 3
    case 'block-device':
      return 4
    case 'directory':
      return 5
    case 'fifo':
      return 6
    case 'contiguous-file':
      return 7
    case 'pax-header':
      return 72
  }

  return 0
}

var cksum = function (block) {
  var sum = 8 * 32
  for (var i = 0; i < 148; i++) sum += block[i]
  for (var j = 156; j < 512; j++) sum += block[j]
  return sum
}

var encodeOct = function (val, n) {
  val = val.toString(8)
  if (val.length > n) return SEVENS.slice(0, n) + ' '
  else return ZEROS.slice(0, n - val.length) + val + ' '
}

var addLength = function (str) {
  var len = Buffer.byteLength(str)
  var digits = Math.floor(Math.log(len) / Math.log(10)) + 1
  if (len + digits >= Math.pow(10, digits)) digits++

  return (len + digits) + str
}

exports.encodePax = function (opts) { // TODO: encode more stuff in pax
  var result = ''
  if (opts.name) result += addLength(' path=' + opts.name + '\n')
  if (opts.linkname) result += addLength(' linkpath=' + opts.linkname + '\n')
  var pax = opts.pax
  if (pax) {
    for (var key in pax) {
      result += addLength(' ' + key + '=' + pax[key] + '\n')
    }
  }
  return Buffer.from(result)
}

exports.encode = function (opts) {
  var buf = alloc(512)
  var name = opts.name
  var prefix = ''

  if (opts.typeflag === 5 && name[name.length - 1] !== '/') name += '/'
  if (Buffer.byteLength(name) !== name.length) return null // utf-8

  while (Buffer.byteLength(name) > 100) {
    var i = name.indexOf('/')
    if (i === -1) return null
    prefix += prefix ? '/' + name.slice(0, i) : name.slice(0, i)
    name = name.slice(i + 1)
  }

  if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) return null
  if (opts.linkname && Buffer.byteLength(opts.linkname) > 100) return null

  buf.write(name)
  buf.write(encodeOct(opts.mode & MASK, 6), 100)
  buf.write(encodeOct(opts.uid, 6), 108)
  buf.write(encodeOct(opts.gid, 6), 116)
  buf.write(encodeOct(opts.size, 11), 124)
  buf.write(encodeOct((opts.mtime.getTime() / 1000) | 0, 11), 136)

  buf[156] = ZERO_OFFSET + toTypeflag(opts.type)

  if (opts.linkname) buf.write(opts.linkname, 157)

  USTAR_MAGIC.copy(buf, MAGIC_OFFSET)
  USTAR_VER.copy(buf, VERSION_OFFSET)
  if (opts.uname) buf.write(opts.uname, 265)
  if (opts.gname) buf.write(opts.gname, 297)
  buf.write(encodeOct(opts.devmajor || 0, 6), 329)
  buf.write(encodeOct(opts.devminor || 0, 6), 337)

  if (prefix) buf.write(prefix, 345)

  buf.write(encodeOct(cksum(buf), 6), 148)

  return buf
}


/***/ }),

/***/ "e18V":
/*!***************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bitswap/wantlist.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await (await api.post('bitswap/wantlist', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })).json()

    return (res.Keys || []).map(k => new CID(k['/']))
  }
})


/***/ }),

/***/ "eGpl":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/flush.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (path, options = {}) => {
    if (!path || typeof path !== 'string') {
      throw new Error('ipfs.files.flush requires a path')
    }

    const res = await api.post('files/flush', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return new CID(data.Cid)
  }
})


/***/ }),

/***/ "eWsV":
/*!*****************************************!*\
  !*** ./node_modules/it-reader/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BufferList = __webpack_require__(/*! bl/BufferList */ "XDq5")

module.exports = source => {
  const reader = (async function * () {
    let bytes = yield // Allows us to receive 8 when reader.next(8) is called
    let bl = new BufferList()

    for await (const chunk of source) {
      if (!bytes) {
        bytes = yield bl.append(chunk)
        bl = new BufferList()
        continue
      }

      bl.append(chunk)

      while (bl.length >= bytes) {
        const data = bl.shallowSlice(0, bytes)
        bl.consume(bytes)
        bytes = yield data

        // If we no longer want a specific byte length, we yield the rest now
        if (!bytes) {
          if (bl.length) {
            bytes = yield bl
            bl = new BufferList()
          }
          break // bytes is null and/or no more buffer to yield
        }
      }
    }

    // Consumer wants more bytes but the source has ended and our buffer
    // is not big enough to satisfy.
    if (bytes) {
      throw Object.assign(
        new Error(`stream ended before ${bytes} bytes became available`),
        { code: 'ERR_UNDER_READ', buffer: bl }
      )
    }
  })()

  reader.next()
  return reader
}


/***/ }),

/***/ "eYAs":
/*!*************************************************************!*\
  !*** ./node_modules/ipfs-utils/src/text-decoder.browser.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./globalthis */ "QZb+").TextDecoder


/***/ }),

/***/ "eZY8":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/write.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const modeToString = __webpack_require__(/*! ../lib/mode-to-string */ "JX3q")
const mtimeToObject = __webpack_require__(/*! ../lib/mtime-to-object */ "gq3O")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const multipartRequest = __webpack_require__(/*! ../lib/multipart-request */ "VWqr")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure(api => {
  return async (path, input, options = {}) => {
    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const res = await api.post('files/write', {
      timeout: options.timeout,
      signal,
      searchParams: toUrlSearchParams({
        arg: path,
        streamChannels: true,
        count: options.count || options.length,
        ...options
      }),
      ...(
        await multipartRequest({
          content: input,
          path: 'arg',
          mode: modeToString(options.mode),
          mtime: mtimeToObject(options.mtime)
        }, controller, options.headers)
      )
    })

    await res.text()
  }
})


/***/ }),

/***/ "ebln":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/mint-card/mint-card.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n    <ion-toolbar color=\"primary\">\n        <ion-title>Mintar carta</ion-title>\n        <ion-title size=\"small\">CCG Marketplace</ion-title>\n\n        <ion-buttons slot=\"start\">\n          <ion-menu-button></ion-menu-button>\n        </ion-buttons>\n      \n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <div style=\"padding: 10px;\">\n       <app-mint-card-form></app-mint-card-form>\n    </div>\n    \n</ion-content>\n");

/***/ }),

/***/ "eue8":
/*!**************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pubsub/subscription-tracker.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

class SubscriptionTracker {
  constructor () {
    this._subs = new Map()
  }

  static singleton () {
    if (SubscriptionTracker.instance) return SubscriptionTracker.instance
    SubscriptionTracker.instance = new SubscriptionTracker()
    return SubscriptionTracker.instance
  }

  subscribe (topic, handler, signal) {
    const topicSubs = this._subs.get(topic) || []

    if (topicSubs.find(s => s.handler === handler)) {
      throw new Error(`Already subscribed to ${topic} with this handler`)
    }

    // Create controller so a call to unsubscribe can cancel the request
    const controller = new AbortController()

    this._subs.set(topic, [{ handler, controller }].concat(topicSubs))

    // If there is an external signal, forward the abort event
    if (signal) {
      signal.addEventListener('abort', () => this.unsubscribe(topic, handler))
    }

    return controller.signal
  }

  unsubscribe (topic, handler) {
    const subs = this._subs.get(topic) || []
    let unsubs

    if (handler) {
      this._subs.set(topic, subs.filter(s => s.handler !== handler))
      unsubs = subs.filter(s => s.handler === handler)
    } else {
      this._subs.set(topic, [])
      unsubs = subs
    }

    unsubs.forEach(s => s.controller.abort())
  }
}

SubscriptionTracker.instance = null

module.exports = SubscriptionTracker


/***/ }),

/***/ "evf3":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/*! exports provided: urlAlphabet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlAlphabet", function() { return urlAlphabet; });
// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet =
  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'




/***/ }),

/***/ "f5lt":
/*!*****************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/name/pubsub/cancel.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (name, options = {}) => {
    const res = await api.post('name/pubsub/cancel', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name,
        ...options
      }),
      headers: options.headers
    })

    return toCamel(await res.json())
  }
})


/***/ }),

/***/ "fAHA":
/*!*********************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/serialize.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const protons = __webpack_require__(/*! protons */ "lqh9")
const proto = protons(__webpack_require__(/*! ./dag.proto.js */ "S2GJ"))
const DAGLink = __webpack_require__(/*! ./dag-link/dagLink */ "i5gV")

exports = module.exports

const toProtoBuf = (node) => {
  const pbn = {}

  if (node.Data && node.Data.length > 0) {
    pbn.Data = node.Data
  } else {
    // NOTE: this has to be null in order to match go-ipfs serialization
    // `null !== new Buffer(0)`
    pbn.Data = null
  }

  if (node.Links && node.Links.length > 0) {
    pbn.Links = node.Links
      .map((link) => ({
        Hash: link.Hash.buffer,
        Name: link.Name,
        Tsize: link.Tsize
      }))
  } else {
    pbn.Links = null
  }

  return pbn
}

/**
 * Serialize internal representation into a binary PB block.
 *
 * @param {Object} node - Internal representation of a PB block
 * @returns {Buffer} - The encoded binary representation
 */
const serializeDAGNode = (node) => {
  const data = node.Data
  const links = node.Links || []

  const serialized = proto.PBNode.encode(toProtoBuf({
    Data: data,
    Links: links
  }))

  return serialized
}

// Serialize an object where the `Links` might not be a `DAGLink` instance yet
const serializeDAGNodeLike = (data, links = []) => {
  const node = { Data: data }
  node.Links = links.map((link) => {
    return DAGLink.isDAGLink(link)
      ? link
      : DAGLink.util.createDagLinkFromB58EncodedHash(link)
  })
  return serializeDAGNode(node)
}

exports.serializeDAGNode = serializeDAGNode
exports.serializeDAGNodeLike = serializeDAGNodeLike


/***/ }),

/***/ "fgPD":
/*!***************************************!*\
  !*** ./node_modules/stable/stable.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//! stable.js 0.1.8, https://github.com/Two-Screen/stable
//! © 2018 Angry Bytes and contributors. MIT licensed.

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

  // A stable array sort, because `Array#sort()` is not guaranteed stable.
  // This is an implementation of merge sort, without recursion.

  var stable = function (arr, comp) {
    return exec(arr.slice(), comp)
  };

  stable.inplace = function (arr, comp) {
    var result = exec(arr, comp);

    // This simply copies back if the result isn't in the original array,
    // which happens on an odd number of passes.
    if (result !== arr) {
      pass(result, null, arr.length, arr);
    }

    return arr
  };

  // Execute the sort using the input array and a second buffer as work space.
  // Returns one of those two, containing the final result.
  function exec(arr, comp) {
    if (typeof(comp) !== 'function') {
      comp = function (a, b) {
        return String(a).localeCompare(b)
      };
    }

    // Short-circuit when there's nothing to sort.
    var len = arr.length;
    if (len <= 1) {
      return arr
    }

    // Rather than dividing input, simply iterate chunks of 1, 2, 4, 8, etc.
    // Chunks are the size of the left or right hand in merge sort.
    // Stop when the left-hand covers all of the array.
    var buffer = new Array(len);
    for (var chk = 1; chk < len; chk *= 2) {
      pass(arr, comp, chk, buffer);

      var tmp = arr;
      arr = buffer;
      buffer = tmp;
    }

    return arr
  }

  // Run a single pass with the given chunk size.
  var pass = function (arr, comp, chk, result) {
    var len = arr.length;
    var i = 0;
    // Step size / double chunk size.
    var dbl = chk * 2;
    // Bounds of the left and right chunks.
    var l, r, e;
    // Iterators over the left and right chunk.
    var li, ri;

    // Iterate over pairs of chunks.
    for (l = 0; l < len; l += dbl) {
      r = l + chk;
      e = r + chk;
      if (r > len) r = len;
      if (e > len) e = len;

      // Iterate both chunks in parallel.
      li = l;
      ri = r;
      while (true) {
        // Compare the chunks.
        if (li < r && ri < e) {
          // This works for a regular `sort()` compatible comparator,
          // but also for a simple comparator like: `a > b`
          if (comp(arr[li], arr[ri]) <= 0) {
            result[i++] = arr[li++];
          }
          else {
            result[i++] = arr[ri++];
          }
        }
        // Nothing to compare, just flush what's left.
        else if (li < r) {
          result[i++] = arr[li++];
        }
        else if (ri < e) {
          result[i++] = arr[ri++];
        }
        // Both iterators are at the chunk ends.
        else {
          break
        }
      }
    }
  };

  return stable;

})));


/***/ }),

/***/ "fsky":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/mkdir.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (path, options = {}) => {
    const res = await api.post('files/mkdir', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    })

    await res.text()
  }
})


/***/ }),

/***/ "gYz7":
/*!**********************************************!*\
  !*** ./node_modules/borc/src/decoder.asm.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable */

module.exports = function decodeAsm (stdlib, foreign, buffer) {
  'use asm'

  // -- Imports

  var heap = new stdlib.Uint8Array(buffer)
  // var log = foreign.log
  var pushInt = foreign.pushInt
  var pushInt32 = foreign.pushInt32
  var pushInt32Neg = foreign.pushInt32Neg
  var pushInt64 = foreign.pushInt64
  var pushInt64Neg = foreign.pushInt64Neg
  var pushFloat = foreign.pushFloat
  var pushFloatSingle = foreign.pushFloatSingle
  var pushFloatDouble = foreign.pushFloatDouble
  var pushTrue = foreign.pushTrue
  var pushFalse = foreign.pushFalse
  var pushUndefined = foreign.pushUndefined
  var pushNull = foreign.pushNull
  var pushInfinity = foreign.pushInfinity
  var pushInfinityNeg = foreign.pushInfinityNeg
  var pushNaN = foreign.pushNaN
  var pushNaNNeg = foreign.pushNaNNeg

  var pushArrayStart = foreign.pushArrayStart
  var pushArrayStartFixed = foreign.pushArrayStartFixed
  var pushArrayStartFixed32 = foreign.pushArrayStartFixed32
  var pushArrayStartFixed64 = foreign.pushArrayStartFixed64
  var pushObjectStart = foreign.pushObjectStart
  var pushObjectStartFixed = foreign.pushObjectStartFixed
  var pushObjectStartFixed32 = foreign.pushObjectStartFixed32
  var pushObjectStartFixed64 = foreign.pushObjectStartFixed64

  var pushByteString = foreign.pushByteString
  var pushByteStringStart = foreign.pushByteStringStart
  var pushUtf8String = foreign.pushUtf8String
  var pushUtf8StringStart = foreign.pushUtf8StringStart

  var pushSimpleUnassigned = foreign.pushSimpleUnassigned

  var pushTagStart = foreign.pushTagStart
  var pushTagStart4 = foreign.pushTagStart4
  var pushTagStart8 = foreign.pushTagStart8
  var pushTagUnassigned = foreign.pushTagUnassigned

  var pushBreak = foreign.pushBreak

  var pow = stdlib.Math.pow

  // -- Constants


  // -- Mutable Variables

  var offset = 0
  var inputLength = 0
  var code = 0

  // Decode a cbor string represented as Uint8Array
  // which is allocated on the heap from 0 to inputLength
  //
  // input - Int
  //
  // Returns Code - Int,
  // Success = 0
  // Error > 0
  function parse (input) {
    input = input | 0

    offset = 0
    inputLength = input

    while ((offset | 0) < (inputLength | 0)) {
      code = jumpTable[heap[offset] & 255](heap[offset] | 0) | 0

      if ((code | 0) > 0) {
        break
      }
    }

    return code | 0
  }

  // -- Helper Function

  function checkOffset (n) {
    n = n | 0

    if ((((offset | 0) + (n | 0)) | 0) < (inputLength | 0)) {
      return 0
    }

    return 1
  }

  function readUInt16 (n) {
    n = n | 0

    return (
      (heap[n | 0] << 8) | heap[(n + 1) | 0]
    ) | 0
  }

  function readUInt32 (n) {
    n = n | 0

    return (
      (heap[n | 0] << 24) | (heap[(n + 1) | 0] << 16) | (heap[(n + 2) | 0] << 8) | heap[(n + 3) | 0]
    ) | 0
  }

  // -- Initial Byte Handlers

  function INT_P (octet) {
    octet = octet | 0

    pushInt(octet | 0)

    offset = (offset + 1) | 0

    return 0
  }

  function UINT_P_8 (octet) {
    octet = octet | 0

    if (checkOffset(1) | 0) {
      return 1
    }

    pushInt(heap[(offset + 1) | 0] | 0)

    offset = (offset + 2) | 0

    return 0
  }

  function UINT_P_16 (octet) {
    octet = octet | 0

    if (checkOffset(2) | 0) {
      return 1
    }

    pushInt(
      readUInt16((offset + 1) | 0) | 0
    )

    offset = (offset + 3) | 0

    return 0
  }

  function UINT_P_32 (octet) {
    octet = octet | 0

    if (checkOffset(4) | 0) {
      return 1
    }

    pushInt32(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0
    )

    offset = (offset + 5) | 0

    return 0
  }

  function UINT_P_64 (octet) {
    octet = octet | 0

    if (checkOffset(8) | 0) {
      return 1
    }

    pushInt64(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0,
      readUInt16((offset + 5) | 0) | 0,
      readUInt16((offset + 7) | 0) | 0
    )

    offset = (offset + 9) | 0

    return 0
  }

  function INT_N (octet) {
    octet = octet | 0

    pushInt((-1 - ((octet - 32) | 0)) | 0)

    offset = (offset + 1) | 0

    return 0
  }

  function UINT_N_8 (octet) {
    octet = octet | 0

    if (checkOffset(1) | 0) {
      return 1
    }

    pushInt(
      (-1 - (heap[(offset + 1) | 0] | 0)) | 0
    )

    offset = (offset + 2) | 0

    return 0
  }

  function UINT_N_16 (octet) {
    octet = octet | 0

    var val = 0

    if (checkOffset(2) | 0) {
      return 1
    }

    val = readUInt16((offset + 1) | 0) | 0
    pushInt((-1 - (val | 0)) | 0)

    offset = (offset + 3) | 0

    return 0
  }

  function UINT_N_32 (octet) {
    octet = octet | 0

    if (checkOffset(4) | 0) {
      return 1
    }

    pushInt32Neg(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0
    )

    offset = (offset + 5) | 0

    return 0
  }

  function UINT_N_64 (octet) {
    octet = octet | 0

    if (checkOffset(8) | 0) {
      return 1
    }

    pushInt64Neg(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0,
      readUInt16((offset + 5) | 0) | 0,
      readUInt16((offset + 7) | 0) | 0
    )

    offset = (offset + 9) | 0

    return 0
  }

  function BYTE_STRING (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var step = 0

    step = (octet - 64) | 0
    if (checkOffset(step | 0) | 0) {
      return 1
    }

    start = (offset + 1) | 0
    end = (((offset + 1) | 0) + (step | 0)) | 0

    pushByteString(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function BYTE_STRING_8 (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var length = 0

    if (checkOffset(1) | 0) {
      return 1
    }

    length = heap[(offset + 1) | 0] | 0
    start = (offset + 2) | 0
    end = (((offset + 2) | 0) + (length | 0)) | 0

    if (checkOffset((length + 1) | 0) | 0) {
      return 1
    }

    pushByteString(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function BYTE_STRING_16 (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var length = 0

    if (checkOffset(2) | 0) {
      return 1
    }

    length = readUInt16((offset + 1) | 0) | 0
    start = (offset + 3) | 0
    end = (((offset + 3) | 0) + (length | 0)) | 0


    if (checkOffset((length + 2) | 0) | 0) {
      return 1
    }

    pushByteString(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function BYTE_STRING_32 (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var length = 0

    if (checkOffset(4) | 0) {
      return 1
    }

    length = readUInt32((offset + 1) | 0) | 0
    start = (offset + 5) | 0
    end = (((offset + 5) | 0) + (length | 0)) | 0


    if (checkOffset((length + 4) | 0) | 0) {
      return 1
    }

    pushByteString(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function BYTE_STRING_64 (octet) {
    // NOT IMPLEMENTED
    octet = octet | 0

    return 1
  }

  function BYTE_STRING_BREAK (octet) {
    octet = octet | 0

    pushByteStringStart()

    offset = (offset + 1) | 0

    return 0
  }

  function UTF8_STRING (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var step = 0

    step = (octet - 96) | 0

    if (checkOffset(step | 0) | 0) {
      return 1
    }

    start = (offset + 1) | 0
    end = (((offset + 1) | 0) + (step | 0)) | 0

    pushUtf8String(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function UTF8_STRING_8 (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var length = 0

    if (checkOffset(1) | 0) {
      return 1
    }

    length = heap[(offset + 1) | 0] | 0
    start = (offset + 2) | 0
    end = (((offset + 2) | 0) + (length | 0)) | 0

    if (checkOffset((length + 1) | 0) | 0) {
      return 1
    }

    pushUtf8String(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function UTF8_STRING_16 (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var length = 0

    if (checkOffset(2) | 0) {
      return 1
    }

    length = readUInt16((offset + 1) | 0) | 0
    start = (offset + 3) | 0
    end = (((offset + 3) | 0) + (length | 0)) | 0

    if (checkOffset((length + 2) | 0) | 0) {
      return 1
    }

    pushUtf8String(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function UTF8_STRING_32 (octet) {
    octet = octet | 0

    var start = 0
    var end = 0
    var length = 0

    if (checkOffset(4) | 0) {
      return 1
    }

    length = readUInt32((offset + 1) | 0) | 0
    start = (offset + 5) | 0
    end = (((offset + 5) | 0) + (length | 0)) | 0

    if (checkOffset((length + 4) | 0) | 0) {
      return 1
    }

    pushUtf8String(start | 0, end | 0)

    offset = end | 0

    return 0
  }

  function UTF8_STRING_64 (octet) {
    // NOT IMPLEMENTED
    octet = octet | 0

    return 1
  }

  function UTF8_STRING_BREAK (octet) {
    octet = octet | 0

    pushUtf8StringStart()

    offset = (offset + 1) | 0

    return 0
  }

  function ARRAY (octet) {
    octet = octet | 0

    pushArrayStartFixed((octet - 128) | 0)

    offset = (offset + 1) | 0

    return 0
  }

  function ARRAY_8 (octet) {
    octet = octet | 0

    if (checkOffset(1) | 0) {
      return 1
    }

    pushArrayStartFixed(heap[(offset + 1) | 0] | 0)

    offset = (offset + 2) | 0

    return 0
  }

  function ARRAY_16 (octet) {
    octet = octet | 0

    if (checkOffset(2) | 0) {
      return 1
    }

    pushArrayStartFixed(
      readUInt16((offset + 1) | 0) | 0
    )

    offset = (offset + 3) | 0

    return 0
  }

  function ARRAY_32 (octet) {
    octet = octet | 0

    if (checkOffset(4) | 0) {
      return 1
    }

    pushArrayStartFixed32(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0
    )

    offset = (offset + 5) | 0

    return 0
  }

  function ARRAY_64 (octet) {
    octet = octet | 0

    if (checkOffset(8) | 0) {
      return 1
    }

    pushArrayStartFixed64(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0,
      readUInt16((offset + 5) | 0) | 0,
      readUInt16((offset + 7) | 0) | 0
    )

    offset = (offset + 9) | 0

    return 0
  }

  function ARRAY_BREAK (octet) {
    octet = octet | 0

    pushArrayStart()

    offset = (offset + 1) | 0

    return 0
  }

  function MAP (octet) {
    octet = octet | 0

    var step = 0

    step = (octet - 160) | 0

    if (checkOffset(step | 0) | 0) {
      return 1
    }

    pushObjectStartFixed(step | 0)

    offset = (offset + 1) | 0

    return 0
  }

  function MAP_8 (octet) {
    octet = octet | 0

    if (checkOffset(1) | 0) {
      return 1
    }

    pushObjectStartFixed(heap[(offset + 1) | 0] | 0)

    offset = (offset + 2) | 0

    return 0
  }

  function MAP_16 (octet) {
    octet = octet | 0

    if (checkOffset(2) | 0) {
      return 1
    }

    pushObjectStartFixed(
      readUInt16((offset + 1) | 0) | 0
    )

    offset = (offset + 3) | 0

    return 0
  }

  function MAP_32 (octet) {
    octet = octet | 0

    if (checkOffset(4) | 0) {
      return 1
    }

    pushObjectStartFixed32(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0
    )

    offset = (offset + 5) | 0

    return 0
  }

  function MAP_64 (octet) {
    octet = octet | 0

    if (checkOffset(8) | 0) {
      return 1
    }

    pushObjectStartFixed64(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0,
      readUInt16((offset + 5) | 0) | 0,
      readUInt16((offset + 7) | 0) | 0
    )

    offset = (offset + 9) | 0

    return 0
  }

  function MAP_BREAK (octet) {
    octet = octet | 0

    pushObjectStart()

    offset = (offset + 1) | 0

    return 0
  }

  function TAG_KNOWN (octet) {
    octet = octet | 0

    pushTagStart((octet - 192| 0) | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_BIGNUM_POS (octet) {
    octet = octet | 0

    pushTagStart(octet | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_BIGNUM_NEG (octet) {
    octet = octet | 0

    pushTagStart(octet | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_FRAC (octet) {
    octet = octet | 0

    pushTagStart(octet | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_BIGNUM_FLOAT (octet) {
    octet = octet | 0

    pushTagStart(octet | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_UNASSIGNED (octet) {
    octet = octet | 0

    pushTagStart((octet - 192| 0) | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_BASE64_URL (octet) {
    octet = octet | 0

    pushTagStart(octet | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_BASE64 (octet) {
    octet = octet | 0

    pushTagStart(octet | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_BASE16 (octet) {
    octet = octet | 0

    pushTagStart(octet | 0)

    offset = (offset + 1 | 0)

    return 0
  }

  function TAG_MORE_1 (octet) {
    octet = octet | 0

    if (checkOffset(1) | 0) {
      return 1
    }

    pushTagStart(heap[(offset + 1) | 0] | 0)

    offset = (offset + 2 | 0)

    return 0
  }

  function TAG_MORE_2 (octet) {
    octet = octet | 0

    if (checkOffset(2) | 0) {
      return 1
    }

    pushTagStart(
      readUInt16((offset + 1) | 0) | 0
    )

    offset = (offset + 3 | 0)

    return 0
  }

  function TAG_MORE_4 (octet) {
    octet = octet | 0

    if (checkOffset(4) | 0) {
      return 1
    }

    pushTagStart4(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0
    )

    offset = (offset + 5 | 0)

    return 0
  }

  function TAG_MORE_8 (octet) {
    octet = octet | 0

    if (checkOffset(8) | 0) {
      return 1
    }

    pushTagStart8(
      readUInt16((offset + 1) | 0) | 0,
      readUInt16((offset + 3) | 0) | 0,
      readUInt16((offset + 5) | 0) | 0,
      readUInt16((offset + 7) | 0) | 0
    )

    offset = (offset + 9 | 0)

    return 0
  }

  function SIMPLE_UNASSIGNED (octet) {
    octet = octet | 0

    pushSimpleUnassigned(((octet | 0) - 224) | 0)

    offset = (offset + 1) | 0

    return 0
  }

  function SIMPLE_FALSE (octet) {
    octet = octet | 0

    pushFalse()

    offset = (offset + 1) | 0

    return 0
  }

  function SIMPLE_TRUE (octet) {
    octet = octet | 0

    pushTrue()

    offset = (offset + 1) | 0

    return 0
  }

  function SIMPLE_NULL (octet) {
    octet = octet | 0

    pushNull()

    offset = (offset + 1) | 0

    return 0
  }

  function SIMPLE_UNDEFINED (octet) {
    octet = octet | 0

    pushUndefined()

    offset = (offset + 1) | 0

    return 0
  }

  function SIMPLE_BYTE (octet) {
    octet = octet | 0

    if (checkOffset(1) | 0) {
      return 1
    }

    pushSimpleUnassigned(heap[(offset + 1) | 0] | 0)

    offset = (offset + 2)  | 0

    return 0
  }

  function SIMPLE_FLOAT_HALF (octet) {
    octet = octet | 0

    var f = 0
    var g = 0
    var sign = 1.0
    var exp = 0.0
    var mant = 0.0
    var r = 0.0
    if (checkOffset(2) | 0) {
      return 1
    }

    f = heap[(offset + 1) | 0] | 0
    g = heap[(offset + 2) | 0] | 0

    if ((f | 0) & 0x80) {
      sign = -1.0
    }

    exp = +(((f | 0) & 0x7C) >> 2)
    mant = +((((f | 0) & 0x03) << 8) | g)

    if (+exp == 0.0) {
      pushFloat(+(
        (+sign) * +5.9604644775390625e-8 * (+mant)
      ))
    } else if (+exp == 31.0) {
      if (+sign == 1.0) {
        if (+mant > 0.0) {
          pushNaN()
        } else {
          pushInfinity()
        }
      } else {
        if (+mant > 0.0) {
          pushNaNNeg()
        } else {
          pushInfinityNeg()
        }
      }
    } else {
      pushFloat(+(
        +sign * pow(+2, +(+exp - 25.0)) * +(1024.0 + mant)
      ))
    }

    offset = (offset + 3) | 0

    return 0
  }

  function SIMPLE_FLOAT_SINGLE (octet) {
    octet = octet | 0

    if (checkOffset(4) | 0) {
      return 1
    }

    pushFloatSingle(
      heap[(offset + 1) | 0] | 0,
      heap[(offset + 2) | 0] | 0,
      heap[(offset + 3) | 0] | 0,
      heap[(offset + 4) | 0] | 0
    )

    offset = (offset + 5) | 0

    return 0
  }

  function SIMPLE_FLOAT_DOUBLE (octet) {
    octet = octet | 0

    if (checkOffset(8) | 0) {
      return 1
    }

    pushFloatDouble(
      heap[(offset + 1) | 0] | 0,
      heap[(offset + 2) | 0] | 0,
      heap[(offset + 3) | 0] | 0,
      heap[(offset + 4) | 0] | 0,
      heap[(offset + 5) | 0] | 0,
      heap[(offset + 6) | 0] | 0,
      heap[(offset + 7) | 0] | 0,
      heap[(offset + 8) | 0] | 0
    )

    offset = (offset + 9) | 0

    return 0
  }

  function ERROR (octet) {
    octet = octet | 0

    return 1
  }

  function BREAK (octet) {
    octet = octet | 0

    pushBreak()

    offset = (offset + 1) | 0

    return 0
  }

  // -- Jump Table

  var jumpTable = [
    // Integer 0x00..0x17 (0..23)
    INT_P, // 0x00
    INT_P, // 0x01
    INT_P, // 0x02
    INT_P, // 0x03
    INT_P, // 0x04
    INT_P, // 0x05
    INT_P, // 0x06
    INT_P, // 0x07
    INT_P, // 0x08
    INT_P, // 0x09
    INT_P, // 0x0A
    INT_P, // 0x0B
    INT_P, // 0x0C
    INT_P, // 0x0D
    INT_P, // 0x0E
    INT_P, // 0x0F
    INT_P, // 0x10
    INT_P, // 0x11
    INT_P, // 0x12
    INT_P, // 0x13
    INT_P, // 0x14
    INT_P, // 0x15
    INT_P, // 0x16
    INT_P, // 0x17
    // Unsigned integer (one-byte uint8_t follows)
    UINT_P_8, // 0x18
    // Unsigned integer (two-byte uint16_t follows)
    UINT_P_16, // 0x19
    // Unsigned integer (four-byte uint32_t follows)
    UINT_P_32, // 0x1a
    // Unsigned integer (eight-byte uint64_t follows)
    UINT_P_64, // 0x1b
    ERROR, // 0x1c
    ERROR, // 0x1d
    ERROR, // 0x1e
    ERROR, // 0x1f
    // Negative integer -1-0x00..-1-0x17 (-1..-24)
    INT_N, // 0x20
    INT_N, // 0x21
    INT_N, // 0x22
    INT_N, // 0x23
    INT_N, // 0x24
    INT_N, // 0x25
    INT_N, // 0x26
    INT_N, // 0x27
    INT_N, // 0x28
    INT_N, // 0x29
    INT_N, // 0x2A
    INT_N, // 0x2B
    INT_N, // 0x2C
    INT_N, // 0x2D
    INT_N, // 0x2E
    INT_N, // 0x2F
    INT_N, // 0x30
    INT_N, // 0x31
    INT_N, // 0x32
    INT_N, // 0x33
    INT_N, // 0x34
    INT_N, // 0x35
    INT_N, // 0x36
    INT_N, // 0x37
    // Negative integer -1-n (one-byte uint8_t for n follows)
    UINT_N_8, // 0x38
    // Negative integer -1-n (two-byte uint16_t for n follows)
    UINT_N_16, // 0x39
    // Negative integer -1-n (four-byte uint32_t for nfollows)
    UINT_N_32, // 0x3a
    // Negative integer -1-n (eight-byte uint64_t for n follows)
    UINT_N_64, // 0x3b
    ERROR, // 0x3c
    ERROR, // 0x3d
    ERROR, // 0x3e
    ERROR, // 0x3f
    // byte string (0x00..0x17 bytes follow)
    BYTE_STRING, // 0x40
    BYTE_STRING, // 0x41
    BYTE_STRING, // 0x42
    BYTE_STRING, // 0x43
    BYTE_STRING, // 0x44
    BYTE_STRING, // 0x45
    BYTE_STRING, // 0x46
    BYTE_STRING, // 0x47
    BYTE_STRING, // 0x48
    BYTE_STRING, // 0x49
    BYTE_STRING, // 0x4A
    BYTE_STRING, // 0x4B
    BYTE_STRING, // 0x4C
    BYTE_STRING, // 0x4D
    BYTE_STRING, // 0x4E
    BYTE_STRING, // 0x4F
    BYTE_STRING, // 0x50
    BYTE_STRING, // 0x51
    BYTE_STRING, // 0x52
    BYTE_STRING, // 0x53
    BYTE_STRING, // 0x54
    BYTE_STRING, // 0x55
    BYTE_STRING, // 0x56
    BYTE_STRING, // 0x57
    // byte string (one-byte uint8_t for n, and then n bytes follow)
    BYTE_STRING_8, // 0x58
    // byte string (two-byte uint16_t for n, and then n bytes follow)
    BYTE_STRING_16, // 0x59
    // byte string (four-byte uint32_t for n, and then n bytes follow)
    BYTE_STRING_32, // 0x5a
    // byte string (eight-byte uint64_t for n, and then n bytes follow)
    BYTE_STRING_64, // 0x5b
    ERROR, // 0x5c
    ERROR, // 0x5d
    ERROR, // 0x5e
    // byte string, byte strings follow, terminated by "break"
    BYTE_STRING_BREAK, // 0x5f
    // UTF-8 string (0x00..0x17 bytes follow)
    UTF8_STRING, // 0x60
    UTF8_STRING, // 0x61
    UTF8_STRING, // 0x62
    UTF8_STRING, // 0x63
    UTF8_STRING, // 0x64
    UTF8_STRING, // 0x65
    UTF8_STRING, // 0x66
    UTF8_STRING, // 0x67
    UTF8_STRING, // 0x68
    UTF8_STRING, // 0x69
    UTF8_STRING, // 0x6A
    UTF8_STRING, // 0x6B
    UTF8_STRING, // 0x6C
    UTF8_STRING, // 0x6D
    UTF8_STRING, // 0x6E
    UTF8_STRING, // 0x6F
    UTF8_STRING, // 0x70
    UTF8_STRING, // 0x71
    UTF8_STRING, // 0x72
    UTF8_STRING, // 0x73
    UTF8_STRING, // 0x74
    UTF8_STRING, // 0x75
    UTF8_STRING, // 0x76
    UTF8_STRING, // 0x77
    // UTF-8 string (one-byte uint8_t for n, and then n bytes follow)
    UTF8_STRING_8, // 0x78
    // UTF-8 string (two-byte uint16_t for n, and then n bytes follow)
    UTF8_STRING_16, // 0x79
    // UTF-8 string (four-byte uint32_t for n, and then n bytes follow)
    UTF8_STRING_32, // 0x7a
    // UTF-8 string (eight-byte uint64_t for n, and then n bytes follow)
    UTF8_STRING_64, // 0x7b
    // UTF-8 string, UTF-8 strings follow, terminated by "break"
    ERROR, // 0x7c
    ERROR, // 0x7d
    ERROR, // 0x7e
    UTF8_STRING_BREAK, // 0x7f
    // array (0x00..0x17 data items follow)
    ARRAY, // 0x80
    ARRAY, // 0x81
    ARRAY, // 0x82
    ARRAY, // 0x83
    ARRAY, // 0x84
    ARRAY, // 0x85
    ARRAY, // 0x86
    ARRAY, // 0x87
    ARRAY, // 0x88
    ARRAY, // 0x89
    ARRAY, // 0x8A
    ARRAY, // 0x8B
    ARRAY, // 0x8C
    ARRAY, // 0x8D
    ARRAY, // 0x8E
    ARRAY, // 0x8F
    ARRAY, // 0x90
    ARRAY, // 0x91
    ARRAY, // 0x92
    ARRAY, // 0x93
    ARRAY, // 0x94
    ARRAY, // 0x95
    ARRAY, // 0x96
    ARRAY, // 0x97
    // array (one-byte uint8_t fo, and then n data items follow)
    ARRAY_8, // 0x98
    // array (two-byte uint16_t for n, and then n data items follow)
    ARRAY_16, // 0x99
    // array (four-byte uint32_t for n, and then n data items follow)
    ARRAY_32, // 0x9a
    // array (eight-byte uint64_t for n, and then n data items follow)
    ARRAY_64, // 0x9b
    // array, data items follow, terminated by "break"
    ERROR, // 0x9c
    ERROR, // 0x9d
    ERROR, // 0x9e
    ARRAY_BREAK, // 0x9f
    // map (0x00..0x17 pairs of data items follow)
    MAP, // 0xa0
    MAP, // 0xa1
    MAP, // 0xa2
    MAP, // 0xa3
    MAP, // 0xa4
    MAP, // 0xa5
    MAP, // 0xa6
    MAP, // 0xa7
    MAP, // 0xa8
    MAP, // 0xa9
    MAP, // 0xaA
    MAP, // 0xaB
    MAP, // 0xaC
    MAP, // 0xaD
    MAP, // 0xaE
    MAP, // 0xaF
    MAP, // 0xb0
    MAP, // 0xb1
    MAP, // 0xb2
    MAP, // 0xb3
    MAP, // 0xb4
    MAP, // 0xb5
    MAP, // 0xb6
    MAP, // 0xb7
    // map (one-byte uint8_t for n, and then n pairs of data items follow)
    MAP_8, // 0xb8
    // map (two-byte uint16_t for n, and then n pairs of data items follow)
    MAP_16, // 0xb9
    // map (four-byte uint32_t for n, and then n pairs of data items follow)
    MAP_32, // 0xba
    // map (eight-byte uint64_t for n, and then n pairs of data items follow)
    MAP_64, // 0xbb
    ERROR, // 0xbc
    ERROR, // 0xbd
    ERROR, // 0xbe
    // map, pairs of data items follow, terminated by "break"
    MAP_BREAK, // 0xbf
    // Text-based date/time (data item follows; see Section 2.4.1)
    TAG_KNOWN, // 0xc0
    // Epoch-based date/time (data item follows; see Section 2.4.1)
    TAG_KNOWN, // 0xc1
    // Positive bignum (data item "byte string" follows)
    TAG_KNOWN, // 0xc2
    // Negative bignum (data item "byte string" follows)
    TAG_KNOWN, // 0xc3
    // Decimal Fraction (data item "array" follows; see Section 2.4.3)
    TAG_KNOWN, // 0xc4
    // Bigfloat (data item "array" follows; see Section 2.4.3)
    TAG_KNOWN, // 0xc5
    // (tagged item)
    TAG_UNASSIGNED, // 0xc6
    TAG_UNASSIGNED, // 0xc7
    TAG_UNASSIGNED, // 0xc8
    TAG_UNASSIGNED, // 0xc9
    TAG_UNASSIGNED, // 0xca
    TAG_UNASSIGNED, // 0xcb
    TAG_UNASSIGNED, // 0xcc
    TAG_UNASSIGNED, // 0xcd
    TAG_UNASSIGNED, // 0xce
    TAG_UNASSIGNED, // 0xcf
    TAG_UNASSIGNED, // 0xd0
    TAG_UNASSIGNED, // 0xd1
    TAG_UNASSIGNED, // 0xd2
    TAG_UNASSIGNED, // 0xd3
    TAG_UNASSIGNED, // 0xd4
    // Expected Conversion (data item follows; see Section 2.4.4.2)
    TAG_UNASSIGNED, // 0xd5
    TAG_UNASSIGNED, // 0xd6
    TAG_UNASSIGNED, // 0xd7
    // (more tagged items, 1/2/4/8 bytes and then a data item follow)
    TAG_MORE_1, // 0xd8
    TAG_MORE_2, // 0xd9
    TAG_MORE_4, // 0xda
    TAG_MORE_8, // 0xdb
    ERROR, // 0xdc
    ERROR, // 0xdd
    ERROR, // 0xde
    ERROR, // 0xdf
    // (simple value)
    SIMPLE_UNASSIGNED, // 0xe0
    SIMPLE_UNASSIGNED, // 0xe1
    SIMPLE_UNASSIGNED, // 0xe2
    SIMPLE_UNASSIGNED, // 0xe3
    SIMPLE_UNASSIGNED, // 0xe4
    SIMPLE_UNASSIGNED, // 0xe5
    SIMPLE_UNASSIGNED, // 0xe6
    SIMPLE_UNASSIGNED, // 0xe7
    SIMPLE_UNASSIGNED, // 0xe8
    SIMPLE_UNASSIGNED, // 0xe9
    SIMPLE_UNASSIGNED, // 0xea
    SIMPLE_UNASSIGNED, // 0xeb
    SIMPLE_UNASSIGNED, // 0xec
    SIMPLE_UNASSIGNED, // 0xed
    SIMPLE_UNASSIGNED, // 0xee
    SIMPLE_UNASSIGNED, // 0xef
    SIMPLE_UNASSIGNED, // 0xf0
    SIMPLE_UNASSIGNED, // 0xf1
    SIMPLE_UNASSIGNED, // 0xf2
    SIMPLE_UNASSIGNED, // 0xf3
    // False
    SIMPLE_FALSE, // 0xf4
    // True
    SIMPLE_TRUE, // 0xf5
    // Null
    SIMPLE_NULL, // 0xf6
    // Undefined
    SIMPLE_UNDEFINED, // 0xf7
    // (simple value, one byte follows)
    SIMPLE_BYTE, // 0xf8
    // Half-Precision Float (two-byte IEEE 754)
    SIMPLE_FLOAT_HALF, // 0xf9
    // Single-Precision Float (four-byte IEEE 754)
    SIMPLE_FLOAT_SINGLE, // 0xfa
    // Double-Precision Float (eight-byte IEEE 754)
    SIMPLE_FLOAT_DOUBLE, // 0xfb
    ERROR, // 0xfc
    ERROR, // 0xfd
    ERROR, // 0xfe
    // "break" stop code
    BREAK // 0xff
  ]

  // --

  return {
    parse: parse
  }
}


/***/ }),

/***/ "gbYC":
/*!*****************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multibase/src/rfc4648.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const decode = (string, alphabet, bitsPerChar) => {
  // Build the character lookup table:
  const codes = {}
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i
  }

  // Count the padding bytes:
  let end = string.length
  while (string[end - 1] === '=') {
    --end
  }

  // Allocate the output:
  const out = new Uint8Array((end * bitsPerChar / 8) | 0)

  // Parse the data:
  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  let written = 0 // Next byte to write
  for (let i = 0; i < end; ++i) {
    // Read one character from the string:
    const value = codes[string[i]]
    if (value === undefined) {
      throw new SyntaxError('Invalid character ' + string[i])
    }

    // Append the bits to the buffer:
    buffer = (buffer << bitsPerChar) | value
    bits += bitsPerChar

    // Write out some bits if the buffer has a byte's worth:
    if (bits >= 8) {
      bits -= 8
      out[written++] = 0xff & (buffer >> bits)
    }
  }

  // Verify that we have received just enough bits:
  if (bits >= bitsPerChar || 0xff & (buffer << (8 - bits))) {
    throw new SyntaxError('Unexpected end of data')
  }

  return out
}

const encode = (data, alphabet, bitsPerChar) => {
  const pad = alphabet[alphabet.length - 1] === '='
  const mask = (1 << bitsPerChar) - 1
  let out = ''

  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  for (let i = 0; i < data.length; ++i) {
    // Slurp data into the buffer:
    buffer = (buffer << 8) | data[i]
    bits += 8

    // Write out as much as we can:
    while (bits > bitsPerChar) {
      bits -= bitsPerChar
      out += alphabet[mask & (buffer >> bits)]
    }
  }

  // Partial character:
  if (bits) {
    out += alphabet[mask & (buffer << (bitsPerChar - bits))]
  }

  // Add padding characters until we hit a byte boundary:
  if (pad) {
    while ((out.length * bitsPerChar) & 7) {
      out += '='
    }
  }

  return out
}

module.exports = (bitsPerChar) => (alphabet) => {
  return {
    encode (input) {
      return encode(input, alphabet, bitsPerChar)
    },
    decode (input) {
      return decode(input, alphabet, bitsPerChar)
    }
  }
}


/***/ }),

/***/ "gq3O":
/*!******************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/mtime-to-object.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseMtime (mtime) {
  if (mtime == null) {
    return undefined
  }

  // Javascript Date
  if (mtime instanceof Date) {
    const ms = mtime.getTime()
    const secs = Math.floor(ms / 1000)

    return {
      secs: secs,
      nsecs: (ms - (secs * 1000)) * 1000
    }
  }

  // { secs, nsecs }
  if (Object.prototype.hasOwnProperty.call(mtime, 'secs')) {
    return {
      secs: mtime.secs,
      nsecs: mtime.nsecs
    }
  }

  // UnixFS TimeSpec
  if (Object.prototype.hasOwnProperty.call(mtime, 'Seconds')) {
    return {
      secs: mtime.Seconds,
      nsecs: mtime.FractionalNanoseconds
    }
  }

  // process.hrtime()
  if (Array.isArray(mtime)) {
    return {
      secs: mtime[0],
      nsecs: mtime[1]
    }
  }
  /*
  TODO: https://github.com/ipfs/aegir/issues/487

  // process.hrtime.bigint()
  if (typeof mtime === 'bigint') {
    const secs = mtime / BigInt(1e9)
    const nsecs = mtime - (secs * BigInt(1e9))

    return {
      secs: parseInt(secs),
      nsecs: parseInt(nsecs)
    }
  }
  */
}


/***/ }),

/***/ "gyeY":
/*!**************************************!*\
  !*** ./node_modules/blakejs/util.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array'

// For convenience, let people hash a string, not just a Uint8Array
function normalizeInput (input) {
  var ret
  if (input instanceof Uint8Array) {
    ret = input
  } else if (input instanceof Buffer) {
    ret = new Uint8Array(input)
  } else if (typeof (input) === 'string') {
    ret = new Uint8Array(Buffer.from(input, 'utf8'))
  } else {
    throw new Error(ERROR_MSG_INPUT)
  }
  return ret
}

// Converts a Uint8Array to a hexadecimal string
// For example, toHex([255, 0, 255]) returns "ff00ff"
function toHex (bytes) {
  return Array.prototype.map.call(bytes, function (n) {
    return (n < 16 ? '0' : '') + n.toString(16)
  }).join('')
}

// Converts any value in [0...2^32-1] to an 8-character hex string
function uint32ToHex (val) {
  return (0x100000000 + val).toString(16).substring(1)
}

// For debugging: prints out hash state in the same format as the RFC
// sample computation exactly, so that you can diff
function debugPrint (label, arr, size) {
  var msg = '\n' + label + ' = '
  for (var i = 0; i < arr.length; i += 2) {
    if (size === 32) {
      msg += uint32ToHex(arr[i]).toUpperCase()
      msg += ' '
      msg += uint32ToHex(arr[i + 1]).toUpperCase()
    } else if (size === 64) {
      msg += uint32ToHex(arr[i + 1]).toUpperCase()
      msg += uint32ToHex(arr[i]).toUpperCase()
    } else throw new Error('Invalid size ' + size)
    if (i % 6 === 4) {
      msg += '\n' + new Array(label.length + 4).join(' ')
    } else if (i < arr.length - 2) {
      msg += ' '
    }
  }
  console.log(msg)
}

// For performance testing: generates N bytes of input, hashes M times
// Measures and prints MB/second hash performance each time
function testSpeed (hashFn, N, M) {
  var startMs = new Date().getTime()

  var input = new Uint8Array(N)
  for (var i = 0; i < N; i++) {
    input[i] = i % 256
  }
  var genMs = new Date().getTime()
  console.log('Generated random input in ' + (genMs - startMs) + 'ms')
  startMs = genMs

  for (i = 0; i < M; i++) {
    var hashHex = hashFn(input)
    var hashMs = new Date().getTime()
    var ms = hashMs - startMs
    startMs = hashMs
    console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...')
    console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND')
  }
}

module.exports = {
  normalizeInput: normalizeInput,
  toHex: toHex,
  debugPrint: debugPrint,
  testSpeed: testSpeed
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! buffer */ "tjlA")["Buffer"]))

/***/ }),

/***/ "h0HT":
/*!*************************************************************!*\
  !*** ./node_modules/protons/src/compile/encoding-length.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defined = __webpack_require__(/*! ./utils */ "z84S").defined
var varint = __webpack_require__(/*! varint */ "JhIh")

function compileEncodingLength (m, enc, oneofs) {
  var oneofsKeys = Object.keys(oneofs)
  var encLength = enc.length

  var hls = new Array(encLength)

  for (var i = 0; i < m.fields.length; i++) {
    hls[i] = varint.encodingLength(m.fields[i].tag << 3 | enc[i].type)

    var field = m.fields[i]
    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false'
  }

  return function encodingLength (obj) {
    var length = 0
    var i = 0
    var j = 0

    for (i = 0; i < oneofsKeys.length; i++) {
      var name = oneofsKeys[i]
      var props = oneofs[name]

      var match = false
      for (j = 0; j < props.length; j++) {
        if (defined(obj[props[j]])) {
          if (match) {
            throw new Error('only one of the properties defined in oneof ' + name + ' can be set')
          }
          match = true
        }
      }
    }

    for (i = 0; i < encLength; i++) {
      var e = enc[i]
      var field = m.fields[i]
      var val = obj[field.name]
      var hl = hls[i]
      var len

      if (!defined(val)) {
        if (field.required) {
          throw new Error(field.name + ' is required')
        }

        continue
      }

      if (field.map) {
        var tmp = Object.keys(val)
        for (j = 0; j < tmp.length; j++) {
          tmp[j] = {
            key: tmp[j],
            value: val[tmp[j]]
          }
        }

        val = tmp
      }

      if (field.packed) {
        var packedLen = 0
        for (j = 0; j < val.length; j++) {
          if (!defined(val[j])) {
            continue
          }
          len = e.encodingLength(val[j])
          packedLen += len

          if (e.message) {
            packedLen += varint.encodingLength(len)
          }
        }

        if (packedLen) {
          length += hl + packedLen + varint.encodingLength(packedLen)
        }
      } else if (field.repeated) {
        for (j = 0; j < val.length; j++) {
          if (!defined(val[j])) {
            continue
          }

          len = e.encodingLength(val[j])
          length += hl + len + (e.message ? varint.encodingLength(len) : 0)
        }
      } else {
        len = e.encodingLength(val)
        length += hl + len + (e.message ? varint.encodingLength(len) : 0)
      }
    }

    return length
  }
}

module.exports = compileEncodingLength


/***/ }),

/***/ "hDHj":
/*!******************************************!*\
  !*** ./node_modules/borc/src/decoder.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const ieee754 = __webpack_require__(/*! ieee754 */ "kVK+")
const Bignumber = __webpack_require__(/*! bignumber.js */ "kB5k").BigNumber

const parser = __webpack_require__(/*! ./decoder.asm */ "gYz7")
const utils = __webpack_require__(/*! ./utils */ "XuWj")
const c = __webpack_require__(/*! ./constants */ "hb4V")
const Simple = __webpack_require__(/*! ./simple */ "UHYx")
const Tagged = __webpack_require__(/*! ./tagged */ "IrRL")
const { URL } = __webpack_require__(/*! iso-url */ "Fq86")

/**
 * Transform binary cbor data into JavaScript objects.
 */
class Decoder {
  /**
   * @param {Object} [opts={}]
   * @param {number} [opts.size=65536] - Size of the allocated heap.
   */
  constructor (opts) {
    opts = opts || {}

    if (!opts.size || opts.size < 0x10000) {
      opts.size = 0x10000
    } else {
      // Ensure the size is a power of 2
      opts.size = utils.nextPowerOf2(opts.size)
    }

    // Heap use to share the input with the parser
    this._heap = new ArrayBuffer(opts.size)
    this._heap8 = new Uint8Array(this._heap)
    this._buffer = Buffer.from(this._heap)

    this._reset()

    // Known tags
    this._knownTags = Object.assign({
      0: (val) => new Date(val),
      1: (val) => new Date(val * 1000),
      2: (val) => utils.arrayBufferToBignumber(val),
      3: (val) => c.NEG_ONE.minus(utils.arrayBufferToBignumber(val)),
      4: (v) => {
        // const v = new Uint8Array(val)
        return c.TEN.pow(v[0]).times(v[1])
      },
      5: (v) => {
        // const v = new Uint8Array(val)
        return c.TWO.pow(v[0]).times(v[1])
      },
      32: (val) => new URL(val),
      35: (val) => new RegExp(val)
    }, opts.tags)

    // Initialize asm based parser
    this.parser = parser(global, {
      // eslint-disable-next-line no-console
      log: console.log.bind(console),
      pushInt: this.pushInt.bind(this),
      pushInt32: this.pushInt32.bind(this),
      pushInt32Neg: this.pushInt32Neg.bind(this),
      pushInt64: this.pushInt64.bind(this),
      pushInt64Neg: this.pushInt64Neg.bind(this),
      pushFloat: this.pushFloat.bind(this),
      pushFloatSingle: this.pushFloatSingle.bind(this),
      pushFloatDouble: this.pushFloatDouble.bind(this),
      pushTrue: this.pushTrue.bind(this),
      pushFalse: this.pushFalse.bind(this),
      pushUndefined: this.pushUndefined.bind(this),
      pushNull: this.pushNull.bind(this),
      pushInfinity: this.pushInfinity.bind(this),
      pushInfinityNeg: this.pushInfinityNeg.bind(this),
      pushNaN: this.pushNaN.bind(this),
      pushNaNNeg: this.pushNaNNeg.bind(this),
      pushArrayStart: this.pushArrayStart.bind(this),
      pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
      pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
      pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
      pushObjectStart: this.pushObjectStart.bind(this),
      pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
      pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
      pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
      pushByteString: this.pushByteString.bind(this),
      pushByteStringStart: this.pushByteStringStart.bind(this),
      pushUtf8String: this.pushUtf8String.bind(this),
      pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
      pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
      pushTagUnassigned: this.pushTagUnassigned.bind(this),
      pushTagStart: this.pushTagStart.bind(this),
      pushTagStart4: this.pushTagStart4.bind(this),
      pushTagStart8: this.pushTagStart8.bind(this),
      pushBreak: this.pushBreak.bind(this)
    }, this._heap)
  }

  get _depth () {
    return this._parents.length
  }

  get _currentParent () {
    return this._parents[this._depth - 1]
  }

  get _ref () {
    return this._currentParent.ref
  }

  // Finish the current parent
  _closeParent () {
    var p = this._parents.pop()

    if (p.length > 0) {
      throw new Error(`Missing ${p.length} elements`)
    }

    switch (p.type) {
      case c.PARENT.TAG:
        this._push(
          this.createTag(p.ref[0], p.ref[1])
        )
        break
      case c.PARENT.BYTE_STRING:
        this._push(this.createByteString(p.ref, p.length))
        break
      case c.PARENT.UTF8_STRING:
        this._push(this.createUtf8String(p.ref, p.length))
        break
      case c.PARENT.MAP:
        if (p.values % 2 > 0) {
          throw new Error('Odd number of elements in the map')
        }
        this._push(this.createMap(p.ref, p.length))
        break
      case c.PARENT.OBJECT:
        if (p.values % 2 > 0) {
          throw new Error('Odd number of elements in the map')
        }
        this._push(this.createObject(p.ref, p.length))
        break
      case c.PARENT.ARRAY:
        this._push(this.createArray(p.ref, p.length))
        break
      default:
        break
    }

    if (this._currentParent && this._currentParent.type === c.PARENT.TAG) {
      this._dec()
    }
  }

  // Reduce the expected length of the current parent by one
  _dec () {
    const p = this._currentParent
    // The current parent does not know the epxected child length

    if (p.length < 0) {
      return
    }

    p.length--

    // All children were seen, we can close the current parent
    if (p.length === 0) {
      this._closeParent()
    }
  }

  // Push any value to the current parent
  _push (val, hasChildren) {
    const p = this._currentParent
    p.values++

    switch (p.type) {
      case c.PARENT.ARRAY:
      case c.PARENT.BYTE_STRING:
      case c.PARENT.UTF8_STRING:
        if (p.length > -1) {
          this._ref[this._ref.length - p.length] = val
        } else {
          this._ref.push(val)
        }
        this._dec()
        break
      case c.PARENT.OBJECT:
        if (p.tmpKey != null) {
          this._ref[p.tmpKey] = val
          p.tmpKey = null
          this._dec()
        } else {
          p.tmpKey = val

          if (typeof p.tmpKey !== 'string') {
            // too bad, convert to a Map
            p.type = c.PARENT.MAP
            p.ref = utils.buildMap(p.ref)
          }
        }
        break
      case c.PARENT.MAP:
        if (p.tmpKey != null) {
          this._ref.set(p.tmpKey, val)
          p.tmpKey = null
          this._dec()
        } else {
          p.tmpKey = val
        }
        break
      case c.PARENT.TAG:
        this._ref.push(val)
        if (!hasChildren) {
          this._dec()
        }
        break
      default:
        throw new Error('Unknown parent type')
    }
  }

  // Create a new parent in the parents list
  _createParent (obj, type, len) {
    this._parents[this._depth] = {
      type: type,
      length: len,
      ref: obj,
      values: 0,
      tmpKey: null
    }
  }

  // Reset all state back to the beginning, also used for initiatlization
  _reset () {
    this._res = []
    this._parents = [{
      type: c.PARENT.ARRAY,
      length: -1,
      ref: this._res,
      values: 0,
      tmpKey: null
    }]
  }

  // -- Interface to customize deoding behaviour
  createTag (tagNumber, value) {
    const typ = this._knownTags[tagNumber]

    if (!typ) {
      return new Tagged(tagNumber, value)
    }

    return typ(value)
  }

  createMap (obj, len) {
    return obj
  }

  createObject (obj, len) {
    return obj
  }

  createArray (arr, len) {
    return arr
  }

  createByteString (raw, len) {
    return Buffer.concat(raw)
  }

  createByteStringFromHeap (start, end) {
    if (start === end) {
      return Buffer.alloc(0)
    }

    return Buffer.from(this._heap.slice(start, end))
  }

  createInt (val) {
    return val
  }

  createInt32 (f, g) {
    return utils.buildInt32(f, g)
  }

  createInt64 (f1, f2, g1, g2) {
    return utils.buildInt64(f1, f2, g1, g2)
  }

  createFloat (val) {
    return val
  }

  createFloatSingle (a, b, c, d) {
    return ieee754.read([a, b, c, d], 0, false, 23, 4)
  }

  createFloatDouble (a, b, c, d, e, f, g, h) {
    return ieee754.read([a, b, c, d, e, f, g, h], 0, false, 52, 8)
  }

  createInt32Neg (f, g) {
    return -1 - utils.buildInt32(f, g)
  }

  createInt64Neg (f1, f2, g1, g2) {
    const f = utils.buildInt32(f1, f2)
    const g = utils.buildInt32(g1, g2)

    if (f > c.MAX_SAFE_HIGH) {
      return c.NEG_ONE.minus(new Bignumber(f).times(c.SHIFT32).plus(g))
    }

    return -1 - ((f * c.SHIFT32) + g)
  }

  createTrue () {
    return true
  }

  createFalse () {
    return false
  }

  createNull () {
    return null
  }

  createUndefined () {
    return undefined
  }

  createInfinity () {
    return Infinity
  }

  createInfinityNeg () {
    return -Infinity
  }

  createNaN () {
    return NaN
  }

  createNaNNeg () {
    return -NaN
  }

  createUtf8String (raw, len) {
    return raw.join('')
  }

  createUtf8StringFromHeap (start, end) {
    if (start === end) {
      return ''
    }

    return this._buffer.toString('utf8', start, end)
  }

  createSimpleUnassigned (val) {
    return new Simple(val)
  }

  // -- Interface for decoder.asm.js

  pushInt (val) {
    this._push(this.createInt(val))
  }

  pushInt32 (f, g) {
    this._push(this.createInt32(f, g))
  }

  pushInt64 (f1, f2, g1, g2) {
    this._push(this.createInt64(f1, f2, g1, g2))
  }

  pushFloat (val) {
    this._push(this.createFloat(val))
  }

  pushFloatSingle (a, b, c, d) {
    this._push(this.createFloatSingle(a, b, c, d))
  }

  pushFloatDouble (a, b, c, d, e, f, g, h) {
    this._push(this.createFloatDouble(a, b, c, d, e, f, g, h))
  }

  pushInt32Neg (f, g) {
    this._push(this.createInt32Neg(f, g))
  }

  pushInt64Neg (f1, f2, g1, g2) {
    this._push(this.createInt64Neg(f1, f2, g1, g2))
  }

  pushTrue () {
    this._push(this.createTrue())
  }

  pushFalse () {
    this._push(this.createFalse())
  }

  pushNull () {
    this._push(this.createNull())
  }

  pushUndefined () {
    this._push(this.createUndefined())
  }

  pushInfinity () {
    this._push(this.createInfinity())
  }

  pushInfinityNeg () {
    this._push(this.createInfinityNeg())
  }

  pushNaN () {
    this._push(this.createNaN())
  }

  pushNaNNeg () {
    this._push(this.createNaNNeg())
  }

  pushArrayStart () {
    this._createParent([], c.PARENT.ARRAY, -1)
  }

  pushArrayStartFixed (len) {
    this._createArrayStartFixed(len)
  }

  pushArrayStartFixed32 (len1, len2) {
    const len = utils.buildInt32(len1, len2)
    this._createArrayStartFixed(len)
  }

  pushArrayStartFixed64 (len1, len2, len3, len4) {
    const len = utils.buildInt64(len1, len2, len3, len4)
    this._createArrayStartFixed(len)
  }

  pushObjectStart () {
    this._createObjectStartFixed(-1)
  }

  pushObjectStartFixed (len) {
    this._createObjectStartFixed(len)
  }

  pushObjectStartFixed32 (len1, len2) {
    const len = utils.buildInt32(len1, len2)
    this._createObjectStartFixed(len)
  }

  pushObjectStartFixed64 (len1, len2, len3, len4) {
    const len = utils.buildInt64(len1, len2, len3, len4)
    this._createObjectStartFixed(len)
  }

  pushByteStringStart () {
    this._parents[this._depth] = {
      type: c.PARENT.BYTE_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null
    }
  }

  pushByteString (start, end) {
    this._push(this.createByteStringFromHeap(start, end))
  }

  pushUtf8StringStart () {
    this._parents[this._depth] = {
      type: c.PARENT.UTF8_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null
    }
  }

  pushUtf8String (start, end) {
    this._push(this.createUtf8StringFromHeap(start, end))
  }

  pushSimpleUnassigned (val) {
    this._push(this.createSimpleUnassigned(val))
  }

  pushTagStart (tag) {
    this._parents[this._depth] = {
      type: c.PARENT.TAG,
      length: 1,
      ref: [tag]
    }
  }

  pushTagStart4 (f, g) {
    this.pushTagStart(utils.buildInt32(f, g))
  }

  pushTagStart8 (f1, f2, g1, g2) {
    this.pushTagStart(utils.buildInt64(f1, f2, g1, g2))
  }

  pushTagUnassigned (tagNumber) {
    this._push(this.createTag(tagNumber))
  }

  pushBreak () {
    if (this._currentParent.length > -1) {
      throw new Error('Unexpected break')
    }

    this._closeParent()
  }

  _createObjectStartFixed (len) {
    if (len === 0) {
      this._push(this.createObject({}))
      return
    }

    this._createParent({}, c.PARENT.OBJECT, len)
  }

  _createArrayStartFixed (len) {
    if (len === 0) {
      this._push(this.createArray([]))
      return
    }

    this._createParent(new Array(len), c.PARENT.ARRAY, len)
  }

  _decode (input) {
    if (input.byteLength === 0) {
      throw new Error('Input too short')
    }

    this._reset()
    this._heap8.set(input)
    const code = this.parser.parse(input.byteLength)

    if (this._depth > 1) {
      while (this._currentParent.length === 0) {
        this._closeParent()
      }
      if (this._depth > 1) {
        throw new Error('Undeterminated nesting')
      }
    }

    if (code > 0) {
      throw new Error('Failed to parse')
    }

    if (this._res.length === 0) {
      throw new Error('No valid result')
    }
  }

  // -- Public Interface

  decodeFirst (input) {
    this._decode(input)

    return this._res[0]
  }

  decodeAll (input) {
    this._decode(input)

    return this._res
  }

  /**
   * Decode the first cbor object.
   *
   * @param {Buffer|string} input
   * @param {string} [enc='hex'] - Encoding used if a string is passed.
   * @returns {*}
   */
  static decode (input, enc) {
    if (typeof input === 'string') {
      input = Buffer.from(input, enc || 'hex')
    }

    const dec = new Decoder({ size: input.length })
    return dec.decodeFirst(input)
  }

  /**
   * Decode all cbor objects.
   *
   * @param {Buffer|string} input
   * @param {string} [enc='hex'] - Encoding used if a string is passed.
   * @returns {Array<*>}
   */
  static decodeAll (input, enc) {
    if (typeof input === 'string') {
      input = Buffer.from(input, enc || 'hex')
    }

    const dec = new Decoder({ size: input.length })
    return dec.decodeAll(input)
  }
}

Decoder.decodeFirst = Decoder.decode

module.exports = Decoder


/***/ }),

/***/ "hX3S":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/key/gen.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (name, options = {}) => {
    const res = await api.post('key/gen', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return toCamel(data)
  }
})


/***/ }),

/***/ "hb4V":
/*!********************************************!*\
  !*** ./node_modules/borc/src/constants.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Bignumber = __webpack_require__(/*! bignumber.js */ "kB5k").BigNumber

exports.MT = {
  POS_INT: 0,
  NEG_INT: 1,
  BYTE_STRING: 2,
  UTF8_STRING: 3,
  ARRAY: 4,
  MAP: 5,
  TAG: 6,
  SIMPLE_FLOAT: 7
}

exports.TAG = {
  DATE_STRING: 0,
  DATE_EPOCH: 1,
  POS_BIGINT: 2,
  NEG_BIGINT: 3,
  DECIMAL_FRAC: 4,
  BIGFLOAT: 5,
  BASE64URL_EXPECTED: 21,
  BASE64_EXPECTED: 22,
  BASE16_EXPECTED: 23,
  CBOR: 24,
  URI: 32,
  BASE64URL: 33,
  BASE64: 34,
  REGEXP: 35,
  MIME: 36
}

exports.NUMBYTES = {
  ZERO: 0,
  ONE: 24,
  TWO: 25,
  FOUR: 26,
  EIGHT: 27,
  INDEFINITE: 31
}

exports.SIMPLE = {
  FALSE: 20,
  TRUE: 21,
  NULL: 22,
  UNDEFINED: 23
}

exports.SYMS = {
  NULL: Symbol('null'),
  UNDEFINED: Symbol('undef'),
  PARENT: Symbol('parent'),
  BREAK: Symbol('break'),
  STREAM: Symbol('stream')
}

exports.SHIFT32 = Math.pow(2, 32)
exports.SHIFT16 = Math.pow(2, 16)

exports.MAX_SAFE_HIGH = 0x1fffff
exports.NEG_ONE = new Bignumber(-1)
exports.TEN = new Bignumber(10)
exports.TWO = new Bignumber(2)

exports.PARENT = {
  ARRAY: 0,
  OBJECT: 1,
  MAP: 2,
  TAG: 3,
  BYTE_STRING: 4,
  UTF8_STRING: 5
}


/***/ }),

/***/ "i4cb":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bitswap/stat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { BigNumber } = __webpack_require__(/*! bignumber.js */ "kB5k")
const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('bitswap/stat', {
      searchParams: toUrlSearchParams(options),
      timeout: options.timeout,
      signal: options.signal,
      headers: options.headers
    })

    return toCoreInterface(await res.json())
  }
})

function toCoreInterface (res) {
  return {
    provideBufLen: res.ProvideBufLen,
    wantlist: (res.Wantlist || []).map(k => new CID(k['/'])),
    peers: (res.Peers || []),
    blocksReceived: new BigNumber(res.BlocksReceived),
    dataReceived: new BigNumber(res.DataReceived),
    blocksSent: new BigNumber(res.BlocksSent),
    dataSent: new BigNumber(res.DataSent),
    dupBlksReceived: new BigNumber(res.DupBlksReceived),
    dupDataReceived: new BigNumber(res.DupDataReceived)
  }
}


/***/ }),

/***/ "i5gV":
/*!****************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-link/dagLink.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const withIs = __webpack_require__(/*! class-is */ "7BLb")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

// Link represents an IPFS Merkle DAG Link between Nodes.
class DAGLink {
  constructor (name, size, cid) {
    if (!cid) {
      throw new Error('A link requires a cid to point to')
    }

    // assert(size, 'A link requires a size')
    //  note - links should include size, but this assert is disabled
    //  for now to maintain consistency with go-ipfs pinset

    this._name = name || ''
    this._nameBuf = null
    this._size = size
    this._cid = new CID(cid)
  }

  toString () {
    return `DAGLink <${this._cid.toBaseEncodedString()} - name: "${this.Name}", size: ${this.Tsize}>`
  }

  toJSON () {
    if (!this._json) {
      this._json = Object.freeze({
        name: this.Name,
        size: this.Tsize,
        cid: this.Hash.toBaseEncodedString()
      })
    }

    return Object.assign({}, this._json)
  }

  get Name () {
    return this._name
  }

  // Memoize the Buffer representation of name
  // We need this to sort the links, otherwise
  // we will reallocate new buffers every time
  get nameAsBuffer () {
    if (this._nameBuf !== null) {
      return this._nameBuf
    }

    this._nameBuf = Buffer.from(this._name)
    return this._nameBuf
  }

  set Name (name) {
    throw new Error("Can't set property: 'name' is immutable")
  }

  get Tsize () {
    return this._size
  }

  set Tsize (size) {
    throw new Error("Can't set property: 'size' is immutable")
  }

  get Hash () {
    return this._cid
  }

  set Hash (cid) {
    throw new Error("Can't set property: 'cid' is immutable")
  }
}

exports = module.exports = withIs(DAGLink, { className: 'DAGLink', symbolName: '@ipld/js-ipld-dag-pb/daglink' })


/***/ }),

/***/ "iARh":
/*!**********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/cids/src/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const mh = __webpack_require__(/*! multihashes */ "yP9g")
const multibase = __webpack_require__(/*! multibase */ "/jff")
const multicodec = __webpack_require__(/*! multicodec */ "OuWa")
const codecs = __webpack_require__(/*! multicodec/src/base-table.json */ "KpPT")
const CIDUtil = __webpack_require__(/*! ./cid-util */ "YtaI")
const withIs = __webpack_require__(/*! class-is */ "7BLb")

/**
 * @typedef {Object} SerializedCID
 * @param {string} codec
 * @param {number} version
 * @param {Buffer} multihash
 */

/**
 * Test if the given input is a CID.
 * @function isCID
 * @memberof CID
 * @static
 * @param {any} other
 * @returns {bool}
 */

/**
 * Class representing a CID `<mbase><version><mcodec><mhash>`
 * , as defined in [ipld/cid](https://github.com/multiformats/cid).
 * @class CID
 */
class CID {
  /**
   * Create a new CID.
   *
   * The algorithm for argument input is roughly:
   * ```
   * if (cid)
   *   -> create a copy
   * else if (str)
   *   if (1st char is on multibase table) -> CID String
   *   else -> bs58 encoded multihash
   * else if (Buffer)
   *   if (1st byte is 0 or 1) -> CID
   *   else -> multihash
   * else if (Number)
   *   -> construct CID by parts
   * ```
   *
   * @param {string|Buffer|CID} version
   * @param {string} [codec]
   * @param {Buffer} [multihash]
   * @param {string} [multibaseName]
   *
   * @example
   * new CID(<version>, <codec>, <multihash>, <multibaseName>)
   * new CID(<cidStr>)
   * new CID(<cid.buffer>)
   * new CID(<multihash>)
   * new CID(<bs58 encoded multihash>)
   * new CID(<cid>)
   */
  constructor (version, codec, multihash, multibaseName) {
    if (_CID.isCID(version)) {
      // version is an exising CID instance
      const cid = version
      this.version = cid.version
      this.codec = cid.codec
      this.multihash = Buffer.from(cid.multihash)
      // Default guard for when a CID < 0.7 is passed with no multibaseName
      this.multibaseName = cid.multibaseName || (cid.version === 0 ? 'base58btc' : 'base32')
      return
    }

    if (typeof version === 'string') {
      // e.g. 'base32' or false
      const baseName = multibase.isEncoded(version)
      if (baseName) {
        // version is a CID String encoded with multibase, so v1
        const cid = multibase.decode(version)
        this.version = parseInt(cid.slice(0, 1).toString('hex'), 16)
        this.codec = multicodec.getCodec(cid.slice(1))
        this.multihash = multicodec.rmPrefix(cid.slice(1))
        this.multibaseName = baseName
      } else {
        // version is a base58btc string multihash, so v0
        this.version = 0
        this.codec = 'dag-pb'
        this.multihash = mh.fromB58String(version)
        this.multibaseName = 'base58btc'
      }
      CID.validateCID(this)
      Object.defineProperty(this, 'string', { value: version })
      return
    }

    if (Buffer.isBuffer(version)) {
      const firstByte = version.slice(0, 1)
      const v = parseInt(firstByte.toString('hex'), 16)
      if (v === 1) {
        // version is a CID buffer
        const cid = version
        this.version = v
        this.codec = multicodec.getCodec(cid.slice(1))
        this.multihash = multicodec.rmPrefix(cid.slice(1))
        this.multibaseName = 'base32'
      } else {
        // version is a raw multihash buffer, so v0
        this.version = 0
        this.codec = 'dag-pb'
        this.multihash = version
        this.multibaseName = 'base58btc'
      }
      CID.validateCID(this)
      return
    }

    // otherwise, assemble the CID from the parameters

    /**
     * @type {number}
     */
    this.version = version

    /**
     * @type {string}
     */
    this.codec = codec

    /**
     * @type {Buffer}
     */
    this.multihash = multihash

    /**
     * @type {string}
     */
    this.multibaseName = multibaseName || (version === 0 ? 'base58btc' : 'base32')

    CID.validateCID(this)
  }

  /**
   * The CID as a `Buffer`
   *
   * @return {Buffer}
   * @readonly
   *
   * @memberOf CID
   */
  get buffer () {
    let buffer = this._buffer

    if (!buffer) {
      if (this.version === 0) {
        buffer = this.multihash
      } else if (this.version === 1) {
        buffer = Buffer.concat([
          Buffer.from('01', 'hex'),
          multicodec.getCodeVarint(this.codec),
          this.multihash
        ])
      } else {
        throw new Error('unsupported version')
      }

      // Cache this buffer so it doesn't have to be recreated
      Object.defineProperty(this, '_buffer', { value: buffer })
    }

    return buffer
  }

  /**
   * Get the prefix of the CID.
   *
   * @returns {Buffer}
   * @readonly
   */
  get prefix () {
    return Buffer.concat([
      Buffer.from(`0${this.version}`, 'hex'),
      multicodec.getCodeVarint(this.codec),
      mh.prefix(this.multihash)
    ])
  }

  /**
   * Convert to a CID of version `0`.
   *
   * @returns {CID}
   */
  toV0 () {
    if (this.codec !== 'dag-pb') {
      throw new Error('Cannot convert a non dag-pb CID to CIDv0')
    }

    const { name, length } = mh.decode(this.multihash)

    if (name !== 'sha2-256') {
      throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0')
    }

    if (length !== 32) {
      throw new Error('Cannot convert non 32 byte multihash CID to CIDv0')
    }

    return new _CID(0, this.codec, this.multihash)
  }

  /**
   * Convert to a CID of version `1`.
   *
   * @returns {CID}
   */
  toV1 () {
    return new _CID(1, this.codec, this.multihash)
  }

  /**
   * Encode the CID into a string.
   *
   * @param {string} [base=this.multibaseName] - Base encoding to use.
   * @returns {string}
   */
  toBaseEncodedString (base = this.multibaseName) {
    if (this.string && base === this.multibaseName) {
      return this.string
    }
    let str = null
    if (this.version === 0) {
      if (base !== 'base58btc') {
        throw new Error('not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()')
      }
      str = mh.toB58String(this.multihash)
    } else if (this.version === 1) {
      str = multibase.encode(base, this.buffer).toString()
    } else {
      throw new Error('unsupported version')
    }
    if (base === this.multibaseName) {
      // cache the string value
      Object.defineProperty(this, 'string', { value: str })
    }
    return str
  }

  /**
   * CID(QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n)
   *
   * @returns {String}
   */
  [Symbol.for('nodejs.util.inspect.custom')] () {
    return 'CID(' + this.toString() + ')'
  }

  toString (base) {
    return this.toBaseEncodedString(base)
  }

  /**
   * Serialize to a plain object.
   *
   * @returns {SerializedCID}
   */
  toJSON () {
    return {
      codec: this.codec,
      version: this.version,
      hash: this.multihash
    }
  }

  /**
   * Compare equality with another CID.
   *
   * @param {CID} other
   * @returns {bool}
   */
  equals (other) {
    return this.codec === other.codec &&
      this.version === other.version &&
      this.multihash.equals(other.multihash)
  }

  /**
   * Test if the given input is a valid CID object.
   * Throws if it is not.
   *
   * @param {any} other
   * @returns {void}
   */
  static validateCID (other) {
    const errorMsg = CIDUtil.checkCIDComponents(other)
    if (errorMsg) {
      throw new Error(errorMsg)
    }
  }
}

const _CID = withIs(CID, {
  className: 'CID',
  symbolName: '@ipld/js-cid/CID'
})

_CID.codecs = codecs

module.exports = _CID


/***/ }),

/***/ "iLaE":
/*!***************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-node/rmLink.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

const rmLink = (dagNode, nameOrCid) => {
  // It's a name
  if (typeof nameOrCid === 'string') {
    dagNode._links = dagNode._links.filter((link) => link.Name !== nameOrCid)
  } else if (Buffer.isBuffer(nameOrCid) || CID.isCID(nameOrCid)) {
    dagNode._links = dagNode._links.filter(
      (link) => !link.Hash.equals(nameOrCid))
  } else {
    throw new Error('second arg needs to be a name or CID')
  }
}

module.exports = rmLink


/***/ }),

/***/ "ihTf":
/*!********************************************!*\
  !*** ./node_modules/it-to-buffer/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

/**
 * Takes an (async) iterable that yields buffer-like-objects and concats them
 * into one buffer
 * @param {AsyncIterable<Buffer>|Iterable<Buffer>} stream
 * @returns {Promise<Buffer>}
 */
async function toBuffer (stream) {
  let buffer = Buffer.alloc(0)

  for await (const buf of stream) {
    buffer = Buffer.concat([buffer, buf], buffer.length + buf.length)
  }

  return buffer
}

module.exports = toBuffer


/***/ }),

/***/ "jARG":
/*!***********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/patch/append-data.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const multipartRequest = __webpack_require__(/*! ../../lib/multipart-request */ "VWqr")
const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure(api => {
  return async (cid, data, options = {}) => {
    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    const res = await api.post('object/patch/append-data', {
      timeout: options.timeout,
      signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`,
        ...options
      }),
      ...(
        await multipartRequest(data, controller, options.headers)
      )
    })

    const { Hash } = await res.json()

    return new CID(Hash)
  }
})


/***/ }),

/***/ "jLSz":
/*!*************************************************************!*\
  !*** ./src/app/pages/mint-card/mint-card-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: MintCardPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MintCardPageRoutingModule", function() { return MintCardPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _mint_card_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mint-card.page */ "FoBi");




const routes = [
    {
        path: '',
        component: _mint_card_page__WEBPACK_IMPORTED_MODULE_3__["MintCardPage"]
    }
];
let MintCardPageRoutingModule = class MintCardPageRoutingModule {
};
MintCardPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], MintCardPageRoutingModule);



/***/ }),

/***/ "jpl7":
/*!*******************************************!*\
  !*** ./node_modules/borc/src/diagnose.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const Decoder = __webpack_require__(/*! ./decoder */ "hDHj")
const utils = __webpack_require__(/*! ./utils */ "XuWj")

/**
 * Output the diagnostic format from a stream of CBOR bytes.
 *
 */
class Diagnose extends Decoder {
  createTag (tagNumber, value) {
    return `${tagNumber}(${value})`
  }

  createInt (val) {
    return super.createInt(val).toString()
  }

  createInt32 (f, g) {
    return super.createInt32(f, g).toString()
  }

  createInt64 (f1, f2, g1, g2) {
    return super.createInt64(f1, f2, g1, g2).toString()
  }

  createInt32Neg (f, g) {
    return super.createInt32Neg(f, g).toString()
  }

  createInt64Neg (f1, f2, g1, g2) {
    return super.createInt64Neg(f1, f2, g1, g2).toString()
  }

  createTrue () {
    return 'true'
  }

  createFalse () {
    return 'false'
  }

  createFloat (val) {
    const fl = super.createFloat(val)
    if (utils.isNegativeZero(val)) {
      return '-0_1'
    }

    return `${fl}_1`
  }

  createFloatSingle (a, b, c, d) {
    const fl = super.createFloatSingle(a, b, c, d)
    return `${fl}_2`
  }

  createFloatDouble (a, b, c, d, e, f, g, h) {
    const fl = super.createFloatDouble(a, b, c, d, e, f, g, h)
    return `${fl}_3`
  }

  createByteString (raw, len) {
    const val = raw.join(', ')

    if (len === -1) {
      return `(_ ${val})`
    }
    return `h'${val}`
  }

  createByteStringFromHeap (start, end) {
    const val = (Buffer.from(
      super.createByteStringFromHeap(start, end)
    )).toString('hex')

    return `h'${val}'`
  }

  createInfinity () {
    return 'Infinity_1'
  }

  createInfinityNeg () {
    return '-Infinity_1'
  }

  createNaN () {
    return 'NaN_1'
  }

  createNaNNeg () {
    return '-NaN_1'
  }

  createNull () {
    return 'null'
  }

  createUndefined () {
    return 'undefined'
  }

  createSimpleUnassigned (val) {
    return `simple(${val})`
  }

  createArray (arr, len) {
    const val = super.createArray(arr, len)

    if (len === -1) {
      // indefinite
      return `[_ ${val.join(', ')}]`
    }

    return `[${val.join(', ')}]`
  }

  createMap (map, len) {
    const val = super.createMap(map)
    const list = Array.from(val.keys())
      .reduce(collectObject(val), '')

    if (len === -1) {
      return `{_ ${list}}`
    }

    return `{${list}}`
  }

  createObject (obj, len) {
    const val = super.createObject(obj)
    const map = Object.keys(val)
      .reduce(collectObject(val), '')

    if (len === -1) {
      return `{_ ${map}}`
    }

    return `{${map}}`
  }

  createUtf8String (raw, len) {
    const val = raw.join(', ')

    if (len === -1) {
      return `(_ ${val})`
    }

    return `"${val}"`
  }

  createUtf8StringFromHeap (start, end) {
    const val = (Buffer.from(
      super.createUtf8StringFromHeap(start, end)
    )).toString('utf8')

    return `"${val}"`
  }

  static diagnose (input, enc) {
    if (typeof input === 'string') {
      input = Buffer.from(input, enc || 'hex')
    }

    const dec = new Diagnose()
    return dec.decodeFirst(input)
  }
}

module.exports = Diagnose

function collectObject (val) {
  return (acc, key) => {
    if (acc) {
      return `${acc}, ${key}: ${val[key]}`
    }
    return `${key}: ${val[key]}`
  }
}


/***/ }),

/***/ "k5gp":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pubsub/ls.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const { Strings } = await (await api.post('pubsub/ls', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })).json()

    return Strings || []
  }
})


/***/ }),

/***/ "kB5k":
/*!************************************************!*\
  !*** ./node_modules/bignumber.js/bignumber.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v9.0.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2020 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                    // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        prefix: '',
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ',',
        decimalSeparator: '.',
        fractionGroupSize: 0,
        fractionGroupSeparator: '\xA0',      // non-breaking space
        suffix: ''
      },

      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
      // '-', '.', whitespace, or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(v, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor call without `new`.
      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {

        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

          // Fast path for integers, where n < 2147483648 (2**31).
          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++);

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {

          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        }

        // Prevent later check for length on converted number.
        isNum = false;
        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      if (str = str.slice(i, ++len)) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
            throw Error
             (tooManyDigits + (x.s * v));
        }

         // Overflow?
        if ((e = e - i - 1) > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;  // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if less than two characters,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.
            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */
    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;

      var i, n,
        c = v.c,
        e = v.e,
        s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {

        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          }

          // Calculate number of digits that c[0] should have, based on the exponent.
          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE;

          // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
          if (String(c[0]).length == i) {

            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            }

            // Last element cannot be zero, unless it is the only element.
            if (n !== 0) return true;
          }
        }

      // Infinity/NaN
      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error
        (bignumberError + 'Invalid BigNumber: ' + v);
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.sum = function () {
      var i = 1,
        args = arguments,
        sum = new BigNumber(args[0]);
      for (; i < args.length;) sum = sum.plus(args[i++]);
      return sum;
    };


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    function maxOrMin(args, method) {
      var n,
        i = 1,
        m = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        n = new BigNumber(args[i]);

        // If any number is NaN, return NaN.
        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.s = null;
        }

        x.c = x.e = null;
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    function valueOf(n) {
      var str,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+valueOf(x));

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '5e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */
    P.toFormat = function (dp, rm, format) {
      var str,
        x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error
          (bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
          arr = str.split('.'),
          g1 = +format.groupSize,
          g2 = +format.secondaryGroupSize,
          groupSeparator = format.groupSeparator || '',
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = x.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);
          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + (format.fractionGroupSeparator || ''))
          : fractionPart)
         : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };


    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

      MAX_EXP = exp;

      return r;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +valueOf(this);
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(coeffToString(n.c), e)
           : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };


    P._isBigNumber = true;

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS

  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);

    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + String(n));
    }
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "kE5N":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/block/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  get: __webpack_require__(/*! ./get */ "DgJx")(config),
  stat: __webpack_require__(/*! ./stat */ "UmrH")(config),
  put: __webpack_require__(/*! ./put */ "v6zs")(config),
  rm: __webpack_require__(/*! ./rm */ "MVac")(config)
})


/***/ }),

/***/ "kFje":
/*!****************************************!*\
  !*** ./node_modules/it-tar/extract.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const defer = __webpack_require__(/*! p-defer */ "RRrQ")
const Headers = __webpack_require__(/*! ./extract-headers */ "D13v")
const LteReader = __webpack_require__(/*! ./lte-reader */ "vpf6")

function getPadding (size) {
  size &= 511
  return size && 512 - size
}

async function discardPadding (reader, size) {
  const overflow = getPadding(size)
  if (overflow) await reader.next(overflow)
}

module.exports = options => {
  options = options || {}
  options.highWaterMark = options.highWaterMark || 1024 * 16

  return source => (async function * () {
    const reader = LteReader(source)
    let gnuLongPath, gnuLongLinkPath, paxGlobal, pax

    try {
      while (true) {
        let headerBytes
        try {
          const { done, value } = await reader.next(512)
          if (done) return
          headerBytes = value
        } catch (err) {
          // Is ok, this is the end of the stream!
          if (err.code === 'ERR_UNDER_READ') return
          throw err
        }

        const header = Headers.decode(headerBytes, options.filenameEncoding)
        if (!header) continue

        if (header.type === 'gnu-long-path') {
          const { done, value: gnuLongPathBytes } = await reader.next(header.size)
          if (done) return
          gnuLongPath = Headers.decodeLongPath(gnuLongPathBytes, options.filenameEncoding)
          await discardPadding(reader, header.size)
          continue
        }

        if (header.type === 'gnu-long-link-path') {
          const { done, value: gnuLongLinkPathBytes } = await reader.next(header.size)
          if (done) return
          gnuLongLinkPath = Headers.decodeLongPath(gnuLongLinkPathBytes, options.filenameEncoding)
          await discardPadding(reader, header.size)
          continue
        }

        if (header.type === 'pax-global-header') {
          const { done, value: paxGlobalBytes } = await reader.next(header.size)
          if (done) return
          paxGlobal = Headers.decodePax(paxGlobalBytes, options.filenameEncoding)
          await discardPadding(reader, header.size)
          continue
        }

        if (header.type === 'pax-header') {
          const { done, value: paxBytes } = await reader.next(header.size)
          if (done) return
          pax = Headers.decodePax(paxBytes, options.filenameEncoding)
          if (paxGlobal) pax = { ...paxGlobal, ...pax }
          await discardPadding(reader, header.size)
          continue
        }

        if (gnuLongPath) {
          header.name = gnuLongPath
          gnuLongPath = null
        }

        if (gnuLongLinkPath) {
          header.linkname = gnuLongLinkPath
          gnuLongLinkPath = null
        }

        if (pax) {
          if (pax.path) header.name = pax.path
          if (pax.linkpath) header.linkname = pax.linkpath
          if (pax.size) header.size = parseInt(pax.size, 10)
          header.pax = pax
          pax = null
        }

        if (!header.size || header.type === 'directory') {
          yield { header, body: (async function * () {})() }
          continue
        }

        let bytesRemaining = header.size
        const bodyConsumed = defer()

        // Prefetch the first chunk.
        // This allows us to stream entries for small files from the tar without
        // explicitly streaming the body of each.
        const firstChunk = await reader.nextLte(Math.min(bytesRemaining, options.highWaterMark))
        bytesRemaining -= firstChunk.value.length

        if (!bytesRemaining) bodyConsumed.resolve()

        const body = (async function * () {
          try {
            yield firstChunk.value

            while (bytesRemaining) {
              const { done, value } = await reader.nextLte(bytesRemaining)
              if (done) {
                bytesRemaining = 0
                return
              }
              bytesRemaining -= value.length
              yield value
            }
          } finally {
            bodyConsumed.resolve()
          }
        })()

        yield { header, body }

        // Wait for the body to be consumed
        await bodyConsumed.promise

        // Incase the body was not consumed entirely...
        if (bytesRemaining) {
          for await (const _ of body) {} // eslint-disable-line no-unused-vars
        }

        await discardPadding(reader, header.size)
      }
    } finally {
      await reader.return()
    }
  })()
}


/***/ }),

/***/ "kKZ4":
/*!***************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/stop.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('shutdown', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    await res.text()
  }
})


/***/ }),

/***/ "kdNz":
/*!**************************************************!*\
  !*** ./node_modules/abort-controller/browser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*globals self, window */


/*eslint-disable @mysticatea/prettier */
const { AbortController, AbortSignal } =
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    /* otherwise */ undefined
/*eslint-enable @mysticatea/prettier */

module.exports = AbortController
module.exports.AbortSignal = AbortSignal
module.exports.default = AbortController


/***/ }),

/***/ "kfWR":
/*!*******************************************************!*\
  !*** ./node_modules/protocol-buffers-schema/parse.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(/*! ./tokenize */ "lelp")
var MAX_RANGE = 0x1FFFFFFF

// "Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire types) can be declared "packed"."
// https://developers.google.com/protocol-buffers/docs/encoding#optional
var PACKABLE_TYPES = [
  // varint wire types
  'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'bool',
  // + ENUMS
  // 64-bit wire types
  'fixed64', 'sfixed64', 'double',
  // 32-bit wire types
  'fixed32', 'sfixed32', 'float'
]

var onfieldoptionvalue = function (tokens) {
  var value = tokens.shift()
  if (value !== '{') {
    return value
  }
  value = {}
  var field = ''
  while (tokens.length) {
    switch (tokens[0]) {
      case '}':
        tokens.shift()
        return value
      case ':':
        tokens.shift()
        value[field] = onfieldoptionvalue(tokens)
        break
      default:
        field = tokens.shift()
    }
  }
}

var onfieldoptions = function (tokens) {
  var opts = {}

  while (tokens.length) {
    switch (tokens[0]) {
      case '[':
      case ',': {
        tokens.shift()
        var name = tokens.shift()
        if (name === '(') { // handling [(A) = B]
          name = tokens.shift()
          tokens.shift() // remove the end of bracket
        }
        var field = []
        if (tokens[0][0] === '.') {
          field = tokens[0].substr(1).split('.')
          tokens.shift()
        }
        if (tokens[0] !== '=') throw new Error('Unexpected token in field options: ' + tokens[0])
        tokens.shift()
        if (tokens[0] === ']') throw new Error('Unexpected ] in field option')

        // for option (A).b.c
        // path will be ['A', 'b'] and lastFieldName 'c'
        var path = [name].concat(field)
        var lastFieldName = path.pop()

        // opt references opts.A.b
        var opt = path.reduce(function (opt, n, index) {
          if (opt[n] == null) {
            opt[n] = {}
          }
          return opt[n]
        }, opts)

        // now set opt['c'] that references opts.A.b['c']
        opt[lastFieldName] = onfieldoptionvalue(tokens)
        break
      }
      case ']':
        tokens.shift()
        return opts

      default:
        throw new Error('Unexpected token in field options: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for field options')
}

var onfield = function (tokens) {
  var field = {
    name: null,
    type: null,
    tag: -1,
    map: null,
    oneof: null,
    required: false,
    repeated: false,
    options: {}
  }

  while (tokens.length) {
    switch (tokens[0]) {
      case '=':
        tokens.shift()
        field.tag = Number(tokens.shift())
        break

      case 'map':
        field.type = 'map'
        field.map = { from: null, to: null }
        tokens.shift()
        if (tokens[0] !== '<') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift()
        field.map.from = tokens.shift()
        if (tokens[0] !== ',') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift()
        field.map.to = tokens.shift()
        if (tokens[0] !== '>') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift()
        field.name = tokens.shift()
        break

      case 'repeated':
      case 'required':
      case 'optional':
        var t = tokens.shift()
        field.required = t === 'required'
        field.repeated = t === 'repeated'
        field.type = tokens.shift()
        field.name = tokens.shift()
        break

      case '[':
        field.options = onfieldoptions(tokens)
        break

      case ';':
        if (field.name === null) throw new Error('Missing field name')
        if (field.type === null) throw new Error('Missing type in message field: ' + field.name)
        if (field.tag === -1) throw new Error('Missing tag number in message field: ' + field.name)
        tokens.shift()
        return field

      default:
        throw new Error('Unexpected token in message field: ' + tokens[0])
    }
  }

  throw new Error('No ; found for message field')
}

var onmessagebody = function (tokens) {
  var body = {
    enums: [],
    options: {},
    messages: [],
    fields: [],
    extends: [],
    extensions: null
  }

  while (tokens.length) {
    switch (tokens[0]) {
      case 'map':
      case 'repeated':
      case 'optional':
      case 'required':
        body.fields.push(onfield(tokens))
        break

      case 'enum':
        body.enums.push(onenum(tokens))
        break

      case 'message':
        body.messages.push(onmessage(tokens))
        break

      case 'extensions':
        body.extensions = onextensions(tokens)
        break

      case 'oneof':
        tokens.shift()
        var name = tokens.shift()
        if (tokens[0] !== '{') throw new Error('Unexpected token in oneof: ' + tokens[0])
        tokens.shift()
        while (tokens[0] !== '}') {
          tokens.unshift('optional')
          var field = onfield(tokens)
          field.oneof = name
          body.fields.push(field)
        }
        tokens.shift()
        break

      case 'extend':
        body.extends.push(onextend(tokens))
        break

      case ';':
        tokens.shift()
        break

      case 'reserved':
        tokens.shift()
        while (tokens[0] !== ';') {
          tokens.shift()
        }
        break

      case 'option':
        var opt = onoption(tokens)
        if (body.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
        body.options[opt.name] = opt.value
        break

      default:
        // proto3 does not require the use of optional/required, assumed as optional
        // "singular: a well-formed message can have zero or one of this field (but not more than one)."
        // https://developers.google.com/protocol-buffers/docs/proto3#specifying-field-rules
        tokens.unshift('optional')
        body.fields.push(onfield(tokens))
    }
  }

  return body
}

var onextend = function (tokens) {
  var out = {
    name: tokens[1],
    message: onmessage(tokens)
  }
  return out
}

var onextensions = function (tokens) {
  tokens.shift()
  var from = Number(tokens.shift())
  if (isNaN(from)) throw new Error('Invalid from in extensions definition')
  if (tokens.shift() !== 'to') throw new Error("Expected keyword 'to' in extensions definition")
  var to = tokens.shift()
  if (to === 'max') to = MAX_RANGE
  to = Number(to)
  if (isNaN(to)) throw new Error('Invalid to in extensions definition')
  if (tokens.shift() !== ';') throw new Error('Missing ; in extensions definition')
  return { from: from, to: to }
}
var onmessage = function (tokens) {
  tokens.shift()

  var lvl = 1
  var body = []
  var msg = {
    name: tokens.shift(),
    options: {},
    enums: [],
    extends: [],
    messages: [],
    fields: []
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '{') lvl++
    else if (tokens[0] === '}') lvl--

    if (!lvl) {
      tokens.shift()
      body = onmessagebody(body)
      msg.enums = body.enums
      msg.messages = body.messages
      msg.fields = body.fields
      msg.extends = body.extends
      msg.extensions = body.extensions
      msg.options = body.options
      return msg
    }

    body.push(tokens.shift())
  }

  if (lvl) throw new Error('No closing tag for message')
}

var onpackagename = function (tokens) {
  tokens.shift()
  var name = tokens.shift()
  if (tokens[0] !== ';') throw new Error('Expected ; but found ' + tokens[0])
  tokens.shift()
  return name
}

var onsyntaxversion = function (tokens) {
  tokens.shift()

  if (tokens[0] !== '=') throw new Error('Expected = but found ' + tokens[0])
  tokens.shift()

  var version = tokens.shift()
  switch (version) {
    case '"proto2"':
      version = 2
      break

    case '"proto3"':
      version = 3
      break

    default:
      throw new Error('Expected protobuf syntax version but found ' + version)
  }

  if (tokens[0] !== ';') throw new Error('Expected ; but found ' + tokens[0])
  tokens.shift()

  return version
}

var onenumvalue = function (tokens) {
  if (tokens.length < 4) throw new Error('Invalid enum value: ' + tokens.slice(0, 3).join(' '))
  if (tokens[1] !== '=') throw new Error('Expected = but found ' + tokens[1])
  if (tokens[3] !== ';' && tokens[3] !== '[') throw new Error('Expected ; or [ but found ' + tokens[1])

  var name = tokens.shift()
  tokens.shift()
  var val = {
    value: null,
    options: {}
  }
  val.value = Number(tokens.shift())
  if (tokens[0] === '[') {
    val.options = onfieldoptions(tokens)
  }
  tokens.shift() // expecting the semicolon here

  return {
    name: name,
    val: val
  }
}

var onenum = function (tokens) {
  tokens.shift()
  var options = {}
  var e = {
    name: tokens.shift(),
    values: {},
    options: {}
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift()
      return e
    }
    if (tokens[0] === 'option') {
      options = onoption(tokens)
      e.options[options.name] = options.value
      continue
    }
    var val = onenumvalue(tokens)
    e.values[val.name] = val.val
  }

  throw new Error('No closing tag for enum')
}

var onoption = function (tokens) {
  var name = null
  var value = null

  var parse = function (value) {
    if (value === 'true') return true
    if (value === 'false') return false
    return value.replace(/^"+|"+$/gm, '')
  }

  while (tokens.length) {
    if (tokens[0] === ';') {
      tokens.shift()
      return { name: name, value: value }
    }
    switch (tokens[0]) {
      case 'option':
        tokens.shift()

        var hasBracket = tokens[0] === '('
        if (hasBracket) tokens.shift()

        name = tokens.shift()

        if (hasBracket) {
          if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
          tokens.shift()
        }

        if (tokens[0][0] === '.') {
          name += tokens.shift()
        }

        break

      case '=':
        tokens.shift()
        if (name === null) throw new Error('Expected key for option with value: ' + tokens[0])
        value = parse(tokens.shift())

        if (name === 'optimize_for' && !/^(SPEED|CODE_SIZE|LITE_RUNTIME)$/.test(value)) {
          throw new Error('Unexpected value for option optimize_for: ' + value)
        } else if (value === '{') {
          // option foo = {bar: baz}
          value = onoptionMap(tokens)
        }
        break

      default:
        throw new Error('Unexpected token in option: ' + tokens[0])
    }
  }
}

var onoptionMap = function (tokens) {
  var parse = function (value) {
    if (value === 'true') return true
    if (value === 'false') return false
    return value.replace(/^"+|"+$/gm, '')
  }

  var map = {}

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      return map
    }

    var hasBracket = tokens[0] === '('
    if (hasBracket) tokens.shift()

    var key = tokens.shift()
    if (hasBracket) {
      if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
      tokens.shift()
    }

    var value = null

    switch (tokens[0]) {
      case ':':
        if (map[key] !== undefined) throw new Error('Duplicate option map key ' + key)

        tokens.shift()

        value = parse(tokens.shift())

        if (value === '{') {
          // option foo = {bar: baz}
          value = onoptionMap(tokens)
        }

        map[key] = value

        if (tokens[0] === ';') {
          tokens.shift()
        }
        break

      case '{':
        tokens.shift()
        value = onoptionMap(tokens)

        if (map[key] === undefined) map[key] = []
        if (!Array.isArray(map[key])) throw new Error('Duplicate option map key ' + key)

        map[key].push(value)
        break

      default:
        throw new Error('Unexpected token in option map: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for option map')
}

var onimport = function (tokens) {
  tokens.shift()
  var file = tokens.shift().replace(/^"+|"+$/gm, '')

  if (tokens[0] !== ';') throw new Error('Unexpected token: ' + tokens[0] + '. Expected ";"')

  tokens.shift()
  return file
}

var onservice = function (tokens) {
  tokens.shift()

  var service = {
    name: tokens.shift(),
    methods: [],
    options: {}
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift()
      return service
    }

    switch (tokens[0]) {
      case 'option':
        var opt = onoption(tokens)
        if (service.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
        service.options[opt.name] = opt.value
        break
      case 'rpc':
        service.methods.push(onrpc(tokens))
        break
      default:
        throw new Error('Unexpected token in service: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for service')
}

var onrpc = function (tokens) {
  tokens.shift()

  var rpc = {
    name: tokens.shift(),
    input_type: null,
    output_type: null,
    client_streaming: false,
    server_streaming: false,
    options: {}
  }

  if (tokens[0] !== '(') throw new Error('Expected ( but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] === 'stream') {
    tokens.shift()
    rpc.client_streaming = true
  }

  rpc.input_type = tokens.shift()

  if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] !== 'returns') throw new Error('Expected returns but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] !== '(') throw new Error('Expected ( but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] === 'stream') {
    tokens.shift()
    rpc.server_streaming = true
  }

  rpc.output_type = tokens.shift()

  if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] === ';') {
    tokens.shift()
    return rpc
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift()
      return rpc
    }

    if (tokens[0] === 'option') {
      var opt = onoption(tokens)
      if (rpc.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
      rpc.options[opt.name] = opt.value
    } else {
      throw new Error('Unexpected token in rpc options: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for rpc')
}

var parse = function (buf) {
  var tokens = tokenize(buf.toString())
  // check for isolated strings in tokens by looking for opening quote
  for (var i = 0; i < tokens.length; i++) {
    if (/^("|')([^'"]*)$/.test(tokens[i])) {
      var j
      if (tokens[i].length === 1) {
        j = i + 1
      } else {
        j = i
      }
      // look ahead for the closing quote and collapse all
      // in-between tokens into a single token
      for (j; j < tokens.length; j++) {
        if (/^[^'"\\]*(?:\\.[^'"\\]*)*("|')$/.test(tokens[j])) {
          tokens = tokens.slice(0, i).concat(tokens.slice(i, j + 1).join('')).concat(tokens.slice(j + 1))
          break
        }
      }
    }
  }
  var schema = {
    syntax: 3,
    package: null,
    imports: [],
    enums: [],
    messages: [],
    options: {},
    extends: []
  }

  var firstline = true

  while (tokens.length) {
    switch (tokens[0]) {
      case 'package':
        schema.package = onpackagename(tokens)
        break

      case 'syntax':
        if (!firstline) throw new Error('Protobuf syntax version should be first thing in file')
        schema.syntax = onsyntaxversion(tokens)
        break

      case 'message':
        schema.messages.push(onmessage(tokens))
        break

      case 'enum':
        schema.enums.push(onenum(tokens))
        break

      case 'option':
        var opt = onoption(tokens)
        if (schema.options[opt.name]) throw new Error('Duplicate option ' + opt.name)
        schema.options[opt.name] = opt.value
        break

      case 'import':
        schema.imports.push(onimport(tokens))
        break

      case 'extend':
        schema.extends.push(onextend(tokens))
        break

      case 'service':
        if (!schema.services) schema.services = []
        schema.services.push(onservice(tokens))
        break

      default:
        throw new Error('Unexpected token: ' + tokens[0])
    }
    firstline = false
  }

  // now iterate over messages and propagate extends
  schema.extends.forEach(function (ext) {
    schema.messages.forEach(function (msg) {
      if (msg.name === ext.name) {
        ext.message.fields.forEach(function (field) {
          if (!msg.extensions || field.tag < msg.extensions.from || field.tag > msg.extensions.to) {
            throw new Error(msg.name + ' does not declare ' + field.tag + ' as an extension number')
          }
          msg.fields.push(field)
        })
      }
    })
  })

  schema.messages.forEach(function (msg) {
    msg.fields.forEach(function (field) {
      var fieldSplit
      var messageName
      var nestedEnumName
      var message

      function enumNameIsFieldType (en) {
        return en.name === field.type
      }

      function enumNameIsNestedEnumName (en) {
        return en.name === nestedEnumName
      }

      if (field.options && field.options.packed === 'true') {
        if (PACKABLE_TYPES.indexOf(field.type) === -1) {
          // let's see if it's an enum
          if (field.type.indexOf('.') === -1) {
            if (msg.enums && msg.enums.some(enumNameIsFieldType)) {
              return
            }
          } else {
            fieldSplit = field.type.split('.')
            if (fieldSplit.length > 2) {
              throw new Error('what is this?')
            }

            messageName = fieldSplit[0]
            nestedEnumName = fieldSplit[1]

            schema.messages.some(function (msg) {
              if (msg.name === messageName) {
                message = msg
                return msg
              }
            })

            if (message && message.enums && message.enums.some(enumNameIsNestedEnumName)) {
              return
            }
          }

          throw new Error(
            'Fields of type ' + field.type + ' cannot be declared [packed=true]. ' +
            'Only repeated fields of primitive numeric types (types which use ' +
            'the varint, 32-bit, or 64-bit wire types) can be declared "packed". ' +
            'See https://developers.google.com/protocol-buffers/docs/encoding#optional'
          )
        }
      }
    })
  })

  return schema
}

module.exports = parse


/***/ }),

/***/ "kh7n":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/refs/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure((api, options) => {
  const refs = async function * (args, options = {}) {
    if (!Array.isArray(args)) {
      args = [args]
    }

    const res = await api.post('refs', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: args.map(arg => `${Buffer.isBuffer(arg) ? new CID(arg) : arg}`),
        ...options
      }),
      headers: options.headers,
      transform: toCamel
    })

    yield * res.ndjson()
  }
  refs.local = __webpack_require__(/*! ./local */ "CuFS")(options)

  return refs
})


/***/ }),

/***/ "kv0P":
/*!*****************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multiaddr/src/convert.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const ip = __webpack_require__(/*! ./ip */ "S/MC")
const protocols = __webpack_require__(/*! ./protocols-table */ "UBdu")
const CID = __webpack_require__(/*! cids */ "iARh")
const multibase = __webpack_require__(/*! multibase */ "pRS+")
const varint = __webpack_require__(/*! varint */ "JhIh")

module.exports = Convert

// converts (serializes) addresses
function Convert (proto, a) {
  if (a instanceof Buffer) {
    return Convert.toString(proto, a)
  } else {
    return Convert.toBuffer(proto, a)
  }
}

Convert.toString = function convertToString (proto, buf) {
  proto = protocols(proto)
  switch (proto.code) {
    case 4: // ipv4
    case 41: // ipv6
      return buf2ip(buf)

    case 6: // tcp
    case 273: // udp
    case 33: // dccp
    case 132: // sctp
      return buf2port(buf)

    case 53: // dns
    case 54: // dns4
    case 55: // dns6
    case 56: // dnsaddr
    case 400: // unix
    case 777: // memory
      return buf2str(buf)

    case 421: // ipfs
      return buf2mh(buf)
    case 444: // onion
      return buf2onion(buf)
    case 445: // onion3
      return buf2onion(buf)
    default:
      return buf.toString('hex') // no clue. convert to hex
  }
}

Convert.toBuffer = function convertToBuffer (proto, str) {
  proto = protocols(proto)
  switch (proto.code) {
    case 4: // ipv4
      return ip2buf(str)
    case 41: // ipv6
      return ip2buf(str)

    case 6: // tcp
    case 273: // udp
    case 33: // dccp
    case 132: // sctp
      return port2buf(parseInt(str, 10))

    case 53: // dns
    case 54: // dns4
    case 55: // dns6
    case 56: // dnsaddr
    case 400: // unix
    case 777: // memory
      return str2buf(str)

    case 421: // ipfs
      return mh2buf(str)
    case 444: // onion
      return onion2buf(str)
    case 445: // onion3
      return onion32buf(str)
    default:
      return Buffer.from(str, 'hex') // no clue. convert from hex
  }
}

function ip2buf (ipString) {
  if (!ip.isIP(ipString)) {
    throw new Error('invalid ip address')
  }
  return ip.toBuffer(ipString)
}

function buf2ip (ipBuff) {
  const ipString = ip.toString(ipBuff)
  if (!ipString || !ip.isIP(ipString)) {
    throw new Error('invalid ip address')
  }
  return ipString
}

function port2buf (port) {
  const buf = Buffer.alloc(2)
  buf.writeUInt16BE(port, 0)
  return buf
}

function buf2port (buf) {
  return buf.readUInt16BE(0)
}

function str2buf (str) {
  const buf = Buffer.from(str)
  const size = Buffer.from(varint.encode(buf.length))
  return Buffer.concat([size, buf])
}

function buf2str (buf) {
  const size = varint.decode(buf)
  buf = buf.slice(varint.decode.bytes)

  if (buf.length !== size) {
    throw new Error('inconsistent lengths')
  }

  return buf.toString()
}

function mh2buf (hash) {
  // the address is a varint prefixed multihash string representation
  const mh = new CID(hash).multihash
  const size = Buffer.from(varint.encode(mh.length))
  return Buffer.concat([size, mh])
}

function buf2mh (buf) {
  const size = varint.decode(buf)
  const address = buf.slice(varint.decode.bytes)

  if (address.length !== size) {
    throw new Error('inconsistent lengths')
  }
  return multibase.encode('base58btc', address).toString().slice(1)
}

function onion2buf (str) {
  const addr = str.split(':')
  if (addr.length !== 2) {
    throw new Error('failed to parse onion addr: ' + addr + ' does not contain a port number')
  }
  if (addr[0].length !== 16) {
    throw new Error('failed to parse onion addr: ' + addr[0] + ' not a Tor onion address.')
  }

  // onion addresses do not include the multibase prefix, add it before decoding
  const buf = multibase.decode('b' + addr[0])

  // onion port number
  const port = parseInt(addr[1], 10)
  if (port < 1 || port > 65536) {
    throw new Error('Port number is not in range(1, 65536)')
  }
  const portBuf = port2buf(port)
  return Buffer.concat([buf, portBuf])
}

function onion32buf (str) {
  const addr = str.split(':')
  if (addr.length !== 2) {
    throw new Error('failed to parse onion addr: ' + addr + ' does not contain a port number')
  }
  if (addr[0].length !== 56) {
    throw new Error('failed to parse onion addr: ' + addr[0] + ' not a Tor onion3 address.')
  }
  // onion addresses do not include the multibase prefix, add it before decoding
  const buf = multibase.decode('b' + addr[0])

  // onion port number
  const port = parseInt(addr[1], 10)
  if (port < 1 || port > 65536) {
    throw new Error('Port number is not in range(1, 65536)')
  }
  const portBuf = port2buf(port)
  return Buffer.concat([buf, portBuf])
}

function buf2onion (buf) {
  const addrBytes = buf.slice(0, buf.length - 2)
  const portBytes = buf.slice(buf.length - 2)
  const addr = multibase.encode('base32', addrBytes).toString().slice(1)
  const port = buf2port(portBytes)
  return addr + ':' + port
}


/***/ }),

/***/ "l9qE":
/*!*************************************************************************************!*\
  !*** ./node_modules/ipfs-core-utils/src/files/normalise-input/normalise-content.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const errCode = __webpack_require__(/*! err-code */ "tqrP")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const browserStreamToIt = __webpack_require__(/*! browser-readablestream-to-it */ "YBeJ")
const blobToIt = __webpack_require__(/*! blob-to-it */ "wCAA")
const itPeekable = __webpack_require__(/*! it-peekable */ "oSeY")
const all = __webpack_require__(/*! it-all */ "QcWL")
const map = __webpack_require__(/*! it-map */ "XW02")
const {
  isBytes,
  isBlob
} = __webpack_require__(/*! ./utils */ "q7FP")

async function * toAsyncIterable (input) {
  // Bytes | String
  if (isBytes(input) || typeof input === 'string' || input instanceof String) {
    yield toBuffer(input)
    return
  }

  // Blob
  if (isBlob(input)) {
    yield * blobToIt(input)
    return
  }

  // Browser stream
  if (typeof input.getReader === 'function') {
    input = browserStreamToIt(input)
  }

  // (Async)Iterator<?>
  if (input[Symbol.iterator] || input[Symbol.asyncIterator]) {
    const peekable = itPeekable(input)
    const { value, done } = await peekable.peek()

    if (done) {
      // make sure empty iterators result in empty files
      yield * peekable
      return
    }

    peekable.push(value)

    // (Async)Iterable<Number>
    if (Number.isInteger(value)) {
      yield toBuffer(await all(peekable))
      return
    }

    // (Async)Iterable<Bytes|String>
    if (isBytes(value) || typeof value === 'string' || value instanceof String) {
      yield * map(peekable, chunk => toBuffer(chunk))
      return
    }
  }

  throw errCode(new Error(`Unexpected input: ${input}`), 'ERR_UNEXPECTED_INPUT')
}

function toBuffer (chunk) {
  return isBytes(chunk) ? chunk : Buffer.from(chunk)
}

module.exports = toAsyncIterable


/***/ }),

/***/ "lOTI":
/*!****************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-env browser */
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const multibase = __webpack_require__(/*! multibase */ "/jff")
const multicodec = __webpack_require__(/*! multicodec */ "OuWa")
const multihash = __webpack_require__(/*! multihashes */ "yP9g")
const globSource = __webpack_require__(/*! ipfs-utils/src/files/glob-source */ 10)
const urlSource = __webpack_require__(/*! ipfs-utils/src/files/url-source */ "RJ23")

/**
 * @typedef { import("./lib/core").ClientOptions } ClientOptions
 */

/**
 *
 * @param {ClientOptions } options
 * @return {Object}
 */
function ipfsClient (options = {}) {
  return {
    add: __webpack_require__(/*! ./add */ "Wbuh")(options),
    addAll: __webpack_require__(/*! ./add-all */ "dPKy")(options),
    bitswap: __webpack_require__(/*! ./bitswap */ "+X07")(options),
    block: __webpack_require__(/*! ./block */ "kE5N")(options),
    bootstrap: __webpack_require__(/*! ./bootstrap */ "SSOD")(options),
    cat: __webpack_require__(/*! ./cat */ "3l4a")(options),
    commands: __webpack_require__(/*! ./commands */ "pLen")(options),
    config: __webpack_require__(/*! ./config */ "r1gM")(options),
    dag: __webpack_require__(/*! ./dag */ "WuXv")(options),
    dht: __webpack_require__(/*! ./dht */ "/+H3")(options),
    diag: __webpack_require__(/*! ./diag */ "AVB3")(options),
    dns: __webpack_require__(/*! ./dns */ "55j7")(options),
    files: __webpack_require__(/*! ./files */ "8niS")(options),
    get: __webpack_require__(/*! ./get */ "MSQn")(options),
    getEndpointConfig: __webpack_require__(/*! ./get-endpoint-config */ "rH3+")(options),
    id: __webpack_require__(/*! ./id */ "q+hS")(options),
    key: __webpack_require__(/*! ./key */ "WpBr")(options),
    log: __webpack_require__(/*! ./log */ "Mz1a")(options),
    ls: __webpack_require__(/*! ./ls */ "wWtC")(options),
    mount: __webpack_require__(/*! ./mount */ "Qj6C")(options),
    name: __webpack_require__(/*! ./name */ "BaTB")(options),
    object: __webpack_require__(/*! ./object */ "LwYs")(options),
    pin: __webpack_require__(/*! ./pin */ "TVkR")(options),
    ping: __webpack_require__(/*! ./ping */ "rJhZ")(options),
    pubsub: __webpack_require__(/*! ./pubsub */ "QNVV")(options),
    refs: __webpack_require__(/*! ./refs */ "kh7n")(options),
    repo: __webpack_require__(/*! ./repo */ "yjWq")(options),
    resolve: __webpack_require__(/*! ./resolve */ "mjvK")(options),
    stats: __webpack_require__(/*! ./stats */ "7PTn")(options),
    stop: __webpack_require__(/*! ./stop */ "kKZ4")(options),
    shutdown: __webpack_require__(/*! ./stop */ "kKZ4")(options),
    swarm: __webpack_require__(/*! ./swarm */ "VG8o")(options),
    version: __webpack_require__(/*! ./version */ "UUTy")(options)
  }
}

Object.assign(ipfsClient, { Buffer, CID, multiaddr, multibase, multicodec, multihash, globSource, urlSource })

module.exports = ipfsClient


/***/ }),

/***/ "lelp":
/*!**********************************************************!*\
  !*** ./node_modules/protocol-buffers-schema/tokenize.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (sch) {
  var noComments = function (line) {
    var i = line.indexOf('//')
    return i > -1 ? line.slice(0, i) : line
  }

  var noMultilineComments = function () {
    var inside = false
    return function (token) {
      if (token === '/*') {
        inside = true
        return false
      }
      if (token === '*/') {
        inside = false
        return false
      }
      return !inside
    }
  }

  var trim = function (line) {
    return line.trim()
  }

  var removeQuotedLines = function (list) {
    return function (str) {
      var s = '$' + list.length + '$'
      list.push(str)
      return s
    }
  }

  var restoreQuotedLines = function (list) {
    var re = /^\$(\d+)\$$/
    return function (line) {
      var m = line.match(re)
      return m ? list[+m[1]] : line
    }
  }

  var replacements = []
  return sch
    .replace(/"(\\"|[^"\n])*?"|'(\\'|[^'\n])*?'/gm, removeQuotedLines(replacements))
    .replace(/([;,{}()=:[\]<>]|\/\*|\*\/)/g, ' $1 ')
    .split(/\n/)
    .map(trim)
    .filter(Boolean)
    .map(noComments)
    .map(trim)
    .filter(Boolean)
    .join('\n')
    .split(/\s+|\n+/gm)
    .filter(noMultilineComments())
    .map(restoreQuotedLines(replacements))
}


/***/ }),

/***/ "lpP5":
/*!******************************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/dag-node/toDagLink.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DAGLink = __webpack_require__(/*! ../dag-link/dagLink */ "i5gV")
const genCid = __webpack_require__(/*! ../genCid */ "BaaY")

/*
 * toDAGLink converts a DAGNode to a DAGLink
 */
const toDAGLink = async (node, options = {}) => {
  const nodeCid = await genCid.cid(node.serialize(), options)
  return new DAGLink(options.name || '', node.size, nodeCid)
}

module.exports = toDAGLink


/***/ }),

/***/ "lqh9":
/*!*******************************************!*\
  !*** ./node_modules/protons/src/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var schema = __webpack_require__(/*! protocol-buffers-schema */ "CN9R")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
var compile = __webpack_require__(/*! ./compile */ "0PGX")

var flatten = function (values) {
  if (!values) return null
  var result = {}
  Object.keys(values).forEach(function (k) {
    result[k] = values[k].value
  })
  return result
}

module.exports = function (proto, opts) {
  if (!opts) opts = {}
  if (!proto) throw new Error('Pass in a .proto string or a protobuf-schema parsed object')

  var sch = (typeof proto === 'object' && !Buffer.isBuffer(proto)) ? proto : schema.parse(proto)

  // to not make toString,toJSON enumarable we make a fire-and-forget prototype
  var Messages = function () {
    var self = this

    compile(sch, opts.encodings || {}).forEach(function (m) {
      self[m.name] = flatten(m.values) || m
    })
  }

  Messages.prototype.toString = function () {
    return schema.stringify(sch)
  }

  Messages.prototype.toJSON = function () {
    return sch
  }

  return new Messages()
}


/***/ }),

/***/ "m9jS":
/*!*************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bitswap/unwant.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, options = {}) => {
    const res = await api.post('bitswap/unwant', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: typeof cid === 'string' ? cid : new CID(cid).toString(),
        ...options
      }),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "mHjA":
/*!************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/configure.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-env browser */

const Client = __webpack_require__(/*! ./core */ "Cr3x")

// Set default configuration and call create function with them
/**
 * @typedef { import("./core").ClientOptions } ClientOptions
 */

/**
 * @param {function(Client, ClientOptions): void} fn
 * @returns {function(ClientOptions): void}
 */
const configure = (fn) => {
  return (options) => {
    return fn(new Client(options), options)
  }
}
module.exports = configure


/***/ }),

/***/ "mXWM":
/*!***************************************!*\
  !*** ./node_modules/it-last/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Returns the last item of an (async) iterable, unless empty, in which case
 * return `undefined`.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 */
const last = async (source) => {
  let res

  for await (const entry of source) {
    res = entry
  }

  return res
}

module.exports = last


/***/ }),

/***/ "mjvK":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/resolve.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (path, options = {}) => {
    const res = await api.post('resolve', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    })
    const { Path } = await res.json()
    return Path
  }
})


/***/ }),

/***/ "mzU7":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/key/list.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('key/list', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    const data = await res.json()

    return (data.Keys || []).map(k => toCamel(k))
  }
})


/***/ }),

/***/ "nDvq":
/*!****************************************************!*\
  !*** ./node_modules/protons/src/compile/encode.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
var defined = __webpack_require__(/*! ./utils */ "z84S").defined
var varint = __webpack_require__(/*! varint */ "JhIh")

function compileEncode (m, resolve, enc, oneofs, encodingLength) {
  var oneofsKeys = Object.keys(oneofs)
  var encLength = enc.length
  var ints = {}
  for (var i = 0; i < encLength; i++) {
    ints[i] = {
      p: varint.encode(m.fields[i].tag << 3 | 2),
      h: varint.encode(m.fields[i].tag << 3 | enc[i].type)
    }

    var field = m.fields[i]
    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false'
  }

  function encodeField (buf, offset, h, e, packed, innerVal) {
    var j = 0
    if (!packed) {
      for (j = 0; j < h.length; j++) {
        buf[offset++] = h[j]
      }
    }

    if (e.message) {
      varint.encode(e.encodingLength(innerVal), buf, offset)
      offset += varint.encode.bytes
    }

    e.encode(innerVal, buf, offset)
    return offset + e.encode.bytes
  }

  return function encode (obj, buf, offset) {
    if (offset == null) {
      offset = 0
    }
    if (buf == null) {
      buf = Buffer.allocUnsafe(encodingLength(obj))
    }

    var oldOffset = offset
    var objKeys = Object.keys(obj)
    var i = 0

    // oneof checks

    var match = false
    for (i = 0; i < oneofsKeys.length; i++) {
      var name = oneofsKeys[i]
      var prop = oneofs[i]
      if (objKeys.indexOf(prop) > -1) {
        if (match) {
          throw new Error('only one of the properties defined in oneof ' + name + ' can be set')
        }

        match = true
      }
    }

    for (i = 0; i < encLength; i++) {
      var e = enc[i]
      var field = m.fields[i] // was f
      var val = obj[field.name]
      var j = 0

      if (!defined(val)) {
        if (field.required) {
          throw new Error(field.name + ' is required')
        }
        continue
      }
      var p = ints[i].p
      var h = ints[i].h

      var packed = field.packed

      if (field.map) {
        var tmp = Object.keys(val)
        for (j = 0; j < tmp.length; j++) {
          tmp[j] = {
            key: tmp[j],
            value: val[tmp[j]]
          }
        }
        val = tmp
      }

      if (packed) {
        var packedLen = 0
        for (j = 0; j < val.length; j++) {
          if (!Object.prototype.hasOwnProperty.call(val, j)) {
            continue
          }

          packedLen += e.encodingLength(val[j])
        }

        if (packedLen) {
          for (j = 0; j < h.length; j++) {
            buf[offset++] = p[j]
          }
          varint.encode(packedLen, buf, offset)
          offset += varint.encode.bytes
        }
      }

      if (field.repeated) {
        var innerVal
        for (j = 0; j < val.length; j++) {
          innerVal = val[j]
          if (!defined(innerVal)) {
            continue
          }
          offset = encodeField(buf, offset, h, e, packed, innerVal)
        }
      } else {
        offset = encodeField(buf, offset, h, e, packed, val)
      }
    }

    encode.bytes = offset - oldOffset
    return buf
  }
}

module.exports = compileEncode


/***/ }),

/***/ "nvdC":
/*!**********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/chmod.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function chmod (path, mode, options = {}) {
    const res = await api.post('files/chmod', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        mode,
        ...options
      }),
      headers: options.headers
    })

    await res.text()
  }
})


/***/ }),

/***/ "o23V":
/*!*****************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/dht/response-types.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Response types are defined here:
// https://github.com/libp2p/go-libp2p-core/blob/6e566d10f4a5447317a66d64c7459954b969bdab/routing/query.go#L15-L24
module.exports = {
  SendingQuery: 0,
  PeerResponse: 1,
  FinalPeer: 2,
  QueryError: 3,
  Provider: 4,
  Value: 5,
  AddingPeer: 6,
  DialingPeer: 7
}


/***/ }),

/***/ "o7bL":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/repo/stat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { BigNumber } = __webpack_require__(/*! bignumber.js */ "kB5k")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('repo/stat', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    const data = await res.json()

    return {
      numObjects: new BigNumber(data.NumObjects),
      repoSize: new BigNumber(data.RepoSize),
      repoPath: data.RepoPath,
      version: data.Version,
      storageMax: new BigNumber(data.StorageMax)
    }
  }
})


/***/ }),

/***/ "oSeY":
/*!*******************************************!*\
  !*** ./node_modules/it-peekable/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function peekableIterator (iterable) {
  const iterator = iterable[Symbol.asyncIterator] ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]()
  const queue = []

  const peekable = {
    peek: () => {
      return iterator.next()
    },
    push: (value) => {
      queue.push(value)
    },
    next: () => {
      if (queue.length) {
        return {
          done: false,
          value: queue.shift()
        }
      }

      return iterator.next()
    }
  }

  if (iterable[Symbol.asyncIterator]) {
    peekable[Symbol.asyncIterator] = () => {
      return peekable
    }
  } else {
    peekable[Symbol.iterator] = () => {
      return peekable
    }
  }

  return peekable
}

module.exports = peekableIterator


/***/ }),

/***/ "pB5f":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/name/resolve.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * (path, options = {}) {
    const res = await api.post('name/resolve', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options,
        stream: true
      }),
      headers: options.headers
    })

    for await (const result of res.ndjson()) {
      yield result.Path
    }
  }
})


/***/ }),

/***/ "pLen":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/commands.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('commands', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "peGt":
/*!************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/bootstrap/add.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (addr, options = {}) => {
    if (addr && typeof addr === 'object' && !Multiaddr.isMultiaddr(addr)) {
      options = addr
      addr = null
    }

    const res = await api.post('bootstrap/add', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addr,
        ...options
      }),
      headers: options.headers
    })

    return res.json()
  }
})


/***/ }),

/***/ "q+hS":
/*!*************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/id.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ./lib/object-to-camel */ "d2a1")
const multiaddr = __webpack_require__(/*! multiaddr */ "6T3m")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('id', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    const data = await res.json()

    const output = toCamel(data)

    if (output.addresses) {
      output.addresses = output.addresses.map(ma => multiaddr(ma))
    }

    return output
  }
})


/***/ }),

/***/ "q7FP":
/*!*************************************************************************!*\
  !*** ./node_modules/ipfs-core-utils/src/files/normalise-input/utils.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Blob } = __webpack_require__(/*! ipfs-utils/src/globalthis */ "Ju59")

function isBytes (obj) {
  return ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer
}

function isBlob (obj) {
  return typeof Blob !== 'undefined' && obj instanceof Blob
}

// An object with a path or content property
function isFileObject (obj) {
  return typeof obj === 'object' && (obj.path || obj.content)
}

module.exports = {
  isBytes,
  isBlob,
  isFileObject
}


/***/ }),

/***/ "qk39":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/repo/version.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await (await api.post('repo/version', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })).json()

    return res.Version
  }
})


/***/ }),

/***/ "qxGA":
/*!***********************************************************************!*\
  !*** ./src/app/components/mint-card-form/mint-card-form.component.ts ***!
  \***********************************************************************/
/*! exports provided: MintCardFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MintCardFormComponent", function() { return MintCardFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_mint_card_form_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./mint-card-form.component.html */ "/qR/");
/* harmony import */ var _mint_card_form_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mint-card-form.component.scss */ "OtBE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ipfs_http_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ipfs-http-client */ "lOTI");
/* harmony import */ var ipfs_http_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ipfs_http_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/global.service */ "4WDQ");
/* harmony import */ var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/card.service */ "uvxi");







let MintCardFormComponent = class MintCardFormComponent {
    constructor(globalService, cardService) {
        this.globalService = globalService;
        this.cardService = cardService;
        this.buffer = null;
        this.name = '';
        this.description = '';
        this.color = '';
        this.type = '';
        this.mana = '';
        this.attack = '';
        this.guard = '';
        this.price = '';
        this.imgHash = '';
        this.ipfs = new ipfs_http_client__WEBPACK_IMPORTED_MODULE_4__({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', apiPath: '/api/v0' });
    }
    ngOnInit() { }
    handleFileInput(files) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(files.item(0));
        reader.onloadend = () => this.convertToBuffer(reader);
    }
    convertToBuffer(reader) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.buffer = yield Buffer.from(reader.result);
        });
    }
    mintCard($event) {
        $event.preventDefault();
        console.log("this.buffer", this.buffer);
        if (!this.name)
            return this.globalService.showDialog("Introduce el nombre de la carta", null);
        if (!this.description)
            return this.globalService.showDialog("Introduce la descripción de la carta", null);
        if (!this.color)
            return this.globalService.showDialog("Selecciona el color de la carta", null);
        if (!this.type)
            return this.globalService.showDialog("Selecciona el tipo de la carta", null);
        if (!this.mana)
            return this.globalService.showDialog("Selecciona el maná de la carta", null);
        if (!this.attack)
            return this.globalService.showDialog("Selecciona el ataque de la carta", null);
        if (!this.guard)
            return this.globalService.showDialog("Selecciona la defensa de la carta", null);
        if (!this.price)
            return this.globalService.showDialog("Introduce el precio de la carta", null);
        if (!this.buffer)
            return this.globalService.showDialog("Selecciona la imagen de la carta", null);
        this.globalService.loading = true;
        this.ipfs.add(this.buffer).then((res, err) => {
            if (err) {
                this.globalService.loading = false;
                return this.globalService.showDialog(err, null);
            }
            this.imgHash = res.path;
            console.log("IPFHash:" + this.imgHash);
            this.cardService
                .mint(this.name, this.description, this.color, this.type, this.mana, this.attack, this.guard, this.price, this.imgHash)
                .then(() => {
                this.globalService.loading = false;
                this.globalService.showDialog("La carta se ha creado satisfactoriamente", "Yuhuu!");
                this.resetForm();
            })
                .catch(err => {
                this.globalService.loading = false;
                this.globalService.showDialog(err, null);
            });
        });
    }
    resetForm() {
        this.name = '';
        this.description = '';
        this.color = '';
        this.type = '';
        this.mana = '';
        this.attack = '';
        this.guard = '';
        this.price = '';
        this.imgHash = '';
        this.buffer = null;
    }
};
MintCardFormComponent.ctorParameters = () => [
    { type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"] },
    { type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__["CardService"] }
];
MintCardFormComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-mint-card-form',
        template: _raw_loader_mint_card_form_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_mint_card_form_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], MintCardFormComponent);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! buffer */ "tjlA")["Buffer"]))

/***/ }),

/***/ "r1gM":
/*!***********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  getAll: __webpack_require__(/*! ./getAll */ "LHaF")(config),
  get: __webpack_require__(/*! ./get */ "u7Gv")(config),
  set: __webpack_require__(/*! ./set */ "Prmx")(config),
  replace: __webpack_require__(/*! ./replace */ "K2jH")(config),
  profiles: __webpack_require__(/*! ./profiles */ "84If")(config)
})


/***/ }),

/***/ "r3ji":
/*!********************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/resolver.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")

const util = __webpack_require__(/*! ./util */ "3bCg")

/**
 * Resolves a path within a PB block.
 *
 * Returns the value or a link and the partial mising path. This way the
 * IPLD Resolver can fetch the link and continue to resolve.
 *
 * @param {Buffer} binaryBlob - Binary representation of a PB block
 * @param {string} [path='/'] - Path that should be resolved
 * @returns {Object} result - Result of the path it it was resolved successfully
 * @returns {*} result.value - Value the path resolves to
 * @returns {string} result.remainderPath - If the path resolves half-way to a
 *   link, then the `remainderPath` is the part after the link that can be used
 *   for further resolving
 */
exports.resolve = (binaryBlob, path) => {
  let node = util.deserialize(binaryBlob)

  const parts = path.split('/').filter(Boolean)
  while (parts.length) {
    const key = parts.shift()
    if (node[key] === undefined) {
      // There might be a matching named link
      for (const link of node.Links) {
        if (link.Name === key) {
          return {
            value: link.Hash,
            remainderPath: parts.join('/')
          }
        }
      }

      // There wasn't even a matching named link
      throw new Error(`Object has no property '${key}'`)
    }

    node = node[key]
    if (CID.isCID(node)) {
      return {
        value: node,
        remainderPath: parts.join('/')
      }
    }
  }

  return {
    value: node,
    remainderPath: ''
  }
}

/**
 * Return all available paths of a block.
 *
 * @generator
 * @param {Buffer} binaryBlob - Binary representation of a PB block
 * @yields {string} - A single path
 */
exports.tree = function * (binaryBlob) {
  const node = util.deserialize(binaryBlob)

  // There is always a `Data` and `Links` property
  yield 'Data'
  yield 'Links'
  for (let ii = 0; ii < node.Links.length; ii++) {
    yield `Links/${ii}`
    yield `Links/${ii}/Name`
    yield `Links/${ii}/Tsize`
    yield `Links/${ii}/Hash`
  }
}


/***/ }),

/***/ "rH3+":
/*!******************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/get-endpoint-config.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")

module.exports = configure(api => {
  return () => {
    const url = new URL(api.opts.base)
    return {
      host: url.hostname,
      port: url.port,
      protocol: url.protocol,
      pathname: url.pathname,
      'api-path': url.pathname
    }
  }
})


/***/ }),

/***/ "rH8i":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/diag/net.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('diag/net', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })
    return res.json()
  }
})


/***/ }),

/***/ "rJhZ":
/*!***************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/ping.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ./lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * ping (peerId, options = {}) {
    const res = await api.post('ping', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${peerId}`,
        ...options
      }),
      headers: options.headers,
      transform: toCamel
    })

    yield * res.ndjson()
  }
})


/***/ }),

/***/ "rvZ0":
/*!**********************************************!*\
  !*** ./node_modules/ipld-block/src/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const withIs = __webpack_require__(/*! class-is */ "7BLb")

/**
 * Represents an immutable block of data that is uniquely referenced with a cid.
 *
 * @constructor
 * @param {Buffer} data - The data to be stored in the block as a buffer.
 * @param {CID} cid - The cid of the data
 *
 * @example
 * const block = new Block(new Buffer('a012d83b20f9371...'))
 */
class Block {
  constructor (data, cid) {
    if (!data || !ArrayBuffer.isView(data)) {
      throw new Error('first argument  must be a buffer or typed array')
    } else if (!Buffer.isBuffer(data)) {
      data = Buffer.from(data.buffer, data.byteOffset, data.byteLength)
    }

    if (!cid || !CID.isCID(cid)) {
      throw new Error('second argument must be a CID')
    }

    this._data = data
    this._cid = cid
  }

  /**
   * The data of this block.
   *
   * @type {Buffer}
   */
  get data () {
    return this._data
  }

  set data (val) {
    throw new Error('Tried to change an immutable block')
  }

  /**
   * The cid of the data this block represents.
   *
   * @type {CID}
   */
  get cid () {
    return this._cid
  }

  set cid (val) {
    throw new Error('Tried to change an immutable block')
  }
}

module.exports = withIs(Block, { className: 'Block', symbolName: '@ipld/js-ipld-block/block' })


/***/ }),

/***/ "sk5w":
/*!*****************************************************!*\
  !*** ./src/app/pages/mint-card/mint-card.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtaW50LWNhcmQucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "t2Ja":
/*!****************************************************!*\
  !*** ./node_modules/protons/src/compile/decode.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint max-depth: 1 */


var varint = __webpack_require__(/*! varint */ "JhIh")
var defined = __webpack_require__(/*! ./utils */ "z84S").defined

function toSentenceCase (string) {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(1)}`
}

function addPropertyAccessors (obj, name, value, defaultValue) {
  if (Object.prototype.hasOwnProperty.call(obj, name)) {
    // have already added this property
    return
  }

  const sentenceCaseName = toSentenceCase(name)

  Object.defineProperties(obj, {
    [name]: {
      enumerable: true,
      configurable: true,
      set: (val) => {
        value = val
      },
      get: () => {
        if (value === undefined) {
          return defaultValue
        }

        return value
      }
    },
    [`has${sentenceCaseName}`]: {
      configurable: true,
      value: () => {
        return value !== undefined
      }
    },
    [`set${sentenceCaseName}`]: {
      configurable: true,
      value: (val) => {
        value = val
      }
    },
    [`get${sentenceCaseName}`]: {
      configurable: true,
      value: () => {
        return value
      }
    },
    [`clear${sentenceCaseName}`]: {
      configurable: true,
      value: () => {
        value = undefined
        obj[name] = undefined
      }
    }
  })
}

function compileDecode (m, resolve, enc) {
  var requiredFields = []
  var fields = {}
  var oneofFields = []
  var vals = []

  for (var i = 0; i < enc.length; i++) {
    var field = m.fields[i]

    fields[field.tag] = i

    var def = field.options && field.options.default
    var resolved = resolve(field.type, m.id, false)
    vals[i] = [def, resolved && resolved.values]

    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false'

    if (field.required) {
      requiredFields.push(field.name)
    }

    if (field.oneof) {
      oneofFields.push(field.name)
    }
  }

  function decodeField (e, field, obj, buf, offset, i) {
    var name = field.name

    if (field.oneof) {
      // clear already defined oneof fields
      var props = Object.keys(obj)
      for (var j = 0; j < props.length; j++) {
        if (oneofFields.indexOf(props[j]) > -1) {
          const sentenceCase = toSentenceCase(props[j])
          delete obj[`has${sentenceCase}`]
          delete obj[`get${sentenceCase}`]
          delete obj[`set${sentenceCase}`]
          delete obj[`clear${sentenceCase}`]
          delete obj[props[j]]
        }
      }
    }

    let value

    if (e.message) {
      var len = varint.decode(buf, offset)
      offset += varint.decode.bytes

      var decoded = e.decode(buf, offset, offset + len)

      if (field.map) {
        value = obj[name] || {}
        value[decoded.key] = decoded.value
      } else if (field.repeated) {
        value = obj[name] || []
        value.push(decoded)
      } else {
        value = decoded
      }
    } else {
      if (field.repeated) {
        value = obj[name] || []
        value.push(e.decode(buf, offset))
      } else {
        value = e.decode(buf, offset)
      }
    }

    addPropertyAccessors(obj, name, value)

    offset += e.decode.bytes
    return offset
  }

  return function decode (buf, offset, end) {
    if (offset == null) {
      offset = 0
    }

    if (end == null) {
      end = buf.length
    }

    if (!(end <= buf.length && offset <= buf.length)) {
      throw new Error('Decoded message is not valid')
    }

    var oldOffset = offset
    var obj = {}
    var field

    while (true) {
      if (end <= offset) {
        // finished

        // check required methods
        var name = ''
        var j = 0
        for (j = 0; j < requiredFields.length; j++) {
          name = requiredFields[j]
          if (!defined(obj[name])) {
            throw new Error('Decoded message is not valid, missing required field: ' + name)
          }
        }

        // fill out missing defaults
        var val
        var def
        for (j = 0; j < enc.length; j++) {
          field = m.fields[j]
          def = vals[j][0]
          val = vals[j][1]
          name = field.name
          let defaultVal

          if (Object.prototype.hasOwnProperty.call(obj, name)) {
            continue
          }

          var done = false

          if (field.oneof) {
            var props = Object.keys(obj)

            for (var k = 0; k < props.length; k++) {
              if (oneofFields.indexOf(props[k]) > -1) {
                done = true
                break
              }
            }
          }

          if (done) {
            continue
          }

          if (val) { // is enum
            if (field.repeated) {
              def = []
            } else {
              def = (def && val[def]) ? val[def].value : val[Object.keys(val)[0]].value
              def = parseInt(def || 0, 10)
            }
          } else {
            defaultVal = defaultValue(field)
            def = coerceValue(field, def)
          }

          addPropertyAccessors(obj, name, def, defaultVal)
        }

        decode.bytes = offset - oldOffset
        return obj
      }

      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3

      var i = fields[tag]

      if (i == null) {
        offset = skip(prefix & 7, buf, offset)
        continue
      }

      var e = enc[i]
      field = m.fields[i]

      if (field.packed) {
        var packedEnd = varint.decode(buf, offset)
        offset += varint.decode.bytes
        packedEnd += offset

        while (offset < packedEnd) {
          offset = decodeField(e, field, obj, buf, offset, i)
        }
      } else {
        offset = decodeField(e, field, obj, buf, offset, i)
      }
    }
  }
}

var skip = function (type, buffer, offset) {
  switch (type) {
    case 0:
      varint.decode(buffer, offset)
      return offset + varint.decode.bytes

    case 1:
      return offset + 8

    case 2:
      var len = varint.decode(buffer, offset)
      return offset + varint.decode.bytes + len

    case 3:
    case 4:
      throw new Error('Groups are not supported')

    case 5:
      return offset + 4
    default:
      throw new Error('Unknown wire type: ' + type)
  }
}

var defaultValue = function (f) {
  if (f.map) return {}
  if (f.repeated) return []

  switch (f.type) {
    case 'string':
      return ''
    case 'bool':
      return false
    case 'float':
    case 'double':
    case 'sfixed32':
    case 'fixed32':
    case 'varint':
    case 'enum':
    case 'uint64':
    case 'uint32':
    case 'int64':
    case 'int32':
    case 'sint64':
    case 'sint32':
      return 0
    default:
      return null
  }
}

var coerceValue = function (f, def) {
  if (def === undefined) {
    return def
  }

  switch (f.type) {
    case 'bool':
      return def === 'true'
    case 'float':
    case 'double':
    case 'sfixed32':
    case 'fixed32':
    case 'varint':
    case 'enum':
    case 'uint64':
    case 'uint32':
    case 'int64':
    case 'int32':
    case 'sint64':
    case 'sint32':
      return parseInt(def, 10)
    default:
      return def
  }
}

module.exports = compileDecode


/***/ }),

/***/ "t2O4":
/*!********************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/lib/to-stream.browser.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// browsers can't stream. When the 'Send ReadableStream in request body' row
// is green here: https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#Browser_compatibility
// we'll be able to wrap the passed iterator in the it-to-browser-readablestream module
// in the meantime we have to convert the whole thing to a BufferSource of some sort
const toBuffer = __webpack_require__(/*! it-to-buffer */ "ihTf")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")

module.exports = (it) => {
  async function * bufferise (source) {
    for await (const chunk of source) {
      if (Buffer.isBuffer(chunk)) {
        yield chunk
      } else {
        yield Buffer.from(chunk)
      }
    }
  }

  return toBuffer(bufferise(it))
}


/***/ }),

/***/ "tqrP":
/*!****************************************!*\
  !*** ./node_modules/err-code/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function assign(obj, props) {
    for (const key in props) {
        Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
        });
    }

    return obj;
}

function createError(err, code, props) {
    if (!err || typeof err === 'string') {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (!props) {
        props = {};
    }

    if (typeof code === 'object') {
        props = code;
        code = undefined;
    }

    if (code != null) {
        props.code = code;
    }

    try {
        return assign(err, props);
    } catch (_) {
        props.message = err.message;
        props.stack = err.stack;

        const ErrClass = function () {};

        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));

        return assign(new ErrClass(), props);
    }
}

module.exports = createError;


/***/ }),

/***/ "tyBi":
/*!****************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/name/pubsub/state.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toCamel = __webpack_require__(/*! ../../lib/object-to-camel */ "d2a1")
const configure = __webpack_require__(/*! ../../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('name/pubsub/state', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    return toCamel(await res.json())
  }
})


/***/ }),

/***/ "u7Gv":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/config/get.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (key, options = {}) => {
    if (!key) {
      throw new Error('key argument is required')
    }

    const res = await api.post('config', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: key,
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return data.Value
  }
})


/***/ }),

/***/ "uvxi":
/*!******************************************!*\
  !*** ./src/app/services/card.service.ts ***!
  \******************************************/
/*! exports provided: CardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardService", function() { return CardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/global.service */ "4WDQ");
/* harmony import */ var src_app_services_node_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/node.service */ "PHZ7");
/* harmony import */ var src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/wallet.service */ "Fvwb");





let CardService = class CardService {
    constructor(globalService, nodeService, walletService) {
        this.globalService = globalService;
        this.nodeService = nodeService;
        this.walletService = walletService;
    }
    mint(name, description, color, type, mana, attack, guard, price, imgHash) {
        let data = this.nodeService.contract.methods.mint(name, description, color, type, mana, attack, guard, this.nodeService.toWei(price), imgHash).encodeABI();
        return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
    }
    getCardsOnSale() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var tokens = yield this.nodeService.contract.methods
                .getTokensIdOnSale()
                .call({ from: this.walletService.address });
            return this.getCards(tokens);
        });
    }
    getMyCards() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var tokens = yield this.nodeService.contract.methods
                .getMyTokensId()
                .call({ from: this.walletService.address });
            return this.getCards(tokens);
        });
    }
    getCards(tokens) {
        return new Promise((resolve, reject) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (tokens.length === 0)
                resolve([]);
            else {
                var batch = new this.nodeService.web3.BatchRequest();
                var batchResponses = [];
                var cards = [];
                for (var i = 0; i < tokens.length; i++) {
                    ((i) => {
                        var tokenId = tokens[i];
                        //console.log("tokenId", tokenId);
                        batch.add(this.nodeService.contract.methods
                            .getToken(tokenId)
                            .call.request({ from: this.walletService.address }, (error, response) => {
                            if (error)
                                console.log("error", error);
                            //console.log("response", response);
                            batchResponses.push(response);
                            if (!error) {
                                cards.push({
                                    tokenId: tokens[i],
                                    name: response[0],
                                    description: response[1],
                                    color: response[2],
                                    type: response[3],
                                    mana: response[4],
                                    attack: response[5],
                                    guard: response[6],
                                    price: this.nodeService.fromWei(response[7]),
                                    imgHash: response[8],
                                    available: response[9],
                                    onSale: response[10]
                                });
                            }
                            if (tokens.length === batchResponses.length) {
                                resolve(cards);
                            }
                        }));
                    })(i);
                }
                batch.execute();
            }
        }));
    }
    setAvailable(tokenId, value) {
        let data = this.nodeService.contract.methods.setAvailable(tokenId, value).encodeABI();
        return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
    }
    buy(tokenId, price) {
        let data = this.nodeService.contract.methods.buyToken(tokenId).encodeABI();
        return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, this.nodeService.toWei(price), data, this.walletService.privateKey);
    }
    transfer(tokenId, address) {
        let data = this.nodeService.contract.methods.transfer(address, tokenId).encodeABI();
        return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
    }
    putOnSale(tokenId, price, onSale) {
        let data = this.nodeService.contract.methods.setTokenOnSale(tokenId, this.nodeService.toWei(price), onSale).encodeABI();
        return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
    }
};
CardService.ctorParameters = () => [
    { type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_2__["GlobalService"] },
    { type: src_app_services_node_service__WEBPACK_IMPORTED_MODULE_3__["NodeService"] },
    { type: src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_4__["WalletService"] }
];
CardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CardService);



/***/ }),

/***/ "uxy4":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/mv.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const { findSources } = __webpack_require__(/*! ./utils */ "1upd")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (...args) => {
    const { sources, options } = findSources(args)

    const res = await api.post('files/mv', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: sources.map(src => CID.isCID(src) ? `/ipfs/${src}` : src),
        ...options
      }),
      headers: options.headers
    })

    await res.text()
  }
})


/***/ }),

/***/ "v6zs":
/*!********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/block/put.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Block = __webpack_require__(/*! ipld-block */ "rvZ0")
const CID = __webpack_require__(/*! cids */ "iARh")
const multihash = __webpack_require__(/*! multihashes */ "yP9g")
const multipartRequest = __webpack_require__(/*! ../lib/multipart-request */ "VWqr")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")
const anySignal = __webpack_require__(/*! any-signal */ "dP3G")
const AbortController = __webpack_require__(/*! abort-controller */ "kdNz")

module.exports = configure(api => {
  async function put (data, options = {}) {
    if (Block.isBlock(data)) {
      const { name, length } = multihash.decode(data.cid.multihash)
      options = {
        ...options,
        format: data.cid.codec,
        mhtype: name,
        mhlen: length,
        version: data.cid.version
      }
      data = data.data
    } else if (options.cid) {
      const cid = new CID(options.cid)
      const { name, length } = multihash.decode(cid.multihash)
      options = {
        ...options,
        format: cid.codec,
        mhtype: name,
        mhlen: length,
        version: cid.version
      }
      delete options.cid
    }

    // allow aborting requests on body errors
    const controller = new AbortController()
    const signal = anySignal([controller.signal, options.signal])

    let res
    try {
      const response = await api.post('block/put', {
        timeout: options.timeout,
        signal: signal,
        searchParams: toUrlSearchParams(options),
        ...(
          await multipartRequest(data, controller, options.headers)
        )
      })
      res = await response.json()
    } catch (err) {
      // Retry with "protobuf"/"cbor" format for go-ipfs
      // TODO: remove when https://github.com/ipfs/go-cid/issues/75 resolved
      if (options.format === 'dag-pb') {
        return put(data, { ...options, format: 'protobuf' })
      } else if (options.format === 'dag-cbor') {
        return put(data, { ...options, format: 'cbor' })
      }

      throw err
    }

    return new Block(data, new CID(res.Key))
  }

  return put
})


/***/ }),

/***/ "vpf6":
/*!*******************************************!*\
  !*** ./node_modules/it-tar/lte-reader.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BufferList = __webpack_require__(/*! bl/BufferList */ "XDq5")
const Reader = __webpack_require__(/*! it-reader */ "eWsV")

module.exports = function LteReader (source) {
  const reader = Reader(source)
  let overflow
  const lteReader = {
    [Symbol.asyncIterator]: () => lteReader,
    async next (bytes) {
      if (overflow) {
        let value
        if (bytes == null || overflow.length === bytes) {
          value = overflow
          overflow = null
        } else if (overflow.length > bytes) {
          value = overflow.shallowSlice(0, bytes)
          overflow = overflow.shallowSlice(bytes)
        } else if (overflow.length < bytes) {
          const { value: nextValue, done } = await reader.next(bytes - overflow.length)
          if (done) {
            throw Object.assign(
              new Error(`stream ended before ${bytes - overflow.length} bytes became available`),
              { code: 'ERR_UNDER_READ' }
            )
          }
          value = new BufferList([overflow, nextValue])
          overflow = null
        }
        return { value }
      }
      return reader.next(bytes)
    },
    async nextLte (bytes) {
      let { done, value } = await lteReader.next()
      if (done) return { done }
      if (value.length <= bytes) return { value }
      value = BufferList.isBufferList(value) ? value : new BufferList(value)
      if (overflow) {
        overflow.append(value.shallowSlice(bytes))
      } else {
        overflow = value.shallowSlice(bytes)
      }
      return { value: value.shallowSlice(0, bytes) }
    },
    return () {
      return reader.return()
    }
  }
  return lteReader
}


/***/ }),

/***/ "vwWl":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/key/export.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (name, password, options = {}) => {
    if (typeof password !== 'string') {
      options = password || {}
      password = null
    }

    const res = await api.post('key/export', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name,
        password: password,
        ...options
      }),
      headers: options.headers
    })

    return res.text()
  }
})


/***/ }),

/***/ "wCAA":
/*!******************************************!*\
  !*** ./node_modules/blob-to-it/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-env browser */



const browserReadableStreamToIt = __webpack_require__(/*! browser-readablestream-to-it */ "YBeJ")

function blobToIt (blob) {
  if (typeof blob.stream === 'function') {
    return browserReadableStreamToIt(blob.stream())
  }

  // firefox < 69 does not support blob.stream()
  return browserReadableStreamToIt(new Response(blob).body)
}

module.exports = blobToIt


/***/ }),

/***/ "wN3e":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/get.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const { DAGNode, DAGLink } = __webpack_require__(/*! ipld-dag-pb */ "yFpY")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (cid, options = {}) => {
    const res = await api.post('object/get', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`,
        dataEncoding: 'base64',
        ...options
      }),
      headers: options.headers
    })
    const data = await res.json()

    return new DAGNode(
      Buffer.from(data.Data, 'base64'),
      (data.Links || []).map(l => new DAGLink(l.Name, l.Size, l.Hash))
    )
  }
})


/***/ }),

/***/ "wWtC":
/*!*************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/ls.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ./lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ./lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async function * ls (path, options = {}) {
    const res = await api.post('ls', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${Buffer.isBuffer(path) ? new CID(path) : path}`,
        ...options
      }),
      headers: options.headers
    })

    for await (let result of res.ndjson()) {
      result = result.Objects

      if (!result) {
        throw new Error('expected .Objects in results')
      }

      result = result[0]
      if (!result) {
        throw new Error('expected one array in results.Objects')
      }

      result = result.Links
      if (!Array.isArray(result)) {
        throw new Error('expected one array in results.Objects[0].Links')
      }

      for (const link of result) {
        const entry = {
          name: link.Name,
          path: path + '/' + link.Name,
          size: link.Size,
          cid: new CID(link.Hash),
          type: typeOf(link),
          depth: link.Depth || 1
        }

        if (link.Mode) {
          entry.mode = parseInt(link.Mode, 8)
        }

        if (link.Mtime !== undefined && link.Mtime !== null) {
          entry.mtime = {
            secs: link.Mtime
          }

          if (link.MtimeNsecs !== undefined && link.MtimeNsecs !== null) {
            entry.mtime.nsecs = link.MtimeNsecs
          }
        }

        yield entry
      }
    }
  }
})

function typeOf (link) {
  switch (link.Type) {
    case 1:
    case 5:
      return 'dir'
    case 2:
      return 'file'
    default:
      return 'unknown'
  }
}


/***/ }),

/***/ "wil5":
/*!*******************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multibase/src/constants.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const baseX = __webpack_require__(/*! base-x */ "QqcV")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const Base = __webpack_require__(/*! ./base.js */ "/0/u")
const rfc4648 = __webpack_require__(/*! ./rfc4648 */ "gbYC")

const identity = () => {
  return {
    encode: (data) => Buffer.from(data).toString(),
    decode: (string) => Buffer.from(string)
  }
}

// name, code, implementation, alphabet
const constants = [
  ['identity', '\x00', identity, ''],
  ['base2', '0', rfc4648(1), '01'],
  ['base8', '7', rfc4648(3), '01234567'],
  ['base10', '9', baseX, '0123456789'],
  ['base16', 'f', rfc4648(4), '0123456789abcdef'],
  ['base16upper', 'F', rfc4648(4), '0123456789ABCDEF'],
  ['base32hex', 'v', rfc4648(5), '0123456789abcdefghijklmnopqrstuv'],
  ['base32hexupper', 'V', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV'],
  ['base32hexpad', 't', rfc4648(5), '0123456789abcdefghijklmnopqrstuv='],
  ['base32hexpadupper', 'T', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV='],
  ['base32', 'b', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567'],
  ['base32upper', 'B', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'],
  ['base32pad', 'c', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567='],
  ['base32padupper', 'C', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567='],
  ['base32z', 'h', rfc4648(5), 'ybndrfg8ejkmcpqxot1uwisza345h769'],
  ['base36', 'k', baseX, '0123456789abcdefghijklmnopqrstuvwxyz'],
  ['base36upper', 'K', baseX, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
  ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'],
  ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'],
  ['base64', 'm', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'],
  ['base64pad', 'M', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='],
  ['base64url', 'u', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'],
  ['base64urlpad', 'U', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']
]

const names = constants.reduce((prev, tupple) => {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3])
  return prev
}, {})

const codes = constants.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]]
  return prev
}, {})

module.exports = {
  names,
  codes
}


/***/ }),

/***/ "xPLB":
/*!******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/pin/add.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (paths, options = {}) => {
    paths = Array.isArray(paths) ? paths : [paths]

    const res = await (await api.post('pin/add', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: paths.map(path => `${path}`),
        ...options
      }),
      headers: options.headers
    })).json()

    return (res.Pins || []).map(cid => ({ cid: new CID(cid) }))
  }
})


/***/ }),

/***/ "yFpY":
/*!*****************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-pb/src/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.DAGNode = __webpack_require__(/*! ./dag-node */ "GUAX")
exports.DAGLink = __webpack_require__(/*! ./dag-link */ "YMSI")

/*
 * Functions to fulfil IPLD Format interface
 * https://github.com/ipld/interface-ipld-format
 */
exports.resolver = __webpack_require__(/*! ./resolver */ "r3ji")
exports.util = __webpack_require__(/*! ./util */ "3bCg")
exports.codec = exports.util.codec
exports.defaultHashAlg = exports.util.defaultHashAlg


/***/ }),

/***/ "yMIr":
/*!*****************************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/patch/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  addLink: __webpack_require__(/*! ./add-link */ "Oud2")(config),
  appendData: __webpack_require__(/*! ./append-data */ "jARG")(config),
  rmLink: __webpack_require__(/*! ./rm-link */ "Z9Fn")(config),
  setData: __webpack_require__(/*! ./set-data */ "/jzG")(config)
})


/***/ }),

/***/ "yP9g":
/*!*****************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/multihashes/src/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable guard-for-in */
/**
 * Multihash implementation in JavaScript.
 *
 * @module multihash
 */


const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const multibase = __webpack_require__(/*! multibase */ "/jff")
const varint = __webpack_require__(/*! varint */ "JhIh")
const { names } = __webpack_require__(/*! ./constants */ "S5LB")

const codes = {}

for (const key in names) {
  codes[names[key]] = key
}
exports.names = names
exports.codes = Object.freeze(codes)

/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */
exports.toHexString = function toHexString (hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer')
  }

  return hash.toString('hex')
}

/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Buffer}
 */
exports.fromHexString = function fromHexString (hash) {
  return Buffer.from(hash, 'hex')
}

/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */
exports.toB58String = function toB58String (hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer')
  }

  return multibase.encode('base58btc', hash).toString().slice(1)
}

/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Buffer} hash
 * @returns {Buffer}
 */
exports.fromB58String = function fromB58String (hash) {
  let encoded = hash
  if (Buffer.isBuffer(hash)) {
    encoded = hash.toString()
  }

  return multibase.decode('z' + encoded)
}

/**
 * Decode a hash from the given multihash.
 *
 * @param {Buffer} buf
 * @returns {{code: number, name: string, length: number, digest: Buffer}} result
 */
exports.decode = function decode (buf) {
  if (!(Buffer.isBuffer(buf))) {
    throw new Error('multihash must be a Buffer')
  }

  if (buf.length < 2) {
    throw new Error('multihash too short. must be > 2 bytes.')
  }

  const code = varint.decode(buf)
  if (!exports.isValidCode(code)) {
    throw new Error(`multihash unknown function code: 0x${code.toString(16)}`)
  }
  buf = buf.slice(varint.decode.bytes)

  const len = varint.decode(buf)
  if (len < 0) {
    throw new Error(`multihash invalid length: ${len}`)
  }
  buf = buf.slice(varint.decode.bytes)

  if (buf.length !== len) {
    throw new Error(`multihash length inconsistent: 0x${buf.toString('hex')}`)
  }

  return {
    code,
    name: codes[code],
    length: len,
    digest: buf
  }
}

/**
 *  Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Buffer} digest
 * @param {string|number} code
 * @param {number} [length]
 * @returns {Buffer}
 */
exports.encode = function encode (digest, code, length) {
  if (!digest || code === undefined) {
    throw new Error('multihash encode requires at least two args: digest, code')
  }

  // ensure it's a hashfunction code.
  const hashfn = exports.coerceCode(code)

  if (!(Buffer.isBuffer(digest))) {
    throw new Error('digest should be a Buffer')
  }

  if (length == null) {
    length = digest.length
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.')
  }

  return Buffer.concat([
    Buffer.from(varint.encode(hashfn)),
    Buffer.from(varint.encode(length)),
    digest
  ])
}

/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 * @param {string|number} name
 * @returns {number}
 */
exports.coerceCode = function coerceCode (name) {
  let code = name

  if (typeof name === 'string') {
    if (names[name] === undefined) {
      throw new Error(`Unrecognized hash function named: ${name}`)
    }
    code = names[name]
  }

  if (typeof code !== 'number') {
    throw new Error(`Hash function code should be a number. Got: ${code}`)
  }

  if (codes[code] === undefined && !exports.isAppCode(code)) {
    throw new Error(`Unrecognized function code: ${code}`)
  }

  return code
}

/**
 * Checks wether a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isAppCode = function appCode (code) {
  return code > 0 && code < 0x10
}

/**
 * Checks whether a multihash code is valid.
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isValidCode = function validCode (code) {
  if (exports.isAppCode(code)) {
    return true
  }

  if (codes[code]) {
    return true
  }

  return false
}

/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */
function validate (multihash) {
  exports.decode(multihash) // throws if bad.
}
exports.validate = validate

/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */
exports.prefix = function prefix (multihash) {
  validate(multihash)

  return multihash.slice(0, 2)
}


/***/ }),

/***/ "yPZT":
/*!***************************************!*\
  !*** ./node_modules/blakejs/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var b2b = __webpack_require__(/*! ./blake2b */ "FOxu")
var b2s = __webpack_require__(/*! ./blake2s */ "MZMc")

module.exports = {
  blake2b: b2b.blake2b,
  blake2bHex: b2b.blake2bHex,
  blake2bInit: b2b.blake2bInit,
  blake2bUpdate: b2b.blake2bUpdate,
  blake2bFinal: b2b.blake2bFinal,
  blake2s: b2s.blake2s,
  blake2sHex: b2s.blake2sHex,
  blake2sInit: b2s.blake2sInit,
  blake2sUpdate: b2s.blake2sUpdate,
  blake2sFinal: b2s.blake2sFinal
}


/***/ }),

/***/ "yjWq":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/repo/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = config => ({
  gc: __webpack_require__(/*! ./gc */ "SR7S")(config),
  stat: __webpack_require__(/*! ./stat */ "o7bL")(config),
  version: __webpack_require__(/*! ./version */ "qk39")(config)
})


/***/ }),

/***/ "z84S":
/*!***************************************************!*\
  !*** ./node_modules/protons/src/compile/utils.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.defined = function (val) {
  return val !== null && val !== undefined && (typeof val !== 'number' || !isNaN(val))
}


/***/ }),

/***/ "zDE9":
/*!*********************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/object/new.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (options = {}) => {
    const res = await api.post('object/new', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: options.template,
        ...options
      }),
      headers: options.headers
    })

    const { Hash } = await res.json()

    return new CID(Hash)
  }
})


/***/ }),

/***/ "zVFY":
/*!******************************************************************************!*\
  !*** ./node_modules/ipfs-http-client/node_modules/ipld-dag-cbor/src/util.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const cbor = __webpack_require__(/*! borc */ "AREZ")
const { Buffer } = __webpack_require__(/*! buffer */ "tjlA")
const multicodec = __webpack_require__(/*! multicodec */ "OuWa")
const multihashing = __webpack_require__(/*! multihashing-async */ "d9A7")
const CID = __webpack_require__(/*! cids */ "iARh")
const isCircular = __webpack_require__(/*! is-circular */ "+k5y")

// https://github.com/ipfs/go-ipfs/issues/3570#issuecomment-273931692
const CID_CBOR_TAG = 42

function tagCID (cid) {
  if (typeof cid === 'string') {
    cid = new CID(cid).buffer
  } else if (CID.isCID(cid)) {
    cid = cid.buffer
  }

  return new cbor.Tagged(CID_CBOR_TAG, Buffer.concat([
    Buffer.from('00', 'hex'), // thanks jdag
    cid
  ]))
}

function replaceCIDbyTAG (dagNode) {
  let circular
  try {
    circular = isCircular(dagNode)
  } catch (e) {
    circular = false
  }
  if (circular) {
    throw new Error('The object passed has circular references')
  }

  function transform (obj) {
    if (!obj || obj instanceof Uint8Array || typeof obj === 'string') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(transform)
    }

    if (CID.isCID(obj)) {
      return tagCID(obj)
    }

    const keys = Object.keys(obj)

    if (keys.length > 0) {
      // Recursive transform
      const out = {}
      keys.forEach((key) => {
        if (typeof obj[key] === 'object') {
          out[key] = transform(obj[key])
        } else {
          out[key] = obj[key]
        }
      })
      return out
    } else {
      return obj
    }
  }

  return transform(dagNode)
}

exports = module.exports

exports.codec = multicodec.DAG_CBOR
exports.defaultHashAlg = multicodec.SHA2_256

const defaultTags = {
  [CID_CBOR_TAG]: (val) => {
    // remove that 0
    val = val.slice(1)
    return new CID(val)
  }
}
const defaultSize = 64 * 1024 // current decoder heap size, 64 Kb
let currentSize = defaultSize
const defaultMaxSize = 64 * 1024 * 1024 // max heap size when auto-growing, 64 Mb
let maxSize = defaultMaxSize
let decoder = null

/**
 * Configure the underlying CBOR decoder.
 *
 * @param {Object} [options] - The options the decoder takes. The decoder will reset to the defaul values if no options are given.
 * @param {number} [options.size=65536] - The current heap size used in CBOR parsing, this may grow automatically as larger blocks are encountered up to `maxSize`
 * @param {number} [options.maxSize=67108864] - The maximum size the CBOR parsing heap is allowed to grow to before `dagCBOR.util.deserialize()` returns an error
 * @param {Object} [options.tags] - An object whose keys are CBOR tag numbers and values are transform functions that accept a `value` and return a decoded representation of that `value`
 */
exports.configureDecoder = (options) => {
  let tags = defaultTags

  if (options) {
    if (typeof options.size === 'number') {
      currentSize = options.size
    }
    if (typeof options.maxSize === 'number') {
      maxSize = options.maxSize
    }
    if (options.tags) {
      tags = Object.assign({}, defaultTags, options && options.tags)
    }
  } else {
    // no options, reset to defaults
    currentSize = defaultSize
    maxSize = defaultMaxSize
  }

  const decoderOptions = {
    tags,
    size: currentSize
  }

  decoder = new cbor.Decoder(decoderOptions)
  // borc edits opts.size in-place so we can capture _actual_ size
  currentSize = decoderOptions.size
}

exports.configureDecoder() // Setup default cbor.Decoder

/**
 * Serialize internal representation into a binary CBOR block.
 *
 * @param {Object} node - Internal representation of a CBOR block
 * @returns {Buffer} - The encoded binary representation
 */
exports.serialize = (node) => {
  const nodeTagged = replaceCIDbyTAG(node)
  const serialized = cbor.encode(nodeTagged)

  return serialized
}

/**
 * Deserialize CBOR block into the internal representation.
 *
 * @param {Buffer} data - Binary representation of a CBOR block
 * @returns {Object} - An object that conforms to the IPLD Data Model
 */
exports.deserialize = (data) => {
  if (data.length > currentSize && data.length <= maxSize) {
    exports.configureDecoder({ size: data.length })
  }

  if (data.length > currentSize) {
    throw new Error('Data is too large to deserialize with current decoder')
  }

  const deserialized = decoder.decodeFirst(data)

  return deserialized
}

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Object} binaryBlob - Encoded IPLD Node
 * @param {Object} [userOptions] - Options to create the CID
 * @param {number} [userOptions.cidVersion=1] - CID version number
 * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
 * @returns {Promise.<CID>}
 */
exports.cid = async (binaryBlob, userOptions) => {
  const defaultOptions = { cidVersion: 1, hashAlg: exports.defaultHashAlg }
  const options = Object.assign(defaultOptions, userOptions)

  const multihash = await multihashing(binaryBlob, options.hashAlg)
  const codecName = multicodec.print[exports.codec]
  const cid = new CID(options.cidVersion, codecName, multihash)

  return cid
}


/***/ }),

/***/ "zor/":
/*!***********************************************************************************!*\
  !*** ./node_modules/ipfs-core-utils/src/files/normalise-input/normalise-input.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const errCode = __webpack_require__(/*! err-code */ "tqrP")
const browserStreamToIt = __webpack_require__(/*! browser-readablestream-to-it */ "YBeJ")
const itPeekable = __webpack_require__(/*! it-peekable */ "oSeY")
const map = __webpack_require__(/*! it-map */ "XW02")
const {
  isBytes,
  isBlob,
  isFileObject
} = __webpack_require__(/*! ./utils */ "q7FP")

module.exports = async function * normaliseInput (input, normaliseContent) {
  // must give us something
  if (input === null || input === undefined) {
    throw errCode(new Error(`Unexpected input: ${input}`), 'ERR_UNEXPECTED_INPUT')
  }

  // String
  if (typeof input === 'string' || input instanceof String) {
    yield toFileObject(input, normaliseContent)
    return
  }

  // Buffer|ArrayBuffer|TypedArray
  // Blob|File
  if (isBytes(input) || isBlob(input)) {
    yield toFileObject(input, normaliseContent)
    return
  }

  // Browser ReadableStream
  if (typeof input.getReader === 'function') {
    input = browserStreamToIt(input)
  }

  // Iterable<?>
  if (input[Symbol.iterator] || input[Symbol.asyncIterator]) {
    const peekable = itPeekable(input)
    const { value, done } = await peekable.peek()

    if (done) {
      // make sure empty iterators result in empty files
      yield * peekable
      return
    }

    peekable.push(value)

    // (Async)Iterable<Number>
    // (Async)Iterable<Bytes>
    if (Number.isInteger(value) || isBytes(value)) {
      yield toFileObject(peekable, normaliseContent)
      return
    }

    // (Async)Iterable<Blob>
    // (Async)Iterable<String>
    // (Async)Iterable<{ path, content }>
    if (isFileObject(value) || isBlob(value) || typeof value === 'string' || value instanceof String) {
      yield * map(peekable, (value) => toFileObject(value, normaliseContent))
      return
    }

    // (Async)Iterable<(Async)Iterable<?>>
    // (Async)Iterable<ReadableStream<?>>
    // ReadableStream<(Async)Iterable<?>>
    // ReadableStream<ReadableStream<?>>
    if (value[Symbol.iterator] || value[Symbol.asyncIterator] || typeof value.getReader === 'function') {
      yield * map(peekable, (value) => toFileObject(value, normaliseContent))
      return
    }
  }

  // { path, content: ? }
  // Note: Detected _after_ (Async)Iterable<?> because Node.js streams have a
  // `path` property that passes this check.
  if (isFileObject(input)) {
    yield toFileObject(input, normaliseContent)
    return
  }

  throw errCode(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT')
}

async function toFileObject (input, normaliseContent) {
  const obj = {
    path: input.path || '',
    mode: input.mode,
    mtime: input.mtime
  }

  if (input.content) {
    obj.content = await normaliseContent(input.content)
  } else if (!input.path) { // Not already a file object with path or content prop
    obj.content = await normaliseContent(input)
  }

  return obj
}


/***/ }),

/***/ "zykU":
/*!*******************************************************!*\
  !*** ./node_modules/ipfs-http-client/src/files/cp.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CID = __webpack_require__(/*! cids */ "iARh")
const { findSources } = __webpack_require__(/*! ./utils */ "1upd")
const configure = __webpack_require__(/*! ../lib/configure */ "mHjA")
const toUrlSearchParams = __webpack_require__(/*! ../lib/to-url-search-params */ "FeRZ")

module.exports = configure(api => {
  return async (...args) => {
    const { sources, options } = findSources(args)

    const res = await api.post('files/cp', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: sources.map(src => CID.isCID(src) ? `/ipfs/${src}` : src),
        ...options
      }),
      headers: options.headers
    })

    await res.text()
  }
})


/***/ })

}]);
//# sourceMappingURL=pages-mint-card-mint-card-module-es2015.js.map