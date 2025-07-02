if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

function showErrorMessage() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "/assets/goToFreeMedium.png",
    title: `Invalid Article`,
    message:
      "Please open an article and try again. If the problem continues, feel free to contact me on X (Twitter) at @pingfodass.",
    priority: 1,
  });
}

function goToFreedum(url) {
  const baseURL = "https://freedium.cfd/";
  const newURL = baseURL + url;

  try {
    chrome.tabs.create({ url: newURL });
  } catch (error) {
    console.log(error);
    showErrorMessage();
  }
}

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "goToFreedum",
    title: "Go to free version",
    contexts: ["all"],
  });

  chrome.contextMenus.onClicked.addListener((tab) => goToFreedum(tab.pageUrl));
  chrome.action.onClicked.addListener((tab) => goToFreedum(tab.url));
});
