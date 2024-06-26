chrome.runtime.onInstalled.addListener(() => {
  console.log("LinkedIn Automation Extension installed.");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});