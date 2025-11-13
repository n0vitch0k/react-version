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
    // Obtenir la clé service role depuis l'environnement
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!serviceRoleKey) {
      throw new Error('Service role key not found');
    }

    // URL du projet Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    if (!supabaseUrl) {
      throw new Error('Supabase URL not found');
    }

    // Extraire le nom de fichier depuis le path fourni
    const { photoPath } = await req.json();
    
    if (!photoPath) {
      throw new Error('Photo path is required');
    }

    // Extraire le nom de fichier depuis le path
    const fileName = photoPath.split('/').pop();
    if (!fileName) {
      throw new Error('Invalid photo path format');
    }

    // Construire l'URL publique Supabase Storage
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/photos_candidats/${fileName}`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { 
          publicUrl,
          fileName 
        } 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error getting image URL:', error);
    const errorResponse = {
      error: {
        code: 'GET_IMAGE_URL_ERROR',
        message: error.message
      }
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});