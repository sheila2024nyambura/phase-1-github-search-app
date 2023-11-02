document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value;
  
      searchUsers(searchTerm)
        .then((users) => {
          displayUsers(users);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  
    function searchUsers(searchTerm) {
      return fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => data.items) // Extract user data from the response
        .catch((error) => {
          console.error('Error while searching users:', error);
          throw error;
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
  
      users.forEach((user) => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}' />
          <a href='${user.html_url}' target='_blank'>${user.login}</a>
        `;
        userList.appendChild(userItem);
  
        userItem.addEventListener('click', function () {
          const username = user.login;
          getRepos(username)
            .then((repos) => {
              displayRepos(repos);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        });
      });
    }
  
    function getRepos(username) {
      return fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error('Error while fetching user repositories:', error);
          throw error;
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      repos.forEach((repo) => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
          <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  
  