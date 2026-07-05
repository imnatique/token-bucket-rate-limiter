export async function search(req, res) {
  const { q } = req.query;

  res.json({
    success: true,
    query: q || "",
    results: [
      {
        id: 1,
        name: "Demo Product 1",
      },
      {
        id: 2,
        name: "Demo Product 2",
      },
    ],
    timestamp: new Date().toISOString(),
  });
}
