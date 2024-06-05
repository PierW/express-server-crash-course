const btnGetPosts = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');
const output = document.querySelector('#output');


// Get Posts
const getPosts = async () => {

    try {
        const res = await fetch('http://localhost:8000/api/posts');

        if(!res.ok){
            throw new Error('Problemi ad ottenere i posts')
        }
    
        const posts = await res.json();
    
        output.innerHTML = '';
        
        posts.forEach((post) => {
            const newEl = document.createElement('div');
            newEl.textContent = post.title;
            output.appendChild(newEl);
        });
    } catch (error) {
        console.log('Errore nel reperire i posts', error);
    }

}


// Insert New Post
const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })

        if(!res.ok){
            throw new Error('Problemi ad inserire il post')
        }

        const post = await res.json();
        const newEl = document.createElement('div');
        newEl.textContent = post.title;
        output.appendChild(newEl);

        getPosts();

        
    } catch (error) {
        console.log('Errore ad inserire il post', error);
    }
}



btnGetPosts.addEventListener('click', getPosts);
form.addEventListener('submit', createPost);