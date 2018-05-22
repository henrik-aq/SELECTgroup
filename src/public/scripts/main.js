function getAllUsers(){
fetch('http://localhost:3030/api/users').then(response => {
  return response.json();
}).then(data => {
  var i;
  for(i in data) {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(data[i].username + ' ' + data[i].createdAt);
    node.appendChild(textnode);
    document.getElementById("userList").appendChild(node);
  }
}).catch(err => {
  console.log('Error of some kind in users');
});
}



function getAllPosts1(){
  fetch('http://localhost:3030/api/entries').then(response => {
    return response.json();
  }).then(data => {
      var temp, item, a, i;
      //get the template element:
      temp = document.getElementsByTagName("template")[0];
      //get the DIV element from the template:
      item = temp.content.querySelector("div");
      //for each item in the array:
      for (i in data.data) {
        //Create a new node, based on the template:
        a = document.importNode(item, true);
        //Add data from the array:
        a.textContent += data.data[i].title;
        //append the new node wherever you like:
        document.body.appendChild(a);
      }

  }).catch(err => {
    console.log('Error of some kind in Entries');
  });
  }

function getAllPosts(){
  fetch('http://localhost:3030/api/entries').then(response => {
    return response.json();
  }).then(data => {
    var i;
    for(i in data.data) {
      var node = document.createElement("LI");
      var textnode = document.createTextNode(data.data[i].title + ' ' + data.data[i].content);
      node.appendChild(textnode);
      document.getElementById("entryList").appendChild(node);
    }
  }).catch(err => {
    console.log('Error of some kind in Entries');
  });
  }

  function getAllPostsByUser(id){
    fetch('http://localhost:3030/api/users/' + id + '/entries').then(response => {
      return response.json();
    }).then(data => {
      var i;
      for(i in data.data) {
        var node = document.createElement("LI");
        var btn = document.createElement("BUTTON"); 
        var textnode = document.createTextNode(data.data[i].title + ' ' + data.data[i].content);
        var t = document.createTextNode("Delete");       
        btn.appendChild(t);                                                 // Append <button> to <body>
        node.appendChild(textnode);
        node.appendChild(btn);
        document.getElementById("entryList").appendChild(node);
      }
    }).catch(err => {
      console.log('Error of some kind in Entries');
    });
    }

/*
function postTodo(){
  // x-www-form-urlencoded
  const formData = new FormData();
  const todoInput = document.getElementById('todoInput');
  formData.append('content', todoInput.value);

  const postOptions = {
    method: 'POST',
    body: formData,
    // MUCH IMPORTANCE!
    credentials: 'include'
  }

  fetch('api/comments', postOptions)
    .then(res => res.json())
    .then((newTodo) => {
        document.body.insertAdjacentHTML('beforeend', newTodo.data.content);
    });
}


function login(){
  const formData = new FormData();
  formData.append('username', 'goran');
  formData.append('password', 'bunneltan');
  const postOptions = {
    method: 'POST',
    body: formData,
    // DON'T FORGET
    credentials: 'include'
  }

  fetch('/login', postOptions)
    .then(res => res.json())
    .then(console.log);
}

const form = document.getElementById('newTodo');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
});

const addTodoButton = document.getElementById('addTodo');
addTodoButton.addEventListener('click', postTodo);
*/