// api.ts
// import { TableInfo, ImportResult, BulkImportResult } from "./types";
import { TableInfo, ImportResult, BulkImportResult } from "./types/types";
const API_BASE = "http://localhost:3000/api/data";

export const fetchTables = async (): Promise<TableInfo[]> => {
  const response = await fetch(`${API_BASE}/tables`);
  if (!response.ok) throw new Error("Failed to fetch tables");
  const data = await response.json();
  return data.tables;
};

export const exportData = async (table?: string): Promise<void> => {
  const url = table
    ? `${API_BASE}/export?table=${table}`
    : `${API_BASE}/export?table=all`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to export data");

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = downloadUrl;

  // Prefer filename from server, fallback depending on request type
  const serverFilename = response.headers
    .get("Content-Disposition")
    ?.split("filename=")[1];

  if (serverFilename) {
    link.download = serverFilename.replace(/['"]/g, ""); // cleanup quotes
  } else {
    link.download = table ? `${table}.csv` : "all_tables.zip";
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

export const importData = async (
  file: File,
  table: string
): Promise<ImportResult> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("table", table);

  const response = await fetch(`${API_BASE}/import`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to import data");
  }

  return await response.json();
};

export const importMultipleData = async (
  files: File[]
): Promise<BulkImportResult> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await fetch(`${API_BASE}/import/bulk`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to import data");
  }

  return await response.json();
};
