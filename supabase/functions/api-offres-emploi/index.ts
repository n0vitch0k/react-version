Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const url = new URL(req.url);
        const pathId = url.pathname.split('/').pop();
        
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Si un ID est présent dans l'URL (ex: /api-offres-emploi/5)
        if (pathId && pathId !== 'api-offres-emploi' && !isNaN(Number(pathId))) {
            const offreId = Number(pathId);
            
            const response = await fetch(`${supabaseUrl}/rest/v1/offres_emploi?id=eq.${offreId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch offre');
            }

            const data = await response.json();
            
            if (data.length === 0) {
                return new Response(JSON.stringify({ detail: 'Not found.' }), {
                    status: 404,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify(data[0]), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Sinon, récupérer toutes les offres avec filtres optionnels
        const searchParams = url.searchParams;
        const lieu = searchParams.get('lieu');
        const type_contrat = searchParams.get('type_contrat');
        const metier = searchParams.get('metier');
        const salaire_min = searchParams.get('salaire_min');
        const salaire_max = searchParams.get('salaire_max');
        const search = searchParams.get('search');

        let queryUrl = `${supabaseUrl}/rest/v1/offres_emploi?select=*&order=date_publication.desc`;

        if (lieu) {
            queryUrl += `&lieu=ilike.*${lieu}*`;
        }
        if (type_contrat) {
            queryUrl += `&type_contrat=eq.${type_contrat}`;
        }
        if (metier) {
            queryUrl += `&titre=ilike.*${metier}*`;
        }
        if (search) {
            queryUrl += `&or=(titre.ilike.*${search}*,description.ilike.*${search}*)`;
        }
        if (salaire_min) {
            queryUrl += `&salaire=gte.${salaire_min}`;
        }
        if (salaire_max) {
            queryUrl += `&salaire=lte.${salaire_max}`;
        }

        const response = await fetch(queryUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch offres');
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error:', error);

        const errorResponse = {
            error: {
                code: 'API_ERROR',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
