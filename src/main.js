let currentSettings = { 'removeFeed': false, 'removeSuggestedPosts': false };
const feedPathName = '/feed/'
chrome.runtime.onMessage.addListener((req, send, reply) => {
  currentSettings = req['settings'];
  applySettings(currentSettings);
})

function applySettings(newSettings) {
  removeFeed(newSettings['removeFeed'])
  removeSuggestedPosts(newSettings['removeSuggestedPosts'])
}

function removeFeed(shouldRemove) {
  if (shouldRemove && feedPathName == window.location.pathname) {
    const feed = document.getElementsByClassName('scaffold-finite-scroll');
    if (feed[0]) { feed[0].remove(); }
  }
}

function removeSuggestedPosts(shouldRemove) {
  if (shouldRemove && feedPathName == window.location.pathname) {
    const allSpecialPosts = [...document.getElementsByClassName('update-components-header__text-view')];
    if (allSpecialPosts.length) {
      allSpecialPosts.map((textElement) => {
        if (textElement.innerText === "Suggested") textElement.closest('.full-height').remove()
      })
    }
  }
}