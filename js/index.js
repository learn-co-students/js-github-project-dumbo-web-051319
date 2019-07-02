const form = document.querySelector('#github-form')
const userList = document.querySelector('#user-list')
const reposList = document.querySelector('#repos-list')


//------------------------- events ---------------------

userList.addEventListener('click', fetchUserRepos)
form.addEventListener('click', searchEventHandler)

function searchEventHandler(e) {
  if (e.target.value === 'search user') {
    fetchMatchingUsers(e)
  } else if (e.target.value === 'search repo') {
    fetchMatchingRepos(e)
  }
}

//-------------------------- fetches --------------------

function fetchMatchingUsers(e) {
  e.preventDefault();
  // console.log(e.target.form)
  // debugger

  const text = document.querySelector('#search').value

  fetch(`https://api.github.com/search/users?q=${text}`, {
    headers: {'Accept':'application/vnd.github.v3+json'}
  })
  .then(res => res.json())
  .then(userResults)
}

function fetchMatchingRepos(e) {
  e.preventDefault();

  const text = document.querySelector('#search').value

  fetch(`https://api.github.com/search/repositories?q=${text}`, {
    headers: {'Accept':'application/vnd.github.mercy-preview+json'}
  })
  .then(res => res.json())
  .then(data => repoResults(data.items))
}

function fetchUserRepos(e) {
  // debugger
  const id = e.target.parentElement.dataset.id
  const userName = e.target.parentElement.dataset.user

  fetch(`https://api.github.com/users/${userName}/repos`, {
    headers: {'Accept':'application/vnd.github.v3+json'}
  })
  .then(res => res.json())
  .then(repoResults)
}

 //----------------------- domslaps ----------------------

 function userResults(data) {
   userList.innerHTML = '<h3>User Results</h3>'
   for (const item of data.items) {
     userList.innerHTML += `
     <li class='user-list-item' data-id=${item.id} data-user=${item.login}>
     username: ${item.login} <br>
     avatar: <img src=${item.avatar_url} style="width:128px;height:128px;" /> <br>
     <a href=${item.html_url}>link to profile</a> <hr>
     </li>
     `
   }
 }

 function repoResults(data) {
   reposList.innerHTML = '<h3>Repos</h3>'
   for (const item of data) {
     reposList.innerHTML += `
      <li class='repo-list-item' id=${item.id}>${item.name}</li>
     `
   }
 }
