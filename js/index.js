
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#github-form")
  document.querySelector("#user-list").addEventListener("click", addEvent)
  searchForm.addEventListener("submit", searchByName)
})

// User-List //
function searchByName(event){
  event.preventDefault();
  // debugger;
  let searchTerm = event.target.search.value
  fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(rsp => rsp.json())
    .then(searchResults => getUser(searchResults))
}

function getUser(searchResults){
  const userInfos = searchResults.items.filter(searchResult => searchResult.type == "User");
  // console.log(userInfos);
  displayUserInfo(userInfos);
}

function displayUserInfo(userInfos){
  const userList = document.querySelector("#user-list");
  userInfos.forEach(function(userinfo){
    var li = document.createElement("li");
    li.innerHTML = `
      <h3>Name: ${userinfo.login}</h3>
      <img src="${userinfo.avatar_url}" alt="name"><br>
      <button type="button" id="repo-button" data-url="${userinfo.repos_url}">UserRepos</button>
    `
    userList.append(li)
  })
}
// User-List End //

// Repo-List //
function addEvent(event){
  console.log(event.target);
  if (event.target.id == "repo-button"){
    console.log(event.target.dataset.url);
    fetch(`${event.target.dataset.url}`)
      .then(rsp => rsp.json())
      .then(repos => displayUserRepos(repos))
  }
}

function displayUserRepos(repos){
  const reposList = document.querySelector("#repos-list");
  repos.forEach(function(repo){
    var li = document.createElement("li");
    li.innerHTML = `
      <h4>${repo.name}</h4>
      <p>${repo.description}</p>
    `
    reposList.append(li)
  })
}
// Repo-List End //
