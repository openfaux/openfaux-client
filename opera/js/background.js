/*! OpenFaux Opera client | AGPL v3 */

function toggleState() {
  localStorage.state = localStorage.state === 'on' ? 'off' : 'on';
  renderIcon();
}
function renderIcon() {
  localStorage.state || (localStorage.state = 'on');
  var state = '';
  if (localStorage.state === 'off') {
    state = '-gray';
    chrome.browserAction.setBadgeText({
      text: 'off'
    });
    chrome.browserAction.setBadgeBackgroundColor({color: '#b3b3b3'});
  }
  else {
    chrome.browserAction.setBadgeText({
      text: 'on'
    });
    chrome.browserAction.setBadgeBackgroundColor({color: '#ffa200'});
  }
  chrome.browserAction.setIcon({
    path: 'media/openfaux-icon-19px' + state + '.png'
  });
}
chrome.browserAction.onClicked.addListener(toggleState);
renderIcon();