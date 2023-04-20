import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
interface FileUploadProps {
      files : File[];
      onFileChange: (files: File[]) => void;
}

function FileUpload({files, onFileChange}:FileUploadProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileChange([...files, ...acceptedFiles]);
  }, [files]);

  const removeFile = (fileName: string) => {
    onFileChange(files.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 ${
        isDragActive ? "border-green-500" : "border-gray-400"
      } p-4 rounded-md`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>첨부파일</p>
      )}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold">첨부된 파일:</h4>
          <ul className="list-disc pl-6 mt-2 p-4 boarder-gray-400">
            {files.map((file) => (
              <li key={file.name}>
                {file.name}{" "}
                <button onClick={() => removeFile(file.name)}>제거하기</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
