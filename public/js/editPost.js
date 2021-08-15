const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#editPostTitle').value.trim();
    const content = document.querySelector('#editPostContent').value.trim();
    const post_id = document.querySelector('#editForm').dataset.post_id;

    if (title && content) {
        const response = await fetch(`/api/posts/new`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed');
        }
    }
};

const deleteBtnHandler = async (event) => {
    const post_id = document.querySelector('#editForm').dataset.post_id;

    const response = await fetch(`/api/posts/delete/${post_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed');
    }
};

document.querySelector('#editForm').addEventListener('submit', editPostFormHandler);
document.querySelector('#deletePostBtn').addEventListener('click', deleteBtnHandler);