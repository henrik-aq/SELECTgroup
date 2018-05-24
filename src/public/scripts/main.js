let allEntries = [];

window.onload = async function showAll(data){
  data = await getAllEntries();
  allEntries = data;
  
  let postForm = document.getElementById("postForm")
  postForm.addEventListener("submit", function(e){
    e.preventDefault();
    createOneEntry(e);
    location.reload();
  }); 

  var i;
  for(i in data.data){

    var id = data.data[i].entryID;
    var commentData = await getCommentsByEntry(id);

    var container = document.createElement("DIV");
    container.setAttribute("class","title-content-wrapper");

    var titleNode = document.createElement("H3");
    var titleText = document.createTextNode(data.data[i].title);
    titleNode.setAttribute("class","title-text");
    
    var contentNode = document.createElement("P");
    var contentText = document.createTextNode(data.data[i].content);
    contentNode.setAttribute("class","content-text");

    var delEntryButton = document.createElement("button");
    delEntryButton.innerHTML = "Delete";

    var delEntryButton = document.createElement("INPUT");
    delEntryButton.setAttribute("type", "button");
    delEntryButton.setAttribute("value", "Remove post");
    delEntryButton.setAttribute("onclick", "deleteOneEntry("+ id + ");");
    delEntryButton.setAttribute("class", "delEntryButton");


    //////////////////////////////////////////////////////
    let commentForm = document.createElement("form");
     commentForm.setAttribute("action","/comments");
     commentForm.setAttribute("method","post");
     commentForm.setAttribute("class", "commentForm")

    var inputBox = document.createElement("textarea");
    inputBox.setAttribute("type", "input");
    inputBox.setAttribute("name","content");
    inputBox.setAttribute("class", "commentInput");
    inputBox.setAttribute("placeholder", "Comment something!");

    var inputButton = document.createElement("INPUT");
    inputButton.setAttribute("type","submit");
    inputButton.setAttribute("onclick", "createOneComment");
    inputButton.setAttribute("value","Comment");
    inputButton.setAttribute("name","commentButton");
    inputButton.setAttribute("class", "commentButton")

    var entryInput = document.createElement('input');
    entryInput.type = "hidden";
    entryInput.value = data.data[i].entryID;
    entryInput.name = "entryID";
    commentForm.appendChild(entryInput);  



    commentForm.addEventListener("submit", function(e){
      e.preventDefault();
      createOneComment(e);
      location.reload();
    }); 

    ///////////////////////////////////////////////
    let patchForm = document.createElement("form");
     patchForm.setAttribute("action","/entries");
     patchForm.setAttribute("method","post");
     patchForm.setAttribute("class","patchForm");

   

     var patchTitleBox = document.createElement("input");
     patchTitleBox.setAttribute("type", "text");
     patchTitleBox.setAttribute("name","title");
     patchTitleBox.setAttribute("placeholder","Edit Title");
     patchTitleBox.setAttribute("class","edit-title");


    var patchContentBox = document.createElement("textarea");
    patchContentBox.setAttribute("type", "input");
    patchContentBox.setAttribute("name","content");
    patchContentBox.setAttribute("placeholder","Edit content");
    patchContentBox.setAttribute("class","edit-content");


    var patchButton = document.createElement("input");
    patchButton.setAttribute("type","submit");
    patchButton.setAttribute("onclick", "patchEntry");
    patchButton.setAttribute("value","Edit");
    patchButton.setAttribute("name","PatchButton");
    patchButton.setAttribute("class","edit-button");
    

    var patchInput = document.createElement('input');
    patchInput.type = "hidden";
    patchInput.value = data.data[i].entryID;
    patchInput.name = "entryID";
    patchForm.appendChild(patchInput);  

    patchForm.addEventListener("submit", function(e){
      e.preventDefault();
      patchEntry(e);
      location.reload();
    }); 



    ///////////////////////////////////////////////
    titleNode.appendChild(titleText);
    contentNode.appendChild(contentText);

    commentForm.appendChild(inputBox);
    commentForm.appendChild(inputButton);

    patchForm.appendChild(patchTitleBox);
    patchForm.appendChild(patchContentBox);
    patchForm.appendChild(patchButton);

    document.getElementById('entryList').appendChild(container).appendChild(titleNode);
    document.getElementById('entryList').appendChild(container).appendChild(contentNode);
    document.getElementById("entryList").appendChild(container).appendChild(delEntryButton);
    document.getElementById('entryList').appendChild(container).appendChild(commentForm);
    document.getElementById('entryList').appendChild(container).appendChild(patchForm);


    for(var y = 0; y < commentData.data.length; y++){

      var id = commentData.data[y].commentID;

      inputButton.addEventListener("click", function(){
        location.reload();
      }); 

    var inputButton = document.createElement("INPUT");
      inputButton.setAttribute("type", "button");
      inputButton.setAttribute("value", "remove");
      inputButton.setAttribute("onclick", "deleteOneComment("+ id + ");");
      inputButton.setAttribute("class", "commentRemoveButton");

      var commentNode = document.createElement("p");
      var commentText = document.createTextNode(commentData.data[y].content);
      commentNode.appendChild(commentText);
      document.getElementById('entryList').appendChild(container).appendChild(commentNode);
      document.getElementById('entryList').appendChild(container).appendChild(inputButton);

      commentNode.setAttribute("class","commentText")
    }
  }
};

 // Search for title and create a new element when entry is found
 function getTitle(titleInput) {
  let entryOutput = document.getElementById('entryList');
  entryOutput.innerHTML = "";
  let entry = allEntries.data.find(text => text.title == titleInput);
  console.log(entry);
  
  var container = document.createElement("DIV");
  container.setAttribute("class","title-content-wrapper");

  var titleNode = document.createElement("H3");
  var titleText = document.createTextNode(entry.title);
  titleNode.setAttribute("class","title-text");
  
  var contentNode = document.createElement("P");
  var contentText = document.createTextNode(entry.content);
  contentNode.setAttribute("class","content-text");

  titleNode.appendChild(titleText);
  contentNode.appendChild(contentText);

  document.getElementById('entryList').appendChild(container).appendChild(titleNode);
  document.getElementById('entryList').appendChild(container).appendChild(contentNode);

  fetch('api/entries/title/' + titleInput)
    .then(res => res.json())
    
}


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

async function deleteOneEntry(id){
  let response = await api.deleteOneEntry(id);
  return response;
  
}

async function createOneComment(e) {
  let data = {
    "entryID": e.target.elements["entryID"].value,
    "content": e.target.elements["content"].value
  };
  api.createOneComment(data);
 }

 async function createOneEntry(e) {
  let data = {
    "title": e.target.elements["title"].value,
    "createdBy": e.target.elements["createdBy"].value,
    "content": e.target.elements["content"].value
  };
  api.createOneEntry(data);
 }


 async function patchEntry(e) {
  let data = {
    "title": e.target.elements["title"].value,
    "content": e.target.elements["content"].value,
    "entryID": e.target.elements["entryID"].value
  };
  api.patchEntry(data);
 }


function searchForTitle() {
  let titleForm = document.getElementById('titleForm');
  titleForm.addEventListener('submit', function(e) {
    let titleInput = document.getElementById('titleInput').value;
    e.preventDefault();
    getTitle(titleInput);
  });
}

searchForTitle();