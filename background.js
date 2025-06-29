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

  fetch(newURL)
    .then((response) => {
      if (response.ok) return response.text();

      showErrorMessage();
      throw Error("Invalid article");
    })
    .catch((err) => console.log(err))
    .then((resp) => {
      if (!resp) return;

      if (
        resp.includes("Opps!") ||
        resp.includes("Unable to identify the Medium article URL.")
      )
        return showErrorMessage();

      chrome.tabs.create({ url: newURL });
    });
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
