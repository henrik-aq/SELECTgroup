var api = (function(){

    async function fetchData(url){
        let promise = await fetch(url);
        let data = await promise.json();
        return data;
    }

    async function getAllComments(){
        let response = await fetchData('http://localhost:3030/api/comments');
        return response;
    }
    async function getAllEntries(){
        let response = await fetchData('http://localhost:3030/api/entries');
        return response;
    }

    async function getOneEntry(id){
        let response = await fetchData('http://localhost:3030/api/entries/'+ id);
        //console.log(response);
        return response;
    }

    async function getCommentByEntry(id){
        let response = await fetchData('http://localhost:3030/api/entries/'+ id + '/comments');
        return response;        
    }

    async function getComment(id){
        let response = await fetchData('http://localhost:3030/api/comments/'+ id);
        return response;
    }

    async function postEntry(content){
        fetch('http://localhost:3030/api/entries/',{
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            credentials: 'include'
            }
        }).then( function(data) {
            console.log('Request success:');
        });
    }


    async function deleteOneComment(id){
        fetch(`http://localhost:3030/api/comments/${id}`, {
          method: "DELETE"
        }).then( function() {
            console.log("Deleted!");
            location.reload();
        });
      }

      async function createOneComment(content){
        fetch('http://localhost:3030/api/comments',{
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            credentials: 'include'
            }
        }).then( function() {
            console.log('Request success:');
        });
    }

    async function deleteOneEntry(id){
        fetch(`http://localhost:3030/api/entries/${id}`, {
          method: "DELETE"
        }).then( function() {
          console.log("Deleted!");
          location.reload();
        });
      }


    async function createOneEntry(content){
        fetch('http://localhost:3030/api/entries',{
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            credentials: 'include'
            }
        }).then( function() {
            console.log('entry post success:');
        });
    }


    async function patchEntry(data){
        fetch(`http://localhost:3030/api/entries/${data.entryID}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `content=${data.content}&title=${data.title}`,
            
         }).then( function() {
            console.log(' post success:');
        });
    }


    return {
        getAllEntries:getAllEntries,
        getOneEntry:getOneEntry,
        getComment:getComment,
        postEntry:postEntry,
        getAllComments:getAllComments,
        getCommentsByEntry:getCommentByEntry,
        deleteOneComment:deleteOneComment,
        createOneComment:createOneComment,
        createOneEntry:createOneEntry,
        patchEntry:patchEntry,
        deleteOneEntry:deleteOneEntry,
    };
})();