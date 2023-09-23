// background.js
let isInputFieldVisible = false;
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setPopup({
  popup: "index.html",
  position: browser.action.Position.CENTER
  });
})

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);

  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab) {
      // Check if the blur filter is currently applied
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: () => {
        
          const body = document.getElementById('root');
          const currentFilter = body.style.filter;
          if (currentFilter.includes('blur')) {
            // Remove the blur filter
            body.style.filter = '';
          } else {
            // Apply the blur filter
            const inputField = document.getElementById('yourInputFieldId');

            if (!inputField) {
              // If it doesn't exist, create one and append it to the body
              const newInputField = document.createElement('input');
              newInputField.id = 'yourInputFieldId';
              newInputField.placeholder = 'hello';
              // Apply CSS styles to position it absolutely at the top center
              newInputField.style.position = 'absolute';
              newInputField.style.top = '0';
              newInputField.style.left = '50%';
              newInputField.style.transform = 'translateX(-50%)';
              document.body.appendChild(newInputField);
            }
            body.style.filter = 'blur(10px)';
          }
        },
      });

      
      // Toggle input field visibility
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: (isInputFieldVisible) => {
          const inputField = document.getElementById('yourInputFieldId'); // Replace with the actual ID of your input field
          if (inputField) {
            inputField.style.display = isInputFieldVisible ? 'none' : 'block';
          }
        },
        args: [isInputFieldVisible],
      });

      isInputFieldVisible = !isInputFieldVisible;
    } else {
      console.error("No active tab found.");
    }
  });
});
