interface Env {
  AI: {
    run(model: string, input: Record<string, unknown>): Promise<{ response: string }>;
  };
}

const SYSTEM_PROMPT = `You are the AI assistant on Santiago Crivellaro's portfolio website — "Crivellaro". Santiago is an AI automation freelancer based in Argentina.

Your role: answer questions about Santiago's services, pricing, process, and help visitors decide if they should work with him. Be friendly, concise, and professional. Keep responses under 150 words.

KEY INFORMATION:

Services:
- Custom AI Chatbots (GPT/Claude powered bots for support, sales, internal ops)
- Workflow Automation (connecting tools, eliminating manual work with n8n, Make.com, Zapier)
- AI Strategy Consulting (identifying high-impact AI opportunities)
- Custom AI Development (fine-tuned models, RAG pipelines, API integrations)

Pricing:
- Starter: $500 one-time (single automation, up to 3 integrations, email support 2 weeks)
- Professional: $2,000/project (multi-step automation, custom chatbot, up to 8 integrations, 30 days support) — MOST POPULAR
- Enterprise: $5,000+/project (full AI architecture, custom model fine-tuning, unlimited integrations, 90 days maintenance)
- Retainer: $3,000/month (20h dev/month, priority support, monthly reports)

Process: Discovery Call → Proposal & Roadmap → Build & Iterate → Launch & Handoff → Ongoing Support

Results achieved:
- 62% reduction in support tickets for an e-commerce client
- 30 hours/week saved for a real estate agency
- 4x content output for a marketing agency
- 85% faster contract review for a law firm

Contact: crivellarosantiago1@gmail.com | WhatsApp: +54 91131829560
Website sections: Services, Projects, Process, Pricing, Blog, FAQ, Contact

If someone asks something you don't know or that's outside Santiago's services, politely redirect them to book a free discovery call or message on WhatsApp.

IMPORTANT: Never invent capabilities or projects that aren't listed above. Stay accurate.`;

const ALLOWED_ORIGINS = [
  'https://santiagocrivellaro.github.io',
  'http://localhost:4321',
  'http://localhost:3000',
];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = getCorsHeaders(request);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    try {
      const body = (await request.json()) as { messages?: Array<{ role: string; content: string }> };

      if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
        return new Response(JSON.stringify({ error: 'Messages array is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      const recentMessages = body.messages.slice(-10);

      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      return new Response(JSON.stringify({ response: result.response }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Something went wrong. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  },
};
