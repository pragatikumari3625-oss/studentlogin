// Student Registration
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let message = document.getElementById("signupMessage");

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("students")) || [];

    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        message.style.color = "red";
        message.textContent = "Email is already registered!";
        return;
    }

    let student = {
        name: name,
        email: email,
        password: password
    };

    users.push(student);

    localStorage.setItem("students", JSON.stringify(users));

    message.style.color = "green";
    message.textContent = "Registration successful! Please login.";

    document.getElementById("signupForm").reset();
});


// Student Login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim().toLowerCase();
    let password = document.getElementById("loginPassword").value;

    let message = document.getElementById("loginMessage");

    let users = JSON.parse(localStorage.getItem("students")) || [];

    let student = users.find(user =>
        user.email === email && user.password === password
    );

    if (student) {
        message.style.color = "green";
        message.textContent = "Login successful! Welcome, " + student.name + "!";
    } else {
        message.style.color = "red";
        message.textContent = "Invalid email or password!";
    }

    document.getElementById("loginForm").reset();
});