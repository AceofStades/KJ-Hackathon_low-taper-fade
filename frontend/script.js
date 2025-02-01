// Function to fetch data from server
async function fetchData() {
    try {
        const response = await fetch("/data")
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching data:", error)
        return null
    }
}

// Function to update key metrics
function updateKeyMetrics(data) {
    document.getElementById("riskyCustomers").textContent = data.riskyCustomers
    document.getElementById("riskyMRR").textContent = `$${data.riskyMRR.toLocaleString()}`
    document.getElementById("retentionRate").textContent = `${data.retentionRate}%`
    document.getElementById("totalMRR").textContent = `$${data.totalMRR.toLocaleString()}`
}

// Function to create Customer Status Chart
function createCustomerStatusChart(data) {
    const ctx = document.getElementById("customerStatusChart").getContext("2d")
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map((d) => d.month),
            datasets: ["Active", "New", "Inactive", "Lost"].map((status) => ({
                label: status,
                data: data.map((d) => d[status]),
                backgroundColor: getColor(status),
            })),
        },
        options: {
            responsive: true,
            scales: {
                x: { stacked: true },
                y: { stacked: true },
            },
        },
    })
}

// Function to create Churn Risk by Income Chart
function createChurnRiskIncomeChart(data) {
    const ctx = document.getElementById("churnRiskIncomeChart").getContext("2d")
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map((d) => d.income),
            datasets: [{
                label: "Churn Risk %",
                data: data.map((d) => d.churnRisk),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 20 },
            },
        },
    })
}

// Function to populate Customer Data Table
function populateCustomerTable(data) {
    const tableBody = document.querySelector("#customerTable tbody")
    tableBody.innerHTML = ""
    data.forEach((customer) => {
        const row = tableBody.insertRow()
        row.insertCell(0).textContent = customer.name
        row.insertCell(1).textContent = customer.gender
        row.insertCell(2).textContent = `${customer.churnRisk}%`
        row.insertCell(3).textContent = `$${customer.spendings}`
    })
}

// Helper function to get colors for chart
function getColor(status) {
    const colors = {
        Active: "rgba(75, 192, 192, 0.6)",
        New: "rgba(54, 162, 235, 0.6)",
        Inactive: "rgba(255, 206, 86, 0.6)",
        Lost: "rgba(255, 99, 132, 0.6)",
    }
    return colors[status] || "rgba(0, 0, 0, 0.6)"
}

// Main function to initialize the dashboard
async function initDashboard() {
    const data = await fetchData()
    if (!data) return

    updateKeyMetrics(data.keyMetrics)
    createCustomerStatusChart(data.customerStatus)
    createChurnRiskIncomeChart(data.churnRiskIncome)
    populateCustomerTable(data.customerData)
}

// Call the init function when the page loads
window.addEventListener("load", initDashboard)

// Function to periodically update the dashboard
setInterval(initDashboard, 5000)
