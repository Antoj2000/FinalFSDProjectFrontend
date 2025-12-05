async function handler(req, res){
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const response = await fetch('http://localhost:8000/deleteMeeting', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    res.status(200).json(data);
}

export default handler;