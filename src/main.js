let currentSettings = { 'removeFeed': false, 'removeSuggestedPosts': false, 'removeAds': false, 'removeCelebrations': false };
const feedPathName = '/feed/'

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

chrome.runtime.onMessage.addListener((req, send, reply) => {
  currentSettings = req['settings'];
  applySettings(currentSettings);
})

function applySettings(newSettings) {
  removeFeed(newSettings['removeFeed']);
  removeSuggestedPosts(newSettings['removeSuggestedPosts']);
  removeAds(newSettings['removeAds']);
  removeCelebrations(newSettings['removeCelebrations']);
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
    if (feedPathName !== window.location.pathname) continue

    const allSpecialPosts = [...document.getElementsByClassName('update-components-header__text-view')];
    
    if (allSpecialPosts.length) {
      allSpecialPosts.map((textElement) => {
        if (textElement.innerText === "Suggested") textElement.closest('.full-height').remove()
      })
    }
  }
}

async function removeAds(shouldRemove) {
  while (shouldRemove) {
    await sleep(500)
    if (feedPathName !== window.location.pathname) continue

    const subDescriptionPosts = [...document.getElementsByClassName('update-components-actor__sub-description-link')];
    const userTitlePosts = [...document.getElementsByClassName('update-components-actor__meta-link')];

    if (subDescriptionPosts.length) {
      subDescriptionPosts.map((postDescription) => {
        if (postDescription.firstElementChild.innerText.indexOf('Promoted') > -1) {
          postDescription.closest('.full-height').remove()
        }
      })
    }
    if (userTitlePosts.length) {
      userTitlePosts.map((userTitleElement) => {
        if (userTitleElement.ariaLabel.indexOf('Promoted') > -1) userTitleElement.closest('.full-height').remove();
      })
    }
  }
}

async function removeCelebrations(shouldRemove) { 
  while (shouldRemove) {
    await sleep(500);
    if (feedPathName !== window.location.pathname) continue
    const celebrationPosts = [...document.getElementsByClassName('feed-shared-celebration-image')];
    if (celebrationPosts.length) {
      celebrationPosts.map((celebrationElement) => celebrationElement.closest('.full-height').remove());
    }
  }
}