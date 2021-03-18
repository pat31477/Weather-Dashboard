
$("#clear").click(function() {
    localStorage.clear();
    location.reload()
  });
  
  $(document).ready(function() {
    const cityName = '';
    const searchHistoryList = document.querySelector('#searchHistoryList');
    let searchedCities = [];
  
      // Moment.js to display current date and time
    const currentDay = moment().format('dddd, MMMM Do YYYY, h:mm:ss A');
    $('#currentDay').text(currentDay);
  
    const dayTwo = moment()
      .add(1, 'days')
      .format('l');
    $('#dayTwo').text(dayTwo.slice(0, 9));
  
    const dayThree = moment()
      .add(2, 'days')
      .format('l');
    $('#dayThree').text(dayThree.slice(0, 9));
  
    const dayFour = moment()
      .add(3, 'days')
      .format('l');
    $('#dayFour').text(dayFour.slice(0, 9));
  
    const dayFive = moment()
      .add(4, 'days')
      .format('l');
    $('#dayFive').text(dayFive.slice(0, 9));
  
    const daySix = moment()
      .add(5, 'days')
      .format('l');
    $('#daySix').text(daySix.slice(0, 9));
  
    init();
  
    // Show Searched Cities
    function rendersearchedCities() {
      // Clear searchHistoryList element
      searchHistoryList.innerHTML = '';
  
      // Clear current city before showing next city
      $('#searchHistoryList').empty();
  
      // Loop through the array of cities entered, then generate list items for each city in the array
      for (let i = 0; i < searchedCities.length; i++) {
        const newCity = $('<button>');
        newCity.addClass('newCityBtn');
        newCity.text(searchedCities[i]);
        newCity.attr('data-name', searchedCities[i]);
        $('#searchHistoryList').append(newCity);
        $('#searchHistoryList').attr('style', 'display:block');
      }
    }