if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

const settingsIdentifier = "data";

const requiredPermissions = {
  origins: ["https://medium.com/*", "https://freedium.cfd/*"],
  permissions: ["storage", "activeTab", "contextMenus"],
};

browser.runtime.onInstalled.addListener(() => {
  browser.permissions.contains(requiredPermissions).then((hasPermissions) => {
    if (hasPermissions) return;
    browser.permissions.request(requiredPermissions);
  });
});
