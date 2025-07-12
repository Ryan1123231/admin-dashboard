export async function OPTIONS() {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin',
      },
    });
  }
  
  export async function POST(req: Request) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin',
    };
  
    try {
      const body = await req.json();
      const { reported_user_id, reason } = body;
  
      if (!reported_user_id || !reason) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), {
          status: 400,
          headers,
        });
      }
  
      // You can save to DB or send to Slack here
      console.log('New Report:', { reported_user_id, reason });
  
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error('Error handling report:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers,
      });
    }
  }
  