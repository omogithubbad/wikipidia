// Select elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");
const themeToggler = document.getElementById("theme-toggler");
const clearBtn = document.getElementById("clear-btn");

// Function to display results
function appendResults(results) {
  searchResult.innerHTML = results.map(
    (result, index) => `
      <div class="result-item" style="animation-delay: ${index * 0.1}s;">
        <h2 class="result-title">${result.title}</h2>
        <a 
          href="https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}" 
          class="result-link" target="_blank">
          Read more
        </a>
        <p class="result-snippet">${result.snippet}...</p>
      </div>
    `
  ).join("");

  clearBtn.style.display = "inline-block";
}

// Handle Wikipedia search
searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    searchResult.innerHTML = "<p>Please enter a search term.</p>";
    clearBtn.style.display = "none";
    return;
  }

  // Show spinner
  searchResult.innerHTML = '<div class="spinner"></div>';
  clearBtn.style.display = "none";

  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query
  )}&utf8=&format=json&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.query.search;

    if (results.length === 0) {
      searchResult.innerHTML = "<p>No results found.</p>";
      clearBtn.style.display = "none";
      return;
    }

    appendResults(results);
  } catch (error) {
    searchResult.innerHTML = "<p>⚠️ Error fetching results. Try again.</p>";
    clearBtn.style.display = "none";
    console.error("Error:", error);
  }
});

// Theme toggle
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggler.textContent = document.body.classList.contains("dark-theme")
    ? "Dark Mode"
    : "Light Mode";
});

// Clear button
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchResult.innerHTML = "";
  clearBtn.style.display = "none";
});
