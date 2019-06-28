class LocalStore {
	constructor(renderCb) {
		this.renderCb = renderCb;
	}

	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
		this.renderCb && this.renderCb();
	}

	getItem(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	removeItem(key) {
		localStorage.removeItem(key);
		this.renderCb && this.renderCb();
	}
}

export { LocalStore }