document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const errorContainer = document.querySelector('.error-container');
    const searchIcon = document.getElementById('searchIcon');
    const searchWindow = document.getElementById('searchWindow');
    const searchKeyword = document.getElementById('searchKeyword');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchResultsContainer = document.getElementById('searchResultsContainer');

    let searchData = [];

    function showSearchIcon(evt) {
        if (searchWindow.style.opacity !== '1') {
            searchIcon.style.opacity = '1';
            moveSearchIcon(evt.clientX, evt.clientY);
        }
    }

    function hideSearchIcon() {
        searchIcon.style.opacity = '0';
    }

    function moveSearchIcon(x, y) {
        const searchHalfSize = searchIcon.clientWidth / 2;
        searchIcon.style.left = `${x - searchHalfSize}px`;
        searchIcon.style.top = `${y - searchHalfSize}px`;
    }

    function showSearchBar(evt) {
        if (searchWindow.style.opacity !== '1') {
            searchWindow.style.opacity = '1';
            searchWindow.style.pointerEvents = 'auto';
            hideSearchIcon();
            searchWindow.style.animation = 'search-window-show 512ms ease-out';
            setTimeout(() => {
                searchKeyword.focus();
            }, 600);
        }
    }

    function hideSearchBar() {
        searchWindow.style.opacity = '0';
        searchWindow.style.pointerEvents = 'none';
        searchKeyword.value = '';
        searchResultsContainer.innerHTML = '';
        searchWindow.classList.remove('search-scrolling');
    }

    function searchWindowScroll(evt) {
        searchWindow.classList.toggle('search-scrolling', evt.target.scrollTop > 0);
    }

    function updateSearchResults() {
        const keyword = searchKeyword.value.toLowerCase();
        const filteredData = searchData.filter(data =>
            data.Name.toLowerCase().includes(keyword) ||
            data.Description.toLowerCase().includes(keyword)
        );

        searchResultsContainer.innerHTML = filteredData.map(data => `
            <div class="search-window-container">
                <div class="search-window-title">
                    <a href="#">${data.Name}</a>
                </div>
                <div class="search-window-content">${data.Description}</div>
            </div>
        `).join('');
    }

    errorContainer.addEventListener('mousemove', showSearchIcon);
    errorContainer.addEventListener('mouseleave', hideSearchIcon);
    errorContainer.addEventListener('click', showSearchBar);

    closeSearchBtn.addEventListener('click', hideSearchBar);
    searchResultsContainer.addEventListener('scroll', searchWindowScroll);
    searchKeyword.addEventListener('input', updateSearchResults);

    // Fetch search data
    fetch("https://assets.codepen.io/430361/animal_information.json", {
        cache: "no-cache"
    })
    .then(response => response.json())
    .then(data => {
        searchData = data;
    })
    .catch(error => {
        console.error('Error fetching search data:', error);
    });
});