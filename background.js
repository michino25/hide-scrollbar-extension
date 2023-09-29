let hideArr = [];

// Get hidden websites from storage
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(["hideArr"], (data) => {
        hideArr = data.hideArr || [];
    });
});

function toggleScrollbar(hostname, tabId, url) {
    if (url.startsWith("http") || url.startsWith("https")) {
        let isHidden = hideArr.includes(hostname);

        if (isHidden) {
            hideArr = hideArr.filter((website) => website !== hostname);
        } else {
            hideArr.push(hostname);
        }

        // console.log(hideArr);

        // Save updated websites to storage
        chrome.storage.local.set({ hideArr: hideArr });

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: isHidden ? showScrollbar : hideScrollbar,
        });
    }
}

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handling when changing state
    if (request.action === "toggleScrollbar") {
        let hostname = new URL(request.url).hostname;
        toggleScrollbar(hostname, request.id, request.url);
        // sendResponse({ isHidden: hideArr.includes(hostname) });
    }

    // Reload the tab
    // if (request.action === "reloadTab") {
    //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //         console.log(tabs[0].id);
    //         chrome.tabs.reload(tabs[0].id);
    //     });
    // }
});

// Context menu

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "HideScroll",
        title: "Hide Scrollbar",
        contexts: ["page"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if ("HideScroll" === info.menuItemId) {
        const hostname = new URL(tab.url).hostname;
        toggleScrollbar(hostname, tab.id, tab.url);
    }
});

// function to scripting

function hideScrollbar() {
    const uniqueIdentifier = "hide-scrollbar-style"; // Unique identifier
    const existingStyle = document.querySelector(
        `head style[data-identifier="${uniqueIdentifier}"]`
    );

    if (!existingStyle) {
        const css = `
        /* Hide scrollbars for all elements */
        * {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* Internet Explorer and Edge */
        }

        /* Hide scrollbars for WebKit based browsers */
        *::-webkit-scrollbar {
            display: none;
        }`;

        const style = document.createElement("style");
        style.textContent = css;
        style.setAttribute("data-identifier", uniqueIdentifier); // Set the identifier
        document.head.appendChild(style);
    }
}

function showScrollbar() {
    const uniqueIdentifier = "hide-scrollbar-style"; // Unique identifier
    const styleToRemove = document.querySelector(
        `head style[data-identifier="${uniqueIdentifier}"]`
    );

    // Remove the injected style by identifier
    if (styleToRemove) {
        styleToRemove.remove();
    }
}
