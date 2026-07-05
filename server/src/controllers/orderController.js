export async function getOrders(req, res) {
  res.json({
    success: true,
    orders: [
      {
        id: 101,
        item: "Laptop",
        status: "Delivered",
      },
      {
        id: 102,
        item: "Mouse",
        status: "Shipped",
      },
    ],
    timestamp: new Date().toISOString(),
  });
}
