var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPasswrod');
var loginButton = document.querySelector('.loginButton');
var signUpButton = document.querySelector('.signUpButton');
var currentUserName = '';
var usersContainer;

if (localStorage.getItem('allUsers') == null) {
    usersContainer = [];
}
else {
    usersContainer = JSON.parse(localStorage.getItem('allUsers'));
}

function clearForm() {
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
}

function nameValidation() {
    var nameRegx = /^\w/;
    if (nameRegx.test(userName.value)) {
        return true;
    }
    else {
        return false;
    }
}

function emailValidation() {
    var emailRegx = /^.{1,}(@)[a-z]{1,}(.com)$/;
    if (emailRegx.test(userEmail.value)) {
        return true;
    }
    else {
        return false;
    }
}

function passwordValidation() {
    var passwordRegx = /^.{8,16}/
    if (passwordRegx.test(userPassword.value)) {
        return true;
    }
    else {
        return false;
    }
}

function checkDuplicatedEmails() {
    if (usersContainer.length == 0) {
        return true;
    }
    else {
        for (var i = 0; i < usersContainer.length; i++) {
            if (usersContainer[i].email == userEmail.value) {
                return false;
            }
            else {
                return true;
            }
        }
    }

}

if (signUpButton != null) {
    signUpButton.addEventListener('click', function () {
        if (nameValidation() && emailValidation() && passwordValidation() && checkDuplicatedEmails()) {
            var user = {
                uName: userName.value,
                email: userEmail.value,
                userPassword: userPassword.value
            }
            usersContainer.push(user);
            localStorage.setItem('allUsers', JSON.stringify(usersContainer))
            alert('Congratulations, Your signing up has been completed!')
            clearForm();
        }
        else if (!nameValidation()) {
            alert('Please enter valid name which contains numbers, characters or (_) only')
        }
        else if (!emailValidation()) {
            alert('Please enter valid email which is in the form of example@example.com')
        }
        else if (!passwordValidation()) {
            alert('Please enter valid password which contains of at least 8 digits')
        }
        else if (!checkDuplicatedEmails()) {
            alert('This email is already exist!')
        }

    })
}

function checkUserData() {
    var result;
    for (var i = 0; i < usersContainer.length; i++) {
        if (usersContainer[i].email == userEmail.value && usersContainer[i].userPassword == userPassword.value) {
            currentUserName = usersContainer[i].uName;
            sessionStorage.setItem('currentUser', currentUserName)
            result = 1;
            break;
        }
        else {
            result =0 ;
        }
    }
    return result;

}

if (loginButton != null) {
    loginButton.addEventListener('click', function () {
        if (checkUserData() == 0) {
            alert('Incorrect email or password!')
        }
        else {
            window.location.replace("welcome.html");
        }
    })
}

if (document.getElementById('sentence') != null) {
    var current = sessionStorage.getItem('currentUser');
    document.getElementById('sentence').innerHTML = `welcome ${current}`
}

