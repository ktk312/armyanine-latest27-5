// types/dogs.ts
export interface LabradorRetriever {
    id: number;
    dogName: string;
    soldTo: string;
    KP: number;
    status: string;
    // Add other fields from your API response
}

export interface LabradorRetrieverApiResponse {
    sires: LabradorRetriever[];
    dams: LabradorRetriever[];
    totalLabradorRetriever: number;
}


export interface LabradorRetrieverState {
    sires: LabradorRetriever[];
    dams: LabradorRetriever[];
    totalLabradorRetriever: number;
    loading: boolean;
    error: string | null;
    fetchLabradorRetriever: () => Promise<void>;
}