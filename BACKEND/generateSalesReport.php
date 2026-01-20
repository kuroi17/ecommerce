<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config.php';

try {
    $startDate = isset($_GET['start_date']) ? $_GET['start_date'] : date('Y-m-d', strtotime('-30 days'));
    $endDate = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
    
    // Fetch all orders within date range
    $stmt = $pdo->prepare("
        SELECT 
            ID,
            cart,
            created_at
        FROM orders 
        WHERE DATE(created_at) BETWEEN ? AND ?
        ORDER BY created_at DESC
    ");
    
    $stmt->execute([$startDate, $endDate]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $totalOrders = count($orders);
    $formattedOrders = [];
    
    foreach ($orders as $order) {
        $cartItems = json_decode($order['cart'], true);
        $itemsList = [];
        
        foreach ($cartItems as $item) {
            $itemsList[] = $item['menuDataId'] . ' (x' . $item['quantity'] . ')';
        }
        
        $formattedOrders[] = [
            'id' => $order['ID'],
            'items' => implode(', ', $itemsList),
            'date' => date('M d, Y h:i A', strtotime($order['created_at']))
        ];
    }
    
    echo json_encode([
        'success' => true,
        'summary' => [
            'total_orders' => $totalOrders,
            'start_date' => date('M d, Y', strtotime($startDate)),
            'end_date' => date('M d, Y', strtotime($endDate))
        ],
        'orders' => $formattedOrders
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>