export async function login(req, res) {
  const { email } = req.body;

  res.json({
    success: true,
    message: "Login successful.",
    user: {
      id: 1,
      email: email || "demo@example.com",
    },
    timestamp: new Date().toISOString(),
  });
}
