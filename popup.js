document.addEventListener('DOMContentLoaded', function() {
    const websiteInput = document.getElementById('websiteInput');
    const addButton = document.getElementById('addButton');
    const blockedList = document.getElementById('blockedList');
    const saveButton = document.getElementById('saveButton');
    const nameInput = document.getElementById('nameInput');
    const addNameButton = document.getElementById('addNameButton');
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
        // send this to the server for storage
    });

    addNameButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        // send this to server for storage
        nameInput.value = '';
    });

    saveGroupButton.addEventListener('click', function() {
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
