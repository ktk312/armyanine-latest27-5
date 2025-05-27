// types.ts
export interface MonthlyWhelpingData {
    month: string;
    year: string;
    count: number;
}

export interface MonthlyWhelpingResponse {
    success: boolean;
    data: {
        monthlyData: MonthlyWhelpingData[];
        counts: number[];
    };
}