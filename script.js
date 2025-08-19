// Elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");
const themeToggler = document.getElementById("theme-toggler");
const clearBtn = document.getElementById("clear-btn");

// Auto-expand search input & Clear button fade
const span = document.createElement('span');
span.style.visibility = 'hidden';
span.style.whiteSpace = 'pre';
span.style.font = window.getComputedStyle(searchInput).font;
document.body.appendChild(span);

searchInput.addEventListener('input', () => {
  span.textContent = searchInput.value || searchInput.placeholder;
  const newWidth = Math.min(span.offsetWidth + 20, searchInput.parentElement.offsetWidth - 20);
  searchInput.style.width = newWidth + 'px';

  // Fade in/out Clear button
  if (searchInput.value.length > 0) {
    clearBtn.classList.add('show');
  } else {
    clearBtn.classList.remove('show');
  }
});

// Wikipedia search
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  searchResult.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`
    );
    const data = await response.json();
    const results = data.query.search;

    if (results.length === 0) {
      searchResult.innerHTML = "<p>No results found.</p>";
      return;
    }

    searchResult.innerHTML = results
      .map(
        (item) => `
      <div class="result-item">
        <h3>${item.title}</h3>
        <p>${item.snippet}...</p>
        <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}" target="_blank">Read more</a>
      </div>
    `
      )
      .join("");
  } catch (error) {
    searchResult.innerHTML = "<p>Error fetching results.</p>";
    console.error(error);
  }
});

// Clear button functionality
clearBtn.addEventListener("click", () => {
  searchInput.value = "";             // Clear input
  searchResult.innerHTML = "";        // Clear results
  searchInput.style.width = "150px";  // Reset width
  clearBtn.classList.remove('show');  // Fade out
});

// Theme toggle
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggler.textContent = document.body.classList.contains("dark-mode")
    ? "Dark Mode"
    : "Light Mode";
});
