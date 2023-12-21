const settings = {};
const accordionElements = [...document.getElementsByClassName('accordion')]
document.addEventListener('DOMContentLoaded', loadSettings());

document.forms['options'].addEventListener('change', () => {
  Array.from(document.forms['options']).map((optionElement) => {
    settings[optionElement.id] = optionElement.checked;
  });
  updateSettings(settings);
})


async function updateSettings(newSettings) {
  chrome.storage.sync.set({ 'settings': newSettings }).then(() => loadSettings())
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { 'settings': newSettings });
  })
}

function loadSettings() {
  chrome.storage.sync.get(['settings']).then((chromeStoredSettings) => {
    const extensionSettings = chromeStoredSettings['settings'];
    for (let key in extensionSettings) {
      document.forms['options'][key].checked = extensionSettings[key];
    }
  })
}

accordionElements.forEach((accordionButton) => accordionButton.addEventListener('click', function (eventTarget) {
  eventTarget.preventDefault();
  const panel = accordionButton.nextElementSibling;

  if (panel.style.display === 'block') panel.style.display = 'none'
  else panel.style.display = 'block';

  if (panel.style.maxHeight) panel.style.maxHeight = null;
  else panel.style.maxHeight = panel.scrollHeight + 'px';
}))