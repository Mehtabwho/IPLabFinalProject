
let apiKey = "ksWRwJDTE2DIfYzrPG09GIaQZG7Db9lL"; // Replace with your actual API key
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "us";
const options = [
  "home",
  "world",
  "politics",
  "business",
  "technology",
  "science",
  "health",
  "sports",
  "fashion",
  "food",
];
let requestURL;

const generateUI = (articles) => {
  container.innerHTML = ""; // Clear previous articles
  articles.forEach(item => {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.multimedia[0]?.url || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">${item.title}</div>
        <div class="news-description">${item.abstract}</div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  });
};

const getNews = async () => {
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = await response.json();
    generateUI(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Failed to fetch data. Please try again later.");
  }
};

const selectCategory = (category) => {
  requestURL = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`;
  getNews();
};

const createOptions = () => {
  optionsContainer.innerHTML = "";
  options.forEach(category => {
    optionsContainer.innerHTML += `<button class="option" onclick="selectCategory('${category}')">${category}</button>`;
  });
};

window.onload = () => {
  createOptions();
  selectCategory("home"); // Initial category selection
};
