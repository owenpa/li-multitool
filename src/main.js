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
    const feed = document.getElementsByClassName('scaffold-finite-scroll');
    if (feed[0]) { feed[0].remove(); }
  }
}