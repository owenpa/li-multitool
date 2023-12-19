let currentSettings = { 'removeFeed': false, 'removeSuggestedPosts': false };
const feedPathName = '/feed/'

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

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

async function removeSuggestedPosts(shouldRemove) {
  while (shouldRemove) {
    await sleep(500)
    if (feedPathName !== window.location.pathname) break
    const allSpecialPosts = [...document.getElementsByClassName('update-components-header__text-view')];
    if (allSpecialPosts.length) {
      allSpecialPosts.map((textElement) => {
        if (textElement.innerText === "Suggested") textElement.closest('.full-height').remove()
      })
    }
  }
}