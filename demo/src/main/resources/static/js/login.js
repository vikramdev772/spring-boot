
async function validateLogin() {
    const employeeId = document.getElementById('employeeId').value.trim();
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    // Hide previous errors
    errorElement.style.display = 'none';
    
    // Basic validation
    if (!employeeId || !password) {
        showError('Please enter both Employee ID and Password');
        return;
    }

    try {
        const response = await fetch('https://spring-boot-3pdb.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: employeeId,
                password: password
            })
        });

        // First check if response is OK (status 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status === 'success') {
            // Successful login - redirect based on role
            if (data.role === 'Admin') {
                window.location.href = './admin.html';
            } else {
                window.location.href = './login.html';
            }
        } else {
            showError(data.message || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Login failed. Please try again.');
    }
}

function showError(message) {
    const errorElement = document.getElementById('loginError');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function forgotPassword() {
    alert('Forgot password functionality will be implemented here');
}

// Handle form submission on Enter key
document.getElementById('loginForm').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        validateLogin();
    }
});
