# Ideation notes for fun-challenge-project

#### Actions so far:
This is a link to our class presentation deck: https://docs.google.com/presentation/d/1hizh-MGJQ0qWGwL5sby_egEBW88TXJpEA9lRpBe7ABM/edit?usp=sharing

We decided to work on a spoonacular API. This is a Spoonacular API call to get 1 recipe for pizza: https://api.spoonacular.com/recipes/complexSearch?query=pizza&number=1&apiKey=b57026cf75ef47e3a58d4bc313ecba6d
This is an example of a Spoonacular API call to get 2 recipes  for pizza with Max fat of 25: https://api.spoonacular.com/recipes/complexSearch?query=pizza&maxFat=25&number=2&apiKey=b57026cf75ef47e3a58d4bc313ecba6d

We identified an API for zip code to location information provides - latitude and longitude: Zip code provided 95030 https://www.zipcodeapi.com/API#zipToLoc
https://www.zipcodeapi.com/rest/WHbIrvL7P5lTiqGzzeTKDvU8l4jwu8S7n8LbOAbPSXy1me9RLiXKsvqA3yyE5Kke/info.json/95030/degrees
API Key = Kw3XyO3XjHqeVTrhowyUEZnz9nUaRX5lyiHa59PozklLlOy8NPjDqAlF2MVdmyEd
https://www.zipcodeapi.com/rest/Kw3XyO3XjHqeVTrhowyUEZnz9nUaRX5lyiHa59PozklLlOy8NPjDqAlF2MVdmyEd/info.json/95030/degrees
We created code to implement this@: anitapeppercorn/zipcode

We identified an API to get restaurant reccomendations given zip code provide relevat restaurant reccomendtaions
Zomato API Key = f9d0eb83eb1891a2bfa73dcec015b650
 7a83a888c20b468d92e6cc5f7be5abf7
 we tested and were able to search for a restaurant with the keyword (pizza) after you provide lat and long example: https://developers.zomato.com/api/v2.1/search?q=pizza&count=1&lat=37.2&lon=-121.9
 curl -X GET --header "Accept: application/json" --header "user-key: f9d0eb83eb1891a2bfa73dcec015b650" "https://developers.zomato.com/api/v2.1/search?q=pizza&count=1&lat=37.2&lon=-121.9"

#### When we met on 6/29/20 as a team
Priya suggested Materialize:  Instead of Bootstrap
Anita to create a shared drive fir discussing ideas - Done
Priya abd Scot et up github location to invite all as contributors 
We looked up API’s: Zipcode, Zomato and Materialize 
Anita Created a wireframe 
We wrote pseudocode code to implenet our idea
We wrote the first draft of our User Story and acceptance criteria


User Story and  Acceptance  Criteria:
#### User Story: 
Given a User who is Hungry they open the App to share their food of interest and their location with a zipcode. 
Once they share their information; they would like to see  recipes and a suggested restaurants, based on which they can decide which way they would like to go. That is whether to cook or go to a restaurant. 

#### Acceptance Criteria:
The user has an idea about what they want to eat./Option is name of a dish or ingredient
The user also provides information of their zip code
In response they get a card with recipes of their choice and a card with the restaurant reccomendations neraby
If they choose to cook: they click on recipe: This takes them to an external page which has the recipe details.
If they choose to eat at the suggested restaurant: they click on the restaurant: Here they see the restaurant details.

Priya’s suggestion for the work:
my suggestion is going with something simple - search for a recipe given some keywords https://spoonacular.com/food-api
i quickly went over the API docs and this works
Just to expand on my previous idea - We could build an app for dining in and out. 
1. for dine in, 
- user will provide a list of ingredients and the number of recipes they want.
- based on user input, we will display possible recipes
- API endpoint https://spoonacular.com/food-api
2. for dine out, 
-user will provide the current city, type of cuisine, and the distance they are willing to travel
- based on user input, we will display a list of restaurants 
- API endpoint https://developers.zomato.com/api
