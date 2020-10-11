var userKeySpoon = "b5e59112c87d42bb81a57a4b4431b76e";
let displayMore = document.querySelector('#display-more > button');
var displayMoreRecipes = document.querySelector('#display-more-recipes');

var numberOfRecipeCards = 3;

var displayRecipeEl = document.querySelector("#recipe-display");

function displayRecipes(recipeTitle, recipeImg, recipeLink) {
  var recipeLi = document.createElement('li');
  recipeLi.setAttribute("id", recipeTitle);
  recipeLi.innerHTML = `
        <div class="collapsible-header">${recipeTitle}</div>
        <div class="collapsible-body">
            <a href = "${recipeLink}" target="_blank"><img src = "${recipeImg}" style="height: 120px; width: 120px;"></a>  
            </div>
        </div>`;
  var recipeContainerAccordion = document.querySelector("#recipe-container");
  recipeContainerAccordion.appendChild(recipeLi);
};

// take repos to get Id of from results
function getID(recipeId) {
  fetch(`https://api.spoonacular.com/recipes/`
    + `${recipeId}/information?includeNutrition=false&apiKey=${userKeySpoon}`)
    .then(function (idResponse) {
      if (idResponse.ok) {
        idResponse.json().then(function (recipeInfo) {
          var recipeTitle = recipeInfo.title;
          var recipeImg = recipeInfo.image;
          var recipeLink = recipeInfo.sourceUrl;
          displayRecipes(recipeTitle, recipeImg, recipeLink);
        })
      }
    })
};

displayMoreRecipes.addEventListener('click', function (event) {
  let recipes = JSON.parse(window.localStorage.getItem('recipes'));
  let index = parseInt(window.localStorage.getItem('index'));
  if (index < recipes.length) {
    for (i = 0; i < 3; i++) {
      let ids = recipes[index + i];
      getID(ids);
    }
    index += 3
    window.localStorage.setItem('index', index)
  } else {
    userAlert("There are no more results.");
  }
});

// fetch spoonacular for JSON data using user inputs
function getRecipeRepos(dishName) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=`
    + `${dishName}&number=9&instructionsRequired=true&apiKey=${userKeySpoon}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var resultsObject = data.results;
          let ids = [];
          let index = 0;
          // loop through data object to get ids and put into array
          for (let i = 0; i < resultsObject.length; i++) {
            let id = resultsObject[i].id;
            ids.push(id);
          }
          // loop through the array ids to display recipes
          for (; index < numberOfRecipeCards; index++) {
            let id = ids[index];
            getID(id);
          }
          numberOfRecipeCards += 3;
          window.localStorage.setItem('recipes', JSON.stringify(ids));
          window.localStorage.setItem('index', index);
        })
      } else {
        userAlert("Error: " + response.statusText);
      }
    })
};
getRecipeRepos(obj.cuisines);

// capture user input from submit event
function submitHandler(event) {
  event.preventDefault();
  // get value from input element

  if (userCuisineName) {
    dishNameInputEl.value = "";
    // go to fetch data from spoonacular API
    getRecipeRepos(userCuisineName);
  } else {
    userAlert("Please enter a valid dish name.");
  }
};

var allAccordions = document.querySelectorAll('.collapsible'); // finds all accordions by only collapsible class more general than collapsible AND expandable
var instance = M.Collapsible.init(allAccordions, {
  accordion: false
});

//M.toast({html: 'Craving some Sushi?'})      