let isedit = false;
function getData() {
  config = {
    method: "GET",
    url: "https://dummyapi.io/data/v1/user",
    headers: {
      "app-id": "63ff49fc778e8a3c097fcfc1",
    },
  };
  axios(config)
    .then((res) => {
      console.log(res.data.data);
      let output = document.getElementById("body");
      res.data.data.forEach((ele) => {
        let id = ele.id;
        output.innerHTML += `<tr id="${id}" class="row-container">
            <td><img src=${ele.picture}></td>
            <td>${ele.firstName}</td>
            <td>${ele.lastName}</td>
            <td><img src="delete.png" onclick="deleteData('${id}')" class="btn"></td>
            <td><img src="edit.png" class="btn" onclick="updatedata('${id}')"></td>
            </tr>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

getData();

function deleteData(id) {
  console.log("clicked");
  config = {
    method: "DELETE",
    url: `https://dummyapi.io/data/v1/user/${id}`,
    headers: {
      "app-id": "63ff49fc778e8a3c097fcfc1",
    },
  };
  axios(config)
    .then((res) => {
      confirm("are you sure");
      document.getElementById(id).remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById("subbtn").addEventListener("click", formData);

function formData(d) {

//put call
  if (isedit) {
    let id = isedit;
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    /*let emailName = document.getElementById("emailname").value;*/
    let picture = document.getElementById("avatar").value;

  let pattern = /^[A-Z]+([a-z]){1,10}$/
  let pattern2 = /(http[s]?:\/\/.*\.(?:png|jpg))/

    if(firstName.match(pattern)&& lastName.match(pattern)){
      console.log("matched")
    }else{
      alert("Your FirstName or LastName start with capital charachter and then use only small character");
      return;
    }

    if(picture.match(pattern2)){
      console.log("matched");
    }else{
      alert("Enter valid url")
      return;
    }

    editapicall(id, firstName, lastName, picture);
    document.getElementById("form").style.display = "none";
    document.getElementById("user-data").style.marginRight = "0px";
    
  }
  //post call
  else {
    d.preventDefault();
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let emailName = document.getElementById("emailname").value;
    let avatar = document.getElementById("avatar").value;

    let pattern = /^[A-Z]+([a-z]){1,10}$/
  let pattern1 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  let pattern2 = /(http[s]?:\/\/.*\.(?:png|jpg))/
    if(firstName.match(pattern)&& lastName.match(pattern)){
      console.log("matched")
    }else{
      alert("Your FirstName or LastName start with capital charachter and then use only small character");
      return;
    }
    if(emailName.match(pattern1)){
      console.log("matched");
    }else{
      alert("Enter valid email")
      return;
    }
    if(avatar.match(pattern2)){
      console.log("matched");
    }else{
      alert("Enter valid url")
      return;
    }


      const config = {
      method: "POST",
      url: "https://dummyapi.io/data/v1/user/create",
      headers: {
        "content-type": "application/json",
        "app-id": "63ff49fc778e8a3c097fcfc1",
      },
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: emailName,
        picture: avatar,
      }),
    };
    axios(config).then((res) => {
      console.log(res.data);
      let id = res.data.id;
      let output = document.getElementById("body");
      console.log(output);
      output.innerHTML += `
<tr id="${id}" class="row-container">
<td><img src=${avatar}></td>
<td>${firstName}</td>
<td>${lastName}</td>
<td><img src="delete.png" class="btn" onclick="deleteData('${id}')"></td>
<td><img src="edit.png"  class="btn" onclick="updatedata('${id}')"></td>
</tr>`;

let save = document.getElementsByClassName("input-element")
for(e of save){
  e.value=""
}
});
  
  }
}

function updatedata(id) {
  document.getElementById("form").style.display = "block";
  document.getElementById("form").style.height = "270px";
  document.getElementById("user-data").style.marginRight = "390px";
  document.getElementById("headdata").innerHTML = "User Data";
  document.getElementById("additem").style.display = "block";
  document.getElementById("cancel").style.display = "none"
  document.getElementById("email-label").style.display="none"
  document.getElementById("emailname").style.display="none"
  document.getElementById("remove").style.display="none"
  document.getElementById("remove1").style.display ="none"
    
  
  console.log("clicked");
  let select = document.getElementById(id);
  console.log(select);
  let picture = select.firstElementChild.firstElementChild.getAttribute("src");
  console.log(picture);

  let firstName = select.firstElementChild.nextElementSibling.innerHTML;
  console.log(firstName);

  let lastName =
    select.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
  console.log(lastName);

document.getElementById("firstname").value= firstName

document.getElementById("lastname").value = lastName

document.getElementById("avatar").value = picture

  isedit = id;
}
function editapicall(id, firstName, lastName, picture) {
  const data = { firstName, lastName, picture };
  const config = {
    method: "PUT",
    url: `https://dummyapi.io/data/v1/user/${id}`,
    headers: {
      "content-type": "application/json",
      "app-id": "63ff49fc778e8a3c097fcfc1",
    },
    data: JSON.stringify(data),
  };
  axios(config).then((res) => {
    console.log(res.data);
  });
}
function addItem() {
  let save = document.getElementsByClassName("input-element")
  console.log(save);
  for(e of save){
    e.value=""
  }
  isedit = null;

  document.getElementById("form").style.display = "block";
  document.getElementById("form").style.height = "317px";
  document.getElementById("user-data").style.marginRight = "390px";
  document.getElementById("headdata").innerHTML = "Add User";
  document.getElementById("additem").style.display = "none";
  document.getElementById("cancel").style.display = "block"
  document.getElementById("email-label").style.display="inline-block"
  document.getElementById("emailname").style.display="inline-block"
  document.getElementById("remove").style.display="block"
  document.getElementById("remove1").style.display ="block"
}
function cancel(){
  document.getElementById("form").style.display = "none"
  document.getElementById("cancel").style.display = "none"
  document.getElementById("additem").style.display = "block"
  document.getElementById("user-data").style.marginRight = "0px";
}

