
//Extracts the domain from a URL to check against the prohibited websites.
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

// Establishing a connection to a Socket.io server.
const socket = io('http://your_server_address:3000'); // Replace with your server address.

// Listen for updates from the popup when a user saves their prohibited websites.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateSites") {
        // Only store domains in the prohibitedWebsites list
        prohibitedWebsites = request.sites.map(extractDomain);
    }
});


// Monitor the tabs to detect when a user visits a website.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const visitedDomain = extractDomain(tab.url);

        // If the visited domain is in the prohibited list, notify the other team members.
        if (prohibitedWebsites.includes(visitedDomain)) {
            chrome.storage.local.get('username', function(data) {
                const username = data.username;  
                const message = `"${username}" has visited the prohibited "${visitedDomain}" website! 今晚请吃饭！`;
                socket.emit('sendNotification', { message });
            });
        }
    }
});


// When a notification from another team member is received, display it.
socket.on('receiveNotification', (data) => {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon128.png',
        title: 'Notification',
        message: data.message
    });
});

