let currentSection = 1;
const sections = document.querySelectorAll('.form-section');
const roleField = document.getElementById('role');
roleField.value = 'Admin'; // Set default role

function showSection(sectionNumber) {
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(`section${sectionNumber}`).classList.add('active');
}

function validateAndNext(nextSection) {
    const currentForm = document.getElementById(`section${currentSection}`);
    const inputs = currentForm.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.reportValidity();
            isValid = false;
        }
    });

    if (isValid) {
        currentSection = nextSection;
        showSection(currentSection);
        
        if (currentSection === 4) {
            document.getElementById('termsContainer').style.display = 'block';
        }
    }
}

function validatePassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const signupButton = document.getElementById('signupButton');

    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords don't match");
        signupButton.disabled = true;
    } else {
        confirmPassword.setCustomValidity("");
        signupButton.disabled = !document.getElementById('terms').checked;
    }
}

function toggleSignupButton() {
    const terms = document.getElementById('terms');
    const signupButton = document.getElementById('signupButton');
    signupButton.disabled = !terms.checked;
}

async function validateForm() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phoneNumber: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        employeeId: document.getElementById('empId').value,
        doj: document.getElementById('doj').value,
        branch: document.getElementById('branch').value,
        password: document.getElementById('password').value
    };

    // Convert dates to day/month/year format
    const [dobYear, dobMonth, dobDay] = formData.dob.split('-');
    const [dojYear, dojMonth, dojDay] = formData.doj.split('-');

    const requestBody = {
        fullName: formData.fullName,
        dobDay: parseInt(dobDay),
        dobMonth: parseInt(dobMonth),
        dobYear: parseInt(dobYear),
        gender: formData.gender,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        employeeId: parseInt(formData.employeeId),
        dojDay: parseInt(dojDay),
        dojMonth: parseInt(dojMonth),
        dojYear: parseInt(dojYear),
        branch: formData.branch
    };

    try {
        const response = await fetch('http://localhost:6060/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(`Signup successful! Employee ID: ${result.employeeId}`);
            window.location.href = '/login'; // Redirect to login page
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}