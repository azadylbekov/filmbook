export const useDebounce = () => {

	let timeout;

	const debounce = (fn, delay) => {
		if (timeout) {
			clearTimeout(timeout);
		}
	
		timeout = setTimeout(() => fn(), delay || 1000);
		return timeout;
	}

	return debounce;
}

