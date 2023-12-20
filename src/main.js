let currentSettings = { };
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
  highlightMessages();
})

async function removeFeed() {
  while (currentSettings['remove-feed']) {
    await sleep(500);
    if (feedPathName !== window.location.pathname) continue

    const feed = [...document.getElementsByClassName('scaffold-finite-scroll')];
    if (feed.length) { feed[0].remove(); }
  }
}

async function removeSuggestedPosts() {
  while (currentSettings['remove-suggested-posts']) {
    await sleep(500)
    if (feedPathName !== window.location.pathname) continue

    const allSpecialPosts = [...document.getElementsByClassName('update-components-header__text-view')];

    if (!allSpecialPosts.length) continue
    allSpecialPosts.filter(textElement => textElement.innerText === 'Suggested' ? textElement.closest('.full-height').remove() : '')
  }
}

async function removeAds() {
  while (currentSettings['remove-ads']) {
    await sleep(500)
    if (feedPathName !== window.location.pathname) continue

    const subDescriptionPosts = [...document.getElementsByClassName('update-components-actor__sub-description-link')];
    const userTitlePosts = [...document.getElementsByClassName('update-components-actor__meta-link')];

    if (subDescriptionPosts.length) {
      subDescriptionPosts.filter((postDescription) => {
        const potentialAdText = postDescription.firstElementChild.innerText;
        if (potentialAdText.indexOf('Promoted') > -1) postDescription.closest('.full-height').remove();
      })
    }
    if (userTitlePosts.length) {
      userTitlePosts.filter((userTitleElement) => {
        if (userTitleElement.ariaLabel.indexOf('Promoted') > -1) userTitleElement.closest('.full-height').remove();
      })
    }
  }
}

async function removeCelebrations() { 
  while (currentSettings['remove-celebrations']) {
    await sleep(500);
    if (feedPathName !== window.location.pathname) continue

    const celebrationPosts = [...document.getElementsByClassName('feed-shared-celebration-image')];
    if (!celebrationPosts.length) continue
    
    celebrationPosts.filter((celebrationElement) => celebrationElement.closest('.full-height').remove());
  }
}

async function debloatMyNetwork() { // won't remove pending invitations
  while (currentSettings['debloat-mynetwork']) {
    await sleep(500);
    if ('/mynetwork/' !== window.location.pathname) continue
    
    [...document.getElementsByClassName('scaffold-finite-scroll')].map((e) => e.remove())
  }
}

async function removePremium() {
  while (currentSettings['remove-premium']) {
    await sleep(500);

    // remove navbar promo
    const navbarPromo = document.getElementsByClassName('premium-upsell-link');
    if (navbarPromo.length) navbarPromo[0].remove();

    // remove career heights promo from sidebar
    if (feedPathName === window.location.pathname) {
      const sidebarPromo = document.getElementsByClassName('feed-identity-module__anchored-widget--premium-upsell');
      if (sidebarPromo.length) sidebarPromo[0].remove();
    }

    // remove accent bar and message from jobs page
    if ('/jobs/' === window.location.pathname) {
      const accentBar = document.getElementsByClassName('premium-accent-bar');
      const premiumCardContent = document.getElementsByClassName('jobs-home-upsell-card__container');
      const premiumCardTitle = document.getElementsByClassName('display-flex mb1');

      if (accentBar.length) accentBar[0].className = 'artdeco-card';
      if (premiumCardContent.length) premiumCardContent[0].remove();
      if (premiumCardTitle.length) premiumCardTitle[0].remove();
    }

    //remove try premium button in notifications
    if ('/notifications/' === window.location.pathname) {
      const premiumButton = document.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary ember-view')
      if (premiumButton.length) premiumButton[0].remove();
    }
  }
}

async function highlightMessages() {
  while (currentSettings['highlight-msg']) {
    await sleep(800);

    const specialMessages = [...document.getElementsByClassName('msg-conversation-card__pill t-14')];
    specialMessages.length ? specialMessages.map((previewMessage) => previewMessage.closest('.msg-conversation-listitem__link').style.background = '#ffc2c2') : '';
  }
}