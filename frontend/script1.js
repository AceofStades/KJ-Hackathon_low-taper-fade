document.addEventListener("DOMContentLoaded", function () {
    const customers = [
        { name: "John Doe", plan: "Premium", lastActive: "2025-01-15", risk: "Low" },
        { name: "Jane Smith", plan: "Basic", lastActive: "2024-12-30", risk: "High" },
        { name: "Alice Brown", plan: "Standard", lastActive: "2025-01-10", risk: "Medium" }
    ];

    const riskCounts = { Low: 0, Medium: 0, High: 0 };
    customers.forEach(customer => riskCounts[customer.risk]++);

    document.getElementById("lowCount").innerText = riskCounts.Low;
    document.getElementById("mediumCount").innerText = riskCounts.Medium;
    document.getElementById("highCount").innerText = riskCounts.High;
});

function showCategory(riskLevel) {
    const customers = [
        { name: "John Doe", plan: "Premium", lastActive: "2025-01-15", risk: "Low" },
        { name: "Jane Smith", plan: "Basic", lastActive: "2024-12-30", risk: "High" },
        { name: "Alice Brown", plan: "Standard", lastActive: "2025-01-10", risk: "Medium" }
    ];
    const tableBody = document.getElementById("customerTableBody");
    tableBody.innerHTML = "";

    customers.filter(customer => customer.risk === riskLevel).forEach(customer => {
        let row = `<tr onclick="redirectToCustomerDetails('${customer.name}')">
            <td>${customer.name}</td>
            <td>${customer.plan}</td>
            <td>${customer.lastActive}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    document.getElementById("tableTitle").innerText = `${riskLevel} Risk Customers`;
}

function redirectToCustomerDetails(name) {
    window.location.href = `individual_customer.html?name=${encodeURIComponent(name)}`;
}

function showHighRiskCategory() {
    showCategory('High');
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('discountToast').style.display = 'flex';
}
function applyDiscount() {
// Your logic to apply the discount
hideToast(); // Hide the original toast

// Show the success toast
const successToast = document.getElementById('successToast');
successToast.style.display = 'flex';

// Hide the success toast after 5 seconds
setTimeout(() => {
successToast.style.animation = 'fadeOut 0.5s ease'; // Fade-out animation
setTimeout(() => {
    successToast.style.display = 'none';
    successToast.style.animation = ''; // Reset animation
}, 500); // Wait for the animation to complete
}, 5000); // 5 seconds delay
}

function hideToast() {
document.getElementById('overlay').style.display = 'none'; // Hide overlay
document.getElementById('discountToast').style.display = 'none'; // Hide original toast
}

