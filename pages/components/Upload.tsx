import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { tableName } from "../lib/company";

export default function Upload({tablename, onDataUploaded}:{tablename: string, onDataUploaded: () => void}){

    const [file, setFile] = useState<File | null>(null)
    const handleFilechange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
        }
    }
    
    const handleUpload = async () => {
        if (file) {
          try {
            const formData = new FormData();
            formData.append('file', file);
      
            const response = await fetch(`/api/${tablename}/upload`, {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              alert('File uploaded successfully!');
              onDataUploaded()
            } else {
              throw new Error('Failed to upload file');
            }
          } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
          }
        } else {
          alert('Please select a file to upload');
        }
    };

    
    return (
        <div className="flex flex-row gap-0 pt-2 ">
            <div className="flex flex-col">
                <label htmlFor="">This is for mass Upload</label>
                <input type="file" onChange={handleFilechange} />
                <button className="my-1 border rounded button-bg" onClick={handleUpload}>Upload File</button>
            </div>
        </div>
    )
}