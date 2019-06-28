class SessionStore {
	constructor(renderCb) {
		this.renderCb = renderCb;
	}

	setItem(key, value) {
		sessionStorage.setItem(key, JSON.stringify(value));
		this.renderCb && this.renderCb();
	}

	getItem(key) {
		return JSON.parse(sessionStorage.getItem(key));
	}

	removeItem(key) {
		sessionStorage.removeItem(key);
		this.renderCb && this.renderCb();
	}

	clear() {
		sessionStorage.clear();
		this.renderCb && this.renderCb();
	}
}

export { SessionStore }