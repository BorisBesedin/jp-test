(function() {
    let popup = document.querySelector('.search-popup'),
        searchBtn = document.querySelector('#search-btn'),
        closeBtn = document.querySelector('.search-popup__header-back');

    searchBtn.addEventListener('click', function(evt) {
        evt.preventDefault();
        popup.classList.add('search-popup--show');
    });

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('search-popup--show');
    });
}());