export function run() {
  observe(window.document);
  document.body.addEventListener('gesture-up', vGestureHandler, false); // 0-50ms vs 500ms with normal click
  document.body.addEventListener('gesture-down', vGestureHandler, false); // 0-50ms vs 500ms with normal click
  document.addEventListener('touchmove', touchMoveHandler,  { passive: false });
}

function vGestureHandler(event) {
  console.log(event);
  event.preventDefault();
}

function touchMoveHandler(event) {
  if(event.touches && event.touches.length > 1) {
    event.preventDefault();
  }
}

const observe = function(d) {
  var newEvent = function(e, name) {
      // This style is already deprecated but very well supported in real world: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/initCustomEvent
      // in future we want to use CustomEvent function: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
      var a = document.createEvent("CustomEvent");
      a.initCustomEvent(name, true, true, e.target);
      e.target.dispatchEvent(a);
      a = null;
      return false
  };
//   var debug = false; // emit info to JS console for all touch events?
  var active = false; // flag to tell if touchend should complete the gesture
  var min_gesture_length = 20; // minimum gesture length in pixels
  var tolerance = 0.3; // value 0 means pixel perfect movement up or down/left or right is required, 0.5 or more means any diagonal will do, values between can be tweaked

  var sp = { x: 0, y: 0, px: 0, py: 0 }; // start point
  var ep = { x: 0, y: 0, px: 0, py: 0 }; // end point
  var touch = {
      touchstart: function(e) {
          active = true;
          const t = e.touches[0];
          sp = { x: t.screenX, y: t.screenY, px: t.pageX, py: t.pageY };
          ep = sp; // make sure we have a sensible end poin in case next event is touchend
        //   debug && console.log("start", sp);
      },
      touchmove: function(e) {
          if (e.touches.length > 1) {
              active = false;
            //   debug && console.log("aborting gesture because multiple touches detected");
              return;
          }
          const t = e.touches[0];
          ep = { x: t.screenX, y: t.screenY, px: t.pageX, py: t.pageY };
        //   debug && console.log("move", ep, sp);
      },
      touchend: function(e) {
          if (!active)
              return;
        //   debug && console.log("end", ep, sp);
          var dx = Math.abs(ep.x - sp.x);
          var dy = Math.abs(ep.y - sp.y);

          if (Math.max(dx, dy) < min_gesture_length) {
            //   debug && console.log("ignoring short gesture");
              return; // too short gesture, ignore
          }

          if (dy > dx && dx/dy < tolerance && Math.abs(sp.py - ep.py) > min_gesture_length) { // up or down, ignore if page scrolled with touch
              newEvent(e, (ep.y - sp.y < 0 ? 'gesture-up' : 'gesture-down'));
              //e.cancelable && e.preventDefault();
          }
          else if (dx > dy && dy/dx < tolerance && Math.abs(sp.px - ep.px) > min_gesture_length) { // left or right, ignore if page scrolled with touch
              newEvent(e, (ep.x - sp.x < 0 ? 'gesture-left' : 'gesture-right'));
              //e.cancelable && e.preventDefault();
          }
          else {
            //   debug && console.log("ignoring diagonal gesture or scrolled content");
          }
          active = false;
      },
      touchcancel: function() {
        //   debug && console.log("cancelling gesture");
          active = false;
      }
  };
  for (var a in touch) {
      d.addEventListener(a, touch[a], false);
  }
}


