var zipAPIKey = "DKAL53OVWYNIRCSEKZZM";
var searchButton = document.querySelector("#search-button");

// for alert modal
var modalAlertCard = document.querySelector("#modal-display");

// creates modal to alert issues to user
function userAlert(message) {
  var modalAlertDOM = document.createElement("div");
  modalAlertCard.appendChild(modalAlertDOM);
  modalAlertDOM.innerHTML = `
    <div id="modal2" class="modal bottom-sheet">
      <div class="modal-content">
        <h5>${message}</h5>
      </div>
        <div class="modal-footer">
          <a href="index.html" class="modal-close waves-effect waves-green btn-flat">Got it.</a>
        </div>
      </div>
    </div>`
  var elem = document.querySelector('#modal2');
  var instance = M.Modal.init(elem);
  instance.open();
};

// at onClick of Search button collect information for local storage
searchButton.addEventListener("click", function () {
  var userCuisineName = document.querySelector("#user-food-input").value
  var userZipInput = document.querySelector("#user-zipcode-input").value
  if (userCuisineName && userZipInput) {
    fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/${userZipInput}?key=${zipAPIKey}`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          userAlert("It seems like your search has no match. Try again!");
        }
      })
      .then(function (response) {
        zipToLat = response.Latitude.toFixed(1);
        zipToLon = response.Longitude.toFixed(1);
        window.location.href = `indexA.html?&lat=${zipToLat}&lon=${zipToLon}&cuisines=${userCuisineName}`
      })
      .catch(err => {
        userAlert("Please enter a valid zip code.");
      });
  } else {
    userAlert("Please enter what food you're craving for and what zip code you're in.");
  }

  //save searches to localStorage, prep for Toast
  window.localStorage.setItem('lastFoodSearch', userCuisineName);
  window.localStorage.setItem('lastZipSearch', userZipInput);
});

////////////////////////////TOAST//////////////////////////////
function toastSuggestion() {
  // getItem from localStorage
  var lastFood = window.localStorage.getItem("lastFoodSearch");
  // if previous search exists, show Toast
  if (lastFood) {
    M.toast({
      html: `Craving ${lastFood} again? <button type="click" id="re-enter-search" class="btn-flat toast-action">Click Here</button>`,
      classes: 'rounded '
    })
    var reEnterSearch = document.querySelector("#re-enter-search");
    reEnterSearch.addEventListener("click", function () {
      // get zip code and parse
      var lastZip = parseInt(window.localStorage.getItem("lastZipSearch"));
      fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/${lastZip}?key=${zipAPIKey}`)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            userAlert("It seems like your search has no match. Try again!");
          }
        })
        .then(function (response) {
          zipToLat = response.Latitude.toFixed(1);
          zipToLon = response.Longitude.toFixed(1);
          window.location.href = `indexA.html?&lat=${zipToLat}&lon=${zipToLon}&cuisines=${lastFood}`
        })
        .catch(err => {
          userAlert("Please enter a valid zip code.");
        });
    });
  }
};

// call function to show Toast at load
toastSuggestion();

//////////////////////////// Geolocation button /////////////////////////////
document.getElementById("geolocate").addEventListener('click', function (event) {
  event.preventDefault();
  // gets IP of the user
  $.getJSON('http://ip-api.com/json?callback=?', function (data) {
    var geoZip = JSON.stringify(data.zip);
    var zipDisplay = document.getElementById('user-zipcode-input');
    // puts string into text input, with '' removed
    zipDisplay.value += geoZip.replace(/^"(.*)"$/, '$1');
  });
});