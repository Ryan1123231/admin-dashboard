import type { NextApiRequest, NextApiResponse } from 'next';
import { saveReport } from '@/lib/supabase/reports';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'https://id-preview--e30e7c1e-483c-4c6b-bcbf-ee65d458fab1.lovable.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin');

  if (req.method === 'OPTIONS') {
    // Preflight request must end here with CORS headers
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { reported_user_id, reason } = req.body;

    if (!reported_user_id || !reason) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      await saveReport(reported_user_id, reason);
      return res.status(200).json({ message: 'Report saved successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save report' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
