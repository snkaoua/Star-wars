/* Calls the external SWAPI API and normalizes the data into the format used by the app. */ 

// Example: { search: "luke", count: 1, result: [ { name: "Luke Skywalker", height: "172", birthYear: "
const axios = require('axios');

// Base URL for the SWAPI API
const SWAPI_BASE_URL = 'https://swapi.dev/api/';

// Function to search for characters by name
async function searchCharacters(term) {
    // Construct the search URL
    const url = `${SWAPI_BASE_URL}people/?search=${encodeURIComponent(term)}`;

    // Make the API request
    const response = await axios.get(url);

    // Extract and normalize the data
    const data = response.data;

    // Map the results to the desired format
    const results = data.results.map(character => ({
        name: character.name,
        height: character.height,
        birthYear: character.birth_year,
        gender: character.gender,
    }));

    // Return the normalized data
    return {
        search: term, 
        count: data.count,
        results,
    };
}

// Export the function for use in other parts of the application
module.exports = {
    searchCharacters    
    };
