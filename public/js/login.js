const loginFormHandler = async (event) => {
    event.preventDefault();

    // collect login details
    const username = document.querySelector('#userLogin').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if (username && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Successful login");
        };

    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
