/*
Product Name: dhtmlxMenu 
Version: 4.0.3 
Edition: Standard 
License: content of this file is covered by GPL. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
 */

if (typeof (window.dhx4) == "undefined") {
	window.dhx4 = {
		version : "4.0.3",
		skin : null,
		skinDetect : function(b) {
			var c = document.createElement("DIV");
			c.className = b + "_skin_detect";
			if (document.body.firstChild) {
				document.body.insertBefore(c, document.body.firstChild)
			} else {
				document.body.appendChild(c)
			}
			var a = c.offsetWidth;
			c.parentNode.removeChild(c);
			c = null;
			return {
				10 : "dhx_skyblue",
				20 : "dhx_web",
				30 : "dhx_terrace"
			}[a] || null
		},
		lastId : 1,
		newId : function() {
			return this.lastId++
		},
		zim : {
			data : {},
			step : 5,
			first : function() {
				return 100
			},
			last : function() {
				var c = this.first();
				for ( var b in this.data) {
					c = Math.max(c, this.data[b])
				}
				return c
			},
			reserve : function(a) {
				this.data[a] = this.last() + this.step;
				return this.data[a]
			},
			clear : function(a) {
				if (this.data[a] != null) {
					this.data[a] = null;
					delete this.data[a]
				}
			}
		},
		s2b : function(a) {
			return (a == true || a == 1 || a == "true" || a == "1"
					|| a == "yes" || a == "y")
		},
		trim : function(a) {
			return String(a).replace(/^\s{1,}/, "").replace(/\s{1,}$/, "")
		},
		template : function(b, c, a) {
			return b.replace(/#([a-zA-Z0-9_-]{1,})#/g, function(e, d) {
				if (d.length > 0 && typeof (c[d]) != "undefined") {
					if (a == true) {
						return window.dhx4.trim(c[d])
					}
					return String(c[d])
				}
				return ""
			})
		},
		absLeft : function(a) {
			if (typeof (a) == "string") {
				a = document.getElementById(a)
			}
			return this._aOfs(a).left
		},
		absTop : function(a) {
			if (typeof (a) == "string") {
				a = document.getElementById(a)
			}
			return this._aOfs(a).top
		},
		_aOfsSum : function(a) {
			var c = 0, b = 0;
			while (a) {
				c = c + parseInt(a.offsetTop);
				b = b + parseInt(a.offsetLeft);
				a = a.offsetParent
			}
			return {
				top : c,
				left : b
			}
		},
		_aOfsRect : function(d) {
			var g = d.getBoundingClientRect();
			var h = document.body;
			var b = document.documentElement;
			var a = window.pageYOffset || b.scrollTop || h.scrollTop;
			var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
			var f = b.clientTop || h.clientTop || 0;
			var i = b.clientLeft || h.clientLeft || 0;
			var j = g.top + a - f;
			var c = g.left + e - i;
			return {
				top : Math.round(j),
				left : Math.round(c)
			}
		},
		_aOfs : function(a) {
			if (a.getBoundingClientRect) {
				return this._aOfsRect(a)
			} else {
				return this._aOfsSum(a)
			}
		},
		_isObj : function(a) {
			return (a != null && typeof (a) == "object" && typeof (a.length) == "undefined")
		},
		_copyObj : function(d) {
			if (this._isObj(d)) {
				var c = {};
				for ( var b in d) {
					if (typeof (d[b]) == "object" && d[b] != null) {
						c[b] = this._copyObj(d[b])
					} else {
						c[b] = d[b]
					}
				}
			} else {
				var c = [];
				for (var b = 0; b < d.length; b++) {
					if (typeof (d[b]) == "object" && d[b] != null) {
						c[b] = this._copyObj(d[b])
					} else {
						c[b] = d[b]
					}
				}
			}
			return c
		},
		screenDim : function() {
			var a = (navigator.userAgent.indexOf("MSIE") >= 0);
			var b = {};
			b.left = document.body.scrollLeft;
			b.right = b.left + (window.innerWidth || document.body.clientWidth);
			b.top = Math.max((a ? document.documentElement : document
					.getElementsByTagName("html")[0]).scrollTop,
					document.body.scrollTop);
			b.bottom = b.top
					+ (a ? Math.max(document.documentElement.clientHeight || 0,
							document.documentElement.offsetHeight || 0)
							: window.innerHeight);
			return b
		},
		selectTextRange : function(d, g, b) {
			d = (typeof (d) == "string" ? document.getElementById(d) : d);
			var a = d.value.length;
			g = Math.max(Math.min(g, a), 0);
			b = Math.min(b, a);
			if (d.setSelectionRange) {
				try {
					d.setSelectionRange(g, b)
				} catch (f) {
				}
			} else {
				if (d.createTextRange) {
					var c = d.createTextRange();
					c.moveStart("character", g);
					c.moveEnd("character", b - a);
					try {
						c.select()
					} catch (f) {
					}
				}
			}
		},
		transData : null,
		transDetect : function() {
			if (this.transData == null) {
				this.transData = {
					transProp : false,
					transEv : null
				};
				var c = {
					MozTransition : "transitionend",
					WebkitTransition : "webkitTransitionEnd",
					OTransition : "oTransitionEnd",
					msTransition : "transitionend",
					transition : "transitionend"
				};
				for ( var b in c) {
					if (this.transData.transProp == false
							&& document.documentElement.style[b] != null) {
						this.transData.transProp = b;
						this.transData.transEv = c[b]
					}
				}
				c = null
			}
			return this.transData
		}
	};
	window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent
			.indexOf("Trident") >= 0);
	window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent
			.indexOf("MSIE") >= 0);
	window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent
			.indexOf("Trident") < 0);
	window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
	window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0);
	window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent
			.indexOf("Konqueror") >= 0);
	window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
	window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0)
}
if (typeof (window.dhx4.ajax) == "undefined") {
	window.dhx4.ajax = {
		cache : false,
		method : "post",
		get : function(a, b) {
			this._call("GET", a, null, true, b)
		},
		getSync : function(a) {
			return this._call("GET", a, null, false)
		},
		post : function(b, a, c) {
			if (arguments.length == 1) {
				a = ""
			} else {
				if (arguments.length == 2
						&& (typeof (a) == "function" || typeof (window[a]) == "function")) {
					c = a;
					a = ""
				} else {
					a = String(a)
				}
			}
			this._call("POST", b, a, true, c)
		},
		postSync : function(b, a) {
			a = (a == null ? "" : String(a));
			return this._call("POST", b, a, false)
		},
		getLong : function(a, b) {
			this._call("GET", a, null, true, b, {
				url : a
			})
		},
		postLong : function(b, a, c) {
			if (arguments.length == 2
					&& (typeof (a) == "function" || typeof (window[a]))) {
				c = a;
				a = ""
			}
			this._call("POST", b, a, true, c, {
				url : b,
				postData : a
			})
		},
		_call : function(h, b, a, f, e, d) {
			var c = (window.XMLHttpRequest ? new XMLHttpRequest()
					: new ActiveXObject("Microsoft.XMLHTTP"));
			var g = (navigator.userAgent.match(/AppleWebKit/) != null
					&& navigator.userAgent.match(/Qt/) != null && navigator.userAgent
					.match(/Safari/) != null);
			if (f == true) {
				c.onreadystatechange = function() {
					if ((c.readyState == 4 && c.status == 200)
							|| (g == true && c.readyState == 3)) {
						window.setTimeout(function() {
							if (typeof (e) == "function") {
								e.apply(window, [ {
									xmlDoc : c
								} ])
							}
							if (d != null) {
								if (typeof (d.postData) != "undefined") {
									dhx4.ajax.postLong(d.url, d.postData, e)
								} else {
									dhx4.ajax.getLong(d.url, e)
								}
							}
							e = null;
							c = null
						}, 1)
					}
				}
			}
			if (h == "GET" && this.cache != true) {
				b += (b.indexOf("?") >= 0 ? "&" : "?") + "dhxr"
						+ new Date().getTime()
			}
			c.open(h, b, f);
			if (h == "POST") {
				c.setRequestHeader("Content-Type",
						"application/x-www-form-urlencoded");
				if (this.cache != true) {
					a += (a.length > 0 ? "&" : "") + "dhxr"
							+ new Date().getTime()
				}
			} else {
				a = null
			}
			c.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			c.send(a);
			if (!f) {
				return {
					xmlDoc : c
				}
			}
		}
	}
}
if (typeof (window.dhx4._enableDataLoading) == "undefined") {
	window.dhx4._enableDataLoading = function(obj, initObj, xmlToJson,
			xmlRootTag, mode) {
		if (mode == "clear") {
			for ( var a in obj._dhxdataload) {
				obj._dhxdataload[a] = null;
				delete obj._dhxdataload[a]
			}
			obj._loadData = null;
			obj._dhxdataload = null;
			obj.load = null;
			obj.loadStruct = null;
			obj = null;
			return
		}
		obj._dhxdataload = {
			initObj : initObj,
			xmlToJson : xmlToJson,
			xmlRootTag : xmlRootTag,
			onBeforeXLS : null
		};
		obj._loadData = function(data, loadParams, onLoad) {
			if (arguments.length == 2) {
				onLoad = loadParams;
				loadParams = null
			}
			var obj = null;
			if (arguments.length == 3) {
				onLoad = arguments[2]
			}
			if (typeof (data) == "string") {
				var k = data.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
				var tag = new RegExp("^<" + this._dhxdataload.xmlRootTag);
				if (tag.test(k.replace(/^<\?xml[^\?]*\?>\s*/, ""))) {
					if (window.DOMParser) {
						obj = (new window.DOMParser()).parseFromString(data,
								"text/xml")
					} else {
						if (typeof (window.ActiveXObject) != "undefined") {
							obj = new window.ActiveXObject("Microsoft.XMLDOM");
							obj.async = "false";
							obj.loadXML(data)
						}
					}
					if (obj != null) {
						obj = this[this._dhxdataload.xmlToJson].apply(this,
								[ obj ])
					}
				}
				if (obj == null
						&& (k.match(/^\{.*\}$/) != null || k.match(/^\[.*\]$/) != null)) {
					try {
						eval("dhx4.temp=" + k)
					} catch (e) {
						dhx4.temp = null
					}
					obj = dhx4.temp;
					dhx4.temp = null
				}
				if (obj == null) {
					this.callEvent("onXLS", []);
					var params = [];
					if (typeof (this._dhxdataload.onBeforeXLS) == "function") {
						var k = this._dhxdataload.onBeforeXLS.apply(this,
								[ data ]);
						if (k != null && typeof (k) == "object") {
							if (k.url != null) {
								data = k.url
							}
							if (k.params != null) {
								for ( var a in k.params) {
									params.push(a + "="
											+ encodeURIComponent(k.params[a]))
								}
							}
						}
					}
					var t = this;
					var callBack = function(r) {
						var obj = null;
						if ((r.xmlDoc.getResponseHeader("Content-Type") || "")
								.search(/xml/gi) >= 0
								|| (r.xmlDoc.responseText
										.replace(/^\s{1,}/, "")).match(/^</) != null) {
							obj = t[t._dhxdataload.xmlToJson].apply(t,
									[ r.xmlDoc.responseXML ])
						} else {
							try {
								eval("dhx4.temp=" + r.xmlDoc.responseText)
							} catch (e) {
								dhx4.temp = null
							}
							obj = dhx4.temp;
							dhx4.temp = null
						}
						if (obj != null) {
							t[t._dhxdataload.initObj].apply(t, [ obj, data ])
						}
						t.callEvent("onXLE", []);
						if (onLoad != null) {
							if (typeof (onLoad) == "function") {
								onLoad.apply(t, [])
							} else {
								if (typeof (window[onLoad]) == "function") {
									window[onLoad].apply(t, [])
								}
							}
						}
						callBack = onLoad = null;
						obj = r = t = null
					};
					params = params.join("&")
							+ (typeof (loadParams) == "string" ? "&"
									+ loadParams : "");
					if (dhx4.ajax.method == "post") {
						dhx4.ajax.post(data, params, callBack)
					} else {
						if (dhx4.ajax.method == "get") {
							dhx4.ajax.get(data
									+ (data.indexOf("?") > 0 ? "" : "")
									+ params, callBack)
						}
					}
					return
				}
			} else {
				if (typeof (data.documentElement) == "object"
						|| (typeof (data.tagName) != "undefined"
								&& typeof (data.getElementsByTagName) != "undefined" && data
								.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {
					obj = this[this._dhxdataload.xmlToJson].apply(this,
							[ data ])
				} else {
					obj = window.dhx4._copyObj(data)
				}
			}
			if (obj != null) {
				this[this._dhxdataload.initObj].apply(this, [ obj ])
			}
			if (onLoad != null) {
				if (typeof (onLoad) == "function") {
					onLoad.apply(this, [])
				} else {
					if (typeof (window[onLoad]) == "function") {
						window[onLoad].apply(this, [])
					}
				}
				onLoad = null
			}
		};
		if (mode != null) {
			var k = {
				struct : "loadStruct",
				data : "load"
			};
			for ( var a in mode) {
				if (mode[a] == true) {
					obj[k[a]] = function() {
						return this._loadData.apply(this, arguments)
					}
				}
			}
		}
		obj = null
	}
}
if (typeof (window.dhx4._eventable) == "undefined") {
	window.dhx4._eventable = function(a, b) {
		if (b == "clear") {
			a.detachAllEvents();
			a.dhxevs = null;
			a.attachEvent = null;
			a.detachEvent = null;
			a.checkEvent = null;
			a.callEvent = null;
			a.detachAllEvents = null;
			a = null;
			return
		}
		a.dhxevs = {
			data : {}
		};
		a.attachEvent = function(c, e) {
			c = String(c).toLowerCase();
			if (!this.dhxevs.data[c]) {
				this.dhxevs.data[c] = {}
			}
			var d = window.dhx4.newId();
			this.dhxevs.data[c][d] = e;
			return d
		};
		a.detachEvent = function(f) {
			for ( var d in this.dhxevs.data) {
				var e = 0;
				for ( var c in this.dhxevs.data[d]) {
					if (c == f) {
						this.dhxevs.data[d][c] = null;
						delete this.dhxevs.data[d][c]
					} else {
						e++
					}
				}
				if (e == 0) {
					this.dhxevs.data[d] = null;
					delete this.dhxevs.data[d]
				}
			}
		};
		a.checkEvent = function(c) {
			c = String(c).toLowerCase();
			return (this.dhxevs.data[c] != null)
		};
		a.callEvent = function(d, f) {
			d = String(d).toLowerCase();
			if (this.dhxevs.data[d] == null) {
				return true
			}
			var e = true;
			for ( var c in this.dhxevs.data[d]) {
				e = this.dhxevs.data[d][c].apply(this, f) && e
			}
			return e
		};
		a.detachAllEvents = function() {
			for ( var d in this.dhxevs.data) {
				for ( var c in this.dhxevs.data[d]) {
					this.dhxevs.data[d][c] = null;
					delete this.dhxevs.data[d][c]
				}
				this.dhxevs.data[d] = null;
				delete this.dhxevs.data[d]
			}
		};
		a = null
	}
}
dhtmlx = function(c) {
	for ( var b in c) {
		dhtmlx[b] = c[b]
	}
	return dhtmlx
};
dhtmlx.extend_api = function(a, d, c) {
	var b = window[a];
	if (!b) {
		return
	}
	window[a] = function(g) {
		if (g && typeof g == "object" && !g.tagName) {
			var f = b.apply(this, (d._init ? d._init(g) : arguments));
			for ( var e in dhtmlx) {
				if (d[e]) {
					this[d[e]](dhtmlx[e])
				}
			}
			for ( var e in g) {
				if (d[e]) {
					this[d[e]](g[e])
				} else {
					if (e.indexOf("on") == 0) {
						this.attachEvent(e, g[e])
					}
				}
			}
		} else {
			var f = b.apply(this, arguments)
		}
		if (d._patch) {
			d._patch(this)
		}
		return f || this
	};
	window[a].prototype = b.prototype;
	if (c) {
		dhtmlXHeir(window[a].prototype, c)
	}
};
dhtmlxAjax = {
	get : function(a, c) {
		var b = new dtmlXMLLoaderObject(true);
		b.async = (arguments.length < 3);
		b.waitCall = c;
		b.loadXML(a);
		return b
	},
	post : function(a, c, d) {
		var b = new dtmlXMLLoaderObject(true);
		b.async = (arguments.length < 4);
		b.waitCall = d;
		b.loadXML(a, true, c);
		return b
	},
	getSync : function(a) {
		return this.get(a, null, true)
	},
	postSync : function(a, b) {
		return this.post(a, b, null, true)
	}
};
function dtmlXMLLoaderObject(b, d, c, a) {
	this.xmlDoc = "";
	if (typeof (c) != "undefined") {
		this.async = c
	} else {
		this.async = true
	}
	this.onloadAction = b || null;
	this.mainObject = d || null;
	this.waitCall = null;
	this.rSeed = a || false;
	return this
}
dtmlXMLLoaderObject.count = 0;
dtmlXMLLoaderObject.prototype.waitLoadFunction = function(b) {
	var a = true;
	this.check = function() {
		if ((b) && (b.onloadAction != null)) {
			if ((!b.xmlDoc.readyState) || (b.xmlDoc.readyState == 4)) {
				if (!a) {
					return
				}
				a = false;
				dtmlXMLLoaderObject.count++;
				if (typeof b.onloadAction == "function") {
					b.onloadAction(b.mainObject, null, null, null, b)
				}
				if (b.waitCall) {
					b.waitCall.call(this, b);
					b.waitCall = null
				}
			}
		}
	};
	return this.check
};
dtmlXMLLoaderObject.prototype.getXMLTopNode = function(c, a) {
	if (typeof this.xmlDoc.status == "undefined" || this.xmlDoc.status < 400) {
		if (this.xmlDoc.responseXML) {
			var b = this.xmlDoc.responseXML.getElementsByTagName(c);
			if (b.length == 0 && c.indexOf(":") != -1) {
				var b = this.xmlDoc.responseXML.getElementsByTagName((c
						.split(":"))[1])
			}
			var d = b[0]
		} else {
			var d = this.xmlDoc.documentElement
		}
		if (d) {
			this._retry = false;
			return d
		}
		if (!this._retry && _isIE) {
			this._retry = true;
			var a = this.xmlDoc;
			this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""),
					true);
			return this.getXMLTopNode(c, a)
		}
	}
	dhtmlxError.throwError("LoadXML", "Incorrect XML", [ (a || this.xmlDoc),
			this.mainObject ]);
	return document.createElement("DIV")
};
dtmlXMLLoaderObject.prototype.loadXMLString = function(b, a) {
	if (!_isIE) {
		var c = new DOMParser();
		this.xmlDoc = c.parseFromString(b, "text/xml")
	} else {
		this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		this.xmlDoc.async = this.async;
		this.xmlDoc.onreadystatechange = function() {
		};
		this.xmlDoc.loadXML(b)
	}
	if (a) {
		return
	}
	if (this.onloadAction) {
		this.onloadAction(this.mainObject, null, null, null, this)
	}
	if (this.waitCall) {
		this.waitCall();
		this.waitCall = null
	}
};
dtmlXMLLoaderObject.prototype.loadXML = function(c, b, a, d) {
	if (this.rSeed) {
		c += ((c.indexOf("?") != -1) ? "&" : "?") + "a_dhx_rSeed="
				+ (new Date()).valueOf()
	}
	this.filePath = c;
	if ((!_isIE) && (window.XMLHttpRequest)) {
		this.xmlDoc = new XMLHttpRequest()
	} else {
		this.xmlDoc = new ActiveXObject("Microsoft.XMLHTTP")
	}
	if (this.async) {
		this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)
	}
	this.xmlDoc.open(b ? "POST" : "GET", c, this.async);
	if (d) {
		this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 ("
				+ navigator.userAgent + ")");
		this.xmlDoc.setRequestHeader("Content-type", "text/xml")
	} else {
		if (b) {
			this.xmlDoc.setRequestHeader("Content-type",
					(this.contenttype || "application/x-www-form-urlencoded"))
		}
	}
	this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	this.xmlDoc.send(null || a);
	if (!this.async) {
		(new this.waitLoadFunction(this))()
	}
};
dtmlXMLLoaderObject.prototype.destructor = function() {
	this._filterXPath = null;
	this._getAllNamedChilds = null;
	this._retry = null;
	this.async = null;
	this.rSeed = null;
	this.filePath = null;
	this.onloadAction = null;
	this.mainObject = null;
	this.xmlDoc = null;
	this.doXPath = null;
	this.doXPathOpera = null;
	this.doXSLTransToObject = null;
	this.doXSLTransToString = null;
	this.loadXML = null;
	this.loadXMLString = null;
	this.doSerialization = null;
	this.xmlNodeToJSON = null;
	this.getXMLTopNode = null;
	this.setXSLParamValue = null;
	return null
};
dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(d) {
	var c = {};
	for (var b = 0; b < d.attributes.length; b++) {
		c[d.attributes[b].name] = d.attributes[b].value
	}
	c._tagvalue = d.firstChild ? d.firstChild.nodeValue : "";
	for (var b = 0; b < d.childNodes.length; b++) {
		var a = d.childNodes[b].tagName;
		if (a) {
			if (!c[a]) {
				c[a] = []
			}
			c[a].push(this.xmlNodeToJSON(d.childNodes[b]))
		}
	}
	return c
};
function callerFunction(a, b) {
	this.handler = function(c) {
		if (!c) {
			c = window.event
		}
		a(c, b);
		return true
	};
	return this.handler
}
function getAbsoluteLeft(a) {
	return getOffset(a).left
}
function getAbsoluteTop(a) {
	return getOffset(a).top
}
function getOffsetSum(a) {
	var c = 0, b = 0;
	while (a) {
		c = c + parseInt(a.offsetTop);
		b = b + parseInt(a.offsetLeft);
		a = a.offsetParent
	}
	return {
		top : c,
		left : b
	}
}
function getOffsetRect(d) {
	var g = d.getBoundingClientRect();
	var h = document.body;
	var b = document.documentElement;
	var a = window.pageYOffset || b.scrollTop || h.scrollTop;
	var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
	var f = b.clientTop || h.clientTop || 0;
	var i = b.clientLeft || h.clientLeft || 0;
	var j = g.top + a - f;
	var c = g.left + e - i;
	return {
		top : Math.round(j),
		left : Math.round(c)
	}
}
function getOffset(a) {
	if (a.getBoundingClientRect) {
		return getOffsetRect(a)
	} else {
		return getOffsetSum(a)
	}
}
function convertStringToBoolean(a) {
	if (typeof (a) == "string") {
		a = a.toLowerCase()
	}
	switch (a) {
	case "1":
	case "true":
	case "yes":
	case "y":
	case 1:
	case true:
		return true;
		break;
	default:
		return false
	}
}
function getUrlSymbol(a) {
	if (a.indexOf("?") != -1) {
		return "&"
	} else {
		return "?"
	}
}
function dhtmlDragAndDropObject() {
	if (window.dhtmlDragAndDrop) {
		return window.dhtmlDragAndDrop
	}
	this.lastLanding = 0;
	this.dragNode = 0;
	this.dragStartNode = 0;
	this.dragStartObject = 0;
	this.tempDOMU = null;
	this.tempDOMM = null;
	this.waitDrag = 0;
	window.dhtmlDragAndDrop = this;
	return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function(a) {
	a.onmousedown = null;
	a.dragStarter = null;
	a.dragLanding = null
};
dhtmlDragAndDropObject.prototype.addDraggableItem = function(a, b) {
	a.onmousedown = this.preCreateDragCopy;
	a.dragStarter = b;
	this.addDragLanding(a, b)
};
dhtmlDragAndDropObject.prototype.addDragLanding = function(a, b) {
	a.dragLanding = b
};
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(a) {
	if ((a || window.event) && (a || event).button == 2) {
		return
	}
	if (window.dhtmlDragAndDrop.waitDrag) {
		window.dhtmlDragAndDrop.waitDrag = 0;
		document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU;
		document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM;
		return false
	}
	if (window.dhtmlDragAndDrop.dragNode) {
		window.dhtmlDragAndDrop.stopDrag(a)
	}
	window.dhtmlDragAndDrop.waitDrag = 1;
	window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
	window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
	window.dhtmlDragAndDrop.dragStartNode = this;
	window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
	document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
	document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
	window.dhtmlDragAndDrop.downtime = new Date().valueOf();
	if ((a) && (a.preventDefault)) {
		a.preventDefault();
		return false
	}
	return false
};
dhtmlDragAndDropObject.prototype.callDrag = function(c) {
	if (!c) {
		c = window.event
	}
	dragger = window.dhtmlDragAndDrop;
	if ((new Date()).valueOf() - dragger.downtime < 100) {
		return
	}
	if (!dragger.dragNode) {
		if (dragger.waitDrag) {
			dragger.dragNode = dragger.dragStartObject._createDragNode(
					dragger.dragStartNode, c);
			if (!dragger.dragNode) {
				return dragger.stopDrag()
			}
			dragger.dragNode.onselectstart = function() {
				return false
			};
			dragger.gldragNode = dragger.dragNode;
			document.body.appendChild(dragger.dragNode);
			document.body.onmouseup = dragger.stopDrag;
			dragger.waitDrag = 0;
			dragger.dragNode.pWindow = window;
			dragger.initFrameRoute()
		} else {
			return dragger.stopDrag(c, true)
		}
	}
	if (dragger.dragNode.parentNode != window.document.body
			&& dragger.gldragNode) {
		var a = dragger.gldragNode;
		if (dragger.gldragNode.old) {
			a = dragger.gldragNode.old
		}
		a.parentNode.removeChild(a);
		var b = dragger.dragNode.pWindow;
		if (a.pWindow && a.pWindow.dhtmlDragAndDrop.lastLanding) {
			a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding
					._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)
		}
		if (_isIE) {
			var f = document.createElement("Div");
			f.innerHTML = dragger.dragNode.outerHTML;
			dragger.dragNode = f.childNodes[0]
		} else {
			dragger.dragNode = dragger.dragNode.cloneNode(true)
		}
		dragger.dragNode.pWindow = window;
		dragger.gldragNode.old = dragger.dragNode;
		document.body.appendChild(dragger.dragNode);
		b.dhtmlDragAndDrop.dragNode = dragger.dragNode
	}
	dragger.dragNode.style.left = c.clientX + 15
			+ (dragger.fx ? dragger.fx * (-1) : 0)
			+ (document.body.scrollLeft || document.documentElement.scrollLeft)
			+ "px";
	dragger.dragNode.style.top = c.clientY + 3
			+ (dragger.fy ? dragger.fy * (-1) : 0)
			+ (document.body.scrollTop || document.documentElement.scrollTop)
			+ "px";
	if (!c.srcElement) {
		var d = c.target
	} else {
		d = c.srcElement
	}
	dragger.checkLanding(d, c)
};
dhtmlDragAndDropObject.prototype.calculateFramePosition = function(e) {
	if (window.name) {
		var c = parent.frames[window.name].frameElement.offsetParent;
		var d = 0;
		var b = 0;
		while (c) {
			d += c.offsetLeft;
			b += c.offsetTop;
			c = c.offsetParent
		}
		if ((parent.dhtmlDragAndDrop)) {
			var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);
			d += a.split("_")[0] * 1;
			b += a.split("_")[1] * 1
		}
		if (e) {
			return d + "_" + b
		} else {
			this.fx = d
		}
		this.fy = b
	}
	return "0_0"
};
dhtmlDragAndDropObject.prototype.checkLanding = function(b, a) {
	if ((b) && (b.dragLanding)) {
		if (this.lastLanding) {
			this.lastLanding.dragLanding._dragOut(this.lastLanding)
		}
		this.lastLanding = b;
		this.lastLanding = this.lastLanding.dragLanding._dragIn(
				this.lastLanding, this.dragStartNode, a.clientX, a.clientY, a);
		this.lastLanding_scr = (_isIE ? a.srcElement : a.target)
	} else {
		if ((b) && (b.tagName != "BODY")) {
			this.checkLanding(b.parentNode, a)
		} else {
			if (this.lastLanding) {
				this.lastLanding.dragLanding._dragOut(this.lastLanding,
						a.clientX, a.clientY, a)
			}
			this.lastLanding = 0;
			if (this._onNotFound) {
				this._onNotFound()
			}
		}
	}
};
dhtmlDragAndDropObject.prototype.stopDrag = function(b, c) {
	dragger = window.dhtmlDragAndDrop;
	if (!c) {
		dragger.stopFrameRoute();
		var a = dragger.lastLanding;
		dragger.lastLanding = null;
		if (a) {
			a.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject,
					a, (_isIE ? event.srcElement : b.target))
		}
	}
	dragger.lastLanding = null;
	if ((dragger.dragNode) && (dragger.dragNode.parentNode == document.body)) {
		dragger.dragNode.parentNode.removeChild(dragger.dragNode)
	}
	dragger.dragNode = 0;
	dragger.gldragNode = 0;
	dragger.fx = 0;
	dragger.fy = 0;
	dragger.dragStartNode = 0;
	dragger.dragStartObject = 0;
	document.body.onmouseup = dragger.tempDOMU;
	document.body.onmousemove = dragger.tempDOMM;
	dragger.tempDOMU = null;
	dragger.tempDOMM = null;
	dragger.waitDrag = 0
};
dhtmlDragAndDropObject.prototype.stopFrameRoute = function(c) {
	if (c) {
		window.dhtmlDragAndDrop.stopDrag(1, 1)
	}
	for (var a = 0; a < window.frames.length; a++) {
		try {
			if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
				window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)
			}
		} catch (b) {
		}
	}
	try {
		if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
			parent.dhtmlDragAndDrop.stopFrameRoute(window)
		}
	} catch (b) {
	}
};
dhtmlDragAndDropObject.prototype.initFrameRoute = function(c, d) {
	if (c) {
		window.dhtmlDragAndDrop.preCreateDragCopy();
		window.dhtmlDragAndDrop.dragStartNode = c.dhtmlDragAndDrop.dragStartNode;
		window.dhtmlDragAndDrop.dragStartObject = c.dhtmlDragAndDrop.dragStartObject;
		window.dhtmlDragAndDrop.dragNode = c.dhtmlDragAndDrop.dragNode;
		window.dhtmlDragAndDrop.gldragNode = c.dhtmlDragAndDrop.dragNode;
		window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag;
		window.waitDrag = 0;
		if (((!_isIE) && (d)) && ((!_isFF) || (_FFrv < 1.8))) {
			window.dhtmlDragAndDrop.calculateFramePosition()
		}
	}
	try {
		if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
			parent.dhtmlDragAndDrop.initFrameRoute(window)
		}
	} catch (b) {
	}
	for (var a = 0; a < window.frames.length; a++) {
		try {
			if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
				window.frames[a].dhtmlDragAndDrop.initFrameRoute(window,
						((!c || d) ? 1 : 0))
			}
		} catch (b) {
		}
	}
};
_isFF = false;
_isIE = false;
_isOpera = false;
_isKHTML = false;
_isMacOS = false;
_isChrome = false;
_FFrv = false;
_KHTMLrv = false;
_OperaRv = false;
if (navigator.userAgent.indexOf("Macintosh") != -1) {
	_isMacOS = true
}
if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
	_isChrome = true
}
if ((navigator.userAgent.indexOf("Safari") != -1)
		|| (navigator.userAgent.indexOf("Konqueror") != -1)) {
	_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent
			.indexOf("Safari") + 7, 5));
	if (_KHTMLrv > 525) {
		_isFF = true;
		_FFrv = 1.9
	} else {
		_isKHTML = true
	}
} else {
	if (navigator.userAgent.indexOf("Opera") != -1) {
		_isOpera = true;
		_OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent
				.indexOf("Opera") + 6, 3))
	} else {
		if (navigator.appName.indexOf("Microsoft") != -1) {
			_isIE = true;
			if ((navigator.appVersion.indexOf("MSIE 8.0") != -1
					|| navigator.appVersion.indexOf("MSIE 9.0") != -1
					|| navigator.appVersion.indexOf("MSIE 10.0") != -1 || document.documentMode > 7)
					&& document.compatMode != "BackCompat") {
				_isIE = 8
			}
		} else {
			if (navigator.appName == "Netscape"
					&& navigator.userAgent.indexOf("Trident") != -1) {
				_isIE = 8
			} else {
				_isFF = true;
				_FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
			}
		}
	}
}
dtmlXMLLoaderObject.prototype.doXPath = function(c, e, d, i) {
	if (_isKHTML || (!_isIE && !window.XPathResult)) {
		return this.doXPathOpera(c, e)
	}
	if (_isIE) {
		if (!e) {
			if (!this.xmlDoc.nodeName) {
				e = this.xmlDoc.responseXML
			} else {
				e = this.xmlDoc
			}
		}
		if (!e) {
			dhtmlxError.throwError("LoadXML", "Incorrect XML", [
					(e || this.xmlDoc), this.mainObject ])
		}
		if (d != null) {
			e.setProperty("SelectionNamespaces", "xmlns:xsl='" + d + "'")
		}
		if (i == "single") {
			return e.selectSingleNode(c)
		} else {
			return e.selectNodes(c) || new Array(0)
		}
	} else {
		var a = e;
		if (!e) {
			if (!this.xmlDoc.nodeName) {
				e = this.xmlDoc.responseXML
			} else {
				e = this.xmlDoc
			}
		}
		if (!e) {
			dhtmlxError.throwError("LoadXML", "Incorrect XML", [
					(e || this.xmlDoc), this.mainObject ])
		}
		if (e.nodeName.indexOf("document") != -1) {
			a = e
		} else {
			a = e;
			e = e.ownerDocument
		}
		var g = XPathResult.ANY_TYPE;
		if (i == "single") {
			g = XPathResult.FIRST_ORDERED_NODE_TYPE
		}
		var f = new Array();
		var b = e.evaluate(c, a, function(j) {
			return d
		}, g, null);
		if (g == XPathResult.FIRST_ORDERED_NODE_TYPE) {
			return b.singleNodeValue
		}
		var h = b.iterateNext();
		while (h) {
			f[f.length] = h;
			h = b.iterateNext()
		}
		return f
	}
};
function _dhtmlxError(b, a, c) {
	if (!this.catches) {
		this.catches = new Array()
	}
	return this
}
_dhtmlxError.prototype.catchError = function(b, a) {
	this.catches[b] = a
};
_dhtmlxError.prototype.throwError = function(b, a, c) {
	if (this.catches[b]) {
		return this.catches[b](b, a, c)
	}
	if (this.catches.ALL) {
		return this.catches.ALL(b, a, c)
	}
	alert("Error type: " + arguments[0] + "\nDescription: " + arguments[1]);
	return null
};
window.dhtmlxError = new _dhtmlxError();
dtmlXMLLoaderObject.prototype.doXPathOpera = function(c, a) {
	var e = c.replace(/[\/]+/gi, "/").split("/");
	var d = null;
	var b = 1;
	if (!e.length) {
		return []
	}
	if (e[0] == ".") {
		d = [ a ]
	} else {
		if (e[0] == "") {
			d = (this.xmlDoc.responseXML || this.xmlDoc)
					.getElementsByTagName(e[b].replace(/\[[^\]]*\]/g, ""));
			b++
		} else {
			return []
		}
	}
	for (b; b < e.length; b++) {
		d = this._getAllNamedChilds(d, e[b])
	}
	if (e[b - 1].indexOf("[") != -1) {
		d = this._filterXPath(d, e[b - 1])
	}
	return d
};
dtmlXMLLoaderObject.prototype._filterXPath = function(e, d) {
	var g = new Array();
	var d = d.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, "");
	for (var f = 0; f < e.length; f++) {
		if (e[f].getAttribute(d)) {
			g[g.length] = e[f]
		}
	}
	return g
};
dtmlXMLLoaderObject.prototype._getAllNamedChilds = function(e, d) {
	var h = new Array();
	if (_isKHTML) {
		d = d.toUpperCase()
	}
	for (var g = 0; g < e.length; g++) {
		for (var f = 0; f < e[g].childNodes.length; f++) {
			if (_isKHTML) {
				if (e[g].childNodes[f].tagName
						&& e[g].childNodes[f].tagName.toUpperCase() == d) {
					h[h.length] = e[g].childNodes[f]
				}
			} else {
				if (e[g].childNodes[f].tagName == d) {
					h[h.length] = e[g].childNodes[f]
				}
			}
		}
	}
	return h
};
function dhtmlXHeir(e, d) {
	for ( var f in d) {
		if (typeof (d[f]) == "function") {
			e[f] = d[f]
		}
	}
	return e
}
function dhtmlxEvent(b, c, a) {
	if (b.addEventListener) {
		b.addEventListener(c, a, false)
	} else {
		if (b.attachEvent) {
			b.attachEvent("on" + c, a)
		}
	}
}
dtmlXMLLoaderObject.prototype.xslDoc = null;
dtmlXMLLoaderObject.prototype.setXSLParamValue = function(b, c, d) {
	if (!d) {
		d = this.xslDoc
	}
	if (d.responseXML) {
		d = d.responseXML
	}
	var a = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + b + "']", d,
			"http://www.w3.org/1999/XSL/Transform", "single");
	if (a != null) {
		a.firstChild.nodeValue = c
	}
};
dtmlXMLLoaderObject.prototype.doXSLTransToObject = function(d, b) {
	if (!d) {
		d = this.xslDoc
	}
	if (d.responseXML) {
		d = d.responseXML
	}
	if (!b) {
		b = this.xmlDoc
	}
	if (b.responseXML) {
		b = b.responseXML
	}
	if (!_isIE) {
		if (!this.XSLProcessor) {
			this.XSLProcessor = new XSLTProcessor();
			this.XSLProcessor.importStylesheet(d)
		}
		var a = this.XSLProcessor.transformToDocument(b)
	} else {
		var a = new ActiveXObject("Msxml2.DOMDocument.3.0");
		try {
			b.transformNodeToObject(d, a)
		} catch (c) {
			a = b.transformNode(d)
		}
	}
	return a
};
dtmlXMLLoaderObject.prototype.doXSLTransToString = function(c, b) {
	var a = this.doXSLTransToObject(c, b);
	if (typeof (a) == "string") {
		return a
	}
	return this.doSerialization(a)
};
dtmlXMLLoaderObject.prototype.doSerialization = function(b) {
	if (!b) {
		b = this.xmlDoc
	}
	if (b.responseXML) {
		b = b.responseXML
	}
	if (!_isIE) {
		var a = new XMLSerializer();
		return a.serializeToString(b)
	} else {
		return b.xml
	}
};
dhtmlxEventable = function(obj) {
	obj.attachEvent = function(name, catcher, callObj) {
		name = "ev_" + name.toLowerCase();
		if (!this[name]) {
			this[name] = new this.eventCatcher(callObj || this)
		}
		return (name + ":" + this[name].addEvent(catcher))
	};
	obj.callEvent = function(name, arg0) {
		name = "ev_" + name.toLowerCase();
		if (this[name]) {
			return this[name].apply(this, arg0)
		}
		return true
	};
	obj.checkEvent = function(name) {
		return (!!this["ev_" + name.toLowerCase()])
	};
	obj.eventCatcher = function(obj) {
		var dhx_catch = [];
		var z = function() {
			var res = true;
			for (var i = 0; i < dhx_catch.length; i++) {
				if (dhx_catch[i] != null) {
					var zr = dhx_catch[i].apply(obj, arguments);
					res = res && zr
				}
			}
			return res
		};
		z.addEvent = function(ev) {
			if (typeof (ev) != "function") {
				ev = eval(ev)
			}
			if (ev) {
				return dhx_catch.push(ev) - 1
			}
			return false
		};
		z.removeEvent = function(id) {
			dhx_catch[id] = null
		};
		return z
	};
	obj.detachEvent = function(id) {
		if (id != false) {
			var list = id.split(":");
			this[list[0]].removeEvent(list[1])
		}
	};
	obj.detachAllEvents = function() {
		for ( var name in this) {
			if (name.indexOf("ev_") == 0) {
				this.detachEvent(name);
				this[name] = null
			}
		}
	};
	obj = null
};
function dhtmlXMenuObject(e, f) {
	var d = this;
	this.conf = {
		skin : (f || window.dhx4.skin
				|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)
				|| window.dhx4.skinDetect("dhxmenu") || "dhx_skyblue"),
		mode : "web",
		align : "left",
		is_touched : false,
		selected : -1,
		last_click : -1,
		fixed_pos : false,
		rtl : false,
		icons_path : "",
		arrow_ff_fix : (navigator.userAgent.indexOf("MSIE") >= 0 && document.compatMode == "BackCompat"),
		live_id : window.dhx4.newId(),
		tags : {
			root : "menu",
			item : "item",
			text_ext : "itemtext",
			userdata : "userdata",
			tooltip : "tooltip",
			hotkey : "hotkey",
			href : "href"
		},
		autoload : {},
		hide_tm : {},
		top_mode : true,
		top_tmtime : 200,
		v_enabled : false,
		v : {
			x1 : null,
			x2 : null,
			y1 : null,
			y2 : null
		},
		dir_toplv : "bottom",
		dir_sublv : "right",
		auto_overflow : false,
		overflow_limit : 0,
		of_utm : null,
		of_utime : 20,
		of_ustep : 3,
		of_dtm : null,
		of_dtime : 20,
		of_dstep : 3,
		tm_sec : 400,
		tm_handler : null,
		dload : false,
		dload_url : "",
		dload_icon : false,
		dload_params : {
			action : "loadMenu"
		},
		dload_pid : "parentId",
		tl_botmarg : 1,
		tl_rmarg : 0,
		tl_ofsleft : 1,
		context : false,
		ctx_zoneid : false,
		ctx_autoshow : true,
		ctx_autohide : true,
		ctx_hideall : true,
		ctx_zones : {},
		ctx_baseid : null,
		selected_sub : [],
		opened_poly : []
	};
	if (typeof (e) == "object" && e != null
			&& typeof (e.tagName) == "undefined") {
		if (e.icons_path != null || e.icon_path != null) {
			this.conf.icons_path = (e.icons_path || e.icon_path)
		}
		if (e.skin != null) {
			this.conf.skin = e.skin
		}
		if (e.visible_area) {
			this.conf.v_enabled = true;
			this.conf.v = {
				x1 : e.visible_area.x1,
				x2 : e.visible_area.x2,
				y1 : e.visible_area.y1,
				y2 : e.visible_area.y2
			}
		}
		for ( var c in {
			json : 1,
			xml : 1,
			items : 1,
			top_text : 1,
			align : 1,
			open_mode : 1,
			overflow : 1,
			dynamic : 1,
			dynamic_icon : 1,
			context : 1,
			onload : 1,
			onclick : 1,
			oncheckboxclick : 1,
			onradioclick : 1
		}) {
			if (e[c] != null) {
				this.conf.autoload[c] = e[c]
			}
		}
		e = e.parent
	}
	if (e == null) {
		this.base = document.body
	} else {
		var b = (typeof (e) == "string" ? document.getElementById(e) : e);
		if (b != null) {
			this.base = b;
			if (!this.base.id) {
				this.base.id = (new Date()).valueOf()
			}
			this.base.className += " dhtmlxMenu_" + this.conf.skin
					+ "_Middle dir_left";
			this.base._autoSkinUpdate = true;
			if (this.base.oncontextmenu) {
				this.base._oldContextMenuHandler = this.base.oncontextmenu
			}
			this.conf.ctx_baseid = this.base.id;
			this.base.onselectstart = function(a) {
				a = a || event;
				if (a.preventDefault) {
					a.preventDefault()
				} else {
					a.returnValue = false
				}
				return false
			};
			this.base.oncontextmenu = function(a) {
				a = a || event;
				if (a.preventDefault) {
					a.preventDefault()
				} else {
					a.returnValue = false
				}
				return false
			}
		} else {
			this.base = document.body
		}
	}
	this.idPrefix = "";
	this.topId = "dhxWebMenuTopId";
	this.idPull = {};
	this.itemPull = {};
	this.userData = {};
	this.radio = {};
	this.setSkin = function(h) {
		var i = this.conf.skin;
		this.conf.skin = h;
		switch (this.conf.skin) {
		case "dhx_skyblue":
		case "dhx_web":
			this.conf.tl_botmarg = 2;
			this.conf.tl_rmarg = 1;
			this.conf.tl_ofsleft = 1;
			break;
		case "dhx_terrace":
			this.conf.tl_botmarg = 0;
			this.conf.tl_rmarg = 0;
			this.conf.tl_ofsleft = 0;
			break
		}
		if (this.base._autoSkinUpdate) {
			this.base.className = this.base.className.replace("dhtmlxMenu_" + i
					+ "_Middle", "")
					+ " dhtmlxMenu_" + this.conf.skin + "_Middle"
		}
		for ( var g in this.idPull) {
			this.idPull[g].className = String(this.idPull[g].className)
					.replace(i, this.conf.skin)
		}
	};
	this.setSkin(this.conf.skin);
	this._addSubItemToSelected = function(h, g) {
		var a = true;
		for (var i = 0; i < this.conf.selected_sub.length; i++) {
			if ((this.conf.selected_sub[i][0] == h)
					&& (this.conf.selected_sub[i][1] == g)) {
				a = false
			}
		}
		if (a == true) {
			this.conf.selected_sub.push(new Array(h, g))
		}
		return a
	};
	this._removeSubItemFromSelected = function(i, h) {
		var a = new Array();
		var g = false;
		for (var j = 0; j < this.conf.selected_sub.length; j++) {
			if ((this.conf.selected_sub[j][0] == i)
					&& (this.conf.selected_sub[j][1] == h)) {
				g = true
			} else {
				a[a.length] = this.conf.selected_sub[j]
			}
		}
		if (g == true) {
			this.conf.selected_sub = a
		}
		return g
	};
	this._getSubItemToDeselectByPolygon = function(i) {
		var a = new Array();
		for (var j = 0; j < this.conf.selected_sub.length; j++) {
			if (this.conf.selected_sub[j][1] == i) {
				a[a.length] = this.conf.selected_sub[j][0];
				a = a
						.concat(this
								._getSubItemToDeselectByPolygon(this.conf.selected_sub[j][0]));
				var h = true;
				for (var g = 0; g < this.conf.opened_poly.length; g++) {
					if (this.conf.opened_poly[g] == this.conf.selected_sub[j][0]) {
						h = false
					}
				}
				if (h == true) {
					this.conf.opened_poly[this.conf.opened_poly.length] = this.conf.selected_sub[j][0]
				}
				this.conf.selected_sub[j][0] = -1;
				this.conf.selected_sub[j][1] = -1
			}
		}
		return a
	};
	this._hidePolygon = function(a) {
		if (this.idPull["polygon_" + a] != null) {
			if (this.idPull["polygon_" + a]._zId != null) {
				window.dhx4.zim.clear(this.idPull["polygon_" + a]._zId)
			}
			if (typeof (this._menuEffect) != "undefined"
					&& this._menuEffect !== false) {
				this._hidePolygonEffect("polygon_" + a)
			} else {
				if (this.idPull["polygon_" + a].style.display == "none") {
					return
				}
				this.idPull["polygon_" + a].style.display = "none";
				if (this.idPull["arrowup_" + a] != null) {
					this.idPull["arrowup_" + a].style.display = "none"
				}
				if (this.idPull["arrowdown_" + a] != null) {
					this.idPull["arrowdown_" + a].style.display = "none"
				}
				this._updateItemComplexState(a, true, false);
				if (window.dhx4.isIE6
						&& this.idPull["polygon_" + a + "_ie6cover"] != null) {
					this.idPull["polygon_" + a + "_ie6cover"].style.display = "none"
				}
			}
			a = String(a).replace(this.idPrefix, "");
			if (a == this.topId) {
				a = null
			}
			this.callEvent("onHide", [ a ]);
			if (a != null
					&& this.conf.skin == "dhx_terrace"
					&& this.itemPull[this.idPrefix + a].parent == this.idPrefix
							+ this.topId) {
				this._improveTerraceButton(this.idPrefix + a, true)
			}
		}
	};
	this._showPolygon = function(u, i) {
		var C = this._countVisiblePolygonItems(u);
		if (C == 0) {
			return
		}
		var v = "polygon_" + u;
		if ((this.idPull[v] != null) && (this.idPull[u] != null)) {
			if (this.conf.top_mode && this.conf.mode == "web"
					&& !this.conf.context) {
				if (!this.idPull[u]._mouseOver && i == this.conf.dir_toplv) {
					return
				}
			}
			if (!this.conf.fixed_pos) {
				this._autoDetectVisibleArea()
			}
			var z = 0;
			var B = 0;
			var E = null;
			var r = null;
			if (this.idPull[v]._zId == null) {
				this.idPull[v]._zId = window.dhx4.newId()
			}
			this.idPull[v]._zInd = window.dhx4.zim.reserve(this.idPull[v]._zId);
			this.idPull[v].style.visibility = "hidden";
			this.idPull[v].style.left = "0px";
			this.idPull[v].style.top = "0px";
			this.idPull[v].style.display = "";
			this.idPull[v].style.zIndex = this.idPull[v]._zInd;
			if (this.conf.auto_overflow) {
				if (this.idPull[v].firstChild.offsetHeight > this.conf.v.y1
						+ this.conf.v.y2) {
					var q = Math
							.floor((this.conf.v.y2 - this.conf.v.y1 - 35) / 24);
					this.conf.overflow_limit = q
				} else {
					this.conf.overflow_limit = 0;
					if (this.idPull["arrowup_" + u] != null) {
						this._removeUpArrow(String(u)
								.replace(this.idPrefix, ""))
					}
					if (this.idPull["arrowdown_" + u] != null) {
						this._removeDownArrow(String(u).replace(this.idPrefix,
								""))
					}
				}
			}
			if (this.conf.overflow_limit > 0 && this.conf.overflow_limit < C) {
				if (this.idPull["arrowup_" + u] == null) {
					this._addUpArrow(String(u).replace(this.idPrefix, ""))
				}
				if (this.idPull["arrowdown_" + u] == null) {
					this._addDownArrow(String(u).replace(this.idPrefix, ""))
				}
				E = this.idPull["arrowup_" + u];
				E.style.display = "none";
				r = this.idPull["arrowdown_" + u];
				r.style.display = "none"
			}
			if (this.conf.overflow_limit > 0) {
				if (this.conf.overflow_limit < C) {
					this.idPull[v].childNodes[1].style.height = 24
							* this.conf.overflow_limit + "px";
					E.style.width = r.style.width = this.idPull[v].childNodes[1].style.width = this.idPull[v].childNodes[1].childNodes[0].offsetWidth
							+ "px";
					this.idPull[v].childNodes[1].scrollTop = 0;
					E.style.display = "";
					z = E.offsetHeight;
					r.style.display = "";
					B = r.offsetHeight
				} else {
					this.idPull[v].childNodes[1].style.height = "";
					this.idPull[v].childNodes[1].style.width = ""
				}
			}
			if (this.itemPull[u] != null) {
				var o = "polygon_" + this.itemPull[u]["parent"]
			} else {
				if (this.conf.context) {
					var o = this.idPull[this.idPrefix + this.topId]
				}
			}
			var a = (this.idPull[u].tagName != null ? window.dhx4
					.absLeft(this.idPull[u]) : this.idPull[u][0]);
			var D = (this.idPull[u].tagName != null ? window.dhx4
					.absTop(this.idPull[u]) : this.idPull[u][1]);
			var g = (this.idPull[u].tagName != null ? this.idPull[u].offsetWidth
					: 0);
			var j = (this.idPull[u].tagName != null ? this.idPull[u].offsetHeight
					: 0);
			var n = 0;
			var m = 0;
			var p = this.idPull[v].offsetWidth;
			var A = this.idPull[v].childNodes[1].offsetHeight + z + B;
			if (i == "bottom") {
				if (this.conf.rtl) {
					n = a + (g != null ? g : 0) - p
				} else {
					if (this.conf.align == "right") {
						n = a + g - p
					} else {
						n = a
								- 1
								+ (i == this.conf.dir_toplv ? this.conf.tl_rmarg
										: 0)
					}
				}
				m = D - 1 + j + this.conf.tl_botmarg
			}
			if (i == "right") {
				n = a + g - 1;
				m = D + 2
			}
			if (i == "left") {
				n = a - this.idPull[v].offsetWidth + 2;
				m = D + 2
			}
			if (i == "top") {
				n = a - 1;
				m = D - A + 2
			}
			if (this.conf.fixed_pos) {
				var t = 65536;
				var s = 65536
			} else {
				var t = (this.conf.v.x2 != null ? this.conf.v.x2 : 0);
				var s = (this.conf.v.y2 != null ? this.conf.v.y2 : 0);
				if (t == 0) {
					if (window.innerWidth) {
						t = window.innerWidth;
						s = window.innerHeight
					} else {
						t = document.body.offsetWidth;
						s = document.body.scrollHeight
					}
				}
			}
			if (n + p > t && !this.conf.rtl) {
				n = a - p + 2
			}
			if (n < this.conf.v.x1 && this.conf.rtl) {
				n = a + g - 2
			}
			if (n < 0) {
				n = 0
			}
			if (m + A > s && this.conf.v.y2 != null) {
				m = Math.max(D + j - A + 2,
						(this.conf.v_enabled ? this.conf.v.y1 + 2 : 2));
				if (this.conf.context && this.idPrefix + this.topId == u
						&& r != null) {
					m = m - 2
				}
				if (this.itemPull[u] != null && !this.conf.context) {
					if (this.itemPull[u]["parent"] == this.idPrefix
							+ this.topId) {
						m = m - this.base.offsetHeight
					}
				}
			}
			this.idPull[v].style.left = n + "px";
			this.idPull[v].style.top = m + "px";
			if (typeof (this._menuEffect) != "undefined"
					&& this._menuEffect !== false) {
				this._showPolygonEffect(v)
			} else {
				this.idPull[v].style.visibility = "";
				if (this.conf.overflow_limit > 0
						&& this.conf.overflow_limit < C) {
					this.idPull[v].childNodes[1].scrollTop = 0;
					this._checkArrowsState(u)
				}
				if (window.dhx4.isIE6) {
					var l = v + "_ie6cover";
					if (this.idPull[l] == null) {
						var k = document.createElement("IFRAME");
						k.className = "dhtmlxMenu_IE6CoverFix_"
								+ this.conf.skin;
						k.frameBorder = 0;
						k.setAttribute("src", "javascript:false;");
						document.body.insertBefore(k, document.body.firstChild);
						this.idPull[l] = k
					}
					this.idPull[l].style.left = n + "px";
					this.idPull[l].style.top = m + "px";
					this.idPull[l].style.width = this.idPull[v].offsetWidth
							+ "px";
					this.idPull[l].style.height = this.idPull[v].offsetHeight
							+ "px";
					this.idPull[l].style.zIndex = this.idPull[v].style.zIndex - 1;
					this.idPull[l].style.display = ""
				}
			}
			u = String(u).replace(this.idPrefix, "");
			if (u == this.topId) {
				u = null
			}
			this.callEvent("onShow", [ u ]);
			if (u != null
					&& this.conf.skin == "dhx_terrace"
					&& this.itemPull[this.idPrefix + u].parent == this.idPrefix
							+ this.topId) {
				this._improveTerraceButton(this.idPrefix + u, false)
			}
		}
	};
	this._redistribSubLevelSelection = function(k, j) {
		while (this.conf.opened_poly.length > 0) {
			this.conf.opened_poly.pop()
		}
		var a = this._getSubItemToDeselectByPolygon(j);
		this._removeSubItemFromSelected(-1, -1);
		for (var g = 0; g < a.length; g++) {
			if ((this.idPull[a[g]] != null) && (a[g] != k)) {
				if (this.itemPull[a[g]]["state"] == "enabled") {
					this.idPull[a[g]].className = "sub_item"
				}
			}
		}
		for (var g = 0; g < this.conf.opened_poly.length; g++) {
			if (this.conf.opened_poly[g] != j) {
				this._hidePolygon(this.conf.opened_poly[g])
			}
		}
		if (this.itemPull[k]["state"] == "enabled") {
			this.idPull[k].className = "sub_item_selected";
			if (this.itemPull[k]["complex"] && this.conf.dload
					&& (this.itemPull[k]["loaded"] == "no")) {
				if (this.conf.dload_icon == true) {
					this._updateLoaderIcon(k, true)
				}
				this.itemPull[k].loaded = "get";
				var h = k.replace(this.idPrefix, "");
				this._dhxdataload.onBeforeXLS = function() {
					var l = {
						params : {}
					};
					l.params[this.conf.dload_pid] = h;
					for ( var i in this.conf.dload_params) {
						l.params[i] = this.conf.dload_params[i]
					}
					return l
				};
				this.loadStruct(this.conf.dload_url)
			}
			if (this.itemPull[k]["complex"]
					|| (this.conf.dload && (this.itemPull[k]["loaded"] == "yes"))) {
				if ((this.itemPull[k]["complex"])
						&& (this.idPull["polygon_" + k] != null)) {
					this._updateItemComplexState(k, true, true);
					this._showPolygon(k, this.conf.dir_sublv)
				}
			}
			this._addSubItemToSelected(k, j);
			this.conf.selected = k
		}
	};
	this._doOnClick = function(g, s, i) {
		this.conf.last_click = g;
		if (this.itemPull[this.idPrefix + g]["href_link"] != null
				&& this.itemPull[this.idPrefix + g].state == "enabled") {
			var l = document.createElement("FORM");
			var o = String(this.itemPull[this.idPrefix + g]["href_link"])
					.split("?");
			l.action = o[0];
			if (o[1] != null) {
				var h = String(o[1]).split("&");
				for (var a = 0; a < h.length; a++) {
					var r = String(h[a]).split("=");
					var n = document.createElement("INPUT");
					n.type = "hidden";
					n.name = (r[0] || "");
					n.value = (r[1] || "");
					l.appendChild(n)
				}
			}
			if (this.itemPull[this.idPrefix + g]["href_target"] != null) {
				l.target = this.itemPull[this.idPrefix + g]["href_target"]
			}
			l.style.display = "none";
			document.body.appendChild(l);
			l.submit();
			if (l != null) {
				document.body.removeChild(l);
				l = null
			}
			return
		}
		if (s.charAt(0) == "c") {
			return
		}
		if (s.charAt(1) == "d") {
			return
		}
		if (s.charAt(2) == "s") {
			return
		}
		if (this.checkEvent("onClick")) {
			this.callEvent("onClick", [ g, this.conf.ctx_zoneid, i ])
		} else {
			if ((s.charAt(1) == "d")
					|| (this.conf.mode == "win" && s.charAt(2) == "t")) {
				return
			}
		}
		if (this.conf.context && this._isContextMenuVisible()
				&& this.conf.ctx_autohide) {
			this._hideContextMenu()
		} else {
			if (this._clearAndHide) {
				this._clearAndHide()
			}
		}
	};
	this._doOnTouchMenu = function(a) {
		if (this.conf.is_touched == false) {
			this.conf.is_touched = true;
			if (this.checkEvent("onTouch")) {
				this.callEvent("onTouch", [ a ])
			}
		}
	};
	this._searchMenuNode = function(h, k) {
		var a = new Array();
		for (var i = 0; i < k.length; i++) {
			if (typeof (k[i]) == "object") {
				if (k[i].length == 5) {
					if (typeof (k[i][0]) != "object") {
						if ((k[i][0].replace(this.idPrefix, "") == h)
								&& (i == 0)) {
							a = k
						}
					}
				}
				var g = this._searchMenuNode(h, k[i]);
				if (g.length > 0) {
					a = g
				}
			}
		}
		return a
	};
	this._getMenuNodes = function(i) {
		var g = new Array;
		for ( var h in this.itemPull) {
			if (this.itemPull[h]["parent"] == i) {
				g[g.length] = h
			}
		}
		return g
	};
	this._genStr = function(a) {
		var g = "";
		var i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (var h = 0; h < a; h++) {
			g += i.charAt(Math.round(Math.random() * (i.length - 1)))
		}
		return g
	};
	this.getItemType = function(a) {
		a = this.idPrefix + a;
		if (this.itemPull[a] == null) {
			return null
		}
		return this.itemPull[a]["type"]
	};
	this.forEachItem = function(h) {
		for ( var g in this.itemPull) {
			h(String(g).replace(this.idPrefix, ""))
		}
	};
	this._clearAndHide = function() {
		d.conf.selected = -1;
		d.conf.last_click = -1;
		while (d.conf.opened_poly.length > 0) {
			d.conf.opened_poly.pop()
		}
		for (var a = 0; a < d.conf.selected_sub.length; a++) {
			var g = d.conf.selected_sub[a][0];
			if (d.idPull[g] != null) {
				if (d.itemPull[g]["state"] == "enabled") {
					if (d.idPull[g].className == "sub_item_selected") {
						d.idPull[g].className = "sub_item"
					}
					if (d.idPull[g].className == "dhtmlxMenu_" + d.conf.skin
							+ "_TopLevel_Item_Selected") {
						if (d.itemPull[g]["cssNormal"] != null) {
							d.idPull[g].className = d.itemPull[g]["cssNormal"]
						} else {
							d.idPull[g].className = "dhtmlxMenu_" + d.conf.skin
									+ "_TopLevel_Item_Normal"
						}
					}
				}
			}
			d._hidePolygon(g)
		}
		d.conf.is_touched = false;
		if (d.conf.context && d.conf.ctx_hideall) {
			d._hidePolygon(d.idPrefix + d.topId)
		}
	};
	this._showSubLevelItem = function(g, a) {
		if (document.getElementById("arrow_" + this.idPrefix + g) != null) {
			document.getElementById("arrow_" + this.idPrefix + g).style.display = (a ? "none"
					: "")
		}
		if (document.getElementById("image_" + this.idPrefix + g) != null) {
			document.getElementById("image_" + this.idPrefix + g).style.display = (a ? "none"
					: "")
		}
		if (document.getElementById(this.idPrefix + g) != null) {
			document.getElementById(this.idPrefix + g).style.display = (a ? ""
					: "none")
		}
	};
	this._hideSubLevelItem = function(a) {
		this._showSubLevelItem(a, true)
	};
	this.idPrefix = this._genStr(12) + "_";
	this._bodyClick = function(a) {
		a = a || event;
		if (a.button == 2 || (window.dhx4.isOpera && a.ctrlKey == true)) {
			return
		}
		if (d.conf.context) {
			if (d.conf.ctx_autohide
					&& (!window.dhx4.isOpera || (d._isContextMenuVisible() && window.dhx4.isOpera))) {
				d._hideContextMenu()
			}
		} else {
			if (d._clearAndHide) {
				d._clearAndHide()
			}
		}
	};
	this._bodyContext = function(h) {
		h = h || event;
		var g = String((h.srcElement || h.target).className);
		if (g.search("dhtmlxMenu") != -1 && g.search("SubLevelArea") != -1) {
			return
		}
		var a = true;
		var i = h.target || h.srcElement;
		while (i != null) {
			if (i.id != null) {
				if (d.isContextZone(i.id)) {
					a = false
				}
			}
			if (i == document.body) {
				a = false
			}
			i = i.parentNode
		}
		if (a) {
			d.hideContextMenu()
		}
	};
	if (typeof (window.addEventListener) != "undefined") {
		window.addEventListener("click", this._bodyClick, false);
		window.addEventListener("contextmenu", this._bodyContext, false)
	} else {
		document.body.attachEvent("onclick", this._bodyClick);
		document.body.attachEvent("oncontextmenu", this._bodyContext)
	}
	this.unload = function() {
		window.dhx4._eventable(this, "clear");
		dhtmlXMenuObject.prototype.liveInst[this.conf.live_id] = null;
		try {
			delete dhtmlXMenuObject.prototype.liveInst[this.conf.live_id]
		} catch (h) {
		}
		this.conf.live_id = null;
		if (typeof (window.addEventListener) == "function") {
			window.removeEventListener("click", this._bodyClick, false);
			window.removeEventListener("contextmenu", this._bodyContext, false)
		} else {
			document.body.detachEvent("onclick", this._bodyClick);
			document.body.detachEvent("oncontextmenu", this._bodyContext)
		}
		this._bodyClick = null;
		this._bodyContext = null;
		this.removeItem(this.idPrefix + this.topId, true);
		this.itemPull = null;
		this.idPull = null;
		if (this.conf.context) {
			for ( var g in this.conf.ctx_zones) {
				this.removeContextZone(g)
			}
		}
		if (this.cont != null) {
			this.cont.className = "";
			this.cont.parentNode.removeChild(this.cont);
			this.cont = null
		}
		if (this.base != null) {
			this.base.className = "";
			if (!this.conf.context) {
				this.base.oncontextmenu = (this.base._oldContextMenuHandler || null)
			}
			this.base.onselectstart = null;
			this.base = null
		}
		for ( var g in this) {
			this[g] = null
		}
		d = null
	};
	dhtmlXMenuObject.prototype.liveInst[this.conf.live_id] = this;
	window.dhx4._enableDataLoading(this, "_initObj", "_xmlToJson",
			this.conf.tags.root, {
				struct : true
			});
	window.dhx4._eventable(this);
	if (window.dhx4.s2b(this.conf.autoload.context) == true) {
		this.renderAsContextMenu()
	}
	if (this.conf.autoload.dynamic != null) {
		this.enableDynamicLoading(this.conf.autoload.dynamic, window.dhx4
				.s2b(this.conf.autoload.dynamic_icon))
	} else {
		if (this.conf.autoload.items != null) {
			this
					.loadStruct(this.conf.autoload.items,
							this.conf.autoload.onload)
		} else {
			if (this.conf.autoload.json != null) {
				this.loadStruct(this.conf.autoload.json,
						this.conf.autoload.onload)
			} else {
				if (this.conf.autoload.xml != null) {
					this.loadStruct(this.conf.autoload.xml,
							this.conf.autoload.onload)
				}
			}
		}
	}
	for ( var c in {
		onclick : 1,
		oncheckboxclick : 1,
		onradioclick : 1
	}) {
		if (this.conf.autoload[c] != null) {
			if (typeof (this.conf.autoload[c]) == "function") {
				this.attachEvent(c, this.conf.autoload[c])
			} else {
				if (typeof (window[this.conf.autoload[c]]) == "function") {
					this.attachEvent(c, window[this.conf.autoload[c]])
				}
			}
		}
	}
	if (this.conf.autoload.top_text != null) {
		this.setTopText(this.conf.autoload.top_text)
	}
	if (this.conf.autoload.align != null) {
		this.setAlign(this.conf.autoload.align)
	}
	if (this.conf.autoload.open_mode != null) {
		this.setOpenMode(this.conf.autoload.open_mode)
	}
	if (this.conf.autoload.overflow != null) {
		this.setOverflowHeight(this.conf.autoload.overflow)
	}
	for ( var c in this.conf.autoload) {
		this.conf.autoload[c] = null;
		delete this.conf.autoload[c]
	}
	this.conf.autoload = null;
	return this
}
dhtmlXMenuObject.prototype._init = function() {
	if (this._isInited == true) {
		return
	}
	if (this.conf.dload) {
		this._dhxdataload.onBeforeXLS = function() {
			var c = {
				params : {}
			};
			for ( var b in this.conf.dload_params) {
				c.params[b] = this.conf.dload_params[b]
			}
			return c
		};
		this.loadStruct(this.conf.dload_url)
	} else {
		this._initTopLevelMenu();
		this._isInited = true
	}
};
dhtmlXMenuObject.prototype._countVisiblePolygonItems = function(f) {
	var d = 0;
	for ( var b in this.itemPull) {
		var c = this.itemPull[b]["parent"];
		var e = this.itemPull[b]["type"];
		if (this.idPull[b] != null) {
			if (c == f && (e == "item" || e == "radio" || e == "checkbox")
					&& this.idPull[b].style.display != "none") {
				d++
			}
		}
	}
	return d
};
dhtmlXMenuObject.prototype._redefineComplexState = function(b) {
	if (this.idPrefix + this.topId == b) {
		return
	}
	if ((this.idPull["polygon_" + b] != null) && (this.idPull[b] != null)) {
		var a = this._countVisiblePolygonItems(b);
		if ((a > 0) && (!this.itemPull[b]["complex"])) {
			this._updateItemComplexState(b, true, false)
		}
		if ((a == 0) && (this.itemPull[b]["complex"])) {
			this._updateItemComplexState(b, false, false)
		}
	}
};
dhtmlXMenuObject.prototype._updateItemComplexState = function(e, c, d) {
	if ((!this.conf.context)
			&& (this._getItemLevelType(e.replace(this.idPrefix, "")) == "TopLevel")) {
		this.itemPull[e]["complex"] = c;
		return
	}
	if ((this.idPull[e] == null) || (this.itemPull[e] == null)) {
		return
	}
	this.itemPull[e]["complex"] = c;
	if (e == this.idPrefix + this.topId) {
		return
	}
	var a = null;
	var b = this.idPull[e].childNodes[this.conf.rtl ? 0 : 2];
	if (b.childNodes[0]) {
		if (String(b.childNodes[0].className).search("complex_arrow") === 0) {
			a = b.childNodes[0]
		}
	}
	if (this.itemPull[e]["complex"]) {
		if (a == null) {
			a = document.createElement("DIV");
			a.className = "complex_arrow";
			a.id = "arrow_" + e;
			while (b.childNodes.length > 0) {
				b.removeChild(b.childNodes[0])
			}
			b.appendChild(a)
		}
		if (this.conf.dload && (this.itemPull[e].loaded == "get")
				&& this.conf.dload_icon) {
			if (a.className != "complex_arrow_loading") {
				a.className = "complex_arrow_loading"
			}
		} else {
			a.className = "complex_arrow"
		}
		return
	}
	if ((!this.itemPull[e]["complex"]) && (a != null)) {
		b.removeChild(a);
		if (this.itemPull[e]["hotkey_backup"] != null && this.setHotKey) {
			this.setHotKey(e.replace(this.idPrefix, ""),
					this.itemPull[e]["hotkey_backup"])
		}
	}
};
dhtmlXMenuObject.prototype._getItemLevelType = function(a) {
	return (this.itemPull[this.idPrefix + a]["parent"] == this.idPrefix
			+ this.topId ? "TopLevel" : "SubLevelArea")
};
dhtmlXMenuObject.prototype.setIconsPath = function(a) {
	this.conf.icons_path = a
};
dhtmlXMenuObject.prototype._updateItemImage = function(c, d) {
	c = this.idPrefix + c;
	var f = (this.itemPull[c]["parent"] == this.idPrefix + this.topId && !this.conf.context);
	var g = null;
	if (f) {
		for (var a = 0; a < this.idPull[c].childNodes.length; a++) {
			try {
				if (this.idPull[c].childNodes[a].className == "dhtmlxMenu_TopLevel_Item_Icon") {
					g = this.idPull[c].childNodes[a]
				}
			} catch (h) {
			}
		}
	} else {
		try {
			var g = this.idPull[c].childNodes[this.conf.rtl ? 2 : 0].childNodes[0]
		} catch (h) {
		}
		if (!(g != null && typeof (g.className) != "undefined" && g.className == "sub_icon")) {
			g = null
		}
	}
	if (this.itemPull[c]["type"] == "radio") {
		var j = this.itemPull[c][(this.itemPull[c]["state"] == "enabled" ? "imgen"
				: "imgdis")]
	} else {
		var j = this.itemPull[c][(this.itemPull[c]["state"] == "enabled" ? "imgen"
				: "imgdis")]
	}
	if (j.length > 0) {
		if (g != null) {
			g.src = this.conf.icons_path + j
		} else {
			if (f) {
				var g = document.createElement("IMG");
				g.className = "dhtmlxMenu_TopLevel_Item_Icon";
				g.src = this.conf.icons_path + j;
				g.border = "0";
				g.id = "image_" + c;
				if (!this.conf.rtl && this.idPull[c].childNodes.length > 0) {
					this.idPull[c]
							.insertBefore(g, this.idPull[c].childNodes[0])
				} else {
					this.idPull[c].appendChild(g)
				}
			} else {
				var g = document.createElement("IMG");
				g.className = "sub_icon";
				g.src = this.conf.icons_path + j;
				g.border = "0";
				g.id = "image_" + c;
				var i = this.idPull[c].childNodes[this.conf.rtl ? 2 : 0];
				while (i.childNodes.length > 0) {
					i.removeChild(i.childNodes[0])
				}
				i.appendChild(g)
			}
		}
	} else {
		if (g != null) {
			var b = g.parentNode;
			b.removeChild(g);
			b.innerHTML = "&nbsp;";
			b = g = null
		}
	}
};
dhtmlXMenuObject.prototype._getAllParents = function(f) {
	var c = new Array();
	for ( var b in this.itemPull) {
		if (this.itemPull[b]["parent"] == f) {
			c[c.length] = this.itemPull[b]["id"];
			if (this.itemPull[b]["complex"]) {
				var d = this._getAllParents(this.itemPull[b]["id"]);
				for (var e = 0; e < d.length; e++) {
					c[c.length] = d[e]
				}
			}
		}
	}
	return c
};
dhtmlXMenuObject.prototype._autoDetectVisibleArea = function() {
	if (this.conf.v_enabled) {
		return
	}
	var a = window.dhx4.screenDim();
	this.conf.v.x1 = a.left;
	this.conf.v.x2 = a.right;
	this.conf.v.y1 = a.top;
	this.conf.v.y2 = a.bottom
};
dhtmlXMenuObject.prototype.getItemPosition = function(e) {
	e = this.idPrefix + e;
	var d = -1;
	if (this.itemPull[e] == null) {
		return d
	}
	var a = this.itemPull[e]["parent"];
	var c = (this.idPull["polygon_" + a] != null ? this.idPull["polygon_" + a].tbd
			: this.cont);
	for (var b = 0; b < c.childNodes.length; b++) {
		if (c.childNodes[b] == this.idPull["separator_" + e]
				|| c.childNodes[b] == this.idPull[e]) {
			d = b
		}
	}
	return d
};
dhtmlXMenuObject.prototype.setItemPosition = function(g, f) {
	g = this.idPrefix + g;
	if (this.idPull[g] == null) {
		return
	}
	var b = (this.itemPull[g]["parent"] == this.idPrefix + this.topId);
	var a = this.idPull[g];
	var d = this.getItemPosition(g.replace(this.idPrefix, ""));
	var c = this.itemPull[g]["parent"];
	var e = (this.idPull["polygon_" + c] != null ? this.idPull["polygon_" + c].tbd
			: this.cont);
	e.removeChild(e.childNodes[d]);
	if (f < 0) {
		f = 0
	}
	if (b && f < 1) {
		f = 1
	}
	if (f < e.childNodes.length) {
		e.insertBefore(a, e.childNodes[f])
	} else {
		e.appendChild(a)
	}
};
dhtmlXMenuObject.prototype.getParentId = function(a) {
	a = this.idPrefix + a;
	if (this.itemPull[a] == null) {
		return null
	}
	return ((this.itemPull[a]["parent"] != null ? this.itemPull[a]["parent"]
			: this.topId).replace(this.idPrefix, ""))
};
dhtmlXMenuObject.prototype.hide = function() {
	this._clearAndHide()
};
dhtmlXMenuObject.prototype.clearAll = function() {
	this.removeItem(this.idPrefix + this.topId, true);
	this._isInited = false;
	this.idPrefix = this._genStr(12) + "_";
	this.itemPull = {}
};
if (typeof (dhtmlXMenuObject.prototype.liveInst) == "undefined") {
	dhtmlXMenuObject.prototype.liveInst = {}
}
dhtmlXMenuObject.prototype._redistribTopLevelSelection = function(d, b) {
	var a = this._getSubItemToDeselectByPolygon("parent");
	this._removeSubItemFromSelected(-1, -1);
	for (var c = 0; c < a.length; c++) {
		if (a[c] != d) {
			this._hidePolygon(a[c])
		}
		if ((this.idPull[a[c]] != null) && (a[c] != d)) {
			this.idPull[a[c]].className = this.idPull[a[c]].className.replace(
					/Selected/g, "Normal")
		}
	}
	if (this.itemPull[this.idPrefix + d]["state"] == "enabled") {
		this.idPull[this.idPrefix + d].className = "dhtmlxMenu_"
				+ this.conf.skin + "_TopLevel_Item_Selected";
		this._addSubItemToSelected(this.idPrefix + d, "parent");
		this.conf.selected = (this.conf.mode == "win" ? (this.conf.selected != -1 ? d
				: this.conf.selected)
				: d);
		if ((this.itemPull[this.idPrefix + d]["complex"])
				&& (this.conf.selected != -1)) {
			this._showPolygon(this.idPrefix + d, this.conf.dir_toplv)
		}
	}
};
dhtmlXMenuObject.prototype._initTopLevelMenu = function() {
	this.conf.dir_toplv = "bottom";
	this.conf.dir_sublv = (this.conf.rtl ? "left" : "right");
	if (this.conf.context) {
		this.idPull[this.idPrefix + this.topId] = new Array(0, 0);
		this._addSubMenuPolygon(this.idPrefix + this.topId, this.idPrefix
				+ this.topId)
	} else {
		var a = this._getMenuNodes(this.idPrefix + this.topId);
		for (var b = 0; b < a.length; b++) {
			if (this.itemPull[a[b]]["type"] == "item") {
				this._renderToplevelItem(a[b], null)
			}
			if (this.itemPull[a[b]]["type"] == "separator") {
				this._renderSeparator(a[b], null)
			}
		}
	}
};
dhtmlXMenuObject.prototype._renderToplevelItem = function(g, f) {
	var e = this;
	var a = document.createElement("DIV");
	a.id = g;
	if (this.itemPull[g]["state"] == "enabled"
			&& this.itemPull[g]["cssNormal"] != null) {
		a.className = this.itemPull[g]["cssNormal"]
	} else {
		a.className = "dhtmlxMenu_"
				+ this.conf.skin
				+ "_TopLevel_Item_"
				+ (this.itemPull[g]["state"] == "enabled" ? "Normal"
						: "Disabled")
	}
	if (this.itemPull[g]["title"] != "") {
		var d = document.createElement("DIV");
		d.className = "top_level_text";
		d.innerHTML = this.itemPull[g]["title"];
		a.appendChild(d)
	}
	if (this.itemPull[g]["tip"].length > 0) {
		a.title = this.itemPull[g]["tip"]
	}
	if ((this.itemPull[g]["imgen"] != "") || (this.itemPull[g]["imgdis"] != "")) {
		var c = this.itemPull[g][(this.itemPull[g]["state"] == "enabled") ? "imgen"
				: "imgdis"];
		if (c) {
			var b = document.createElement("IMG");
			b.border = "0";
			b.id = "image_" + g;
			b.src = this.conf.icons_path + c;
			b.className = "dhtmlxMenu_TopLevel_Item_Icon";
			if (a.childNodes.length > 0 && !this.conf.rtl) {
				a.insertBefore(b, a.childNodes[0])
			} else {
				a.appendChild(b)
			}
		}
	}
	a.onselectstart = function(h) {
		h = h || event;
		if (h.preventDefault) {
			h.preventDefault()
		} else {
			h.returnValue = false
		}
		return false
	};
	a.oncontextmenu = function(h) {
		h = h || event;
		if (h.preventDefault) {
			h.preventDefault()
		} else {
			h.returnValue = false
		}
		return false
	};
	if (!this.cont) {
		this.cont = document.createElement("DIV");
		this.cont.dir = "ltr";
		this.cont.className = (this.conf.align == "right" ? "align_right"
				: "align_left");
		this.base.appendChild(this.cont)
	}
	if (f != null) {
		f++;
		if (f < 0) {
			f = 0
		}
		if (f > this.cont.childNodes.length - 1) {
			f = null
		}
	}
	if (f != null) {
		this.cont.insertBefore(a, this.cont.childNodes[f])
	} else {
		this.cont.appendChild(a)
	}
	this.idPull[a.id] = a;
	if (this.itemPull[g]["complex"] && (!this.conf.dload)) {
		this._addSubMenuPolygon(this.itemPull[g]["id"], this.itemPull[g]["id"])
	}
	a.onmouseover = function() {
		if (e.conf.mode == "web") {
			window.clearTimeout(e.conf.tm_handler)
		}
		var h = e._getSubItemToDeselectByPolygon("parent");
		e._removeSubItemFromSelected(-1, -1);
		for (var k = 0; k < h.length; k++) {
			if (h[k] != this.id) {
				e._hidePolygon(h[k])
			}
			if ((e.idPull[h[k]] != null) && (h[k] != this.id)) {
				if (e.itemPull[h[k]]["cssNormal"] != null) {
					e.idPull[h[k]].className = e.itemPull[h[k]]["cssNormal"]
				} else {
					if (e.idPull[h[k]].className == "sub_item_selected") {
						e.idPull[h[k]].className = "sub_item"
					}
					e.idPull[h[k]].className = e.idPull[h[k]].className
							.replace(/Selected/g, "Normal")
				}
			}
		}
		if (e.itemPull[this.id]["state"] == "enabled") {
			this.className = "dhtmlxMenu_" + e.conf.skin
					+ "_TopLevel_Item_Selected";
			e._addSubItemToSelected(this.id, "parent");
			e.conf.selected = (e.conf.mode == "win" ? (e.conf.selected != -1 ? this.id
					: e.conf.selected)
					: this.id);
			if (e.conf.dload) {
				if (e.itemPull[this.id].loaded == "no") {
					this._dynLoadTM = new Date().getTime();
					e.itemPull[this.id].loaded = "get";
					var l = this.id.replace(e.idPrefix, "");
					e._dhxdataload.onBeforeXLS = function() {
						var m = {
							params : {}
						};
						m.params[this.conf.dload_pid] = l;
						for ( var i in this.conf.dload_params) {
							m.params[i] = this.conf.dload_params[i]
						}
						return m
					};
					e.loadStruct(e.conf.dload_url)
				}
				if (e.conf.top_mode && e.conf.mode == "web" && !e.conf.context) {
					this._mouseOver = true
				}
			}
			if ((!e.conf.dload)
					|| (e.conf.dload && (!e.itemPull[this.id]["loaded"] || e.itemPull[this.id]["loaded"] == "yes"))) {
				if ((e.itemPull[this.id]["complex"]) && (e.conf.selected != -1)) {
					if (e.conf.top_mode && e.conf.mode == "web"
							&& !e.conf.context) {
						this._mouseOver = true;
						var j = this.id;
						this._menuOpenTM = window.setTimeout(function() {
							e._showPolygon(j, e.conf.dir_toplv)
						}, e.conf.top_tmtime)
					} else {
						e._showPolygon(this.id, e.conf.dir_toplv)
					}
				}
			}
		}
		e._doOnTouchMenu(this.id.replace(e.idPrefix, ""))
	};
	a.onmouseout = function() {
		if (!((e.itemPull[this.id]["complex"]) && (e.conf.selected != -1))
				&& (e.itemPull[this.id]["state"] == "enabled")) {
			if (e.itemPull[this.id]["cssNormal"] != null) {
				a.className = e.itemPull[this.id]["cssNormal"]
			} else {
				a.className = "dhtmlxMenu_" + e.conf.skin
						+ "_TopLevel_Item_Normal"
			}
		}
		if (e.conf.mode == "web") {
			window.clearTimeout(e.conf.tm_handler);
			e.conf.tm_handler = window.setTimeout(function() {
				e._clearAndHide()
			}, e.conf.tm_sec, "JavaScript")
		}
		if (e.conf.top_mode && e.conf.mode == "web" && !e.conf.context) {
			this._mouseOver = false;
			window.clearTimeout(this._menuOpenTM)
		}
	};
	a.onclick = function(k) {
		if (e.conf.mode == "web") {
			window.clearTimeout(e.conf.tm_handler)
		}
		if (e.conf.mode != "web" && e.itemPull[this.id]["state"] == "disabled") {
			return
		}
		k = k || event;
		k.cancelBubble = true;
		if (k.preventDefault) {
			k.preventDefault()
		} else {
			k.returnValue = false
		}
		if (e.conf.mode == "win") {
			if (e.itemPull[this.id]["complex"]) {
				if (e.conf.selected == this.id) {
					e.conf.selected = -1;
					var j = false
				} else {
					e.conf.selected = this.id;
					var j = true
				}
				if (j) {
					e._showPolygon(this.id, e.conf.dir_toplv)
				} else {
					e._hidePolygon(this.id)
				}
			}
		}
		var h = (e.itemPull[this.id]["complex"] ? "c" : "-");
		var l = (e.itemPull[this.id]["state"] != "enabled" ? "d" : "-");
		var i = {
			ctrl : k.ctrlKey,
			alt : k.altKey,
			shift : k.shiftKey
		};
		e._doOnClick(this.id.replace(e.idPrefix, ""), h + l + "t", i);
		return false
	};
	if (this.conf.skin == "dhx_terrace") {
		this._improveTerraceSkin()
	}
};
dhtmlXMenuObject.prototype._addSubMenuPolygon = function(f, e) {
	var b = this._renderSublevelPolygon(f, e);
	var a = this._getMenuNodes(e);
	for (c = 0; c < a.length; c++) {
		if (this.itemPull[a[c]]["type"] == "separator") {
			this._renderSeparator(a[c], null)
		} else {
			this._renderSublevelItem(a[c], null)
		}
	}
	if (f == e) {
		var d = "topLevel"
	} else {
		var d = "subLevel"
	}
	for (var c = 0; c < a.length; c++) {
		if (this.itemPull[a[c]]["complex"]) {
			this._addSubMenuPolygon(f, this.itemPull[a[c]]["id"])
		}
	}
};
dhtmlXMenuObject.prototype._renderSublevelPolygon = function(e, d) {
	var b = document.createElement("DIV");
	b.className = "dhtmlxMenu_" + this.conf.skin + "_SubLevelArea_Polygon "
			+ (this.conf.rtl ? "dir_right" : "");
	b.dir = "ltr";
	b.oncontextmenu = function(f) {
		f = f || event;
		if (f.preventDefault) {
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		f.cancelBubble = true;
		return false
	};
	b.id = "polygon_" + d;
	b.onclick = function(f) {
		f = f || event;
		f.cancelBubble = true
	};
	b.style.display = "none";
	document.body.insertBefore(b, document.body.firstChild);
	b.innerHTML = '<div style="position:relative;"></div><div style="position: relative; overflow:hidden;"></div><div style="position:relative;"></div>';
	var c = document.createElement("TABLE");
	c.className = "dhtmlxMebu_SubLevelArea_Tbl";
	c.cellSpacing = 0;
	c.cellPadding = 0;
	c.border = 0;
	var a = document.createElement("TBODY");
	c.appendChild(a);
	b.childNodes[1].appendChild(c);
	b.tbl = c;
	b.tbd = a;
	this.idPull[b.id] = b;
	if (this.sxDacProc != null) {
		this.idPull["sxDac_" + d] = new this.sxDacProc(b, b.className);
		if (window.dhx4.isIE) {
			this.idPull["sxDac_" + d]._setSpeed(this.dacSpeedIE);
			this.idPull["sxDac_" + d]._setCustomCycle(this.dacCyclesIE)
		} else {
			this.idPull["sxDac_" + d]._setSpeed(this.dacSpeed);
			this.idPull["sxDac_" + d]._setCustomCycle(this.dacCycles)
		}
	}
	return b
};
dhtmlXMenuObject.prototype._renderSublevelItem = function(a, j) {
	var h = this;
	var i = document.createElement("TR");
	i.className = (this.itemPull[a]["state"] == "enabled" ? "sub_item"
			: "sub_item_dis");
	var g = document.createElement("TD");
	g.className = "sub_item_icon";
	var k = this.itemPull[a][(this.itemPull[a]["state"] == "enabled" ? "imgen"
			: "imgdis")];
	if (k != "") {
		var n = this.itemPull[a]["type"];
		if (n == "checkbox" || n == "radio") {
			var e = document.createElement("DIV");
			e.id = "image_" + this.itemPull[a]["id"];
			e.className = "sub_icon " + k;
			g.appendChild(e)
		}
		if (!(n == "checkbox" || n == "radio")) {
			var e = document.createElement("IMG");
			e.id = "image_" + this.itemPull[a]["id"];
			e.className = "sub_icon";
			e.src = this.conf.icons_path + k;
			g.appendChild(e)
		}
	} else {
		g.innerHTML = "&nbsp;"
	}
	var f = document.createElement("TD");
	f.className = "sub_item_text";
	if (this.itemPull[a]["title"] != "") {
		var m = document.createElement("DIV");
		m.className = "sub_item_text";
		m.innerHTML = this.itemPull[a]["title"];
		f.appendChild(m)
	} else {
		f.innerHTML = "&nbsp;"
	}
	var d = document.createElement("TD");
	d.className = "sub_item_hk";
	if (this.itemPull[a]["complex"]) {
		var b = document.createElement("DIV");
		b.className = "complex_arrow";
		b.id = "arrow_" + this.itemPull[a]["id"];
		d.appendChild(b)
	} else {
		if (this.itemPull[a]["hotkey"].length > 0
				&& !this.itemPull[a]["complex"]) {
			var c = document.createElement("DIV");
			c.className = "sub_item_hk";
			c.innerHTML = this.itemPull[a]["hotkey"];
			d.appendChild(c)
		} else {
			d.innerHTML = "&nbsp;"
		}
	}
	i.appendChild(this.conf.rtl ? d : g);
	i.appendChild(f);
	i.appendChild(this.conf.rtl ? g : d);
	i.id = this.itemPull[a]["id"];
	i.parent = this.itemPull[a]["parent"];
	if (this.itemPull[a]["tip"].length > 0) {
		i.title = this.itemPull[a]["tip"]
	}
	i.onselectstart = function(o) {
		o = o || event;
		if (o.preventDefault) {
			o.preventDefault()
		} else {
			o.returnValue = false
		}
		return false
	};
	i.onmouseover = function(o) {
		if (h.conf.hide_tm[this.id]) {
			window.clearTimeout(h.conf.hide_tm[this.id])
		}
		if (h.conf.mode == "web") {
			window.clearTimeout(h.conf.tm_handler)
		}
		if (!this._visible) {
			h._redistribSubLevelSelection(this.id, this.parent)
		}
		this._visible = true
	};
	i.onmouseout = function() {
		if (h.conf.mode == "web") {
			if (h.conf.tm_handler) {
				window.clearTimeout(h.conf.tm_handler)
			}
			h.conf.tm_handler = window.setTimeout(function() {
				if (h && h._clearAndHide) {
					h._clearAndHide()
				}
			}, h.conf.tm_sec, "JavaScript")
		}
		var o = this;
		if (h.conf.hide_tm[this.id]) {
			window.clearTimeout(h.conf.hide_tm[this.id])
		}
		h.conf.hide_tm[this.id] = window.setTimeout(function() {
			o._visible = false
		}, 50)
	};
	i.onclick = function(p) {
		if (!h.checkEvent("onClick") && h.itemPull[this.id]["complex"]) {
			return
		}
		p = p || event;
		p.cancelBubble = true;
		if (p.preventDefault) {
			p.preventDefault()
		} else {
			p.returnValue = false
		}
		tc = (h.itemPull[this.id]["complex"] ? "c" : "-");
		td = (h.itemPull[this.id]["state"] == "enabled" ? "-" : "d");
		var o = {
			ctrl : p.ctrlKey,
			alt : p.altKey,
			shift : p.shiftKey
		};
		switch (h.itemPull[this.id]["type"]) {
		case "checkbox":
			h._checkboxOnClickHandler(this.id.replace(h.idPrefix, ""), tc + td
					+ "n", o);
			break;
		case "radio":
			h._radioOnClickHandler(this.id.replace(h.idPrefix, ""), tc + td
					+ "n", o);
			break;
		case "item":
			h._doOnClick(this.id.replace(h.idPrefix, ""), tc + td + "n", o);
			break
		}
		return false
	};
	var l = this.idPull["polygon_" + this.itemPull[a]["parent"]];
	if (j != null) {
		j++;
		if (j < 0) {
			j = 0
		}
		if (j > l.tbd.childNodes.length - 1) {
			j = null
		}
	}
	if (j != null && l.tbd.childNodes[j] != null) {
		l.tbd.insertBefore(i, l.tbd.childNodes[j])
	} else {
		l.tbd.appendChild(i)
	}
	this.idPull[i.id] = i
};
dhtmlXMenuObject.prototype._renderSeparator = function(b, g) {
	var a = (this.conf.context ? "SubLevelArea"
			: (this.itemPull[b]["parent"] == this.idPrefix + this.topId ? "TopLevel"
					: "SubLevelArea"));
	if (a == "TopLevel" && this.conf.context) {
		return
	}
	var e = this;
	if (a != "TopLevel") {
		var f = document.createElement("TR");
		f.className = "sub_sep";
		var c = document.createElement("TD");
		c.colSpan = "3";
		f.appendChild(c)
	}
	var d = document.createElement("DIV");
	d.id = "separator_" + b;
	d.className = (a == "TopLevel" ? "top_sep" : "sub_sep");
	d.onselectstart = function(j) {
		j = j || event;
		if (j.preventDefault) {
			j.preventDefault()
		} else {
			j.returnValue = false
		}
	};
	d.onclick = function(k) {
		k = k || event;
		k.cancelBubble = true;
		var j = {
			ctrl : k.ctrlKey,
			alt : k.altKey,
			shift : k.shiftKey
		};
		e._doOnClick(this.id.replace("separator_" + e.idPrefix, ""), "--s", j)
	};
	if (a == "TopLevel") {
		if (g != null) {
			g++;
			if (g < 0) {
				g = 0
			}
			if (this.cont.childNodes[g] != null) {
				this.cont.insertBefore(d, this.cont.childNodes[g])
			} else {
				this.cont.appendChild(d)
			}
		} else {
			var i = this.cont.childNodes[this.cont.childNodes.length - 1];
			if (String(i).search("TopLevel_Text") == -1) {
				this.cont.appendChild(d)
			} else {
				this.cont.insertBefore(d, i)
			}
		}
		this.idPull[d.id] = d
	} else {
		var h = this.idPull["polygon_" + this.itemPull[b]["parent"]];
		if (g != null) {
			g++;
			if (g < 0) {
				g = 0
			}
			if (g > h.tbd.childNodes.length - 1) {
				g = null
			}
		}
		if (g != null && h.tbd.childNodes[g] != null) {
			h.tbd.insertBefore(f, h.tbd.childNodes[g])
		} else {
			h.tbd.appendChild(f)
		}
		c.appendChild(d);
		this.idPull[d.id] = f
	}
};
dhtmlXMenuObject.prototype.addNewSeparator = function(a, b) {
	b = this.idPrefix + (b != null ? b : this._genStr(24));
	var c = this.idPrefix + this.getParentId(a);
	this._addItemIntoGlobalStrorage(b, c, "", "separator", false, "", "");
	this._renderSeparator(b, this.getItemPosition(a))
};
dhtmlXMenuObject.prototype._initObj = function(l, m, g) {
	if (!(l instanceof Array)) {
		g = l.parentId;
		if (g != null && String(g).indexOf(this.idPrefix) !== 0) {
			g = this.idPrefix + String(g)
		}
		l = l.items
	}
	for (var c = 0; c < l.length; c++) {
		if (typeof (l[c].id) == "undefined" || l[c].id == null) {
			l[c].id = this._genStr(24)
		}
		if (String(l[c].id).indexOf(this.idPrefix) !== 0) {
			l[c].id = this.idPrefix + String(l[c].id)
		}
		var d = {
			type : "item",
			tip : "",
			hotkey : "",
			state : "enabled",
			imgen : "",
			imgdis : ""
		};
		for ( var n in d) {
			if (typeof (l[c][n]) == "undefined") {
				l[c][n] = d[n]
			}
		}
		if (l[c].imgen == "" && l[c].img != null) {
			l[c].imgen = l[c].img
		}
		if (l[c].imgdis == "" && l[c].img_disabled != null) {
			l[c].imgdis = l[c].img_disabled
		}
		if (l[c].title == null && l[c].text != null) {
			l[c].title = l[c].text
		}
		if (l[c].href != null) {
			if (l[c].href.link != null) {
				l[c].href_link = l[c].href.link
			}
			if (l[c].href.target != null) {
				l[c].href_target = l[c].href.target
			}
		}
		if (l[c].userdata != null) {
			for ( var n in l[c].userdata) {
				this.userData[l[c].id + "_" + n] = l[c].userdata[n]
			}
		}
		if (typeof (l[c].enabled) != "undefined"
				&& window.dhx4.s2b(l[c].enabled) == false) {
			l[c].state = "disabled"
		} else {
			if (typeof (l[c].disabled) != "undefined"
					&& window.dhx4.s2b(l[c].disabled) == true) {
				l[c].state = "disabled"
			}
		}
		if (typeof (l[c].parent) == "undefined") {
			l[c].parent = (g != null ? g : this.idPrefix + this.topId)
		}
		if (l[c].type == "checkbox") {
			l[c].checked = window.dhx4.s2b(l[c].checked);
			l[c].imgen = l[c].imgdis = "chbx_" + (l[c].checked ? "1" : "0")
		}
		if (l[c].type == "radio") {
			l[c].checked = window.dhx4.s2b(l[c].checked);
			l[c].imgen = l[c].imgdis = "rdbt_" + (l[c].checked ? "1" : "0");
			if (typeof (l[c].group) == "undefined" || l[c].group == null) {
				l[c].group = this._genStr(24)
			}
			if (this.radio[l[c].group] == null) {
				this.radio[l[c].group] = []
			}
			this.radio[l[c].group].push(l[c].id)
		}
		this.itemPull[l[c].id] = l[c];
		if (l[c].items != null && l[c].items.length > 0) {
			this.itemPull[l[c].id].complex = true;
			this._initObj(l[c].items, true, l[c].id)
		} else {
			if (this.conf.dload && l[c].complex == true) {
				this.itemPull[l[c].id].loaded = "no"
			}
		}
		this.itemPull[l[c].id].items = null
	}
	if (m !== true) {
		if (this.conf.dload == true) {
			if (g == null) {
				this._initTopLevelMenu()
			} else {
				this._addSubMenuPolygon(g, g);
				if (this.conf.selected == g) {
					var j = (this.itemPull[g].parent == this.idPrefix
							+ this.topId);
					var b = (j && !this.conf.context ? this.conf.dir_toplv
							: this.conf.dir_sublv);
					var e = false;
					if (j && this.conf.top_mode && this.conf.mode == "web"
							&& !this.conf.context) {
						var o = this.idPull[g];
						if (o._mouseOver == true) {
							var f = this.conf.top_tmtime
									- (new Date().getTime() - o._dynLoadTM);
							if (f > 1) {
								var i = g;
								var h = this;
								o._menuOpenTM = window.setTimeout(function() {
									h._showPolygon(i, b);
									h = i = null
								}, f);
								e = true
							}
						}
					}
					if (!e) {
						this._showPolygon(g, b)
					}
				}
				this.itemPull[g].loaded = "yes";
				if (this.conf.dload_icon == true) {
					this._updateLoaderIcon(g, false)
				}
			}
		} else {
			this._init()
		}
	}
};
dhtmlXMenuObject.prototype._xmlToJson = function(f, e) {
	var h = [];
	if (e == null) {
		var j = f.getElementsByTagName(this.conf.tags.root);
		if (j == null || j.length == 0) {
			return data
		}
		j = j[0]
	} else {
		j = f
	}
	if (j.getAttribute("parentId") != null) {
		e = this.idPrefix + j.getAttribute("parentId")
	}
	for (var b = 0; b < j.childNodes.length; b++) {
		if (typeof (j.childNodes[b].tagName) != "undefined"
				&& String(j.childNodes[b].tagName).toLowerCase() == this.conf.tags.item) {
			var a = j.childNodes[b];
			var m = {
				id : this.idPrefix + (a.getAttribute("id") || this._genStr(24)),
				title : a.getAttribute("text") || "",
				imgen : a.getAttribute("img") || "",
				imgdis : a.getAttribute("imgdis") || "",
				tip : "",
				hotkey : "",
				type : a.getAttribute("type") || "item"
			};
			if (a.getAttribute("cssNormal") != null) {
				m.cssNormal = a.getAttribute("cssNormal")
			}
			if (m.type == "checkbox") {
				m.checked = a.getAttribute("checked")
			}
			if (m.type == "radio") {
				m.checked = a.getAttribute("checked");
				m.group = a.getAttribute("group")
			}
			m.state = "enabled";
			if (a.getAttribute("enabled") != null
					&& window.dhx4.s2b(a.getAttribute("enabled")) == false) {
				m.state = "disabled"
			} else {
				if (a.getAttribute("disabled") != null
						&& window.dhx4.s2b(a.getAttribute("disabled")) == true) {
					m.state = "disabled"
				}
			}
			m.parent = (e != null ? e : this.idPrefix + this.topId);
			if (this.conf.dload) {
				m.complex = (a.getAttribute("complex") != null);
				if (m.complex) {
					m.loaded = "no"
				}
			} else {
				var c = this._xmlToJson(a, m.id);
				m.items = c.items;
				m.complex = (m.items.length > 0)
			}
			for (var k = 0; k < a.childNodes.length; k++) {
				if (typeof (a.childNodes[k].tagName) != "undefined") {
					var l = String(a.childNodes[k].tagName || "").toLowerCase();
					if (l == this.conf.tags.userdata) {
						var g = a.childNodes[k];
						if (g.getAttribute("name") != null) {
							this.userData[m.id + "_" + g.getAttribute("name")] = (g.firstChild != null
									&& g.firstChild.nodeValue != null ? g.firstChild.nodeValue
									: "")
						}
					}
					if (l == this.conf.tags.text_ext) {
						m.title = a.childNodes[k].firstChild.nodeValue
					}
					if (l == this.conf.tags.tooltip) {
						m.tip = a.childNodes[k].firstChild.nodeValue
					}
					if (l == this.conf.tags.hotkey) {
						m.hotkey = a.childNodes[k].firstChild.nodeValue
					}
					if (l == this.conf.tags.href && m.type == "item") {
						m.href_link = a.childNodes[k].firstChild.nodeValue;
						if (a.childNodes[k].getAttribute("target") != null) {
							m.href_target = a.childNodes[k]
									.getAttribute("target")
						}
					}
				}
			}
			h.push(m)
		}
	}
	var a = {
		parentId : e,
		items : h
	};
	return a
};
dhtmlXMenuObject.prototype.enableDynamicLoading = function(a, b) {
	this.conf.dload = true;
	this.conf.dload_url = a;
	this.conf.dload_sign = (String(this.conf.dload_url).search(/\?/) == -1 ? "?"
			: "&");
	this.conf.dload_icon = b;
	this._init()
};
dhtmlXMenuObject.prototype._updateLoaderIcon = function(d, c) {
	if (this.idPull[d] == null) {
		return
	}
	if (String(this.idPull[d].className).search("TopLevel_Item") >= 0) {
		return
	}
	var b = (this.conf.rtl ? 0 : 2);
	if (!this.idPull[d].childNodes[b]) {
		return
	}
	if (!this.idPull[d].childNodes[b].childNodes[0]) {
		return
	}
	var a = this.idPull[d].childNodes[b].childNodes[0];
	if (String(a.className).search("complex_arrow") === 0) {
		a.className = "complex_arrow" + (c ? "_loading" : "")
	}
};
dhtmlXMenuObject.prototype.addNewSibling = function(d, e, a, b, c, h) {
	var g = this.idPrefix + (e != null ? e : this._genStr(24));
	var f = this.idPrefix + (d != null ? this.getParentId(d) : this.topId);
	this._addItemIntoGlobalStrorage(g, f, a, "item", b, c, h);
	if ((f == this.idPrefix + this.topId) && (!this.conf.context)) {
		this._renderToplevelItem(g, this.getItemPosition(d))
	} else {
		this._renderSublevelItem(g, this.getItemPosition(d))
	}
};
dhtmlXMenuObject.prototype.addNewChild = function(g, f, d, a, b, c, e) {
	if (g == null) {
		if (this.conf.context) {
			g = this.topId
		} else {
			this.addNewSibling(g, d, a, b, c, e);
			if (f != null) {
				this.setItemPosition(d, f)
			}
			return
		}
	}
	d = this.idPrefix + (d != null ? d : this._genStr(24));
	if (this.setHotKey) {
		this.setHotKey(g, "")
	}
	g = this.idPrefix + g;
	this._addItemIntoGlobalStrorage(d, g, a, "item", b, c, e);
	if (this.idPull["polygon_" + g] == null) {
		this._renderSublevelPolygon(g, g)
	}
	this._renderSublevelItem(d, f - 1);
	this._redefineComplexState(g)
};
dhtmlXMenuObject.prototype.removeItem = function(d, f, e) {
	if (!f) {
		d = this.idPrefix + d
	}
	var g = null;
	if (d != this.idPrefix + this.topId) {
		if (this.itemPull[d] == null) {
			return
		}
		if (this.idPull["polygon_" + d] && this.idPull["polygon_" + d]._tmShow) {
			window.clearTimeout(this.idPull["polygon_" + d]._tmShow)
		}
		var l = this.itemPull[d]["type"];
		if (l == "separator") {
			var k = this.idPull["separator_" + d];
			if (this.itemPull[d]["parent"] == this.idPrefix + this.topId) {
				k.onclick = null;
				k.onselectstart = null;
				k.id = null;
				k.parentNode.removeChild(k)
			} else {
				k.childNodes[0].childNodes[0].onclick = null;
				k.childNodes[0].childNodes[0].onselectstart = null;
				k.childNodes[0].childNodes[0].id = null;
				k.childNodes[0].removeChild(k.childNodes[0].childNodes[0]);
				k.removeChild(k.childNodes[0]);
				k.parentNode.removeChild(k)
			}
			this.idPull["separator_" + d] = null;
			this.itemPull[d] = null;
			delete this.idPull["separator_" + d];
			delete this.itemPull[d];
			k = null
		} else {
			g = this.itemPull[d]["parent"];
			var k = this.idPull[d];
			k.onclick = null;
			k.oncontextmenu = null;
			k.onmouseover = null;
			k.onmouseout = null;
			k.onselectstart = null;
			k.id = null;
			while (k.childNodes.length > 0) {
				k.removeChild(k.childNodes[0])
			}
			k.parentNode.removeChild(k);
			this.idPull[d] = null;
			this.itemPull[d] = null;
			delete this.idPull[d];
			delete this.itemPull[d];
			k = null
		}
		l = null
	}
	for ( var i in this.itemPull) {
		if (this.itemPull[i]["parent"] == d) {
			this.removeItem(i, true, true)
		}
	}
	var j = new Array(d);
	if (g != null && !e) {
		if (this.idPull["polygon_" + g] != null) {
			if (this.idPull["polygon_" + g].tbd.childNodes.length == 0) {
				j.push(g);
				this._updateItemComplexState(g, false, false)
			}
		}
	}
	for (var b = 0; b < j.length; b++) {
		if (this.idPull["polygon_" + j[b]]) {
			var c = this.idPull["polygon_" + j[b]];
			c.onclick = null;
			c.oncontextmenu = null;
			c.tbl.removeChild(c.tbd);
			c.tbd = null;
			c.childNodes[1].removeChild(c.tbl);
			c.tbl = null;
			c.id = null;
			c.parentNode.removeChild(c);
			c = null;
			if (window.dhx4.isIE6) {
				var h = "polygon_" + j[b] + "_ie6cover";
				if (this.idPull[h] != null) {
					document.body.removeChild(this.idPull[h]);
					delete this.idPull[h]
				}
			}
			if (this.idPull["arrowup_" + d] != null && this._removeArrow) {
				this._removeArrow("arrowup_" + d)
			}
			if (this.idPull["arrowdown_" + d] != null && this._removeArrow) {
				this._removeArrow("arrowdown_" + d)
			}
			this.idPull["polygon_" + j[b]] = null;
			delete this.idPull["polygon_" + j[b]]
		}
	}
	j = null;
	if (this.conf.skin == "dhx_terrace" && arguments.length == 1) {
		this._improveTerraceSkin()
	}
};
dhtmlXMenuObject.prototype._addItemIntoGlobalStrorage = function(h, a, c, g, d,
		b, f) {
	var e = {
		id : h,
		title : c,
		imgen : (b != null ? b : ""),
		imgdis : (f != null ? f : ""),
		type : g,
		state : (d == true ? "disabled" : "enabled"),
		parent : a,
		complex : false,
		hotkey : "",
		tip : ""
	};
	this.itemPull[e.id] = e
};
dhtmlXMenuObject.prototype.renderAsContextMenu = function() {
	this.conf.context = true;
	if (this.base._autoSkinUpdate == true) {
		this.base.className = this.base.className.replace("dhtmlxMenu_"
				+ this.conf.skin + "_Middle", "");
		this.base._autoSkinUpdate = false
	}
	if (this.conf.ctx_baseid != null) {
		this.addContextZone(this.conf.ctx_baseid)
	}
};
dhtmlXMenuObject.prototype.addContextZone = function(b) {
	if (b == document.body) {
		b = "document.body." + this.idPrefix;
		var d = document.body
	} else {
		var d = document.getElementById(b)
	}
	var f = false;
	for ( var c in this.conf.ctx_zones) {
		f = f || (c == b) || (this.conf.ctx_zones[c] == d)
	}
	if (f == true) {
		return false
	}
	this.conf.ctx_zones[b] = d;
	var e = this;
	if (window.dhx4.isOpera) {
		this.operaContext = function(a) {
			e._doOnContextMenuOpera(a, e)
		};
		d.addEventListener("mouseup", this.operaContext, false)
	} else {
		if (d.oncontextmenu != null && !d._oldContextMenuHandler) {
			d._oldContextMenuHandler = d.oncontextmenu
		}
		d.oncontextmenu = function(g) {
			for ( var a in dhtmlXMenuObject.prototype.liveInst) {
				if (a != e.conf.live_id) {
					if (dhtmlXMenuObject.prototype.liveInst[a].context) {
						dhtmlXMenuObject.prototype.liveInst[a]
								._hideContextMenu()
					}
				}
			}
			g = g || event;
			g.cancelBubble = true;
			if (g.preventDefault) {
				g.preventDefault()
			} else {
				g.returnValue = false
			}
			e._doOnContextBeforeCall(g, this);
			return false
		}
	}
};
dhtmlXMenuObject.prototype._doOnContextMenuOpera = function(c, a) {
	for ( var b in dhtmlXMenuObject.prototype.liveInst) {
		if (b != a.conf.live_id) {
			if (dhtmlXMenuObject.prototype.liveInst[b].context) {
				dhtmlXMenuObject.prototype.liveInst[b]._hideContextMenu()
			}
		}
	}
	c.cancelBubble = true;
	if (c.preventDefault) {
		c.preventDefault()
	} else {
		c.returnValue = false
	}
	if (c.button == 0 && c.ctrlKey == true) {
		a._doOnContextBeforeCall(c, this)
	}
	return false
};
dhtmlXMenuObject.prototype.removeContextZone = function(a) {
	if (!this.isContextZone(a)) {
		return false
	}
	if (a == document.body) {
		a = "document.body." + this.idPrefix
	}
	var b = this.conf.ctx_zones[a];
	if (window.dhx4.isOpera) {
		b.removeEventListener("mouseup", this.operaContext, false)
	} else {
		b.oncontextmenu = (b._oldContextMenuHandler != null ? b._oldContextMenuHandler
				: null);
		b._oldContextMenuHandler = null
	}
	try {
		this.conf.ctx_zones[a] = null;
		delete this.conf.ctx_zones[a]
	} catch (c) {
	}
	return true
};
dhtmlXMenuObject.prototype.isContextZone = function(a) {
	if (a == document.body
			&& this.conf.ctx_zones["document.body." + this.idPrefix] != null) {
		return true
	}
	var b = false;
	if (this.conf.ctx_zones[a] != null) {
		if (this.conf.ctx_zones[a] == document.getElementById(a)) {
			b = true
		}
	}
	return b
};
dhtmlXMenuObject.prototype._isContextMenuVisible = function() {
	if (this.idPull["polygon_" + this.idPrefix + this.topId] == null) {
		return false
	}
	return (this.idPull["polygon_" + this.idPrefix + this.topId].style.display == "")
};
dhtmlXMenuObject.prototype._showContextMenu = function(b, c, a) {
	this._clearAndHide();
	if (this.idPull["polygon_" + this.idPrefix + this.topId] == null) {
		return false
	}
	window.clearTimeout(this.conf.tm_handler);
	this.idPull[this.idPrefix + this.topId] = new Array(b, c);
	this._showPolygon(this.idPrefix + this.topId, "bottom");
	this.callEvent("onContextMenu", [ a ])
};
dhtmlXMenuObject.prototype._hideContextMenu = function() {
	if (this.idPull["polygon_" + this.idPrefix + this.topId] == null) {
		return false
	}
	this._clearAndHide();
	this._hidePolygon(this.idPrefix + this.topId)
};
dhtmlXMenuObject.prototype._doOnContextBeforeCall = function(f, h) {
	this.conf.ctx_zoneid = h.id;
	this._clearAndHide();
	this._hideContextMenu();
	var d = (f.srcElement || f.target);
	var b = (window.dhx4.isIE || window.dhx4.isOpera || window.dhx4.isKHTML ? f.offsetX
			: f.layerX);
	var a = (window.dhx4.isIE || window.dhx4.isOpera || window.dhx4.isKHTML ? f.offsetY
			: f.layerY);
	var g = window.dhx4.absLeft(d) + b;
	var c = window.dhx4.absTop(d) + a;
	if (this.checkEvent("onBeforeContextMenu")) {
		if (this.callEvent("onBeforeContextMenu", [ h.id, f ])) {
			if (this.conf.ctx_autoshow) {
				this._showContextMenu(g, c, h.id);
				this.callEvent("onAfterContextMenu", [ h.id, f ])
			}
		}
	} else {
		if (this.conf.ctx_autoshow) {
			this._showContextMenu(g, c, h.id);
			this.callEvent("onAfterContextMenu", [ h.id ])
		}
	}
};
dhtmlXMenuObject.prototype.showContextMenu = function(a, b) {
	this._showContextMenu(a, b, false)
};
dhtmlXMenuObject.prototype.hideContextMenu = function() {
	this._hideContextMenu()
};
dhtmlXMenuObject.prototype.setAutoShowMode = function(a) {
	this.conf.ctx_autoshow = (a == true ? true : false)
};
dhtmlXMenuObject.prototype.setAutoHideMode = function(a) {
	this.conf.ctx_autohide = (a == true ? true : false)
};
dhtmlXMenuObject.prototype.setContextMenuHideAllMode = function(a) {
	this.conf.ctx_hideall = (a == true ? true : false)
};
dhtmlXMenuObject.prototype.getContextMenuHideAllMode = function() {
	return this.conf.ctx_hideall
};
dhtmlXMenuObject.prototype._improveTerraceSkin = function() {
	for ( var d in this.itemPull) {
		if (this.itemPull[d].parent == this.idPrefix + this.topId
				&& this.idPull[d] != null) {
			var f = false;
			var e = false;
			if (this.idPull[d].parentNode.firstChild == this.idPull[d]) {
				f = true
			}
			if (this.idPull[d].parentNode.lastChild == this.idPull[d]) {
				e = true
			}
			for ( var c in this.itemPull) {
				if (this.itemPull[c].type == "separator"
						&& this.itemPull[c].parent == this.idPrefix
								+ this.topId) {
					if (this.idPull[d].nextSibling == this.idPull["separator_"
							+ c]) {
						e = true
					}
					if (this.idPull[d].previousSibling == this.idPull["separator_"
							+ c]) {
						f = true
					}
				}
			}
			this.idPull[d].style.borderLeftWidth = (f ? "1px" : "0px");
			this.idPull[d].style.borderTopLeftRadius = this.idPull[d].style.borderBottomLeftRadius = (f ? "3px"
					: "0px");
			this.idPull[d].style.borderTopRightRadius = this.idPull[d].style.borderBottomRightRadius = (e ? "3px"
					: "0px");
			this.idPull[d]._bl = f;
			this.idPull[d]._br = e
		}
	}
};
dhtmlXMenuObject.prototype._improveTerraceButton = function(b, a) {
	if (a) {
		this.idPull[b].style.borderBottomLeftRadius = (this.idPull[b]._bl ? "3px"
				: "0px");
		this.idPull[b].style.borderBottomRightRadius = (this.idPull[b]._br ? "3px"
				: "0px")
	} else {
		this.idPull[b].style.borderBottomLeftRadius = "0px";
		this.idPull[b].style.borderBottomRightRadius = "0px"
	}
};
dhtmlXMenuObject.prototype.setItemEnabled = function(a) {
	this._changeItemState(a, "enabled", this._getItemLevelType(a))
};
dhtmlXMenuObject.prototype.setItemDisabled = function(a) {
	this._changeItemState(a, "disabled", this._getItemLevelType(a))
};
dhtmlXMenuObject.prototype.isItemEnabled = function(a) {
	return (this.itemPull[this.idPrefix + a] != null ? (this.itemPull[this.idPrefix
			+ a]["state"] == "enabled")
			: false)
};
dhtmlXMenuObject.prototype._changeItemState = function(e, d, b) {
	var c = false;
	var a = this.idPrefix + e;
	if ((this.itemPull[a] != null) && (this.idPull[a] != null)) {
		if (this.itemPull[a]["state"] != d) {
			this.itemPull[a]["state"] = d;
			if (this.itemPull[a]["parent"] == this.idPrefix + this.topId
					&& !this.conf.context) {
				this.idPull[a].className = "dhtmlxMenu_"
						+ this.conf.skin
						+ "_TopLevel_Item_"
						+ (this.itemPull[a]["state"] == "enabled" ? "Normal"
								: "Disabled")
			} else {
				this.idPull[a].className = "sub_item"
						+ (this.itemPull[a]["state"] == "enabled" ? "" : "_dis")
			}
			this._updateItemComplexState(this.idPrefix + e,
					this.itemPull[this.idPrefix + e]["complex"], false);
			this._updateItemImage(e, b);
			if ((this.idPrefix + this.conf.last_click == a)
					&& (b != "TopLevel")) {
				this._redistribSubLevelSelection(a, this.itemPull[a]["parent"])
			}
			if (b == "TopLevel" && !this.conf.context) {
			}
		}
	}
	return c
};
dhtmlXMenuObject.prototype.getItemText = function(a) {
	return (this.itemPull[this.idPrefix + a] != null ? this.itemPull[this.idPrefix
			+ a]["title"]
			: "")
};
dhtmlXMenuObject.prototype.setItemText = function(f, d) {
	f = this.idPrefix + f;
	if ((this.itemPull[f] != null) && (this.idPull[f] != null)) {
		this._clearAndHide();
		this.itemPull[f]["title"] = d;
		if (this.itemPull[f]["parent"] == this.idPrefix + this.topId
				&& !this.conf.context) {
			var c = null;
			for (var a = 0; a < this.idPull[f].childNodes.length; a++) {
				try {
					if (this.idPull[f].childNodes[a].className == "top_level_text") {
						c = this.idPull[f].childNodes[a]
					}
				} catch (b) {
				}
			}
			if (String(this.itemPull[f]["title"]).length == ""
					|| this.itemPull[f]["title"] == null) {
				if (c != null) {
					c.parentNode.removeChild(c)
				}
			} else {
				if (!c) {
					c = document.createElement("DIV");
					c.className = "top_level_text";
					if (this.conf.rtl && this.idPull[f].childNodes.length > 0) {
						this.idPull[f].insertBefore(c,
								this.idPull[f].childNodes[0])
					} else {
						this.idPull[f].appendChild(c)
					}
				}
				c.innerHTML = this.itemPull[f]["title"]
			}
		} else {
			var c = null;
			for (var a = 0; a < this.idPull[f].childNodes[1].childNodes.length; a++) {
				if (String(this.idPull[f].childNodes[1].childNodes[a].className
						|| "") == "sub_item_text") {
					c = this.idPull[f].childNodes[1].childNodes[a]
				}
			}
			if (String(this.itemPull[f]["title"]).length == ""
					|| this.itemPull[f]["title"] == null) {
				if (c) {
					c.parentNode.removeChild(c);
					c = null;
					this.idPull[f].childNodes[1].innerHTML = "&nbsp;"
				}
			} else {
				if (!c) {
					c = document.createElement("DIV");
					c.className = "sub_item_text";
					this.idPull[f].childNodes[1].innerHTML = "";
					this.idPull[f].childNodes[1].appendChild(c)
				}
				c.innerHTML = this.itemPull[f]["title"]
			}
		}
	}
};
dhtmlXMenuObject.prototype.loadFromHTML = function(c, f, d) {
	var b = this.conf.tags.item;
	this.conf.tags.item = "div";
	var e = (typeof (c) == "string" ? document.getElementById(c) : c);
	var a = this._xmlToJson(e, this.idPrefix + this.topId);
	this._initObj(a);
	this.conf.tags.item = b;
	if (f) {
		e.parentNode.removeChild(e)
	}
	e = objOd = null;
	if (onload != null) {
		if (typeof (d) == "function") {
			d()
		} else {
			if (typeof (window[d]) == "function") {
				window[d]()
			}
		}
	}
};
dhtmlXMenuObject.prototype.hideItem = function(a) {
	this._changeItemVisible(a, false)
};
dhtmlXMenuObject.prototype.showItem = function(a) {
	this._changeItemVisible(a, true)
};
dhtmlXMenuObject.prototype.isItemHidden = function(b) {
	var a = null;
	if (this.idPull[this.idPrefix + b] != null) {
		a = (this.idPull[this.idPrefix + b].style.display == "none")
	}
	return a
};
dhtmlXMenuObject.prototype._changeItemVisible = function(c, b) {
	var a = this.idPrefix + c;
	if (this.itemPull[a] == null) {
		return
	}
	if (this.itemPull[a]["type"] == "separator") {
		a = "separator_" + a
	}
	if (this.idPull[a] == null) {
		return
	}
	this.idPull[a].style.display = (b ? "" : "none");
	this._redefineComplexState(this.itemPull[this.idPrefix + c]["parent"])
};
dhtmlXMenuObject.prototype.setUserData = function(c, a, b) {
	this.userData[this.idPrefix + c + "_" + a] = b
};
dhtmlXMenuObject.prototype.getUserData = function(b, a) {
	return (this.userData[this.idPrefix + b + "_" + a] != null ? this.userData[this.idPrefix
			+ b + "_" + a]
			: null)
};
dhtmlXMenuObject.prototype.setOpenMode = function(a) {
	this.conf.mode = (a == "win" ? "win" : "web")
};
dhtmlXMenuObject.prototype.setWebModeTimeout = function(a) {
	this.conf.tm_sec = (!isNaN(a) ? a : 400)
};
dhtmlXMenuObject.prototype.getItemImage = function(b) {
	var a = new Array(null, null);
	b = this.idPrefix + b;
	if (this.itemPull[b]["type"] == "item") {
		a[0] = this.itemPull[b]["imgen"];
		a[1] = this.itemPull[b]["imgdis"]
	}
	return a
};
dhtmlXMenuObject.prototype.setItemImage = function(c, a, b) {
	if (this.itemPull[this.idPrefix + c]["type"] != "item") {
		return
	}
	this.itemPull[this.idPrefix + c]["imgen"] = a;
	this.itemPull[this.idPrefix + c]["imgdis"] = b;
	this._updateItemImage(c, this._getItemLevelType(c))
};
dhtmlXMenuObject.prototype.clearItemImage = function(a) {
	this.setItemImage(a, "", "")
};
dhtmlXMenuObject.prototype.setVisibleArea = function(b, a, d, c) {
	this.conf.v_enabled = true;
	this.conf.v.x1 = b;
	this.conf.v.x2 = a;
	this.conf.v.y1 = d;
	this.conf.v.y2 = c
};
dhtmlXMenuObject.prototype.setTooltip = function(b, a) {
	b = this.idPrefix + b;
	if (!(this.itemPull[b] != null && this.idPull[b] != null)) {
		return
	}
	this.idPull[b].title = (a.length > 0 ? a : null);
	this.itemPull[b]["tip"] = a
};
dhtmlXMenuObject.prototype.getTooltip = function(a) {
	if (this.itemPull[this.idPrefix + a] == null) {
		return null
	}
	return this.itemPull[this.idPrefix + a]["tip"]
};
dhtmlXMenuObject.prototype.setTopText = function(a) {
	if (this.conf.context) {
		return
	}
	if (this._topText == null) {
		this._topText = document.createElement("DIV");
		this._topText.className = "dhtmlxMenu_TopLevel_Text_"
				+ (this.conf.rtl ? "left"
						: (this.conf.align == "left" ? "right" : "left"));
		this.base.appendChild(this._topText)
	}
	this._topText.innerHTML = a
};
dhtmlXMenuObject.prototype.setAlign = function(a) {
	if (this.conf.align == a) {
		return
	}
	if (a == "left" || a == "right") {
		this.conf.align = a;
		if (this.cont) {
			this.cont.className = (this.conf.align == "right" ? "align_right"
					: "align_left")
		}
		if (this._topText != null) {
			this._topText.className = "dhtmlxMenu_TopLevel_Text_"
					+ (this.conf.align == "left" ? "right" : "left")
		}
	}
};
dhtmlXMenuObject.prototype.setHref = function(c, a, b) {
	if (this.itemPull[this.idPrefix + c] == null) {
		return
	}
	this.itemPull[this.idPrefix + c]["href_link"] = a;
	if (b != null) {
		this.itemPull[this.idPrefix + c]["href_target"] = b
	}
};
dhtmlXMenuObject.prototype.clearHref = function(a) {
	if (this.itemPull[this.idPrefix + a] == null) {
		return
	}
	delete this.itemPull[this.idPrefix + a]["href_link"];
	delete this.itemPull[this.idPrefix + a]["href_target"]
};
dhtmlXMenuObject.prototype.getCircuit = function(b) {
	var a = new Array(b);
	while (this.getParentId(b) != this.topId) {
		b = this.getParentId(b);
		a[a.length] = b
	}
	return a.reverse()
};
dhtmlXMenuObject.prototype._getCheckboxState = function(a) {
	if (this.itemPull[this.idPrefix + a] == null) {
		return null
	}
	return this.itemPull[this.idPrefix + a]["checked"]
};
dhtmlXMenuObject.prototype._setCheckboxState = function(b, a) {
	if (this.itemPull[this.idPrefix + b] == null) {
		return
	}
	this.itemPull[this.idPrefix + b]["checked"] = a
};
dhtmlXMenuObject.prototype._updateCheckboxImage = function(b) {
	if (this.idPull[this.idPrefix + b] == null) {
		return
	}
	this.itemPull[this.idPrefix + b]["imgen"] = "chbx_"
			+ (this._getCheckboxState(b) ? "1" : "0");
	this.itemPull[this.idPrefix + b]["imgdis"] = this.itemPull[this.idPrefix
			+ b]["imgen"];
	try {
		this.idPull[this.idPrefix + b].childNodes[(this.conf.rtl ? 2 : 0)].childNodes[0].className = "sub_icon "
				+ this.itemPull[this.idPrefix + b]["imgen"]
	} catch (a) {
	}
};
dhtmlXMenuObject.prototype._checkboxOnClickHandler = function(d, a, b) {
	if (a.charAt(1) == "d") {
		return
	}
	if (this.itemPull[this.idPrefix + d] == null) {
		return
	}
	var c = this._getCheckboxState(d);
	if (this.checkEvent("onCheckboxClick")) {
		if (this
				.callEvent("onCheckboxClick", [ d, c, this.conf.ctx_zoneid, b ])) {
			this.setCheckboxState(d, !c)
		}
	} else {
		this.setCheckboxState(d, !c)
	}
	if (this.checkEvent("onClick")) {
		this.callEvent("onClick", [ d ])
	}
};
dhtmlXMenuObject.prototype.setCheckboxState = function(b, a) {
	this._setCheckboxState(b, a);
	this._updateCheckboxImage(b)
};
dhtmlXMenuObject.prototype.getCheckboxState = function(a) {
	return this._getCheckboxState(a)
};
dhtmlXMenuObject.prototype.addCheckbox = function(h, d, i, j, k, a, e) {
	if (this.conf.context && d == this.topId) {
	} else {
		if (this.itemPull[this.idPrefix + d] == null) {
			return
		}
		if (h == "child" && this.itemPull[this.idPrefix + d]["type"] != "item") {
			return
		}
	}
	var f = "chbx_" + (a ? "1" : "0");
	var c = f;
	if (h == "sibling") {
		var b = this.idPrefix + (j != null ? j : this._genStr(24));
		var g = this.idPrefix + this.getParentId(d);
		this._addItemIntoGlobalStrorage(b, g, k, "checkbox", e, f, c);
		this.itemPull[b]["checked"] = a;
		this._renderSublevelItem(b, this.getItemPosition(d))
	} else {
		var b = this.idPrefix + (j != null ? j : this._genStr(24));
		var g = this.idPrefix + d;
		this._addItemIntoGlobalStrorage(b, g, k, "checkbox", e, f, c);
		this.itemPull[b]["checked"] = a;
		if (this.idPull["polygon_" + g] == null) {
			this._renderSublevelPolygon(g, g)
		}
		this._renderSublevelItem(b, i - 1);
		this._redefineComplexState(g)
	}
};
dhtmlXMenuObject.prototype.setHotKey = function(g, a) {
	g = this.idPrefix + g;
	if (!(this.itemPull[g] != null && this.idPull[g] != null)) {
		return
	}
	if (this.itemPull[g]["parent"] == this.idPrefix + this.topId
			&& !this.conf.context) {
		return
	}
	if (this.itemPull[g]["complex"]) {
		return
	}
	var b = this.itemPull[g]["type"];
	if (!(b == "item" || b == "checkbox" || b == "radio")) {
		return
	}
	var f = null;
	try {
		if (this.idPull[g].childNodes[this.conf.rtl ? 0 : 2].childNodes[0].className == "sub_item_hk") {
			f = this.idPull[g].childNodes[this.conf.rtl ? 0 : 2].childNodes[0]
		}
	} catch (d) {
	}
	if (a.length == 0) {
		this.itemPull[g]["hotkey_backup"] = this.itemPull[g]["hotkey"];
		this.itemPull[g]["hotkey"] = "";
		if (f != null) {
			f.parentNode.removeChild(f)
		}
	} else {
		this.itemPull[g]["hotkey"] = a;
		this.itemPull[g]["hotkey_backup"] = null;
		if (f == null) {
			f = document.createElement("DIV");
			f.className = "sub_item_hk";
			var c = this.idPull[g].childNodes[this.conf.rtl ? 0 : 2];
			while (c.childNodes.length > 0) {
				c.removeChild(c.childNodes[0])
			}
			c.appendChild(f)
		}
		f.innerHTML = a
	}
};
dhtmlXMenuObject.prototype.getHotKey = function(a) {
	if (this.itemPull[this.idPrefix + a] == null) {
		return null
	}
	return this.itemPull[this.idPrefix + a]["hotkey"]
};
dhtmlXMenuObject.prototype._clearAllSelectedSubItemsInPolygon = function(a) {
	var c = this._getSubItemToDeselectByPolygon(a);
	for (var b = 0; b < this.conf.opened_poly.length; b++) {
		if (this.conf.opened_poly[b] != a) {
			this._hidePolygon(this.conf.opened_poly[b])
		}
	}
	for (var b = 0; b < c.length; b++) {
		if (this.idPull[c[b]] != null
				&& this.itemPull[c[b]]["state"] == "enabled") {
			this.idPull[c[b]].className = "dhtmlxMenu_" + this.conf.skin
					+ "_SubLevelArea_Item_Normal"
		}
	}
};
dhtmlXMenuObject.prototype._checkArrowsState = function(d) {
	var b = this.idPull["polygon_" + d].childNodes[1];
	var c = this.idPull["arrowup_" + d];
	var a = this.idPull["arrowdown_" + d];
	if (b.scrollTop == 0) {
		c.className = "dhtmlxMenu_" + this.conf.skin
				+ "_SubLevelArea_ArrowUp_Disabled"
	} else {
		c.className = "dhtmlxMenu_" + this.conf.skin + "_SubLevelArea_ArrowUp"
				+ (c.over ? "_Over" : "")
	}
	if (b.scrollTop + b.offsetHeight < b.scrollHeight) {
		a.className = "dhtmlxMenu_" + this.conf.skin
				+ "_SubLevelArea_ArrowDown" + (a.over ? "_Over" : "")
	} else {
		a.className = "dhtmlxMenu_" + this.conf.skin
				+ "_SubLevelArea_ArrowDown_Disabled"
	}
	b = c = a = null
};
dhtmlXMenuObject.prototype._addUpArrow = function(d) {
	var b = this;
	var c = document.createElement("DIV");
	c.pId = this.idPrefix + d;
	c.id = "arrowup_" + this.idPrefix + d;
	c.className = "dhtmlxMenu_" + this.conf.skin + "_SubLevelArea_ArrowUp";
	c.over = false;
	c.onselectstart = function(f) {
		f = f || event;
		if (f.preventDefault) {
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		return false
	};
	c.oncontextmenu = function(f) {
		f = f || event;
		if (f.preventDefault) {
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		return false
	};
	c.onmouseover = function() {
		if (b.conf.mode == "web") {
			window.clearTimeout(b.conf.tm_handler)
		}
		b._clearAllSelectedSubItemsInPolygon(this.pId);
		if (this.className == "dhtmlxMenu_" + b.conf.skin
				+ "_SubLevelArea_ArrowUp_Disabled") {
			return
		}
		this.className = "dhtmlxMenu_" + b.conf.skin
				+ "_SubLevelArea_ArrowUp_Over";
		this.over = true;
		b._canScrollUp = true;
		b._doScrollUp(this.pId, true)
	};
	c.onmouseout = function() {
		if (b.conf.mode == "web") {
			window.clearTimeout(b.conf.tm_handler);
			b.conf.tm_handler = window.setTimeout(function() {
				b._clearAndHide()
			}, b.conf.tm_sec, "JavaScript")
		}
		this.over = false;
		b._canScrollUp = false;
		if (this.className == "dhtmlxMenu_" + b.conf.skin
				+ "_SubLevelArea_ArrowUp_Disabled") {
			return
		}
		this.className = "dhtmlxMenu_" + b.conf.skin + "_SubLevelArea_ArrowUp";
		window.clearTimeout(b.conf.of_utm)
	};
	c.onclick = function(f) {
		f = f || event;
		if (f.preventDefault) {
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		f.cancelBubble = true;
		return false
	};
	var a = this.idPull["polygon_" + this.idPrefix + d];
	a.childNodes[0].appendChild(c);
	this.idPull[c.id] = c;
	a = c = null
};
dhtmlXMenuObject.prototype._addDownArrow = function(d) {
	var b = this;
	var c = document.createElement("DIV");
	c.pId = this.idPrefix + d;
	c.id = "arrowdown_" + this.idPrefix + d;
	c.className = "dhtmlxMenu_" + this.conf.skin + "_SubLevelArea_ArrowDown";
	c.over = false;
	c.onselectstart = function(f) {
		f = f || event;
		if (f.preventDefault) {
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		return false
	};
	c.oncontextmenu = function(f) {
		f = f || event;
		if (f.preventDefault) {
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		return false
	};
	c.onmouseover = function() {
		if (b.conf.mode == "web") {
			window.clearTimeout(b.conf.tm_handler)
		}
		b._clearAllSelectedSubItemsInPolygon(this.pId);
		if (this.className == "dhtmlxMenu_" + b.conf.skin
				+ "_SubLevelArea_ArrowDown_Disabled") {
			return
		}
		this.className = "dhtmlxMenu_" + b.conf.skin
				+ "_SubLevelArea_ArrowDown_Over";
		this.over = true;
		b._canScrollDown = true;
		b._doScrollDown(this.pId, true)
	};
	c.onmouseout = function() {
		if (b.conf.mode == "web") {
			window.clearTimeout(b.conf.tm_handler);
			b.conf.tm_handler = window.setTimeout(function() {
				b._clearAndHide()
			}, b.conf.tm_sec, "JavaScript")
		}
		this.over = false;
		b._canScrollDown = false;
		if (this.className == "dhtmlxMenu_" + b.conf.skin
				+ "_SubLevelArea_ArrowDown_Disabled") {
			return
		}
		this.className = "dhtmlxMenu_" + b.conf.skin
				+ "_SubLevelArea_ArrowDown";
		window.clearTimeout(b.conf.of_dtm)
	};
	c.onclick = function(f) {
		f = f || event;
		if (f.preventDefault) {
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		f.cancelBubble = true;
		return false
	};
	var a = this.idPull["polygon_" + this.idPrefix + d];
	a.childNodes[2].appendChild(c);
	this.idPull[c.id] = c;
	a = c = null
};
dhtmlXMenuObject.prototype._removeUpArrow = function(b) {
	var a = "arrowup_" + this.idPrefix + b;
	this._removeArrow(a)
};
dhtmlXMenuObject.prototype._removeDownArrow = function(b) {
	var a = "arrowdown_" + this.idPrefix + b;
	this._removeArrow(a)
};
dhtmlXMenuObject.prototype._removeArrow = function(a) {
	var b = this.idPull[a];
	b.onselectstart = null;
	b.oncontextmenu = null;
	b.onmouseover = null;
	b.onmouseout = null;
	b.onclick = null;
	if (b.parentNode) {
		b.parentNode.removeChild(b)
	}
	b = null;
	this.idPull[a] = null;
	try {
		delete this.idPull[a]
	} catch (c) {
	}
};
dhtmlXMenuObject.prototype._isArrowExists = function(a) {
	if (this.idPull["arrowup_" + a] != null
			&& this.idPull["arrowdown_" + a] != null) {
		return true
	}
	return false
};
dhtmlXMenuObject.prototype._doScrollUp = function(f, d) {
	var a = this.idPull["polygon_" + f].childNodes[1];
	if (this._canScrollUp && a.scrollTop > 0) {
		var c = false;
		var e = a.scrollTop - this.conf.of_ustep;
		if (e < 0) {
			c = true;
			e = 0
		}
		a.scrollTop = e;
		if (!c) {
			var b = this;
			this.conf.of_utm = window.setTimeout(function() {
				b._doScrollUp(f, false);
				b = null
			}, this.conf.of_utime)
		} else {
			d = true
		}
	} else {
		this._canScrollUp = false;
		this._checkArrowsState(f)
	}
	if (d) {
		this._checkArrowsState(f)
	}
};
dhtmlXMenuObject.prototype._doScrollDown = function(f, d) {
	var a = this.idPull["polygon_" + f].childNodes[1];
	if (this._canScrollDown && a.scrollTop + a.offsetHeight <= a.scrollHeight) {
		var c = false;
		var e = a.scrollTop + this.conf.of_dstep;
		if (e + a.offsetHeight >= a.scrollHeight) {
			c = true;
			e = a.scrollHeight - a.offsetHeight
		}
		a.scrollTop = e;
		if (!c) {
			var b = this;
			this.conf.of_dtm = window.setTimeout(function() {
				b._doScrollDown(f, false);
				b = null
			}, this.conf.of_dtime)
		} else {
			d = true
		}
	} else {
		this._canScrollDown = false;
		this._checkArrowsState(f)
	}
	if (d) {
		this._checkArrowsState(f)
	}
};
dhtmlXMenuObject.prototype._countPolygonItems = function(f) {
	var d = 0;
	for ( var b in this.itemPull) {
		var c = this.itemPull[b]["parent"];
		var e = this.itemPull[b]["type"];
		if (c == this.idPrefix + f
				&& (e == "item" || e == "radio" || e == "checkbox")) {
			d++
		}
	}
	return d
};
dhtmlXMenuObject.prototype.setOverflowHeight = function(e) {
	if (e === "auto") {
		this.conf.overflow_limit = 0;
		this.conf.auto_overflow = true;
		return
	}
	if (this.conf.overflow_limit == 0 && e <= 0) {
		return
	}
	this._clearAndHide();
	if (this.conf.overflow_limit >= 0 && e > 0) {
		this.conf.overflow_limit = e;
		return
	}
	if (this.conf.overflow_limit > 0 && e <= 0) {
		for ( var d in this.itemPull) {
			if (this._isArrowExists(d)) {
				var c = String(d).replace(this.idPrefix, "");
				this._removeUpArrow(c);
				this._removeDownArrow(c);
				this.idPull["polygon_" + d].childNodes[1].style.height = ""
			}
		}
		this.conf.overflow_limit = 0;
		return
	}
};
dhtmlXMenuObject.prototype._getRadioImgObj = function(c) {
	try {
		var a = this.idPull[this.idPrefix + c].childNodes[(this.conf.rtl ? 2
				: 0)].childNodes[0]
	} catch (b) {
		var a = null
	}
	return a
};
dhtmlXMenuObject.prototype._setRadioState = function(d, c) {
	var b = this._getRadioImgObj(d);
	if (b != null) {
		var a = this.itemPull[this.idPrefix + d];
		a.checked = c;
		a.imgen = "rdbt_" + (a.checked ? "1" : "0");
		a.imgdis = a.imgen;
		b.className = "sub_icon " + a.imgen
	}
};
dhtmlXMenuObject.prototype._radioOnClickHandler = function(d, a, b) {
	if (a.charAt(1) == "d" || this.itemPull[this.idPrefix + d]["group"] == null) {
		return
	}
	var c = this.itemPull[this.idPrefix + d]["group"];
	if (this.checkEvent("onRadioClick")) {
		if (this.callEvent("onRadioClick", [ c, this.getRadioChecked(c), d,
				this.conf.ctx_zoneid, b ])) {
			this.setRadioChecked(c, d)
		}
	} else {
		this.setRadioChecked(c, d)
	}
	if (this.checkEvent("onClick")) {
		this.callEvent("onClick", [ d ])
	}
};
dhtmlXMenuObject.prototype.getRadioChecked = function(d) {
	var f = null;
	for (var c = 0; c < this.radio[d].length; c++) {
		var e = this.radio[d][c].replace(this.idPrefix, "");
		var a = this._getRadioImgObj(e);
		if (a != null) {
			var b = (a.className).match(/rdbt_1$/gi);
			if (b != null) {
				f = e
			}
		}
	}
	return f
};
dhtmlXMenuObject.prototype.setRadioChecked = function(b, d) {
	if (this.radio[b] == null) {
		return
	}
	for (var a = 0; a < this.radio[b].length; a++) {
		var c = this.radio[b][a].replace(this.idPrefix, "");
		this._setRadioState(c, (c == d))
	}
};
dhtmlXMenuObject.prototype.addRadioButton = function(i, e, j, k, l, m, a, f) {
	if (this.conf.context && e == this.topId) {
	} else {
		if (this.itemPull[this.idPrefix + e] == null) {
			return
		}
		if (i == "child" && this.itemPull[this.idPrefix + e]["type"] != "item") {
			return
		}
	}
	var c = this.idPrefix + (k != null ? k : this._genStr(24));
	var g = "rdbt_" + (a ? "1" : "0");
	var b = g;
	if (i == "sibling") {
		var h = this.idPrefix + this.getParentId(e);
		this._addItemIntoGlobalStrorage(c, h, l, "radio", f, g, b);
		this._renderSublevelItem(c, this.getItemPosition(e))
	} else {
		var h = this.idPrefix + e;
		this._addItemIntoGlobalStrorage(c, h, l, "radio", f, g, b);
		if (this.idPull["polygon_" + h] == null) {
			this._renderSublevelPolygon(h, h)
		}
		this._renderSublevelItem(c, j - 1);
		this._redefineComplexState(h)
	}
	var d = (m != null ? m : this._genStr(24));
	this.itemPull[c]["group"] = d;
	if (this.radio[d] == null) {
		this.radio[d] = new Array()
	}
	this.radio[d][this.radio[d].length] = c;
	if (a == true) {
		this.setRadioChecked(d, String(c).replace(this.idPrefix, ""))
	}
};
dhtmlXMenuObject.prototype.serialize = function() {
	var a = "<menu>" + this._readLevel(this.idPrefix + this.topId) + "</menu>";
	return a
};
dhtmlXMenuObject.prototype._readLevel = function(d) {
	var e = "";
	for ( var i in this.itemPull) {
		if (this.itemPull[i]["parent"] == d) {
			var b = "";
			var c = "";
			var k = "";
			var h = String(this.itemPull[i]["id"]).replace(this.idPrefix, "");
			var g = "";
			var j = (this.itemPull[i]["title"] != "" ? ' text="'
					+ this.itemPull[i]["title"] + '"' : "");
			var f = "";
			if (this.itemPull[i]["type"] == "item") {
				if (this.itemPull[i]["imgen"] != "") {
					b = ' img="' + this.itemPull[i]["imgen"] + '"'
				}
				if (this.itemPull[i]["imgdis"] != "") {
					c = ' imgdis="' + this.itemPull[i]["imgdis"] + '"'
				}
				if (this.itemPull[i]["hotkey"] != "") {
					k = "<hotkey>" + this.itemPull[i]["hotkey"] + "</hotkey>"
				}
			}
			if (this.itemPull[i]["type"] == "separator") {
				g = ' type="separator"'
			} else {
				if (this.itemPull[i]["state"] == "disabled") {
					f = ' enabled="false"'
				}
			}
			if (this.itemPull[i]["type"] == "checkbox") {
				g = ' type="checkbox"'
						+ (this.itemPull[i]["checked"] ? ' checked="true"' : "")
			}
			if (this.itemPull[i]["type"] == "radio") {
				g = ' type="radio" group="'
						+ this.itemPull[i]["group"]
						+ '" '
						+ (this.itemPull[i]["checked"] ? ' checked="true"' : "")
			}
			e += "<item id='" + h + "'" + j + g + b + c + f + ">";
			e += k;
			if (this.itemPull[i]["complex"]) {
				e += this._readLevel(i)
			}
			e += "</item>"
		}
	}
	return e
};
dhtmlXMenuObject.prototype.enableEffect = function(c, e, d) {
	this._menuEffect = (c == "opacity" || c == "slide" || c == "slide+" ? c
			: false);
	this._pOpStyleIE = (navigator.userAgent.search(/MSIE\s[678]\.0/gi) >= 0);
	for ( var b in this.idPull) {
		if (b.search(/polygon/) === 0) {
			this._pOpacityApply(b, (this._pOpStyleIE ? 100 : 1));
			this.idPull[b].style.height = ""
		}
	}
	this._pOpMax = (typeof (e) == "undefined" ? 100 : e)
			/ (this._pOpStyleIE ? 1 : 100);
	this._pOpStyleName = (this._pOpStyleIE ? "filter" : "opacity");
	this._pOpStyleValue = (this._pOpStyleIE ? "progid:DXImageTransform.Microsoft.Alpha(Opacity=#)"
			: "#");
	this._pSlSteps = (this._pOpStyleIE ? 10 : 20);
	this._pSlTMTimeMax = d || 50
};
dhtmlXMenuObject.prototype._showPolygonEffect = function(a) {
	this._pShowHide(a, true)
};
dhtmlXMenuObject.prototype._hidePolygonEffect = function(a) {
	this._pShowHide(a, false)
};
dhtmlXMenuObject.prototype._pOpacityApply = function(a, b) {
	this.idPull[a].style[this._pOpStyleName] = String(this._pOpStyleValue)
			.replace("#", b || this.idPull[a]._op)
};
dhtmlXMenuObject.prototype._pShowHide = function(a, b) {
	if (!this.idPull) {
		return
	}
	if (this.idPull[a]._tmShow != null) {
		if ((this.idPull[a]._step_h > 0 && b == true)
				|| (this.idPull[a]._step_h < 0 && b == false)) {
			return
		}
		window.clearTimeout(this.idPull[a]._tmShow);
		this.idPull[a]._tmShow = null;
		this.idPull[a]._max_h = null
	}
	if (b == false
			&& (this.idPull[a].style.visibility == "hidden" || this.idPull[a].style.display == "none")) {
		return
	}
	if (b == true && this.idPull[a].style.display == "none") {
		this.idPull[a].style.visibility = "hidden";
		this.idPull[a].style.display = ""
	}
	if (this.idPull[a]._max_h == null) {
		this.idPull[a]._max_h = parseInt(this.idPull[a].offsetHeight);
		this.idPull[a]._h = (b == true ? 0 : this.idPull[a]._max_h);
		this.idPull[a]._step_h = Math.round(this.idPull[a]._max_h
				/ this._pSlSteps)
				* (b == true ? 1 : -1);
		if (this.idPull[a]._step_h == 0) {
			return
		}
		this.idPull[a]._step_tm = Math.round(this._pSlTMTimeMax
				/ this._pSlSteps);
		if (this._menuEffect == "slide+" || this._menuEffect == "opacity") {
			this.idPull[a].op_tm = this.idPull[a]._step_tm;
			this.idPull[a].op_step = (this._pOpMax / this._pSlSteps)
					* (b == true ? 1 : -1);
			if (this._pOpStyleIE) {
				this.idPull[a].op_step = Math.round(this.idPull[a].op_step)
			}
			this.idPull[a]._op = (b == true ? 0 : this._pOpMax);
			this._pOpacityApply(a)
		} else {
			this.idPull[a]._op = (this._pOpStyleIE ? 100 : 1);
			this._pOpacityApply(a)
		}
		if (this._menuEffect.search(/slide/) === 0) {
			this.idPull[a].style.height = "0px"
		}
		this.idPull[a].style.visibility = "visible"
	}
	this._pEffectSet(a, this.idPull[a]._h + this.idPull[a]._step_h)
};
dhtmlXMenuObject.prototype._pEffectSet = function(c, b) {
	if (!this.idPull) {
		return
	}
	if (this.idPull[c]._tmShow) {
		window.clearTimeout(this.idPull[c]._tmShow)
	}
	this.idPull[c]._h = Math.max(0, Math.min(b, this.idPull[c]._max_h));
	if (this._menuEffect.search(/slide/) === 0) {
		this.idPull[c].style.height = this.idPull[c]._h + "px"
	}
	b += this.idPull[c]._step_h;
	if (this._menuEffect == "slide+" || this._menuEffect == "opacity") {
		this.idPull[c]._op = Math.max(0, Math.min(this._pOpMax,
				this.idPull[c]._op + this.idPull[c].op_step));
		this._pOpacityApply(c)
	}
	if ((this.idPull[c]._step_h > 0 && b <= this.idPull[c]._max_h)
			|| (this.idPull[c]._step_h < 0 && b >= 0)) {
		var a = this;
		this.idPull[c]._tmShow = window.setTimeout(function() {
			a._pEffectSet(c, b)
		}, this.idPull[c]._step_tm)
	} else {
		if (this._menuEffect.search(/slide/) === 0) {
			this.idPull[c].style.height = ""
		}
		if (this.idPull[c]._step_h < 0) {
			this.idPull[c].style.visibility = "hidden"
		}
		if (this._menuEffect == "slide+" || this._menuEffect == "opacity") {
			this.idPull[c]._op = (this.idPull[c]._step_h < 0 ? (this._pOpStyleIE ? 100
					: 1)
					: this._pOpMax);
			this._pOpacityApply(c)
		}
		this.idPull[c]._tmShow = null;
		this.idPull[c]._h = null;
		this.idPull[c]._max_h = null;
		this.idPull[c]._step_tm = null
	}
};