

//const password = 'oe3im3io2r3o2'
//const rounds = 10


function handleClick() {

  data = {
    'user_name': document.getElementById("username").value,
    'role': document.getElementById("role").value,
    'password': document.getElementById("password").value

  }
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  console.log(username)
  console.log(password)
  console.log(role)

  // axios.get(`api/login?filter[where][user_name]=${username}&filter[where][password]=${password}
  //&filter[where][role]=${role}`)//
  const filet = "/api/login?filter[where][user_name]=" + username + "&filter[where][password]=" + password
    + "&&filter[where][role]=" + role;
  console.log(filet)
  axios.get(filet)
    .then(response => {
      data = response.data;
      console.log(data.length)

      if (data.length > 0) {
        if (role == "student")
          window.location.replace("/home")
        else
          window.location.replace("/teacher")
      }
      else
        document.getElementById("error").innerHTML = "Invalid Credentials"
    })

  return false; // prevent further bubbling of event

}
