function WritableStore(value) {
	let subscribeFunctions = [];

	function set(newValue) {
		value = newValue;
		subscribeFunctions.forEach((func) => func(newValue))
	}

	function get() {
		return value;
	}

	function update(callback) {
		set(callback(value));
	}

	function subscribe(callback) {
		subscribeFunctions.push(callback);
		callback(value)

		return function() {
			subscribeFunctions = 
				subscribeFunctions.filter((func) => callback !== func)
		}
	}

	return {set, update, subscribe, get};
}

export default WritableStore;