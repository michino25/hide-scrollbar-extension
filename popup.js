// Load hiệu ứng intro, hide khi animation end
const container = document.querySelector(".pulse-container");
container.addEventListener("animationend", () => {
    container.classList.add("hide");
});

// Variable
var checkbox = document.getElementById("toggle-scrollbar");
var statusInfo = document.getElementById("status-info");
var hostname = document.getElementById("hostname");

// Cập nhật giao diện popup html
async function updateStatusPopup(hideArr) {
    const tab = await getCurrentTab();
    const currentWebsite = new URL(tab.url).hostname;

    let isHidden = hideArr.includes(currentWebsite);
    checkbox.checked = isHidden;
    statusInfo.innerText = isHidden
        ? "Scrollbars are hidden"
        : "Scrollbars displayed by default";

    // Website link
    hostname.textContent = currentWebsite;
}

// Lấy thông tin tab hiện tại
async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// Get data and display on popup
chrome.storage.local.get(["hideArr"], (data) => {
    let hideArr = data.hideArr || [];
    updateStatusPopup(hideArr);
});

// Change the state
checkbox.addEventListener("click", async () => {
    const tab = await getCurrentTab();
    chrome.runtime.sendMessage({
        action: "toggleScrollbar",
        url: tab.url,
        id: tab.id,
    });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.hideArr) {
        let hideArr = changes.hideArr.newValue || [];
        updateStatusPopup(hideArr);
    }
});

// Reload the page after change state of checkbox
// chrome.runtime.sendMessage({ action: "reloadTab" });

// Collapse the popup window
// window.close();
