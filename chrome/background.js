function toggleState() {
  localStorage.state = localStorage.state === 'on' ? 'off' : 'on';
  renderIcon();
}

function renderIcon() {
  localStorage.state || (localStorage.state = 'on');
  chrome.browserAction.setIcon({path:"icons/icon-" + localStorage.state + ".png"});
}

chrome.browserAction.onClicked.addListener(toggleState);
//chrome.browserAction.setBadgeText({text: "on"});
renderIcon();
