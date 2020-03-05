(function() {
    let feedItems = document.querySelectorAll('.feed__item'),
        touchBorder = 250;

    feedItems.forEach(function(item) {
        item.addEventListener('touchstart', function(evt) {
            let startCoords = evt.targetTouches[0].clientX;

            item.classList.remove('feed__item--untouch');
          
            function onTouchMove(moveEvt) {
                let shift = startCoords - moveEvt.targetTouches[0].clientX;

                startCoords = moveEvt.targetTouches[0].clientX;

                if (shift < 0) {
                    item.style.left = (item.offsetLeft - shift) + 'px';

                    if (item.offsetLeft > touchBorder) {
                        onTouchEnd();
                        item.classList.toggle('feed__item--bookmark');
                    }   
                }
            }
    
            function onTouchEnd(upEvt) {
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
    
                item.classList.add('feed__item--untouch');
                item.style.left = 0 + 'px';                
            }
    
            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', onTouchEnd);
        });
    });    
}());