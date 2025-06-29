if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  sendResponse(document.all[0].outerHTML);
});
