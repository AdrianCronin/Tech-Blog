const newPostButtonHandler = async (event) => {
    document.location.replace('/new');
};

document.querySelector('#newPostBtn').addEventListener('click', newPostButtonHandler);