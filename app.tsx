<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nasi Padang Express - Analytics Dashboard</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1400px;
            margin: 0 auto;
        }

        .logo {
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: #d32f2f;
        }

        .logo i {
            margin-right: 0.5rem;
            font-size: 2rem;
        }

        .header-stats {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        .header-stat {
            text-align: center;
        }

        .stat-value {
            font-size: 1.2rem;
            font-weight: bold;
            color: #d32f2f;
        }

        .stat-label {
            font-size: 0.8rem;
            color: #666;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
        }

        .card-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #f0f0f0;
        }

        .card-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .location-selector {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 0.5rem;
            font-size: 0.9rem;
            margin-left: auto;
        }

        .metric-card {
            text-align: center;
            padding: 2rem 1rem;
        }

        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            background: linear-gradient(45deg, #d32f2f, #ff5722);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .metric-label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 0.5rem;
        }

        .metric-change {
            font-size: 0.8rem;
            padding: 0.2rem 0.5rem;
            border-radius: 20px;
            font-weight: 500;
        }

        .positive {
            background: #e8f5e8;
            color: #2e7d32;
        }

        .negative {
            background: #ffebee;
            color: #c62828;
        }

        .chart-container {
            position: relative;
            height: 300px;
            margin-top: 1rem;
        }

        .table-container {
            overflow-x: auto;
            margin-top: 1rem;
        }

        .performance-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }

        .performance-table th,
        .performance-table td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }

        .performance-table th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        .performance-table tr:hover {
            background: #f8f9fa;
        }

        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .status-excellent {
            background: #e8f5e8;
            color: #2e7d32;
        }

        .status-good {
            background: #fff3e0;
            color: #f57c00;
        }

        .status-needs-attention {
            background: #ffebee;
            color: #c62828;
        }

        .alert-panel {
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
            border-left: 4px solid #d32f2f;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
        }

        .alert-title {
            font-weight: 600;
            color: #c62828;
            margin-bottom: 0.5rem;
        }

        .alert-list {
            list-style: none;
        }

        .alert-list li {
            padding: 0.25rem 0;
            color: #666;
        }

        .forecast-panel {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-left: 4px solid #1976d2;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
        }

        .mobile-menu {
            display: none;
        }

        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                gap: 1rem;
            }

            .header-stats {
                gap: 1rem;
            }

            .container {
                padding: 1rem;
            }

            .dashboard-grid {
                grid-template-columns: 1fr;
            }

            .card {
                padding: 1rem;
            }

            .metric-value {
                font-size: 2rem;
            }
        }

        .refresh-btn {
            background: linear-gradient(45deg, #d32f2f, #ff5722);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .refresh-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(211, 47, 47, 0.3);
        }

        .prediction-card {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border-left: 4px solid #9c27b0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <div class="logo">
                <i class="fas fa-utensils"></i>
                Nasi Padang Express Analytics
            </div>
            <div class="header-stats">
                <div class="header-stat">
                    <div class="stat-value" id="totalRevenue">Rp 45.2M</div>
                    <div class="stat-label">Today's Revenue</div>
                </div>
                <div class="header-stat">
                    <div class="stat-value" id="totalOrders">1,247</div>
                    <div class="stat-label">Total Orders</div>
                </div>
                <div class="header-stat">
                    <div class="stat-value" id="activeLocations">15</div>
                    <div class="stat-label">Active Locations</div>
                </div>
                <button class="refresh-btn" onclick="refreshDashboard()">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
            </div>
        </div>
    </div>

    <div class="container">
        <!-- Alert Panel -->
        <div class="alert-panel">
            <div class="alert-title"><i class="fas fa-exclamation-triangle"></i> Real-time Alerts</div>
            <ul class="alert-list" id="alertList">
                <li>• Kelapa Gading location: Low rendang stock (< 10 portions)</li>
                <li>• Surabaya Central: High food waste detected (15% above target)</li>
                <li>• Jakarta Pusat: Staff shortage for dinner rush (2 servers needed)</li>
            </ul>
        </div>

        <!-- Key Metrics -->
        <div class="dashboard-grid">
            <div class="card metric-card">
                <div class="metric-value" id="dailySales">Rp 3.2M</div>
                <div class="metric-label">Average Daily Sales per Location</div>
                <div class="metric-change positive">+12.5% vs yesterday</div>
            </div>
            
            <div class="card metric-card">
                <div class="metric-value" id="foodCostRatio">28.3%</div>
                <div class="metric-label">Food Cost Ratio</div>
                <div class="metric-change negative">+2.1% vs target</div>
            </div>
            
            <div class="card metric-card">
                <div class="metric-value" id="customerSatisfaction">4.6</div>
                <div class="metric-label">Customer Satisfaction</div>
                <div class="metric-change positive">+0.3 vs last week</div>
            </div>
            
            <div class="card metric-card">
                <div class="metric-value" id="wastePercentage">5.2%</div>
                <div class="metric-label">Food Waste</div>
                <div class="metric-change negative">+1.2% vs target</div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="dashboard-grid">
            <!-- Sales Performance Chart -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-chart-line"></i>
                        Sales Performance (Last 7 Days)
                    </div>
                    <select class="location-selector" id="salesLocationFilter">
                        <option value="all">All Locations</option>
                        <option value="jakarta">Jakarta (10 locations)</option>
                        <option value="surabaya">Surabaya (5 locations)</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="salesChart"></canvas>
                </div>
            </div>

            <!-- Menu Performance -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-star"></i>
                        Top Menu Items Today
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="menuChart"></canvas>
                </div>
            </div>

            <!-- Payment Methods -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-credit-card"></i>
                        Payment Methods Distribution
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="paymentChart"></canvas>
                </div>
            </div>

            <!-- Hourly Traffic -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-users"></i>
                        Customer Traffic Pattern
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="trafficChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Location Performance Table -->
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <i class="fas fa-map-marker-alt"></i>
                    Location Performance Summary
                </div>
            </div>
            <div class="table-container">
                <table class="performance-table">
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Today's Sales</th>
                            <th>Orders</th>
                            <th>Avg Order Value</th>
                            <th>Food Cost %</th>
                            <th>Staff Count</th>
                            <th>Customer Rating</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="locationTableBody">
                        <!-- Table content will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Predictive Analytics -->
        <div class="dashboard-grid">
            <div class="card prediction-card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-brain"></i>
                        AI Predictions & Recommendations
                    </div>
                </div>
                <div class="forecast-panel">
                    <div class="alert-title">Tomorrow's Forecast</div>
                    <ul class="alert-list">
                        <li>• Expected sales: Rp 48.5M (+7.3% vs today)</li>
                        <li>• Peak hours: 12:00-14:00 and 18:00-20:00</li>
                        <li>• Recommended staff: +3 servers for dinner rush</li>
                        <li>• High demand items: Rendang, Ayam Pop, Gulai</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-exclamation-circle"></i>
                        Inventory Alerts
                    </div>
                </div>
                <div id="inventoryAlerts">
                    <div style="padding: 1rem 0; border-bottom: 1px solid #eee;">
                        <strong>Jakarta Pusat:</strong> Rendang ingredients low (2 days supply)
                    </div>
                    <div style="padding: 1rem 0; border-bottom: 1px solid #eee;">
                        <strong>Surabaya Timur:</strong> Rice stock critical (1 day supply)
                    </div>
                    <div style="padding: 1rem 0;">
                        <strong>All locations:</strong> Coconut oil prices up 15% - consider bulk purchase
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Sample data for Indonesian restaurant chain
        const locationData = [
            { name: 'Jakarta Pusat', sales: 'Rp 4.2M', orders: 156, avg: 'Rp 26.9K', foodCost: '26.5%', staff: 8, rating: 4.7, status: 'excellent' },
            { name: 'Jakarta Selatan', sales: 'Rp 3.8M', orders: 142, avg: 'Rp 26.8K', foodCost: '28.1%', staff: 7, rating: 4.5, status: 'good' },
            { name: 'Jakarta Utara', sales: 'Rp 3.5M', orders: 134, avg: 'Rp 26.1K', foodCost: '29.2%', staff: 7, rating: 4.4, status: 'good' },
            { name: 'Jakarta Barat', sales: 'Rp 3.2M', orders: 128, avg: 'Rp 25.0K', foodCost: '30.5%', staff: 6, rating: 4.2, status: 'needs-attention' },
            { name: 'Jakarta Timur', sales: 'Rp 3.0M', orders: 118, avg: 'Rp 25.4K', foodCost: '31.2%', staff: 6, rating: 4.3, status: 'needs-attention' },
            { name: 'Kelapa Gading', sales: 'Rp 2.8M', orders: 112, avg: 'Rp 25.0K', foodCost: '32.1%', staff: 5, rating: 4.1, status: 'needs-attention' },
            { name: 'Kemang', sales: 'Rp 3.6M', orders: 138, avg: 'Rp 26.1K', foodCost: '27.8%', staff: 7, rating: 4.6, status: 'excellent' },
            { name: 'PIK', sales: 'Rp 3.9M', orders: 145, avg: 'Rp 26.9K', foodCost: '26.8%', staff: 8, rating: 4.8, status: 'excellent' },
            { name: 'Senayan', sales: 'Rp 4.1M', orders: 152, avg: 'Rp 27.0K', foodCost: '26.2%', staff: 8, rating: 4.7, status: 'excellent' },
            { name: 'Blok M', sales: 'Rp 3.4M', orders: 129, avg: 'Rp 26.4K', foodCost: '28.9%', staff: 7, rating: 4.4, status: 'good' },
            { name: 'Surabaya Pusat', sales: 'Rp 3.7M', orders: 141, avg: 'Rp 26.2K', foodCost: '27.5%', staff: 7, rating: 4.6, status: 'excellent' },
            { name: 'Surabaya Timur', sales: 'Rp 3.3M', orders: 125, avg: 'Rp 26.4K', foodCost: '29.1%', staff: 6, rating: 4.3, status: 'good' },
            { name: 'Surabaya Barat', sales: 'Rp 3.1M', orders: 121, avg: 'Rp 25.6K', foodCost: '30.2%', staff: 6, rating: 4.2, status: 'good' },
            { name: 'Surabaya Selatan', sales: 'Rp 2.9M', orders: 115, avg: 'Rp 25.2K', foodCost: '31.5%', staff: 5, rating: 4.0, status: 'needs-attention' },
            { name: 'Surabaya Utara', sales: 'Rp 3.5M', orders: 132, avg: 'Rp 26.5K', foodCost: '28.3%', staff: 7, rating: 4.5, status: 'good' }
        ];

        function initCharts() {
            // Sales Performance Chart
            const salesCtx = document.getElementById('salesChart').getContext('2d');
            new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Jakarta',
                        data: [38.5, 42.1, 39.8, 44.2, 46.1, 52.3, 48.7],
                        borderColor: '#d32f2f',
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Surabaya',
                        data: [16.2, 17.8, 16.9, 18.4, 19.1, 21.2, 20.1],
                        borderColor: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'Rp ' + value + 'M';
                                }
                            }
                        }
                    }
                }
            });

            // Menu Performance Chart
            const menuCtx = document.getElementById('menuChart').getContext('2d');
            new Chart(menuCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Rendang', 'Ayam Pop', 'Gulai Kambing', 'Ikan Bakar', 'Sayur Lodeh'],
                    datasets: [{
                        data: [28, 22, 18, 16, 16],
                        backgroundColor: [
                            '#d32f2f',
                            '#ff5722',
                            '#ff9800',
                            '#ffc107',
                            '#4caf50'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Payment Methods Chart
            const paymentCtx = document.getElementById('paymentChart').getContext('2d');
            new Chart(paymentCtx, {
                type: 'bar',
                data: {
                    labels: ['QRIS', 'GoPay', 'OVO', 'DANA', 'Cash', 'Credit Card'],
                    datasets: [{
                        label: 'Transactions',
                        data: [35, 28, 15, 12, 8, 2],
                        backgroundColor: [
                            '#4caf50',
                            '#00bcd4',
                            '#9c27b0',
                            '#ff5722',
                            '#795548',
                            '#607d8b'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });

            // Traffic Pattern Chart
            const trafficCtx = document.getElementById('trafficChart').getContext('2d');
            new Chart(trafficCtx, {
                type: 'line',
                data: {
                    labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                    datasets: [{
                        label: 'Customer Count',
                        data: [12, 25, 45, 156, 89, 67, 134, 98, 34],
                        borderColor: '#ff5722',
                        backgroundColor: 'rgba(255, 87, 34, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        function populateLocationTable() {
            const tableBody = document.getElementById('locationTableBody');
            tableBody.innerHTML = '';

            locationData.forEach(location => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td><strong>${location.name}</strong></td>
                    <td>${location.sales}</td>
                    <td>${location.orders}</td>
                    <td>${location.avg}</td>
                    <td>${location.foodCost}</td>
                    <td>${location.staff}</td>
                    <td>${location.rating}/5.0</td>
                    <td><span class="status-badge status-${location.status}">${location.status.replace('-', ' ')}</span></td>
                `;
            });
        }

        function refreshDashboard() {
            // Simulate real-time data updates
            const refreshBtn = document.querySelector('.refresh-btn');
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
            
            setTimeout(() => {
                // Update header stats with random variations
                const currentRevenue = parseFloat(document.getElementById('totalRevenue').textContent.replace(/[^\d.]/g, ''));
                const currentOrders = parseInt(document.getElementById('totalOrders').textContent.replace(/[^\d]/g, ''));
                
                document.getElementById('totalRevenue').textContent = 
                    'Rp ' + (currentRevenue + (Math.random() - 0.5) * 2).toFixed(1) + 'M';
                document.getElementById('totalOrders').textContent = 
                    currentOrders + Math.floor((Math.random() - 0.5) * 50);

                // Update alerts
                const alertList = document.getElementById('alertList');
                const alerts = [
                    '• PIK location: Rendang selling faster than expected (+25% vs forecast)',
                    '• Surabaya Pusat: Customer satisfaction dropped to 4.1 (investigate)',
                    '• Jakarta Timur: Kitchen equipment maintenance due tomorrow',
                    '• Blok M: High GoPay transaction volume today (+40%)',
                    '• Kemang: Staff overtime alert (2 hours above schedule)'
                ];
                
                alertList.innerHTML = alerts.slice(0, 3).map(alert => `<li>${alert}</li>`).join('');
                
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            }, 2000);
        }

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', function() {
            initCharts();
            populateLocationTable();
            
            // Auto-refresh every 5 minutes
            setInterval(refreshDashboard, 300000);
        });

        // Location filter functionality
        document.getElementById('salesLocationFilter').addEventListener('change', function() {
            // In a real implementation, this would filter the chart data
            console.log('Filter changed to:', this.value);
        });

        // Mobile responsiveness
        window.addEventListener('resize', function() {
            // Charts auto-resize, but you might want to adjust layouts here
        });

        // Simulated real-time updates
        setInterval(() => {
            // Update random metrics slightly
            const metrics = ['dailySales', 'foodCostRatio', 'customerSatisfaction', 'wastePercentage'];
            const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
            const element = document.getElementById(randomMetric);
            
            if (element && Math.random() > 0.8) { // 20% chance of update
                // Add subtle animation to show live updates
                element.style.transform = 'scale(1.05)';
                element.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }
        }, 10000); // Check every 10 seconds
    </script>
</body>
</html>
