        function getResult() {
            var rollNo = document.getElementById("RollNo").value;
            var dateOfBirth = document.getElementById("DateOfBirth").value;
            var errorElement = document.getElementById("error");

          if(rollNo.trim()==="")
          {
            errorElement.innerText="Roll No Cannot be empty";
          }

          var today=new Date();
          var selectedDate=new Date(dateOfBirth);

          if(dateOfBirth==="" || isNaN(selectedDate) ||selectedDate>today)
          {
            errorElement.innerText="Please Select Valid Date not more than today";
            return;
          }
        console.log(rollNo);
    
        fetchStudentRecord(rollNo)
            .then(studentRecord => {
                console.log(studentRecord);
                if(studentRecord.DateOfBirth.toString().split('T')[0]===dateOfBirth)
                {   
                    window.location.href=`http://localhost:3000/Result?RollNo=${encodeURIComponent(rollNo)}`;
                }
                else
                {
                    errorElement.innerText="Date Of Birth Not Match";
                }
            })
            .catch(error => {
                console.error("Error fetching student record:", error);
            });
        
        
    


        }

     

       
        document.getElementById("studentForm").addEventListener("submit", function(event) {
            event.preventDefault();
        });


        function fetchStudentRecord(rollNo) {
            return fetch(`http://localhost:3000/student/${rollNo}`)
                .then(response => response.json())
                .catch(error => {
                    console.log("Error fetching student record:", error);
                   
                });
        }