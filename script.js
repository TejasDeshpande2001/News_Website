let currentQuery = "India";
let currentPage = 1;

const fetchNews = async (page, q) => {
  try {
    document.querySelector(".spinner-border").style.display = "block"; // Show spinner
    console.log(`Fetching news for ${q}, page no ${page}...`);
    const url = `https://newsapi.org/v2/everything?q=${q}&from=2024-08-21&pageSize=20&language=en&page=${page}&sortBy=popularity&apiKey=8063bf03b3394784bad4d7037018d2fe`;

    const response = await fetch(url);
    const data = await response.json();

    document.querySelector(".spinner-border").style.display = "none"; // Hide spinner

    if (data.status === "error") {
      alert("An error occurred while fetching news. Please try again later.");
      return;
    }

    document.getElementById("resultCount").textContent = data.totalResults;

    let content = "";
    for (let item of data.articles) {
      content += `
        <div class="card mx-auto my-2" style="width: 18rem;">
         <img height="150" width="200" src="${item.urlToImage}" class="card-img-top" alt="${item.title.slice(0, 20)}..."
       onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1576158113928-4c240eaaf360?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';">
     
          <div class="card-body">
            <h5 class="card-title">${item.title.slice(0, 23)}...</h5>
            <p class="card-text">${item.description ? item.description.slice(0, 123) : "No description available"}...</p>
            <a href="${item.url}" target="_blank" class="btn btn-primary">Read Article</a>
          </div>
        </div>`;
    }

    document.querySelector(".content").innerHTML = content;
  } catch (error) {
    document.querySelector(".spinner-border").style.display = "none"; // Hide spinner
    alert("An error occurred while fetching news. Please check your network connection and try again.");
    console.error("Error fetching news:", error);
  }
};

fetchNews(1, currentQuery);

document.getElementById("search").addEventListener("click", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  currentQuery = query;
  currentPage = 1; // Reset to page 1 for new search
  fetchNews(currentPage, query);
});

document.getElementById("prev").addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    fetchNews(currentPage, currentQuery);
  }
});

document.getElementById("next").addEventListener("click", (e) => {
  e.preventDefault();
  currentPage++;
  fetchNews(currentPage, currentQuery);
});

document.getElementById("hollywoodLink").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "hollywood";
  currentPage = 1; // Reset to page 1 when Home is clicked
  fetchNews(currentPage, currentQuery);
});

document.getElementById("weatherLink").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "weather";
  currentPage = 1; // Reset to page 1 when Home is clicked
  fetchNews(currentPage, currentQuery);
});

document.getElementById("sportLink").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "sport";
  currentPage = 1; // Reset to page 1 when Home is clicked
  fetchNews(currentPage, currentQuery);
});

document.getElementById("techLink").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "tech";
  currentPage = 1; // Reset to page 1 when Home is clicked
  fetchNews(currentPage, currentQuery);
});
