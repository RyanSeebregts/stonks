// -----------
// PAGE EVENTS
// -----------

/**
 * Main function that sets up the page on load.
 */
async function pageLoad() {

	// Load the page icons using feather icons.
	feather.replace();

	// Query the latest sales data.
	const data = await loadSalesData();

	// Render the sales in chart and table format.
	renderSalesTable(data);
	renderSalesChart(data);
};

// ---------
// API CALLS
// ---------

/**
 * Load the latest sales data from the server.
 */
async function loadSalesData() {

	const response = await fetch('./api/orders');
	const data = await response.json();

	return data;
}

// --------------
// RENDER HELPERS
// --------------

function renderSalesTable(data) {

	const salesTable = document.getElementById('salesTable');
	let html = '';

	for(const item of data) {

		html += `
			<tr>
				<td>${item.orderno}</td>
				<td>${moment(item.date).format('ddd Do MMM - HH:mm')}</td>
				<td>${Number(item.amount).toFixed(2)}</td>
				<td>${item.status}</td>
			</tr>
		`;
	}

	salesTable.innerHTML = html;
}

function renderSalesChart(data) {

	// Group together the daily sales total amounts by date.
	let summary = {};

	for(const item of data) {

		const key = moment(item.date).format('ddd Do MMM');

		if(!summary[key]) {
			summary[key] = item.amount;
		} else {
			summary[key] = summary[key] + item.amount;
		}
	}

	// Extract the aggregated daily sales summary from the data.
	let chartLabels = [];
	let chartValues = [];

	for(let key of Object.keys(summary)) {
		chartLabels.push(key);
		chartValues.push(summary[key]);
	}

	// Render the aggregated sales data using ChartJS.
	var ctx = document.getElementById('salesChart');

	var salesChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: chartLabels,
			datasets: [{
				data: chartValues,
				lineTension: 0,
				backgroundColor: 'transparent',
				borderColor: '#007bff',
				borderWidth: 4,
				pointBackgroundColor: '#007bff'
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: false
					}
				}]
			},
			legend: {
				display: false
			}
		}
	})
}

// -----------
// PAGE EVENTS
// -----------

window.onload = pageLoad;