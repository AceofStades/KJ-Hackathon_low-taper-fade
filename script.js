// Mock data for demonstration purposes
const mockData = {
    keyMetrics: {
      riskyCustomers: 150,
      riskyMRR: 15000,
      retentionRate: 85,
      totalMRR: 100000,
    },
    customerStatus: [
      { month: "Jan", Active: 1000, New: 200, Inactive: 50, Lost: 30 },
      { month: "Feb", Active: 1100, New: 180, Inactive: 60, Lost: 40 },
      { month: "Mar", Active: 1150, New: 220, Inactive: 55, Lost: 35 },
      { month: "Apr", Active: 1200, New: 190, Inactive: 70, Lost: 45 },
    ],
    churnRiskIncome: [
      { income: "0-1000", churnRisk: 15 },
      { income: "1001-2000", churnRisk: 12 },
      { income: "2001-3000", churnRisk: 10 },
      { income: "3001-4000", churnRisk: 8 },
      { income: "4001+", churnRisk: 5 },
    ],
    segmentsChurn: [
      { segment: "Young Professionals", churnRisk: 12, spendings: 2500 },
      { segment: "Families", churnRisk: 8, spendings: 3500 },
      { segment: "Seniors", churnRisk: 15, spendings: 1500 },
      { segment: "Students", churnRisk: 20, spendings: 1000 },
      { segment: "Business", churnRisk: 5, spendings: 5000 },
    ],
    churnRiskByLocation: [
      { state: "California", churnRisk: 10 },
      { state: "New York", churnRisk: 12 },
      { state: "Texas", churnRisk: 8 },
      { state: "Florida", churnRisk: 15 },
    ],
    customerData: [
      { name: "John Doe", gender: "Male", churnRisk: 15, spendings: 2500 },
      { name: "Jane Smith", gender: "Female", churnRisk: 8, spendings: 3500 },
      { name: "Bob Johnson", gender: "Male", churnRisk: 20, spendings: 1500 },
      { name: "Alice Brown", gender: "Female", churnRisk: 5, spendings: 4500 },
    ],
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
        datasets: [
          {
            label: "Churn Risk %",
            data: data.map((d) => d.churnRisk),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
          },
        },
      },
    })
  }
  
  // Function to create Segments Churn Chart
  function createSegmentsChurnChart(data) {
    const ctx = document.getElementById("segmentsChurnChart").getContext("2d")
    new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Customer Segments",
            data: data.map((d) => ({ x: d.spendings, y: d.churnRisk })),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            pointRadius: 8,
            pointHoverRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Spendings ($)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Churn Risk (%)",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const segment = data[context.dataIndex].segment
                return `${segment}: $${context.parsed.x}, ${context.parsed.y}%`
              },
            },
          },
        },
      },
    })
  }
  
  // Function to create Churn Risk Map
  function createChurnRiskMap(data) {
    // This is a placeholder for the map creation
    // In a real implementation, you would use a mapping library like Leaflet or D3.js
    const mapContainer = document.getElementById("churnRiskMap")
    mapContainer.innerHTML = "<p>Map placeholder: Implement with Leaflet or D3.js</p>"
    data.forEach((d) => {
      const el = document.createElement("div")
      el.textContent = `${d.state}: ${d.churnRisk}%`
      mapContainer.appendChild(el)
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
  function initDashboard() {
    // In a real application, you would fetch data from an API here
    // For this example, we're using the mock data
    const data = mockData
  
    updateKeyMetrics(data.keyMetrics)
    createCustomerStatusChart(data.customerStatus)
    createChurnRiskIncomeChart(data.churnRiskIncome)
    createSegmentsChurnChart(data.segmentsChurn)
    createChurnRiskMap(data.churnRiskByLocation)
    populateCustomerTable(data.customerData)
  }
  
  // Call the init function when the page loads
  window.addEventListener("load", initDashboard)
  
  // Function to simulate data updates (for demonstration purposes)
  function simulateDataUpdate() {
    // Simulate changes in the data
    mockData.keyMetrics.riskyCustomers += Math.floor(Math.random() * 10) - 5
    mockData.keyMetrics.riskyMRR += Math.floor(Math.random() * 1000) - 500
    mockData.keyMetrics.retentionRate += Math.random() * 2 - 1
    mockData.keyMetrics.totalMRR += Math.floor(Math.random() * 5000) - 2500
  
    // Update the dashboard with new data
    updateKeyMetrics(mockData.keyMetrics)
  
    // You could also update other charts and tables here
    // For simplicity, we're only updating the key metrics in this example
  }
  
  // Simulate real-time updates every 5 seconds
  setInterval(simulateDataUpdate, 5000)
  
  