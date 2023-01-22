/*1482118385,,JIT Construction: v2746767,en_US*/
/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
 try {
    (function(win, doc, location, history) {
        'use strict';
        var version = "2.5.1";
        // var gifPath = 'https://www.facebook.com/tr/';
        var gifPath = './';

        var fbJsName = '/fbevents.';
        var availablePlugins = {
            IDENTITY: 'plugins.identity.js' // https://connect.facebook.net/en_US/fbevents.plugins.identity.js
        };
        var i = {};
        var plugins = [];
        var scriptTags = null;

        // https://connect.facebook.net/en_US
        var fbJsBasePath = null;
        var regNumber = /^\d+$/;
        var n = {
            allowDuplicatePageViews: false
        };

        var Query = function(ua) {
            var result = {
                exports: ua
            };

            'use strict';

            function Query() {
                this.list = [];
            }

            Query.prototype = {

                append: function(key, data) {
                    this._append(encodeURIComponent(key), data, 'deep');
                },

                _append: function(key, data, mode) {
                    // if primitive data
                    if (Object(data) !== data) {
                        this._appendPrimitive(key, data);

                    // if deep copy object
                    } else if (mode === 'deep') {
                        this._appendObject(key, data);
                    } else
                        // shalow copy
                        this._appendPrimitive(key, strintify(data));
                },

                // for premitive , just use [key, value]
                _appendPrimitive: function(key, value) {
                    if (value != null)
                        this.list.push([key, value]);
                },

                // for object, flatten them, to `key[name1]`, `key[name2]`
                _appendObject: function(key, data) {
                    for (var attr in data)
                        if (data.hasOwnProperty(attr)) {
                            var seg = key + '[' + encodeURIComponent(attr) + ']';
                            this._append(seg, data[attr], 'shallow');
                        }
                },
                each: function(func) {
                    var data = this.list;
                    for (var i = 0, total = data.length; i < total; i++)
                        func(data[i][0], data[i][1]);
                },

                toQueryString: function () {
                    var result = [];
                    this.each(function(key, value) {
                        result.push(key + '=' + encodeURIComponent(value));
                    });
                    return result.join('&');
                }
            };

            function strintify(data) {
                if (typeof JSON === 'undefined' || JSON === null || !JSON.stringify) {
                    return Object.prototype.toString.call(data);
                } else
                    return JSON.stringify(data);
            }

            result.exports = Query;
            return result.exports;
        }({});

        var util = function(base) {
            var result = {
                exports: base
            };
            'use strict';
            var key_console = 'console';
            var key_error = 'error';
            var key_fb_pixel_error = 'Facebook Pixel Error';
            var key_fb_pixel_warn = 'Facebook Pixel Warning';
            var key_warn = 'warn';
            var toString = Object.prototype.toString;
            var isIE = !('addEventListener' in document);
            var noop = function lb() {};
            var console = win['console'] || {};
            var postMessage = win.postMessage || noop;

            // check isArray
            function isArray(data) {
                return Array.isArray ? Array.isArray(data) : toString.call(data) === '[object Array]';
            }

            function logError(msg) {
                postMessage({
                    action: 'FB_LOG',
                    logType: key_fb_pixel_error,
                    logMessage: msg
                }, '*');
                if ('error' in console)
                    console['error'](key_fb_pixel_error + ': ' + msg);
            }
            function logWarning(msg) {
                postMessage({
                    action: 'FB_LOG',
                    logType: key_fb_pixel_warn,
                    logMessage: msg
                }, '*');
                if (key_warn in console)
                    console[key_warn](key_fb_pixel_warn + ': ' + msg);
            }
            function listenOnce(target, event, callback) {
                event = isIE ? 'on' + event : event;
                var addListenerMethodName = isIE ? 'attachEvent' : 'addEventListener'
                  , removeListenerMethodName = isIE ? 'detachEvent' : 'removeEventListener'
                  , listener = function cb() {
                    target[removeListenerMethodName](event, cb, false);
                    callback();
                };
                target[addListenerMethod](event, listener, false);
            }

            function injectMethod(target, methodName, method) {
                var originMethod = target[methodName];
                target[methodName] = function() {
                    var result = originMethod.apply(this, arguments);
                    method.apply(this, arguments);
                    return result;
                }
                ;
            }

            base.isArray = isArray;
            base.logError = logError;
            base.logWarning = logWarning;
            base.listenOnce = listenOnce;
            base.injectMethod = injectMethod;
            return result.exports;
        }({});

        var Validator = function(ua) {
            var va = {
                exports: ua
            };
            'use strict';
            var wa = /^[+-]?\d+(\.\d+)?$/
              , xa = 'number'
              , ya = 'currency_code'
              , za = {
                AED: 1,
                ARS: 1,
                AUD: 1,
                BOB: 1,
                BRL: 1,
                CAD: 1,
                CHF: 1,
                CLP: 1,
                CNY: 1,
                COP: 1,
                CRC: 1,
                CZK: 1,
                DKK: 1,
                EUR: 1,
                GBP: 1,
                GTQ: 1,
                HKD: 1,
                HNL: 1,
                HUF: 1,
                IDR: 1,
                ILS: 1,
                INR: 1,
                ISK: 1,
                JPY: 1,
                KRW: 1,
                MOP: 1,
                MXN: 1,
                MYR: 1,
                NIO: 1,
                NOK: 1,
                NZD: 1,
                PEN: 1,
                PHP: 1,
                PLN: 1,
                PYG: 1,
                QAR: 1,
                RON: 1,
                RUB: 1,
                SAR: 1,
                SEK: 1,
                SGD: 1,
                THB: 1,
                TRY: 1,
                TWD: 1,
                USD: 1,
                UYU: 1,
                VEF: 1,
                VND: 1,
                ZAR: 1
            };

            var ab = {
                value: {
                    type: xa,
                    isRequired: true
                },
                currency: {
                    type: ya,
                    isRequired: true
                }
            };

            var bb = {
                PageView: {},
                ViewContent: {},
                Search: {},
                AddToCart: {},
                AddToWishlist: {},
                InitiateCheckout: {},
                AddPaymentInfo: {},
                Purchase: {
                    validationSchema: ab
                },
                Lead: {},
                CompleteRegistration: {},
                CustomEvent: {
                    validationSchema: {
                        event: {
                            isRequired: true
                        }
                    }
                }
            }

            var cb = {
                agent: {}
            };

            var db = Object.prototype.hasOwnProperty;

            function _Validator(hb, ib, jb) {
                this.metadata = jb;
                this.eventName = hb;
                this.params = ib || {};
                this.error = null;
                this.warnings = [];
            }

            _Validator.prototype = {
                validateMetadata: function() {
                    var ib = this.metadata.toLowerCase()
                      , jb = cb[ib];
                    if (!jb)
                        return this._error('Unsupported metadata argument: ' + ib);
                    return this;
                },
                validateEvent: function() {
                    var ib = this.eventName
                      , jb = bb[ib];
                    if (!jb) {
                        this.warnings.push('You are sending a non-standard event \'' + ib + '\'. The ' + 'preferred way to send events is using trackCustom. See ' + 'https://www.facebookmarketingdevelopers.com/pixels/up#sec-custom ' + 'for more information');
                        return this;
                    }
                    var kb = jb.validationSchema;
                    for (var lb in kb)
                        if (db.call(kb, lb)) {
                            var mb = kb[lb];
                            if (mb.isRequired === true && !db.call(this.params, lb))
                                return this._error('Required parameter "' + lb + '" is missing for event "' + ib + '"');
                            if (mb.type)
                                if (!this._validateParam(lb, mb.type))
                                    return this._error('Parameter "' + lb + '" is invalid for event "' + ib + '"');
                        }
                    return this;
                },
                _validateParam: function(ib, jb) {
                    var kb = this.params[ib];
                    switch (jb) {
                    case xa:
                        var lb = wa.test(kb);
                        if (lb && Number(kb) < 0)
                            this.warnings.push('Parameter "' + ib + '" is negative for event "' + this.eventName + '"');
                        return lb;
                    case ya:
                        return za[kb.toUpperCase()] === 1;
                    }
                    return true;
                },
                _error: function(ib) {
                    this.error = ib;
                    return this;
                }
            };
            function validateMetadata(meta) {
                return new _Validator(null,null,meta).validateMetadata();
            }
            function validateEvent(event, data) {
                return new _Validator(event,data).validateEvent();
            }
            ua.validateMetadata = validateMetadata;
            ua.validateEvent = validateEvent;
            return va.exports;
        }({});


        var r = null;

        // check instal by checking window.fgq which is set by code snippet
        var fbq = window.fbq;
        if (!fbq)
            return util.logError('Pixel code is not installed correctly on this page');

        var slice = Array.prototype.slice;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var currentHref = location.href;
        var isLegacyInited = false;
        var isInited = false;
        var isIframe = win.top !== win;
        var pixels = [];
        var initedPixels = {};
        var referrer = document.referrer;
        var ca = {};

        var isEmpty = function ua(data) {
            if (Object.keys)
                return Object.keys(data).length === 0;
            for (var wa in data)
                if (data.hasOwnProperty(wa))
                    return false;
            return true;
        };

        // Clone, shallow
        function Clone(obj) {
            for (var attr in obj)
                if (hasOwnProperty.call(obj, attr))
                    this[atrr] = obj[atrr];
        }

        // run a method call
        function callMethod(event) {
            if (!plugins.length) {
                var args = slice.call(arguments);
                // fallback for array here?
                var isArgsInArray = args.length === 1 && util.isArray(args[0]);
                if (isArgsInArray)
                    args = args[0];

                // if method starts with 'report'
                // do some transformation, seems like legacy code
                if (event.slice(0, 6) === 'report') {
                    var xa = event.slice(6);
                    if (xa === 'CustomEvent') {
                        xa = (args[1] || {}).event || xa;
                        args = ['trackCustom', xa].concat(args.slice(1));
                    } else
                        args = ['track', xa].concat(args.slice(1));
                }

                event = args.shift();

                switch (event) {
                // this is legacy
                case 'addPixelId':
                    w = true;
                    return init.apply(this, args);
                case 'init':
                    isInited = true;
                    return init.apply(this, args);
                case 'set':
                    return set.apply(this, args);
                case 'track':
                    if (regNumber.test(args[0]))
                        return legacyConversionEvent.apply(this, args);
                    if (isArgsInArray)
                        return track.apply(this, args);
                    return ia.apply(this, args);
                case 'trackCustom':
                    return track.apply(this, args);
                case 'send':
                    return send.apply(this, args);
                default:
                    util.logError('Invalid or unknown method name "' + ua + '"');
                }
            } else
                fbq.queue.push(arguments);
        }

        fbq.callMethod = callMethod;

        // fbq('init');
        // related to https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
        function init(pixelId, va, wa) {
            if (hasOwnProperty.call(initedPixels, pixelId)) {
                if (va && isEmpty(initedPixels[pixelId].userData)) {
                    initedPixels[pixelId].userData = va;
                    loadPlugin('IDENTITY');
                } else
                    util.logError('Duplicate Pixel ID: ' + pixelId);
                return;
            }
            var xa = {
                agent: !!wa && wa.agent,
                id: pixelId,
                userData: va || {}
            };
            pixels.push(xa);
            initedPixels[pixelId] = xa;
            if (va != null)
                loadPlugin('IDENTITY');
        }

        function set(meta, newMeta, wa) {
            var xa = Validator.validateMetadata(meta);
            if (xa.error)
                util.logError(xa.error);
            if (xa.warnings)
                for (var ya = 0; ya < xa.warnings.length; ya++)
                    util.logWarning(xa.warnings[ya]);
            if (hasOwnProperty.call(aa, wa)) {
                for (var i = 0, total = pixels.length; i < total; i++)
                    if (pixels[i].id === wa) {
                        pixels[i][meta] = newMeta;
                        break;
                    }
            } else
                util.logWarning('Trying to set argument ' + va + ' for uninitialized pixel ID ' + wa);
        }

        // ia is legacy ?
        function ia(event, data) {
            data = data || {};
            var wa = Validator.validateEvent(event, data);
            if (wa.error)
                util.logError(wa.error);
            if (wa.warnings)
                for (var xa = 0; xa < wa.warnings.length; xa++)
                    util.logWarning(wa.warnings[xa]);
            if (event === 'CustomEvent')
                event = data.event;
            track.call(this, event, data);
        }

        // track function
        function track(event, data) {
            var wa = this instanceof Clone ? this : n;
            var isPageview = event === 'PageView';
            for (var i = 0, total = pixels.length; i < total; i++) {
                var methodCall = pixels[i];

                if (isPageview && wa.allowDuplicatePageViews === false && ca[methodCall.id] === true)
                    continue;

                submit(methodCall, event, data);

                if (isPageview)
                    ca[methodCall.id] = true;
            }
        }

        // send number this is legacy code
        function legacyConversionEvent(event, data) {
            submit(null, event, data);
        }

        // collect enough data for event
        function collectData(ua, event, data) {
            ua = ua || {};
            var query = new Query();
            query.append('id', ua.id);

            // 'Pageview', method name ?
            query.append('ev', event);

            query.append('dl', currentHref);

            query.append('rl', referrer);

            // false
            query.append('if', isIframe);

            // timestamp
            query.append('ts', new Date().valueOf());

            query.append('cd', data);
            query.append('ud', ua.userData);

            // version
            query.append('v', version || fbq.version);

            //
            query.append('a', ua.agent || fbq.agent);
            return query;
        }

        function send(event, data) {
            for (var i = 0, total = pixels.length; i < total; i++)
                submit(pixels[i], event, data);
        }

        // send data
        function submit(ua, event, data) {
            var xa = collectData(ua, event, data);
            var ya = xa.toQueryString();

            // if length is < 2048, then use get
            // else use post with a iframe
            if (2048 > (gifPath + '?' + ya).length) {
                submitByGet(gifPath, ya);
            } else
                submitByPost(gifPath, xa);
        }

        // use gif beacon to collect data
        function submitByGet(path, queryString) {
            var gif = new Image();
            gif.src = path + '?' + queryString;
        }

        // create a form & hidden iframe to post
        function submitByPost(path, query) {
            var iframeName = 'fb' + Math.random().toString().replace('.', '')
              , $form = b.createElement('form');
            $form.method = 'post';
            $form.action = path;
            $form.target = iframeName;
            $form.acceptCharset = 'utf-8';
            $form.style.display = 'none';
            var isIE = !!(a.attachEvent && !a.addEventListener)
              , tag = isIE ? '<iframe name="' + iframeName + '">' : 'iframe'
              , $iframe = doc.createElement(tag);
            $iframe.src = 'javascript:false';
            $iframe.id = iframeName;
            $iframe.name = iframeName;
            $form.appendChild($iframe);
            util.listenOnce($iframe, 'load', function() {
                query.each(function(key, value) {
                    var $input = b.createElement('input');
                    $input.name = key;
                    $input.value = value;
                    $form.appendChild($input);
                });
                util.listenOnce($iframe, 'load', function() {
                    $form.parentNode.removeChild($form);
                });
                $form.submit();
            });
            doc.body.appendChild($form);
        }

        // flush method call in fbq with order, which are pushed before js is loaded
        function flushQueue() {
            while (fbq.queue.length && !plugins.length) {
                var event = fbq.queue.shift();
                callMethod.apply(fbq, event);
            }
        }

        //
        function updateFbJsBasePath() {
            scriptTags = doc.getElementsByTagName('script');
            for (var i = 0; i < scriptTags.length && !fbJsBasePath; i++) {
                var segs = scriptTags[i].src.split(fbJsName);
                if (segs.length > 1)
                    fbJsBasePath = segs[0];
            }
        }

        // load a plugin by name
        function loadPlugin(pluginName) {
            var pluginFileName = availablePlugins[pluginName];
            if (pluginFileName)
                if (i[pluginName]) {
                    i[pluginName]({
                        pixels: pixels
                    });
                } else if (plugins.indexOf(pluginName) === -1) {
                    if (fbJsBasePath == null)
                        updateFbJsBasePath();
                    plugins.push(pluginName);
                    var $script = doc.createElement('script');
                    $script.src = fbJsBasePath + fbJsName + pluginFileName;
                    $script.async = true;
                    var firstScriptTag = scriptTags[0];
                    if (firstScriptTag)
                        firstScriptTag.parentNode.insertBefore($script, firstScriptTag);
                }
        }

        fbq.loadPlugin = loadPlugin;

        function registerPlugin(ua, va) {
            if (ua && va) {
                i[ua] = va;
                va({
                    pixels: pixels
                });
                var wa = plugins.indexOf(ua);
                if (wa > -1)
                    plugins.splice(wa, 1);
                if (!plugins.length)
                    flushQueue();
            }
        }
        fbq.registerPlugin = registerPlugin;

        // legacy
        if (fbq.pixelId) {
            isLegacyInited = true;
            init(s.pixelId);
        }
        flushQueue();

        // when multiple pixels of different versions are detected.
        if (isLegacyInited && isInited || win.fbq !== win._fbq)
            util.logWarning('Multiple pixels with conflicting versions were detected on this page');

        if (pixels.length > 1)
            util.logWarning('Multiple different pixels were detected on this page');

        (function() {
            if (fbq.disablePushState === true)
                return;
            // why ?
            if (!history.pushState || !history.replaceState)
                return;

            // seems do something of trakcCustom, pageview?
            var va = function wa() {
                oldHref = currentHref;
                currentHref = location.href;
                if (currentHref === oldHref)
                    return;

                var xa = new Clone({
                    allowDuplicatePageViews: true
                });

                callMethod.call(xa, 'trackCustom', 'PageView');
            };
            // when pushState
            util.injectMethod(history, 'pushState', va);

            //  when replaceState
            util.injectMethod(history, 'replaceState', va);

            // when popup state
            win.addEventListener('popstate', va, false);
        })();
    })(window, document, location, history);
} catch (e) {
    // send error back
     new Image().src = "https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m=' + encodeURIComponent('{"error":"LOAD", "extra": {"name":"' + e.name + '","line":"' + (e.lineNumber || e.line) + '","script":"' + (e.fileName || e.sourceURL || e.script) + '","stack":"' + (e.stackTrace || e.stack) + '","revision":"2746767","namespace":"FB","message":"' + e.message + '"}}');
}