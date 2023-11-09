const usernameField = document.querySelector('#usernameField');
const feedbackArea = document.querySelector('.invalid-feedback');
const emailField = document.querySelector('#emailField');
const emailFeedbackArea = document.querySelector('.emailFeedbackArea');
const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput');

emailField.addEventListener('keyup', (e) => {
  console.log("test email");
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
          emailField.classList.add('is-invalid');
          feedbackArea.style.display = "block";
          emailFeedbackArea.innerHTML = `<p>${data.email_error}</p>`;
        }
      });
  }
});

usernameField.addEventListener('keyup', (e) => {
  console.log("test function");
  const usernameValue = e.target.value;

  usernameField.classList.remove('is-invalid');
  feedbackArea.style.display = "none";

  if (usernameValue.length > 0) {
    fetch('/authentication/validate-username', {
      body: JSON.stringify({ username: usernameValue }),
      method: "POST",

    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        usernameSuccessOutput.style.display = "none";
        if (data.username_error) {
          usernameField.classList.add('is-invalid');
          feedbackArea.style.display = "block";
          feedbackArea.innerHTML = `<p>${data.username_error}</p>`;
        }
      });
  }
});
