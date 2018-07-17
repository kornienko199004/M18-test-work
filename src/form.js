( () => {
  const formElement = document.querySelector('.write-us');

  formElement.querySelectorAll('label').forEach(element => {
    const inputElement = element.querySelector('input');
    inputElement.addEventListener('focus', () => {
      const caption = inputElement.previousElementSibling;
      if (caption.classList.contains('visually-hidden')) {
        caption.classList.remove('visually-hidden');
      }

      inputElement.addEventListener('blur', () => {
        if (inputElement.value === '') {
          caption.classList.add('visually-hidden');
        }
      })
    })
  });

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Форма ушла');
    const modalForm = formElement.querySelector('.write-us__modal--form');
    modalForm.style.display = 'none';
    const modalSubmit = formElement.querySelector('.write-us__modal--submit');
    modalSubmit.style.display = 'block';
  });
})();
