fetch("https://reqres.in/api/users?page=1&&per_page=15").then((res) => {
        res.json().then((data) => {
          console.log(data.data);
          if (data.data.length > 0) {
            var temp = "";
            data.data.forEach((element) => {
              temp += "<tr class='row-container'>";
              temp += "<td>" + `<img src=${element.avatar}>` + "</td>";
              temp += "<td>" + element.first_name + "</td>";
              temp += "<td>" + element.last_name + "</td></tr>";
            });
            document.getElementById("tablebody").innerHTML = temp;
          }
        });
      });

      



    