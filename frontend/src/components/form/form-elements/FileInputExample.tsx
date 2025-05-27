import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
interface FileInputExampleProps {
  onFileUpload: (file: File) => void; // Prop to handle file upload
}
export default function FileInputExample({ onFileUpload }: FileInputExampleProps) {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  useEffect(()=>{
    if(file){
      onFileUpload(file);
    }
  },[file])

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
      </div>
    </ComponentCard>
  );
}
