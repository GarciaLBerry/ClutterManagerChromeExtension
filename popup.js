async function removeTabs() {
    let toRemoveTabs = await chrome.tabs.query({discarded: true, currentWindow: true});
    for (let i = 0; i < toRemoveTabs.length; i++) {
        chrome.tabs.remove(toRemoveTabs[i].id);
    }
    toRemoveTabs = await chrome.tabs.query({url: ["https://www.google.com/*", 
                                                  "https://stackoverflow.com/questions/*"], 
                                                   currentWindow: true});
    for (let i = 0; i < toRemoveTabs.length; i++) {
        chrome.tabs.remove(toRemoveTabs[i].id);
    }
    let toGroupTabs = await chrome.tabs.query({currentWindow: true});
    let len = toGroupTabs.length;
    console.log(len);
    for (let i = 0; i < len - 1; i++) {
        let domain = new URL(toGroupTabs[i].url).hostname;
        console.log(domain);
        const found = toGroupTabs.filter(tab => tab.url.includes(domain))
        const allTabIds = found.map(tab => tab.id);
        console.log(found.length);
        console.log(allTabIds.length);
        if(allTabIds.length > 0) {
            const groupId = await chrome.tabs.group({tabIds: allTabIds});
        }
    }
}

const button = document.getElementById("clearbutton");
button.addEventListener("click", removeTabs);