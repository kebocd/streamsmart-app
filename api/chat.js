// This is your secure backend that talks to Claude
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, userInfo } = req.body;
    
    // Get API key from environment variable (secure!)
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Create the system prompt with user info
    const systemPrompt = `You are StreamSmart AI, a helpful assistant that helps users find the best streaming service deals.

User Information:
- Zip Code: ${userInfo.zipCode}
- Internet Provider: ${userInfo.internetProvider}
- Current Services: ${userInfo.currentServices.join(', ') || 'None'}

Your job is to:
1. Check if their internet provider includes free streaming services
2. Recommend bundles that could save them money
3. Suggest credit card perks they might have
4. Help them find where to watch specific shows
5. Analyze if they're overpaying for any services

Be personalized, helpful, and focus on saving them money. Always mention specific dollar amounts for savings when possible.`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: query
          }
        ],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return res.status(response.status).json({ error: 'Failed to get response from Claude' });
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}