---
title: "How I Reduced Support Tickets by 62% With a GPT Chatbot"
excerpt: "A step-by-step breakdown of building an AI customer support bot for an e-commerce brand — from initial discovery to production deployment."
date: "2026-02-15"
readTime: "8 min read"
tags: ["Case Study", "Chatbots"]
author: "Santiago Crivellaro"
---

Every e-commerce brand knows the pain: your inbox is flooded with the same questions over and over. "Where's my order?" "What's your return policy?" "Do you ship to my country?" For one of my clients — a mid-size DTC brand doing around 5,000 orders per month — support tickets were eating up 3 full-time agents' worth of hours every week.

They came to me with a simple question: **"Can AI actually handle this?"**

The answer was yes. Here's exactly how we did it.

## The Problem

The client's support team was drowning. They had around 800 tickets per week, and roughly 70% were repetitive questions that had clear, documented answers. The team was burning out, response times were climbing past 24 hours, and customer satisfaction scores were dropping.

The real cost wasn't just salaries — it was the opportunity cost. Support agents were so busy answering "where is my order?" that they couldn't handle the complex cases that actually needed a human touch.

## Discovery: Understanding the Ticket Landscape

Before writing a single line of code, I spent a full week analyzing their ticket data. I exported 3 months of Zendesk tickets and categorized them:

- **Order status inquiries** — 35% of all tickets
- **Return/refund policy questions** — 18%
- **Shipping information** — 12%
- **Product questions** (sizing, materials, compatibility) — 15%
- **Complex issues** (damaged items, billing disputes, complaints) — 20%

That first 80% was our target. These were questions with deterministic answers — perfect for AI.

## Building the Bot

### Step 1: Knowledge Base Construction

I didn't just dump their FAQ into a chatbot and call it a day. That's the approach that gives AI chatbots a bad reputation. Instead, I built a structured knowledge base:

- Scraped their entire help center (127 articles)
- Extracted product specs from their catalog (2,300+ SKUs)
- Pulled shipping rates and delivery estimates from their logistics provider's API
- Created a real-time order status integration with Shopify

### Step 2: RAG Pipeline

The knowledge base was chunked, embedded, and stored in a vector database. When a customer asks a question, the system:

1. Converts the question to an embedding
2. Finds the most relevant knowledge chunks
3. Passes those chunks as context to GPT-4
4. GPT-4 generates a natural, accurate response

This approach means the bot doesn't hallucinate — it only answers based on actual company data.

### Step 3: Order Status Integration

For "where is my order?" questions, the bot connects directly to Shopify's API. The customer provides their order number or email, and the bot pulls real-time tracking information. No human needed.

### Step 4: Escalation Logic

Not every conversation should stay with the bot. I built clear escalation rules:

- If the customer mentions words like "frustrated," "angry," "terrible," or "lawsuit" — instant handoff to a human
- If the bot's confidence score drops below 0.7 — handoff
- If the customer explicitly asks for a human — handoff
- After 3 failed attempts to resolve — handoff

## The Results

After 30 days in production:

- **62% reduction** in human-handled tickets
- **Average response time** dropped from 22 hours to under 30 seconds for bot-handled queries
- **Customer satisfaction** increased by 18% (measured via post-interaction surveys)
- **Support team** went from 3 full-time agents to 1.5, with the freed-up agent focusing on high-value customer relationships

## Lessons Learned

**Start narrow, then expand.** We launched with only order status and shipping questions. Once we confirmed accuracy was above 95%, we added product questions, then returns. This phased approach built trust with both the client and their customers.

**The escalation path matters more than the AI.** Customers don't mind talking to a bot if they know a human is available when needed. The worst experience is being stuck in a bot loop with no escape.

**Monitor relentlessly for the first month.** I reviewed every single bot conversation for the first two weeks. Found edge cases, added missing knowledge, and fine-tuned the escalation rules. This hands-on period is what separates a good chatbot from a frustrating one.

## Want Similar Results?

If your support team is drowning in repetitive tickets, there's a good chance AI can help. The ROI on this project was realized within the first month — the client saved more on reduced support costs than the entire project fee.

[Book a free discovery call](/contact) and let's see if your support workflow is a good fit for AI automation.
