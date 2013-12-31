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
