// Sample Data
const customers = {
  high: [
    { name: "John Doe", plan: "Premium", lastActive: "2023-10-01", riskScore: 85, logins: 2, purchases: 1, feedback: "Negative", churnProbability: 80 },
    { name: "Jane Smith", plan: "Basic", lastActive: "2023-09-25", riskScore: 90, logins: 1, purchases: 0, feedback: "Neutral", churnProbability: 85 }
  ],
  medium: [
    { name: "Alice Johnson", plan: "Standard", lastActive: "2023-10-05", riskScore: 65, logins: 5, purchases: 3, feedback: "Positive", churnProbability: 50 }
  ],
  low: [
    { name: "Bob Brown", plan: "Premium", lastActive: "2023-10-10", riskScore: 30, logins: 10, purchases: 8, feedback: "Positive", churnProbability: 20 }
  ]
};

// DOM Elements
const buckets = document.querySelectorAll('.bucket');
const customerList = document.getElementById('customer-list');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const detailsSection = document.getElementById('details');

// Initialize Bucket Counts
function updateBucketCounts() {
  document.querySelector('.high-risk .count').textContent = `${customers.high.length} Customers`;
  document.querySelector('.medium-risk .count').textContent = `${customers.medium.length} Customers`;
  document.querySelector('.low-risk .count').textContent = `${customers.low.length} Customers`;
}

// Render Customer List
function renderCustomerList(riskLevel) {
  customerList.innerHTML = '';
  customers[riskLevel].forEach(customer => {
    const li = document.createElement('li');
    li.textContent = customer.name;
    li.addEventListener('click', () => renderCustomerDetails(customer));
    customerList.appendChild(li);
  });
}

// Render Customer Details
function renderCustomerDetails(customer) {
  detailsSection.innerHTML = `
    <p><strong>Name:</strong> ${customer.name}</p>
    <p><strong>Subscription Plan:</strong> ${customer.plan}</p>
    <p><strong>Last Active Date:</strong> ${customer.lastActive}</p>
    <p><strong>Risk Score:</strong> ${customer.riskScore}</p>
    <p><strong>Login Frequency:</strong> ${customer.logins}</p>
    <p><strong>Purchase History:</strong> ${customer.purchases}</p>
    <p><strong>Feedback:</strong> ${customer.feedback}</p>
    <p><strong>Churn Probability:</strong> <progress value="${customer.churnProbability}" max="100"></progress> ${customer.churnProbability}%</p>
  `;
}

// Event Listeners
buckets.forEach(bucket => {
  bucket.addEventListener('click', () => {
    const riskLevel = bucket.getAttribute('data-risk');
    renderCustomerList(riskLevel);
  });
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCustomers = customers.high.concat(customers.medium, customers.low).filter(customer => customer.name.toLowerCase().includes(searchTerm));
  customerList.innerHTML = '';
  filteredCustomers.forEach(customer => {
    const li = document.createElement('li');
    li.textContent = customer.name;
    li.addEventListener('click', () => renderCustomerDetails(customer));
    customerList.appendChild(li);
  });
});

sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value;
  const sortedCustomers = customers.high.concat(customers.medium, customers.low).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'risk') return b.riskScore - a.riskScore;
  });
  customerList.innerHTML = '';
  sortedCustomers.forEach(customer => {
    const li = document.createElement('li');
    li.textContent = customer.name;
    li.addEventListener('click', () => renderCustomerDetails(customer));
    customerList.appendChild(li);
  });
});

// Initial Load
updateBucketCounts();