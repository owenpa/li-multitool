const removeFeed = document.getElementById('remove-feed');
const currentSettings = { 'removeFeed': false };

removeFeed.addEventListener('click', () => {
  currentSettings['removeFeed'] = removeFeed.checked;
  updateSettings(currentSettings)
})

function updateSettings(newSettings) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {settings: newSettings})
  })
}