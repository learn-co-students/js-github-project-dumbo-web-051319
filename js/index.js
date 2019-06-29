// VARIABLES //////////////////////////////////////////////////////////////////

const searchForm = document.querySelector('#github-form');
const listOUsers = document.querySelector('#user-list');
const listORepos = document.querySelector('#repos-list');

// LISTENERS //////////////////////////////////////////////////////////////////

searchForm.addEventListener("submit", nameForSearch);
listOUsers.addEventListener("click", searchForRepos);

// LOGIC //////////////////////////////////////////////////////////////////////

function searchForRepos(event){
  nameInput = event.target.innerText.slice(10);
  const promprom = fetch(`https://api.github.com/users/${nameInput}/repos`);
  const respo = promprom.then((response) => response.json());
  respo.then((json) => displayRepos(json, nameInput));
  // debugger;
}

function displayRepos(json, nameInput){
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
  respo.then((json) => displaySearchResults(json));
  // debugger;
}

function displaySearchResults(json){
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
