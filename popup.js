document.addEventListener('DOMContentLoaded', function() {
    const websiteInput = document.getElementById('websiteInput');
    const addButton = document.getElementById('addButton');
    const blockedList = document.getElementById('blockedList');
    const saveButton = document.getElementById('saveButton');
    const nameInput = document.getElementById('nameInput');
    // const addNameButton = document.getElementById('addNameButton');
    const group = document.getElementById('groupID');
    const saveGroupButton = document.getElementById('saveGroupButton');

    addButton.addEventListener('click', function() {
        const website = websiteInput.value.trim();
        if (website) {
            const listItem = document.createElement('li');
            listItem.textContent = website;
            blockedList.appendChild(listItem);
            websiteInput.value = '';
        }
    });

    saveButton.addEventListener('click', function() {
        const blockedWebsites = Array.from(blockedList.children).map(li => li.textContent);
        const messageObj = {
            action: "setWebsites", 
            websites: blockedWebsites, 
            groupId: group.value
        };
        console.log("Sending message:", messageObj);
        chrome.runtime.sendMessage(messageObj);
    });


    saveUserButton.addEventListener('click',function(){
        const messageObj = {
            action: "setGroupId", 
            groupId: group.value, 
            username: nameInput.value
        };
        console.log("Sending message:", messageObj);
        chrome.runtime.sendMessage(messageObj);
        // chrome.runtime.sendMessage({groupId: group, username: nameInput}, function(response) {
        //     console.log(response.result);
        // });
        // chrome.storage.local.set({ username: nameInput });
        // chrome.storage.local.set({ groupId: group }).then(() => {
        //     alert("value is set");
        //     console.log("Value is set");
        //   });
        
        // alert("redirect");
        // chrome.tabs.create({active: true, url: "https://www.youtube.com"});
    });

    // You may want to load and display any previously saved blocked websites when the popup opens.
    // Example: chrome.storage.sync.get(['blockedWebsites'], function(result) {
    //    if (result.blockedWebsites) {
    //        result.blockedWebsites.forEach(website => {
    //            const listItem = document.createElement('li');
    //            listItem.textContent = website;
    //            blockedList.appendChild(listItem);
    //        });
    //    }
    // });
    
    // NOT WOWRKING RIGHT NOW!!!
    // chrome.alarms.onAlarm.addListener(async (alarm) => {
    //     console.log("Alarm received");
    //     console.log(alarm);
    //     alarm = JSON.stringify(alarm);
    //     console.log(alarm);
    //     if (alarm.name === "prohibitedVisit") {
    //         // TODO: change username if the sever is working as intended
    //         alert(`User visited a prohibited website ${request.website}`);
    //     }
    // });
});

// chrome.runtime.onMessage.addListener(
//     (request, sender, sendResponse) => {
//         if (request.action === "prohibitedVisit") {
//             console.log("Receiving prohibited visit message")
//             // TODO: change chrome.storage.local.get('username') if the sever is working as intended
//             alert(`User ${chrome.storage.local.get('username')} visited a prohibited website ${request.website}`);
//         }
//     }
// );


function redirect(){
    
}
