import { API_ENDPOINTS } from "../CONFIGJS.js";

export async function initSalesReport() {
  const generateSalesReport = document.querySelector(".generate-report-btn");
  
  if (!generateSalesReport) {
    console.warn("Sales report button not found");
    return;
  }

  generateSalesReport.addEventListener("click", async () => {
    try {
      generateSalesReport.disabled = true;
      generateSalesReport.innerHTML = '<span class="action-icon">⏳</span> Generating...';
      
      const response = await fetch(`${API_ENDPOINTS.salesReport}`);
      const data = await response.json();
      
      if (data.success) {
        downloadSalesReportCSV(data);
        
        generateSalesReport.disabled = false;
        generateSalesReport.innerHTML = '<span class="action-icon">📊</span> Generate Sales Report';
        
        alert(`✅ Sales Report Downloaded!\n\nTotal Orders: ${data.summary.total_orders}`);
      } else {
        throw new Error(data.error || 'Failed to generate report');
      }
    } catch (error) {
      console.error("Error generating report:", error);
      alert("❌ Failed to generate sales report. Please try again.");
      
      generateSalesReport.disabled = false;
      generateSalesReport.innerHTML = '<span class="action-icon">📊</span> Generate Sales Report';
    }
  });
}

function downloadSalesReportCSV(data) {
  const headers = ['Order ID', 'Items Ordered', 'Date & Time'];
  
  const rows = data.orders.map(order => [
    `#${order.id}`,
    `"${order.items}"`,
    order.date
  ]);
  
  const summaryRows = [
    ['SALES REPORT SUMMARY'],
    ['Period', `${data.summary.start_date} to ${data.summary.end_date}`],
    ['Total Orders', data.summary.total_orders],
    [],
    headers
  ];
  
  const allRows = [...summaryRows, ...rows];
  const csvContent = allRows.map(row => row.join(',')).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Sales_Report_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
}