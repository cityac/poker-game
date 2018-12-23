  declare interface Document {
    fullscreenElement: HTMLElement,
    mozFullScreenElement:HTMLElement,
    webkitFullscreenElement:HTMLElement,
    msFullscreenElement:HTMLElement,
    mozCancelFullScreen:Function,
    webkitExitFullscreen:Function,
    msExitFullscreen:Function,
  }
  declare interface HTMLElement{
    mozRequestFullScreen:Function,
    webkitRequestFullScreen:Function,
    msRequestFullscreen:Function,
  }