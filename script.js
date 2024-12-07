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
    errorMessage.textContent = 'Error: Please make sure all fields are filled before adding an employee';
    errorMessage.style.color = 'red';
    errorMessage.style.marginLeft= '10px';
    showMessage('', ''); // Clear any previous success message
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
  
  
  showMessage('Success: Message Added', 'success');

  employeeForm.reset();
});

function renderEmployees() {
  employeesContainer.innerHTML = '';
  if (employees.length > 0) {
    employees.forEach(function(employee, index) {
      const employeeEntry = document.createElement('div');
      employeeEntry.classList.add('employee-entry');

     
      const employeeDetails = document.createElement('div');
      employeeDetails.classList.add('employee-details');
      employeeDetails.innerHTML = `
        <span>${employee.name}</span>
        <span> ${employee.profession}</span>
        <span>${employee.age}</span>
      `;

      
      employeeEntry.appendChild(employeeDetails);

     
      const deleteDiv = document.createElement('div');
      deleteDiv.classList.add('delete-div');
      deleteDiv.innerHTML = `<button class="delete-button" onclick="deleteEmployee(${employee.id})">Delete</button>`;

      
      employeeEntry.appendChild(deleteDiv);

     
      employeesContainer.appendChild(employeeEntry);
      if (index < employees.length - 1) {
        employeesContainer.appendChild(document.createTextNode(', ')); // Add a comma between employee entries
      }
    });
    initialMessage.style.display = 'none';
  } else {
    initialMessage.style.display = 'block';
  }
}

function deleteEmployee(id) {
  employees = employees.filter(function(employee) {
    return employee.id !== id;
  });
  renderEmployees();
}

function showMessage(msg, className) {
  message.textContent = msg;
  message.className = className;
}
