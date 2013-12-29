var OpenFaux = {
  min: 1,
  max: 2,
  current: 1,

  updateIcon: function() {
    this.current++;
    if (this.current > this.max) {
      this.current = this.min;
    }
    document.getElementById('openfaux-button').setAttribute('current', this.current);
  }
};

window.addEventListener('load', OpenFaux.updateIcon, false);
