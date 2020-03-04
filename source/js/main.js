(function() {
  
  // scroll

  function scroll(element) {
    let coord = element.offsetTop;
    window.scrollTo({
        top: coord,
        behavior: "smooth"
    });
  }

  // open/close feed

  let feedBtn = document.querySelector('.menu__item--feed'),
    feedBlock = document.querySelector('.feed');

  feedBtn.addEventListener('click', () => {
    feedBtn.classList.toggle('menu__item--active');
    feedBlock.classList.toggle('feed--active');
    scroll(feedBlock);
  });

  // add to bookmarks

  let events = document.querySelectorAll('.feed__item');

  events.forEach(function(item) {
    let button = item.querySelector('.feed__bookmark');

    item.addEventListener('click', function(evt) {
      evt.preventDefault();
      if (evt.target === button) {
        item.classList.toggle('feed__item--bookmark');
      }
    });
  });
}());











	



