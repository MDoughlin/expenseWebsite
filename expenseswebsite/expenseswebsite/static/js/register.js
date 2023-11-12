const usernameField = document.querySelector('#usernameField');
const feedbackArea = document.querySelector('.invalid-feedback');
const emailField = document.querySelector('#emailField');
const emailFeedbackArea = document.querySelector('.emailFeedbackArea');
const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput');
const showPasswordToggle = document.querySelector('.showPasswordToggle');
const passwordField = document.querySelector('#passwordField');
const submitBtn = document.querySelector('.submit-btn');

const handleToggleInput = (e) => {
  if (showPasswordToggle.textContent === "SHOW") {
    showPasswordToggle.textContent = "HIDE";
    passwordField.setAttribute("type", "text");
  } else {
    showPasswordToggle.textContent = "SHOW";
    passwordField.setAttribute("type", "password");
  }
};

showPasswordToggle.addEventListener('click', handleToggleInput);

emailField.addEventListener('keyup', (e) => {
  const emailValue = e.target.value;

  emailField.classList.remove('is-invalid');
  emailFeedbackArea.style.display = "none";

  if (emailValue.length > 0) {
    fetch('/authentication/validate-email', {
      body: JSON.stringify({ email: emailValue }),
      method: "POST",

    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        // emailSuccessOutput.style.display = "none";
        if (data.email_error) {
          submitBtn.disabled = true;
          emailField.classList.add('is-invalid');
          feedbackArea.style.display = "block";
          emailFeedbackArea.innerHTML = `<p>${data.email_error}</p>`;
        } else {
          submitBtn.removeAttribute('disabled');
        }
      });
  }
});

usernameField.addEventListener('keyup', (e) => {
  const usernameValue = e.target.value;

  usernameSuccessOutput.style.display = "block";
  usernameSuccessOutput.textContent = `Checking ${usernameValue}`;

  usernameField.classList.remove('is-invalid');
  feedbackArea.style.display = "none";

  if (usernameValue.length > 0) {
    fetch('/authentication/validate-username', {
      body: JSON.stringify({ username: usernameValue }),
      method: "POST",

    })
      .then((res) => res.json())
      .then((data) => {
        usernameSuccessOutput.style.display = "none";
        if (data.username_error) {
          usernameField.classList.add('is-invalid');
          feedbackArea.style.display = "block";
          feedbackArea.innerHTML = `<p>${data.username_error}</p>`;
          submitBtn.disabled = true;
        } else {
          submitBtn.removeAttribute('disabled');
        }
      });
  }
});
