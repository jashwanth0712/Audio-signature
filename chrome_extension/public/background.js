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
          const body = document.getElementById('root');
          const currentFilter = body.style.filter;
          const inputField = document.getElementById('yourInputFieldId');
          const listeningAnimation=document.getElementById('listening-animation');
          if (currentFilter.includes('blur')) {
            // Remove the blur filter
            body.style.filter = '';
            if (inputField) {
              inputField.style.display = 'none';
            }
            if(listeningAnimation){
              listeningAnimation.style.display = 'none';
            }
          } else {
            // Apply the blur filter
            if (!listeningAnimation) {
              var img = document.createElement('img');

              // Set the source URL of the image
              // img.src = 'https://i.pinimg.com/236x/53/2a/00/532a008c33c23137ed796b9e3d01459b.jpg';
              img.src = '../assets/listening.gif';
              
              // Apply CSS styles to the image
              img.style.borderRadius = '50%';
              img.style.position = 'absolute';
              img.style.top = '10%';
              img.style.left = '45%';
              img.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 8px 30px';
              img.style.width = '180px';
              img.id="listening-animation";
              document.body.appendChild(img);

            }
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
            listeningAnimation.style.display='block';
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
