// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
    path: 'media/icon-19' + state + '.png'
  });
}
function toggleState() {
  localStorage.state = localStorage.state === 'on' ? 'off' : 'on';
  renderIcon();
}
chrome.browserAction.onClicked.addListener(toggleState);
renderIcon();
