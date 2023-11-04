document.addEventListener('DOMContentLoaded', function() {
    const websiteInput = document.getElementById('websiteInput');
    const addButton = document.getElementById('addButton');
    const blockedList = document.getElementById('blockedList');
    const saveButton = document.getElementById('saveButton');
    const memberInput = document.getElementById('memberInput');
    const addMemberButton = document.getElementById('addMemberButton');
    const memberList = document.getElementById('memberList');
    const saveMemberButton = document.getElementById('saveMemberButton');

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
        // Save the list of blocked websites (blockedWebsites) using Chrome storage API or any other method.
        // Example: chrome.storage.sync.set({ blockedWebsites: blockedWebsites });
    });

    addMemberButton.addEventListener('click', function() {
        const member = memberInput.value.trim();
        if (member) {
            const listItem = document.createElement('li');
            listItem.textContent = member;
            memberList.appendChild(listItem);
            memberInput.value = '';
        }
    });

    saveMemberButton.addEventListener('click', function() {
        const teamMembers = Array.from(memberList.children).map(li => li.textContent);
        // send this to the server for storage
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
