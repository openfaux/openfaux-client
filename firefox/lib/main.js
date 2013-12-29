(function() {
	var widget = require("sdk/widget");
	var self = require("sdk/self");

	var STR_ICON = ["Stop OpenFaux", "Start OpenFaux"];
	var URL_ICON = ["icon-on.png", "icon-off.png"];
	var iconIndex = 1; // icon-off by default
	console.debug(STR_ICON[iconIndex], self.data.url(URL_ICON[iconIndex]));

	var icon = widget.Widget({
		id: "toggle-faux-btn",
		label: STR_ICON[iconIndex],
		tooltip: STR_ICON[iconIndex],
		contentURL: self.data.url(URL_ICON[iconIndex]),
		onClick: function() {
			iconIndex = Number(!iconIndex++);
			console.debug(STR_ICON[iconIndex], self.data.url(URL_ICON[iconIndex]));
			icon.tooltip = STR_ICON[iconIndex];
			icon.contentURL = self.data.url(URL_ICON[iconIndex]);
			// TODO: register the OpenFaux encrypter
		}
	});
	console.info("OpenFaux loaded.");
}());
