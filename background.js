
/*
correct logic of the file should be:
1. When a user sets or updates their groupId, store it locally, and push it to the server by calling clinet.js's function joinGroup(username,group id)
2. When a user add URL to the prohibited list, store it locally, and push the list to the server by calling clinet.js's function updateList((groupid,list))
3. when detected a visits a prohibited website, push it to the server by calling clinet.js's function message(groupid, "this user${username}" has visited the prohibited "${visitedDomain}")
4. when a notification from another team member is received from server's message function,  display it as an alarm. 
*/


// Extracts the domain from a URL to check against the prohibited websites.
function extractDomain(url) {
    let domain;
    // Find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    // Find & remove port number
    domain = domain.split(':')[0];
    return domain;
}


let prohibitedWebsites = [];
const socket = io('http://localhost:3000'); // Replace with your server address.

// When a user sets or updates their groupId, store it locally.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "setGroupId") {
        chrome.storage.local.set({ groupId: request.groupId, username: request.username }, function() {
            console.log('groupId saved:', request.groupId);
            console.log('username saved:', request.username);
            joinGroup(request.username, request.groupId);  // Notify the server of the group change
            sendResponse({ success: true });
        return true; // Indicates asynchronous response
    }
    } else if (request.action === "updateSites") {
        prohibitedWebsites = request.sites.map(extractDomain);
        chrome.storage.local.get('groupId', function(data) {
            updateList(data.groupId, prohibitedWebsites);  // Update the server with the new list
        });
        
    } else if (request.action === "receivedList") {
        prohibitedWebsites = request.sites;  // Store the updated list to local prohibitedWebsites
    }
});


// Monitor the tabs to detect when a user visits a website.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab is completely loaded and has a URL
    if (changeInfo.status === 'complete' && tab.url) {
        const visitedDomain = extractDomain(tab.url); // Extract the domain from the visited URL
        
        // Now, you fetch the most recent list of prohibited websites from the server 
        // Note: Make sure to handle how `getList` from `client.js` returns the list to `background.js`
        chrome.storage.local.get('groupId', function(data) {
            getList(data.groupId);
            
            // After getting the list from the server (which should be updated in the `prohibitedWebsites` array),
            // Check if the visited domain is in the prohibited list
            if (extractDomain(prohibitedWebsites).includes(visitedDomain)) {
                chrome.storage.local.get(['username', 'groupId'], function(data) {
                    const msg = `User "${data.username}" has visited the prohibited "${visitedDomain}" website!`;
                    message(data.groupId, msg);  // Notify the server of the violation
                });
            }
        });
    }
});


// When a notification from another team member is received from the server, display it.
socket.on('message', (message) => {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon128.png',
        title: 'Notification',
        message: message
    });
});
