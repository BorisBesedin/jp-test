(function() {
    let slideIndex = 1,
        slider = document.querySelector('.slider'),
		slides = document.querySelectorAll('.slider__item'),
        dots = document.querySelectorAll('.slider__dot'),
        touchBorder = 140;

	function showSlide(n) {
		slides.forEach((item) => item.classList.remove('slider__item--active'));
        dots.forEach((item) => item.classList.remove('slider__dot--active'));
        
		slides[slideIndex - 1].classList.add('slider__item--active');
		dots[slideIndex - 1].classList.add('slider__dot--active');
	}

	function plusSlide(n) {
        showSlide(slideIndex += n);
        slides.forEach((item) => item.style.animation = "none");
	}

	function currentSlide(n) {
		showSlide(slideIndex = n);
	}

	showSlide(slideIndex);

    slider.addEventListener('touchstart', function(evt) {
        let startCoords = evt.targetTouches[0].clientX;
      
        function onTouchMove(moveEvt) {
            let slide = slider.querySelector('.slider__item--active'),
                shift = startCoords - moveEvt.targetTouches[0].clientX;

            slide.classList.add('slider__item--touch');
            startCoords = moveEvt.targetTouches[0].clientX;
            slide.style.left = (slide.offsetLeft - shift) + 'px';

            if (slide.offsetLeft < -touchBorder && slideIndex < slides.length) {
                plusSlide(1);            
                slides[slideIndex - 1].style.animation = "move-to-left 0.3s";
                onTouchEnd();
            }

            if (slide.offsetLeft > touchBorder && slideIndex > 1) {
                plusSlide(-1);            
                slides[slideIndex - 1].style.animation = "move-to-right 0.3s";
                onTouchEnd();
            }
        }

        function onTouchEnd(upEvt) {  
            let slide = slider.querySelector('.slider__item--active'); 

            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);

            slide.style.left = 0 + 'px';
            slide.classList.remove('slider__item--touch');
        }

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    });
}());