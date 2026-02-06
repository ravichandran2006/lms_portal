import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const { title } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                title,
                userId,
            },
        });

        return NextResponse.json(course);

    } catch (error) {
        console.error("[COURSES] Error:", error);
        if (error instanceof Error) {
            return new NextResponse(`Database error: ${error.message}`, { status: 500 });
        }
        return new NextResponse("Internal error", { status: 500 });
    } finally {
        await db.$disconnect();
    }
}
