import { getLocation } from './utils.js';
import API_KEY from './google_api_key.js';

class Controller {
	constructor() {
		this.initialState = document.getElementById('initial-state');
		this.location = document.getElementById('location');
		this.spinner = document.getElementById('spinner');
		this.sections = [this.initialState, this.spinner, this.location];

		this.googleMap = document.getElementById('google-map');

		this.locationButton = document.getElementById('location-button');
		this.locationButton.onclick = (function() {
			this.showSection('spinner');
			getLocation(coordinates => {	
				const { latitude, longitude } = coordinates.coords;
			
				this.googleMap.src = `https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=${API_KEY}`
				this.showSection('location');
			});
		}).bind(this);

		this.showSection('initialState');
	}


	showSection(name) {
		// Hide all sections
		this.sections.forEach(section => {
			section.classList.add('d-none');
			section.classList.remove('d-block');
		});

		// Show section with given name
		if (this[name]) {
			this[name].classList.remove('d-none');
			this[name].classList.add('d-block');
		}
	}
}

new Controller();