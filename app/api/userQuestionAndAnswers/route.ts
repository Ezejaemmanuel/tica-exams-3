import { kv } from "@vercel/kv";
import { CombinedQuestionAnswer } from "../calculateResult/combinedData";
import { getUserId } from "@/lib/auth/utils";
import { NextRequest, NextResponse } from "next/server";
import { getExamIdForUser } from "@/lib/api/redis/exam-id";

export async function GET(request: NextRequest) {
    try {
        const userId = getUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const combinedDataKey: string = `tica:combinedData:${userId}`;

        const result = await kv.get<CombinedQuestionAnswer[]>(combinedDataKey);
        if (!result) {
            return NextResponse.json({ error: 'no question and user answer found yet ' }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error retrieving exam result:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
