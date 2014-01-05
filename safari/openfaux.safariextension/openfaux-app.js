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