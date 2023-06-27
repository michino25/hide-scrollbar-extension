// Store an array of hidden websites
let hiddenWebsites = [];

// Retrieve hidden websites from storage on extension installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get("hiddenWebsites", (data) => {
        hiddenWebsites = data.hiddenWebsites || [];
    });
});

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handling when changing state
    if (request.action === "toggleScrollbar") {
        let currentWebsite = new URL(request.url).hostname;

        if (hiddenWebsites.includes(currentWebsite)) {
            hiddenWebsites = hiddenWebsites.filter(
                (website) => website !== currentWebsite
            );
        } else {
            hiddenWebsites.push(currentWebsite);
        }

        // Theo dõi tình hình
        console.log(hiddenWebsites);

        // Save updated websites to storage
        chrome.storage.local.set({ hiddenWebsites: hiddenWebsites });
        sendResponse({ hiddenWebsites: hiddenWebsites });
    }

    // Reload the tab
    if (request.action === "reloadTab") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log(tabs[0].id);
            chrome.tabs.reload(tabs[0].id);
        });
    }
});
