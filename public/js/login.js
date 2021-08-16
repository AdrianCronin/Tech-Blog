const loginFormHandler = async (event) => {
    event.preventDefault();

    // collect login credentials
    const username = document.querySelector('#userLogin').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if (username && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Incorrect username or password');
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
