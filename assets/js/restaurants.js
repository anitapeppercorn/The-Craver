var userKeyZomato = "fa3c32034df355627e248bca18cee942";
var restaurantDisplay = document.querySelector("#restaurant-display");
var displayMoreRestaurants = document.querySelector("#display-more-restaurants");

var locationPath = window.location.search;
var vals = locationPath.split("&");
vals = vals.slice(1);
var obj = {};

// Grabs the user input from the location path
for (let i = 0; i < vals.length; i++) {
  let key_val = vals[i].split("=");
  if (key_val[1].includes("%20")) {
    key_val[1] = key_val[1].split("%20").join(" ")
  }
  obj[key_val[0]] = key_val[1];
}

// User Input hard variables
var numberOfCards = 3;
/**
 * Functions to make cards and render
 * Name: makeCardDOM
 * Parameters: restaurant, type - array
 * Return: DOM element
 */
var makeCardDOM = function (restaurant) {
  var liDOM = document.createElement("li");
  liDOM.setAttribute("id", `card-${restaurant.id}`);
  liDOM.innerHTML =
    `<div class="restaurant-name collapsible-header">${restaurant.name}</div>
    <div class="collapsible-body">
      <div class="restaurant-cuisine">${restaurant.cuisines}</div>
      <div class="restaurant-address">Address: ${restaurant.location.address}</div>
      <div class="restaurant-timings">Schedule: ${restaurant.timings}</div>
      <a class="restaurant-url" href=${restaurant.url} target="_blank">Website</a>
      <div class="restaurant-tele">Telephone: ${restaurant.phone_numbers}</div>
    </div>`;

  return liDOM;
};

// Render 3 cards to DOM
var make3Cards = function (restaurants, index) {
  for (; index < numberOfCards; index++) {
    var rest = restaurants[index].restaurant;
    restaurantDisplay.appendChild(makeCardDOM(rest));
  }
  numberOfCards += 3;
  return index; // return index after making card
};

/**
 * Function to make display more button display the next 3 from localStorage
 */

displayMoreRestaurants.addEventListener("click", function () {
  var localRestaurants = JSON.parse(window.localStorage.getItem("restaurants"));
  var localIndex = parseInt(window.localStorage.getItem('index'));

  localIndex = make3Cards(localRestaurants, localIndex);
  window.localStorage.setItem('index', localIndex);
});

// Function for actual fetches
var getRestaurants = function () {
  fetch(`https://developers.zomato.com/api/v2.1/cuisines?lat=${obj.lat}&lon=${obj.lon}`,
    {
      headers: {
        "user-key": userKeyZomato,
        "content-type": "application/json"
      }
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("Please enter a valid zip code.");
      }
    })
    .then(function (response) {
      var noCuisineMatch = false;
      var areaCuisineArray = [];
      for (var i = 0; i < response.cuisines.length; i++) {
        areaCuisineArray.push(response.cuisines[i].cuisine.cuisine_name);
        areaCuisineList = areaCuisineArray.join(", ");
        if (response.cuisines[i].cuisine.cuisine_name == obj.cuisines) {
          noCuisineMatch = true;
          var userCuisineID = response.cuisines[i].cuisine.cuisine_id

          fetch(`https://developers.zomato.com/api/v2.1/search?entity_type=city&count=500&lat=${obj.lat}&lon=${obj.lon}&cuisines=${userCuisineID}&sort=real_distance`,
            {
              headers: {
                "user-key": userKeyZomato,
                "content-type": "application/json"
              }
            })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              } else {
                alert("Please enter a valid zip code.");
              }
            })
            .then(function (response) {
              var index = 0;
              var restaurants = response.restaurants;
              window.localStorage.setItem('restaurants', JSON.stringify(restaurants));
              index = make3Cards(restaurants, index);
              window.localStorage.setItem('index', index);
            });
        }

      }

      if (!noCuisineMatch) {
        var modalDOM = document.createElement("div");
        restaurantDisplay.appendChild(modalDOM);
        modalDOM.innerHTML = `
                <div id="modal1" class="modal bottom-sheet">
                    <div class="modal-content">
                    <h3>There aren't any restaurants nearby for that cuisine! You can either:</h3>
                    <div class="row">
                        <div class="col s6">
                        <h4>Choose from the available cuisines in the area,</h4>
                        <ul id="button-list"></ul>
                        </div>
                        <div class="col s1">
                        <h4>or</h4>
                        </div>
                        <div class="col s5">
                        <h4 href="#!" class="modal-close"><a href="#!">Continue anyway, to view recipies for this search</a></h4>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <a href="index.html" class="modal-close waves-effect waves-green btn-flat">Go back to search menu</a>
                    </div>
                    </div>
                </div>`
        var buttonList = document.querySelector("#button-list");
        for (var j = 0; j < areaCuisineArray.length; j++) {
          var cuisineButtons = document.createElement("button");
          cuisineButtons.setAttribute(`id`, `cuisine-button-${[j]}`);
          buttonList.appendChild(cuisineButtons);

          cuisineButtons.textContent = areaCuisineArray[j];
          cuisineButtons.innerHTML = `<a href="${`indexA.html?&lat=${obj.lat}&lon=${obj.lon}&cuisines=${cuisineButtons.textContent}`}">${areaCuisineArray[j]}</a>`
        }
        var elem = document.querySelector('#modal1');
        var instance = M.Modal.init(elem);
        instance.open();

        displayMoreRestaurants.style.visibility = "hidden";
      }
    });
};

getRestaurants();