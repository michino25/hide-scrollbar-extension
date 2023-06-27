// Intro loading
const containerElement = document.querySelector(".pulse-container");

// Add event listener to trigger the animation end
containerElement.addEventListener("animationend", () => {
    containerElement.classList.add("hide");
});

var checkbox = document.getElementById("toggle-scrollbar");
var statusInfo = document.getElementById("status-info");

// Get the data and display it on the extension
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentWebsite = new URL(tabs[0].url).hostname;

    chrome.storage.local.get("hiddenWebsites", (data) => {
        let hiddenWebsites = data.hiddenWebsites || [];
        checkbox.checked = hiddenWebsites.includes(currentWebsite);

        // Theo dõi tình hình
        console.log(hiddenWebsites);

        // Status
        if (checkbox.checked) {
            statusInfo.innerText = "Scrollbars are hidden";
        } else {
            statusInfo.innerText = "Scrollbars displayed by default";
        }
    });

    // Website link
    var hostnameElement = document.getElementById("hostname");
    hostnameElement.textContent = currentWebsite;
});

// Handling when pressing the button to change the state
checkbox.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.runtime.sendMessage(
            { action: "toggleScrollbar", url: tabs[0].url },
            (response) => {
                let hiddenWebsites = response.hiddenWebsites || [];
                let currentWebsite = new URL(tabs[0].url).hostname;
                checkbox.checked = hiddenWebsites.includes(currentWebsite);

                // Reload the page after change state of checkbox
                chrome.runtime.sendMessage({ action: "reloadTab" });

                // Collapse the popup window
                window.close();
            }
        );
    });
});
