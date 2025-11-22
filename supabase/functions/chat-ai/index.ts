import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { conversationId, message, categoryName } = await req.json();

    console.log('Chat request:', { userId: user.id, conversationId, categoryName });

    // Build system prompt based on category
    const systemPrompts: Record<string, string> = {
      'Career & Skills': 'You are an empathetic career coach specializing in digital skills for remote work. Your audience includes youth and single mothers seeking to build careers from home. Focus on practical, accessible skills like social media management, graphic design, content writing, virtual assistance, and online tutoring. Provide step-by-step guidance, recommend free or affordable learning resources, and emphasize how these skills can generate income.',
      'Entrepreneurship': 'You are a supportive entrepreneurship mentor helping users launch digital products and online stores. Guide them through e-commerce platforms, digital product creation, pricing strategies, and marketing on social media. Focus on low-cost, accessible business models suitable for home-based entrepreneurs. Encourage creativity and provide actionable steps.',
      'AI Projects': 'You are an AI tool advisor helping users leverage AI for productivity and digital product creation. Explain AI tools in simple terms, suggest practical applications like content generation, image creation, automation, and data analysis. Recommend accessible AI platforms and show how they can enhance entrepreneurial projects.',
      'Mentorship': 'You are a compassionate mentor providing motivation, guidance, and emotional support. Help users overcome challenges, build confidence, manage time effectively, and stay motivated. Acknowledge their unique circumstances and celebrate their progress. Offer practical advice on balancing learning, work, and personal responsibilities.',
      'Language Learning': 'You are a language learning advisor helping users master new languages for global opportunities. Recommend effective language learning methods, free apps, and online resources. Explain how language skills can open doors to remote work, freelancing, and international markets.',
      'Custom Advice': 'You are a versatile AI advisor for EdSkill Hub, empowering youth and single mothers through personalized guidance. Adapt your expertise to the user question, providing practical, accessible, and actionable advice across digital skills, entrepreneurship, personal growth, and income generation opportunities.',
    };

    const systemPrompt = systemPrompts[categoryName] || systemPrompts['Custom Advice'];

    // Call OnSpace AI
    const aiResponse = await fetch(`${Deno.env.get('ONSPACE_AI_BASE_URL')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('ONSPACE_AI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        stream: false,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('OnSpace AI error:', errorText);
      return new Response(JSON.stringify({ error: `AI service error: ${errorText}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await aiResponse.json();
    const aiMessage = aiData.choices?.[0]?.message?.content || 'No response generated';

    console.log('AI response generated, length:', aiMessage.length);

    // Save messages to database
    const { error: messageError } = await supabase.from('messages').insert([
      {
        conversation_id: conversationId,
        role: 'user',
        content: message,
      },
      {
        conversation_id: conversationId,
        role: 'assistant',
        content: aiMessage,
      },
    ]);

    if (messageError) {
      console.error('Database error:', messageError);
    }

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
