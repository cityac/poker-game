export function fullScreen(on) {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  // if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement {
  if (on) {
    requestFullScreen && requestFullScreen.call(docEl);
  }
  else if (doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
    cancelFullScreen && cancelFullScreen.call(doc);
  }
}
