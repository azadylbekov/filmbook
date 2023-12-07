export const formatDate = (date: string) => {
	if (!date) {
		return '';
	}
	return new Date(date).getFullYear();
};

export const formatGenresOptions = (genres) => {
	return genres.map((genre) => {
		return {
			label: genre.name,
			value: genre.id,
		};
	});
};


export const handleNumberOnlyInput = (e) => {
	const key = e.nativeEvent.keyCode || e.nativeEvent.charCode;

	const backAndDel = key == 8 || key == 46;

	const isNumber = /^[0-9]$/i.test(e.key);
	if (!isNumber && !backAndDel) {
		e.preventDefault();
	}
};


export const generateYears = () => {
	let start = 2000;
	const end = 2023;
	const options = [];
	while (start <= end) {
		const option = {
			label: start,
			value: start,
		};
		options.push(option);
		start++;
	}
	return options.reverse();
};

export const formatOptionLabel = ({ value, label, icon }) => (
	<div className="flex items-center">
		<div className="mr-3">{label}</div>
		<div>
			{icon}
		</div>
	</div>
)

export const formatRuntime = (minutes: number) => {
	if (minutes < 60) {
		return minutes + " minutes";
	}
	const hours = Math.floor(minutes / 60);
	const mins = Math.floor(minutes % 60);
	let minuteText = mins == 1 ? " minute" : " minutes";
	return hours + " hours " + (mins > 0 ? mins + minuteText : "");
};

export const formatBudget = (budget: number) => {
	if (budget && budget > 0) {
		return budget.toLocaleString("en-US");
	}
	return '';
};

export const formatOverview = (text) => {
	const formattedText = text.split(" ").slice(0, 10).join(" ");
	return formattedText + "...";
};

export const formatVote = (average) => {
	return Number(average).toFixed(1)
};