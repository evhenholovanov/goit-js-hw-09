const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// Відновлення даних зі сховища після завантаження сторінки
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Помилка читання localStorage:', error);
    }
  }
}

populateForm();

// Делегування події input на формі
form.addEventListener('input', event => {
  const fieldName = event.target.name;

  if (fieldName in formData) {
    formData[fieldName] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// Обробка відправлення форми (submit)
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка на заповненість обох полів
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Вивід у консоль
  console.log(formData);

  // Очищення сховища, форми та об'єкта стану
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
});
