// types.ts
export interface TableInfo {
  name: string;
  count: number;
  error?: string;
}

export interface ImportResult {
  table: string;
  imported?: number;
  errors?: number;
  status: "success" | "error" | "partial" | "empty";
  error?: string;
  errorDetails?: any[];
}

export interface BulkImportResult {
  message: string;
  results: ImportResult[];
}
