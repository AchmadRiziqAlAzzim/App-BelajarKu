// SHOW PASS
function showPass() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
            
    if (password.type === "password") {
      password.type = "text";
      eyeIcon.classList.remove("bx-eye");
      eyeIcon.classList.add("bx-eye-slash");
    } else {
      password.type = "password";
      eyeIcon.classList.remove("bx-eye-slash");
      eyeIcon.classList.add("bx-eye");
    }
};