const employeeForm = document.getElementById('employeeForm');
const message = document.getElementById('message');
const employeesContainer = document.getElementById('employees');
const errorMessage = document.getElementById('errorMessage');
const initialMessage = document.getElementById('initialMessage');

let employees = [];

employeeForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const profession = document.getElementById('profession').value;
  const age = parseInt(document.getElementById('age').value);

  if (name.trim() === '' || profession.trim() === '' || isNaN(age)) {
    errorMessage.textContent = 'Error: Please fill all fields before adding an employee!';
    errorMessage.style.color = 'red';
    return;
  }

  errorMessage.textContent = '';

  const newEmployee = {
    id: Date.now(),
    name: name,
    profession: profession,
    age: age
  };

  employees.push(newEmployee);
  renderEmployees();
  showMessage('Success: Employee added!', 'success');
  employeeForm.reset();
});

function renderEmployees() {
  employeesContainer.innerHTML = '';
  employees.forEach(function(employee, index) {
    const div = document.createElement('div');
    div.classList.add('employee');

    const employeeDetailsDiv = document.createElement('div');
    employeeDetailsDiv.classList.add('employee-details');
    employeeDetailsDiv.innerHTML = `
      <p> ${index + 1}.  &nbsp; &nbsp; Name: ${employee.name} &nbsp; &nbsp; Profession: ${employee.profession} &nbsp; &nbsp; Age: ${employee.age}</p>
    `;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
      deleteEmployee(employee.id);
    });

    div.appendChild(employeeDetailsDiv);
    employeesContainer.appendChild(div);

    
    employeesContainer.appendChild(deleteButton);
  });

  
  initialMessage.style.display = employees.length === 0 ? 'block' : 'none';
}

function deleteEmployee(id) {
  employees = employees.filter(function(employee) {
    return employee.id !== id;
  });
  renderEmployees();
  showMessage('Employee deleted successfully', 'success');
}

function showMessage(msg, className) {
  message.textContent = msg;
  message.className = className;
}


