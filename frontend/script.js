// Fetch data from server and update dashboard
async function fetchData() {
	try {
		const response = await fetch("/data");
		const data = await response.json();
		updateKeyMetrics(data);
		createCustomerStatusChart(data);
		createChurnRiskIncomeChart(data);
		createSegmentsChurnChart(data);
		createChurnRiskMap(data);
		populateCustomerTable(data);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

// Function to update key metrics
function updateKeyMetrics(data) {
	const churnedCustomers = data.filter((d) => d.Churn === "Yes").length;
	const totalCustomers = data.length;
	const totalRevenue = data.reduce(
		(sum, d) => sum + parseFloat(d.TotalCharges || 0),
		0,
	);
	const avgMonthlyCharge = (totalRevenue / totalCustomers).toFixed(2);

	document.getElementById("riskyCustomers").textContent = churnedCustomers;
	document.getElementById("riskyMRR").textContent = `$${avgMonthlyCharge}`;
	document.getElementById("retentionRate").textContent =
		`${(((totalCustomers - churnedCustomers) / totalCustomers) * 100).toFixed(2)}%`;
	document.getElementById("totalMRR").textContent =
		`$${totalRevenue.toLocaleString()}`;
}

// Function to create Customer Status Chart
function createCustomerStatusChart(data) {
	const tenureGroups = {};
	data.forEach((d) => {
		const tenure = Math.floor(d.tenure / 6) * 6; // Grouping by 6-month intervals
		if (!tenureGroups[tenure]) {
			tenureGroups[tenure] = { Active: 0, New: 0, Churned: 0 };
		}
		if (d.Churn === "Yes") {
			tenureGroups[tenure].Churned++;
		} else {
			tenureGroups[tenure].Active++;
		}
	});

	const chartData = Object.keys(tenureGroups).map((key) => ({
		month: `${key}-${parseInt(key) + 6} months`,
		Active: tenureGroups[key].Active,
		New: tenureGroups[key].New,
		Churned: tenureGroups[key].Churned,
	}));

	const ctx = document.getElementById("customerStatusChart").getContext("2d");
	new Chart(ctx, {
		type: "bar",
		data: {
			labels: chartData.map((d) => d.month),
			datasets: ["Active", "New", "Churned"].map((status) => ({
				label: status,
				data: chartData.map((d) => d[status]),
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
	});
}

// Function to create Churn Risk by Monthly Charges Chart
function createChurnRiskIncomeChart(data) {
	const incomeGroups = {};

	data.forEach((d) => {
		const monthlyCharge = parseFloat(d.MonthlyCharges);
		const churnProbability = parseFloat(d["Churn Probability"]) || 0; // Ensure valid number

		// Grouping by $20 ranges (0-19, 20-39, 40-59, etc.)
		const lowerBound = Math.floor(monthlyCharge / 20) * 20;
		const upperBound = lowerBound + 19;
		const range = `${lowerBound}-${upperBound}`;

		if (!incomeGroups[range]) {
			incomeGroups[range] = { churnRisk: 0, count: 0 };
		}

		incomeGroups[range].churnRisk += churnProbability;
		incomeGroups[range].count++;
	});

	// Convert object to sorted array based on numeric lower bound
	const chartData = Object.keys(incomeGroups)
		.map((key) => ({
			income: key,
			churnRisk:
				incomeGroups[key].count > 0
					? (
							(incomeGroups[key].churnRisk /
								incomeGroups[key].count) *
							100
						).toFixed(2) // Convert to percentage
					: "0",
		}))
		.sort(
			(a, b) =>
				parseInt(a.income.split("-")[0]) -
				parseInt(b.income.split("-")[0]),
		); // Sort numerically

	// Draw Chart
	const ctx = document
		.getElementById("churnRiskIncomeChart")
		.getContext("2d");
	new Chart(ctx, {
		type: "bar",
		data: {
			labels: chartData.map((d) => d.income),
			datasets: [
				{
					label: "Churn Risk %",
					data: chartData.map((d) => parseFloat(d.churnRisk)), // Convert string to float
					backgroundColor: "rgba(75, 192, 192, 0.6)",
				},
			],
		},
		options: {
			responsive: true,
			scales: { y: { beginAtZero: true, max: 100 } }, // Scale max to 100%
		},
	});
}

// Function to populate Customer Data Table

// Helper function to get colors for chart
function getColor(status) {
	const colors = {
		Active: "rgba(75, 192, 192, 0.6)",
		New: "rgba(54, 162, 235, 0.6)",
		Churned: "rgba(255, 99, 132, 0.6)",
	};
	return colors[status] || "rgba(0, 0, 0, 0.6)";
}

// Initialize dashboard
window.addEventListener("load", fetchData);

// Fetch and update data every 5 seconds
setInterval(fetchData, 5000);
