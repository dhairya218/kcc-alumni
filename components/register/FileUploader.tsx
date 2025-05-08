"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileX, FileCheck } from "lucide-react";

interface FileUploaderProps {
  accept: string;
  maxSize: number;
  onFileChange: (file: File | null) => void;
}

export function FileUploader({ accept, maxSize, onFileChange }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setError(null);

    if (!selectedFile) {
      setFile(null);
      onFileChange(null);
      return;
    }

    // Check file size
    if (selectedFile.size > maxSize) {
      setError(`File is too large. Maximum size is ${formatBytes(maxSize)}`);
      return;
    }

    // Check file type
    const acceptedTypes = accept.split(",").map(type => type.trim());
    const fileExtension = `.${selectedFile.name.split(".").pop()?.toLowerCase()}`;
    
    if (!acceptedTypes.some(type => {
      if (type.startsWith(".")) {
        return type.toLowerCase() === fileExtension.toLowerCase();
      } else if (type.includes("*")) {
        const mimePrefix = type.split("*")[0];
        return selectedFile.type.startsWith(mimePrefix);
      } else {
        return type === selectedFile.type;
      }
    })) {
      setError(`File type not supported. Accepted types: ${accept}`);
      return;
    }

    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />
      
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/20 hover:border-muted-foreground/50"
          } cursor-pointer`}
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drag and drop or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                Accepted formats: {accept}
              </p>
              <p className="text-xs text-muted-foreground">
                Max size: {formatBytes(maxSize)}
              </p>
            </div>
            <Button size="sm" variant="secondary">
              Choose file
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <FileX className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}