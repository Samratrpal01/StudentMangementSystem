
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("myForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        var email = document.getElementById("UserName").value;
        var password = document.getElementById("password").value;

        console.log("Name:", password);
        console.log("Email:", email);
        const loginCredentials = {
            username: email,
            password: password
          };
          fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        }).then(response => {
            if (response.status === 200) {      
                window.location.href = '/dashboard';
            } else if (response.status === 401) {
                document.getElementById('error').textContent="Invalid Username Or Password";
            } else {
                document.getElementById('error').textContent="Invalid Username Or Password";
            }
        })
        .catch(error => {
            document.getElementById('error').textContent="Invalid Username Or Password";
            console.error('Error:', error);
            // Handle the error here
        });          
        form.reset();
    });
});
