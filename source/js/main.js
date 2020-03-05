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
}());











	



