function showSection(section) {
    document.getElementById("section-title").textContent = section.charAt(0).toUpperCase() + section.slice(1);
    document.getElementById("section-content").textContent = "";
    
    let sections = document.querySelectorAll(".report-section, .user-section, .team-section");
    sections.forEach(sec => sec.style.display = "none");
    
    if (section === "reports") {
        document.getElementById("dashboard").style.display = "block";
        loadStockReports();
        loadTeamLevels();
    } else if (section === "users") {
        document.getElementById("users").style.display = "block";
        loadUsers();
    }
    
    let items = document.querySelectorAll(".sidebar ul li");
    items.forEach(item => item.classList.remove("active"));
    event.target.classList.add("active");
}

let stockData = {
    total: 325,
    sold: 215,
    remaining: 110,
    revenue: 267999,
}

function loadStockReports() {
    const reportTable = document.getElementById("report-data");
    reportTable.innerHTML = "";

    let row = `<tr>
        <td>${stockData.total}</td>
        <td>${stockData.sold}</td>
        <td>${stockData.remaining}</td>
        <td>₹${stockData.revenue.toLocaleString()}</td>
    </tr>`;
    reportTable.innerHTML += row;
}

let teamLevels = {
    "Junior Members [L1]": 2,
    "Mid-Level Members [L2]": 4,
    "Senior Members [L3]": 3,
    "Team Leads [L4]": 1,
};

function loadTeamLevels() {
    const teamTable = document.getElementById("team-levels");
    teamTable.innerHTML = "";

    for (const level in teamLevels) {
        let row = `<tr>
            <td>${level}</td>
            <td>${teamLevels[level]}</td>
        </tr>`;
        teamTable.innerHTML += row;
    }
}

let approvedUsers = [
    { name: "Alice Johnson", email: "alice@example.com", role: "L1" },
    { name: "Bob Williams", email: "bob@example.com", role: "L1" },
    { name: "Williams", email: "Williams@example.com", role: "L2" },
    { name: "Henry", email: "Henry@example.com", role: "L2" },
    { name: "Peter", email: "Peter@example.com", role: "L2" },
    { name: "Sophia", email: "Sophia@example.com", role: "L2" },
    { name: "Laila", email: "Laila@example.com", role: "L3" },
    { name: "Lerry", email: "lerry@example.com", role: "L3" },
    { name: "Micheal", email: "Micheal@example.com", role: "L3" },
    { name: "Trimmson", email: "Trimmson@example.com", role: "L4" },
];

let pendingUsers = [
    { name: "Charlie Brown", email: "charlie@example.com", role: "L1" },
    { name: "Diana Green", email: "diana@example.com", role: "L3" }
];

function loadUsers() {
    const approvedTable = document.getElementById("approved-users").querySelector("tbody");
    const pendingTable = document.getElementById("pending-users").querySelector("tbody");

    approvedTable.innerHTML = "";
    pendingTable.innerHTML = "";

    approvedUsers.forEach(user => {
        let row = `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.role}</td></tr>`;
        approvedTable.innerHTML += row;
    });

    pendingUsers.forEach((user, index) => {
        let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="approve-btn" onclick="approveUser(${index})">Approve</button>
                <button class="reject-btn" onclick="rejectUser(${index})">Reject</button>
            </td>
        </tr>`;
        pendingTable.innerHTML += row;
    });
}

function approveUser(index) {
    approvedUsers.push(pendingUsers[index]);
    pendingUsers.splice(index, 1);
    loadUsers();
}

function rejectUser(index) {
    pendingUsers.splice(index, 1);
    loadUsers();
}

document.addEventListener("DOMContentLoaded", function() {
    loadStockReports();
    loadTeamLevels();
    loadUsers();
});


// Navigation functionality
const navItems = document.querySelectorAll('.sidebar ul li');
const sections = {
    'Inventory': document.querySelector('.inventory-section'),
    'Reports': document.querySelector('.report-section'),
    'Users': document.querySelector('.user-section'),
    'Team': document.querySelector('.team-section')
};

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all sections
        Object.values(sections).forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the corresponding section
        const sectionName = item.textContent.trim();
        if (sections[sectionName]) {
            sections[sectionName].style.display = 'block';
        }
    });
});

// Add button functionality
const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const addForm = document.getElementById('addForm');

addBtn.addEventListener('click', () => {
    addModal.style.display = 'block';
});

cancelAddBtn.addEventListener('click', () => {
    addModal.style.display = 'none';
    alert('Failed to insert into inventory');
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addModal.style.display = 'none';
    alert('Successfully inserted into inventory');
    addForm.reset();
});

// Delete button functionality
const deleteBtn = document.getElementById('deleteBtn');
const deleteModal = document.getElementById('deleteModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const deleteForm = document.getElementById('deleteForm');

deleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'block';
});

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    alert('Failed to update the inventory');
});

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedBarcode = document.getElementById('barcodeSelect').value;
    deleteModal.style.display = 'none';
    alert(`Item with barcode ${selectedBarcode} deleted from inventory`);
    deleteForm.reset();
});

// Export button functionality
const exportBtn = document.getElementById('exportBtn');

exportBtn.addEventListener('click', () => {
    window.print();
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addModal) {
        addModal.style.display = 'none';
        alert('Failed to insert into inventory');
    }
    if (e.target === deleteModal) {
        deleteModal.style.display = 'none';
        alert('Failed to update the inventory');
    }
});
