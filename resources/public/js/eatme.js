var f;
function n(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
}
var aa = "closure_uid_" + (1E9 * Math.random() >>> 0), ba = 0;
function ca(a, b) {
  for (var c in a) {
    b.call(void 0, a[c], c, a);
  }
}
;function da(a, b) {
  null != a && this.append.apply(this, arguments);
}
da.prototype.ka = "";
da.prototype.append = function(a, b, c) {
  this.ka += a;
  if (null != b) {
    for (var d = 1;d < arguments.length;d++) {
      this.ka += arguments[d];
    }
  }
  return this;
};
da.prototype.toString = function() {
  return this.ka;
};
var ea, ga = null;
function q(a) {
  return null != a && !1 !== a;
}
function s(a, b) {
  return a[n(null == b ? null : b)] ? !0 : a._ ? !0 : t ? !1 : null;
}
function ha(a) {
  return null == a ? null : a.constructor;
}
function u(a, b) {
  var c = ha(b), c = q(q(c) ? c.Za : c) ? c.Ya : n(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""));
}
function ia(a) {
  var b = a.Ya;
  return q(b) ? b : "" + v(a);
}
function x(a) {
  for (var b = a.length, c = Array(b), d = 0;;) {
    if (d < b) {
      c[d] = a[d], d += 1;
    } else {
      break;
    }
  }
  return c;
}
var ja = {}, ka = {};
function la(a) {
  if (a ? a.C : a) {
    return a.C(a);
  }
  var b;
  b = la[n(null == a ? null : a)];
  if (!b && (b = la._, !b)) {
    throw u("ICounted.-count", a);
  }
  return b.call(null, a);
}
function ma(a, b) {
  if (a ? a.B : a) {
    return a.B(a, b);
  }
  var c;
  c = ma[n(null == a ? null : a)];
  if (!c && (c = ma._, !c)) {
    throw u("ICollection.-conj", a);
  }
  return c.call(null, a, b);
}
var na = {}, y = function() {
  function a(a, b, c) {
    if (a ? a.S : a) {
      return a.S(a, b, c);
    }
    var h;
    h = y[n(null == a ? null : a)];
    if (!h && (h = y._, !h)) {
      throw u("IIndexed.-nth", a);
    }
    return h.call(null, a, b, c);
  }
  function b(a, b) {
    if (a ? a.N : a) {
      return a.N(a, b);
    }
    var c;
    c = y[n(null == a ? null : a)];
    if (!c && (c = y._, !c)) {
      throw u("IIndexed.-nth", a);
    }
    return c.call(null, a, b);
  }
  var c = null, c = function(d, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, d, c);
      case 3:
        return a.call(this, d, c, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}(), pa = {};
function z(a) {
  if (a ? a.O : a) {
    return a.O(a);
  }
  var b;
  b = z[n(null == a ? null : a)];
  if (!b && (b = z._, !b)) {
    throw u("ISeq.-first", a);
  }
  return b.call(null, a);
}
function A(a) {
  if (a ? a.P : a) {
    return a.P(a);
  }
  var b;
  b = A[n(null == a ? null : a)];
  if (!b && (b = A._, !b)) {
    throw u("ISeq.-rest", a);
  }
  return b.call(null, a);
}
var qa = {}, ra = function() {
  function a(a, b, c) {
    if (a ? a.G : a) {
      return a.G(a, b, c);
    }
    var h;
    h = ra[n(null == a ? null : a)];
    if (!h && (h = ra._, !h)) {
      throw u("ILookup.-lookup", a);
    }
    return h.call(null, a, b, c);
  }
  function b(a, b) {
    if (a ? a.F : a) {
      return a.F(a, b);
    }
    var c;
    c = ra[n(null == a ? null : a)];
    if (!c && (c = ra._, !c)) {
      throw u("ILookup.-lookup", a);
    }
    return c.call(null, a, b);
  }
  var c = null, c = function(d, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, d, c);
      case 3:
        return a.call(this, d, c, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}();
function sa(a, b, c) {
  if (a ? a.la : a) {
    return a.la(a, b, c);
  }
  var d;
  d = sa[n(null == a ? null : a)];
  if (!d && (d = sa._, !d)) {
    throw u("IAssociative.-assoc", a);
  }
  return d.call(null, a, b, c);
}
var ta = {}, ua = {};
function va(a) {
  if (a ? a.Ua : a) {
    return a.Ua();
  }
  var b;
  b = va[n(null == a ? null : a)];
  if (!b && (b = va._, !b)) {
    throw u("IMapEntry.-key", a);
  }
  return b.call(null, a);
}
function wa(a) {
  if (a ? a.Va : a) {
    return a.Va();
  }
  var b;
  b = wa[n(null == a ? null : a)];
  if (!b && (b = wa._, !b)) {
    throw u("IMapEntry.-val", a);
  }
  return b.call(null, a);
}
var xa = {};
function ya(a, b, c) {
  if (a ? a.Ra : a) {
    return a.Ra(a, b, c);
  }
  var d;
  d = ya[n(null == a ? null : a)];
  if (!d && (d = ya._, !d)) {
    throw u("IVector.-assoc-n", a);
  }
  return d.call(null, a, b, c);
}
var za = {};
function Aa(a) {
  if (a ? a.J : a) {
    return a.J(a);
  }
  var b;
  b = Aa[n(null == a ? null : a)];
  if (!b && (b = Aa._, !b)) {
    throw u("IMeta.-meta", a);
  }
  return b.call(null, a);
}
var Ba = {};
function Ca(a, b) {
  if (a ? a.I : a) {
    return a.I(a, b);
  }
  var c;
  c = Ca[n(null == a ? null : a)];
  if (!c && (c = Ca._, !c)) {
    throw u("IWithMeta.-with-meta", a);
  }
  return c.call(null, a, b);
}
var Da = {}, Ea = function() {
  function a(a, b, c) {
    if (a ? a.L : a) {
      return a.L(a, b, c);
    }
    var h;
    h = Ea[n(null == a ? null : a)];
    if (!h && (h = Ea._, !h)) {
      throw u("IReduce.-reduce", a);
    }
    return h.call(null, a, b, c);
  }
  function b(a, b) {
    if (a ? a.K : a) {
      return a.K(a, b);
    }
    var c;
    c = Ea[n(null == a ? null : a)];
    if (!c && (c = Ea._, !c)) {
      throw u("IReduce.-reduce", a);
    }
    return c.call(null, a, b);
  }
  var c = null, c = function(d, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, d, c);
      case 3:
        return a.call(this, d, c, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}();
function Fa(a, b) {
  if (a ? a.t : a) {
    return a.t(a, b);
  }
  var c;
  c = Fa[n(null == a ? null : a)];
  if (!c && (c = Fa._, !c)) {
    throw u("IEquiv.-equiv", a);
  }
  return c.call(null, a, b);
}
function Ga(a) {
  if (a ? a.v : a) {
    return a.v(a);
  }
  var b;
  b = Ga[n(null == a ? null : a)];
  if (!b && (b = Ga._, !b)) {
    throw u("IHash.-hash", a);
  }
  return b.call(null, a);
}
var Ha = {};
function Ia(a) {
  if (a ? a.A : a) {
    return a.A(a);
  }
  var b;
  b = Ia[n(null == a ? null : a)];
  if (!b && (b = Ia._, !b)) {
    throw u("ISeqable.-seq", a);
  }
  return b.call(null, a);
}
var Ja = {};
function B(a, b) {
  if (a ? a.Xa : a) {
    return a.Xa(0, b);
  }
  var c;
  c = B[n(null == a ? null : a)];
  if (!c && (c = B._, !c)) {
    throw u("IWriter.-write", a);
  }
  return c.call(null, a, b);
}
var Ka = {};
function La(a, b, c) {
  if (a ? a.u : a) {
    return a.u(a, b, c);
  }
  var d;
  d = La[n(null == a ? null : a)];
  if (!d && (d = La._, !d)) {
    throw u("IPrintWithWriter.-pr-writer", a);
  }
  return d.call(null, a, b, c);
}
function Ma(a) {
  if (a ? a.sa : a) {
    return a.sa(a);
  }
  var b;
  b = Ma[n(null == a ? null : a)];
  if (!b && (b = Ma._, !b)) {
    throw u("IEditableCollection.-as-transient", a);
  }
  return b.call(null, a);
}
function Na(a, b) {
  if (a ? a.ua : a) {
    return a.ua(a, b);
  }
  var c;
  c = Na[n(null == a ? null : a)];
  if (!c && (c = Na._, !c)) {
    throw u("ITransientCollection.-conj!", a);
  }
  return c.call(null, a, b);
}
function Oa(a) {
  if (a ? a.va : a) {
    return a.va(a);
  }
  var b;
  b = Oa[n(null == a ? null : a)];
  if (!b && (b = Oa._, !b)) {
    throw u("ITransientCollection.-persistent!", a);
  }
  return b.call(null, a);
}
function Pa(a, b, c) {
  if (a ? a.na : a) {
    return a.na(a, b, c);
  }
  var d;
  d = Pa[n(null == a ? null : a)];
  if (!d && (d = Pa._, !d)) {
    throw u("ITransientAssociative.-assoc!", a);
  }
  return d.call(null, a, b, c);
}
function Qa(a, b, c) {
  if (a ? a.Wa : a) {
    return a.Wa(0, b, c);
  }
  var d;
  d = Qa[n(null == a ? null : a)];
  if (!d && (d = Qa._, !d)) {
    throw u("ITransientVector.-assoc-n!", a);
  }
  return d.call(null, a, b, c);
}
function Ra(a) {
  if (a ? a.Sa : a) {
    return a.Sa();
  }
  var b;
  b = Ra[n(null == a ? null : a)];
  if (!b && (b = Ra._, !b)) {
    throw u("IChunk.-drop-first", a);
  }
  return b.call(null, a);
}
function Sa(a) {
  if (a ? a.Aa : a) {
    return a.Aa(a);
  }
  var b;
  b = Sa[n(null == a ? null : a)];
  if (!b && (b = Sa._, !b)) {
    throw u("IChunkedSeq.-chunked-first", a);
  }
  return b.call(null, a);
}
function Ta(a) {
  if (a ? a.Ba : a) {
    return a.Ba(a);
  }
  var b;
  b = Ta[n(null == a ? null : a)];
  if (!b && (b = Ta._, !b)) {
    throw u("IChunkedSeq.-chunked-rest", a);
  }
  return b.call(null, a);
}
function Ua(a) {
  if (a ? a.za : a) {
    return a.za(a);
  }
  var b;
  b = Ua[n(null == a ? null : a)];
  if (!b && (b = Ua._, !b)) {
    throw u("IChunkedNext.-chunked-next", a);
  }
  return b.call(null, a);
}
function Va(a) {
  this.lb = a;
  this.n = 0;
  this.f = 1073741824;
}
Va.prototype.Xa = function(a, b) {
  return this.lb.append(b);
};
function D(a) {
  var b = new da;
  a.u(null, new Va(b), F(new G(null, 5, [Wa, !0, Xa, !0, Ya, !1, Za, !1, $a, null], null), new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)));
  return "" + v(b);
}
function ab(a, b) {
  if (q(bb.a ? bb.a(a, b) : bb.call(null, a, b))) {
    return 0;
  }
  var c = q(a.X) ? !1 : !0;
  if (q(c ? b.X : c)) {
    return-1;
  }
  if (q(a.X)) {
    if (!q(b.X)) {
      return 1;
    }
    c = cb.a ? cb.a(a.X, b.X) : cb.call(null, a.X, b.X);
    return 0 === c ? cb.a ? cb.a(a.name, b.name) : cb.call(null, a.name, b.name) : c;
  }
  return db ? cb.a ? cb.a(a.name, b.name) : cb.call(null, a.name, b.name) : null;
}
function I(a) {
  if (null == a) {
    return null;
  }
  if (a && (a.f & 8388608 || a.rb)) {
    return a.A(null);
  }
  if (a instanceof Array || "string" === typeof a) {
    return 0 === a.length ? null : new eb(a, 0);
  }
  if (s(Ha, a)) {
    return Ia(a);
  }
  if (t) {
    throw Error([v(a), v("is not ISeqable")].join(""));
  }
  return null;
}
function K(a) {
  if (null == a) {
    return null;
  }
  if (a && (a.f & 64 || a.ta)) {
    return a.O(null);
  }
  a = I(a);
  return null == a ? null : z(a);
}
function L(a) {
  return null != a ? a && (a.f & 64 || a.ta) ? a.P(null) : (a = I(a)) ? A(a) : F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
}
function N(a) {
  return null == a ? null : a && (a.f & 128 || a.qb) ? a.da(null) : I(L(a));
}
var bb = function() {
  function a(a, b) {
    return null == a ? null == b : a === b || Fa(a, b);
  }
  var b = null, c = function() {
    function a(b, d, k) {
      var l = null;
      2 < arguments.length && (l = O(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, l);
    }
    function c(a, d, e) {
      for (;;) {
        if (b.a(a, d)) {
          if (N(e)) {
            a = d, d = K(e), e = N(e);
          } else {
            return b.a(d, K(e));
          }
        } else {
          return!1;
        }
      }
    }
    a.q = 2;
    a.k = function(a) {
      var b = K(a);
      a = N(a);
      var d = K(a);
      a = L(a);
      return c(b, d, a);
    };
    a.j = c;
    return a;
  }(), b = function(b, e, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a.call(this, b, e);
      default:
        return c.j(b, e, O(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.q = 2;
  b.k = c.k;
  b.e = function() {
    return!0;
  };
  b.a = a;
  b.j = c.j;
  return b;
}();
ka["null"] = !0;
la["null"] = function() {
  return 0;
};
Date.prototype.t = function(a, b) {
  return b instanceof Date && this.toString() === b.toString();
};
Fa.number = function(a, b) {
  return a === b;
};
za["function"] = !0;
Aa["function"] = function() {
  return null;
};
ja["function"] = !0;
Ga._ = function(a) {
  return a[aa] || (a[aa] = ++ba);
};
var fb = function() {
  function a(a, b, c, d) {
    for (var l = la(a);;) {
      if (d < l) {
        c = b.a ? b.a(c, y.a(a, d)) : b.call(null, c, y.a(a, d)), d += 1;
      } else {
        return c;
      }
    }
  }
  function b(a, b, c) {
    for (var d = la(a), l = 0;;) {
      if (l < d) {
        c = b.a ? b.a(c, y.a(a, l)) : b.call(null, c, y.a(a, l)), l += 1;
      } else {
        return c;
      }
    }
  }
  function c(a, b) {
    var c = la(a);
    if (0 === c) {
      return b.ma ? "" : b.call(null);
    }
    for (var d = y.a(a, 0), l = 1;;) {
      if (l < c) {
        d = b.a ? b.a(d, y.a(a, l)) : b.call(null, d, y.a(a, l)), l += 1;
      } else {
        return d;
      }
    }
  }
  var d = null, d = function(d, g, h, k) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, g);
      case 3:
        return b.call(this, d, g, h);
      case 4:
        return a.call(this, d, g, h, k);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.a = c;
  d.c = b;
  d.l = a;
  return d;
}(), gb = function() {
  function a(a, b, c, d) {
    for (var l = a.length;;) {
      if (d < l) {
        c = b.a ? b.a(c, a[d]) : b.call(null, c, a[d]), d += 1;
      } else {
        return c;
      }
    }
  }
  function b(a, b, c) {
    for (var d = a.length, l = 0;;) {
      if (l < d) {
        c = b.a ? b.a(c, a[l]) : b.call(null, c, a[l]), l += 1;
      } else {
        return c;
      }
    }
  }
  function c(a, b) {
    var c = a.length;
    if (0 === a.length) {
      return b.ma ? "" : b.call(null);
    }
    for (var d = a[0], l = 1;;) {
      if (l < c) {
        d = b.a ? b.a(d, a[l]) : b.call(null, d, a[l]), l += 1;
      } else {
        return d;
      }
    }
  }
  var d = null, d = function(d, g, h, k) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, g);
      case 3:
        return b.call(this, d, g, h);
      case 4:
        return a.call(this, d, g, h, k);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.a = c;
  d.c = b;
  d.l = a;
  return d;
}();
function hb(a) {
  return a ? a.f & 2 || a.cb ? !0 : a.f ? !1 : s(ka, a) : s(ka, a);
}
function ib(a) {
  return a ? a.f & 16 || a.Ta ? !0 : a.f ? !1 : s(na, a) : s(na, a);
}
function eb(a, b) {
  this.b = a;
  this.g = b;
  this.f = 166199550;
  this.n = 8192;
}
f = eb.prototype;
f.toString = function() {
  return D(this);
};
f.N = function(a, b) {
  var c = b + this.g;
  return c < this.b.length ? this.b[c] : null;
};
f.S = function(a, b, c) {
  a = b + this.g;
  return a < this.b.length ? this.b[a] : c;
};
f.da = function() {
  return this.g + 1 < this.b.length ? new eb(this.b, this.g + 1) : null;
};
f.C = function() {
  return this.b.length - this.g;
};
f.v = function() {
  return kb.e ? kb.e(this) : kb.call(null, this);
};
f.t = function(a, b) {
  return Q.a ? Q.a(this, b) : Q.call(null, this, b);
};
f.K = function(a, b) {
  return gb.l(this.b, b, this.b[this.g], this.g + 1);
};
f.L = function(a, b, c) {
  return gb.l(this.b, b, c, this.g);
};
f.O = function() {
  return this.b[this.g];
};
f.P = function() {
  return this.g + 1 < this.b.length ? new eb(this.b, this.g + 1) : M;
};
f.A = function() {
  return this;
};
f.B = function(a, b) {
  return R.a ? R.a(b, this) : R.call(null, b, this);
};
var lb = function() {
  function a(a, b) {
    return b < a.length ? new eb(a, b) : null;
  }
  function b(a) {
    return c.a(a, 0);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.e = b;
  c.a = a;
  return c;
}(), O = function() {
  function a(a, b) {
    return lb.a(a, b);
  }
  function b(a) {
    return lb.a(a, 0);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.e = b;
  c.a = a;
  return c;
}();
Fa._ = function(a, b) {
  return a === b;
};
var mb = function() {
  function a(a, b) {
    return null != a ? ma(a, b) : ma(M, b);
  }
  var b = null, c = function() {
    function a(b, d, k) {
      var l = null;
      2 < arguments.length && (l = O(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, l);
    }
    function c(a, d, e) {
      for (;;) {
        if (q(e)) {
          a = b.a(a, d), d = K(e), e = N(e);
        } else {
          return b.a(a, d);
        }
      }
    }
    a.q = 2;
    a.k = function(a) {
      var b = K(a);
      a = N(a);
      var d = K(a);
      a = L(a);
      return c(b, d, a);
    };
    a.j = c;
    return a;
  }(), b = function(b, e, g) {
    switch(arguments.length) {
      case 2:
        return a.call(this, b, e);
      default:
        return c.j(b, e, O(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.q = 2;
  b.k = c.k;
  b.a = a;
  b.j = c.j;
  return b;
}();
function S(a) {
  if (null != a) {
    if (a && (a.f & 2 || a.cb)) {
      a = a.C(null);
    } else {
      if (a instanceof Array) {
        a = a.length;
      } else {
        if ("string" === typeof a) {
          a = a.length;
        } else {
          if (s(ka, a)) {
            a = la(a);
          } else {
            if (t) {
              a: {
                a = I(a);
                for (var b = 0;;) {
                  if (hb(a)) {
                    a = b + la(a);
                    break a;
                  }
                  a = N(a);
                  b += 1;
                }
                a = void 0;
              }
            } else {
              a = null;
            }
          }
        }
      }
    }
  } else {
    a = 0;
  }
  return a;
}
var nb = function() {
  function a(a, b, c) {
    for (;;) {
      if (null == a) {
        return c;
      }
      if (0 === b) {
        return I(a) ? K(a) : c;
      }
      if (ib(a)) {
        return y.c(a, b, c);
      }
      if (I(a)) {
        a = N(a), b -= 1;
      } else {
        return t ? c : null;
      }
    }
  }
  function b(a, b) {
    for (;;) {
      if (null == a) {
        throw Error("Index out of bounds");
      }
      if (0 === b) {
        if (I(a)) {
          return K(a);
        }
        throw Error("Index out of bounds");
      }
      if (ib(a)) {
        return y.a(a, b);
      }
      if (I(a)) {
        var c = N(a), h = b - 1;
        a = c;
        b = h;
      } else {
        if (t) {
          throw Error("Index out of bounds");
        }
        return null;
      }
    }
  }
  var c = null, c = function(c, e, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}(), ob = function() {
  function a(a, b, c) {
    if (null != a) {
      if (a && (a.f & 16 || a.Ta)) {
        return a.S(null, b, c);
      }
      if (a instanceof Array || "string" === typeof a) {
        return b < a.length ? a[b] : c;
      }
      if (s(na, a)) {
        return y.a(a, b);
      }
      if (t) {
        if (a ? a.f & 64 || a.ta || (a.f ? 0 : s(pa, a)) : s(pa, a)) {
          return nb.c(a, b, c);
        }
        throw Error([v("nth not supported on this type "), v(ia(ha(a)))].join(""));
      }
      return null;
    }
    return c;
  }
  function b(a, b) {
    if (null == a) {
      return null;
    }
    if (a && (a.f & 16 || a.Ta)) {
      return a.N(null, b);
    }
    if (a instanceof Array || "string" === typeof a) {
      return b < a.length ? a[b] : null;
    }
    if (s(na, a)) {
      return y.a(a, b);
    }
    if (t) {
      if (a ? a.f & 64 || a.ta || (a.f ? 0 : s(pa, a)) : s(pa, a)) {
        return nb.a(a, b);
      }
      throw Error([v("nth not supported on this type "), v(ia(ha(a)))].join(""));
    }
    return null;
  }
  var c = null, c = function(c, e, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}(), pb = function() {
  function a(a, b, c) {
    return null != a ? a && (a.f & 256 || a.eb) ? a.G(null, b, c) : a instanceof Array ? b < a.length ? a[b] : c : "string" === typeof a ? b < a.length ? a[b] : c : s(qa, a) ? ra.c(a, b, c) : t ? c : null : c;
  }
  function b(a, b) {
    return null == a ? null : a && (a.f & 256 || a.eb) ? a.F(null, b) : a instanceof Array ? b < a.length ? a[b] : null : "string" === typeof a ? b < a.length ? a[b] : null : s(qa, a) ? ra.a(a, b) : null;
  }
  var c = null, c = function(c, e, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}(), rb = function() {
  function a(a, b, c) {
    return null != a ? sa(a, b, c) : qb.a ? qb.a([b], [c]) : qb.call(null, [b], [c]);
  }
  var b = null, c = function() {
    function a(b, d, k, l) {
      var m = null;
      3 < arguments.length && (m = O(Array.prototype.slice.call(arguments, 3), 0));
      return c.call(this, b, d, k, m);
    }
    function c(a, d, e, l) {
      for (;;) {
        if (a = b.c(a, d, e), q(l)) {
          d = K(l), e = K(N(l)), l = N(N(l));
        } else {
          return a;
        }
      }
    }
    a.q = 3;
    a.k = function(a) {
      var b = K(a);
      a = N(a);
      var d = K(a);
      a = N(a);
      var l = K(a);
      a = L(a);
      return c(b, d, l, a);
    };
    a.j = c;
    return a;
  }(), b = function(b, e, g, h) {
    switch(arguments.length) {
      case 3:
        return a.call(this, b, e, g);
      default:
        return c.j(b, e, g, O(arguments, 3));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.q = 3;
  b.k = c.k;
  b.c = a;
  b.j = c.j;
  return b;
}();
function sb(a) {
  var b = "function" == n(a);
  return b ? b : a ? q(q(null) ? null : a.ab) ? !0 : a.vb ? !1 : s(ja, a) : s(ja, a);
}
var F = function tb(b, c) {
  return sb(b) && !(b ? b.f & 262144 || b.ub || (b.f ? 0 : s(Ba, b)) : s(Ba, b)) ? tb(function() {
    "undefined" === typeof ea && (ea = function(b, c, g, h) {
      this.i = b;
      this.ra = c;
      this.mb = g;
      this.kb = h;
      this.n = 0;
      this.f = 393217;
    }, ea.Za = !0, ea.Ya = "cljs.core/t16128", ea.jb = function(b) {
      return B(b, "cljs.core/t16128");
    }, ea.prototype.call = function() {
      function b(d, h) {
        d = this;
        var k = null;
        1 < arguments.length && (k = O(Array.prototype.slice.call(arguments, 1), 0));
        return c.call(this, d, k);
      }
      function c(b, d) {
        return ub.a ? ub.a(b.ra, d) : ub.call(null, b.ra, d);
      }
      b.q = 1;
      b.k = function(b) {
        var d = K(b);
        b = L(b);
        return c(d, b);
      };
      b.j = c;
      return b;
    }(), ea.prototype.apply = function(b, c) {
      return this.call.apply(this, [this].concat(x(c)));
    }, ea.prototype.a = function() {
      function b(d) {
        var h = null;
        0 < arguments.length && (h = O(Array.prototype.slice.call(arguments, 0), 0));
        return c.call(this, h);
      }
      function c(b) {
        return ub.a ? ub.a(self__.ra, b) : ub.call(null, self__.ra, b);
      }
      b.q = 0;
      b.k = function(b) {
        b = I(b);
        return c(b);
      };
      b.j = c;
      return b;
    }(), ea.prototype.ab = !0, ea.prototype.J = function() {
      return this.kb;
    }, ea.prototype.I = function(b, c) {
      return new ea(this.i, this.ra, this.mb, c);
    });
    return new ea(c, b, tb, null);
  }(), c) : null == b ? null : Ca(b, c);
};
function vb(a) {
  var b = null != a;
  return(b ? a ? a.f & 131072 || a.gb || (a.f ? 0 : s(za, a)) : s(za, a) : b) ? Aa(a) : null;
}
var wb = {}, xb = 0;
function T(a) {
  if (a && (a.f & 4194304 || a.ob)) {
    a = a.v(null);
  } else {
    if ("number" === typeof a) {
      a = Math.floor(a) % 2147483647;
    } else {
      if (!0 === a) {
        a = 1;
      } else {
        if (!1 === a) {
          a = 0;
        } else {
          if ("string" === typeof a) {
            255 < xb && (wb = {}, xb = 0);
            var b = wb[a];
            if ("number" !== typeof b) {
              for (var c = b = 0;c < a.length;++c) {
                b = 31 * b + a.charCodeAt(c), b %= 4294967296;
              }
              wb[a] = b;
              xb += 1;
            }
            a = b;
          } else {
            a = null == a ? 0 : t ? Ga(a) : null;
          }
        }
      }
    }
  }
  return a;
}
function yb(a) {
  return a ? a.f & 16384 || a.tb ? !0 : a.f ? !1 : s(xa, a) : s(xa, a);
}
function zb(a) {
  var b = [];
  ca(a, function(a, d) {
    return b.push(d);
  });
  return b;
}
function Ab(a, b, c, d, e) {
  for (;0 !== e;) {
    c[d] = a[b], d += 1, e -= 1, b += 1;
  }
}
function Bb(a) {
  return q(a) ? !0 : !1;
}
function cb(a, b) {
  if (a === b) {
    return 0;
  }
  if (null == a) {
    return-1;
  }
  if (null == b) {
    return 1;
  }
  if (ha(a) === ha(b)) {
    return a && (a.n & 2048 || a.Ca) ? a.Da(null, b) : a > b ? 1 : a < b ? -1 : 0;
  }
  if (t) {
    throw Error("compare on non-nil objects of different types");
  }
  return null;
}
var Cb = function() {
  function a(a, b, c, h) {
    for (;;) {
      var k = cb(ob.a(a, h), ob.a(b, h));
      if (0 === k && h + 1 < c) {
        h += 1;
      } else {
        return k;
      }
    }
  }
  function b(a, b) {
    var g = S(a), h = S(b);
    return g < h ? -1 : g > h ? 1 : t ? c.l(a, b, g, 0) : null;
  }
  var c = null, c = function(c, e, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 4:
        return a.call(this, c, e, g, h);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.l = a;
  return c;
}(), U = function() {
  function a(a, b, c) {
    for (c = I(c);;) {
      if (c) {
        b = a.a ? a.a(b, K(c)) : a.call(null, b, K(c)), c = N(c);
      } else {
        return b;
      }
    }
  }
  function b(a, b) {
    var c = I(b);
    return c ? Db.c ? Db.c(a, K(c), N(c)) : Db.call(null, a, K(c), N(c)) : a.ma ? "" : a.call(null);
  }
  var c = null, c = function(c, e, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}(), Db = function() {
  function a(a, b, c) {
    return c && (c.f & 524288 || c.ib) ? c.L(null, a, b) : c instanceof Array ? gb.c(c, a, b) : "string" === typeof c ? gb.c(c, a, b) : s(Da, c) ? Ea.c(c, a, b) : t ? U.c(a, b, c) : null;
  }
  function b(a, b) {
    return b && (b.f & 524288 || b.ib) ? b.K(null, a) : b instanceof Array ? gb.a(b, a) : "string" === typeof b ? gb.a(b, a) : s(Da, b) ? Ea.a(b, a) : t ? U.a(a, b) : null;
  }
  var c = null, c = function(c, e, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}();
function Eb(a) {
  return 0 <= a ? Math.floor.e ? Math.floor.e(a) : Math.floor.call(null, a) : Math.ceil.e ? Math.ceil.e(a) : Math.ceil.call(null, a);
}
function Fb(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24;
}
var v = function() {
  function a(a) {
    return null == a ? "" : a.toString();
  }
  var b = null, c = function() {
    function a(b, d) {
      var k = null;
      1 < arguments.length && (k = O(Array.prototype.slice.call(arguments, 1), 0));
      return c.call(this, b, k);
    }
    function c(a, d) {
      for (var e = new da(b.e(a)), l = d;;) {
        if (q(l)) {
          e = e.append(b.e(K(l))), l = N(l);
        } else {
          return e.toString();
        }
      }
    }
    a.q = 1;
    a.k = function(a) {
      var b = K(a);
      a = L(a);
      return c(b, a);
    };
    a.j = c;
    return a;
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 0:
        return "";
      case 1:
        return a.call(this, b);
      default:
        return c.j(b, O(arguments, 1));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.q = 1;
  b.k = c.k;
  b.ma = function() {
    return "";
  };
  b.e = a;
  b.j = c.j;
  return b;
}();
function Q(a, b) {
  return Bb((b ? b.f & 16777216 || b.sb || (b.f ? 0 : s(Ja, b)) : s(Ja, b)) ? function() {
    for (var c = I(a), d = I(b);;) {
      if (null == c) {
        return null == d;
      }
      if (null == d) {
        return!1;
      }
      if (bb.a(K(c), K(d))) {
        c = N(c), d = N(d);
      } else {
        return t ? !1 : null;
      }
    }
  }() : null);
}
function Gb(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2);
}
function kb(a) {
  if (I(a)) {
    var b = T(K(a));
    for (a = N(a);;) {
      if (null == a) {
        return b;
      }
      b = Gb(b, T(K(a)));
      a = N(a);
    }
  } else {
    return 0;
  }
}
function Hb(a) {
  var b = 0;
  for (a = I(a);;) {
    if (a) {
      var c = K(a), b = (b + (T(V.e ? V.e(c) : V.call(null, c)) ^ T(X.e ? X.e(c) : X.call(null, c)))) % 4503599627370496;
      a = N(a);
    } else {
      return b;
    }
  }
}
function Ib(a, b, c, d, e) {
  this.i = a;
  this.oa = b;
  this.ca = c;
  this.count = d;
  this.h = e;
  this.f = 65937646;
  this.n = 8192;
}
f = Ib.prototype;
f.toString = function() {
  return D(this);
};
f.J = function() {
  return this.i;
};
f.da = function() {
  return 1 === this.count ? null : this.ca;
};
f.C = function() {
  return this.count;
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return U.a(b, this);
};
f.L = function(a, b, c) {
  return U.c(b, c, this);
};
f.O = function() {
  return this.oa;
};
f.P = function() {
  return 1 === this.count ? F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : this.ca;
};
f.A = function() {
  return this;
};
f.I = function(a, b) {
  return new Ib(b, this.oa, this.ca, this.count, this.h);
};
f.B = function(a, b) {
  return new Ib(this.i, b, this, this.count + 1, null);
};
function Jb(a) {
  this.i = a;
  this.f = 65937614;
  this.n = 8192;
}
f = Jb.prototype;
f.toString = function() {
  return D(this);
};
f.J = function() {
  return this.i;
};
f.da = function() {
  return null;
};
f.C = function() {
  return 0;
};
f.v = function() {
  return 0;
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return U.a(b, this);
};
f.L = function(a, b, c) {
  return U.c(b, c, this);
};
f.O = function() {
  return null;
};
f.P = function() {
  return F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
};
f.A = function() {
  return null;
};
f.I = function(a, b) {
  return new Jb(b);
};
f.B = function(a, b) {
  return new Ib(this.i, b, null, 1, null);
};
var M = new Jb(null);
function Kb(a, b, c, d) {
  this.i = a;
  this.oa = b;
  this.ca = c;
  this.h = d;
  this.f = 65929452;
  this.n = 8192;
}
f = Kb.prototype;
f.toString = function() {
  return D(this);
};
f.J = function() {
  return this.i;
};
f.da = function() {
  return null == this.ca ? null : I(this.ca);
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return U.a(b, this);
};
f.L = function(a, b, c) {
  return U.c(b, c, this);
};
f.O = function() {
  return this.oa;
};
f.P = function() {
  return null == this.ca ? F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : this.ca;
};
f.A = function() {
  return this;
};
f.I = function(a, b) {
  return new Kb(b, this.oa, this.ca, this.h);
};
f.B = function(a, b) {
  return new Kb(null, b, this, this.h);
};
function R(a, b) {
  var c = null == b;
  return(c ? c : b && (b.f & 64 || b.ta)) ? new Kb(null, a, b, null) : new Kb(null, a, I(b), null);
}
function Y(a, b, c, d) {
  this.X = a;
  this.name = b;
  this.fa = c;
  this.wa = d;
  this.f = 2153775105;
  this.n = 4096;
}
f = Y.prototype;
f.u = function(a, b) {
  return B(b, [v(":"), v(this.fa)].join(""));
};
f.v = function() {
  null == this.wa && (this.wa = Gb(T(this.X), T(this.name)) + 2654435769);
  return this.wa;
};
f.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return pb.a(c, this);
      case 3:
        return pb.c(c, this, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(x(b)));
};
f.e = function(a) {
  return pb.a(a, this);
};
f.a = function(a, b) {
  return pb.c(a, this, b);
};
f.t = function(a, b) {
  return b instanceof Y ? this.fa === b.fa : !1;
};
f.toString = function() {
  return[v(":"), v(this.fa)].join("");
};
var Lb = function() {
  function a(a, b) {
    return new Y(a, b, [v(q(a) ? [v(a), v("/")].join("") : null), v(b)].join(""), null);
  }
  function b(a) {
    var b;
    return a instanceof Y ? a : "string" === typeof a ? (b = a.split("/"), 2 === b.length ? new Y(b[0], b[1], a, null) : new Y(null, b[0], a, null)) : null;
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.e = b;
  c.a = a;
  return c;
}();
function Nb(a, b, c, d) {
  this.i = a;
  this.pa = b;
  this.o = c;
  this.h = d;
  this.n = 0;
  this.f = 32374988;
}
f = Nb.prototype;
f.toString = function() {
  return D(this);
};
function Ob(a) {
  null != a.pa && (a.o = a.pa.ma ? "" : a.pa.call(null), a.pa = null);
  return a.o;
}
f.J = function() {
  return this.i;
};
f.da = function() {
  Ia(this);
  return null == this.o ? null : N(this.o);
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return U.a(b, this);
};
f.L = function(a, b, c) {
  return U.c(b, c, this);
};
f.O = function() {
  Ia(this);
  return null == this.o ? null : K(this.o);
};
f.P = function() {
  Ia(this);
  return null != this.o ? L(this.o) : F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
};
f.A = function() {
  Ob(this);
  if (null == this.o) {
    return null;
  }
  for (var a = this.o;;) {
    if (a instanceof Nb) {
      a = Ob(a);
    } else {
      return this.o = a, I(this.o);
    }
  }
};
f.I = function(a, b) {
  return new Nb(b, this.pa, this.o, this.h);
};
f.B = function(a, b) {
  return R(b, this);
};
function Pb(a, b) {
  this.ya = a;
  this.end = b;
  this.n = 0;
  this.f = 2;
}
Pb.prototype.C = function() {
  return this.end;
};
Pb.prototype.add = function(a) {
  this.ya[this.end] = a;
  return this.end += 1;
};
Pb.prototype.$ = function() {
  var a = new Qb(this.ya, 0, this.end);
  this.ya = null;
  return a;
};
function Qb(a, b, c) {
  this.b = a;
  this.p = b;
  this.end = c;
  this.n = 0;
  this.f = 524306;
}
f = Qb.prototype;
f.K = function(a, b) {
  return gb.l(this.b, b, this.b[this.p], this.p + 1);
};
f.L = function(a, b, c) {
  return gb.l(this.b, b, c, this.p);
};
f.Sa = function() {
  if (this.p === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new Qb(this.b, this.p + 1, this.end);
};
f.N = function(a, b) {
  return this.b[this.p + b];
};
f.S = function(a, b, c) {
  return 0 <= b && b < this.end - this.p ? this.b[this.p + b] : c;
};
f.C = function() {
  return this.end - this.p;
};
var Rb = function() {
  function a(a, b, c) {
    return new Qb(a, b, c);
  }
  function b(a, b) {
    return new Qb(a, b, a.length);
  }
  function c(a) {
    return new Qb(a, 0, a.length);
  }
  var d = null, d = function(d, g, h) {
    switch(arguments.length) {
      case 1:
        return c.call(this, d);
      case 2:
        return b.call(this, d, g);
      case 3:
        return a.call(this, d, g, h);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.e = c;
  d.a = b;
  d.c = a;
  return d;
}();
function Sb(a, b, c, d) {
  this.$ = a;
  this.W = b;
  this.i = c;
  this.h = d;
  this.f = 31850732;
  this.n = 1536;
}
f = Sb.prototype;
f.toString = function() {
  return D(this);
};
f.J = function() {
  return this.i;
};
f.da = function() {
  if (1 < la(this.$)) {
    return new Sb(Ra(this.$), this.W, this.i, null);
  }
  var a = Ia(this.W);
  return null == a ? null : a;
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.O = function() {
  return y.a(this.$, 0);
};
f.P = function() {
  return 1 < la(this.$) ? new Sb(Ra(this.$), this.W, this.i, null) : null == this.W ? F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : this.W;
};
f.A = function() {
  return this;
};
f.Aa = function() {
  return this.$;
};
f.Ba = function() {
  return null == this.W ? F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : this.W;
};
f.I = function(a, b) {
  return new Sb(this.$, this.W, b, this.h);
};
f.B = function(a, b) {
  return R(b, this);
};
f.za = function() {
  return null == this.W ? null : this.W;
};
function Tb(a) {
  for (var b = [];;) {
    if (I(a)) {
      b.push(K(a)), a = N(a);
    } else {
      return b;
    }
  }
}
function Ub(a, b) {
  if (hb(a)) {
    return S(a);
  }
  for (var c = a, d = b, e = 0;;) {
    if (0 < d && I(c)) {
      c = N(c), d -= 1, e += 1;
    } else {
      return e;
    }
  }
}
var Wb = function Vb(b) {
  return null == b ? null : null == N(b) ? I(K(b)) : t ? R(K(b), Vb(N(b))) : null;
}, Xb = function() {
  function a(a, b, c, d) {
    return R(a, R(b, R(c, d)));
  }
  function b(a, b, c) {
    return R(a, R(b, c));
  }
  var c = null, d = function() {
    function a(c, d, e, m, p) {
      var r = null;
      4 < arguments.length && (r = O(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, m, r);
    }
    function b(a, c, d, e, g) {
      return R(a, R(c, R(d, R(e, Wb(g)))));
    }
    a.q = 4;
    a.k = function(a) {
      var c = K(a);
      a = N(a);
      var d = K(a);
      a = N(a);
      var e = K(a);
      a = N(a);
      var p = K(a);
      a = L(a);
      return b(c, d, e, p, a);
    };
    a.j = b;
    return a;
  }(), c = function(c, g, h, k, l) {
    switch(arguments.length) {
      case 1:
        return I(c);
      case 2:
        return R(c, g);
      case 3:
        return b.call(this, c, g, h);
      case 4:
        return a.call(this, c, g, h, k);
      default:
        return d.j(c, g, h, k, O(arguments, 4));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.q = 4;
  c.k = d.k;
  c.e = function(a) {
    return I(a);
  };
  c.a = function(a, b) {
    return R(a, b);
  };
  c.c = b;
  c.l = a;
  c.j = d.j;
  return c;
}(), Yb = function() {
  var a = null, b = function() {
    function a(c, g, h, k) {
      var l = null;
      3 < arguments.length && (l = O(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, c, g, h, l);
    }
    function b(a, c, d, k) {
      for (;;) {
        if (a = Pa(a, c, d), q(k)) {
          c = K(k), d = K(N(k)), k = N(N(k));
        } else {
          return a;
        }
      }
    }
    a.q = 3;
    a.k = function(a) {
      var c = K(a);
      a = N(a);
      var h = K(a);
      a = N(a);
      var k = K(a);
      a = L(a);
      return b(c, h, k, a);
    };
    a.j = b;
    return a;
  }(), a = function(a, d, e, g) {
    switch(arguments.length) {
      case 3:
        return Pa(a, d, e);
      default:
        return b.j(a, d, e, O(arguments, 3));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.q = 3;
  a.k = b.k;
  a.c = function(a, b, e) {
    return Pa(a, b, e);
  };
  a.j = b.j;
  return a;
}();
function Zb(a, b, c) {
  var d = I(c);
  if (0 === b) {
    return a.ma ? "" : a.call(null);
  }
  c = z(d);
  var e = A(d);
  if (1 === b) {
    return a.e ? a.e(c) : a.e ? a.e(c) : a.call(null, c);
  }
  var d = z(e), g = A(e);
  if (2 === b) {
    return a.a ? a.a(c, d) : a.a ? a.a(c, d) : a.call(null, c, d);
  }
  var e = z(g), h = A(g);
  if (3 === b) {
    return a.c ? a.c(c, d, e) : a.c ? a.c(c, d, e) : a.call(null, c, d, e);
  }
  var g = z(h), k = A(h);
  if (4 === b) {
    return a.l ? a.l(c, d, e, g) : a.l ? a.l(c, d, e, g) : a.call(null, c, d, e, g);
  }
  h = z(k);
  k = A(k);
  if (5 === b) {
    return a.D ? a.D(c, d, e, g, h) : a.D ? a.D(c, d, e, g, h) : a.call(null, c, d, e, g, h);
  }
  a = z(k);
  var l = A(k);
  if (6 === b) {
    return a.aa ? a.aa(c, d, e, g, h, a) : a.aa ? a.aa(c, d, e, g, h, a) : a.call(null, c, d, e, g, h, a);
  }
  var k = z(l), m = A(l);
  if (7 === b) {
    return a.ha ? a.ha(c, d, e, g, h, a, k) : a.ha ? a.ha(c, d, e, g, h, a, k) : a.call(null, c, d, e, g, h, a, k);
  }
  var l = z(m), p = A(m);
  if (8 === b) {
    return a.Pa ? a.Pa(c, d, e, g, h, a, k, l) : a.Pa ? a.Pa(c, d, e, g, h, a, k, l) : a.call(null, c, d, e, g, h, a, k, l);
  }
  var m = z(p), r = A(p);
  if (9 === b) {
    return a.Qa ? a.Qa(c, d, e, g, h, a, k, l, m) : a.Qa ? a.Qa(c, d, e, g, h, a, k, l, m) : a.call(null, c, d, e, g, h, a, k, l, m);
  }
  var p = z(r), w = A(r);
  if (10 === b) {
    return a.Ea ? a.Ea(c, d, e, g, h, a, k, l, m, p) : a.Ea ? a.Ea(c, d, e, g, h, a, k, l, m, p) : a.call(null, c, d, e, g, h, a, k, l, m, p);
  }
  var r = z(w), C = A(w);
  if (11 === b) {
    return a.Fa ? a.Fa(c, d, e, g, h, a, k, l, m, p, r) : a.Fa ? a.Fa(c, d, e, g, h, a, k, l, m, p, r) : a.call(null, c, d, e, g, h, a, k, l, m, p, r);
  }
  var w = z(C), E = A(C);
  if (12 === b) {
    return a.Ga ? a.Ga(c, d, e, g, h, a, k, l, m, p, r, w) : a.Ga ? a.Ga(c, d, e, g, h, a, k, l, m, p, r, w) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w);
  }
  var C = z(E), J = A(E);
  if (13 === b) {
    return a.Ha ? a.Ha(c, d, e, g, h, a, k, l, m, p, r, w, C) : a.Ha ? a.Ha(c, d, e, g, h, a, k, l, m, p, r, w, C) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C);
  }
  var E = z(J), P = A(J);
  if (14 === b) {
    return a.Ia ? a.Ia(c, d, e, g, h, a, k, l, m, p, r, w, C, E) : a.Ia ? a.Ia(c, d, e, g, h, a, k, l, m, p, r, w, C, E) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C, E);
  }
  var J = z(P), W = A(P);
  if (15 === b) {
    return a.Ja ? a.Ja(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J) : a.Ja ? a.Ja(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C, E, J);
  }
  var P = z(W), fa = A(W);
  if (16 === b) {
    return a.Ka ? a.Ka(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P) : a.Ka ? a.Ka(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P);
  }
  var W = z(fa), oa = A(fa);
  if (17 === b) {
    return a.La ? a.La(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W) : a.La ? a.La(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W);
  }
  var fa = z(oa), jb = A(oa);
  if (18 === b) {
    return a.Ma ? a.Ma(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa) : a.Ma ? a.Ma(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa);
  }
  oa = z(jb);
  jb = A(jb);
  if (19 === b) {
    return a.Na ? a.Na(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa, oa) : a.Na ? a.Na(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa, oa) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa, oa);
  }
  var Mb = z(jb);
  A(jb);
  if (20 === b) {
    return a.Oa ? a.Oa(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa, oa, Mb) : a.Oa ? a.Oa(c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa, oa, Mb) : a.call(null, c, d, e, g, h, a, k, l, m, p, r, w, C, E, J, P, W, fa, oa, Mb);
  }
  throw Error("Only up to 20 arguments supported on functions");
}
var ub = function() {
  function a(a, b, c, d, e) {
    b = Xb.l(b, c, d, e);
    c = a.q;
    return a.k ? (d = Ub(b, c + 1), d <= c ? Zb(a, d, b) : a.k(b)) : a.apply(a, Tb(b));
  }
  function b(a, b, c, d) {
    b = Xb.c(b, c, d);
    c = a.q;
    return a.k ? (d = Ub(b, c + 1), d <= c ? Zb(a, d, b) : a.k(b)) : a.apply(a, Tb(b));
  }
  function c(a, b, c) {
    b = Xb.a(b, c);
    c = a.q;
    if (a.k) {
      var d = Ub(b, c + 1);
      return d <= c ? Zb(a, d, b) : a.k(b);
    }
    return a.apply(a, Tb(b));
  }
  function d(a, b) {
    var c = a.q;
    if (a.k) {
      var d = Ub(b, c + 1);
      return d <= c ? Zb(a, d, b) : a.k(b);
    }
    return a.apply(a, Tb(b));
  }
  var e = null, g = function() {
    function a(c, d, e, g, h, C) {
      var E = null;
      5 < arguments.length && (E = O(Array.prototype.slice.call(arguments, 5), 0));
      return b.call(this, c, d, e, g, h, E);
    }
    function b(a, c, d, e, g, h) {
      c = R(c, R(d, R(e, R(g, Wb(h)))));
      d = a.q;
      return a.k ? (e = Ub(c, d + 1), e <= d ? Zb(a, e, c) : a.k(c)) : a.apply(a, Tb(c));
    }
    a.q = 5;
    a.k = function(a) {
      var c = K(a);
      a = N(a);
      var d = K(a);
      a = N(a);
      var e = K(a);
      a = N(a);
      var g = K(a);
      a = N(a);
      var h = K(a);
      a = L(a);
      return b(c, d, e, g, h, a);
    };
    a.j = b;
    return a;
  }(), e = function(e, k, l, m, p, r) {
    switch(arguments.length) {
      case 2:
        return d.call(this, e, k);
      case 3:
        return c.call(this, e, k, l);
      case 4:
        return b.call(this, e, k, l, m);
      case 5:
        return a.call(this, e, k, l, m, p);
      default:
        return g.j(e, k, l, m, p, O(arguments, 5));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.q = 5;
  e.k = g.k;
  e.a = d;
  e.c = c;
  e.l = b;
  e.D = a;
  e.j = g.j;
  return e;
}();
function $b(a, b) {
  for (;;) {
    if (null == I(b)) {
      return!0;
    }
    if (q(a.e ? a.e(K(b)) : a.call(null, K(b)))) {
      var c = a, d = N(b);
      a = c;
      b = d;
    } else {
      return t ? !1 : null;
    }
  }
}
function ac(a) {
  return a;
}
var bc = function() {
  function a(a, b, c, e) {
    return new Nb(null, function() {
      var m = I(b), p = I(c), r = I(e);
      return m && p && r ? R(a.c ? a.c(K(m), K(p), K(r)) : a.call(null, K(m), K(p), K(r)), d.l(a, L(m), L(p), L(r))) : null;
    }, null, null);
  }
  function b(a, b, c) {
    return new Nb(null, function() {
      var e = I(b), m = I(c);
      return e && m ? R(a.a ? a.a(K(e), K(m)) : a.call(null, K(e), K(m)), d.c(a, L(e), L(m))) : null;
    }, null, null);
  }
  function c(a, b) {
    return new Nb(null, function() {
      var c = I(b);
      if (c) {
        if (c && (c.n & 512 || c.bb)) {
          for (var e = Sa(c), m = S(e), p = new Pb(Array(m), 0), r = 0;;) {
            if (r < m) {
              var w = a.e ? a.e(y.a(e, r)) : a.call(null, y.a(e, r));
              p.add(w);
              r += 1;
            } else {
              break;
            }
          }
          e = p.$();
          c = d.a(a, Ta(c));
          return 0 === la(e) ? c : new Sb(e, c, null, null);
        }
        return R(a.e ? a.e(K(c)) : a.call(null, K(c)), d.a(a, L(c)));
      }
      return null;
    }, null, null);
  }
  var d = null, e = function() {
    function a(c, d, e, g, r) {
      var w = null;
      4 < arguments.length && (w = O(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, g, w);
    }
    function b(a, c, e, g, h) {
      return d.a(function(b) {
        return ub.a(a, b);
      }, function C(a) {
        return new Nb(null, function() {
          var b = d.a(I, a);
          return $b(ac, b) ? R(d.a(K, b), C(d.a(L, b))) : null;
        }, null, null);
      }(mb.j(h, g, O([e, c], 0))));
    }
    a.q = 4;
    a.k = function(a) {
      var c = K(a);
      a = N(a);
      var d = K(a);
      a = N(a);
      var e = K(a);
      a = N(a);
      var g = K(a);
      a = L(a);
      return b(c, d, e, g, a);
    };
    a.j = b;
    return a;
  }(), d = function(d, h, k, l, m) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, h);
      case 3:
        return b.call(this, d, h, k);
      case 4:
        return a.call(this, d, h, k, l);
      default:
        return e.j(d, h, k, l, O(arguments, 4));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.q = 4;
  d.k = e.k;
  d.a = c;
  d.c = b;
  d.l = a;
  d.j = e.j;
  return d;
}();
function cc(a, b) {
  this.m = a;
  this.b = b;
}
function dc(a) {
  return new cc(a, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
}
function ec(a) {
  a = a.d;
  return 32 > a ? 0 : a - 1 >>> 5 << 5;
}
function fc(a, b, c) {
  for (;;) {
    if (0 === b) {
      return c;
    }
    var d = dc(a);
    d.b[0] = c;
    c = d;
    b -= 5;
  }
}
var hc = function gc(b, c, d, e) {
  var g = new cc(d.m, x(d.b)), h = b.d - 1 >>> c & 31;
  5 === c ? g.b[h] = e : (d = d.b[h], b = null != d ? gc(b, c - 5, d, e) : fc(null, c - 5, e), g.b[h] = b);
  return g;
};
function ic(a, b) {
  throw Error([v("No item "), v(a), v(" in vector of length "), v(b)].join(""));
}
function jc(a, b) {
  if (0 <= b && b < a.d) {
    if (b >= ec(a)) {
      return a.w;
    }
    for (var c = a.root, d = a.shift;;) {
      if (0 < d) {
        var e = d - 5, c = c.b[b >>> d & 31], d = e
      } else {
        return c.b;
      }
    }
  } else {
    return ic(b, a.d);
  }
}
var lc = function kc(b, c, d, e, g) {
  var h = new cc(d.m, x(d.b));
  if (0 === c) {
    h.b[e & 31] = g;
  } else {
    var k = e >>> c & 31;
    b = kc(b, c - 5, d.b[k], e, g);
    h.b[k] = b;
  }
  return h;
};
function Z(a, b, c, d, e, g) {
  this.i = a;
  this.d = b;
  this.shift = c;
  this.root = d;
  this.w = e;
  this.h = g;
  this.f = 167668511;
  this.n = 8196;
}
f = Z.prototype;
f.toString = function() {
  return D(this);
};
f.F = function(a, b) {
  return y.c(this, b, null);
};
f.G = function(a, b, c) {
  return y.c(this, b, c);
};
f.N = function(a, b) {
  return jc(this, b)[b & 31];
};
f.S = function(a, b, c) {
  return 0 <= b && b < this.d ? y.a(this, b) : c;
};
f.Ra = function(a, b, c) {
  if (0 <= b && b < this.d) {
    return ec(this) <= b ? (a = x(this.w), a[b & 31] = c, new Z(this.i, this.d, this.shift, this.root, a, null)) : new Z(this.i, this.d, this.shift, lc(this, this.shift, this.root, b, c), this.w, null);
  }
  if (b === this.d) {
    return ma(this, c);
  }
  if (t) {
    throw Error([v("Index "), v(b), v(" out of bounds  [0,"), v(this.d), v("]")].join(""));
  }
  return null;
};
f.J = function() {
  return this.i;
};
f.C = function() {
  return this.d;
};
f.Ua = function() {
  return y.a(this, 0);
};
f.Va = function() {
  return y.a(this, 1);
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.sa = function() {
  return new mc(this.d, this.shift, nc.e ? nc.e(this.root) : nc.call(null, this.root), oc.e ? oc.e(this.w) : oc.call(null, this.w));
};
f.K = function(a, b) {
  return fb.a(this, b);
};
f.L = function(a, b, c) {
  return fb.c(this, b, c);
};
f.la = function(a, b, c) {
  if ("number" === typeof b) {
    return ya(this, b, c);
  }
  throw Error("Vector's key for assoc must be a number.");
};
f.A = function() {
  return 0 === this.d ? null : 32 > this.d ? O.e(this.w) : t ? $.c ? $.c(this, 0, 0) : $.call(null, this, 0, 0) : null;
};
f.I = function(a, b) {
  return new Z(b, this.d, this.shift, this.root, this.w, this.h);
};
f.B = function(a, b) {
  if (32 > this.d - ec(this)) {
    for (var c = this.w.length, d = Array(c + 1), e = 0;;) {
      if (e < c) {
        d[e] = this.w[e], e += 1;
      } else {
        break;
      }
    }
    d[c] = b;
    return new Z(this.i, this.d + 1, this.shift, this.root, d, null);
  }
  c = (d = this.d >>> 5 > 1 << this.shift) ? this.shift + 5 : this.shift;
  d ? (d = dc(null), d.b[0] = this.root, e = fc(null, this.shift, new cc(null, this.w)), d.b[1] = e) : d = hc(this, this.shift, this.root, new cc(null, this.w));
  return new Z(this.i, this.d + 1, c, d, [b], null);
};
f.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.N(null, c);
      case 3:
        return this.S(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(x(b)));
};
f.e = function(a) {
  return this.N(null, a);
};
f.a = function(a, b) {
  return this.S(null, a, b);
};
var pc = new cc(null, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]), qc = new Z(null, 0, 5, pc, [], 0);
function rc(a, b, c, d, e, g) {
  this.s = a;
  this.R = b;
  this.g = c;
  this.p = d;
  this.i = e;
  this.h = g;
  this.f = 32243948;
  this.n = 1536;
}
f = rc.prototype;
f.toString = function() {
  return D(this);
};
f.da = function() {
  if (this.p + 1 < this.R.length) {
    var a = $.l ? $.l(this.s, this.R, this.g, this.p + 1) : $.call(null, this.s, this.R, this.g, this.p + 1);
    return null == a ? null : a;
  }
  return Ua(this);
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return fb.a(sc.c ? sc.c(this.s, this.g + this.p, S(this.s)) : sc.call(null, this.s, this.g + this.p, S(this.s)), b);
};
f.L = function(a, b, c) {
  return fb.c(sc.c ? sc.c(this.s, this.g + this.p, S(this.s)) : sc.call(null, this.s, this.g + this.p, S(this.s)), b, c);
};
f.O = function() {
  return this.R[this.p];
};
f.P = function() {
  if (this.p + 1 < this.R.length) {
    var a = $.l ? $.l(this.s, this.R, this.g, this.p + 1) : $.call(null, this.s, this.R, this.g, this.p + 1);
    return null == a ? F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : a;
  }
  return Ta(this);
};
f.A = function() {
  return this;
};
f.Aa = function() {
  return Rb.a(this.R, this.p);
};
f.Ba = function() {
  var a = this.R.length, a = this.g + a < la(this.s) ? $.c ? $.c(this.s, this.g + a, 0) : $.call(null, this.s, this.g + a, 0) : null;
  return null == a ? F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : a;
};
f.I = function(a, b) {
  return $.D ? $.D(this.s, this.R, this.g, this.p, b) : $.call(null, this.s, this.R, this.g, this.p, b);
};
f.B = function(a, b) {
  return R(b, this);
};
f.za = function() {
  var a = this.R.length, a = this.g + a < la(this.s) ? $.c ? $.c(this.s, this.g + a, 0) : $.call(null, this.s, this.g + a, 0) : null;
  return null == a ? null : a;
};
var $ = function() {
  function a(a, b, c, d, l) {
    return new rc(a, b, c, d, l, null);
  }
  function b(a, b, c, d) {
    return new rc(a, b, c, d, null, null);
  }
  function c(a, b, c) {
    return new rc(a, jc(a, b), b, c, null, null);
  }
  var d = null, d = function(d, g, h, k, l) {
    switch(arguments.length) {
      case 3:
        return c.call(this, d, g, h);
      case 4:
        return b.call(this, d, g, h, k);
      case 5:
        return a.call(this, d, g, h, k, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.c = c;
  d.l = b;
  d.D = a;
  return d;
}();
function tc(a, b, c, d, e) {
  this.i = a;
  this.Y = b;
  this.start = c;
  this.end = d;
  this.h = e;
  this.f = 166617887;
  this.n = 8192;
}
f = tc.prototype;
f.toString = function() {
  return D(this);
};
f.F = function(a, b) {
  return y.c(this, b, null);
};
f.G = function(a, b, c) {
  return y.c(this, b, c);
};
f.N = function(a, b) {
  return 0 > b || this.end <= this.start + b ? ic(b, this.end - this.start) : y.a(this.Y, this.start + b);
};
f.S = function(a, b, c) {
  return 0 > b || this.end <= this.start + b ? c : y.c(this.Y, this.start + b, c);
};
f.Ra = function(a, b, c) {
  var d = this, e = d.start + b;
  return uc.D ? uc.D(d.i, rb.c(d.Y, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b;
  }(), null) : uc.call(null, d.i, rb.c(d.Y, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b;
  }(), null);
};
f.J = function() {
  return this.i;
};
f.C = function() {
  return this.end - this.start;
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return fb.a(this, b);
};
f.L = function(a, b, c) {
  return fb.c(this, b, c);
};
f.la = function(a, b, c) {
  if ("number" === typeof b) {
    return ya(this, b, c);
  }
  throw Error("Subvec's key for assoc must be a number.");
};
f.A = function() {
  var a = this;
  return function c(d) {
    return d === a.end ? null : R(y.a(a.Y, d), new Nb(null, function() {
      return c(d + 1);
    }, null, null));
  }(a.start);
};
f.I = function(a, b) {
  return uc.D ? uc.D(b, this.Y, this.start, this.end, this.h) : uc.call(null, b, this.Y, this.start, this.end, this.h);
};
f.B = function(a, b) {
  return uc.D ? uc.D(this.i, ya(this.Y, this.end, b), this.start, this.end + 1, null) : uc.call(null, this.i, ya(this.Y, this.end, b), this.start, this.end + 1, null);
};
f.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.N(null, c);
      case 3:
        return this.S(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(x(b)));
};
f.e = function(a) {
  return this.N(null, a);
};
f.a = function(a, b) {
  return this.S(null, a, b);
};
function uc(a, b, c, d, e) {
  for (;;) {
    if (b instanceof tc) {
      c = b.start + c, d = b.start + d, b = b.Y;
    } else {
      var g = S(b);
      if (0 > c || 0 > d || c > g || d > g) {
        throw Error("Index out of bounds");
      }
      return new tc(a, b, c, d, e);
    }
  }
}
var sc = function() {
  function a(a, b, c) {
    return uc(null, a, b, c, null);
  }
  function b(a, b) {
    return c.c(a, b, S(a));
  }
  var c = null, c = function(c, e, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.c = a;
  return c;
}();
function nc(a) {
  return new cc({}, x(a.b));
}
function oc(a) {
  var b = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  Ab(a, 0, b, 0, a.length);
  return b;
}
var wc = function vc(b, c, d, e) {
  d = b.root.m === d.m ? d : new cc(b.root.m, x(d.b));
  var g = b.d - 1 >>> c & 31;
  if (5 === c) {
    b = e;
  } else {
    var h = d.b[g];
    b = null != h ? vc(b, c - 5, h, e) : fc(b.root.m, c - 5, e);
  }
  d.b[g] = b;
  return d;
};
function mc(a, b, c, d) {
  this.d = a;
  this.shift = b;
  this.root = c;
  this.w = d;
  this.f = 275;
  this.n = 88;
}
f = mc.prototype;
f.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.F(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(x(b)));
};
f.e = function(a) {
  return this.F(null, a);
};
f.a = function(a, b) {
  return this.G(null, a, b);
};
f.F = function(a, b) {
  return y.c(this, b, null);
};
f.G = function(a, b, c) {
  return y.c(this, b, c);
};
f.N = function(a, b) {
  if (this.root.m) {
    return jc(this, b)[b & 31];
  }
  throw Error("nth after persistent!");
};
f.S = function(a, b, c) {
  return 0 <= b && b < this.d ? y.a(this, b) : c;
};
f.C = function() {
  if (this.root.m) {
    return this.d;
  }
  throw Error("count after persistent!");
};
f.Wa = function(a, b, c) {
  var d = this;
  if (d.root.m) {
    if (0 <= b && b < d.d) {
      return ec(this) <= b ? d.w[b & 31] = c : (a = function g(a, k) {
        var l = d.root.m === k.m ? k : new cc(d.root.m, x(k.b));
        if (0 === a) {
          l.b[b & 31] = c;
        } else {
          var m = b >>> a & 31, p = g(a - 5, l.b[m]);
          l.b[m] = p;
        }
        return l;
      }.call(null, d.shift, d.root), d.root = a), this;
    }
    if (b === d.d) {
      return Na(this, c);
    }
    if (t) {
      throw Error([v("Index "), v(b), v(" out of bounds for TransientVector of length"), v(d.d)].join(""));
    }
    return null;
  }
  throw Error("assoc! after persistent!");
};
f.na = function(a, b, c) {
  return Qa(this, b, c);
};
f.ua = function(a, b) {
  if (this.root.m) {
    if (32 > this.d - ec(this)) {
      this.w[this.d & 31] = b;
    } else {
      var c = new cc(this.root.m, this.w), d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      d[0] = b;
      this.w = d;
      if (this.d >>> 5 > 1 << this.shift) {
        var d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], e = this.shift + 5;
        d[0] = this.root;
        d[1] = fc(this.root.m, this.shift, c);
        this.root = new cc(this.root.m, d);
        this.shift = e;
      } else {
        this.root = wc(this, this.shift, this.root, c);
      }
    }
    this.d += 1;
    return this;
  }
  throw Error("conj! after persistent!");
};
f.va = function() {
  if (this.root.m) {
    this.root.m = null;
    var a = this.d - ec(this), b = Array(a);
    Ab(this.w, 0, b, 0, a);
    return new Z(null, this.d, this.shift, this.root, b, null);
  }
  throw Error("persistent! called twice");
};
F(qc, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
function xc() {
  this.n = 0;
  this.f = 2097152;
}
xc.prototype.t = function() {
  return!1;
};
var yc = new xc;
function zc(a, b) {
  return Bb((null == b ? 0 : b ? b.f & 1024 || b.pb || (b.f ? 0 : s(ta, b)) : s(ta, b)) ? S(a) === S(b) ? $b(ac, bc.a(function(a) {
    return bb.a(pb.c(b, K(a), yc), K(N(a)));
  }, a)) : null : null);
}
function Ac(a, b) {
  var c = a.b;
  if (b instanceof Y) {
    a: {
      for (var d = c.length, e = b.fa, g = 0;;) {
        if (d <= g) {
          c = -1;
          break a;
        }
        var h = c[g];
        if (h instanceof Y && e === h.fa) {
          c = g;
          break a;
        }
        if (t) {
          g += 2;
        } else {
          c = null;
          break a;
        }
      }
      c = void 0;
    }
  } else {
    if ("string" == typeof b || "number" === typeof b) {
      a: {
        d = c.length;
        for (e = 0;;) {
          if (d <= e) {
            c = -1;
            break a;
          }
          if (b === c[e]) {
            c = e;
            break a;
          }
          if (t) {
            e += 2;
          } else {
            c = null;
            break a;
          }
        }
        c = void 0;
      }
    } else {
      if (null == b) {
        a: {
          d = c.length;
          for (e = 0;;) {
            if (d <= e) {
              c = -1;
              break a;
            }
            if (null == c[e]) {
              c = e;
              break a;
            }
            if (t) {
              e += 2;
            } else {
              c = null;
              break a;
            }
          }
          c = void 0;
        }
      } else {
        if (t) {
          a: {
            d = c.length;
            for (e = 0;;) {
              if (d <= e) {
                c = -1;
                break a;
              }
              if (bb.a(b, c[e])) {
                c = e;
                break a;
              }
              if (t) {
                e += 2;
              } else {
                c = null;
                break a;
              }
            }
            c = void 0;
          }
        } else {
          c = null;
        }
      }
    }
  }
  return c;
}
function Bc(a, b, c) {
  this.b = a;
  this.g = b;
  this.xa = c;
  this.n = 0;
  this.f = 32374990;
}
f = Bc.prototype;
f.toString = function() {
  return D(this);
};
f.J = function() {
  return this.xa;
};
f.da = function() {
  return this.g < this.b.length - 2 ? new Bc(this.b, this.g + 2, this.xa) : null;
};
f.C = function() {
  return(this.b.length - this.g) / 2;
};
f.v = function() {
  return kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return U.a(b, this);
};
f.L = function(a, b, c) {
  return U.c(b, c, this);
};
f.O = function() {
  return F(new Z(null, 2, 5, pc, [this.b[this.g], this.b[this.g + 1]], null), new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
};
f.P = function() {
  return this.g < this.b.length - 2 ? new Bc(this.b, this.g + 2, this.xa) : F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
};
f.A = function() {
  return this;
};
f.I = function(a, b) {
  return new Bc(this.b, this.g, b);
};
f.B = function(a, b) {
  return R(b, this);
};
function G(a, b, c, d) {
  this.i = a;
  this.d = b;
  this.b = c;
  this.h = d;
  this.f = 16123663;
  this.n = 8196;
}
f = G.prototype;
f.toString = function() {
  return D(this);
};
f.F = function(a, b) {
  return ra.c(this, b, null);
};
f.G = function(a, b, c) {
  a = Ac(this, b);
  return-1 === a ? c : this.b[a + 1];
};
f.J = function() {
  return this.i;
};
f.C = function() {
  return this.d;
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = Hb(this);
};
f.t = function(a, b) {
  return zc(this, b);
};
f.sa = function() {
  return new Cc({}, this.b.length, x(this.b));
};
f.la = function(a, b, c) {
  a = Ac(this, b);
  if (-1 === a) {
    if (this.d < Dc) {
      a = this.b;
      for (var d = a.length, e = Array(d + 2), g = 0;;) {
        if (g < d) {
          e[g] = a[g], g += 1;
        } else {
          break;
        }
      }
      e[d] = b;
      e[d + 1] = c;
      return new G(this.i, this.d + 1, e, null);
    }
    a = Ca;
    d = sa;
    e = Ec;
    null != e ? e && (e.n & 4 || e.nb) ? (e = Db.c(Na, Ma(e), this), e = Oa(e)) : e = Db.c(ma, e, this) : e = Db.c(mb, F(M, new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)), this);
    return a(d(e, b, c), this.i);
  }
  return c === this.b[a + 1] ? this : t ? (b = x(this.b), b[a + 1] = c, new G(this.i, this.d, b, null)) : null;
};
f.A = function() {
  return 0 <= this.b.length - 2 ? new Bc(this.b, 0, null) : null;
};
f.I = function(a, b) {
  return new G(b, this.d, this.b, this.h);
};
f.B = function(a, b) {
  return yb(b) ? sa(this, y.a(b, 0), y.a(b, 1)) : Db.c(ma, this, b);
};
f.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.F(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(x(b)));
};
f.e = function(a) {
  return this.F(null, a);
};
f.a = function(a, b) {
  return this.G(null, a, b);
};
var Dc = 8;
function Cc(a, b, c) {
  this.ia = a;
  this.ba = b;
  this.b = c;
  this.n = 56;
  this.f = 258;
}
f = Cc.prototype;
f.na = function(a, b, c) {
  if (q(this.ia)) {
    a = Ac(this, b);
    if (-1 === a) {
      return this.ba + 2 <= 2 * Dc ? (this.ba += 2, this.b.push(b), this.b.push(c), this) : Yb.c(Fc.a ? Fc.a(this.ba, this.b) : Fc.call(null, this.ba, this.b), b, c);
    }
    c !== this.b[a + 1] && (this.b[a + 1] = c);
    return this;
  }
  throw Error("assoc! after persistent!");
};
f.ua = function(a, b) {
  if (q(this.ia)) {
    if (b ? b.f & 2048 || b.fb || (b.f ? 0 : s(ua, b)) : s(ua, b)) {
      return Pa(this, V.e ? V.e(b) : V.call(null, b), X.e ? X.e(b) : X.call(null, b));
    }
    for (var c = I(b), d = this;;) {
      var e = K(c);
      if (q(e)) {
        c = N(c), d = Pa(d, V.e ? V.e(e) : V.call(null, e), X.e ? X.e(e) : X.call(null, e));
      } else {
        return d;
      }
    }
  } else {
    throw Error("conj! after persistent!");
  }
};
f.va = function() {
  if (q(this.ia)) {
    return this.ia = !1, new G(null, Eb((this.ba - this.ba % 2) / 2), this.b, null);
  }
  throw Error("persistent! called twice");
};
f.F = function(a, b) {
  return ra.c(this, b, null);
};
f.G = function(a, b, c) {
  if (q(this.ia)) {
    return a = Ac(this, b), -1 === a ? c : this.b[a + 1];
  }
  throw Error("lookup after persistent!");
};
f.C = function() {
  if (q(this.ia)) {
    return Eb((this.ba - this.ba % 2) / 2);
  }
  throw Error("count after persistent!");
};
function Fc(a, b) {
  for (var c = Ma(Ec), d = 0;;) {
    if (d < a) {
      c = Yb.c(c, b[d], b[d + 1]), d += 2;
    } else {
      return c;
    }
  }
}
function Gc() {
  this.Z = !1;
}
function Hc(a, b) {
  return a === b ? !0 : a === b || a instanceof Y && b instanceof Y && a.fa === b.fa ? !0 : t ? bb.a(a, b) : null;
}
var Ic = function() {
  function a(a, b, c, h, k) {
    a = x(a);
    a[b] = c;
    a[h] = k;
    return a;
  }
  function b(a, b, c) {
    a = x(a);
    a[b] = c;
    return a;
  }
  var c = null, c = function(c, e, g, h, k) {
    switch(arguments.length) {
      case 3:
        return b.call(this, c, e, g);
      case 5:
        return a.call(this, c, e, g, h, k);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.c = b;
  c.D = a;
  return c;
}(), Jc = function() {
  function a(a, b, c, h, k, l) {
    a = a.ja(b);
    a.b[c] = h;
    a.b[k] = l;
    return a;
  }
  function b(a, b, c, h) {
    a = a.ja(b);
    a.b[c] = h;
    return a;
  }
  var c = null, c = function(c, e, g, h, k, l) {
    switch(arguments.length) {
      case 4:
        return b.call(this, c, e, g, h);
      case 6:
        return a.call(this, c, e, g, h, k, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.l = b;
  c.aa = a;
  return c;
}();
function Kc(a, b, c) {
  this.m = a;
  this.r = b;
  this.b = c;
}
f = Kc.prototype;
f.ja = function(a) {
  if (a === this.m) {
    return this;
  }
  var b = Fb(this.r), c = Array(0 > b ? 4 : 2 * (b + 1));
  Ab(this.b, 0, c, 0, 2 * b);
  return new Kc(a, this.r, c);
};
f.qa = function() {
  return Lc.e ? Lc.e(this.b) : Lc.call(null, this.b);
};
f.ga = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if (0 === (this.r & e)) {
    return d;
  }
  var g = Fb(this.r & e - 1), e = this.b[2 * g], g = this.b[2 * g + 1];
  return null == e ? g.ga(a + 5, b, c, d) : Hc(c, e) ? g : t ? d : null;
};
f.U = function(a, b, c, d, e, g) {
  var h = 1 << (c >>> b & 31), k = Fb(this.r & h - 1);
  if (0 === (this.r & h)) {
    var l = Fb(this.r);
    if (2 * l < this.b.length) {
      a = this.ja(a);
      b = a.b;
      g.Z = !0;
      a: {
        for (c = 2 * (l - k), g = 2 * k + (c - 1), l = 2 * (k + 1) + (c - 1);;) {
          if (0 === c) {
            break a;
          }
          b[l] = b[g];
          l -= 1;
          c -= 1;
          g -= 1;
        }
      }
      b[2 * k] = d;
      b[2 * k + 1] = e;
      a.r |= h;
      return a;
    }
    if (16 <= l) {
      k = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      k[c >>> b & 31] = Mc.U(a, b + 5, c, d, e, g);
      for (e = d = 0;;) {
        if (32 > d) {
          0 !== (this.r >>> d & 1) && (k[d] = null != this.b[e] ? Mc.U(a, b + 5, T(this.b[e]), this.b[e], this.b[e + 1], g) : this.b[e + 1], e += 2), d += 1;
        } else {
          break;
        }
      }
      return new Nc(a, l + 1, k);
    }
    return t ? (b = Array(2 * (l + 4)), Ab(this.b, 0, b, 0, 2 * k), b[2 * k] = d, b[2 * k + 1] = e, Ab(this.b, 2 * k, b, 2 * (k + 1), 2 * (l - k)), g.Z = !0, a = this.ja(a), a.b = b, a.r |= h, a) : null;
  }
  l = this.b[2 * k];
  h = this.b[2 * k + 1];
  return null == l ? (l = h.U(a, b + 5, c, d, e, g), l === h ? this : Jc.l(this, a, 2 * k + 1, l)) : Hc(d, l) ? e === h ? this : Jc.l(this, a, 2 * k + 1, e) : t ? (g.Z = !0, Jc.aa(this, a, 2 * k, null, 2 * k + 1, Oc.ha ? Oc.ha(a, b + 5, l, h, c, d, e) : Oc.call(null, a, b + 5, l, h, c, d, e))) : null;
};
f.T = function(a, b, c, d, e) {
  var g = 1 << (b >>> a & 31), h = Fb(this.r & g - 1);
  if (0 === (this.r & g)) {
    var k = Fb(this.r);
    if (16 <= k) {
      h = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      h[b >>> a & 31] = Mc.T(a + 5, b, c, d, e);
      for (d = c = 0;;) {
        if (32 > c) {
          0 !== (this.r >>> c & 1) && (h[c] = null != this.b[d] ? Mc.T(a + 5, T(this.b[d]), this.b[d], this.b[d + 1], e) : this.b[d + 1], d += 2), c += 1;
        } else {
          break;
        }
      }
      return new Nc(null, k + 1, h);
    }
    a = Array(2 * (k + 1));
    Ab(this.b, 0, a, 0, 2 * h);
    a[2 * h] = c;
    a[2 * h + 1] = d;
    Ab(this.b, 2 * h, a, 2 * (h + 1), 2 * (k - h));
    e.Z = !0;
    return new Kc(null, this.r | g, a);
  }
  k = this.b[2 * h];
  g = this.b[2 * h + 1];
  return null == k ? (k = g.T(a + 5, b, c, d, e), k === g ? this : new Kc(null, this.r, Ic.c(this.b, 2 * h + 1, k))) : Hc(c, k) ? d === g ? this : new Kc(null, this.r, Ic.c(this.b, 2 * h + 1, d)) : t ? (e.Z = !0, new Kc(null, this.r, Ic.D(this.b, 2 * h, null, 2 * h + 1, Oc.aa ? Oc.aa(a + 5, k, g, b, c, d) : Oc.call(null, a + 5, k, g, b, c, d)))) : null;
};
var Mc = new Kc(null, 0, []);
function Nc(a, b, c) {
  this.m = a;
  this.d = b;
  this.b = c;
}
f = Nc.prototype;
f.ja = function(a) {
  return a === this.m ? this : new Nc(a, this.d, x(this.b));
};
f.qa = function() {
  return Pc.e ? Pc.e(this.b) : Pc.call(null, this.b);
};
f.ga = function(a, b, c, d) {
  var e = this.b[b >>> a & 31];
  return null != e ? e.ga(a + 5, b, c, d) : d;
};
f.U = function(a, b, c, d, e, g) {
  var h = c >>> b & 31, k = this.b[h];
  if (null == k) {
    return a = Jc.l(this, a, h, Mc.U(a, b + 5, c, d, e, g)), a.d += 1, a;
  }
  b = k.U(a, b + 5, c, d, e, g);
  return b === k ? this : Jc.l(this, a, h, b);
};
f.T = function(a, b, c, d, e) {
  var g = b >>> a & 31, h = this.b[g];
  if (null == h) {
    return new Nc(null, this.d + 1, Ic.c(this.b, g, Mc.T(a + 5, b, c, d, e)));
  }
  a = h.T(a + 5, b, c, d, e);
  return a === h ? this : new Nc(null, this.d, Ic.c(this.b, g, a));
};
function Qc(a, b, c) {
  b *= 2;
  for (var d = 0;;) {
    if (d < b) {
      if (Hc(c, a[d])) {
        return d;
      }
      d += 2;
    } else {
      return-1;
    }
  }
}
function Rc(a, b, c, d) {
  this.m = a;
  this.ea = b;
  this.d = c;
  this.b = d;
}
f = Rc.prototype;
f.ja = function(a) {
  if (a === this.m) {
    return this;
  }
  var b = Array(2 * (this.d + 1));
  Ab(this.b, 0, b, 0, 2 * this.d);
  return new Rc(a, this.ea, this.d, b);
};
f.qa = function() {
  return Lc.e ? Lc.e(this.b) : Lc.call(null, this.b);
};
f.ga = function(a, b, c, d) {
  a = Qc(this.b, this.d, c);
  return 0 > a ? d : Hc(c, this.b[a]) ? this.b[a + 1] : t ? d : null;
};
f.U = function(a, b, c, d, e, g) {
  if (c === this.ea) {
    b = Qc(this.b, this.d, d);
    if (-1 === b) {
      if (this.b.length > 2 * this.d) {
        return a = Jc.aa(this, a, 2 * this.d, d, 2 * this.d + 1, e), g.Z = !0, a.d += 1, a;
      }
      c = this.b.length;
      b = Array(c + 2);
      Ab(this.b, 0, b, 0, c);
      b[c] = d;
      b[c + 1] = e;
      g.Z = !0;
      g = this.d + 1;
      a === this.m ? (this.b = b, this.d = g, a = this) : a = new Rc(this.m, this.ea, g, b);
      return a;
    }
    return this.b[b + 1] === e ? this : Jc.l(this, a, b + 1, e);
  }
  return(new Kc(a, 1 << (this.ea >>> b & 31), [null, this, null, null])).U(a, b, c, d, e, g);
};
f.T = function(a, b, c, d, e) {
  return b === this.ea ? (a = Qc(this.b, this.d, c), -1 === a ? (a = 2 * this.d, b = Array(a + 2), Ab(this.b, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.Z = !0, new Rc(null, this.ea, this.d + 1, b)) : bb.a(this.b[a], d) ? this : new Rc(null, this.ea, this.d, Ic.c(this.b, a + 1, d))) : (new Kc(null, 1 << (this.ea >>> a & 31), [null, this])).T(a, b, c, d, e);
};
var Oc = function() {
  function a(a, b, c, h, k, l, m) {
    var p = T(c);
    if (p === k) {
      return new Rc(null, p, 2, [c, h, l, m]);
    }
    var r = new Gc;
    return Mc.U(a, b, p, c, h, r).U(a, b, k, l, m, r);
  }
  function b(a, b, c, h, k, l) {
    var m = T(b);
    if (m === h) {
      return new Rc(null, m, 2, [b, c, k, l]);
    }
    var p = new Gc;
    return Mc.T(a, m, b, c, p).T(a, h, k, l, p);
  }
  var c = null, c = function(c, e, g, h, k, l, m) {
    switch(arguments.length) {
      case 6:
        return b.call(this, c, e, g, h, k, l);
      case 7:
        return a.call(this, c, e, g, h, k, l, m);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.aa = b;
  c.ha = a;
  return c;
}();
function Sc(a, b, c, d, e) {
  this.i = a;
  this.V = b;
  this.g = c;
  this.o = d;
  this.h = e;
  this.n = 0;
  this.f = 32374860;
}
f = Sc.prototype;
f.toString = function() {
  return D(this);
};
f.J = function() {
  return this.i;
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return U.a(b, this);
};
f.L = function(a, b, c) {
  return U.c(b, c, this);
};
f.O = function() {
  return null == this.o ? F(new Z(null, 2, 5, pc, [this.V[this.g], this.V[this.g + 1]], null), new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)) : K(this.o);
};
f.P = function() {
  return null == this.o ? Lc.c ? Lc.c(this.V, this.g + 2, null) : Lc.call(null, this.V, this.g + 2, null) : Lc.c ? Lc.c(this.V, this.g, N(this.o)) : Lc.call(null, this.V, this.g, N(this.o));
};
f.A = function() {
  return this;
};
f.I = function(a, b) {
  return new Sc(b, this.V, this.g, this.o, this.h);
};
f.B = function(a, b) {
  return R(b, this);
};
var Lc = function() {
  function a(a, b, c) {
    if (null == c) {
      for (c = a.length;;) {
        if (b < c) {
          if (null != a[b]) {
            return new Sc(null, a, b, null, null);
          }
          var h = a[b + 1];
          if (q(h) && (h = h.qa(), q(h))) {
            return new Sc(null, a, b + 2, h, null);
          }
          b += 2;
        } else {
          return null;
        }
      }
    } else {
      return new Sc(null, a, b, c, null);
    }
  }
  function b(a) {
    return c.c(a, 0, null);
  }
  var c = null, c = function(c, e, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 3:
        return a.call(this, c, e, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.e = b;
  c.c = a;
  return c;
}();
function Tc(a, b, c, d, e) {
  this.i = a;
  this.V = b;
  this.g = c;
  this.o = d;
  this.h = e;
  this.n = 0;
  this.f = 32374860;
}
f = Tc.prototype;
f.toString = function() {
  return D(this);
};
f.J = function() {
  return this.i;
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = kb(this);
};
f.t = function(a, b) {
  return Q(this, b);
};
f.K = function(a, b) {
  return U.a(b, this);
};
f.L = function(a, b, c) {
  return U.c(b, c, this);
};
f.O = function() {
  return K(this.o);
};
f.P = function() {
  return Pc.l ? Pc.l(null, this.V, this.g, N(this.o)) : Pc.call(null, null, this.V, this.g, N(this.o));
};
f.A = function() {
  return this;
};
f.I = function(a, b) {
  return new Tc(b, this.V, this.g, this.o, this.h);
};
f.B = function(a, b) {
  return R(b, this);
};
var Pc = function() {
  function a(a, b, c, h) {
    if (null == h) {
      for (h = b.length;;) {
        if (c < h) {
          var k = b[c];
          if (q(k) && (k = k.qa(), q(k))) {
            return new Tc(a, b, c + 1, k, null);
          }
          c += 1;
        } else {
          return null;
        }
      }
    } else {
      return new Tc(a, b, c, h, null);
    }
  }
  function b(a) {
    return c.l(null, a, 0, null);
  }
  var c = null, c = function(c, e, g, h) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 4:
        return a.call(this, c, e, g, h);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.e = b;
  c.l = a;
  return c;
}();
function Uc(a, b, c, d, e, g) {
  this.i = a;
  this.d = b;
  this.root = c;
  this.M = d;
  this.Q = e;
  this.h = g;
  this.f = 16123663;
  this.n = 8196;
}
f = Uc.prototype;
f.toString = function() {
  return D(this);
};
f.F = function(a, b) {
  return ra.c(this, b, null);
};
f.G = function(a, b, c) {
  return null == b ? this.M ? this.Q : c : null == this.root ? c : t ? this.root.ga(0, T(b), b, c) : null;
};
f.J = function() {
  return this.i;
};
f.C = function() {
  return this.d;
};
f.v = function() {
  var a = this.h;
  return null != a ? a : this.h = a = Hb(this);
};
f.t = function(a, b) {
  return zc(this, b);
};
f.sa = function() {
  return new Vc({}, this.root, this.d, this.M, this.Q);
};
f.la = function(a, b, c) {
  if (null == b) {
    return this.M && c === this.Q ? this : new Uc(this.i, this.M ? this.d : this.d + 1, this.root, !0, c, null);
  }
  a = new Gc;
  b = (null == this.root ? Mc : this.root).T(0, T(b), b, c, a);
  return b === this.root ? this : new Uc(this.i, a.Z ? this.d + 1 : this.d, b, this.M, this.Q, null);
};
f.A = function() {
  if (0 < this.d) {
    var a = null != this.root ? this.root.qa() : null;
    return this.M ? R(F(new Z(null, 2, 5, pc, [null, this.Q], null), new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null)), a) : a;
  }
  return null;
};
f.I = function(a, b) {
  return new Uc(b, this.d, this.root, this.M, this.Q, this.h);
};
f.B = function(a, b) {
  return yb(b) ? sa(this, y.a(b, 0), y.a(b, 1)) : Db.c(ma, this, b);
};
f.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.F(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(x(b)));
};
f.e = function(a) {
  return this.F(null, a);
};
f.a = function(a, b) {
  return this.G(null, a, b);
};
var Ec = new Uc(null, 0, null, !1, null, 0);
function qb(a, b) {
  for (var c = a.length, d = 0, e = Ma(Ec);;) {
    if (d < c) {
      var g = d + 1, e = e.na(null, a[d], b[d]), d = g
    } else {
      return Oa(e);
    }
  }
}
function Vc(a, b, c, d, e) {
  this.m = a;
  this.root = b;
  this.count = c;
  this.M = d;
  this.Q = e;
  this.n = 56;
  this.f = 258;
}
f = Vc.prototype;
f.na = function(a, b, c) {
  return Wc(this, b, c);
};
f.ua = function(a, b) {
  var c;
  a: {
    if (this.m) {
      if (b ? b.f & 2048 || b.fb || (b.f ? 0 : s(ua, b)) : s(ua, b)) {
        c = Wc(this, V.e ? V.e(b) : V.call(null, b), X.e ? X.e(b) : X.call(null, b));
        break a;
      }
      c = I(b);
      for (var d = this;;) {
        var e = K(c);
        if (q(e)) {
          c = N(c), d = Wc(d, V.e ? V.e(e) : V.call(null, e), X.e ? X.e(e) : X.call(null, e));
        } else {
          c = d;
          break a;
        }
      }
    } else {
      throw Error("conj! after persistent");
    }
    c = void 0;
  }
  return c;
};
f.va = function() {
  var a;
  if (this.m) {
    this.m = null, a = new Uc(null, this.count, this.root, this.M, this.Q, null);
  } else {
    throw Error("persistent! called twice");
  }
  return a;
};
f.F = function(a, b) {
  return null == b ? this.M ? this.Q : null : null == this.root ? null : this.root.ga(0, T(b), b);
};
f.G = function(a, b, c) {
  return null == b ? this.M ? this.Q : c : null == this.root ? c : this.root.ga(0, T(b), b, c);
};
f.C = function() {
  if (this.m) {
    return this.count;
  }
  throw Error("count after persistent!");
};
function Wc(a, b, c) {
  if (a.m) {
    if (null == b) {
      a.Q !== c && (a.Q = c), a.M || (a.count += 1, a.M = !0);
    } else {
      var d = new Gc;
      b = (null == a.root ? Mc : a.root).U(a.m, 0, T(b), b, c, d);
      b !== a.root && (a.root = b);
      d.Z && (a.count += 1);
    }
    return a;
  }
  throw Error("assoc! after persistent!");
}
function V(a) {
  return va(a);
}
function X(a) {
  return wa(a);
}
function Xc(a) {
  if (a && (a.n & 4096 || a.hb)) {
    return a.name;
  }
  if ("string" === typeof a) {
    return a;
  }
  throw Error([v("Doesn't support name: "), v(a)].join(""));
}
function Yc(a, b, c, d, e, g, h) {
  var k = ga;
  try {
    ga = null == ga ? null : ga - 1;
    if (null != ga && 0 > ga) {
      return B(a, "#");
    }
    B(a, c);
    I(h) && (b.c ? b.c(K(h), a, g) : b.call(null, K(h), a, g));
    for (var l = N(h), m = $a.e(g);l && (null == m || 0 !== m);) {
      B(a, d);
      b.c ? b.c(K(l), a, g) : b.call(null, K(l), a, g);
      var p = N(l);
      c = m - 1;
      l = p;
      m = c;
    }
    q($a.e(g)) && (B(a, d), b.c ? b.c("...", a, g) : b.call(null, "...", a, g));
    return B(a, e);
  } finally {
    ga = k;
  }
}
var Zc = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = O(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    for (var e = I(b), g = null, h = 0, k = 0;;) {
      if (k < h) {
        var l = g.N(null, k);
        B(a, l);
        k += 1;
      } else {
        if (e = I(e)) {
          (g = e) && (g.n & 512 || g.bb) ? (e = Sa(g), h = Ta(g), g = e, l = S(e), e = h, h = l) : (l = K(g), B(a, l), e = N(g), g = null, h = 0), k = 0;
        } else {
          return null;
        }
      }
    }
  }
  a.q = 1;
  a.k = function(a) {
    var d = K(a);
    a = L(a);
    return b(d, a);
  };
  a.j = b;
  return a;
}(), $c = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
function ad(a) {
  return[v('"'), v(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return $c[a];
  })), v('"')].join("");
}
var dd = function bd(b, c, d) {
  if (null == b) {
    return B(c, "nil");
  }
  if (void 0 === b) {
    return B(c, "#\x3cundefined\x3e");
  }
  if (t) {
    q(function() {
      var c = pb.a(d, Ya);
      return q(c) ? (c = b ? b.f & 131072 || b.gb ? !0 : b.f ? !1 : s(za, b) : s(za, b)) ? vb(b) : c : c;
    }()) && (B(c, "^"), bd(vb(b), c, d), B(c, " "));
    if (null == b) {
      return B(c, "nil");
    }
    if (b.Za) {
      return b.jb(c);
    }
    if (b && (b.f & 2147483648 || b.H)) {
      return b.u(null, c, d);
    }
    if (ha(b) === Boolean || "number" === typeof b) {
      return B(c, "" + v(b));
    }
    if (null != b && b.constructor === Object) {
      return B(c, "#js "), cd.l ? cd.l(bc.a(function(c) {
        return F(new Z(null, 2, 5, pc, [Lb.e(c), b[c]], null), new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
      }, zb(b)), bd, c, d) : cd.call(null, bc.a(function(c) {
        return F(new Z(null, 2, 5, pc, [Lb.e(c), b[c]], null), new G(null, 1, [H, "/home/oliy/dev/eat-me/target/cljsbuild-compiler-0/cljs/core.cljs"], null));
      }, zb(b)), bd, c, d);
    }
    if (b instanceof Array) {
      return Yc(c, bd, "#js [", " ", "]", d, b);
    }
    if ("string" == typeof b) {
      return q(Xa.e(d)) ? B(c, ad(b)) : B(c, b);
    }
    if (sb(b)) {
      return Zc.j(c, O(["#\x3c", "" + v(b), "\x3e"], 0));
    }
    if (b instanceof Date) {
      var e = function(b, c) {
        for (var d = "" + v(b);;) {
          if (S(d) < c) {
            d = [v("0"), v(d)].join("");
          } else {
            return d;
          }
        }
      };
      return Zc.j(c, O(['#inst "', "" + v(b.getUTCFullYear()), "-", e(b.getUTCMonth() + 1, 2), "-", e(b.getUTCDate(), 2), "T", e(b.getUTCHours(), 2), ":", e(b.getUTCMinutes(), 2), ":", e(b.getUTCSeconds(), 2), ".", e(b.getUTCMilliseconds(), 3), "-", '00:00"'], 0));
    }
    return b instanceof RegExp ? Zc.j(c, O(['#"', b.source, '"'], 0)) : (b ? b.f & 2147483648 || b.H || (b.f ? 0 : s(Ka, b)) : s(Ka, b)) ? La(b, c, d) : t ? Zc.j(c, O(["#\x3c", "" + v(b), "\x3e"], 0)) : null;
  }
  return null;
};
function cd(a, b, c, d) {
  return Yc(c, function(a, c, d) {
    b.c ? b.c(va(a), c, d) : b.call(null, va(a), c, d);
    B(c, " ");
    return b.c ? b.c(wa(a), c, d) : b.call(null, wa(a), c, d);
  }, "{", ", ", "}", d, I(a));
}
eb.prototype.H = !0;
eb.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
Nb.prototype.H = !0;
Nb.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
Sc.prototype.H = !0;
Sc.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
Bc.prototype.H = !0;
Bc.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
rc.prototype.H = !0;
rc.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
Kb.prototype.H = !0;
Kb.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
Uc.prototype.H = !0;
Uc.prototype.u = function(a, b, c) {
  return cd(this, dd, b, c);
};
Tc.prototype.H = !0;
Tc.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
tc.prototype.H = !0;
tc.prototype.u = function(a, b, c) {
  return Yc(b, dd, "[", " ", "]", c, this);
};
Sb.prototype.H = !0;
Sb.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
Z.prototype.H = !0;
Z.prototype.u = function(a, b, c) {
  return Yc(b, dd, "[", " ", "]", c, this);
};
Jb.prototype.H = !0;
Jb.prototype.u = function(a, b) {
  return B(b, "()");
};
G.prototype.H = !0;
G.prototype.u = function(a, b, c) {
  return cd(this, dd, b, c);
};
Ib.prototype.H = !0;
Ib.prototype.u = function(a, b, c) {
  return Yc(b, dd, "(", " ", ")", c, this);
};
Z.prototype.Ca = !0;
Z.prototype.Da = function(a, b) {
  return Cb.a(this, b);
};
tc.prototype.Ca = !0;
tc.prototype.Da = function(a, b) {
  return Cb.a(this, b);
};
Y.prototype.Ca = !0;
Y.prototype.Da = function(a, b) {
  return ab(this, b);
};
var Ya = new Y(null, "meta", "meta"), Za = new Y(null, "dup", "dup"), t = new Y(null, "else", "else"), db = new Y(null, "default", "default"), H = new Y(null, "file", "file"), Wa = new Y(null, "flush-on-newline", "flush-on-newline"), Xa = new Y(null, "readably", "readably"), $a = new Y(null, "print-length", "print-length");
document.write("Hello, ClojureScript!");
