const removeFeed = document.getElementById('remove-feed');
const currentSettings = { 'removeFeed': false };

document.addEventListener('DOMContentLoaded', loadSettings(currentSettings));

removeFeed.addEventListener('click', () => {
  currentSettings['removeFeed'] = removeFeed.checked;
  updateSettings(currentSettings)
})

function updateSettings(newSettings) {
  chrome.storage.sync.set(newSettings, () => {})
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {settings: newSettings})
  })
}

function loadSettings() {
  chrome.storage.sync.get(currentSettings, (settings) => {
    removeFeed.checked = settings['removeFeed'];
  })
}