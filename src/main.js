let currentSettings = { 'removeFeed': false, 'removeSuggestedPosts': false, 'removeAds': false, 'removeCelebrations': false, 'debloatMyNetwork': false, 'removePremium': false };
const feedPathName = '/feed/';

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

chrome.runtime.onMessage.addListener((req, send, reply) => {
  currentSettings = req['settings'];

  removeFeed();
  removeSuggestedPosts();
  removeAds();
  removeCelebrations();
  debloatMyNetwork();
  removePremium();

})

async function removeFeed() {
  while (currentSettings['removeFeed']) {
    await sleep(500);

    if (currentSettings['removeFeed'] && feedPathName == window.location.pathname) {
      const feed = document.getElementsByClassName('scaffold-finite-scroll');
      if (feed[0]) { feed[0].remove(); }
    }
  }
}

async function removeSuggestedPosts() {
  while (currentSettings['removeSuggestedPosts']) {
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

async function removeAds() {
  while (currentSettings['removeAds']) {
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

async function removeCelebrations() { 
  while (currentSettings['removeCelebrations']) {
    await sleep(500);
    if (feedPathName !== window.location.pathname) continue

    const celebrationPosts = [...document.getElementsByClassName('feed-shared-celebration-image')];
    if (celebrationPosts.length) {
      celebrationPosts.map((celebrationElement) => celebrationElement.closest('.full-height').remove());
    }
  }
}

async function debloatMyNetwork() { // won't remove pending invitations
  while (currentSettings['debloatMyNetwork']) {
    await sleep(500);

    if (currentSettings['debloatMyNetwork'] && '/mynetwork/' == window.location.pathname) {
      const usersAndNewsletters = document.getElementsByClassName('artdeco-card mb4 overflow-hidden');
      const moreSuggestions = document.getElementsByClassName('mn-discovery__header artdeco-card__header');
      if (usersAndNewsletters[0]) { usersAndNewsletters[0].remove(); }
      if (moreSuggestions[0].parentElement) { moreSuggestions[0].parentElement.remove(); }
    }
  }
}

async function removePremium() {
  while (currentSettings['removePremium']) {
    await sleep(500);

    // remove navbar promo
    if (document.getElementsByClassName('premium-upsell-link').length) document.getElementsByClassName('premium-upsell-link')[0].remove();

    // remove career heights promo from sidebar
    if (feedPathName === window.location.pathname) {
      if (document.getElementsByClassName('feed-identity-module__anchored-widget--premium-upsell').length) document.getElementsByClassName('feed-identity-module__anchored-widget--premium-upsell')[0].remove();
    }

    // remove accent bar and message from jobs page
    if ('/jobs/' === window.location.pathname) {
      if (document.getElementsByClassName('premium-accent-bar').length) document.getElementsByClassName('premium-accent-bar')[0].className = 'artdeco-card'
      if (document.getElementsByClassName('jobs-home-upsell-card__container').length)[0].remove();
      if (document.getElementsByClassName('display-flex mb1').length) document.getElementsByClassName('display-flex mb1')[0].remove();
    }

    //remove try premium button in notifications
    if ('/notifications/' === window.location.pathname) {
      if (document.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary ember-view').length) document.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary ember-view')[0].remove();
    }
  }
}