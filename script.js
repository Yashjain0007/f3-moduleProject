const apikey = "8ewcHSq0dJXHR5SI7ZyfZMrIQfhsm0g0BJhfatXR";

function getCurrentImageOfTheDay() {
  let currentDate = new Date().toISOString().slice(0, 10);

  fetch(
    `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apikey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let currentImage = document.getElementById("current-image-container");
      currentImage.innerHTML = `

        <h1>NASA Picture of the Day</h1>
        <img class="current-img" src=${data.hdurl} alt="image">
        <h2>${data.title}</h2   >
        <p>${data.explanation}</p>
        `;
    })
    .catch((error) => console.log(error));
}

function getImageOfTheDay(selectedDate) {
  fetch(
    `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apikey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let currentImage = document.getElementById("current-image-container");
      currentImage.innerHTML = `
      <h1>NASA Picture of the Day</h1>
      <img class="current-img" src=${data.hdurl} alt="image">
      <h2>${data.title}</h2>
      <p>${data.explanation}</p>
      `;
      saveSearch(selectedDate);
      addSearchToHistory(selectedDate);
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveSearch(date) {
  let saveHistory = JSON.parse(localStorage.getItem("saveHistory")) || [];
  saveHistory.push(date);
  localStorage.setItem(saveHistory, JSON.stringify(saveSearch));
}

function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = "javascript:void(0)";
  link.textContent = date;
  link.addEventListener("click", function () {
    getImageOfTheDay(date);
  });
  li.appendChild(link);
  searchHistory.appendChild(li);
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    const currentDate = new Date().toISOString().split("T")[0];

    if (selectedDate > currentDate) {
      alert("Invalid Selection");
      return;
    }

    getImageOfTheDay(selectedDate);
  });

getCurrentImageOfTheDay();
