import { getLocation, notify, SweepingInfo } from './utils.js';
import API_KEY from './google_api_key.js';
import * as stores from './stores/index.js';

class Controller {
	constructor() {
		sessionStorage.clear();

		this.sessionStore = new stores.SessionStore(this.render.bind(this));
		this.localStore = new stores.LocalStore(this.render.bind(this));

		this.locationButton = document.getElementById('get-location-button');
		this.locationButton.onclick = (function() {
			this.sessionStore.setItem('gettingLocation', true);

			getLocation().then(coordinates => {
				this.sessionStore.removeItem('gettingLocation');

				const { latitude, longitude } = coordinates.coords;
				this.localStore.setItem('latitude', latitude);
				this.localStore.setItem('longitude', longitude);

				return fetch(`${window.location.origin}/get-sweeping-info?latitude=${latitude}&longitude=${longitude}`);
			}).then(response => response.json())
			.then(jsonResponse => {
				const info = new SweepingInfo(jsonResponse).buildInfo();
				console.log(info)
			});


		}).bind(this);

		this.render();
	}

	render() {
		this.hide('.card');

		if (!this.localStore.getItem('latitude') || !this.localStore.getItem('longitude') || this.sessionStore.getItem('gettingLocation')) {
			this.show('.card.location-button-card');

			if (this.sessionStore.getItem('gettingLocation')) {
				this.show('#acquiring-location-spinner');
				this.hide('#get-location-button');
			} else if (!this.localStore.getItem('latitude') || !this.localStore.getItem('longitude')) {
				this.show('#get-location-button');
				this.hide('#acquiring-location-spinner');
			}
		} else {
			this.show('.card.map-card');
			document.querySelector('#map').src = `https://www.google.com/maps/embed/v1/place?q=${this.localStore.getItem('latitude')},${this.localStore.getItem('longitude')}&key=${API_KEY}`
		}



	}

	show(selector) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(card => {
			card.classList.add('d-block');
			card.classList.remove('d-none');
		});
	}

	hide(selector) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(card => {
			card.classList.add('d-none');
			card.classList.remove('d-block');
		});
	}
}

new Controller();