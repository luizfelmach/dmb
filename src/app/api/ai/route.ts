import { createPrompt } from "@/utils/createPrompt";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { array, number, object, string } from "yup";


const openai = new OpenAI();

let aiSchema = object({
    prompt: string().required()
});


let orderSchema = object({
    to: string().required(),
    guests: number().required(),
    entry: string(),
    comments: array(string()).required(),
    services: array(
        object({
            label: string().required(),
            items: array(string().required()).required(),
        })
    ).required(),
    price: number().required()
});

export async function POST(request: NextRequest) {
    try {

        const data = await request.json();
        const validate = await aiSchema.validate(data);


        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: createPrompt(validate.prompt) }],
            model: "gpt-3.5-turbo",
            temperature: 0.1
        });

        const { content } = completion.choices[0].message;

        const res = await orderSchema.cast(JSON.parse(content!.replaceAll("\n", "")))

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message,
        });
    }
}