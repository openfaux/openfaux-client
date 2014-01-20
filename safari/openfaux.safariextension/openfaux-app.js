/*!
 * Openfaux Safari extension
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

function updateIcon() {
  changeToolbarIcon('icon-' + safari.extension.settings.state + '.png');
}

function toggleOpenFaux(event) {
  safari.extension.settings.state = (safari.extension.settings.state === 'on') ? 'off' : 'on';
  updateIcon();
}

function changeToolbarIcon(newIconName) {
  var itemArray = safari.extension.toolbarItems;
  var i;
  for (i = 0; i < itemArray.length; ++i) {
    var item = itemArray[i];
    if (item.identifier == 'openfaux.toggle') {
      item.image = safari.extension.baseURI + 'icons/' + newIconName;
      item.toolTip = 'OpenFaux is ' + safari.extension.settings.state;
    }
  }
}

safari.application.addEventListener('command', toggleOpenFaux, false);
updateIcon();