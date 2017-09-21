var username=document.getElementById('todologo');



 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIu1WuePZvI_2xUPBxItUL57nt7ay2p6I",
    authDomain: "hello-993f9.firebaseapp.com",
    databaseURL: "https://hello-993f9.firebaseio.com",

  };
  firebase.initializeApp(config);
var auth=firebase.auth();
var database = firebase.database().ref("/");
var CurrentUser=localStorage.getItem('CurentUser');
// console.log(database);
var input = document.getElementById("demo");
var list = document.getElementById("list");
var addBtn=document.getElementById('add');





function add(){
    var Userinfo = {
        todo: input.value,
    };
    auth.onAuthStateChanged(function(user) {
  if (user) {

  database.child(user.uid+'/Todolist').push(Userinfo);
    input.value = '';
  } else {

  }
});
  
}


  auth.onAuthStateChanged(function(user) {
  if (user) {
database.child(user.uid+'/userinfo').on("child_added", function(snapshot){
    var obj = snapshot.val();
   username.innerHTML=obj.FirstName+' '+obj.LastName;
});
      
database.child(user.uid+'/Todolist').on("child_added", function(snapshot){
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
});

  } else {

  }
});


function clearall(){
      auth.onAuthStateChanged(function(usr) {
  if (usr) {
database.child(usr.uid+'/Todolist' ).remove();

  }
  else {

  }
});



}

function render(user){


    var li = document.createElement("LI");
    var text = document.createTextNode(user.todo);
    li.appendChild(text);
    li.setAttribute("id", user.id);
    li.setAttribute('class','list-group-item');

    var deleteBtn = document.createElement("BUTTON");
    deleteBtn.setAttribute('class','btn btn-danger float-right');
    var btnText = document.createTextNode("Delete");
    deleteBtn.appendChild(btnText);
var EditBtn=document.createElement('button');
    EditBtn.setAttribute('class','btn btn-secondary float-right');
     var btnText1 = document.createTextNode("Edit");
     EditBtn.appendChild(btnText1);
         li.appendChild(deleteBtn);
         li.appendChild(EditBtn);
    list.appendChild(li);
    deleteBtn.onclick = function() {
        console.log(user.id);
        remove(user.id);
    }
    EditBtn.onclick=function (){
        editFunc(user);
    }}


function Logout(){
  firebase.auth().signOut().then(function() {
location.assign('index.html');
}).catch(function(error) {
});

}


    function editFunc(user){
     input.value=user.todo;
     addBtn.innerHTML='save';
     addBtn.onclick=function (){
         save(user);
     }
    }

    function save(user){
     
        var newData={
           todo:input.value,
        };

        auth.onAuthStateChanged(function(usr) {
  if (usr) {
database.child(usr.uid+'/Todolist/'+user.id ).update(newData);
addBtn.innerHTML='Add';
addBtn.onclick=function(){
    add();
}
input.value='';

  } 
  else {

  }
}); }


        auth.onAuthStateChanged(function(usr) {
  if (usr) {
database.child(usr.uid+'/Todolist').on('child_changed',function(EditObje){
    var newObj=EditObje.val();
    newObj.id=EditObje.key;
   document.getElementById(newObj.id).firstChild.nodeValue=newObj.todo;
});
  }
else{}

});
var removeuserid='';
function remove(key){
    auth.onAuthStateChanged(function(usr){
        if(usr){
database.child(usr.uid+'/Todolist/' + key).remove();
removeuserid=usr.uid+'/Todol/ist';
        }
   

    });
}

 database.child(CurrentUser+'/Todolist').on("child_removed", function(data){
console.log(removeuserid);
    var deletedLi = document.getElementById(data.key);
    console.log(deletedLi);
    deletedLi.remove();
});



