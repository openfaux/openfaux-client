/*!
 * Openfaux Opera extension
 *
 * Copyright (C) 2013-2014 OpenFaux (<https://openfaux.org>).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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