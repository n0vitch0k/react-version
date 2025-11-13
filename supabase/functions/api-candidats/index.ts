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

        // Si un ID est présent dans l'URL (ex: /api-candidats/2)
        if (pathId && pathId !== 'api-candidats' && !isNaN(Number(pathId))) {
            const candidatId = Number(pathId);
            
            const response = await fetch(`${supabaseUrl}/rest/v1/profils_candidats?id=eq.${candidatId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch candidat');
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

        // Sinon, récupérer tous les candidats avec filtres optionnels
        const searchParams = url.searchParams;
        const search = searchParams.get('search');
        const poste_recherche = searchParams.get('poste_recherche');
        const ethnie = searchParams.get('ethnie');
        const religion = searchParams.get('religion');
        const age_min = searchParams.get('age_min');
        const age_max = searchParams.get('age_max');
        const salaire_min = searchParams.get('salaire_min');
        const salaire_max = searchParams.get('salaire_max');

        let queryUrl = `${supabaseUrl}/rest/v1/profils_candidats?select=*&order=date_publication.desc`;

        if (search) {
            queryUrl += `&or=(nom.ilike.*${search}*,prenom.ilike.*${search}*,poste_recherche.ilike.*${search}*)`;
        }
        if (poste_recherche) {
            queryUrl += `&poste_recherche=ilike.*${poste_recherche}*`;
        }
        if (ethnie) {
            queryUrl += `&ethnie=eq.${ethnie}`;
        }
        if (religion) {
            queryUrl += `&religion=eq.${religion}`;
        }
        if (age_min) {
            queryUrl += `&age=gte.${age_min}`;
        }
        if (age_max) {
            queryUrl += `&age=lte.${age_max}`;
        }
        if (salaire_min) {
            queryUrl += `&salaire_souhaite=gte.${salaire_min}`;
        }
        if (salaire_max) {
            queryUrl += `&salaire_souhaite=lte.${salaire_max}`;
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
            throw new Error('Failed to fetch candidats');
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
