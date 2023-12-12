async function searchCountry() {
  const searchInput = document
    .querySelector("#search_input")
    .value.toLowerCase();

  try {
    const countryResponse = await fetch(
      `https://restcountries.com/v3.1/name/${searchInput}`
    );
    const countryData = await countryResponse.json();

    const region = countryData[0]?.region.toLowerCase();

    const regionResponse = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const regionCountriesData = await regionResponse.json();

    displayCountryInfo(countryData[0]);

    displayRegionCountries(regionCountriesData);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayCountryInfo(country) {
  const countryInfoDiv = document.querySelector("#country_info");
  const flagUrl = country.flags.png;

  countryInfoDiv.innerHTML = `
    <img src="${flagUrl}" alt="${country.name.common} Flag" class="flag">
    <p>Name: ${country.name.common}</p>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Area: ${country.area} sq. km</p>
    <p>Region: ${country.region}</p>
    <!-- Add more details as needed -->
  `;
}

function displayRegionCountries(countries) {
  const regionCountriesDiv = document.querySelector("#region_countries");
  regionCountriesDiv.innerHTML = "";

  countries.forEach((country) => {
    regionCountriesDiv.innerHTML += `<p>${country.name.common}</p>`;
  });
}
