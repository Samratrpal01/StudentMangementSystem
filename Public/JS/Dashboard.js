document.addEventListener("DOMContentLoaded", function() {
    var editIcons = document.querySelectorAll(".edit-icon");
    var deleteIcons=document.querySelectorAll(".delete-icon");
    editIcons.forEach(function(editIcon) {
        editIcon.addEventListener("click", function() {
            var rollNo = this.getAttribute("data-roll-no");

            fetchStudentRecord(rollNo)
                .then(studentRecord => {
                    
                    populateModalForm(studentRecord);
                })
                .catch(error => {
                    console.error("Error fetching student record:", error);
                });
        });
    });
    
        deleteIcons.forEach(function(deleteIcon){
            deleteIcon.addEventListener("click",function(){
                var RollNo=this.getAttribute("data-roll-no");
                fetchStudentRecord(RollNo)
                .then(studentRecord => {
                    
                    document.getElementById("NameOfDeleteStudent").innerHTML=studentRecord.Name;
                    document.getElementById("RollOfDeleteStudent").innerHTML=RollNo;

                })
                .catch(error => {
                    console.error("Error fetching student record:", error);
                });
                

                
            });
        });
    



    function populateModalForm(studentRecord) {
        document.getElementById("editStudentName").value = studentRecord.Name;
        document.getElementById("editRollNo").value = studentRecord.RollNo;
        document.getElementById("editDateOfBirth").value = studentRecord.DateOfBirth.split('T')[0];
        document.getElementById("editScore").value = studentRecord.Score;
        document.getElementById("editPhoneNo").value = studentRecord.PhoneNo;
    }


    

});

function fetchStudentRecord(rollNo) {
    return fetch(`http://localhost:3000/student/${rollNo}`)
        .then(response => response.json())
        .catch(error => {
            console.log("Error fetching student record:", error);
           
        });
}

function AddRecord(){
    console.log("Hello World");
    var name=document.getElementById("studentName").value;
    var rollno=document.getElementById("rollNo").value;
    var dob=document.getElementById("dateOfBirth").value;
    var score=document.getElementById("score").value;
    var phoneno=document.getElementById("phoneNo").value;
    
    
    clearErrors();
   let isExist=false;
    fetchStudentRecord(rollNo)
    .then(studentRecord => {
        isExist=true;
       displayError(document.getElementById("rollNo"),"Roll No Already Exist");
       return;

    })
    if(isExist===true)
    {
        return;
    }
    if(isExist===false)
    {
    if(parseInt(score)>100)
    {
        displayError(document.getElementById("score"), 'Score cannot be greater than 100');
        return; 
    }
    if(phoneno.length!==10)
    {
        displayError(document.getElementById("phoneNo"),'Phone number must be 10 digits');
        return;
    }
    const requiredFields = [
        { field: 'studentName', message: 'Student Name is required' },
        { field: 'rollNo', message: 'Roll No is required' },
        { field: 'dateOfBirth', message: 'Date of Birth is required' },
        { field: 'score', message: 'Score is required' },
        { field: 'phoneNo', message: 'Phone No is required' }
    ];

    let formValid = true;
    for (const fieldData of requiredFields) {
        const input = document.getElementById(fieldData.field);
        if (input.value.trim() === '') {
            displayError(input, fieldData.message);
            formValid = false;
        }
    }


    if (!formValid) {
        return;
    }
    else{
        function sendData(){
            const dataToSend={
                Name:name,
                PhoneNo:phoneno,
                RollNo:rollno,
                Score:score,
                DateOfBirth:dob
            };
    
            console.log(dataToSend);
            fetch("http://localhost:3000/student",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }).then(response=>{
                if(!response.ok)
                {
                    alert("Data is added Successfully");
                }
    
            }).catch(error=>{
                console.log("Problem in Adding Student Record");
            });
        }
        
        sendData();
        window.location.href = 'http://localhost:3000/Dashboard';
        $('#addStudentModal').modal('hide');
    
    }
}
   



}

function displayError(input, message) {
    const errorContainer = document.getElementById(`${input.id}Error`);
    errorContainer.textContent = message;
    input.classList.add('is-invalid');
}

function clearErrors() {
    const errorContainers = document.querySelectorAll('.error-text');
    errorContainers.forEach(container => container.textContent = '');

    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => input.classList.remove('is-invalid'));
}

function UpdateRecord()
{
    console.log("Hello in update World");
    var name=document.getElementById("editStudentName").value;
    var rollno=document.getElementById("editRollNo").value;
    var dob=document.getElementById("editDateOfBirth").value;
    var score=document.getElementById("editScore").value;
    var phoneno=document.getElementById("editPhoneNo").value;

    if(score>100)
    {
        displayError(document.getElementById("editScore"),"Score Cannot be Greater Than 100");
        return;
    }
    if(phoneno.length<10)
    {
        displayError(document.getElementById("editPhoneNo"),"Phone Shoud be 10 digit");
        return;
    }

    else{

    function sendData(){
        const dataToSend={
            Name:name,
            PhoneNo:phoneno,
            RollNo:rollno,
            Score:score,
            DateOfBirth:dob
        };

        console.log(dataToSend);
        fetch("http://localhost:3000/student/"+dataToSend.RollNo,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }).then(response=>{
            if(!response.ok)
            {
                alert("Data is Updated Successfully");
            }

        }).catch(error=>{
            console.log("Problem in Upate Data Student Record");
        });
    }
    
    sendData();
    console.log("Data is updated");
   
    $('#EditStudentModal').modal('hide');
    window.location.href = 'http://localhost:3000/Dashboard';
}
}

function delteStudent()
{   
    var RollNo=document.getElementById('RollOfDeleteStudent').innerHTML;
    fetch("http://localhost:3000/student/"+RollNo,{
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response=>{
            if(!response.ok)
            {
                alert("Data is Delete Successfully");
            }

        }).catch(error=>{
            console.log("Problem in Delteting Student Record");
        });

        $('#deleteStudentModal').modal('hide');
        window.location.href = 'http://localhost:3000/Dashboard';


}

    

function Logout()
    {
        fetch('http://localhost:3000/logout',{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response=>{
            if(response.status===200){
                console.log("Logout Successfully");
                window.location.href="http://localhost:3000/";
            }
            else{
                console.log("Logout Failed");
            }
        });
    }
