import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface ServerResponse {
  afterUserPhraseIndex: number;
  native: string;
  romanization: string;
  english: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, spotType, subScenario, phrases, genderPreference } = await req.json();
    
    if (!phrases || phrases.length === 0) {
      throw new Error('Phrases are required');
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context-aware prompt
    const roleMap: Record<string, string> = {
      'cafe': 'cafe staff member',
      'restaurant': 'restaurant server',
      'hotel': 'hotel receptionist',
      'shop': 'shop attendant',
      'taxi': 'taxi driver',
      'train-station': 'station staff',
      'airport': 'airport staff',
    };

    const role = roleMap[spotType] || 'local person';
    const languageMap: Record<string, string> = {
      'paris': 'French',
      'seoul': 'Korean', 
      'beijing': 'Chinese (Mandarin)',
      'new-delhi': 'Hindi',
      'mexico-city': 'Spanish (Mexican)',
    };
    const language = languageMap[city] || 'the local language';

    const userPhrasesText = phrases.map((p: Phrase, idx: number) => 
      `${idx + 1}. "${p.native}" (${p.english})`
    ).join('\n');

    const systemPrompt = `You are a ${role} in ${city}. A tourist is trying to communicate with you in ${language}. 
Generate natural, contextually appropriate responses that:
- Are brief (1-2 sentences maximum)
- Sound like a real ${role} would speak
- Acknowledge what the tourist asked
- Lead naturally to their next question
- Use common, everyday language
- Match the politeness level appropriate for ${city}
${genderPreference ? `- Use ${genderPreference} speech patterns when relevant` : ''}

Context: ${subScenario}`;

    const userPrompt = `The tourist will say these phrases in order. Generate a realistic response after EACH phrase:

${userPhrasesText}

Return responses in this exact format for EACH user phrase.`;

    console.log('Generating conversation responses for:', { city, spotType, subScenario, phraseCount: phrases.length });

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_responses",
              description: "Generate contextual conversation responses",
              parameters: {
                type: "object",
                properties: {
                  responses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        afterUserPhraseIndex: {
                          type: "number",
                          description: "Index of the user phrase this response follows (0-based)"
                        },
                        native: {
                          type: "string",
                          description: `Response in ${language} script`
                        },
                        romanization: {
                          type: "string",
                          description: "Romanized version of the response"
                        },
                        english: {
                          type: "string",
                          description: "English translation"
                        }
                      },
                      required: ["afterUserPhraseIndex", "native", "romanization", "english"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["responses"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_responses" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received:', JSON.stringify(data, null, 2));

    // Extract responses from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('No tool call in response');
    }

    const generatedResponses = JSON.parse(toolCall.function.arguments).responses as ServerResponse[];
    
    console.log('Generated responses:', generatedResponses.length);

    return new Response(
      JSON.stringify({ responses: generatedResponses }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in generate-conversation-responses:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
