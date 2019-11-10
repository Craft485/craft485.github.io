Number.prototype.limit = function(min, max) {
    return Math.min(max, Math.max(min, this));
  };
  
  Number.prototype.round = function(precision) {
    precision = Math.pow(10, precision || 0);
    return Math.round(this * precision) / precision;
  };
  
  Number.prototype.floor = function() {
    return Math.floor(this);
  };
  
  Number.prototype.ceil = function() {
    return Math.ceil(this);
  };
  
  Number.prototype.toRad = function() {
    return (this / 180) * Math.PI;
  };
  
  Number.prototype.toDeg = function() {
    return (this * 180) / Math.PI;
  };
  
  Array.prototype.erase = function(item) {
    for (var i = this.length; i--;) {
      if (this[i] === item) {
        this.splice(i, 1);
      }
    }
    return this;
  };
  
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };
  
  var debug = false;
  
  var randRange = function(min, max) {
    return Math.round((max - min) * Math.random()) + min;
  }
  
  var sumRange = function(n) {
    var s = 0;
    for (var i = 1; i <= n; i++) {
      s += i;
    }
    return s
  };
  
  var limit = function(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }
  
  var maxarr = function(arr) {
    return arr.reduce(function(a, b) {
      return Math.max(a, b);
    })
  }
  
  var rgba = function(r, g, b, a) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }
  
  function toRGB(h, s, l) {
    var a = s * Math.min(l, 1-l)
    var k = function (n) {
      return (n + h/30) % 12;
    }
    var f = function (n) {
      return l - a * Math.max(Math.min(k(n)-3, 9-k(n), 1), -1);
    }
    return "rgb(" + Math.round(f(0)**3 * 255) + ", " + Math.round(f(8)**3 * 255) + ", " + Math.round(f(4)**3 * 255) + ")";
  }
  
  function merge(original, extended) {
    for (var key in extended) {
      var ext = extended[key];
      if (typeof(ext) != 'object' || ext instanceof HTMLElement || ext instanceof Class) {
        original[key] = ext;
      } else {
        if (!original[key] || typeof(original[key]) != 'object') {
          original[key] = (ext instanceof Array) ? [] : {};
        }
        merge(original[key], ext);
      }
    }
    return original;
  }
  
  function copy(object) {
    if (!object || typeof(object) != 'object' || object instanceof HTMLElement || object instanceof Class || object instanceof Location || object instanceof DOMStringList || object instanceof DOMImplementation) {
      return object;
    } else if (object instanceof Array) {
      var c = [];
      for (var i = 0, l = object.length; i < l; i++) {
        c[i] = copy(object[i]);
      }
      return c;
    } else {
      var c = {};
      for (var i in object) {
        c[i] = copy(object[i]);
      }
      return c;
    }
  }
  
  (function() {
    var initializing = false,
      fnTest = /xyz/.test(function() {
        xyz;
      }) ? /\b_super\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(prop) {
      var _super = this.prototype;
      initializing = true;
      var prototype = new this();
      initializing = false;
      for (var name in prop) {
        prototype[name] = typeof prop[name] == "function" &&
          typeof _super[name] == "function" && fnTest.test(prop[name]) ?
          (function(name, fn) {
            return function() {
              var tmp = this._super;
              this._super = _super[name];
              var ret = fn.apply(this, arguments);
              this._super = tmp;
  
              return ret;
            };
          })(name, prop[name]) :
          prop[name];
      }
  
      function Class() {
        if (!initializing) {
          for (var p in this) {
            if (typeof(this[p]) == 'object') {
              this[p] = copy(this[p]);
            }
          }
          if (this.init) {
            this.init.apply(this, arguments);
          }
        }
      }
      Class.prototype = prototype;
      Class.constructor = Class;
      Class.extend = arguments.callee;
      return Class;
    };
  
  })();
  
  
  
  var System = Class.extend({
    xsec: 48,
    ysec: 36,
    fps: 60,
    shift: 0,
    paused: false,
    pauseTime: null,
    init: function() {
      this.tick = 1.0 / this.fps;
      this.time = Date.now() / 1000;
      this.canvas = document.getElementById('canvas', {alpha: false});
      this.context = this.canvas.getContext('2d');
      this.hiddenCanvas = document.createElement('canvas');
      this.hiddenContext = this.hiddenCanvas.getContext('2d');
      this.backCanvas = document.createElement('canvas');
      this.backContext = this.backCanvas.getContext('2d');
      this.hiddenCanvas.width = 1000;
      this.backCanvas.width = this.canvas.width * 2;
      this.backCanvas.height = this.canvas.height * 2;
    },
    pause: function() {
      this.pauseTime = this.time;
      this.paused = true;
    },
    unpause: function() {
      this.shift = this.pauseTime - Date.now() / 1000;
      this.pauseTime = null;
      this.paused = false;
    },
    now: function() {
      return Date.now() / 1000;  
    },
    update: function() {
      if (!this.paused) {
        var t = Date.now() / 1000;
        this.time = t;
      }
    }
  });
  
  var Timer = Class.extend({
    init: function(seconds) {
      this.base = system.time;
      this.last = system.time;
      this.target = seconds || 0;
      this.pausedAt = 0;
    },
    setTime: function(seconds) {
      this.target = seconds || 0;
      this.base = system.time;
      this.pausedAt = 0;
    },
    reset: function() {
      this.base = system.time;
      this.pausedAt = 0;
    },
    delta: function() {
      return (this.pausedAt || system.time) - this.base - this.target;
    },
    over: function() {
      return this.delta >= 0;
    },
    pause: function() {
      if (!this.pausedAt) {
        this.pausedAt = system.time;
      }
    },
    unpause: function() {
      if (this.pausedAt) {
        this.base += system.time - this.pausedAt;
        this.pausedAt = 0;
      }
    }
  });
  
  var Input = Class.extend({
    keys: {
      'MOUSE1': -1,
      'MOUSE2': -3,
      'MWHEEL_UP': -4,
      'MWHEEL_DOWN': -5,
      'BACKSPACE': 8,
      'TAB': 9,
      'ENTER': 13,
      'PAUSE': 19,
      'CAPS': 20,
      'ESC': 27,
      'SPACE': 32,
      'PAGE_UP': 33,
      'PAGE_DOWN': 34,
      'END': 35,
      'HOME': 36,
      'LEFT_ARROW': 37,
      'UP_ARROW': 38,
      'RIGHT_ARROW': 39,
      'DOWN_ARROW': 40,
      'INSERT': 45,
      'DELETE': 46,
      '_0': 48,
      '_1': 49,
      '_2': 50,
      '_3': 51,
      '_4': 52,
      '_5': 53,
      '_6': 54,
      '_7': 55,
      '_8': 56,
      '_9': 57,
      'A': 65,
      'B': 66,
      'C': 67,
      'D': 68,
      'E': 69,
      'F': 70,
      'G': 71,
      'H': 72,
      'I': 73,
      'J': 74,
      'K': 75,
      'L': 76,
      'M': 77,
      'N': 78,
      'O': 79,
      'P': 80,
      'Q': 81,
      'R': 82,
      'S': 83,
      'T': 84,
      'U': 85,
      'V': 86,
      'W': 87,
      'X': 88,
      'Y': 89,
      'Z': 90,
      'NUMPAD_0': 96,
      'NUMPAD_1': 97,
      'NUMPAD_2': 98,
      'NUMPAD_3': 99,
      'NUMPAD_4': 100,
      'NUMPAD_5': 101,
      'NUMPAD_6': 102,
      'NUMPAD_7': 103,
      'NUMPAD_8': 104,
      'NUMPAD_9': 105,
      'MULTIPLY': 106,
      'ADD': 107,
      'SUBSTRACT': 109,
      'DECIMAL': 110,
      'DIVIDE': 111,
      'F1': 112,
      'F2': 113,
      'F3': 114,
      'F4': 115,
      'F5': 116,
      'F6': 117,
      'F7': 118,
      'F8': 119,
      'F9': 120,
      'F10': 121,
      'F11': 122,
      'F12': 123,
      'SHIFT': 16,
      'CTRL': 17,
      'ALT': 18,
      'PLUS': 187,
      'COMMA': 188,
      'MINUS': 189,
      'PERIOD': 190
    },
    init: function() {
      this.delayedKeyup = {};
      this.bindings = {};
      this.actions = {};
      this.presses = {};
      this.locks = {};
      this.isUsingMouse = false;
      this.isUsingKeyboard = false;
      this.mouse = {
        x: 0,
        y: 0
      }
      this.accel = {
        x: 0,
        y: 0,
        z: 0
      }
    },
    initMouse: function() {
      if (this.isUsingMouse) {
        return;
      }
      this.isUsingMouse = true;
      system.canvas.addEventListener('contextmenu', this.contextmenu.bind(this), false);
      system.canvas.addEventListener('mousedown', this.keydown.bind(this), false);
      system.canvas.addEventListener('mouseup', this.keyup.bind(this), false);
      system.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
      system.canvas.addEventListener('touchstart', this.keydown.bind(this), false);
      system.canvas.addEventListener('touchend', this.keyup.bind(this), false);
      system.canvas.addEventListener('touchmove', this.mousemove.bind(this), false);
    },
    initKeyboard: function() {
      if (this.isUsingKeyboard) {
        return;
      }
      this.isUsingKeyboard = true;
      window.addEventListener('keydown', this.keydown.bind(this), false);
      window.addEventListener('keyup', this.keyup.bind(this), false);
    },
    getEventPosition: function(event) {
      var pos = {
        left: 0,
        top: 0
      };
      if (system.canvas.getBoundingClientRect) {
        pos = system.canvas.getBoundingClientRect();
      }
      return {
        x: (event.clientX - pos.left),
        y: (event.clientY - pos.top)
      };
    },
    mousemove: function(event) {
      input.mouse = this.getEventPosition(event.touches ? event.touches[0] : event);
    },
    contextmenu: function(event) {
      if (this.bindings[-3]) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    keydown: function(event) {
      var tag = event.target.tagName;
      if (tag == 'INPUT' || tag == 'TEXTAREA') {
        return;
      }
      var code = event.type == 'keydown' ? event.keyCode : (event.button == 2 ? -3 : -1);
      if (event.type == 'touchstart' || event.type == 'mousedown') {
        this.mousemove(event);
      }
      var action = this.bindings[code];
      if (action) {
        this.actions[action] = true;
        if (!this.locks[action]) {
          this.presses[action] = true;
          this.locks[action] = true;
        }
        event.stopPropagation();
        event.preventDefault();
      }
    },
    keyup: function(event) {
      var tag = event.target.tagName;
      if (tag == 'INPUT' || tag == 'TEXTAREA') {
        return;
      }
      var code = event.type == 'keyup' ? event.keyCode : (event.button == 2 ? -3 : -1);
      var action = this.bindings[code];
      if (action) {
        this.delayedKeyup[action] = true;
        event.stopPropagation();
        event.preventDefault();
      }
    },
    bind: function(key, action) {
      if (key < 0) {
        this.initMouse();
      } else if (key > 0) {
        this.initKeyboard();
      }
      this.bindings[key] = action;
    },
    bindTouch: function(selector, action) {
      var element = ig.$(selector);
      var that = this;
      element.addEventListener('touchstart', function(ev) {
        that.touchStart(ev, action);
      }, false);
      element.addEventListener('touchend', function(ev) {
        that.touchEnd(ev, action);
      }, false);
    },
    unbind: function(key) {
      var action = this.bindings[key];
      this.delayedKeyup[action] = true;
      this.bindings[key] = null;
    },
    unbindAll: function() {
      this.bindings = {};
      this.actions = {};
      this.presses = {};
      this.locks = {};
      this.delayedKeyup = {};
    },
    state: function(action) {
      return this.actions[action];
    },
    pressed: function(action) {
      return this.presses[action];
    },
    released: function(action) {
      return this.delayedKeyup[action];
    },
    clearPressed: function() {
      for (var action in this.delayedKeyup) {
        this.actions[action] = false;
        this.locks[action] = false;
      }
      this.delayedKeyup = {};
      this.presses = {};
    },
    touchStart: function(event, action) {
      this.actions[action] = true;
      this.presses[action] = true;
      event.stopPropagation();
      event.preventDefault();
      return false;
    },
    touchEnd: function(event, action) {
      this.delayedKeyup[action] = true;
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  })
  
  
  
  var PolyPolar = Class.extend({
    init: function(points, sides) { // If sides is included, then poly polar assumes you want a radius, sides form
      if (sides != null) {
        points = this.generatePoly(points, sides);
      }
      this.points = points;
      this.radius = this.maxScalar();
    },
    maxScalar: function() {
      var s = [];
      for (var i = 0; i < this.points.length; i++) {
        s.push(this.points[i][0]);
      }
      return maxarr(s);
    },
    getCoords: function(dx, dy, angle) {
      var coords = [];
      for (var i = 0; i < this.points.length; i++) {
        var s = this.points[i][0],
          a = this.points[i][1]
        a += angle;
        var x = s * Math.cos(a);
        var y = s * Math.sin(a);
        coords.push([x + dx, y + dy]);
      }
      return coords;
    },
    generatePoly: function(radius, sides) {
      var l = [];
      for (var i = 0; i < sides; i++) {
        l.push([radius, i * 2 * Math.PI / sides]);
      }
      return l;
    }
  });
  
  var PolyPoint = Class.extend({
    init: function(points) {
      this.points = points;
    },
    update: function(points) {
      this.points = points
    },
    liccw: function(a, b, c) {
      return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
    },
    lineIntersect: function(x, y) {
      var a = x[0],
        b = x[1],
        c = y[0],
        d = y[1]
      var m = this.liccw(a, b, c) != this.liccw(a, b, d);
      var n = this.liccw(a, c, d) != this.liccw(b, c, d);
      return m && n;
    },
    intersectCoord: function(a, b) {
       var agra = (a[0][1] - a[1][1]) / (a[0][0] - a[1][0]);
       var bgra = (b[0][1] - b[1][1]) / (b[0][0] - b[1][0]);
       var x = (a[0][1] + bgra * b[0][0] - b[0][1] - agra * a[0][0]) / (bgra - agra);
       var y = agra * ( x - a[0][0] ) + a[0][1];
       return [x, y]
    },
    polyLines: function() {
      var lines = [];
      for (var i = 0; i < (this.points.length - 1); i++) {
        lines.push([this.points[i], this.points[i + 1]]);
      }
      if (this.points.length > 2) {
        lines.push([this.points[0], this.points[this.points.length - 1]]);
      }
      return lines;
    },
    intersects: function(other) {
      var xline = this.polyLines();
      var yline = other.polyLines();
      for (var a = 0; a < xline.length; a++) {
        for (var b = 0; b < yline.length; b++) {
          if (this.lineIntersect(xline[a], yline[b])) {
            return true;
          }
        }
      }
      return false;
    },
    rayIntersect: function(line) {
      var poly = this.polyLines();
      var point = null;
      var minDist = NaN;
      game.debugText = line;
      for (var i = 0; i < poly.length; i++) {
        if (this.lineIntersect(poly[i], line)) {
          var coord = this.intersectCoord(poly[i], line);
          var dist2 = (line[0][0] - coord[0]) ** 2 + (line[0][1] - coord[1]) ** 2;
          if (!(dist2 >= minDist)) {
            point = coord
            minDist = dist2
          }
        }
      }
      return [point, minDist];
    }
  })
  
  var Entity = Class.extend({
    id: 0,
    pos: {
      x: 0,
      y: 0
    },
    vel: {
      x: 0,
      y: 0
    },
    accel: {
      x: 0,
      y: 0
    },
    maxvel: {
      x: 1000,
      y: 1000
    },
    dead: false,
    angle: 0,
    health: 10,
    poly: null,
    fill: null,
    alpha: 1,
    stroke: null,
    linesize: 2,
    type: 0,
    checkAgainst: -1,
    explodeParticles: 0,
    init: function(x, y, settings) {
      this.id = ++Entity._lastId;
      this.pos.x = x;
      this.pos.y = y;
      this.curpoly = new PolyPoint();
      if (this.poly) {
        this.updatePoly();
      }
      merge(this, settings);
    },
    update: function() {
      this.last = this.pos;
      this.vel.x = limit(this.vel.x + this.accel.x * system.tick, -this.maxvel.x, this.maxvel.x);
      this.vel.y = limit(this.vel.y + this.accel.y * system.tick, -this.maxvel.y, this.maxvel.y);
      this.pos.x += this.vel.x * system.tick;
      this.pos.y += this.vel.y * system.tick;
      this.updatePoly();
    },
    updatePoly: function() {
      if (this.poly) {
        this.curpoly.update(this.poly.getCoords(this.pos.x, this.pos.y, this.angle));
      }
    },
    receiveDamage: function(amount, from) {
      this.health -= amount;
      if (this.health <= 0) {
        this.kill();
      }
    },
    touches: function(other) {
      var x = this.pos.x - other.pos.x;
      var y = this.pos.y - other.pos.y;
      var r = this.poly.radius + other.poly.radius;
      if (x * x + y * y > r * r) {
        return false;
      }
      return this.curpoly.intersects(other.curpoly);
    },
    explode: function() {
      game.spawnEntity(Spark, this.pos.x, this.pos.y, {
        count: this.explodeParticles
      })
    },
    kill: function(silent) {
      if (!silent) {
        this.explode();
      }
      this.dead = true;
      game.removeEntity(this);
    },
    angleTo: function(other) {
      return Math.atan2(other.pos.y - this.pos.y, other.pos.x - this.pos.x);
    },
    distanceTo: function(other) {
      var xd = this.pos.x - other.pos.x;
      var yd = this.pos.y - other.pos.y;
      return Math.sqrt(xd * xd + yd * yd);
    },
    check: function(other) {},
    draw: function() {
      if (this.curpoly.points) {
        game.drawPoly(this.curpoly.points, this.fill, this.stroke, this.linesize, this.alpha);
      }
    }
  })
  
  Entity._lastId = 0;
  Entity.TYPE = {
    NEG: -1,
    NONE: 0,
    PLAYER: 1,
    PBULLET: 2,
    ENEMY: 3,
    EBULLET: 4,
    PARTICLE: 5
  };
  Entity.SORT = function(a, b) {
    var t = b.type - a.type;
    var i = b.id - a.id;
    if (t == 0) {
      return i;
    }
    return t;
  }
  
  
  var Particle = Entity.extend({
    speed: 200,
    fill: "#FFFFFF",
    stroke: "#FFFFFF",
    type: 5,
    checkAgainst: -1,
    lifetime: 1,
    fade: true,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.lifeTimer = new Timer(this.lifetime);
      this.vel.x = this.speed * Math.cos(this.angle);
      this.vel.y = this.speed * Math.sin(this.angle);
    },
    update: function() {
      this._super();
      if (this.lifeTimer.delta() > 0) {
        this.kill();
      }
    },
    kill: function(silent) {
      this.dead = true;
      game.removeEntity(this);
    },
    draw: function() {
      this._super();
    }
  })
  
  var ParticleFade = Particle.extend({
    update: function() {
      this._super();
      this.alpha = Math.max(this.lifeTimer.delta() / -this.lifetime, 0);
    }
  })
  
  var ParticleExplosion = ParticleFade.extend({
    fill: "#FFFFFF",
    stroke: null,
    radius: 2,
    lifetime: 1,
    init: function(x, y, settings) {
      this.speed *= Math.random();
      this.angle = 2 * Math.PI * Math.random();
      this._super(x, y, settings);
    },
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, this.radius, this.fill, this.stroke, this.linesize, this.alpha);
    }
  })
  
  var Spark = ParticleExplosion.extend({
    speed: 40,
    fill: "#FF0000"
  })
  
  var ParticlePlayerExplode = ParticleExplosion.extend({
    speed: 400,
    fill: "#00FFFF"
  })
  
  var BulletExplode = Particle.extend({
    speed: 40,
    stroke: null,
    fill: "#00FFFF",
    radius: 2,
    lifetime: 1,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.speed *= Math.random();
      this.angle += Math.random() * Math.PI / 3 - 2 * Math.PI / 3;
      this.vel.x = this.speed * Math.cos(this.angle);
      this.vel.y = this.speed * Math.sin(this.angle);
    },
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, this.radius, this.fill, this.stroke, this.linesize, this.alpha);
      this.alpha = Math.max(this.lifeTimer.delta() / -this.lifetime, 0);
    }
  })
  
  var Shockwave = Particle.extend({
    speed: 15,
    lifetime: 3,
    radius: 1,
    fill: null,
    linesize: 5,
    init: function(x, y, settings) {
      this._super(x, y, settings)
      this.speed = this.speed + 5 * Math.random();
    },
    update: function() {
      this.radius += this.speed
      this._super()
    },
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, this.radius, this.fill, this.stroke, this.linesize, this.alpha);
    }
  })
  
  var ParticleTrail = Entity.extend({
      particles: [],
      lifetime: 5,
      width: 5,
      fill: "#FF0000",
      drawEvery: 1,
      fade: function(t) {
          return -t / this.lifetime + 1; //edit
      },
      shrink: function(t) {
          return this.sizeGradient * t + this.width;
      },
      init: function(x, y, settings) {
          this.sizeGradient = -this.width / this.lifetime;
          this._super(x, y, settings);
      },
      update: function(parent) {
          if (parent) {
              var angle = Math.atan2(parent.pos.y, parent.pos.x);
              this.particles.push({
                  pos: parent.pos,
                  angle: angle, 
                  time: system.time
              }); //insert at the start
          }
      },
      cleanup: function() {
          for (var i = this.particles.length - 1; i >= 0; i--) {
              if (system.time - this.particles[i].time > this.lifetime) {
                  this.particles.splice( i, 1 );
              } else {
                  break;
              }
          }
      },
      point: function( x ) {
          var size = this.shrink(system.time - x.time);
          var alpha = this.fade(system.time - x.time);
          return {
              alpha: this.fade(system.time - x.time),
              lpos: {
                  x: x.pos.x + size * Math.cos(x.angle + Math.PI / 2),
                  y: x.pos.y + size * Math.sin(x.angle + Math.PI / 2)
              },
              rpos: {
                  x: x.pos.x + size * Math.cos(x.angle - Math.PI / 2),
                  y: x.pos.y + size * Math.sin(x.angle - Math.PI / 2)
              }
          };
      },
      getPoints: function() {
          var points = [];
          for (var i = 0; i < this.particles.length; i++) {
              if (i % this.drawEvery == 0) {
                  points.push(this.point(this.particles[i]));
              };
          };
          return points;
      },
      draw: function() {
          this.cleanup();
          var points = this.getPoints();
          system.context.save();
          system.context.fillStyle = this.fill;
          for (var i = 0; i < points.length - 1; i++) {
              //system.context.globalAlpha = points[i].alpha;
              system.context.beginPath();
              system.context.moveTo( points[i].lpos.x, points[i].lpos.y );
              system.context.lineTo( points[i + 1].lpos.x, points[i + 1].lpos.y );
              system.context.lineTo( points[i + 1].rpos.x, points[i + 1].rpos.y );
              system.context.lineTo( points[i].rpos.x, points[i].rpos.y );
              system.context.lineTo( points[i].lpos.x, points[i].lpos.y );
              system.context.fill();
              system.context.fillRect(i, 0, 1, 1);
          };
          system.context.restore();
      }
  })
  
  var Cursor = Entity.extend({
    type: 5,
    color: "#00FFFF",
    update: function() {
      this.pos.x = input.mouse.x;
      this.pos.y = input.mouse.y;
    },
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, 2, this.color, this.color, 1, this.alpha)
    }
  })
  
  
  
  
  
  var Player = Entity.extend({
    speed: 150,
    mana: 100,
    maxMana: 100,
    manaRegen: 10,
    ammo: 100,
    maxAmmo: 100,
    fill: "#00FF00",
    stroke: "#00FFFF",
    type: 1,
    checkAgainst: 3,
    poly: new PolyPolar(2, 6),
    inAngle: 0,
    inShield: new PolyPolar(26, 6),
    explodeParticles: 20,
    update: function() {
      this.inAngle -= Math.PI * system.tick;
      this.angle = this.angleTo(game.cursor);
      this.handleInput();
      this._super();
      this.handleBounds();
    },
    handleBounds: function() {
      if (this.pos.x < 0) {
        this.pos.x = this.radius;
      }
      if (this.pos.y < 0) {
        this.pos.y = this.radius;
      }
      if (this.pos.x > system.canvas.width) {
        this.pos.x = system.canvas.width;
      }
      if (this.pos.y > system.canvas.height) {
        this.pos.y = system.canvas.height;
      }
    },
    handleInput: function() {
      this.vel.x = 0;
      this.vel.y = 0;
      if (input.state("up")) {
        this.vel.y = -100;
      }
      if (input.state("down")) {
        this.vel.y = 100;
      }
      if (input.state("left")) {
        this.vel.x = -100;
      }
      if (input.state("right")) {
        this.vel.x = 100;
      }
      if (input.state("mouse")) {
        this.shoot();
      }
    },
    explode: function() {
      game.spawnEntity(Shockwave, this.pos.x, this.pos.y, {})
      game.spawnEntity(ParticlePlayerExplode, this.pos.x, this.pos.y, {count: 50})
    },
    shoot: function() {},
    check: function() {
      this.kill();
    },
    draw: function() {
      game.drawPoly(this.curpoly.points, this.fill, this.stroke, this.linesize, this.alpha);
      game.drawPoly(this.inShield.getCoords(this.pos.x, this.pos.y, this.inAngle), null, this.stroke, 4, 0.2);
      this.drawStat(10, 5 * Math.PI / 6, -2 * Math.PI / 3, true, "#00FF00", this.mana / this.maxMana); //Special
      this.drawStat(15, 5 * Math.PI / 6, -2 * Math.PI / 3, true, "#00FFFF", this.ammo / this.maxAmmo); //Ammo
      this.drawStat(10, -5 * Math.PI / 6, 2 * Math.PI / 3, false, "#FFFF00", 0.5); //Super
      this.drawStat(15, -5 * Math.PI / 6, 2 * Math.PI / 3, false, "#FF0000", 0.5); //Health
    },
    drawStat: function(radius, start, length, direction, color, fraction) {
      start += this.angle;
      game.drawArc(this.pos.x, this.pos.y, radius, start, start + length, direction, null, "#888888", 2, 0.6);
      game.drawArc(this.pos.x, this.pos.y, radius, start, start + length * fraction, direction, null, color, 2, 1);
    }
  })
  
  var PlayerLaser = Player.extend({
    stroke: "#FFA7F7",
    laserColor: "#FFA7F7",
    laserDamage: 1,
    laserPoint: null,
    ammoUsage: 3,
    ammoRegen: 100,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      //this.trail = game.spawnEntity(ParticleTrail, 0, 0, {});
    },
    update: function() {
      this.laserPoint = null;
      this.ammo = limit(this.ammoRegen * system.tick + this.ammo, 0, this.maxAmmo);
      this.mana = limit(this.manaRegen * system.tick + this.mana, 0, this.maxMana);
      //this.trail.update(this);
      this._super();
    },
    handleInput: function() {
      this._super();
      this.laserDamage = (input.state("space")) ? 10 : 1;
      this.laserColor = (input.state("space")) ? "#0000FF" : "#FFA7F7";
    },
    shoot: function() {
      if (this.ammo > this.ammoUsage) {
           this.laserPoint = null;
        var endx = this.pos.x + system.canvas.width * Math.cos(this.angle);
        var endy = this.pos.y + system.canvas.width * Math.sin(this.angle);
        var ent = raycast(this.pos.x, this.pos.y, endx, endy, 3);
        this.laserPoint = (ent[0]) ? ent[1] : [endx, endy];
        if (ent[0]) {
          ent[0].receiveDamage(this.laserDamage, this);
          game.spawnEntity(BulletExplode, ent[1][0], ent[1][1], {
            angle: this.angle,
            fill: "#FFA7F7"
          })
        }
        this.ammo -= this.ammoUsage;
      }
    },
    flicker: function(range, minimum) {
      return Math.random() * range + minimum;
    },
    draw: function() {
      this._super();
      //this.trail.draw();
      if (this.laserPoint) {
        game.drawPoly([[this.pos.x, this.pos.y], this.laserPoint], null, this.laserColor, 3 * Math.random(), this.flicker(0.5, 0.25));
      }
    }
  })
  
  var PlayerScout = Player.extend({
    manaUsage: 5,
    ammo: 9,
    maxAmmo: 9,
    reload: 1,
    reloading: false,
    tracked: [],
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.shootTimer = new Timer(0.4);
      this.reloadTimer = new Timer(this.reload);
    },
    handleInput: function() {
      this._super();
      if (input.state("space") && this.mana > this.manaUsage) {
        this.mana -= this.manaUsage;
      } else {
        this.mana = limit(this.manaRegen * system.tick + this.mana, 0, this.maxMana);
      }
    },
    update: function() {
      this.tracked = [];
      this.updateReload();
      this._super();
    },
    updateReload: function() {
      var delta = this.reloadTimer.delta();
      if (this.ammo <= 0 && !this.reloading) {
        this.ammo = 0;
        this.reloading = true;
        this.reloadTimer.reset();
        
      } else if (delta > 0 && this.reloading) {
        this.reloading = false;
        this.ammo = this.maxAmmo;
      }
      
      if (delta < 0 && this.reloading) { //EDIT LATER TO MOVE THE OTHER WAY WITH OTHER COLOR
        this.ammo = this.maxAmmo * (1 + delta / this.reload);
        font.draw(10, 300, 2, "Ammo" + this.ammo);
      }
    },
    scan: function() {
      for (var i = 0; i < game.entities.length; i++) {
        if (game.entities[i].type == 3) {
          var angle = this.aimbot(game.entities[i]);
          if (angle) {
            game.spawnEntity(PlayerProjectilePierce, this.pos.x, this.pos.y, {
              angle: angle
            });
          }
        }
      }
    },
    shoot: function() {
      if (this.shootTimer.delta() >= 0 && this.reloadTimer.delta() > 0) {
        game.spawnEntity(PlayerProjectilePierce, this.pos.x, this.pos.y, {
          angle: this.angle
        });
        this.shootTimer.reset();
        --this.ammo;
      }
    }
  })
  
  var PlayerProjectilePierce = Entity.extend({
    speed: 500,
    damage: 10,
    fill: "#00FFFF",
    stroke: null,
    linesize: 2,
    type: 2,
    checkAgainst: 3,
    poly: new PolyPolar([
      [15, 0],
      [2, Math.PI / 2],
      [15, Math.PI],
      [2, 3 * Math.PI / 2]
    ]),
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.updatePoly();
      this.vel.x = PlayerProjectilePierce.speed * Math.cos(this.angle);
      this.vel.y = PlayerProjectilePierce.speed * Math.sin(this.angle);
    },
    update: function() {
      this._super();
      if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > system.canvas.width || this.pos.y > system.canvas.height) {
        this.kill();
      }
    },
    check: function(other) {
      other.receiveDamage(this.damage, this);
      game.spawnEntity(BulletExplode, this.pos.x, this.pos.y, {
        angle: -this.angle,
        count: 5
      })
    }
  })
  PlayerProjectilePierce.speed = 500
  
  
  
  var EnemyBullet = Entity.extend({
    type: 4,
    speed: 200,
    damage: 10,
    stroke: "#FF0000",
    checkAgainst: 1,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.vel.x += this.speed * Math.cos(this.angle);
      this.vel.y += this.speed * Math.sin(this.angle);
    },
    update: function() {
      this._super();
      if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > system.canvas.width || this.pos.y > system.canvas.height) {
        this.kill(true);
      }
    },
    check: function(other) {
      other.receiveDamage(this.damage, this);
      if (this.checkAgainst != 1) {
        this.kill();
      }
    }
  })
  
  var EnemyBulS = EnemyBullet.extend({
    fill: "#FF0000",
    speed: 150,
    damage: 10,
    poly: new PolyPolar(2, 6),
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, this.poly.radius, this.fill, this.stroke, this.linesize, this.alpha);
    }
  })
  
  var EnemyBulSB = EnemyBulS.extend({fill: "#0951CE", stroke: "#0951CE"})
  
  var EnemyBulM = EnemyBullet.extend({
    speed: 200,
    damage: 20,
    poly: new PolyPolar(5, 6),
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, this.poly.radius, this.fill, this.stroke, this.linesize, this.alpha);
    }
  })
  
  var EnemyBulL = EnemyBullet.extend({
    speed: 350,
    damage: 50,
    fill: "#FFFFFF",
    poly: new PolyPolar(15, 6),
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, this.poly.radius, this.fill, this.stroke, this.linesize, this.alpha);
    }
  })
  
  var EnemyBulLD = EnemyBullet.extend({
    destroy: true,
    speed: 250,
    damage: 50,
    poly: new PolyPolar(15, 6),
    draw: function() {
      game.drawCircle(this.pos.x, this.pos.y, this.poly.radius, this.fill, this.stroke, this.linesize, this.alpha);
    }
  })
  
  var EnemyBulCaltrop = EnemyBullet.extend({
    rps: 0.2,
    speed: 80,
    health: 30,
    damage: 30,
    destroy: false,
    dies: true,
    explodeParticles: 10,
    poly: new PolyPolar([
      [5, 0 * Math.PI / 3],
      [1, 1 * Math.PI / 3],
      [5, 2 * Math.PI / 3],
      [1, 3 * Math.PI / 3],
      [5, 4 * Math.PI / 3],
      [1, 5 * Math.PI / 3]
    ]),
    update: function() {
      this.angle += this.rps * 2 * Math.PI * system.tick;
      this._super();
    }
  })
  
  var EnemyBulPoison = EnemyBullet.extend({
    speed: 200,
    damage: 20,
    fill: null,
    stroke: "#00FF00",
    updateAngle: true,
    poly: new PolyPolar([
      [6, 1  * Math.PI/6], 
      [6, 5  * Math.PI/6], 
      [6, 7  * Math.PI/6], 
      [6, 11 * Math.PI/6]
    ])
  })
  
  var EnemyBulPlasmaS = EnemyBullet.extend({
    speed: 200,
    damage: 20,
    fill: null,
    stroke: "#00FF00",
    updateAngle: true,
    poly: new PolyPolar([
      [10, 1  * Math.PI/6], 
      [10, 5  * Math.PI/6], 
      [10, 7  * Math.PI/6], 
      [10, 11 * Math.PI/6]
    ])
  })
  
  var EnemyBulPlasmaL = EnemyBullet.extend({
    speed: 200,
    damage: 20,
    fill: null,
    stroke: "#00FF00",
    updateAngle: true,
    poly: new PolyPolar([
      [20, 1  * Math.PI/6], 
      [20, 5  * Math.PI/6], 
      [20, 7  * Math.PI/6], 
      [20, 11 * Math.PI/6]
    ])
  })
  
  var EnemyBulTracker = EnemyBullet.extend({
    baseAngle: 0,
    active: true,
    speed: 150,
    turnSpeed: Math.PI / 60,
    dies: true,
    fill: null,
    stroke: "#00FF00",
    poly: new PolyPolar(4, 3),
    curTurn: 0,
    maxTurn: Math.PI / 4,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.baseAngle = this.angle;
    },
    update: function() {
      if (!game.player.dead && this.active) {
        var diff = this.angleTo(game.player) - this.angle;
        var sign = (diff <= 0) ? 1 : -1;
        var divs = (Math.floor(diff / Math.PI) % 2 == 1.0) ? 1 : -1;
        var direction = sign * divs;
        var magnitude = Math.min(Math.abs(diff) % (Math.PI * 2), this.turnSpeed);
        
        this.curTurn += direction * magnitude;
        
        if (Math.abs(this.curTurn) >= this.maxTurn) {
          this.active = false;
          this.curTurn = direction * this.maxTurn
        }
        this.angle = this.baseAngle + this.curTurn;
        this.vel.x = Math.cos(this.angle) * this.speed;
        this.vel.y = Math.sin(this.angle) * this.speed;
      }
      this._super();
    }
  })
  
  var EnemyBulMine = EnemyBullet.extend({
    speed: 50,
    damage: 20,
    dies: true,
    fill: null,
    dist: 20,
    turn: Math.PI / 60,
    linewidth: 4,
    fill: "#FF0000",
    stroke: "#FFFFFF",
    poly: new PolyPolar(4, 3),
    update: function() {
      if (!game.player.dead) {
        var a = this.distanceTo(game.player);
        if (a <= this.dist) {
          var a = this.angleTo(game.player);
          this.angle += (a - this.angle).limit(-this.turn, this.turn);
          this.vel.x = Math.cos(this.angle) * this.speed * 4;
          this.vel.y = Math.sin(this.angle) * this.speed * 4;
        }
      }
      this._super();
    }
  })
  
  
  
  
  
  var Enemy = Entity.extend({
    rps: 1,
    type: 3,
    speed: 30,
    killScore: 10,
    checkAgainst: 6,
    shootSettings: {}, //spin or direct
    explodeParticles: 20,
    poly: new PolyPolar(10, 6),
    stroke: "#FF0000",
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.initShoot();
      this.vel.x = this.speed * Math.cos(this.angle);
      this.vel.y = this.speed * Math.sin(this.angle);
    },
    update: function() {
      this.angle += this.rps * 2 * Math.PI * system.tick;
      this._super();
      var r = this.poly.radius;
      if (this.pos.x < 0 - r - 10 || this.pos.y < 0 - r - 10 || this.pos.x > system.canvas.width + r + 10 || this.pos.y > system.canvas.height + r + 10) {
        this.kill(true);
      }
      this.shoot();
    },
    initShoot: function() {
      this.initShootSpin();
      this.initShootDirect();
    },
    shoot: function() {
      this.shootSpin();
      this.shootDirect();
    },
    initShootSpin: function() {
      if (this.shootSettings.shootType == "spin") {
        var settings = this.shootSettings;
        this.shootAngle = 0;
        this.projectile = settings.projectile; //array
        this.shootStepA = settings.shootStepA; //angle step
        this.shootTimer = new Timer(settings.shootTimer);
      }
    },
    shootSpin: function() {
      if (this.shootSettings.shootType == "spin" && this.shootTimer.delta() > 0) {
        for (var i = 0; i < this.projectile.length; i++) {
          game.spawnEntity(this.projectile[i], this.pos.x, this.pos.y, {
            angle: this.shootAngle + i * 2 * Math.PI / this.projectile.length,
            vel: {
              x: this.vel.x,
              y: this.vel.y
            }
          })
        }
        this.shootTimer.reset()
        this.shootAngle += this.shootStepA
      }
    },
    initShootDirect: function() {
      if (this.shootSettings.shootType == "direct") {
        var settings = this.shootSettings;
        this.shootTimer = new Timer(settings.shootTimer);
        this.projectile = settings.projectile;
      }
    },
    shootDirect: function(settings) {
      if (this.shootSettings.shootType == "direct") {
        this.angle = this.angleTo(game.player);
        if (this.shootTimer.delta() > 0) {
          for (var i = 0; i < this.projectile.length; i++) {
            game.spawnEntity(this.projectile[i][0], this.pos.x, this.pos.y, {
              angle: this.angle + this.projectile[i][1]
            })
          }
          this.shootTimer.reset()
        }
      }
    },
    aimBot: function(other) {
      if (this.shootSettings.shootVel) {
        var v = this.shootSettings.shootVel;
        var x = (other.pos.x - this.pos.x);
        var y = (other.pos.y - this.pos.y);
        var t = x / y;
        var a = Math.acos((t * this.vel.y - this.vel.x) / (v * (1 + t * t)));
        var b = Math.atan2(x, y);
        return a - b;
      }
      return this.angleTo(other);
    },
    check: function(other) {
      other.kill();
    },
    receiveDamage: function(amount, other) {
      this._super(amount, other);
      if (this.dead) {
        game.addScore(this.killScore);
      }
    },
    draw: function() {
      game.drawPoly(this.curpoly.points, this.fill, this.stroke, this.linesize, this.alpha);
    }
  })
  
  var EnemyPresets = {
    light: [
      { 
        killScore: 30,
        fill: "#FFFFFF",
        speed: 200,
        shootSettings: {
          shootType: "direct",
          projectile: [[EnemyBulTracker, 0]],
          shootTimer: 1
        }
      },
      { 
        killScore: 20,
        shootSettings: {
          shootType: "spin",
          projectile: [EnemyBulS],
          shootStepA: Math.PI / 20,
          shootTimer: 0.4
        }
      },
      { 
        killScore: 10,
        speed: 200,
        shootSettings: {
          shootType: "direct",
          projectile: [[EnemyBulS, 0]],
          shootTimer: 0.4,
          shootVel: 150
        }
      },
      { 
        killScore: 30,
        shootSettings: {
          shootType: "direct",
          projectile: [[EnemyBulM, 0]],
          shootTimer: 0.6,
          shootVel: 200
        }
      }
    ],
    medium: [
      { 
        killScore: 50,
        fill: "#FFFFFF",
        speed: 200,
        shootSettings: {
          shootType: "direct",
          projectile: [[EnemyBulTracker, 0]],
          shootTimer: 0.4
        }
      },
      {
        killScore: 20,
        shootSettings: {
          shootType: "spin",
          projectile: [EnemyBulS],
          shootStepA: Math.PI / 30,
          shootTimer: 0.3
        }
      },
      {
        killScore: 40,
        speed: 150,
        shootSettings: {
          shootType: "spin",
          projectile: [EnemyBulCaltrop],
          shootStepA: Math.PI / 4,
          shootTimer: 0.5
        }
      },
      {
        killScore: 50,
        speed: 50,
        shootSettings: {
          shootType: "spin",
          projectile: [EnemyBulS, EnemyBulSB],
          shootStepA: Math.PI / 4,
          shootTimer: 0.2
        }
      },
      {
        killScore: 30,
        speed: 50,
        shootSettings: {
          shootType: "spin",
          projectile: [EnemyBulPlasmaS, EnemyBulPlasmaS, EnemyBulPlasmaS, EnemyBulPlasmaS],
          shootStepA: Math.PI / 4,
          shootTimer: 0.5
        }
      }
    ],
    heavy: [
      { 
        killScore: 100,
        health: 100,
        poly: new PolyPolar(25, 6),
        shootSettings: {
          shootType: "direct",
          projectile: [[EnemyBulL, 0]],
          shootTimer: 0.8,
          shootVel: 350
        }
      },
      {
        killScore: 80,
        health: 100,
        speed: 50,
        poly: new PolyPolar(25, 6),
        shootSettings: {
          shootType: "spin",
          projectile: [EnemyBulS, EnemyBulSB],
          shootStepA: Math.PI / 30,
          shootTimer: 0.2
        }
      },
      {
        killScore: 100,
        health: 50,
        speed: 50,
        poly: new PolyPolar(25, 6),
        shootSettings: {
          shootType: "spin",
          projectile: [EnemyBulTracker, EnemyBulTracker],
          shootStepA: Math.PI / 30,
          shootTimer: 0.2
        }
      }
    ]
  }
  
  var BulletScript = Class.extend({
    data: {},           //Follow layout, should not need sorting
    angle: 0,           //Angle shift when shooting
    frame: 0,           //Current frame
    delay: 0,           //Delay between repeats
    loops: 0,           //Number of loops
    lifetime: 1,        //Time of one macro
    lockAngle: false,   //lock angle on reset?
    shootDirect: false, //Shoot at player
    init: function(settings) {
      merge(this, settings);
      this.totalFrames = this.lifetime + this.delay;
      this.loopedFrames = this.totalFrames * (this.loops + 1);
    },
    curFrame: function() {
      return this.frame % this.lifetime;
    },
    update: function(parent) {
      if (this.frame < this.loopedFrames) {
        //Still running
        if ((this.lockAngle && this.frame == 0) || this.shootDirect) {
          this.angle = parent.angleTo(game.player)
        }
        this.shoot(parent);
        this.frame += 1;
      } else {
        //If not still running delete
        parent.removeScript(this);
      }
    },
    shoot: function(parent) { //probably works
      var frameData = this.data[this.curFrame()];
      if (frameData) { //Only if frameData is defined
        for (var i = 0; i < frameData.scripts.length; i++) { //Adds other macros
          parent.addScript(frameData.scripts[i][0], frameData.scripts[i][0]);
        }
        for (var i = 0; i < frameData.bullets.length; i++) { //Adds shooting and shoots
          var data = frameData.bullets[i];
          game.spawnEntity(data[0], parent.pos.x, parent.pos.y, {
            angle: data[1] + this.angle
          })
        }
      }
    }
  });
  
  BulletScript.shootArc = function(bulletClass, number, delay, startAngle, length, direction, settings) {
    var settings = settings || {};
    var frameData = {};
    var stepAngle = direction * length / number;
    if (delay == 0) {
      var bullets = [];
      for (var i = 0; i < number; i++) {
        bullets.push([bulletClass, startAngle + i * stepAngle]);
      }
      frameData[0] = {
        bullets: bullets,
        scripts: []
      }
    } else {
      for (var i = 0; i < number; i++) {
        frameData[i * delay] = {
          bullets: [[bulletClass, startAngle + i * stepAngle]],
          scripts: []
        }
      }
    }
    settings.data = frameData;
    settings.lifetime = settings.lifetime || ((delay==0) ? 1 : number * delay);
    return BulletScript.extend(settings);
  }
  
  
  var BossBar = Class.extend({
    pos: {
      x: 0,
      y: 0
    },
    size: {
      x: 500,
      y: 16
    },
  
    name: "NONAME",
  
    borderFill: "#FFFFFF",
    healthFill: "#FF0000",
  
    state: 1,
    amount: 0,
    parent: null,
    drawSize: 0,
    drawName: 0,
  
    fillTime: 0.5,
    openTime: 0.5,
    closeTime: 0.5,
    flashTime: 0.05,
    nameTime: 0.1,
  
    init: function(x, y, settings) {
      merge(this, settings);
      this.pos = {
        x: x,
        y: y
      }
      this.fillSpeed = 1 / this.fillTime;
      this.openSpeed = 1 / this.openTime;
      this.closeSpeed = 1 / this.closeTime;
      this.flashTimer = new Timer(this.flashTime);
    },
    close: function() {
      this.state = BossBar.STATES.CLOSE;
    },
    update: function() {
      if (this.state == BossBar.STATES.OPEN) {
        if (this.drawSize < 1) {
          this.drawSize = (this.drawSize + this.openSpeed * system.tick).limit(0, 1);
        } else if (this.amount < 1) {
          this.amount = (this.amount + this.fillSpeed * system.tick).limit(0, 1);
          this.drawName = (this.drawName  + system.time / this.nameTime).limit(0, this.name.length);
        } else if (this.drawName < this.name.length) {
          this.drawName = (this.drawName  + system.time / this.nameTime).limit(0, this.name.length);
        } else {
          this.state = BossBar.STATES.DRAW;
        }
      }
      if (this.state == BossBar.STATES.CLOSE) {
        if (this.drawSize > 0) {
          this.drawSize = (this.drawSize - this.closeSpeed * system.tick).limit(0, 1);
        }
      }
      if (this.state == BossBar.STATES.DRAW) {
        var curAmount = this.parent.health / this.parent.maxHealth;
        if (curAmount < this.amount) {
          this.amount = curAmount;
          this.flashTimer.reset();
        }
      }
    },
    draw: function() {
      var name = this.drawName; //FIND OUT HOW TO SPLICE NAMES
      var length = Math.round(this.size.x * this.drawSize);
      var health = Math.round(this.amount * (length - 4));
      var color = (this.flashTimer.delta() > 0) ? this.healthFill : "#FFFFFF";
      var x = Math.round(this.pos.x - length / 2);
  
      if (length > 0) { //DRAW BORDER
        system.context.save();
        system.context.globalAlpha = 0.75;
        system.context.lineWidth = 2;
        system.context.strokeStyle = this.borderFill;
        system.context.strokeRect(x, this.pos.y, length, this.size.y);
        system.context.restore();
      }
      if (health > 0) { //DRAW HEALTH
        system.context.save();
        system.context.globalAlpha = 0.75;
        system.context.fillStyle = color;
        system.context.fillRect(x + 2, this.pos.y + 2, health, this.size.y - 4);
        system.context.restore();
      }
      //if (name.length > 0) {
      //  font.draw(name, this.pos.x, this.pos.y, center); //FIND OUT SYNTAX AND GET CENTER DRAW POSITION
      //}
    }
  })
  
  BossBar.STATES = {
    START: 0,
    OPEN: 1,
    DRAW: 2,
    CLOSE: 3
  }
  
  
  var EntityBoss = Entity.extend({
    healthBar: null,
    delayRemove: [],
    activeScripts: [],
    type: 3,
    killScore: 5000,
    checkAgainst: 6,
    poly: new PolyPolar(10, 6),
    stroke: "#FF0000",
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.healthBar = new BossBar(system.canvas.width / 2, 10, {
        parent: this
      });
    },
    update: function() {
      this._super();
      this.healthBar.update();
      this.updateScripts();
      this.cleanup();
    },
    updateScripts: function() {
      for (var i = 0; i < this.activeScripts.length; i++) {
        this.activeScripts[i].update(this);
      }
    },
    addScript: function(scriptClass, settings) {
      var settings = settings || {};
      var script = new scriptClass(settings);
      this.activeScripts.push(script);
    },
    removeScript: function(script) {
      this.delayRemove.push(script);
    },
    cleanup: function() {
      for (var i = this.delayRemove.length - 1; i >= 0; i--) {
        this.activeScripts.erase(this.delayRemove[i]);
        this.delayRemove.erase(this.delayRemove[i]);
      }
    },
    draw: function() {
      this._super();
      this.healthBar.draw();
    }
  })
  
  
  
  var BossZuptinBee = EnemyBullet.extend({
    type: 3,
    poly: new PolyPolar(3, 3),
    parent: null,
    health: 5,
    damage: 10,
    stroke: "#FFFF00",
    kill: function(silent) {
      if (this.parent && !silent) {
        this.parent.receiveDamage(this.damage, this);
      }
      this._super();
    }
  })
  
  var BossZuptinBeeAccel = BossZuptinBee.extend({
    poly: new PolyPolar(5, 3),
    speed: 500,
    aSpeed: 1000,
    health: 10,
    damage: 10,
    stroke: "#FFFF00",
    update: function() {
      this._super();
      if (!game.player.dead) {
        var angle = this.angleTo(game.player);
        this.accel.x = this.aSpeed * Math.cos(angle);
        this.accel.y = this.aSpeed * Math.sin(angle);
        this.angle = Math.atan2(this.vel.y, this.vel.x);
      }
    }
  })
  
  var BossZuptinBeeTracker = EnemyBulTracker.extend({
    poly: new PolyPolar(3, 3),
    health: 100,
    speed: 300,
    turnSpeed: Math.PI / 60,
    fill: null,
    stroke: "#FFFF00",
    maxTurn: 2 * Math.PI / 3,
    kill: function(silent) {
      if (this.parent && !silent) {
        this.parent.receiveDamage(this.damage, this);
      }
      this._super();
    }
  })
  
  var BossZuptinBeeMultiplyA = BossZuptinBee.extend({
    poly: new PolyPolar(7, 3),
    health: 20,
    speed: 500,
    reload: 0.3,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.shootTimer = new Timer(this.reload);
    },
    update: function() {
      this._super();
      if (this.shootTimer.delta() > 0) {
        game.spawnEntity(BossZuptinBeeMultiplyB, this.pos.x, this.pos.y, {
          angle: this.angle,
          parent: this.parent
        });
        this.shootTimer.reset();
      }
    }
  })
  
  var BossZuptinBeeMultiplyB = BossZuptinBee.extend({
    poly: new PolyPolar(5, 3),
    health: 10,
    speed: 10,
    reload: 0.4,
    lifetime: 4,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.shootTimer = new Timer(this.reload);
      this.lifeTimer = new Timer(this.lifetime);
    },
    update: function() {
      this._super();
      if (this.shootTimer.delta() > 0) {
        game.spawnEntity(BossZuptinBeeMultiplyC, this.pos.x, this.pos.y, {
          angle: this.angle + Math.PI / 2
        });
        game.spawnEntity(BossZuptinBeeMultiplyC, this.pos.x, this.pos.y, {
          angle: this.angle - Math.PI / 2
        });
        this.shootTimer.reset();
      }
      if (this.lifeTimer.delta() > 0) {
        this.kill();
      }
      //interesting draw
      //game.spawnEntity(BossZuptinBeeMultiplyB, this.pos.x, this.pos.y, {
      //  angle: this.angle - 5 * Math.PI / 6
      //});
      //game.spawnEntity(BossZuptinBeeMultiplyB, this.pos.x, this.pos.y, {
      //  angle: this.angle + 5 * Math.PI / 6
      //});
    }
  })
  
  var BossZuptinBeeMultiplyC = BossZuptinBee.extend({
    poly: new PolyPolar(3, 3),
    health: 1,
    damage: 1,
    speed: 300
  })
  
  
  var ScriptZuptinArcAccel = BulletScript.extend({
    data: {
      0: {
        bullets: [],
        scripts: [
          [BulletScript.shootArc(BossZuptinBeeAccel, 10, 6, Math.PI/6, Math.PI/3, 1, {}), {}],
          [BulletScript.shootArc(BossZuptinBeeAccel, 10, 6, -Math.PI/6, Math.PI/3, -1, {}), {}]
        ]
      }
    } 
  })
  
  
  var BossZuptin = EntityBoss.extend({
    health: 1000,
    maxHealth: 1000,
    poly: new PolyPolar(20, 3),
    stroke: "#FFFF00",
    reload: 0.1,
    init: function(x, y, settings) {
      this._super(x, y, settings);
      this.shootTimer = new Timer(this.reload);
    },
    update: function() {
      //if (this.activeScripts.length == 0) {
      //  this.addScript(ScriptZuptinArcAccel, {});
      //}
      if (this.shootTimer.delta() > 0) {
        game.spawnEntity(BossZuptinBeeMultiplyC, this.pos.x, this.pos.y, {
          angle: this.angle,
          parent: this
        });
        this.shootTimer.reset();
      }
      this._super();
    },
    receiveDamage: function(amount, from) {
      if (from instanceof BossZuptinBee) {
        this._super(amount, from);
      }
    }
  })
  
  
  var Font = Class.extend({
    charList: [
      [" ", 0, "               "],
      ["A", 1, "#### ##### ## #"],
      ["B", 2, "## # ##### ### "],
      ["C", 3, "####  #  #  ###"],
      ["D", 4, "## # ## ## ### "],
      ["E", 5, "####  ####  ###"],
      ["F", 6, "####  ####  #  "],
      ["G", 7, "####  # ## ####"],
      ["H", 8, "# ## ##### ## #"],
      ["I", 9, "### #  #  # ###"],
      ["J", 10, "  #  #  ## ####"],
      ["K", 11, "# ## ### # ## #"],
      ["L", 12, "#  #  #  #  ###"],
      ["M", 13, "# ######## ## #"],
      ["N", 14, "#### ## ## ## #"],
      ["O", 15, "#### ## ## ####"],
      ["P", 16, "#### #####  #  "],
      ["Q", 17, "#### ## #### ##"],
      ["R", 18, "#### ###### # #"],
      ["S", 19, "####  ###  ####"],
      ["T", 20, "### #  #  #  # "],
      ["U", 21, "# ## ## ## ####"],
      ["V", 22, "# ## ## ## # # "],
      ["W", 23, "# ## ######## #"],
      ["X", 24, "# ## # # # ## #"],
      ["Y", 25, "# ## ## # #  # "],
      ["Z", 26, "###  # # #  ###"],
      ["0", 27, "#### ## ## ####"],
      ["1", 28, " #  #  #  #  # "],
      ["2", 29, "###  #####  ###"],
      ["3", 30, "###  ####  ####"],
      ["4", 31, "# ## ####  #  #"],
      ["5", 32, "####  ###  ####"],
      ["6", 33, "####  #### ####"],
      ["7", 34, "###  #  #  #  #"],
      ["8", 35, "#### ##### ####"],
      ["9", 36, "#### ####  ####"],
      ["/", 37, "  #  # # #  #  "],
      [":", 38, "   #     #     "],
      [",", 39, "         #  #  "],
      [".", 40, "            #  "],
      ["~", 41, "###############"],
      ["-", 42, "      ###      "]
    ],
    init: function() {
      this.initFonts = [];
      this.drawList = this.convertCharList(this.charList);
    },
    sumRange: function(n) {
      var t = 0;
      for (var i = 1; i <= n; i++) {
        t += i;
      }
      return t;
    },
    initFont: function(size) {
      var sx = size * 4;
      var ctx = system.hiddenContext;
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.translate(0, this.sumRange(size) * 4);
      for (var i in this.drawList) {
        var index = this.drawList[i][0] * sx;
        var list = this.drawList[i][1];
        ctx.save()
        ctx.translate(index, 0);
        for (var j = 0; j < list.length; j++) {
          ctx.save();
          ctx.translate(list[j][0] * size, list[j][1] * size);
          ctx.fillRect(0, 0, size, size);
          ctx.restore();
        }
        ctx.restore();
      } 
      ctx.restore();
    },
    draw: function(x, y, size, text) {
      if (!(size in this.initFonts)) {
        this.initFont(size);
      }
      var s = size * 5;
      var d = size * 3;
      var sy = this.sumRange(size) * 4;
      var text = text.toUpperCase();
      var ctx = system.context;
      var canvas = system.hiddenCanvas;
      ctx.save();
      ctx.translate(x, y);
      for (var i = 0; i < text.length; i++) {
        var char = this.drawList[text[i]] || this.drawList["~"];
        var sx = char[0] * size * 4;
        ctx.drawImage(canvas, sx, sy, d, s, 0, 0, d, s);
        ctx.translate(size * 4, 0);
      }
      ctx.restore();
    },
    convertChar: function(char) {
      var l = [];
      for (var i = 0; i < char.length; i++) {
        if (char[i] == "#") {
          var y = Math.floor(i / 3);
          var x = i % 3;
          l.push([x, y]);
        }
      }
      return l;
    },
    convertCharList: function(list) {
      var l = {};
      for (var i = 0; i < list.length; i++) {
        var char = list[i][0];
        var index = list[i][1];
        var coords = this.convertChar(list[i][2]);
        l[char] = [index, coords];
      }
      return l;
    }
  })
  
  
  
  var MenuItem = Class.extend({
    pos: {x: 0, y: 0},
    size: 1,
    text: "none",
    align: "none",
    click: function() {},
    init: function() {
      this.width = this.text.length * this.size * 4;
      this.height = this.size * 5;
      if (this.align == "c") {
        this.pos.x = (system.canvas.width - this.width) / 2;
      }
    },
  });
  
  var StartGame = MenuItem.extend({
    pos: {x: 10, y: 360},
    size: 3,
    align: "c",
    text: "play",
    click: function() {
      game.setGame();
    }
  })
  
  var PlayAgain = MenuItem.extend({
    pos: {x: 10, y: 340},
    size: 3,
    align: "c",
    text: "play again",
    click: function() {
      game.setGame();
    }
  })
  
  var GameScore = MenuItem.extend({
    pos: {x: 0, y: 300},
    size: 3,
    align: "c",
    text: "Score:",
    update: function(text) {
      this.text = "Score: " + text;
      this.pos.x = (system.canvas.width - this.text.length * this.size * 4) / 2;
    },
  })
  
  
  var Menu = Class.extend({
    current: 0,
    itemClasses: [],
    items: [],
    init: function() {
      for (var i = 0; i < this.itemClasses.length; i++) {
        this.items.push(new this.itemClasses[i]());
      }
    },
    overItem(item) {
      var mouse = input.mouse;
      var inx = item.pos.x <= mouse.x && mouse.x <= item.pos.x + item.width;
      var iny = item.pos.y <= mouse.y && mouse.y <= item.pos.y + item.height;
      return inx && iny;
    },
    update: function() {
      var hoverItem = null;
      for (var i = 0; i < this.items.length; i++) {
        if (this.overItem(this.items[i])) {
          hoverItem = this.items[i];
          this.current = i;
        }
      }
      if (hoverItem) {
        system.canvas.style.cursor = 'pointer';
        if (input.pressed('mouse')) {
          hoverItem.click();
        }
      } else {
        system.canvas.style.cursor = 'auto';
      }
    },
    draw: function() {
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        font.draw(item.pos.x, item.pos.y, item.size, item.text);
      }
    }
  });
  
  
  var MainMenu = Menu.extend({
    itemClasses: [StartGame],
    draw: function() {
      this._super();
      font.draw(360, 250, 6, "Some Name Here");
      font.draw(420, 300, 2, "shoot everything");
    }
  })
  
  var GameOver = Menu.extend({
    score: 0,
    itemClasses: [GameScore, PlayAgain],
    update: function() {
      this._super();
      this.score = game.score;
      this.items[0].update(this.score);
      game.updateGame();
    },
    draw: function() {
      this._super();
      font.draw(408, 250, 4, "Game Over");
    }
  })
  
  var raycast = function(ax, ay, bx, by, type) {
    var poly = [[ax, ay], [bx, by]];
    var point = NaN;
    var entity = null;
    var minDist = NaN;
    
    for (var i = 0; i < game.entities.length; i++) {
      var ent = game.entities[i];
      if (ent.type == type) {
        var intersection = ent.curpoly.rayIntersect(poly);
        if (!isNaN(intersection[1]) && !(intersection[1] >= minDist)) {
          entity = ent
          point = intersection[0];
          minDist = intersection[1];
        }
      }
    }
    return [entity, point];
  }
  
  var EntityPool = Class.extend({ //Wave maker
    spawnList: EnemyPresets,
    getWave: function(wave) {
        var entities = [];
        var spawn = this.getSpawnNo(wave);
        for (var i = 0; i < spawn[0][1]; i++) {
          var e = this.spawnList.light.random();
          var d = this.getSpawnData(e);
          entities.push([e, d]);
        }
        for (var i = 0; i < spawn[1][1]; i++) {
          var e = this.spawnList.medium.random();
          var d = this.getSpawnData(e);
          entities.push([e, d]);
        }
        for (var i = 0; i < spawn[2][1]; i++) {
          var e = this.spawnList.heavy.random();
          var d = this.getSpawnData(e);
          entities.push([e, d]);
        }
        return entities;
    },
    getSpawnNo: function(wave) {
      return [
        ["light", Math.floor(wave * 0.9 + 4)],
        ["medium", Math.floor(wave * 0.5 + 1)],
        ["heavy", Math.floor(wave * 0.3 + 0.5)]
      ]
    },
    getSpawnData: function(entity) {
      var aside = [0, 1].random();
      var bside = {0: 1, 1: 0}[aside];
      var axis = ["h", "v"].random();
      var radius = 0;
      var width = system.canvas.width + radius;
      var height = system.canvas.height + radius;
      var ax = (axis == "h") ? randRange(-radius, width) : [-radius, width][aside];
      var ay = (axis == "h") ? [-radius, height][aside]  : randRange(-radius, height);
      var bx = (axis == "h") ? randRange(-radius, width) : [-radius, width][bside];
      var by = (axis == "h") ? [-radius, height][bside]  : randRange(-radius, height);
      var angle = Math.atan2(by - ay, bx - ax);
      return {x: ax, y: ay, angle: angle};
    }
  });
  
  var BackgroundMap = Class.extend({
    xspeed: 0.3,
    yspeed: 0.2,
    init: function() {
      this.backCanvas = document.createElement('canvas');
      this.backContext = this.backCanvas.getContext('2d');
      this.backCanvas.width = system.canvas.width * 2;
      this.backCanvas.height = system.canvas.height * 2;
      this.ready();
    },
    ready: function() {
      var ctx = this.backContext;
      var canvas = this.backCanvas;
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#FFFFFF";
      for (var i = 0; i <= system.xsec; i++) {
        ctx.beginPath();
        ctx.moveTo(i * canvas.width / system.xsec, 0);
        ctx.lineTo(i * canvas.width / system.xsec, canvas.height * 2);
        ctx.stroke();
      }
      for (var i = 0; i <= system.ysec; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * canvas.height / system.ysec);
        ctx.lineTo(canvas.width * 2, i * canvas.height / system.ysec);
        ctx.stroke();
      }
    },
    draw: function() {
      var canvas = this.backCanvas;
      var w = system.canvas.width * 1.5;
      var h = system.canvas.height * 1.5;
      var sx = (1 - (system.time % this.xspeed) / this.xspeed) * (canvas.width / (system.xsec));
      var sy = (1 - (system.time % this.yspeed) / this.yspeed) * (canvas.height / (system.ysec));
      system.context.save();
      system.context.globalAlpha = 0.05;
      system.context.translate(0, -h/3);
      system.context.rotate(Math.PI / 20);
      system.context.drawImage(canvas, sx, sy, w, h, 0, 0, w, h);
      system.context.restore();
    }
  });
  
  var Game = Class.extend({
    wave: 0,
    mode: 0,
    score: 0,
    menu: null,
    waveScore: 100,
    player: null,
    waveEntities: [],
    MODES: {
      MENU: 0,
      REFLECTION: 1,
      CLASSIC: 2  //to be added
    },
    init: function() {
      this.menuList = {
        MAIN: new MainMenu(),
        OVER: new GameOver()
      }
      this.entities = [];
      this.spawnTimer = new Timer(0);
      this.menu = this.menuList.MAIN;
      this.entityPool = new EntityPool();
      this.backgroundMap = new BackgroundMap();
    },
    ready: function() {
      input.bind(87, "up");
      input.bind(83, "down");
      input.bind(65, "left");
      input.bind(68, "right");
      input.bind(32, "space");
      input.bind(-1, "mouse");
      input.bind(16, "special");
      input.bind(70, "restart");
    },
    addScore: function(amount) {
      if (!this.player.dead) {
        this.score += amount;
      }
    },
    setMenu: function(menu) {
      this.mode = 0;
      this.menu = menu;
      system.canvas.style.cursor = "auto";
    },
    setWave: function() {
      this.wave += 1;
      this.addScore(this.waveScore);
      this.waveEntities = this.entityPool.getWave(this.wave);
      this.spawnTimer.setTime((2.3 - this.wave * 0.05).limit(0.3, 2.2));
    },
    setGame: function() {
      system.canvas.style.cursor = "none";
      this.mode = 1;
      this.wave = 0;
      this.score = 0;
      this.entities = [];
      this.waveEntities = [];
      var w = system.canvas.width / 2;
      var h = system.canvas.height / 2;
      this.cursor = this.spawnEntity(Cursor, 0, 0);
      this.player = this.spawnEntity(PlayerLaser, w, h);
    },
    spawnEntity: function(EntityClass, x, y, settings) {
      var settings = settings || {};
      
      if (settings.count) {
        var ents = [];
        for (var i = 0; i < settings.count; i++) {
          var e = new EntityClass(x, y, settings);
          this.entities.push(e);
          ents.push(e); 
        }
        return ents;
  
      } else {
        var e = new EntityClass(x, y, settings);
        this.entities.push(e);
        return e;
      }
    },
    removeEntity: function(entity) {
      this.entities = this.entities.filter(function(e, i, a) {
        return e != entity;
      });
    },
    update: function() {
      system.update();
      if (this.mode == 1) {
        this.updateGame();
      } else if (this.mode == 0) {
        this.menu.update();
      }
      this.draw();
      this.debug();
      input.clearPressed();
      window.requestAnimationFrame(this.update.bind(this));
    },
    updateGame: function() {
      this.updateWave();
      this.updateEntities();
      this.checkCollision();
      if (input.pressed("restart")) {this.setGame()}
      if (this.player.dead) {this.setMenu(this.menuList.OVER)}
    },
    updateWave: function() {
      if (this.waveEntities.length > 0 && this.spawnTimer.delta() > 0) {
        var entity = this.waveEntities.random();
        this.waveEntities.erase(entity);
        var e = entity[0];
        var d = entity[1];
        e.angle = d.angle;
        var entity = this.spawnEntity(Enemy, d.x, d.y, e);
        this.spawnTimer.reset();
      } else if (this.checkWave()) {
        this.setWave();
      }
    },
    updateEntities: function() {
      for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].update();
      }
    },
    checkCollision: function() {
      for (var i = 0; i < this.entities.length - 1; i++) {
        for (var j = i + 1; j < this.entities.length; j++) {
          var a = this.entities[i];
          var b = this.entities[j];
          this.checkEntities(a, b);
          this.checkEntities(b, a);
        }
      }
    },
    checkEntities: function(a, b) {
      if (a.checkAgainst == b.type) {
        if (a.touches(b)) {
          a.check(b);
        }
      }
    },
    checkWave: function() {
      var a = this.waveEntities.length == 0;
      var b = this.entities.filter(function(e, i, a) {
          return e.type == 3;
      }).length == 0;
      return a && b;
    },
    draw: function() {
      this.drawBackground();
      if (this.menu == this.menuList.OVER) {
        this.drawEntities();
      }
      if (this.mode == 1) {
        this.drawEntities();
      }
      if (this.mode == 0) {
        this.menu.draw();
      }
      //this.invert();
    },
    drawEntities: function() {
      for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw();
      }
    },
    drawBackground: function() {
      system.context.clearRect(0, 0, system.canvas.width, system.canvas.height);
      system.context.fillStyle = "#000000";
      system.context.fillRect(0, 0, system.canvas.width, system.canvas.height);
      this.backgroundMap.draw();
    },
    drawCircle: function(x, y, radius, fill, stroke, width, alpha) {
      system.context.beginPath();
      system.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.render(fill, stroke, width, alpha);
    },
    drawArc: function(x, y, radius, start, stop, clockwise, fill, stroke, width, alpha) {
      system.context.beginPath();
      system.context.arc(x, y, radius, start, stop, clockwise);
      this.render(fill, stroke, width, alpha);
    },
    drawPoly: function(points, fill, stroke, width, alpha) {
      if (points.length < 1) {
        throw "Length of points smaller than one";
      }
      var ctx = system.context;
      ctx.beginPath();
      var x = (this.drawPixel) ? Math.round(points[0][0]) : points[0][0];
      var y = (this.drawPixel) ? Math.round(points[0][1]) : points[0][1];
      ctx.moveTo(x, y);
  
      for (var i = 0; i < points.length; i++) {
        var x = (this.drawPixel) ? Math.round(points[i][0]) : points[i][0];
        var y = (this.drawPixel) ? Math.round(points[i][1]) : points[i][1];
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      this.render(fill, stroke, width, alpha);
    },
    invert: function() {
      system.context.globalCompositeOperation = 'difference'; //'source-over'
      system.context.fillStyle = '#FFFFFF';
      system.context.fillRect(0, 0, system.canvas.width, system.canvas.height);
      system.context.globalCompositeOperation = 'source-over';
    },
    render: function(fill, stroke, width, alpha) {
      var ctx = system.context;
      ctx.save();
      if (alpha) {
        ctx.globalAlpha = alpha;
      }
      ctx.lineWidth = width || 2;
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.stroke();
      }
      ctx.restore();
    },
    debug: function() {
      if (debug) {
        if (this.mode == 1) {
          font.draw(10, 70, 2, "entity: " + this.entities.length);
          font.draw(10, 90, 2, "x: " + Math.round(this.player.pos.x));
          font.draw(10, 110, 2, "y: " + Math.round(this.player.pos.y));
        }
      }
    }
  })
  
  var system = new System();
  var input = new Input();
  var game = new Game();
  var font = new Font();
  game.ready()
  game.update()
  