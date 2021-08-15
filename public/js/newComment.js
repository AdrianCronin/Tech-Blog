const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#commentBox').value.trim();
    const post_id = document.querySelector('#commentBox').dataset.post_id;

    if (comment) {
        const response = await fetch(`/api/posts/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment, post_id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            location.reload();
        } else {
            console.log(`${comment} and ${post_id}`);
        }
    }
};

document.querySelector('#commentForm').addEventListener('submit', commentFormHandler);