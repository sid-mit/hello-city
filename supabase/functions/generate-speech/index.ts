import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Voice mapping by city to ensure native accents
const VOICE_MAP: Record<string, string> = {
  'paris': '9BWtsMINqrJLrRacOk9x',        // Aria (French)
  'seoul': 'pFZP5JQG7iQjIQuC4Bku',        // Lily (Korean-like)
  'beijing': 'Xb7hH8MSUJpSbSDYk0k2',      // Alice (Chinese-like)
  'new-delhi': 'cgSgspJ2msm6clMCkdW9',    // Jessica (Hindi-like)
  'mexico-city': 'EXAVITQu4vr4xnSDxMaL',  // Sarah (Spanish)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, cityId } = await req.json()

    if (!text || !cityId) {
      throw new Error('Text and cityId are required')
    }

    const voiceId = VOICE_MAP[cityId] || VOICE_MAP['paris']
    const apiKey = Deno.env.get('ELEVENLABS_API_KEY')

    if (!apiKey) {
      throw new Error('ELEVENLABS_API_KEY not configured')
    }

    console.log(`Generating speech for city: ${cityId}, voice: ${voiceId}`)

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', response.status, errorText)
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in generate-speech:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
