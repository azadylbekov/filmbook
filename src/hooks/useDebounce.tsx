const useDebounce = () => {

	let timeout: undefined | ReturnType<typeof setTimeout>;

	const debounce = (fn: () => void, delay: number) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(fn, delay || 1000);
		return timeout;
	}

	return debounce;
}

export default useDebounce;