export async function triggerSlackAlert() {
  await fetch('/api/trigger-notification', {
    method: 'POST',
    body: JSON.stringify({
      message: '🚨 Test Report: Inappropriate content detected in chat!',
    }),
  });
}

export async function sendTestModerationAlert() {
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trigger-notification`, {
    method: 'POST',
  });
}
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function saveReport(reported_user_id: string, reason: string) {
  const { error } = await supabase.from('reports').insert([{ reported_user_id, reason }]);
  if (error) throw error;
}
