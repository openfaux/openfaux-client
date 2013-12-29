const widgets = require('sdk/widget');
const data = require('sdk/self').data;
const ss = require('sdk/simple-storage');
const _ = require('sdk/l10n').get;

// Magical strings.
const ICON_ON = 'icon-on.png';
const ICON_OFF = 'icon-off.png';
const TOOLTIP_ON = _('disable_openfaux');
const TOOLTIP_OFF = _('enable_openfaux');

const DEBUG = true;

// Set the button status.
if (typeof ss.storage.button_is_on === 'undefined') {
  // set default status
  ss.storage.button_is_on = true;
}

/*
 * Init openfaux status.
 * Set the icon and tooltip contents.
 */
let init_openfaux = function () {
  if (ss.storage.button_is_on) {
    openfaux_button.contentURL = data.url(ICON_ON);
    openfaux_button.tooltip = TOOLTIP_ON;
  }
  else {
    openfaux_button.contentURL = data.url(ICON_OFF);
    openfaux_button.tooltip = TOOLTIP_OFF;
  }
};

/*
 * Toggle openfaux status, icon and tooltip.
 */
let toggle_openfaux = function () {
  if (ss.storage.button_is_on) {
    openfaux_button.contentURL = data.url(ICON_OFF);
    openfaux_button.tooltip = TOOLTIP_OFF;
    ss.storage.button_is_on = false;
  }
  else {
    openfaux_button.contentURL = data.url(ICON_ON);
    openfaux_button.tooltip = TOOLTIP_ON;
    ss.storage.button_is_on = true;
  }
};

/*
 * Create and return button.
 */
let createButton = function () {
  openfaux_button = widgets.Widget({
    id: 'openfaux-addon-bar-button',
    label: 'Openfaux',
    tooltip: TOOLTIP_ON,
    contentURL: data.url(ICON_ON),
    onClick: function () {
      toggle_openfaux();
      if (DEBUG) {
        console.log('button clicked, now openfaux is ' +
                    (ss.storage.button_is_on ? 'on': 'off'));
      }
    },
    onAttach: function () {
      init_openfaux();
    }
  });

  return openfaux_button;
};

exports.createButton = createButton;
