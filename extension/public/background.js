// background.js
let isInputFieldVisible = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setPopup({
    popup: "index.html",
    position: chrome.action.Position.CENTER
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
          const body = document.getElementById('maestro-portal');
          const currentFilter = body.style.filter;
          const inputField = document.getElementById('yourInputFieldId');

          if (currentFilter.includes('blur')) {
            // Remove the blur filter
            body.style.filter = '';
            if (inputField) {
              inputField.style.display = 'none';
            }
          } else {
            // Apply the blur filter
            if (!inputField) {
              // If it doesn't exist, create one and append it to the body
              const newInputField = document.createElement('span');
              newInputField.id = 'yourInputFieldId';
              newInputField.placeholder = 'Ask AI';
              newInputField.role = 'textbox';
              newInputField.contentEditable = 'true';
              newInputField.spellcheck = 'false';
              newInputField.style.outline = 'none';
              // Apply CSS styles to position it absolutely at the top center
              newInputField.style.position = 'absolute';
              newInputField.style.top = '40%';
              newInputField.style.left = '50%';
              newInputField.style.border = 'none';
              newInputField.style.transform = 'translateX(-50%)';
              // Apply additional CSS styles
              newInputField.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
              newInputField.style.padding = '10px';
              newInputField.style.color = 'black';
              newInputField.style.width = '40%';
              newInputField.style.backgroundColor = 'rgba(211, 211, 211, 0.1)';
              newInputField.style.borderRadius = '10px';
              newInputField.style.fontSize = 'x-large';
              newInputField.style.zIndex = '100';

              document.body.appendChild(newInputField);

              newInputField.addEventListener("focus", function () {
                if (newInputField.textContent === 'Ask AI') {
                  newInputField.textContent = '';
                  newInputField.style.color = 'black';
                }
              });

              newInputField.addEventListener("blur", function () {
                if (newInputField.textContent === '') {
                  newInputField.textContent = 'Ask AI';
                  newInputField.style.color = 'rgba(0, 0, 0, 0.5)';
                }
              });
            }

            body.style.filter = 'blur(10px)';
            inputField.style.display = 'block';
            inputField.focus();
          }
        },
      });

      isInputFieldVisible = !isInputFieldVisible;
    } else {
      console.error("No active tab found.");
    }
  });
});
