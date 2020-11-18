import $ from 'jquery';
const jsonData = require('./test/data.json');

// on document load
$(function(){
    // read in data.csv
    $.get(require('./test/data.csv'), function(csvData) {
        let csv = csvData;
        
        // convert CSV file to JSON array
        function csvToJson(csv) {
            let lines=csv.split("\n");
            let headers= lines[0].split(",");
            let result = [];
    
            // loop through each line and split by ","
            for (let i=1; i<lines.length; i++) {
                let obj = {};
                let currentline = lines[i].split(",");

                // check for typos ie. extra/ not enough commas
                if (currentline.length !== headers.length) {
                    console.log("error: invalid format " + currentline)
                } else {
                    // loop through currentline and assign to their respective attribute 
                    for (let j=0; j<headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }
        
                    // push the resulting object into the JSON
                    result.push(validator(obj));
                }
            }
    
            //return JSON
            return result;
        }

        // validate and format data
        function validator(obj) {
            // If data is not available, replace it
            if (obj.date === undefined || obj.date === '') {
                obj.date = "Date not available";
            } else {
                // format date to be readable and consistant
                let array = obj.date.split(" ");
                const date = new Date(array[0]);
                obj.date = date.toUTCString().slice(0, date.toUTCString().length - 12) + " " + array[1] + " " + array[2];
            }
            if (obj.town === undefined || obj.town === '') {
                obj.town = "Location not available";
            }
            if (obj.temperature === undefined || obj.temperature === '') {
                obj.temperature = "--";
            }
            if (obj.weather === undefined || obj.weather === '') {
                obj.weather = "Weather not available";
            }
            return obj;
        }
        
        // build the JSON to be used
        function buildJson() {
            // run conversions 
            let totalData = csvToJson(csv);

            // add on JSON file
            for (var i=0; i<jsonData.forcast.length; i++) {
                totalData.push(validator(jsonData.forcast[i]));
            }

            // return the JSON
            return totalData;
        }
        
        const data = (buildJson());

        // build arrays of unique towns and dates for dropdowns
        function getUniqueList(attribute) {
            let array = [];

            // loop through the json
            for (var i=0; i<data.length; i++) {
                // if the attribute (either town or date) doesn't already exist in array, add it
                if (!array.includes(data[i][attribute])) {
                    array.push(data[i][attribute]);
                }
            }
            return array;
        }

        const uniqueTowns = getUniqueList('town');
        const uniqueDates = getUniqueList('date');

        // assign dropdowns to variables
        let townDropdown = $('#town');
        let dateDropdown = $('#date');

        townDropdown.empty();
        dateDropdown.empty();

        // populate dropdowns with the unique towns and dates
        $.each(uniqueTowns, function (i, value){
            townDropdown.append($('<option></option>').attr('value', value).text(value));
        })
        $.each(uniqueDates, function (i, value) {
            dateDropdown.append($('<option></option>').attr('value', value).text(value));
        })

        // add listeners to dropdowns
        document.querySelector('#town').addEventListener('change', (event) => {
            buildCard('town', event.target.value);
        });
        document.querySelector('#date').addEventListener('change', (event) => {
            buildCard('date', event.target.value);
        });

        // search through the JSON and create an array of the data to be returned
        // this passes in whether we are searching on town name or date (attribute),
        // as well as the actual thing we are searching for (searchterm)
        function searchJson(attribute, searchTerm){
            let results = [];
            // loop through JSOn to find objects that match the searchTerm
            for (var i=0; i<data.length; i++) {
                if (data[i][attribute] === searchTerm) {
                    results.push(data[i]);
                }
            }
            return results;
        }

        // build the actual card
        function buildCard(attribute, searchTerm) {
            // perform the search to get the data to display
            let searchResult = searchJson(attribute, searchTerm);
            let identifier = "";
            // set the card's title to the either the town or date we searched for
            document.getElementById('cardTitle').innerHTML = searchTerm;
            // set an "identifier" or the specific attribute to differentiate entries
            if (attribute === "town") {
                identifier = "date";
            } else if (attribute === "date") {
                identifier = "town";
            // This else should never happen
            } else {
                return "Error, search invalid";
            }
            // build up the entries
            let result = searchResult.map(function(entry) {
                // loop through all the returned objects we searched for
                for (var attr in entry) {
                    // return the entries as individual lines printed to the card
                    return "<div class='weakly-weather-item'> <p class='mb-0'> " + entry[identifier] + "</p> <p class='mb-0'>" + entry.temperature + "</p> <p class='mb-0'> " + entry.weather + "</p></div>";
                }}).join('');
            document.getElementById('contents').innerHTML = result;
        }
        // Set default landing result as firsst town in JSON
        buildCard('town', data[0].town);
    });
});
