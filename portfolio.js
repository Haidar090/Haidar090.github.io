const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = form.name.value;

  form.innerHTML = `<p>Thanks, ${name}! I'll get back to you soon.</p>`;
});