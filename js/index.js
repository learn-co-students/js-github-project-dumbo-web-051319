// VARIABLES //////////////////////////////////////////////////////////////////

const searchForm = document.querySelector('#github-form');
const listOUsers = document.querySelector('#user-list');
const listORepos = document.querySelector('#repos-list');
const repoSearchForm = document.querySelector('#repo-form');

// LISTENERS //////////////////////////////////////////////////////////////////

searchForm.addEventListener("submit", nameForSearch);
listOUsers.addEventListener("click", searchForUserRepos);
repoSearchForm.addEventListener("submit", getRepoName);

// LOGIC //////////////////////////////////////////////////////////////////////

function searchForUserRepos(event){
  nameInput = event.target.innerText.slice(10);
  const promprom = fetch(`https://api.github.com/users/${nameInput}/repos`);
  const respo = promprom.then((response) => response.json());
  respo.then((json) => displayUserRepos(json, nameInput));
  // debugger;
}

function displayUserRepos(json, nameInput){
  const repos = json;
  listORepos.innerHTML = `<strong>${nameInput}'s Repos</strong>`;
  repos.forEach((repo) => {
    const name = repo.name;
    li = document.createElement('li');
    li.innerHTML = `<p>${repo.name}</p>`;
    listORepos.append(li);
  });
  // debugger;
}

function nameForSearch(event){
  event.preventDefault();
  const nameInput = event.target.search.value;
  // debugger;
  searchForUsers(nameInput);
}

function searchForUsers(nameInput){
  const promprom = fetch(`https://api.github.com/search/users?q=${nameInput}`);
  const respo = promprom.then((response) => response.json());
  respo.then((json) => displaySearchForUserResults(json));
  // debugger;
}


function displaySearchForUserResults(json){
  const results = json.items;
  results.forEach((user) => {
    li = document.createElement('li');
    li.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}'s avatar'" />
        <p>Username: ${user.login}</p>
        <a href="https://www.github.com/${user.login}">Visit Profile</a>
        <br><br><br>`;
    // debugger;
    listOUsers.append(li);
  });
}

function getRepoName(event){
  event.preventDefault();
  const repoNameInput = event.target.reposearch.value;
  // debugger;
  searchThroughAllRepos(repoNameInput);
}

function searchThroughAllRepos(repoNameInput){
  fetch(`https://api.github.com/search/repositories?q=${repoNameInput}`)
    .then((resp) => resp.json()).then((json) => displayRepos(json));
}

function displayRepos(json){
  const repos = json.items;
  // debugger;
  repos.forEach((repo) => {
    // debugger;
    let name = repo.name;
    let avatar = repo.owner.avatar_url;
    let userName = repo.owner.login;
    let linkURL = `https://github.com/${userName}/${name}`
    let li = document.createElement('li');
    li.innerHTML = `
      <h3><a href=${linkURL}>${name}</a></h3>
      <img src=${avatar} />
      <br/>
      <span>By ${userName}</span>
      <br/>
      <br/>
    `;
    listORepos.append(li);
    // let avatar = repo.avatar_url;

  });
}
