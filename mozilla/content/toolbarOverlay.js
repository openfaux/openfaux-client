/*!
 * Openfaux Firefox extension
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

var OpenFauxToolbarButton = {
  min: 1,
  max: 2,
  current: 1,

  mainWindowLoadHandler: function (event) {
    // OpenFauxToolbarButton.instalandupdatecheck(event);
    OpenFauxToolbarButton.requestAppendToolbar();
    // OpenFauxToolbarButton.addAddonListener();
  },

  requestAppendToolbar: function () {
    var openfauxtoolbarbuttonprefsinstance = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch),
        openfauxtoolbarbuttontbadded = facebooktoolbarbuttonprefsinstance.getBoolPref('extensions.openfauxtoolbarbutton.tbadded');
    if (!openfauxtoolbarbuttontbadded) {
      OpenFauxToolbarButton.appendToToolbar();
      openfauxtoolbarbuttonprefsinstance.setBoolPref('extensions.openfauxtoolbarbutton.tbadded',true);
    }
  },
  appendToToolbar: function() {
    if (!window.CustomizableUI) {
      // Get the current navigation bar button set (a string of button IDs) and append
      // ID of the Firebug start button into it.
      var startButtonId =  'openfaux-button',
          navBarId = 'nav-bar',
          navBar = document.getElementById(navBarId),
          currentSet = navBar.currentSet,
      // Append only if the button is not already there.
          curSet = currentSet.split(',');
      if (curSet.indexOf(startButtonId) == -1) {
        navBar.insertItem(startButtonId);
        navBar.setAttribute('currentset', navBar.currentSet);
        document.persist('nav-bar', 'currentset');

        try {
          // The current global scope is not browser.xul.
          top.BrowserToolboxCustomizeDone(true);
        }
        catch (e) {}
      }
      // Don't forget to show the navigation bar -- just in case it's hidden.
      // Dom.collapse(navBar, false);
      // document.persist(navBarId, 'collapsed');
    }
    else {
      var ids = ['openfaux-button'],
          add = 1,
          id;
      for (id in ids) {
        if (add) {
          if (!window.CustomizableUI.getPlacementOfWidget(id)) {
            window.CustomizableUI.addWidgetToArea(id, CustomizableUI.AREA_NAVBAR);
          }
        }
        else {
          window.CustomizableUI.removeWidgetFromArea(id);
        }
      }
    }
  },

  updateIcon: function() {
    this.current++;
    if (this.current > this.max) {
      this.current = this.min;
    }
    document.getElementById('openfaux-button').setAttribute('current', this.current);
  }
};

window.addEventListener('load', OpenFauxToolbarButton.mainWindowLoadHandler, false);
