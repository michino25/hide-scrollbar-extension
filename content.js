let css = `
/* Hide scrollbars for all elements */
* {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer and Edge */
}

/* Hide scrollbars for WebKit based browsers */
*::-webkit-scrollbar {
    display: none;
}`;

// Check the current web page is in the list of hidden scrollbars
// Then add css
chrome.storage.local.get("hideArr", (data) => {
    let hideArr = data.hideArr || [];
    let currentWebsite = new URL(window.location.href).hostname;

    const uniqueIdentifier = "hide-scrollbar-style"; // Unique identifier
    const existingStyle = document.querySelector(
        `head style[data-identifier="${uniqueIdentifier}"]`
    );

    if (hideArr.includes(currentWebsite) && !existingStyle) {
        const style = document.createElement("style");
        style.textContent = css;
        style.setAttribute("data-identifier", uniqueIdentifier); // Set the identifier
        document.head.appendChild(style);
    }
});
