document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const errorContainer = document.querySelector('.error-container');
    const searchIcon = document.getElementById('searchIcon');
    const searchWindow = document.getElementById('searchWindow');
    const searchKeyword = document.getElementById('searchKeyword');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchResultsContainer = document.getElementById('searchResultsContainer');

    // Define navigation items
    const navItems = [
        { Name: "Home", Description: "Return to the main page" },
        { Name: "About", Description: "Learn more about our company" },
        { Name: "Careers", Description: "View job opportunities" },
        { Name: "Contacts", Description: "Get in touch with us" }
    ];

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
        const filteredItems = navItems.filter(item =>
            item.Name.toLowerCase().includes(keyword) ||
            item.Description.toLowerCase().includes(keyword)
        );

        searchResultsContainer.innerHTML = filteredItems.map(item => `
            <div class="search-window-container">
                <div class="search-window-title">
                    <a href="#${item.Name.toLowerCase()}">${item.Name}</a>
                </div>
                <div class="search-window-content">${item.Description}</div>
            </div>
        `).join('');
    }

    errorContainer.addEventListener('mousemove', showSearchIcon);
    errorContainer.addEventListener('mouseleave', hideSearchIcon);
    errorContainer.addEventListener('click', showSearchBar);

    closeSearchBtn.addEventListener('click', hideSearchBar);
    searchResultsContainer.addEventListener('scroll', searchWindowScroll);
    searchKeyword.addEventListener('input', updateSearchResults);

    // Initial population of search results
    updateSearchResults();
});