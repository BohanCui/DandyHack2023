
/*
correct logic of the file should be:
1. When a user sets or updates their groupId, store it locally, and push it to the server by calling clinet.js's function joinGroup(username,group id)
2. When a user add URL to the prohibited list, store it locally, and push the list to the server by calling clinet.js's function updateList((groupid,list))
3. when detected a visits a prohibited website, push it to the server by calling clinet.js's function message(groupid, "this user${username}" has visited the prohibited "${visitedDomain}")
4. when a notification from another team member is received from server's message function,  display it as an alarm. 
*/

/*
correct logic of the file should be:
1. When a user sets or updates their groupId, store it locally, and push it to the server by calling clinet.js's function joinGroup(username,group id)
2. When a user add URL to the prohibited list, store it locally, and push the list to the server by calling clinet.js's function updateList((groupid,list))
3. when detected a visits a prohibited website, push it to the server by calling clinet.js's function message(groupid, "this user${username}" has visited the prohibited "${visitedDomain}")
4. when a notification from another team member is received from server's message function,  display it as an alarm. 
*/


// Extracts the domain from a URL to check against the prohibited websites.
// function extractDomain(url) {
//     let domain;
//     // Find & remove protocol (http, ftp, etc.) and get domain
//     if (url.indexOf("://") > -1) {
//         domain = url.split('/')[2];
//     } else {
//         domain = url.split('/')[0];
//     }
//     // Find & remove port number
//     domain = domain.split(':')[0];
//     return domain;
// }


let prohibitedWebsites = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "setGroupId") {
        chrome.storage.local.set({ groupId: request.groupId, username: request.username}, function() {
            console.log('groupId saved:', request.groupId);
            console.log('username saved:', request.username);
            // joinGroup(request.username, request.groupId);  // Notify the server of the group change
            // sendResponse({ success: true });
        return true; // Indicates asynchronous response
        })
    }
    if (request.action === "setWebsites") {
        // websites are all string type! not URL
        // there is no input validation
        // temporarily assume all inputs are hosts already
        // prohibitedWebsites = request.websites.map((url) => (new URL(url)).hostname);
        // console.log(prohibitedWebsites);
        // console.log(typeof(request.websites));
        // console.log(typeof(request.websites[0]));
        // updateList(groupId, prohibitedWebsites);  // Update the server with the new list
        prohibitedWebsites = request.websites
        chrome.storage.local.set({ groupId: request.groupId, websites: request.websites}, function() {
            console.log('groupId saved:', request.groupId);
            console.log('websites saved:', request.websites);
            sendResponse({ success: true });
        return true; // Indicates asynchronous response
        })
    } else if (request.action === "receivedList") {
        prohibitedWebsites = request.sites;  // Store the updated list to local prohibitedWebsites
    }

});

// const socket = io('http://localhost:3000'); // Replace with your server address.

// When a user sets or updates their groupId, store it locally.
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action === "setGroupId") {
//         chrome.storage.local.set({ groupId: request.groupId }, function() {
//             console.log('groupId saved:', request.groupId);
//             joinGroup(request.username, request.groupId);  // Notify the server of the group change
//             sendResponse({ success: true });
//         });
//         return true; // Indicates asynchronous response
        
//     } else if (request.action === "updateSites") {
//         prohibitedWebsites = request.sites.map(extractDomain);
//         chrome.storage.local.get('groupId', function(data) {
//             updateList(data.groupId, prohibitedWebsites);  // Update the server with the new list
//         });
        
//     } else if (request.action === "receivedList") {
//         prohibitedWebsites = request.sites;  // Store the updated list to local prohibitedWebsites
//     }
// });


// Monitor the tabs to detect when a user visits a website.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab is completely loaded and has a URL
    if (changeInfo.status === 'complete' && tab.url) {
        console.log(tab.url);
        // this url is not of type URL (is string)
        // so conversion is needed
        // some url cannot be parsed by URL constructor
        let visitedDomain = "";
        try {
            const url = new URL(tab.url);
            console.log(url);
            visitedDomain = url.hostname; // Extract the domain from the visited URL
        } catch (error) {
            console.log("Invalid url, skipped");
            return null;
        }
        
        // Now, you fetch the most recent list of prohibited websites from the server 
        // Note: Make sure to handle how `getList` from `client.js` returns the list to `background.js`
        chrome.storage.local.get('groupId', function(data) {
            // getList(data.groupId);
            console.log(prohibitedWebsites);
            
            // After getting the list from the server (which should be updated in the `prohibitedWebsites` array),
            // Check if the visited domain is in the prohibited list
            if (prohibitedWebsites.includes(visitedDomain)) {

                console.log(prohibitedWebsites);
                console.log(prohibitedWebsites.includes(visitedDomain));
                console.log(visitedDomain);

                // this works without any error on my end
                // but I did not see any notifications popping up (probably due to privacy settings?)
                var username = "User"; 

                chrome.storage.local.get('username', (result) => {
                    // This is not correct yet, but the default is set to be User, so the output is reasonable
                    username = result.username;
                });
                chrome.notifications.create("prohibitedVisit", {
                            type: 'basic',
                            iconUrl: './128.png',
                            title: 'Notification',
                            // TODO: change username if the sever is working as intended
                            message: `${username} visited prohibited website ${tab.url}`,
                        });
                console.log("Notifications sent");

                // this is left as a back up
                // sendMessage not working here
                // need popup to have handshake message to initiate message sending
                // background can only send back through response
                // chrome.runtime.sendMessage({
                //     action: "prohibitedVisit",
                //     website: tab.url,
                //     username: "noname", // server not working so this is just a stab
                // });

                // works fine, but popup has some issue receiving it correctly
                chrome.alarms.create(
                    "prohibitedVisit", {
                        delayInMinutes: 0, 
                        periodInMinutes: 2,
                    }
                );
                console.log("Alarms sent")
                // can maybe set the local storage for url and username info
            }
        });
    }
});


// When a notification from another team member is received from the server, display it.
// socket.on('message', (message) => {
//     chrome.notifications.create({
//         type: 'basic',
//         iconUrl: 'icon128.png',
//         title: 'Notification',
//         message: message
//     });
// });

