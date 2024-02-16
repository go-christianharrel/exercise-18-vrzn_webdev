const submit = document.querySelector("button");

const getData = () => {
    const txtBox = document.querySelector("input").value;

    const countryData = {
        countryRegion: "",
        countryInfo: {
            name: "",
            area: "",
            population: "",
            languages: [],
            currencies: {},
            capital: "",
            region: "",
            flag: ""
        },
        regionData: []
    };

    fetch(`https://restcountries.com/v3.1/name/${txtBox}`)
        .then(response => response.json())
        .then(data => {
            if(!data.length) throw new Error("Country not found");
            
            const [country] = data;
            countryData.countryRegion = country?.region;
            countryData.countryInfo = {
                name: country.name.common,
                area: country.area.toLocaleString(),
                population: country.population.toLocaleString(),
                languages: country.languages,
                currencies: country.currencies,
                capital: country.capital[0],
                region: country.region,
                flag: country.flags.png
            };
            let region = country.region;
            const call = `https://restcountries.com/v3.1/region/${region}`
            return fetch(call)
                .then(response => response.json())
                .then(regionData => {
                    countryData.regionData = regionData;
                });
        })
        .then(() => {
            // Display the result
            const { countryInfo, regionData } = countryData;
            document.querySelector(".result").innerHTML = `
                <h3>Country Information</h3>
                <img src="${countryInfo.flag}"/>
                <p>Country Name: ${countryInfo.name}</p>
                <p>Population: ${countryInfo.population}</p>
                <p>Area: ${countryInfo.area}</p>
                <p>Currencies: ${Object.values(countryInfo.currencies)
                    .map(curr => `${curr.name} (${curr.symbol})`)
                    .join(', ')}</p>
                <p>Capital City: ${countryInfo.capital}</p>
                <p>Region: ${countryInfo.region}</p>`;

            // Display countries in the same region
            const countriesInRegion = regionData.map(country => `
                <div>
                    <img 
                        src="${country.flags.png}" 
                        alt="${country.name.common} Flag" />
                    <p>${country.name.common}</p>
                </div>`).join('');

            document.querySelector(".region-countries").innerHTML = `
                <h3 class="region-title">Countries in the Same Region</h3>
                <div class="countries-container">
                    ${countriesInRegion}
                </div>`;
        })
        .catch(() => {
            document.querySelector(".result")
                .innerHTML = `<p>Country not found</p>`;
            document.querySelector(".region-countries").innerHTML = ""
        });
}

submit.addEventListener("click", getData);
