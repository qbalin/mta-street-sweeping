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


				this.sessionStore.setItem('gettingSweepingInfo', true);
				return fetch(`${window.location.origin}/get-sweeping-info?latitude=${latitude}&longitude=${longitude}`);
			}).then(response => response.json())
			.then(jsonResponse => {
				this.sessionStore.removeItem('gettingSweepingInfo');

				const info = new SweepingInfo(jsonResponse).buildSentences();
				this.localStore.setItem('sweepingInfo', info);
				console.log(info)
			});


		}).bind(this);

		document.querySelector('.odd-numbers-button').onclick = (function() {
			this.localStore.setItem('streetSide', 'odd');
		}).bind(this);

		document.querySelector('.even-numbers-button').onclick = (function() {
			this.localStore.setItem('streetSide', 'even');
		}).bind(this);

		document.querySelector('.reset-button').onclick = (function() {
			this.localStore.clear();
			this.sessionStore.clear();
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

		if (this.sessionStore.getItem('gettingSweepingInfo') || this.localStore.getItem('sweepingInfo')) {
			this.show('.card.sweeping-schedule');

			if (this.sessionStore.getItem('gettingSweepingInfo')) {
				this.show('#getting-sweeping-info-spinner');
				this.hide('#sweeping-info');
			} else if (this.localStore.getItem('sweepingInfo')) {
				const info = this.localStore.getItem('sweepingInfo');

				this.show('#sweeping-info');
				this.hide('#getting-sweeping-info-spinner');

				document.querySelector('#sweeping-info-streetname').innerText = info.streetname;
				if (this.localStore.getItem('streetSide') === 'even') {
					document.querySelector('.even-numbers-button').classList.add('active');
					document.querySelector('.odd-numbers-button').classList.remove('active');

					document.querySelector('#sweeping-info-header').innerText = info.right.header;
					document.querySelector('#sweeping-info-content').innerText = info.right.content;
				} else {
					document.querySelector('.even-numbers-button').classList.remove('active');
					document.querySelector('.odd-numbers-button').classList.add('active');

					document.querySelector('#sweeping-info-header').innerText = info.left.header;
					document.querySelector('#sweeping-info-content').innerText = info.left.content;
				}
			}
		}

		if (this.localStore.getItem('sweepingInfo') || this.localStore.getItem('longitude') || this.localStore.getItem('latitude')) {
			this.show('.card.reset-card');
		}
	}

	show(selector) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(card => {
			card.classList.remove('d-none');
		});
	}

	hide(selector) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(card => {
			card.classList.add('d-none');
		});
	}
}

new Controller();