jQuery( function() {
    
    jQuery("#canvas").on("click", function () {
        var canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d'),
          mouse = utils.captureMouse(canvas),
          points = [],
          triangles = [],
          fl = 250,
          vpX = canvas.width / 2,
          vpY = canvas.height / 2,
          angleX, angleY;

      //pyramid
      points[0] = new Point3d(   0, -100,    0);
      points[1] = new Point3d( 100,  100, -100);
      points[2] = new Point3d(-100,  100, -100);
      points[3] = new Point3d(-100,  100,  100);
      points[4] = new Point3d( 100,  100,  100);
      
      points.forEach(function (point) {
        point.setVanishingPoint(vpX, vpY);
        point.setCenter(0, 0, 200);
      });

      triangles[0]  = new Triangle(points[0], points[1], points[2], "#6666cc");
      triangles[1]  = new Triangle(points[0], points[2], points[3], "#66cc66");
      triangles[2]  = new Triangle(points[0], points[3], points[4], "#cc6666");
      triangles[3]  = new Triangle(points[0], points[4], points[1], "#66cccc");
      triangles[4]  = new Triangle(points[1], points[3], points[2], "#cc66cc");
      triangles[5]  = new Triangle(points[1], points[4], points[3], "#cc66cc");

      function move (point) {
        point.rotateX(angleX);
        point.rotateY(angleY);
      }

      function draw (triangle) {
        triangle.draw(context);
      }

      (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        angleX = (mouse.y - vpY) * 0.0005;
        angleY = (mouse.x - vpX) * 0.0005;
        points.forEach(move);
        triangles.forEach(draw);
      }());
    });
});
    

/**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                  });
}

/**
 * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec.
 *
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}

/* Object that contains our utility functions.
 * Attached to the window object which acts as the global namespace.
 */
window.utils = {};

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
window.utils.captureMouse = function (element) {
  var mouse = {x: 0, y: 0, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;
  
  element.addEventListener('mousemove', function (event) {
    var x, y;
    
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft;
      y = event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
  }, false);
  
  return mouse;
};

/**
 * Keeps track of the current (first) touch position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, isPressed, event
 */
window.utils.captureTouch = function (element) {
  var touch = {x: null, y: null, isPressed: false, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;

  element.addEventListener('touchstart', function (event) {
    touch.isPressed = true;
    touch.event = event;
  }, false);

  element.addEventListener('touchend', function (event) {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
    touch.event = event;
  }, false);
  
  element.addEventListener('touchmove', function (event) {
    var x, y,
        touch_event = event.touches[0]; //first touch
    
    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
      y = touch_event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    touch.x = x;
    touch.y = y;
    touch.event = event;
  }, false);
  
  return touch;
};

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
window.utils.parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};

/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
window.utils.colorToRGB = function (color, alpha) {
  //number in octal format or string prefixed with #
  if (typeof color === 'string' && color[0] === '#') {
    color = window.parseInt(color.slice(1), 16);
  }
  alpha = (alpha === undefined) ? 1 : alpha;
  //parse hex values
  var r = color >> 16 & 0xff,
      g = color >> 8 & 0xff,
      b = color & 0xff,
      a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
  //only use 'rgba' if needed
  if (a === 1) {
    return "rgb("+ r +","+ g +","+ b +")";
  } else {
    return "rgba("+ r +","+ g +","+ b +","+ a +")";
  }
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {number}  x     Coordinate position x.
 * @param {number}  y     Coordinate position y.
 * @return {boolean}
 */
window.utils.containsPoint = function (rect, x, y) {
  return !(x < rect.x ||
           x > rect.x + rect.width ||
           y < rect.y ||
           y > rect.y + rect.height);
};

/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
window.utils.intersects = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
           rectB.x + rectB.width < rectA.x ||
           rectA.y + rectA.height < rectB.y ||
           rectB.y + rectB.height < rectA.y);
};


function Point3d (x, y, z) {
  this.x = (x === undefined) ? 0 : x;
  this.y = (y === undefined) ? 0 : y;
  this.z = (z === undefined) ? 0 : z;
  this.fl = 250;
  this.vpX = 0;
  this.vpY = 0;
  this.cX = 0;
  this.cY = 0;
  this.cZ = 0;
}

Point3d.prototype.setVanishingPoint = function (vpX, vpY) {
  this.vpX = vpX;
  this.vpY = vpY;
};

Point3d.prototype.setCenter = function (cX, cY, cZ) {
  this.cX = cX;
  this.cY = cY;
  this.cZ = cZ;
};

Point3d.prototype.rotateX = function (angleX) {
  var cosX = Math.cos(angleX),
      sinX = Math.sin(angleX),
      y1 = this.y * cosX - this.z * sinX,
      z1 = this.z * cosX + this.y * sinX;
  this.y = y1;
  this.z = z1;
};
   
Point3d.prototype.rotateY = function (angleY) {
  var cosY = Math.cos(angleY),
      sinY = Math.sin(angleY),
      x1 = this.x * cosY - this.z * sinY,
      z1 = this.z * cosY + this.x * sinY;
  this.x = x1;
  this.z = z1;
};

Point3d.prototype.rotateZ = function (angleZ) {
  var cosZ = Math.cos(angleZ),
      sinZ = Math.sin(angleZ),
      x1 = this.x * cosZ - this.y * sinZ,
      y1 = this.y * cosZ + this.x * sinZ;
  this.x = x1;
  this.y = y1;
};

Point3d.prototype.getScreenX = function () {
  var scale = this.fl / (this.fl + this.z + this.cZ);
  return this.vpX + (this.cX + this.x) * scale;
};

Point3d.prototype.getScreenY = function () {
  var scale = this.fl / (this.fl + this.z + this.cZ);
  return this.vpY + (this.cY + this.y) * scale;
};

function Triangle (a, b, c, color) {
  this.pointA = a;
  this.pointB = b;
  this.pointC = c;
  this.color = (color === undefined) ? "#ff0000" : utils.parseColor(color);
  this.lineWidth = 1;
  this.alpha = 0.5;
}

Triangle.prototype.draw = function (context) {
  context.save();
  context.lineWidth = this.lineWidth;
  context.fillStyle = context.strokeStyle = utils.colorToRGB(this.color, this.alpha);
  context.beginPath();
  context.moveTo(this.pointA.getScreenX(), this.pointA.getScreenY());
  context.lineTo(this.pointB.getScreenX(), this.pointB.getScreenY());
  context.lineTo(this.pointC.getScreenX(), this.pointC.getScreenY());
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
