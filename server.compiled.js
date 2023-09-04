"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _pg = require("pg");
var _awsJwtVerify = require("aws-jwt-verify");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require("dotenv").config();
var bodyParser = require("body-parser");
var cors = require("cors");
var PORT = process.env.HTTP_PORT || 4001;
var app = (0, _express["default"])();
app.use(bodyParser.json());
app.use(cors());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "client", "build")));
app.get("/", function (req, res) {
  res.send("alive");
});
app.get("/flower", function (req, res) {
  res.json({
    name: "Dandelion",
    colour: "Blue-ish"
  });
});
var connUrl = "postgres://".concat(process.env.RDS_USERNAME, ":").concat(process.env.RDS_PASSWORD, "@").concat(process.env.RDS_HOSTNAME, ":").concat(process.env.RDS_PORT, "/").concat(process.env.RDS_DATABASE);
function newClient() {
  return _newClient.apply(this, arguments);
}
function _newClient() {
  _newClient = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var client;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          client = new _pg.Client({
            connectionString: connUrl,
            ssl: {
              sslmode: "require",
              rejectUnauthorized: false
            }
          });
          _context6.next = 3;
          return client.connect();
        case 3:
          return _context6.abrupt("return", client);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _newClient.apply(this, arguments);
}
function getCookie(cookieString, cname) {
  if (cookieString) {
    var name = cname + "=";
    var ca = cookieString.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
}
function verifyToken(_x) {
  return _verifyToken.apply(this, arguments);
}
function _verifyToken() {
  _verifyToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id_token) {
    var verifier, payload;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          // Verifier that expects valid access tokens:
          verifier = _awsJwtVerify.CognitoJwtVerifier.create({
            userPoolId: process.env.USER_POOL_ID,
            tokenUse: "id",
            clientId: process.env.CLIENT_ID
          });
          _context7.prev = 1;
          _context7.next = 4;
          return verifier.verify(id_token);
        case 4:
          payload = _context7.sent;
          console.log("Token is valid. Payload:", payload);
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          console.log("Token not valid!");
        case 11:
          return _context7.abrupt("return", payload);
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return _verifyToken.apply(this, arguments);
}
app.get("/categories", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var client, q, query;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return newClient();
        case 2:
          client = _context.sent;
          _context.prev = 3;
          console.log("fetching categories: ");
          q = {
            text: "SELECT * FROM categories ORDER BY id"
          };
          _context.next = 8;
          return client.query(q);
        case 8:
          query = _context.sent;
          console.log(query.rows);
          res.send(query.rows);
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          console.error("Error retrieving category: ", _context.t0);
          res.status(500).send({
            message: "Error retrieving category"
          });
        case 17:
          _context.prev = 17;
          _context.next = 20;
          return client.end();
        case 20:
          return _context.finish(17);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 13, 17, 21]]);
  }));
  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.get("/questions/:category", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var client, category, q, query;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return newClient();
        case 2:
          client = _context2.sent;
          _context2.prev = 3;
          category = req.params.category;
          console.log("fetching questions: ", category);
          q = {
            text: "SELECT * FROM questions WHERE category=$1 ORDER BY ts",
            values: [category]
          };
          _context2.next = 9;
          return client.query(q);
        case 9:
          query = _context2.sent;
          console.log(query.rows);
          res.send(query.rows);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error("Error retrieving questions: ", _context2.t0);
          res.status(500).send({
            message: "Error retrieving questions"
          });
        case 18:
          _context2.prev = 18;
          _context2.next = 21;
          return client.end();
        case 21:
          return _context2.finish(18);
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14, 18, 22]]);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
app.get("/question/:category/:offset", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var client, _req$params, offset, category, q, query;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return newClient();
        case 2:
          client = _context3.sent;
          _context3.prev = 3;
          _req$params = req.params, offset = _req$params.offset, category = _req$params.category;
          console.log("fetching question: ", category, offset);
          q = {
            text: "SELECT * FROM questions WHERE category=$1 ORDER BY ts OFFSET $2 LIMIT 1",
            values: [category, offset - 1]
          };
          _context3.next = 9;
          return client.query(q);
        case 9:
          query = _context3.sent;
          console.log(query.rows[0]);
          res.send(query.rows[0]);
          _context3.next = 18;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](3);
          console.error("Error retrieving question: ", _context3.t0);
          res.status(500).send({
            message: "Error retrieving question"
          });
        case 18:
          _context3.prev = 18;
          _context3.next = 21;
          return client.end();
        case 21:
          return _context3.finish(18);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 14, 18, 22]]);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/votes/:sub", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var client, sub, q, query;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return newClient();
        case 2:
          client = _context4.sent;
          _context4.prev = 3;
          sub = req.params.sub;
          console.log("fetching votes for: ", sub);
          q = {
            text: "SELECT * FROM votes WHERE sub=$1",
            values: [sub]
          };
          _context4.next = 9;
          return client.query(q);
        case 9:
          query = _context4.sent;
          console.log(query.rows);
          res.send(query.rows);
          _context4.next = 18;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](3);
          console.error("Error retrieving votes: ", _context4.t0);
          res.status(500).send({
            message: "Error retrieving votes"
          });
        case 18:
          _context4.prev = 18;
          _context4.next = 21;
          return client.end();
        case 21:
          return _context4.finish(18);
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 14, 18, 22]]);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
app.post("/vote", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var client, _req$body, id, vote, id_token, payload, voteQ, votes, text, q, query, _voteQ;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return newClient();
        case 2:
          client = _context5.sent;
          _req$body = req.body, id = _req$body.id, vote = _req$body.vote;
          console.log("voting question: ", id, vote);
          id_token = getCookie(req.headers.cookie, "id_token");
          _context5.next = 8;
          return verifyToken(id_token);
        case 8:
          payload = _context5.sent;
          if (!(payload && (!vote.localeCompare("yay") || !vote.localeCompare("nay")))) {
            _context5.next = 41;
            break;
          }
          _context5.prev = 10;
          // Check if user didn't already vote for this question
          voteQ = {
            text: "SELECT * FROM votes WHERE sub=$1 AND questionid=$2",
            values: [payload.sub, id]
          };
          _context5.next = 14;
          return client.query(voteQ);
        case 14:
          votes = _context5.sent;
          if (!(votes.rows.length === 0)) {
            _context5.next = 28;
            break;
          }
          // Update question counter

          if (!vote.localeCompare("yay")) {
            text = "UPDATE questions SET yay=yay+1 WHERE id=$1";
          } else {
            text = "UPDATE questions SET nay=nay+1 WHERE id=$1";
          }
          q = {
            text: text,
            values: [id]
          };
          _context5.next = 20;
          return client.query(q);
        case 20:
          query = _context5.sent;
          if (!(query.rowCount === 1)) {
            _context5.next = 25;
            break;
          }
          // Add vote
          _voteQ = {
            text: "INSERT INTO votes (sub, questionid, vote) VALUES ($1, $2, $3)",
            values: [payload.sub, id, vote]
          };
          _context5.next = 25;
          return client.query(_voteQ);
        case 25:
          res.status(200).send({
            message: "Voted!"
          });
          _context5.next = 29;
          break;
        case 28:
          res.status(500).send({
            message: "Have already voted"
          });
        case 29:
          _context5.next = 35;
          break;
        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](10);
          console.error("Error retrieving question: ", _context5.t0);
          res.status(500).send({
            message: "Error retrieving question"
          });
        case 35:
          _context5.prev = 35;
          _context5.next = 38;
          return client.end();
        case 38:
          return _context5.finish(35);
        case 39:
          _context5.next = 42;
          break;
        case 41:
          res.status(500).send({
            message: "Invalid token or vote"
          });
        case 42:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[10, 31, 35, 39]]);
  }));
  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, "."));
});
