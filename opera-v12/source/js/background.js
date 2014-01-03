/*  This file is part of OpenFaux Opera v12 Client. OpenFaux encrypts and masks 
	internet traffic, and this software is a browser addon for the Opera browsers 
	with the 'Presto' rendering engine (Opera v12).

	Copyright (C) 2012, 2013 Shabeer Ali Muhammad

	OpenFaux Opera v12 Client is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	OpenFaux Opera v12 Client is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with OpenFaux Opera v12 Client.  If not, see <http://www.gnu.org/licenses/>.

	Website: http://www.openfaux.org/
	Source code: https://github.com/openfaux/openfaux-client.git
	Email: support@openfaux.org 
*/
var button, 
	btnProperties;
	
/* define button properties */	
btnProperties = {		
	disabled: false,
	title: "OpenFaux",
	icon: 'icons/icon1.png'
};

/* create the button */
button = opera.contexts.toolbar.createItem(btnProperties);

/* 	Example code: to be removed 
	when functionality is added */

button.addEventListener('click', handleClick, false);

/* 	Changes the button icon when the
	click count is an even number */
	
var i = 1; // click count	
	
function handleClick() {
	if (i % 2 == 1) {
		button.icon = "icons/icon2.png";
	} else {
		button.icon = "icons/icon1.png";
	}

	i++;						
}

/* end example code */


function init() {
	/* activate the extension */
	
	/* add button to toolbar */
	opera.contexts.toolbar.addItem(button);
}

window.addEventListener('load', init);
