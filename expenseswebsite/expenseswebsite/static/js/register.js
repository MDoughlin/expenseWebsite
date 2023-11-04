const usernameField = document.querySelector('#usernameField');
const feedbackField = document.querySelector('.invalid-feedback');


usernameField.addEventListener('keyup', (e) => {
  console.log("test function");
  const usernameValue = e.target.value;

  usernameField.classList.remove('is-invalid');
  feedbackField.style.display = "none";

  if (usernameValue.length > 0) {
    fetch('/authentication/validate-username', {
      body: JSON.stringify({ username: usernameValue }),
      method: "POST",

    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        if (data.username_error) {
          usernameField.classList.add('is-invalid');
          feedbackField.style.display = "block";
          feedbackField.innerHTML = `<p>${data.username_error}</p>`;
        }
      });
  }
});
