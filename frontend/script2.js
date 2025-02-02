fetch("modified.csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").slice(1); // Skip header row
        const customers = rows.map(row => {
            const [customerID, gender, tenure, StreamingTV, StreamingMovies, PaymentMethod, MonthlyCharges, TotalCharges, Churn, ChurnProbability] = row.split(",");
            return { customerID, gender, tenure, StreamingTV, StreamingMovies, PaymentMethod, MonthlyCharges, TotalCharges, Churn, ChurnProbability };
        });
        console.log(customers); // Use the data in your app
    });