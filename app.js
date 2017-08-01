








var mainContainer = document.getElementById('container');
var InputValue = document.getElementById('input');


function newelement() {
    if(InputValue.value==""){
        alert('Enter what\'s needs to be done? ');
    }
    else{
    var creatElement1 = document.createElement('button');//edit button
    var creatElement2 = document.createElement('button');//delete button
    var creatElement = document.createElement('p');//para

    mainContainer.appendChild(creatElement);//append para in div

    var textNode = document.createTextNode(InputValue.value); 
    creatElement.appendChild(textNode);//append text in para
    var textNode2 = document.createTextNode('Edit');
    creatElement2.appendChild(textNode2);//append edit button in para
    creatElement.appendChild(creatElement2);
    creatElement.appendChild(creatElement1);//append delete button in para
    var textNode1 = document.createTextNode('x');
    creatElement1.appendChild(textNode1);


    creatElement1.setAttribute('onclick', 'remov(this);'); //set attri in delete button
    creatElement2.setAttribute('onclick', 'edit(this);');  //set attri in edit button
    InputValue.value = "";
    // console.log(creatElement1.getAttribute('onclick'));
    // creatElement1.()
}}
function remov(a) {
    if(EditButtCount===0){
    var d = a.parentElement;  //catch para element
    d.style.display = "none"; //delete para
}
else{
    alert('Once you have Complete Editing then you would be able to delete it');
}
}

var InputValue1;//edit input value
var EditButtCount = 0;
function edit(a) {
    var par = a.parentElement;//get para

    if (a.innerHTML === "Edit" && EditButtCount == 0) {
        // par.childNodes[0]="";
        // var str=document.textContent(par.childNodes[0]);
       // console.log(par.childNodes[0]);


        // console.log(str);

        // InputValue.value="";
        // document.getElementById('E').innerHTML="Edited";
        // par.style.visibility="hidden";
        // par.appendChild(previousSibling.document.createElement('input'));
        
        InputValue1 = document.createElement('input');
        f = par.insertBefore(InputValue1, a);
        InputValue1.value=par.childNodes[0].nodeValue;
        par.childNodes[0].nodeValue="";
        EditButtCount++;
        a.innerHTML = "Edited";
    }
    else if (a.innerHTML == "Edited" && EditButtCount === 1) {
        //par.insertBefore(document.createElement.createTextNode(InputValue1.value),InputValue1);
        par.childNodes[0].nodeValue = InputValue1.value;
        InputValue1.style.display = "none";
        a.innerHTML = "Edit";
        //console.log(InputValue1);
       // console.log(par.childNodes[0].nodeValue);
        EditButtCount--;
    }
    else {
        alert("you can't be able to Edit more than one value at a timee");
    }

}


function deleteAll() {
    var Len = mainContainer.childNodes;
    console.log(Len);
    for (i = 0; i < Len.length; i++) {
        // mainContainer.removeChild(childNodes[i]);
        Len[i].style.display = "none";
    }
            // alert('Delete All Items Successfully');

}