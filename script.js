document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();
});

function fetchUsers() {
    const userDropdown = document.getElementById('userDropdown');

   
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
           users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.username;
                userDropdown.appendChild(option);
            });
           
            fetchUser(1);
        });
}

function fetchUser(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userProfile').classList.remove('hidden');
            document.getElementById('userTweets').classList.remove('hidden');
            document.getElementById('comments').classList.remove('hidden');
         
            document.getElementById('userImage').src = `https://via.placeholder.com/150/${user.id}`;
            document.getElementById('userName').textContent = user.name;
            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info');

            const userEmail = document.createElement('p');
            userEmail.textContent = `Email: ${user.email}`;

            const userAddress = document.createElement('p');
            userAddress.textContent = `Address: ${user.address.city}, ${user.address.street}, ${user.address.suite}`;

            const userPhone = document.createElement('p');
            userPhone.textContent = `Phone: ${user.phone}`;

            userInfo.appendChild(userEmail);
            userInfo.appendChild(userAddress);
            userInfo.appendChild(userPhone);

            document.getElementById('userProfile').appendChild(userInfo);

            
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                .then(response => response.json())
                .then(posts => {
                    const tweetsList = document.getElementById('tweetsList');
                    tweetsList.innerHTML = '';

                    posts.forEach(post => {
                       fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                            .then(response => response.json())
                            .then(comments => {
                                const tweetItem = document.createElement('div');
                                tweetItem.classList.add('tweet-item');

                                
                                const userImage = document.createElement('img');
                                userImage.src = `https://via.placeholder.com/50/${user.id}`;
                                userImage.alt = 'User Image';
                                tweetItem.appendChild(userImage);

                            
                                const tweetContent = document.createElement('div');
                                tweetContent.classList.add('tweet-content');

                               
                                const tweetTitle = document.createElement('div');
                                tweetTitle.classList.add('tweet-title');
                                tweetTitle.textContent = post.title;

                              
                                const tweetBody = document.createElement('div');
                                tweetBody.classList.add('tweet-body');
                                tweetBody.textContent = post.body;

                                
                                const commentsList = document.createElement('ul');
                                commentsList.classList.add('comments-list');

                                comments.forEach(comment => {
                                    const listItem = document.createElement('li');
                                    listItem.textContent = comment.body;
                                    commentsList.appendChild(listItem);
                                });

                               
                                tweetContent.appendChild(tweetTitle);
                                tweetContent.appendChild(tweetBody);
                                tweetContent.appendChild(commentsList);

                                tweetItem.appendChild(tweetContent);

                            
                                tweetsList.appendChild(tweetItem);
                            });
                    });
                });
        });
}




