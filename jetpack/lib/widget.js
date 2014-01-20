/*!
 * Openfaux Jetpack extension
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

const widgets = require('sdk/widget');
const data = require('sdk/self').data;
const ss = require('sdk/simple-storage');
const _ = require('sdk/l10n').get;
const config = require('sdk/preferences/service');
const sp = require('sdk/simple-prefs');

// Magical strings.
const ICON_ON = 'icon-on.png';
const ICON_OFF = 'icon-off.png';
const TOOLTIP_ON = _('disable_openfaux');
const TOOLTIP_OFF = _('enable_openfaux');

const DEBUG = true;

// Proxy address and port number.
let HTTP_ADDRESS = '';
let HTTP_PORT = 0;

// Set the button status.
if (typeof ss.storage.button_is_on === 'undefined') {
  // Set default status to deactivated.
  ss.storage.button_is_on = false;
}

/*
 * Toggle openfaux status, icon and tooltip.
 *
 * 'network.proxy.type' is a browser preference value which
 * is used to decide whether to use a proxy or not.
 * 0 : Direct connection, no proxy.
 * 1 : Manual proxy configuration.
 *
 * 'network.proxy.http' is another browser preference value.
 * It stores the manual http proxy address.
 *
 * 'network.proxy.http_port' stores the manual http proxy port
 * number.
 */

let toggle_openfaux = function () {
  if (ss.storage.button_is_on) {
    openfaux_button.contentURL = data.url(ICON_OFF);
    openfaux_button.tooltip = TOOLTIP_OFF;
    ss.storage.button_is_on = false;
    config.set('network.proxy.type', 0);
    
    if (DEBUG) {
      console.log('TURNING OFF');
      console.log('http address set ' + config.get('network.proxy.http'));
      console.log('port set ' + config.get('network.proxy.http_port'));
      console.log('proxy type set to ' + config.get('network.proxy.type'));
    }
  }
  else {
    openfaux_button.contentURL = data.url(ICON_ON);
    openfaux_button.tooltip = TOOLTIP_ON;
    ss.storage.button_is_on = true;
    config.set('network.proxy.type', 1);
   
    if (DEBUG) {
      console.log('TURNING ON');
      console.log('http address set ' + config.get('network.proxy.http'));
      console.log('port set ' + config.get('network.proxy.http_port'));
      console.log('proxy type set to ' + config.get('network.proxy.type'));
    }
  }
};

/*
 * Create and return button.
 */

let createButton = function () {
  config.set('network.proxy.http', HTTP_ADDRESS);
  config.set('network.proxy.http_port', HTTP_PORT);
  config.set('network.proxy.type', 0);

  if (DEBUG) {
    console.log('INITIALIZED...');
    console.log('http address set ' + config.get('network.proxy.http'));
    console.log('port set ' + config.get('network.proxy.http_port'));
    console.log('proxy type set to ' + config.get('network.proxy.type'));
  }

  // Register the pref listeners.
  prefListen();
  openfaux_button = widgets.Widget({
    id: 'openfaux-addon-bar-button',
    label: 'Openfaux',
    tooltip: TOOLTIP_OFF,
    contentURL: data.url(ICON_OFF),
    onClick: function () {
      toggle_openfaux();
      if (DEBUG) {
        console.log('button clicked, now openfaux is ' +
                    (ss.storage.button_is_on ? 'on': 'off'));
      }
    }
  });

  return openfaux_button;
};
exports.createButton = createButton;

// Set new proxy address.
function addressChange() {
  HTTP_ADDRESS = sp.prefs['openfaux-proxy-address'];
  config.set('network.proxy.http', HTTP_ADDRESS);
  if (DEBUG) {
    console.log('http proxy address: ' + config.get('network.proxy.http'));
  }
}

// Set new proxy port address.
function portChange() {
  HTTP_PORT = sp.prefs['openfaux-proxy-port'];
  config.set('network.proxy.http_port', HTTP_PORT);
  if (DEBUG) {
    console.log('http proxy port: ' + config.get('network.proxy.http_port'));
  }
}

// Register pref change listeners.
function prefListen() {
  sp.on('openfaux-proxy-address', addressChange);
  sp.on('openfaux-proxy-port', portChange);
}
