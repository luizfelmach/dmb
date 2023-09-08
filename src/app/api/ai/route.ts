import { createPrompt } from "@/utils/createPrompt";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { object, string } from "yup";


const openai = new OpenAI();

let orderSchema = object({
    prompt: string().required()
});

export async function POST(request: NextRequest) {
    try {

        const data = await request.json();
        const validate = await orderSchema.validate(data);


        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: createPrompt(validate.prompt) }],
            model: "gpt-3.5-turbo",
        });

        return NextResponse.json(JSON.parse(completion.choices[0].message.content!));
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message,
        });
    }
}