'use strict';

function update(bol) {
  const path = {
    path: {
      '64': 'data/icons' + (bol ? '/' : '/disabled/') + '64.png'
    }
  };
  chrome.browserAction.setIcon(path);
  chrome.browserAction.setTitle({
    title: 'BanquePostale Clavier sécurisé (' + (bol ? 'activé' : 'désactivé') + ')'
  });
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.local.get({
    enabled: true
  }, prefs => {
    prefs.enabled = !prefs.enabled;
    chrome.storage.local.set(prefs);
    update(prefs.enabled);
  });
});

chrome.storage.local.get({
  enabled: true
}, prefs => update(prefs.enabled));

{
  const {name, version} = chrome.runtime.getManifest();
  chrome.runtime.setUninstallURL(
    chrome.runtime.getManifest().homepage_url + '&rd=feedback&name=' + name + '&version=' + version
  );
}
