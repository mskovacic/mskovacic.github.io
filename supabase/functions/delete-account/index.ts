import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}

Deno.serve(async (request) => {
    if (request.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed.' }, 405);
    }

    const authorization = request.headers.get('Authorization');
    const accessToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!accessToken) {
        return jsonResponse({ error: 'Authentication is required.' }, 401);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const publishableKey = Deno.env.get('SUPABASE_ANON_KEY');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !publishableKey || !serviceRoleKey) {
        return jsonResponse({ error: 'Account deletion is not configured on the server.' }, 500);
    }

    const userClient = createClient(supabaseUrl, publishableKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser(accessToken);
    if (userError || !user) {
        return jsonResponse({ error: 'Your session is no longer valid. Sign in again and retry.' }, 401);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);
    if (deleteError) {
        return jsonResponse({ error: deleteError.message || 'The account could not be deleted.' }, 400);
    }

    return jsonResponse({ success: true });
});
