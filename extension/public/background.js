// background.js
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
                  const body = document.body;
                  const currentFilter = body.style.filter;
                  
                  if (currentFilter.includes('blur')) {
                      // Remove the blur filter
                      body.style.filter = '';
                  } else {
                      // Apply the blur filter
                      body.style.filter = 'blur(5px)';
                  }
              },
          });
      } else {
          console.error("No active tab found.");
      }
  });
});
