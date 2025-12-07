export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch("http://localhost:8000/readMeeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cmd: "all" }),
    });

    const data = await response.json();
    res.status(200).json(data); // { meetings: [...] }
  } catch (err) {
    console.error("Error in /api/get-meetings:", err);
    res.status(500).json({ meetings: [] });
  }
}
