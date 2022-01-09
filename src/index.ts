// Style import
import "./styles/main.scss";
import { getWeather } from "./networking/weather";

// Import the API request method
import {
    buttonClick,
    weatherInput,
	modalDiv,
	errorDiv,
    getCity,
    updateInteface,
} from "./dom-manipulation/domManipulation";

modalDiv.style.display = 'none';
errorDiv.style.display = 'none';

// Create an async function to call the API method
const callApi = async () => {
	modalDiv.style.display = 'flex';
	errorDiv.style.display = 'none';
	try {
		const weather = await getWeather(getCity());
		updateInteface(weather);
	} catch (error) {
		errorDiv.style.display = 'block';
	}
    modalDiv.style.display = 'none';
};

const handleOnEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        callApi();
    }
};

// Add an event listener to the button
buttonClick?.addEventListener("click", callApi);
weatherInput?.addEventListener("keyup", handleOnEnter);
