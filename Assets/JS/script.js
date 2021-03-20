//Clear Local Storage when the Clear Recent Searches button is clicked
$("#clear").click(function() {
    localStorage.clear();
    location.reload
});

$(document).ready(function(){
    const cityName ='';
    const searchHistoryList = document.querySelector('#searchHistoryList');
    var searchedCities =[];

    //Moment.js to display current date and time
    const currentDay = moment().format('dddd, MMMM Do YYYY, h:mm:ss A');
    $('currentDay').text(currentDay);

    const dayTwo = moment()
      .add(1, 'days')
      .format('1');
    $('#dayTwo').text(dayTwo.slice(0, 9));

    const dayThree = moment()
      .add(2, 'days')
      .format('1');
    $('#dayThree').text(dayThree.slice(0, 9));

    const dayFour = moment()
      .add(3, 'days')
      .format('1');
    $('#dayFour').text(dayFour.slice(0, 9));

    const dayFive = moment()
      .add(4, 'days')
      .format('1');
    $('#dayFive').text(dayFive.slice(0, 9));

    const daySix = moment()
      .add(5, 'days')
      .format('1');
    $('#daySix').text(daySix.slice(0, 9));

    init();

    //Show Searched Cities
    function rendersearchedCities() {
        //Clear searchHistoryList element
        searchHistoryList.innerHTML = '';

        //Clear out current city before showing next city
        $('#searchHistoryList').empty();

        //for loop through the array of cities entered, then make list items for cities in the array
        for (var =i =0; i < searchedCities.length; i++) {
            const newCity = $('<button>');
            newCity.addClass('newCityBtn');
            newCity.text(searchedCities[i]);
            newCity.attr('data-name', searchedCities[i]);
            $('#searchHistoryList').append(newCity);
            $('#searchHistoryList').attr('style','display:block');
        }
    }

    //click previously searched cities
    $(document).on('click', '.newCityBtn', function() {
        currentWeather($(this).text());
    });

    function init() {
      //Parse JSON string to object
      //Get searchedCities from Local Storage
      const storedsearchedCities = JSON.parse(
        localStorage.getItem('searchedCities')
     );

       //If searchedCities is retrived from LocalStorage, update searchedCities array to it
     if (storedsearchedCities !== null){
        searchedCities = storedsearchedCities;
     }
         rendersearchedCities();
    }

    function storesearchedCities() {
      // Stringify and set "searchedCities" key in LocalStorage to searchedCities array
      localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    }

    //API REQUESTS
    $('#searchBtn').on('click', function(event){
        event.preventDefault();

        var cityName = $('#cityNameSearch')
          .val()
          .trim();
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); //Capitalize first letter
        currentWeather(cityName);

        $('$searchedHostoryList').on('click', function(event) {
          event.preventDefault();

          const cityName = $(this).text();
          currentWeather(cityName);

          //If submitted cityNameSearchText is blank, return from function early
          if (cityName !== null) {
              city = cityName[0].name;
            }
        });

        //Add new cityNameSearchText to searchedCities array, clear input
        searchedCities.push(cityName);
        cityName.value = '';

        //re render the list and store updated searchedCities in Local Storage
        storesearchedCities();
        rendersearchedCities();
    })

    //Previous city button click
    $(document).on('click', 'newCity', function(){
        currentWeather($(this).text());
    });

    //Show Current Weather
    function currentWeather(cityName) {
        apiKey = 'f664599fcc533e3816f66a3912bb0504';
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
        const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;

        $.ajx({
            url: queryURL,
            method: 'GET',
        })
        .then(function(response) {
            const iconCode = response.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const city = response.name;
            const temp = Math.round(response.main.temp);
            const { humidity } = response.main;
            const windspeed = response.wind.speed;
            const { lat } = response.coord;
            const { lon } = response.coord;
            const indexQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            // console.log(response)

            $('#city').text(city);
            $('#temp').text(`Temperature: ${temp}° F`);
            $('#humidity').text(`Humidity: ${humidity} %`);
            $('#windSpeed').text(`Wind Speed: ${windSpeed} MPH`);
            $('#weatherIcon').attr('src', iconURL);

            // Uv Index
            $.ajax({
              url: indexQueryURL,
              method: 'GET',
            })
            .then(function(resp) {
              $('#uvIndex').text(`UV Index: ${resp.value}`);
            });
          });

          // 5 Day 
          $.ajax({
            url: fiveDayQueryURL,
            method: 'GET',
          })
          .then(function(response) {
            // 1st Day
            var iconCode = response.list[0].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempTwo').text(`Temp: ${parseInt(response.list[0].main.temp)}° F`);
            $('#iconTwo').attr('src', iconURL);
            $('#humidTwo').text(`Humidity: ${response.list[0].main.humidity}%`);
            $('#uvIndex').html(`UV Index: ${response.value}`);
            $('#weatherIconTwo').attr('src', iconUrl);

            // 2nd Day
            var iconCode = response.list[8].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempThree').text(`Temp: ${parseInt(response.list[8].main.temp)}° F`);
            $('#iconThree').attr('src', iconURL);
            $('#humidThree').text(`Humidity: ${response.list[8].main.humidity}%`);
            $('#uvIndex').html(`UV Index: ${response.value}`);
            $('#weatherIconThree').attr('src' ,iconURL);

            // 3rd Day
            var iconCode = response.list[16].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempFour').text(`Temp: ${parseInt(response.list[16].main.temp)}° F`);
            $('#iconFour').attr('src', iconURL);
            $('#humidFour').text(`Humidity: ${response.list[16].main.humidity}%`);
            $('#uvIndex').html(`UV Index: ${response.value}`);
            $('#weatherIconFour').attr("src", iconURL);

            //4th Day
            var iconCode = response.list[24].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempFive').text(`Temp: ${parseInt(response.list[24].main.temp)}° F`);
            $('#iconFive').attr('src', iconURL);
            $('#humidFive').text(`Humidity: ${response.list[24].main.humidity}%`);
            $('#uvIndex').html(`UV Index: ${response.value}`);
            $('#weatherIconFive').attr("src", iconURL);

            //5th Day
            var iconCode = response.list[32].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempSix').text(`Temp: ${parseInt(response.list[32].main.temp)}° F`);
            $('#iconSix').attr('src', iconURL);
            $('#humidSix').text(`Humidity: ${response.list[32].main.humidity}%`);
            $('#uvIndex').html(`UV Index: ${response.value}`);
            $('#weatherIconSix').attr("src", iconURL);
          })
    }
    // geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      apiKey = 'f664599fcc533e3816f66a3912bb0504';
      const queryLocationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}%lon=${lon}&units=imperial&appid=${apiKey}`;
      const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}%lon=${lon}&units=imperial&appid=${apiKey}`;

      //Current Weather
      $.ajax({
        url: queryLocationURL,
        method: 'GET',
      })
      .then(function(response) {
        //console.log(response);
        const iconCode = response.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const city = response.name;
        const temp = parseInt(response.main.temp);
        const humidity = parseInt(response.main.humidity);
        const windSpeed = parseInt(response.wind.speed);
        const { lat } = response.coord;
        const { lon } = response.coord;

        $('#city').text(city);
        $('#temp').text(`Temperature: ${temp}° F`);
        $('#humidity').text(`Humidity: ${humidity} %`);
        $('#windSpeed').text(`Wiind Speed: ${windSpeed}MPH`);
        $('#weatherIcon').attr('src', iconURL);

        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`,
          method: 'GET',
        })
        .then(function(response) {
          $('#uvIndex').html(`UV Index: ${response.value}`);
        });

        //5th Day








      })
    })





})