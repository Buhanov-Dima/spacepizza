"use strict";

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}! function(t, a, e) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(require("jquery")) : t(a || e)
}(function(t) {
    var a = function(a, e, s) {
        var r = {
            invalid: [],
            getCaret: function() {
                try {
                    var t, e = 0,
                        s = a.get(0),
                        n = document.selection,
                        o = s.selectionStart;
                    return n && -1 === navigator.appVersion.indexOf("MSIE 10") ? (t = n.createRange(), t.moveStart("character", -r.val().length), e = t.text.length) : (o || "0" === o) && (e = o), e
                } catch (t) {}
            },
            setCaret: function(t) {
                try {
                    if (a.is(":focus")) {
                        var e, s = a.get(0);
                        s.setSelectionRange ? s.setSelectionRange(t, t) : (e = s.createTextRange(), e.collapse(!0), e.moveEnd("character", t), e.moveStart("character", t), e.select())
                    }
                } catch (t) {}
            },
            events: function() {
                a.on("keydown.mask", function(t) {
                    a.data("mask-keycode", t.keyCode || t.which), a.data("mask-previus-value", a.val()), a.data("mask-previus-caret-pos", r.getCaret()), r.maskDigitPosMapOld = r.maskDigitPosMap
                }).on(t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", r.behaviour).on("paste.mask drop.mask", function() {
                    setTimeout(function() {
                        a.keydown().keyup()
                    }, 100)
                }).on("change.mask", function() {
                    a.data("changed", !0)
                }).on("blur.mask", function() {
                    i === r.val() || a.data("changed") || a.trigger("change"), a.data("changed", !1)
                }).on("blur.mask", function() {
                    i = r.val()
                }).on("focus.mask", function(a) {
                    !0 === s.selectOnFocus && t(a.target).select()
                }).on("focusout.mask", function() {
                    s.clearIfNotMatch && !n.test(r.val()) && r.val("")
                })
            },
            getRegexMask: function() {
                for (var t, a, s, r, n, i, c = [], p = 0; p < e.length; p++) t = o.translation[e.charAt(p)], t ? (a = t.pattern.toString().replace(/.{1}$|^.{1}/g, ""), s = t.optional, r = t.recursive, r ? (c.push(e.charAt(p)), n = {
                    digit: e.charAt(p),
                    pattern: a
                }) : c.push(s || r ? a + "?" : a)) : c.push(e.charAt(p).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                return i = c.join(""), n && (i = i.replace(new RegExp("(" + n.digit + "(.*" + n.digit + ")?)"), "($1)?").replace(new RegExp(n.digit, "g"), n.pattern)), new RegExp(i)
            },
            destroyEvents: function() {
                a.off(["input", "keydown", "keyup", "paste", "drop", "blur", "focusout", ""].join(".mask "))
            },
            val: function(t) {
                var e, s = a.is("input"),
                    r = s ? "val" : "text";
                return arguments.length > 0 ? (a[r]() !== t && a[r](t), e = a) : e = a[r](), e
            },
            calculateCaretPosition: function() {
                var t = a.data("mask-previus-value") || "",
                    e = r.getMasked(),
                    s = r.getCaret();
                if (t !== e) {
                    var n = a.data("mask-previus-caret-pos") || 0,
                        o = e.length,
                        i = t.length,
                        c = 0,
                        p = 0,
                        l = 0,
                        u = 0,
                        d = 0;
                    for (d = s; d < o && r.maskDigitPosMap[d]; d++) p++;
                    for (d = s - 1; d >= 0 && r.maskDigitPosMap[d]; d--) c++;
                    for (d = s - 1; d >= 0; d--) r.maskDigitPosMap[d] && l++;
                    for (d = n - 1; d >= 0; d--) r.maskDigitPosMapOld[d] && u++;
                    if (s > i) s = 10 * o;
                    else if (n >= s && n !== i) {
                        if (!r.maskDigitPosMapOld[s]) {
                            var m = s;
                            s -= u - l, s -= c, r.maskDigitPosMap[s] && (s = m)
                        }
                    } else s > n && (s += l - u, s += p)
                }
                return s
            },
            behaviour: function(e) {
                e = e || window.event, r.invalid = [];
                var s = a.data("mask-keycode");
                if (-1 === t.inArray(s, o.byPassKeys)) {
                    var n = r.getMasked(),
                        i = r.getCaret();
                    return setTimeout(function() {
                        r.setCaret(r.calculateCaretPosition())
                    }, t.jMaskGlobals.keyStrokeCompensation), r.val(n), r.setCaret(i), r.callbacks(e)
                }
            },
            getMasked: function(t, a) {
                var n, i, c = [],
                    p = void 0 === a ? r.val() : a + "",
                    l = 0,
                    u = e.length,
                    d = 0,
                    m = p.length,
                    f = 1,
                    k = "push",
                    v = -1,
                    b = 0,
                    h = [];
                s.reverse ? (k = "unshift", f = -1, n = 0, l = u - 1, d = m - 1, i = function() {
                    return l > -1 && d > -1
                }) : (n = u - 1, i = function() {
                    return l < u && d < m
                });
                for (var _; i();) {
                    var y = e.charAt(l),
                        g = p.charAt(d),
                        P = o.translation[y];
                    P ? (g.match(P.pattern) ? (c[k](g), P.recursive && (-1 === v ? v = l : l === n && l !== v && (l = v - f), n === v && (l -= f)), l += f) : g === _ ? (b--, _ = void 0) : P.optional ? (l += f, d -= f) : P.fallback ? (c[k](P.fallback), l += f, d -= f) : r.invalid.push({
                        p: d,
                        v: g,
                        e: P.pattern
                    }), d += f) : (t || c[k](y), g === y ? (h.push(d), d += f) : (_ = y, h.push(d + b), b++), l += f)
                }
                var S = e.charAt(n);
                u !== m + 1 || o.translation[S] || c.push(S);
                var M = c.join("");
                return r.mapMaskdigitPositions(M, h, m), M
            },
            mapMaskdigitPositions: function(t, a, e) {
                var n = s.reverse ? t.length - e : 0;
                r.maskDigitPosMap = {};
                for (var o = 0; o < a.length; o++) r.maskDigitPosMap[a[o] + n] = 1
            },
            callbacks: function(t) {
                var n = r.val(),
                    o = n !== i,
                    c = [n, t, a, s],
                    p = function(t, a, e) {
                        "function" == typeof s[t] && a && s[t].apply(this, e)
                    };
                p("onChange", !0 === o, c), p("onKeyPress", !0 === o, c), p("onComplete", n.length === e.length, c), p("onInvalid", r.invalid.length > 0, [n, t, a, r.invalid, s])
            }
        };
        a = t(a);
        var n, o = this,
            i = r.val();
        e = "function" == typeof e ? e(r.val(), void 0, a, s) : e, o.mask = e, o.options = s, o.remove = function() {
            var t = r.getCaret();
            return o.options.placeholder && a.removeAttr("placeholder"), a.data("mask-maxlength") && a.removeAttr("maxlength"), r.destroyEvents(), r.val(o.getCleanVal()), r.setCaret(t), a
        }, o.getCleanVal = function() {
            return r.getMasked(!0)
        }, o.getMaskedVal = function(t) {
            return r.getMasked(!1, t)
        }, o.init = function(i) {
            if (i = i || !1, s = s || {}, o.clearIfNotMatch = t.jMaskGlobals.clearIfNotMatch, o.byPassKeys = t.jMaskGlobals.byPassKeys, o.translation = t.extend({}, t.jMaskGlobals.translation, s.translation), o = t.extend(!0, {}, o, s), n = r.getRegexMask(), i) r.events(), r.val(r.getMasked());
            else {
                s.placeholder && a.attr("placeholder", s.placeholder), a.data("mask") && a.attr("autocomplete", "off");
                for (var c = 0, p = !0; c < e.length; c++) {
                    var l = o.translation[e.charAt(c)];
                    if (l && l.recursive) {
                        p = !1;
                        break
                    }
                }
                p && a.attr("maxlength", e.length).data("mask-maxlength", !0), r.destroyEvents(), r.events();
                var u = r.getCaret();
                r.val(r.getMasked()), r.setCaret(u)
            }
        }, o.init(!a.is("input"))
    };
    t.maskWatchers = {};
    var e = function() {
            var e = t(this),
                r = {},
                n = "data-mask-",
                o = e.attr("data-mask");
            if (e.attr(n + "reverse") && (r.reverse = !0), e.attr(n + "clearifnotmatch") && (r.clearIfNotMatch = !0), "true" === e.attr(n + "selectonfocus") && (r.selectOnFocus = !0), s(e, o, r)) return e.data("mask", new a(this, o, r))
        },
        s = function(a, e, s) {
            s = s || {};
            var r = t(a).data("mask"),
                n = JSON.stringify,
                o = t(a).val() || t(a).text();
            try {
                return "function" == typeof e && (e = e(o)), "object" !== _typeof(r) || n(r.options) !== n(s) || r.mask !== e
            } catch (t) {}
        },
        r = function(t) {
            var a, e = document.createElement("div");
            return t = "on" + t, a = t in e, a || (e.setAttribute(t, "return;"), a = "function" == typeof e[t]), e = null, a
        };
    t.fn.mask = function(e, r) {
        r = r || {};
        var n = this.selector,
            o = t.jMaskGlobals,
            i = o.watchInterval,
            c = r.watchInputs || o.watchInputs,
            p = function() {
                if (s(this, e, r)) return t(this).data("mask", new a(this, e, r))
            };
        return t(this).each(p), n && "" !== n && c && (clearInterval(t.maskWatchers[n]), t.maskWatchers[n] = setInterval(function() {
            t(document).find(n).each(p)
        }, i)), this
    }, t.fn.masked = function(t) {
        return this.data("mask").getMaskedVal(t)
    }, t.fn.unmask = function() {
        return clearInterval(t.maskWatchers[this.selector]), delete t.maskWatchers[this.selector], this.each(function() {
            var a = t(this).data("mask");
            a && a.remove().removeData("mask")
        })
    }, t.fn.cleanVal = function() {
        return this.data("mask").getCleanVal()
    }, t.applyDataMask = function(a) {
        a = a || t.jMaskGlobals.maskElements, (a instanceof t ? a : t(a)).filter(t.jMaskGlobals.dataMaskAttr).each(e)
    };
    var n = {
        maskElements: "input,td,span,div",
        dataMaskAttr: "*[data-mask]",
        dataMask: !0,
        watchInterval: 300,
        watchInputs: !0,
        keyStrokeCompensation: 10,
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && r("input"),
        watchDataMask: !1,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            0: {
                pattern: /\d/
            },
            9: {
                pattern: /\d/,
                optional: !0
            },
            "#": {
                pattern: /\d/,
                recursive: !0
            },
            A: {
                pattern: /[a-zA-Z0-9]/
            },
            S: {
                pattern: /[a-zA-Z]/
            }
        }
    };
    t.jMaskGlobals = t.jMaskGlobals || {}, n = t.jMaskGlobals = t.extend(!0, {}, n, t.jMaskGlobals), n.dataMask && t.applyDataMask(), setInterval(function() {
        t.jMaskGlobals.watchDataMask && t.applyDataMask()
    }, n.watchInterval)
}, window.jQuery, window.Zepto),
function(t) {
    var a = {
            productElement: "product__element",
            buttonAddToBasket: "product__add-to-cart-button",
            countryCode: "+38",
            smartBasketCurrency: "₴",
            productQuantityWrapper: !1,
            productPrice: !1,
            productSize: !1,
            smartBasketMinArea: "header__basket-min",
            smartBasketMinIconPath: "/smartbasket/img/shopping-basket-wight.svg",
            localStorageName: "basketItems"
        },
        e = {
            getProducts: function() {
                return JSON.parse(localStorage.getItem(a.localStorageName))
            },
            setProducts: function(t) {
                var e = JSON.stringify(t, "", 4);
                return localStorage.setItem(a.localStorageName, e), !1
            },
            deleteProducts: function(a, s) {
                var r = t("<button>").attr({
                    class: "smart-basket__product-delete"
                }).html('<span class="smart-basket__delete-icon">×</span>');
                return r.click(function(r) {
                    r.preventDefault();
                    var n = t(this).data("sbProductDelete");
                    delete a[n], e.setProducts(a), t(this).parents("." + s.attr("class")).remove(), e.getSmartBasketMinState(a, "updateSmartBasketMin"), e.commonResult(a, "updateCommonResult")
                }), r
            },
            showProducts: function(s) {
                var r = t("<form>").attr({
                        class: "smart-basket__form",
                        method: "POST",
                        id: "smart-basket__form",
                        enctype: "multipart/form-data"
                    }),
                    n = t("<div>").attr({
                        class: "smart-basket__product-item"
                    }),
                    o = t("<div>").attr({
                        class: "smart-basket__product-id"
                    }).html("ID"),
                    i = t("<div>").attr({
                        class: "smart-basket__product-name"
                    }).html("Товар"),
                    c = t("<div>").attr({
                        class: "smart-basket__product-quantity smart-basket__product-quantity_header"
                    }).html("Кол-во"),
                    p = t("<span>").attr({
                        class: "smart-basket__info-icon"
                    }).html("?"),
                    l = t("<button>").attr({
                        class: "smart-basket__info-msgs-close"
                    }).html("×"),
                    u = t("<span>").attr({
                        class: "smart-basket__info-msgs"
                    }).html("Цена за 1 товар или услугу").append(l),
                    d = t("<div>").attr({
                        class: "smart-basket__product-price"
                    }).html("Цена / ".concat(a.smartBasketCurrency)).append(p).append(u);
                p.click(function() {
                    u.fadeToggle()
                }), l.click(function(t) {
                    t.preventDefault(), u.fadeToggle()
                });
                var m = t("<div>").attr({
                        class: "smart-basket__product-price-common"
                    }).html("Общая цена / ".concat(a.smartBasketCurrency)),
                    f = t("<div>").attr({
                        class: "smart-basket__product-delete"
                    }).html("Удалить");
                n.append(i).append(o).append(d).append(c).append(m).append(f), r.append(n);
                var k = function(n) {
                    var o = t("<div>").attr({
                            class: "smart-basket__product-item"
                        }),
                        i = t("<div>").attr({
                            class: "smart-basket__product-id"
                        }),
                        c = t("<input>").attr({
                            class: "smart-basket__input",
                            type: "hidden"
                        }),
                        p = t("<div>").attr({
                            class: "smart-basket__product-name"
                        }),
                        l = t("<input>").attr({
                            class: "smart-basket__input",
                            type: "hidden"
                        }),
                        u = t("<input>").attr({
                            class: "smart-basket__input",
                            type: "hidden"
                        }),
                        d = t("<input>").attr({
                            class: "smart-basket__input",
                            type: "hidden"
                        }),
                        m = t("<div>").attr({
                            class: "smart-basket__product-quantity"
                        }),
                        f = t("<input>").attr({
                            class: "smart-basket__input",
                            type: "hidden"
                        }),
                        k = t("<button>").attr({
                            class: "smart-basket__add-item"
                        }).html("+"),
                        v = t("<button>").attr({
                            class: "smart-basket__remove-item"
                        }).html("-"),
                        b = t("<input>").attr({
                            class: "smart-basket__product-quantity-state",
                            type: "number",
                            min: "1",
                            step: "1",
                            pattern: "^[0-9]"
                        });
                    a.productQuantityWrapper || (k.attr({
                        disabled: "disabled"
                    }), v.attr({
                        disabled: "disabled"
                    }), b.attr({
                        disabled: "disabled"
                    })), m.append(v).append(b).append(k);
                    var h = t("<div>").attr({
                            class: "smart-basket__product-price"
                        }),
                        _ = t("<input>").attr({
                            class: "smart-basket__input",
                            type: "hidden"
                        }),
                        y = t("<div>").attr({
                            class: "smart-basket__product-price-common"
                        }),
                        g = t("<input>").attr({
                            class: "smart-basket__input"
                        }),
                        P = e.deleteProducts(s, o);
                    for (var S in s[n]) {
                        if ("sbId" === S && (i.html(s[n][S]), c.val(s[n][S]), l.attr({
                                name: s[n][S] + "[productName]"
                            }), u.attr({
                                name: s[n][S] + "[productSize]"
                            }), c.attr({
                                name: s[n][S] + "[productId]"
                            }), f.attr({
                                name: s[n][S] + "[productQuantity]"
                            }), b.attr({
                                "data-sb-id": s[n][S]
                            }), k.attr({
                                "data-sb-id": s[n][S]
                            }), v.attr({
                                "data-sb-id": s[n][S]
                            }), _.attr({
                                name: s[n][S] + "[productPrice]"
                            }), g.attr({
                                name: s[n][S] + "[productPriceCommon]"
                            }), d.attr({
                                name: s[n][S] + "[productImg]"
                            }), P.attr({
                                "data-sb-product-delete": s[n][S]
                            })), "sbImg" === S) {
                            var M = t("<img>").attr({
                                src: s[n][S],
                                width: 60
                            });
                            d.val(s[n][S]), p.append(M)
                        }
                        if ("sbName" === S && (p.append("<span>".concat(s[n][S], "</span>.")), l.val(s[n][S])), "sbSize" === S && void 0 !== s[n][S] && (p.children("span").append('<span class="smart-basket__product-size"> Размер: '.concat(s[n][S], "</span>")), u.val(s[n][S])), "sbPrice" === S && (h.html(s[n][S]), _.val(s[n][S])), "sbPriceCommon" === S) {
                            var C = +s[n][S];
                            g.val(+C.toFixed(2))
                        }
                        "sbQuantity" === S && (b.val(s[n][S]), f.val(s[n][S]))
                    }
                    v.click(function(a) {
                        a.preventDefault();
                        var r = t(this).data("sbId"),
                            n = +b.val(),
                            o = +_.val(),
                            i = o * n;
                        n > 1 && (n--, i = o * n, f.val(n), e.updateBasket(s, r, n, i), e.getSmartBasketMinState(s, "updateSmartBasketMin"), e.commonResult(s, "updateCommonResult")), _.val(o), g.val(+i.toFixed(2)), b.val(n)
                    }), k.click(function(a) {
                        a.preventDefault();
                        var r = t(this).data("sbId"),
                            n = +b.val(),
                            o = +_.val(),
                            i = o * n;
                        n >= 1 ? (n++, i = o * n, f.val(n), e.updateBasket(s, r, n, i), e.getSmartBasketMinState(s, "updateSmartBasketMin"), e.commonResult(s, "updateCommonResult")) : n = 1, _.val(o), g.val(+i.toFixed(2)), b.val(n)
                    }), i.append(c), p.append(d), p.append(l), p.append(u), m.append(f), h.append(_), y.append(g), r.append(o.append(p).append(i).append(h).append(m).append(y).append(P))
                };
                for (var v in s) k(v);
                return r.append(e.commonResult(s)), r.append(e.userForm()), r
            },
            stateBasket: function() {
                var s = e.getProducts() || {},
                    r = t("<div>").attr({
                        class: "smart-basket"
                    }),
                    n = t("." + a.buttonAddToBasket);
                localStorage.getItem(a.localStorageName), r.append(e.showProducts(s));
                var o, i, c, p;
                if (a.productQuantityWrapper) {
                    var l = t("<div>").attr({
                            class: "smart-basket__quantity-item"
                        }),
                        u = t("<button>").attr({
                            class: "smart-basket__add-item"
                        }).html("+"),
                        d = t("<button>").attr({
                            class: "smart-basket__remove-item"
                        }).html("-");
                    o = t("<input>").attr({
                        class: "smart-basket__product-quantity-state",
                        min: "1",
                        step: "1",
                        pattern: "^[0-9]",
                        value: "1"
                    }), l.append(d).append(o).append(u), u.click(function(e) {
                        e.preventDefault(), i = t(this).parents("." + a.productElement).find("." + o.attr("class")), c = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket), p = +t(this).parents("." + a.productElement).find("." + o.attr("class")).val(), p >= 1 ? (p++, i.val(p), c.attr("data-sb-product-quantity", p)) : (i.val(1), c.attr("data-sb-product-quantity", 1))
                    }), d.click(function(e) {
                        e.preventDefault(), i = t(this).parents("." + a.productElement).find("." + o.attr("class")), c = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket), p = +t(this).parents("." + a.productElement).find("." + o.attr("class")).val(), p > 1 ? (p--, i.val(p), c.attr("data-sb-product-quantity", p)) : (i.val(1), c.attr("data-sb-product-quantity", 1))
                    }), t("." + a.productQuantityWrapper).append(l)
                }
                if (a.productSize && a.productPrice) {
                    var m = t("." + a.productSize);
                    t("." + a.productPrice);
                    t("." + a.productElement).find("." + a.productSize + ":first-child").addClass(a.productSize + "_active"), m.click(function(e) {
                        e.preventDefault(), t(this).parents("." + a.productElement).find("." + a.productSize).removeClass(a.productSize + "_active"), t(this).addClass(a.productSize + "_active");
                        var s = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket),
                            r = t(this).parents("." + a.productElement).find("." + a.productPrice),
                            n = t(this).data("sbCurentSize"),
                            o = t(this).data("sbCurentPrice");
                        s.attr("data-sb-product-price", o), s.attr("data-sb-product-size", n), r.html(o)
                    })
                } else condole.log("Заполните параметры productSize и productPrice");
                return e.getSmartBasketMinState(s), n.click(function() {
                    var s = this,
                        n = e.getProducts() || {},
                        i = t(this).data("sbIdOrVendorCode");
                    if (void 0 !== n[i]) {
                        var c = t(this).html();
                        return t(this).html("Товар уже в корзине"), setTimeout(function() {
                            t(s).html(c)
                        }, 1500), !1
                    }
                    var p = {};
                    p.sbId = i, p.sbImg = t(this).data("sbProductImg"), p.sbName = t(this).data("sbProductName"), a.productSize && a.productPrice && (p.sbSize = t(this).data("sbProductSize")), a.productQuantityWrapper ? p.sbQuantity = t(this).parents("." + a.productElement).find("." + o.attr("class")).val() : p.sbQuantity = +t(this).data("sbProductQuantity"), p.sbPrice = t(this).data("sbProductPrice").toFixed(2), a.productQuantityWrapper ? p.sbPriceCommon = +t(this).data("sbProductPrice").toFixed(2) * t(this).parents("." + a.productElement).find("." + o.attr("class")).val() : p.sbPriceCommon = +t(this).data("sbProductPrice").toFixed(2) * +t(this).data("sbProductQuantity"), n[i] = p, e.setProducts(n), r.empty(), r.append(e.showProducts(n)), e.getSmartBasketMinState(n, "updateSmartBasketMin"), e.commonResult(n, "updateCommonResult")
                }), r
            },
            commonResult: function(e, s, r) {
                var n = 0,
                    o = 0,
                    i = t("<div>").attr({
                        class: "smart-basket__empty-title"
                    }).html("Корзина пуста. Вы не добавили ни одного товара").fadeOut(),
                    c = t("<div>").attr({
                        class: "smart-basket__success-title"
                    }).html("Заказ принят. Ожидайте звонка").css("display", "none"),
                    p = t("<div>").attr({
                        class: "smart-basket__result-common"
                    }),
                    l = t("<div>").attr({
                        class: "smart-basket__price-common"
                    }),
                    u = t("<div>").attr({
                        class: "smart-basket__quantity-common"
                    });
                for (var d in e)
                    for (var m in e[d]) "sbQuantity" === m && (n += +e[d][m]), "sbPriceCommon" === m && (o += +e[d][m]);
                if (0 == +n ? i.fadeIn() : i.fadeOut(), r) t("." + c.attr("class")).css("display", "block"), setTimeout(function() {
                    t("." + c.attr("class")).css("display", "none"), t("." + i.attr("class")).css("display", "block")
                }, 3e3);
                else {
                    if (!s) return u.html("<span>Всего товаров: </span> ".concat(n)), l.html("<span>Общая стоимость: </span> ".concat(o.toFixed(2), " ").concat(a.smartBasketCurrency)), p.append(i).append(c).append(u).append(l), p;
                    0 == +n && t("." + i.attr("class")).css("display", "block"), t("." + u.attr("class")).html("<span>Всего товаров: </span> "), t("." + u.attr("class")).html("<span>Всего товаров: </span> ".concat(n)), t("." + l.attr("class")).html("<span>Общая стоимость: </span> "), t("." + l.attr("class")).html("<span>Общая стоимость: </span> ".concat(o.toFixed(2), " ").concat(a.smartBasketCurrency))
                }
            },
            getSmartBasketMinState: function(s, r) {
                var n = 0;
                for (var o in s)
                    for (var i in s[o]) "sbQuantity" === i && (n += +s[o][i]);
                var c = t("<button>").attr({
                        class: "smart-basket__min"
                    }),
                    p = t("<img>").attr({
                        class: "smart-basket__min-icon",
                        src: a.smartBasketMinIconPath,
                        width: 18,
                        alt: "Корзина"
                    }),
                    l = t("<span>").attr({
                        class: "smart-basket__min-count"
                    });
                r ? (t("." + l.attr("class")).html(""), t("." + l.attr("class")).html(n)) : (l.html(n), t("." + a.smartBasketMinArea).append(c.append(p).append(l))), e.getModalBasket(c, s)
            },
            updateBasket: function(t, a, s, r) {
                var n = 0,
                    o = 0;
                for (var i in t) {
                    if (i === a) {
                        var c = 0,
                            p = {};
                        for (var l in t[i]) p.sbId = t[i].sbId, p.sbImg = t[i].sbImg, p.sbName = t[i].sbName, p.sbSize = t[i].sbSize, p.sbPrice = t[i].sbPrice, "sbPriceCommon" == l && (p.sbPriceCommon = r.toFixed(2)), "sbQuantity" == l && (p.sbQuantity = s, c += s);
                        t[a] = p, e.setProducts(t)
                    }
                    for (var u in t[i]) "sbQuantity" === u && (n += t[i][u]), "sbPriceCommon" === u && (o += +t[i][u])
                }
            },
            userForm: function() {
                var s = t("<div>").attr({
                        class: "smart-basket__user-form"
                    }),
                    r = t("<div>").attr({
                        class: "smart-basket__user-info"
                    }),
                    n = t("<div>").attr({
                        class: "smart-basket__input-wrapper"
                    }),
                    o = t("<input>").attr({
                        class: "smart-basket__user-input",
                        type: "text",
                        placeholder: "Введите имя",
                        name: "userName",
                        required: !0
                    });
                n.append(o);
                var ss = t("<div>").attr({
                        class: "smart-basket__user-form"
                    }),
                    rr = t("<div>").attr({
                        class: "smart-basket__user-info"
                    }),
                    nn = t("<div>").attr({
                        class: "smart-basket__input-wrapper"
                    }),
                    oo = t("<input>").attr({
                        class: "smart-basket__user-input",
                        type: "text",
                        placeholder: "Введите улицу",
                        name: "userStr",
                        required: !0
                    });
                nn.append(oo);
                var sss = t("<div>").attr({
                        class: "smart-basket__user-form"
                    }),
                    rrr = t("<div>").attr({
                        class: "smart-basket__user-info"
                    }),
                    nnn = t("<div>").attr({
                        class: "smart-basket__input-wrapper"
                    }),
                    ooo = t("<input>").attr({
                        class: "smart-basket__user-input",
                        type: "text",
                        placeholder: "Номер дома",
                        name: "userHou",
                        required: !0
                    });
                nnn.append(ooo);
                var ssss = t("<div>").attr({
                        class: "smart-basket__user-form"
                    }),
                    rrrr = t("<div>").attr({
                        class: "smart-basket__user-info"
                    }),
                    nnnn = t("<div>").attr({
                        class: "smart-basket__input-wrapper"
                    }),
                    oooo = t("<input>").attr({
                        class: "smart-basket__user-input",
                        type: "text",
                        placeholder: "Номер квартиры",
                        name: "userApa",
                        required: !0
                    });
                nnnn.append(oooo);
                var sssss = t("<div>").attr({
                        class: "smart-basket__user-form"
                    }),
                    rrrrr = t("<div>").attr({
                        class: "smart-basket__user-info"
                    }),
                    nnnnn = t("<div>").attr({
                        class: "smart-basket__input-wrapper"
                    }),
                    ooooo = t("<input>").attr({
                        class: "smart-basket__user-input",
                        type: "text",
                        placeholder: "Комментарий к заказу",
                        name: "userCom",
                        required: !0
                    });
                nnnnn.append(ooooo);
                var i = t("<div>").attr({
                        class: "smart-basket__input-wrapper"
                    }),
                    c = t("<input>").attr({
                        class: "smart-basket__user-input",
                        type: "tel",
                        placeholder: "Введите телефон",
                        name: "userTel",
                        required: !0
                    }).mask(a.countryCode + "(000)000-00-00");
                i.append(c);
                var p = t("<button>").attr({
                    class: "smart-basket__close-form"
                }).html("Продолжить покупки");
                e.closeModalBasket(p);
                var l = t("<button>").attr({
                        class: "smart-basket__send-form",
                        form: "smart-basket__form",
                        type: "submit"
                    }).html("Сделать заказ"),
                    u = t("<div>").attr({
                        class: "smart-basket__footer"
                    });
                r.append(nn).append(n), r.append(nnn).append(n), r.append(nnnn).append(n), r.append(nnnnn).append(n), r.append(n).append(i), u.append(p).append(l), s.append(r).append(u),  l.click(function(t) {
                    function a(t) {
                        for (var a in t) return !1;
                        return !0
                    }
                    t.preventDefault();
                    var s = e.getProducts() || {};
                    if ("" === c.val() || "" === o.val() || a(s)) return "" === c.val() && c.parent().addClass("smart-basket__input-wrapper_error"), "" === o.val() && o.parent().addClass("smart-basket__input-wrapper_error"), !1;
                    e.sendCart()
                });
                var d = function(a) {
                    a.focus(function() {
                        t(this).parent().addClass("smart-basket__input-wrapper_focus")
                    }), a.blur(function() {
                        t(this).parent().removeClass("smart-basket__input-wrapper_focus"), "" === this.value && t(this).parent().addClass("smart-basket__input-wrapper_error")
                    }), a.parent().on("input", function() {
                        t(this).removeClass("smart-basket__input-wrapper_error")
                    }), a.change(function() {
                        t(this).parent().removeClass("smart-basket__input-wrapper_error"), t(this).parent().addClass("smart-basket__input-wrapper_focus")
                    })
                };
                return d(c), d(o), s
            },
            getModalBasket: function(a, s) {
                var r = t(".smart-basket__wrapper");
                e.commonResult(s, "updateCommonResult"), a.click(function() {
                    r.toggleClass("smart-basket__wrapper_active"), t("body").css("overflow", "hidden")
                })
            },
            closeModalBasket: function(a) {
                a.click(function(a) {
                    a.preventDefault(), t(".smart-basket__wrapper").toggleClass("smart-basket__wrapper_active"), t("body").css("overflow", "scroll")
                })
            },
            sendCart: function() {
                var a = t("#smart-basket__form")[0],
                    s = new FormData(a);
                t.ajax({
                    url: "/smartbasket/php/smartbasket.php",
                    type: "POST",
                    data: s,
                    processData: !1,
                    contentType: !1,
                    beforeSend: function() {},
                    success: function(t) {},
                    complete: function(a) {
                        t(".smart-basket__product-item:not(:first)").remove();
                        var s = e.getProducts() || {};
                        e.commonResult(s, "", "submitEvent"), localStorage.clear(), setTimeout(function() {
                            s = e.getProducts() || {}, e.commonResult(s, "updateCommonResult"), e.getSmartBasketMinState(s, "updateSmartBasketMin"), e.showProducts(s)
                        }, 3100)
                    }
                })
            },
            goodsInBasketAlert: function() {
                return t("<div>").attr({
                    class: "smart-basket__alert"
                })
            },
            init: function(s) {
                t.extend(a, s);
                return this.each(function() {
                    t(this).append(e.stateBasket())
                })
            }
        };
    t.fn.smbasket = function(a) {
        return e[a] ? e[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== _typeof(a) && a ? void t.error("Метод " + a + " не найден") : e.init.apply(this, arguments)
    }
}(jQuery);