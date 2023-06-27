let css = `
/* Hide scrollbars for all elements */
* {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer and Edge */
}

/* Hide scrollbars for WebKit based browsers */
*::-webkit-scrollbar {
    display: none;
}
`;

// Check the current web page is in the list of hidden scrollbars
// Then add css
chrome.storage.local.get("hiddenWebsites", (data) => {
    let hiddenWebsites = data.hiddenWebsites || [];
    let currentWebsite = new URL(window.location.href).hostname;

    if (hiddenWebsites.includes(currentWebsite)) {
        let style = document.createElement("style");
        style.textContent = css;
        document.head.append(style);
    }
});
