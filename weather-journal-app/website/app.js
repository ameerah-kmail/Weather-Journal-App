/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
//

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f05b5f3a97f634984c0238c9e533608f';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeatherData);

/* Function called by event listener */
async function generateWeatherData() {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    if (!zipCode) {
        return alert("Please enter a valid zip code.");
    }

    try {
        //GET DATA
        const weatherData = await getWeatherData(baseURL, zipCode, apiKey);
        const date = new Date().toLocaleDateString();
        //POET DATA
        await postData('/add', {
            temperature: weatherData.main.temp,
            date: date,
            userResponse: userResponse, 
        });
        //UPDATE UI
        updateUI();
    }
    catch (error) {
        console.error('error', error);
    }
}

/* Function to GET Web API Data*/
async function getWeatherData(baseURL, zipCode, apiKey) {
    const response =await fetch(`${baseURL}?zip=${zipCode}&appid=${apiKey}&units=imperial`);
    if (!response.ok) {
        throw new Error(`Error in Fetching :${response.statusText}`);
    }
    return await response.json();
}

/* Function to POST data */
async function postData(path, data) {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error in Posting :${response.statusText}`);
    }
    return await response.json();
}

/* Function to GET Project Data */
async function updateUI() {
    try {
        const response = await fetch('/all');
        if (!response.ok) {
            console.error('Full Response:', response); 
            throw new Error(`Error in Fetching :${response.statusText}`);
        }
        const allData = await response.json();
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.userResponse;

    }
    catch (error) {
        console.error('Error in Updating UI', error);
    }
}