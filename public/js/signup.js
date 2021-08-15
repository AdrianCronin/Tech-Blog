const signupFormHandler = async (event) => {
    event.preventDefault();

    // collect credentials
    const username = document.querySelector('#userSignup').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    if (username && password) {
        const response = await fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);