'use strict';

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
        chrome.storage.local.set({ blockedWebsites: blockedWebsites }).then(() => {
            console.log("Value is set");
          });
        // blockedList.value = '';
        // send this to the server for storage
    });


    saveUserButton.addEventListener('click',function(){
        const messageObj = {action: "setGroupId", groupId: "12345", username: "JohnDoe"};
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
});

function redirect(){
    
}
