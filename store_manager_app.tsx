<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NPE Store Manager</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding-bottom: 80px;
        }

        .app-header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .store-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .store-name {
            font-weight: bold;
            color: #d32f2f;
        }

        .store-status {
            font-size: 0.8rem;
            color: #4caf50;
        }

        .notification-btn {
            position: relative;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #666;
            cursor: pointer;
        }

        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #d32f2f;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .quick-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            padding: 1rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1rem;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #d32f2f;
            margin-bottom: 0.25rem;
        }

        .stat-label {
            font-size: 0.8rem;
            color: #666;
        }

        .stat-change {
            font-size: 0.7rem;
            margin-top: 0.25rem;
        }

        .positive { color: #4caf50; }
        .negative { color: #f44336; }

        .main-content {
            padding: 0 1rem;
        }

        .section {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            margin-bottom: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .section-header {
            background: linear-gradient(45deg, #d32f2f, #ff5722);
            color: white;
            padding: 1rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .section-content {
            padding: 1rem;
        }

        .alert-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-bottom: 1px solid #f0f0f0;
            gap: 0.75rem;
        }

        .alert-item:last-child {
            border-bottom: none;
        }

        .alert-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.1rem;
        }

        .alert-critical { background: #f44336; }
        .alert-warning { background: #ff9800; }
        .alert-info { background: #2196f3; }

        .alert-content {
            flex: 1;
        }

        .alert-title {
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }

        .alert-time {
            font-size: 0.7rem;
            color: #666;
        }

        .quick-actions {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
            padding: 1rem;
        }

        .action-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .action-btn:hover, .action-btn:active {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .action-btn i {
            font-size: 1.5rem;
        }

        .action-btn span {
            font-size: 0.8rem;
            font-weight: 500;
        }

        .staff-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .staff-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .staff-info {
            display: flex;
            flex-direction: column;
        }

        .staff-name {
            font-weight: 600;
            font-size: 0.9rem;
        }

        .staff-role {
            font-size: 0.7rem;
            color: #666;
        }

        .staff-status {
            padding: 0.25rem 0.5rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 500;
        }

        .status-working { background: #e8f5e8; color: #2e7d32; }
        .status-break { background: #fff3e0; color: #f57c00; }
        .status-overtime { background: #ffebee; color: #c62828; }

        .inventory-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            border-bottom: 1px solid #f0f0f0;
        }

        .inventory-item:last-child {
            border-bottom: none;
        }

        .item-info {
            flex: 1;
        }

        .item-name {
            font-weight: 600;
            font-size: 0.9rem;
        }

        .item-category {
            font-size: 0.7rem;
            color: #666;
        }

        .stock-level {
            text-align: right;
        }

        .stock-count {
            font-weight: bold;
            font-size: 0.9rem;
        }

        .stock-status {
            font-size: 0.7rem;
            margin-top: 0.25rem;
        }

        .stock-critical { color: #f44336; }
        .stock-low { color: #ff9800; }
        .stock-good { color: #4caf50; }

        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: space-around;
            padding: 0.75rem 0;
            box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #666;
            transition: color 0.3s ease;
        }

        .nav-item.active {
            color: #d32f2f;
        }

        .nav-item i {
            font-size: 1.2rem;
            margin-bottom: 0.25rem;
        }

        .nav-item span {
            font-size: 0.7rem;
        }

        .chart-container {
            height: 200px;
            margin: 1rem 0;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            justify-content: center;
            align-items: center;
            padding: 1rem;
        }

        .modal.show {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            max-width: 400px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #f0f0f0;
        }

        .modal-title {
            font-weight: bold;
            color: #d32f2f;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #666;
            cursor: pointer;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
        }

        .form-input:focus {
            outline: none;
            border-color: #d32f2f;
        }

        .submit-btn {
            background: linear-gradient(45deg, #d32f2f, #ff5722);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            cursor: pointer;
            width: 100%;
        }

        .camera-btn {
            background: #4caf50;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.5rem 1rem;
            cursor: pointer;
            margin-top: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="app-header">
        <div class="header-content">
            <div class="store-info">
                <div>
                    <div class="store-name">Jakarta Pusat</div>
                    <div class="store-status">● Online • 8 staff active</div>
                </div>
            </div>
            <button class="notification-btn" onclick="showNotifications()">
                <i class="fas fa-bell"></i>
                <span class="notification-badge">3</span>
            </button>
        </div>
    </div>

    <div class="quick-stats">
        <div class="stat-card">
            <div class="stat-value">Rp 4.2M</div>
            <div class="stat-label">Today's Sales</div>
            <div class="stat-change positive">+12.5% vs yesterday</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">156</div>
            <div class="stat-label">Orders Today</div>
            <div class="stat-change positive">+8 vs target</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">4.7</div>
            <div class="stat-label">Customer Rating</div>
            <div class="stat-change positive">+0.2 vs last week</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">26.5%</div>
            <div class="stat-label">Food Cost</div>
            <div class="stat-change negative">+1.5% vs target</div>
        </div>
    </div>

    <div class="main-content">
        <!-- Alerts Section -->
        <div class="section">
            <div class="section-header">
                <i class="fas fa-exclamation-triangle"></i>
                Priority Alerts
            </div>
            <div class="section-content">
                <div class="alert-item">
                    <div class="alert-icon alert-critical">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Rendang stock low (8 portions left)</div>
                        <div class="alert-time">5 minutes ago</div>
                    </div>
                </div>
                <div class="alert-item">
                    <div class="alert-icon alert-warning">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Dinner rush in 2 hours - need 1 more server</div>
                        <div class="alert-time">15 minutes ago</div>
                    </div>
                </div>
                <div class="alert-item">
                    <div class="alert-icon alert-info">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">New customer review (4 stars)</div>
                        <div class="alert-time">30 minutes ago</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="section">
            <div class="section-header">
                <i class="fas fa-bolt"></i>
                Quick Actions
            </div>
            <div class="quick-actions">
                <button class="action-btn" onclick="reportWaste()">
                    <i class="fas fa-trash-alt"></i>
                    <span>Report Waste</span>
                </button>
                <button class="action-btn" onclick="updateInventory()">
                    <i class="fas fa-boxes"></i>
                    <span>Update Stock</span>
                </button>
                <button class="action-btn" onclick="callSupport()">
                    <i class="fas fa-phone"></i>
                    <span>Call HQ</span>
                </button>
                <button class="action-btn" onclick="scheduleStaff()">
                    <i class="fas fa-calendar"></i>
                    <span>Schedule</span>
                </button>
            </div>
        </div>

        <!-- Staff Status -->
        <div class="section">
            <div class="section-header">
                <i class="fas fa-users"></i>
                Staff Status (8 active)
            </div>
            <div class="section-content">
                <div class="staff-list">
                    <div class="staff-item">
                        <div class="staff-info">
                            <div class="staff-name">Budi Santoso</div>
                            <div class="staff-role">Kitchen Manager</div>
                        </div>
                        <div class="staff-status status-working">Working</div>
                    </div>
                    <div class="staff-item">
                        <div class="staff-info">
                            <div class="staff-name">Sari Dewi</div>
                            <div class="staff-role">Server</div>
                        </div>
                        <div class="staff-status status-break">Break</div>
                    </div>
                    <div class="staff-item">
                        <div class="staff-info">
                            <div class="staff-name">Ahmad Rahman</div>
                            <div class="staff-role">Cashier</div>
                        </div>
                        <div class="staff-status status-working">Working</div>
                    </div>
                    <div class="staff-item">
                        <div class="staff-info">
                            <div class="staff-name">Maya Lestari</div>
                            <div class="staff-role">Server</div>
                        </div>
                        <div class="staff-status status-overtime">Overtime</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Critical Inventory -->
        <div class="section">
            <div class="section-header">
                <i class="fas fa-exclamation-circle"></i>
                Critical Inventory
            </div>
            <div class="section-content">
                <div class="inventory-item">
                    <div class="item-info">
                        <div class="item-name">Rendang (Beef)</div>
                        <div class="item-category">Main Dish</div>
                    </div>
                    <div class="stock-level">
                        <div class="stock-count">8 portions</div>
                        <div class="stock-status stock-critical">Critical</div>
                    </div>
                </div>
                <div class="inventory-item">
                    <div class="item-info">
                        <div class="item-name">Rice</div>
                        <div class="item-category">Staple</div>
                    </div>
                    <div class="stock-level">
                        <div class="stock-count">2.5 kg</div>
                        <div class="stock-status stock-low">Low</div>
                    </div>
                </div>
                <div class="inventory-item">
                    <div class="item-info">
                        <div class="item-name">Coconut Oil</div>
                        <div class="item-category">Cooking Oil</div>
                    </div>
                    <div class="stock-level">
                        <div class="stock-count">1.2 L</div>
                        <div class="stock-status stock-low">Low</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sales Chart -->
        <div class="section">
            <div class="section-header">
                <i class="fas fa-chart-line"></i>
                Today's Sales Pattern
            </div>
            <div class="section-content">
                <div class="chart-container">
                    <canvas id="salesPatternChart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
        <a href="#" class="nav-item active">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-chart-bar"></i>
            <span>Analytics</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-boxes"></i>
            <span>Inventory</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-users"></i>
            <span>Staff</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </a>
    </div>

    <!-- Waste Report Modal -->
    <div class="modal" id="wasteModal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">Report Food Waste</div>
                <button class="close-btn" onclick="closeModal('wasteModal')">×</button>
            </div>
            <form id="wasteForm">
                <div class="form-group">
                    <label class="form-label">Menu Item</label>
                    <select class="form-input" required>
                        <option value="">Select item...</option>
                        <option value="rendang">Rendang</option>
                        <option value="ayam-pop">Ayam Pop</option>
                        <option value="gulai">Gulai Kambing</option>
                        <option value="ikan-bakar">Ikan Bakar</option>
                        <option value="sayur-lodeh">Sayur Lodeh</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Quantity Wasted</label>
                    <input type="number" class="form-input" placeholder="Enter quantity" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Reason</label>
                    <select class="form-input" required>
                        <option value="">Select reason...</option>
                        <option value="overcooked">Overcooked</option>
                        <option value="expired">Expired</option>
                        <option value="customer-return">Customer Return</option>
                        <option value="preparation-error">Preparation Error</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Photo Evidence</label>
                    <button type="button" class="camera-btn" onclick="takePhoto()">
                        <i class="fas fa-camera"></i> Take Photo
                    </button>
                </div>
                <button type="submit" class="submit-btn">Submit Report</button>
            </form>
        </div>
    </div>

    <!-- Inventory Update Modal -->
    <div class="modal" id="inventoryModal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">Update Inventory</div>
                <button class="close-btn" onclick="closeModal('inventoryModal')">×</button>
            </div>
            <form id="inventoryForm">
                <div class="form-group">
                    <label class="form-label">Item</label>
                    <select class="form-input" required>
                        <option value="">Select item...</option>
                        <option value="rendang">Rendang (portions)</option>
                        <option value="rice">Rice (kg)</option>
                        <option value="coconut-oil">Coconut Oil (L)</option>
                        <option value="beef">Raw Beef (kg)</option>
                        <option value="vegetables">Vegetables (kg)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Current Stock Count</label>
                    <input type="number" class="form-input" placeholder="Enter current count" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Notes (Optional)</label>
                    <input type="text" class="form-input" placeholder="Any notes about the stock...">
                </div>
                <button type="submit" class="submit-btn">Update Stock</button>
            </form>
        </div>
    </div>

    <script>
        // Initialize sales pattern chart
        function initSalesChart() {
            const ctx = document.getElementById('salesPatternChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                    datasets: [{
                        label: 'Sales (Rp)',
                        data: [150000, 280000, 520000, 1200000, 850000, 620000, 1100000, 890000, 320000],
                        borderColor: '#d32f2f',
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
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
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'Rp ' + (value / 1000) + 'K';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Modal functions
        function reportWaste() {
            document.getElementById('wasteModal').classList.add('show');
        }

        function updateInventory() {
            document.getElementById('inventoryModal').classList.add('show');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('show');
        }

        function callSupport() {
            if (confirm('Call Nasi Padang Express HQ?\n+62 21 5555-0123')) {
                window.location.href = 'tel:+62215555123';
            }
        }

        function scheduleStaff() {
            alert('Opening staff scheduling... (would integrate with calendar system)');
        }

        function takePhoto() {
            // In a real app, this would access the camera
            alert('Camera opened for waste documentation (would use device camera)');
        }

        function showNotifications() {
            alert('Notifications:\n• Low stock alert: Rendang\n• Staff break reminder: Sari\n• Customer feedback received');
        }

        // Form submissions
        document.getElementById('wasteForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Waste report submitted successfully!');
            closeModal('wasteModal');
            this.reset();
        });

        document.getElementById('inventoryForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Inventory updated successfully!');
            closeModal('inventoryModal');
            this.reset();
        });

        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            initSalesChart();
            
            // Simulate real-time updates
            setInterval(() => {
                // Update notification badge
                const badge = document.querySelector('.notification-badge');
                const currentCount = parseInt(badge.textContent);
                if (Math.random() > 0.9) { // 10% chance
                    badge.textContent = currentCount + 1;
                }
                
                // Animate stat values slightly
                const statValues = document.querySelectorAll('.stat-value');
                statValues.forEach(stat => {
                    if (Math.random() > 0.95) { // 5% chance
                        stat.style.transform = 'scale(1.05)';
                        stat.style.transition = 'transform 0.3s ease';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 300);
                    }
                });
            }, 5000);
        });

        // Handle clicks outside modals
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
            }
        });

        // Prevent modal content clicks from closing modal
        document.querySelectorAll('.modal-content').forEach(content => {
            content.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    </script>
</body>
</html>
