"use strict";
// Lets create a site for dog lovers using this API: https://dog.ceo/api/breeds/image/random

// Get the list of all breeds from https://dog.ceo/api/breeds/list/all
// Display a random image of a breed from the list https://dog.ceo/api/breed/[BREEDNAME]/images/random
// Display the name of the breed under the image

// Part 1: Get a random dog image and display it in the browser

// fetching JSON data
function fetchJsonData(url) {
  return fetch(url).then((response) => response.json());
}

function getFormDataAsObject(formElement) {
  const formData = new FormData(formElement);

  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}
// function dogImage() {
//   const url = 'https://dog.ceo/api/breeds/image/random';

//   fetchJsonData(url).then((data) => {
//     console.log('response', data);
//     renderOutput(data);
//   });
// }

// dog breed dropdown
function fetchAndUpdateBreedNames() {
  const url = "https://dog.ceo/api/breeds/list/all";

  fetchJsonData(url).then((data) => {
    console.log("response", data);

    const breeds = Object.keys(data.message);
    for (const name of breeds) {
      const select = document.querySelector(".dog-breed");
      select.add(new Option(name));
      // let element = document.createElement('option');
      // select.appendChild(element);
      // element.innerHTML = name;
      // element.value = name;
    }

    // const breed = breeds[Math.floor(Math.random() * breeds.length)];

    console.log(breeds);
  });
}
fetchAndUpdateBreedNames();

// showing dog image
function fetchAndShowDogImage(breedName) {
  console.log(breedName);
  const url = "https://dog.ceo/api/breed/" + breedName + "/images/random";

  fetchJsonData(url).then((data) => {
    console.log("response", data);

    const output = document.querySelector("#output");
    output.innerHTML = `<div>
    <img src="${data.message}" alt="random dog image is here"/>
    <p>${breedName.toUpperCase()}</p>
    </div>`;
  });
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = getFormDataAsObject(form);
  const breedName = formData.breedName;
  const autoRefresh = formData.autoRefresh !== undefined;

  // console.log(breedName, autoRefresh);

  showDogImage(breedName, autoRefresh);
});

let intervalId = null;
function showDogImage(breedName, autoRefresh) {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (!autoRefresh) {
    fetchAndShowDogImage(breedName);
  } else {
    intervalId = setInterval(() => fetchAndShowDogImage(breedName), 2000);
  }
}