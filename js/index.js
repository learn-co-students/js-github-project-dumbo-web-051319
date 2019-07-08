document.addEventListener('DOMContentLoaded', () => {
  const userList = document.querySelector("#user-list");
  const reposList = document.querySelector("#repos-list");
  const form = document.querySelector('form');
  const usernameRepoSearchToggle = document.querySelector("#username-repo-search-toggle");
  const resultsArray = [];
  let searchToggle = usernameRepoSearchToggle.innerText;

  form.addEventListener('submit', getResults);
  userList.addEventListener('click', addUserReposToDOM);
  usernameRepoSearchToggle.addEventListener('click', toggleSearch)

  function getResults(e) {
    e.preventDefault();
    const searchTerm = e.target.elements['search'].value;
    resultsArray.length = 0;
    if(searchToggle.split(' ')[2] === 'Username') {
      reposList.innerHTML = '';
      fetch(`https://api.github.com/search/users?q=${searchTerm}`).then(resp => resp.json()).then(addUserListToDOM);
    } else {
      userList.innerHTML = '';
      fetch(`https://api.github.com/search/repositories?q=${searchTerm}`).then(resp => resp.json()).then(addRepoListToDOM);
    }
    form.reset();
  }

  function addUserListToDOM(data) {
    userList.innerHTML = '';
    data.items.forEach(user => {
      resultsArray.push(user);
      userList.innerHTML += `
        <li><img src=${user.avatar_url} style="height:16.66px;width:16.66px;">   <span style="margin:6.66px">${user.login}</span> - <a href=${user.html_url}>${user.html_url}</a></li>
      `
    });
  }

  function addRepoListToDOM(data) {
    reposList.innerHTML = '';
    data.items.forEach(repo => {
      resultsArray.push(repo);
      reposList.innerHTML += `
        <li>${repo.name} (<a href=${repo.owner.html_url}>${repo.owner.login}</a>) -  <a href=${repo.html_url}>${repo.html_url}</a></li>
      `
    })
  }

  function addUserReposToDOM(e) {
    if(e.target.tagName === 'SPAN') {
      reposList.innerHTML = '';
      fetch(`https://api.github.com/users/${e.target.innerText}/repos`).then(resp => resp.json()).then(repos => {
        repos.forEach(repo => {
          reposList.innerHTML += `<li><a href=${repo.html_url}>${repo.name}</a></li>`;
        });
      });
    }
  }

  function toggleSearch(e) {
    if(e.target.innerText.split(' ')[2] === 'Username') {
      e.target.innerText = searchToggle = 'Search By Repo';
    } else {
      e.target.innerText = searchToggle = 'Search By Username';
    }
  }
});
