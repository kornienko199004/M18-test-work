const mainElement = document.querySelector('main');
const footerElement = document.querySelector('footer');
const formElement = document.querySelector('.form-wrapper');

const scrollToContentButton = document.querySelector('.button--scroll');
const scrollToFormButton = document.querySelector('.button--form-scroll');
const scrollToFooterButton = document.querySelector('.button--contacts');

const scrollFunc = (scrollY, currentPosition, stopPosition, lastCurrentPosition) => {
  console.log(lastCurrentPosition);
  console.log(currentPosition);
  if (lastCurrentPosition === currentPosition) {
    return;
  }
  if (stopPosition > currentPosition) {
    window.scrollTo(0, scrollY);
    return setTimeout(scrollFunc, 10, scrollY + 10, window.pageYOffset, stopPosition, currentPosition);
  }
  return;
};

scrollToContentButton.addEventListener('click', () => {
  scrollFunc(10, window.pageYOffset, mainElement.offsetTop);
});

scrollToFormButton.addEventListener('click', () => {
  scrollFunc(10, window.pageYOffset, formElement.offsetTop);
});

scrollToFooterButton.addEventListener('click', () => {
  scrollFunc(10, window.pageYOffset, footerElement.offsetTop);
});
console.log(footerElement.scrollHeight);
console.log(footerElement.clientHeight);
console.log(footerElement.scrollTop);
document.body.scrollTop = document.body.scrollHeight;
