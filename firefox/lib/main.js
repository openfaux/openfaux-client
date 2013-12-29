var widgets = require("sdk/widget");
var self = require("sdk/self");
var data = require("sdk/self").data;
var ss = require("sdk/simple-storage");

if (typeof ss.storage.button_is_on === "undefined") {
    // set default status
    ss.storage.button_is_on = true;
};

var openfaux_button = function () {
    /**
     * init openfaux status
     */
    var init_openfaux = function () {
	if (ss.storage.button_is_on) {
	    openfaux_button.contentURL = data.url("icon-on.png");
	} else {
	    openfaux_button.contentURL = data.url("icon-off.png");
	}
    };

    /**
     * toggle openfaux status
     */
    var toggle_openfaux = function () {
	if (ss.storage.button_is_on) {
	    openfaux_button.contentURL = data.url("icon-off.png");
	    ss.storage.button_is_on = false;
	} else {
	    openfaux_button.contentURL = data.url("icon-on.png");
	    ss.storage.button_is_on = true;
	}
    };

    return widgets.Widget({
	id: "openfaux-addon-bar-button",
	label: "enable OpenFaux",
	contentURL: data.url("icon-on.png"),
	onClick: function () {
	    toggle_openfaux();
	    console.log("button clicked, now openfaux is " +
	    		(ss.storage.button_is_on ? "on": "off"));
	},
	onAttach: function () {
	    init_openfaux();
	}
    });
}();
