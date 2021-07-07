
let userSearch = document.querySelector('#github-form')
let userRepo = document.querySelector('#repos-list')
let getName = document.querySelector('#search')


//function to fetch user profile through search
userSearch.addEventListener("submit", function(event){
  event.preventDefault();
  const username = getName.value
    // debugger
  fetch(`https://api.github.com/search/users?q=${username}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json"
    }
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    displayUser(data)
})
})



//function to fetch user repo through user search
// function getUserRepo(event){
//   // const username = getName.value
//   event.preventDefault()
//   fetch(`https://api.github.com/users/${username}/repos`)
//   .then(response => response.json())
//   .then(data => {
//   console.log(data)
// })
//
// }


function displayUser(usersObj){
  const user = usersObj.items[0]

  let userList = document.querySelector('#user-list')

  const userImage = document.createElement("img")
  userImage.src = user.avatar_url
  userList.append(userImage)

  const userLi = document.createElement("li")
  userLi.innerText = user.login
  userList.append(userLi)

  const userA = document.createElement("a")
  userA.href = user.html_url
  userList.append(userA)

}
