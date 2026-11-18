export const MOTION_STORAGE_KEY = "iou-motion";

/** Restores a saved "paused" preference before first paint (rendered as an inline script). */
export const MOTION_INIT_SCRIPT = `try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}`;
