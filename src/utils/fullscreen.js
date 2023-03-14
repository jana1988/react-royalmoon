export const isFullscreenSupport = (el) => {
  if (!el) return null;
  if (el.requestFullscreen) return true;
  if (el.msRequestFullscreen) return true;
  if (el.mozRequestFullScreen) return true;
  if (el.webkitRequestFullscreen) return true;
  return null;
};

export const fullscreenFn = (el) => {
  if (!el) return null;
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.msRequestFullscreen) return el.msRequestFullscreen();
  if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  return null;
};

export const isElFullscreen = (el) => {
  if (!el) return false;
  if (el.fullscreenElement) return true;
  if (el.msFullscreenElement) return true;
  if (el.mozFullScreenElement) return true;
  if (el.webkitFullscreenElement) return true;
  return false;
};

export const exitFullscreenFn = (el) => {
  if (!el) return null;
  if (el.exitFullscreen) return el.exitFullscreen();
  if (el.msExitFullscreen) return el.msExitFullscreen();
  if (el.mozCancelFullScreen) return el.mozCancelFullScreen();
  if (el.webkitExitFullscreen) return el.webkitExitFullscreen();
  return null;
};
