window.onload = async function showAll(){
  var data = await getAllEntries();
  console.log(data);

  var i;
  for(i in data.data){
    
    var id = data.data[i].entryID;
    var commentData = await getCommentsByEntry(id);

    var container = document.createElement("DIV");

    var titleNode = document.createElement("H3");
    var titleText = document.createTextNode(data.data[i].title);
    
    var contentNode = document.createElement("P");
    var contentText = document.createTextNode(data.data[i].content);

    let commentForm = document.createElement("form");
     commentForm.setAttribute("action","/comments");
     commentForm.setAttribute("method","post");
     commentForm.setAttribute("class","new-comment-btn-form");

    var inputBox = document.createElement("textarea");
    inputBox.setAttribute("type", "input");
    inputBox.setAttribute("name","content");

    var inputButton = document.createElement("INPUT");
    inputButton.setAttribute("type","submit");
    inputButton.setAttribute("value", "Send");
    inputButton.setAttribute("value","Comment");
    inputButton.setAttribute("name","commentButton");

    commentForm.addEventListener("submit", function(e){
      e.preventDefault();
      createOneComment(e);
    }); 

    titleNode.appendChild(titleText);
    contentNode.appendChild(contentText);

    commentForm.appendChild(inputBox);
    commentForm.appendChild(inputButton);

    document.getElementById('entryList').appendChild(container).appendChild(titleNode);
    document.getElementById('entryList').appendChild(container).appendChild(contentNode);
    document.getElementById('entryList').appendChild(container).appendChild(commentForm);

    
    

    for(var y = 0; y < commentData.data.length; y++){

      var id = commentData.data[y].commentID;

    var inputButton = document.createElement("INPUT");
      inputButton.setAttribute("type", "button");
      inputButton.setAttribute("value", "remove");
      inputButton.setAttribute("onclick", "deleteOneComment("+ id + ");");

      var commentNode = document.createElement("p");
      var commentText = document.createTextNode(commentData.data[y].content);
      commentNode.appendChild(commentText);
      document.getElementById('entryList').appendChild(container).appendChild(commentNode);
      document.getElementById('entryList').appendChild(container).appendChild(inputButton);
    }

  }

};


async function getAllEntries(){
  let response = await api.getAllEntries();
  return response;
}

async function getCommentsByEntry(id){
  let response = await api.getCommentsByEntry(id);
  return response;
}


async function deleteOneComment(id){
  let response = await api.deleteOneComment(id);
  return response;
}

async function createOneComment(e) {
  let data = {
    "entryID": e.target.elements["entryID"].value,
    "content": e.target.elements["content"].value
  };
  api.createOneComment(data);
 }





/**function getAllUsers(){
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



function getCommments(id){
  fetch('http://localhost:3030/api/entries/'+ id + '/comments').then(response => {
    return response.json();
  }).then(data => {
    var i;
    for(i in data.data) {
      let data1 = data.data[i].content;
       console.log(data1);
    }
  });
}


function getAllPosts(){
  fetch('http://localhost:3030/api/entries').then(response => {
    return response.json();
  }).then(data => {
    var i;
    for(i in data.data) {
      var id = data.data[i].entryID;
      var comment = getCommments(id);

      var container = document.createElement("DIV");
      
      var nodetitle = document.createElement("H3");
      var nodecontent = document.createElement("P");
      var nodeCommentContent = document.createElement("P");
      
      var textnodetitle = document.createTextNode(data.data[i].title + ' ID: ' + data.data[i].entryID + ' Created By ' + data.data[i].createdBy);
      var textnodecontent = document.createTextNode(data.data[i].content);
      var textNodeCommentContent = document.createTextNode(comment);
      
      nodetitle.appendChild(textnodetitle);
      nodecontent.appendChild(textnodecontent);
      nodeCommentContent.appendChild(textNodeCommentContent);

      document.getElementById("entryList").appendChild(container).appendChild(nodetitle);
      document.getElementById("entryList").appendChild(container).appendChild(nodecontent);
      document.getElementById("entryList").appendChild(container).appendChild(nodeCommentContent);
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