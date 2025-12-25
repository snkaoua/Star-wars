// Searches SWAPI for characters by a search term, maps the response to a clean format,
// and returns the term, total count, and the simplified results list.

const axios = require('axios');

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api/';

async function searchCharacters(term) {
    const url = `${SWAPI_BASE_URL}people/?search=${encodeURIComponent(term)}`;

    const response = await axios.get(url);

    const data = response.data;

    const results = data.results.map(character => ({
        name: character.name,
        height: character.height,
        birthYear: character.birth_year,
        gender: character.gender,
    }));

    return {
        search: term, 
        count: data.count,
        results,
    };
}

module.exports = {
    searchCharacters    
    };
