(function() {
    let feedBtn = document.querySelector('.map-section__btn--events'),
        closeBtn = document.querySelector('.events__close'),
        events = document.querySelector('.events');

    feedBtn.addEventListener('click', () => {
        events.classList.add('events--active');
    });

    closeBtn.addEventListener('click', () => {
        events.classList.remove('events--active');
    });
}());