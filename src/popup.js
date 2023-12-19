const removeFeed = document.getElementById('remove-feed');
const removeSuggestedPosts = document.getElementById('remove-suggested-posts');
const removeAds = document.getElementById('remove-ads');
const currentSettings = { 'removeFeed': false, 'removeSuggestedPosts': false, 'removeAds': false };

document.addEventListener('DOMContentLoaded', loadSettings(currentSettings));

removeFeed.addEventListener('click', () => {
  currentSettings['removeFeed'] = removeFeed.checked;
  updateSettings(currentSettings);
})

removeSuggestedPosts.addEventListener('click', () => {
  currentSettings['removeSuggestedPosts'] = removeSuggestedPosts.checked;
  updateSettings(currentSettings);
})

removeAds.addEventListener('click', () => {
  currentSettings['removeAds'] = removeAds.checked;
  updateSettings(currentSettings);
})

function updateSettings(newSettings) {
  chrome.storage.sync.set(newSettings, () => {})
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { settings: newSettings });
  })
}

function loadSettings() {
  chrome.storage.sync.get(currentSettings, (settings) => {
    removeFeed.checked = settings['removeFeed'];
    removeSuggestedPosts.checked = settings['removeSuggestedPosts'];
    removeAds.checked = settings['removeAds'];
  })
}