
import { getExamIdForUser } from "@/lib/api/redis/exam-id";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "../../userInfo/cache";
import { getExamDetailsById } from "./aside";


export async function GET(req: NextRequest): Promise<NextResponse> {

    const examId = req.nextUrl.searchParams.get('examId');

    if (!examId) {
        return NextResponse.json({ error: "eam id is not found" }, { status: 404 });
    }
    try {
        const exam = await getExamDetailsById(examId);
        console.log("this is the exam in the backend", exam);
        if (!exam) {
            return NextResponse.json({ error: "exam not found" }, { status: 404 });
        }


        return NextResponse.json(exam);
    } catch (error) {
        return NextResponse.json({ error: `there was an error:${error}` }, { status: 500 })
    }

}

