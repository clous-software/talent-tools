// app/api/ai/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error('GROQ_API_KEY environment variable is not set');
}
const groq = new Groq({ apiKey });

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json();
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Roast the resume from this candidate." },
        { role: "user", content: resumeText },
      ],
      model: "llama3-70b-8192",
    });

    const chatResponse = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ chatResponse });
  } catch (error) {
    console.error('Error in Groq API call:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
