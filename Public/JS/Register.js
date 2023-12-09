document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("myForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
    
    console.log("Hello World");
    var Name = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var Password = document.getElementById("password").value;
    var confirm = document.getElementById("confirmpassword").value;
    var showerror=document.getElementById('error');
    if(Name==='' || email==='' || Password==='' || confirm==='')
    {
        showerror.textContent="All Field is Required";
        return;
    }

    if(Password!==confirm)
    {
        showerror.textContent="Password and Confirm Password Not Match";
        return;
    }
    function fetchAllValues() {
        var url = 'http://localhost:3000/user/' + email;
        console.log(url);
        var errorSpan=document.getElementById("error");
        let flag=true;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                
                var allValues = data;
                if(data.error==="No Data Found")
                {
                    function sendData() {
                        const dataToSend = {
                            name: Name,
                            username: email,
                            password: Password,
                            confirmpassword: confirm
                        };
                
                
                
                        console.log(dataToSend);
                        fetch("http://localhost:3000/user", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(dataToSend)
                        }).then(response => {
                            if (response.status === 200) {
                                console.log("User is Registered Successfully");
                                alert("User is Registered Successfully");
                                window.location.href="http://localhost:3000/Login";
                            } else {
                                console.log("Failed to register user");
                                alert("Failed to register user");
                            }
                        }).catch(error => {
                            console.log("Problem in Adding User Record");
                        });
                    }
                
                    sendData();
                    return;
                }
                else{
                console.log("Data alrady exist");
                flag=false;
                showerror.textContent="User Already Exist with Same Email";
                return;
                }
        
            });
    }

    fetchAllValues();
    if(flag===false)
    {
        showerror.textContent="Email Already Exist";
        return;
    }

});

});