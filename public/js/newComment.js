const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#commentContent').value.trim();

    if (comment) {
        const response = await fetch(`/api/posts/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            location.reload(); 
        } else {
            alert('Failed');
        }
    }
};

