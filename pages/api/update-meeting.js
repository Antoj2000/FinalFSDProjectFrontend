export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch("http://localhost:8000/updateMeeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json(); // { response: "success" | "fail" }
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in /api/update-meeting:", err);
    res.status(500).json({ response: "fail" });
  }
}
