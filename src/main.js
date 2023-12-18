let currentSettings = { "removeFeed": false };
const feedPathName = '/feed/'

chrome.runtime.onMessage.addListener((req, send, reply) => {
  currentSettings = req['settings'];
  applySettings(currentSettings);
})

function applySettings(newSettings) {
  removeFeed(newSettings["removeFeed"])
}

function removeFeed(shouldRemove) {
  if (shouldRemove && feedPathName == window.location.pathname) {
    document.getElementsByClassName('scaffold-finite-scroll')[0].remove();
  }
}