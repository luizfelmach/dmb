import { NextRequest, NextResponse } from "next/server";
import { array, number, object, string } from "yup";
import { createId } from "@paralleldrive/cuid2";
import { prisma } from "@/lib/prisma";

let orderSchema = object({
  name: string().required(),
  address: string().required(),
  peoples: number().required(),
  eventDate: string().required(),
  comment: string(),
  services: array(
    object({
      name: string().required(),
      items: array(string().required()).required(),
    })
  ).required(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validate = await orderSchema.validate(data);
    const order = await prisma.order.create({
      data: {
        id: createId(),
        address: validate.address,
        eventDate: validate.eventDate,
        name: validate.name,
        peoples: validate.peoples,
        comment: validate.comment || "",
        services: {
          createMany: {
            data: [...validate.services],
          },
        },
      },
      include: {
        services: true,
      },
    });
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
