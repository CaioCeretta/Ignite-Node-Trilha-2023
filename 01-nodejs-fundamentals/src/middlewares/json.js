export async function json(req, res)  {
  const buffers = []
  
  // Loop through each chunk of the request body and push it into an array
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  
  try {
    // Concatenate all the buffers and convert it to a string, then parse it as JSON
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    // If parsing fails, set req.body to null

    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}

