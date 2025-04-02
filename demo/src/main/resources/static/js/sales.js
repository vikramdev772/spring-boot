function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

const commissionsData = Array.from({ length: 30 }, (_, i) => ({
    day: (i + 1).toString(),
    commission: Math.floor(Math.random() * 500) + 100
}));

const totalCommissions = commissionsData.reduce((sum, entry) => sum + entry.commission, 0);
document.getElementById("totalCommission").textContent = `Total Commissions: ₹${totalCommissions.toLocaleString()}`;

const ctx = document.getElementById("commissionChart").getContext("2d");
new Chart(ctx, {
    type: "bar",
    data: {
        labels: commissionsData.map(entry => entry.day),
        datasets: [{
            label: "Commissions (₹)",
            data: commissionsData.map(entry => entry.commission),
            backgroundColor: "#4F46E5"
        }]
    },
    options: {
        scales: {
            y: {
                min: 0,
                max: 5000
            }
        }
    }
});

const approvedUsers = [
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

const teamLevels = {
    "Level 1": approvedUsers.filter(user => user.role === "L1").map(user => user.name),
    "Level 2": approvedUsers.filter(user => user.role === "L2").map(user => user.name),
    "Level 3": approvedUsers.filter(user => user.role === "L3").map(user => user.name),
    "Level 4": approvedUsers.filter(user => user.role === "L4").map(user => user.name)
};

// Resulting teamLevels will be:
/*
{
    "Level 1": ["Alice Johnson", "Bob Williams"],
    "Level 2": ["Williams", "Henry", "Peter", "Sophia"],
    "Level 3": ["Laila", "lerry", "Micheal"],
    "Level 4": ["Trimmson"]
}
*/

function populateLeaderboard() {
    const tbody = document.getElementById("leaderboardData");
    const maxRows = Math.max(...Object.values(teamLevels).map(level => level.length));
    
    for (let i = 0; i < maxRows; i++) {
        const row = document.createElement("tr");
        Object.keys(teamLevels).forEach(level => {
            const cell = document.createElement("td");
            cell.textContent = teamLevels[level][i] || "";
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    }
}

populateLeaderboard();