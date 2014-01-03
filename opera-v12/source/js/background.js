/* Openfaux Opera 12 client | AGPL v3 */
var button,
    btnProperties,
    i = 1;

// Define button properties
btnProperties = {		
  disabled: false,
  title: 'OpenFaux',
  icon: 'icons/icon1.png'
};

// Create the button
button = opera.contexts.toolbar.createItem(btnProperties);

// Example code
button.addEventListener('click', handleClick, false);

// Changes the button icon when the click count is an even number	
function handleClick() {
  if (i % 2 == 1) {
    button.icon = 'icons/icon2.png';
  }
  else {
    button.icon = 'icons/icon1.png';
  }

  i++;						
}

function init() {
  // Add button to toolbar
  opera.contexts.toolbar.addItem(button);
}

window.addEventListener('load', init);
