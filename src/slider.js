( () => {
    const prevButton = document.querySelector('.disigns-slider__button--prev');
    const nextButton = document.querySelector('.disigns-slider__button--next');

    prevButton.addEventListener('click', () => {
    const activeSlide = document.querySelector('.slider-item--active');
    const rightSlide = document.querySelector('.slider-item--right');
    const leftSlide = document.querySelector('.slider-item--left');

    rightSlide.classList.remove('slider-item--right');
    rightSlide.classList.add('slider-item--active');
    rightSlide.querySelector('.slider-item__caption').classList.remove('visually-hidden');

    activeSlide.classList.remove('slider-item--active');
    activeSlide.classList.add('slider-item--left');
    activeSlide.querySelector('.slider-item__caption').classList.add('visually-hidden');

    leftSlide.classList.remove('slider-item--left');
    leftSlide.classList.add('slider-item--right');
  });

  nextButton.addEventListener('click', () => {
    const activeSlide = document.querySelector('.slider-item--active');
    const rightSlide = document.querySelector('.slider-item--right');
    const leftSlide = document.querySelector('.slider-item--left');

    rightSlide.classList.remove('slider-item--right');
    rightSlide.classList.add('slider-item--left');

    activeSlide.classList.remove('slider-item--active');
    activeSlide.classList.add('slider-item--right');
    activeSlide.querySelector('.slider-item__caption').classList.add('visually-hidden');

    leftSlide.classList.remove('slider-item--left');
    leftSlide.classList.add('slider-item--active');
    leftSlide.querySelector('.slider-item__caption').classList.remove('visually-hidden');
  });
})();
