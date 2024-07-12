'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FolderPlusIcon } from '@heroicons/react/24/solid';

const FolderUpload: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const acceptedFileTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const uploadedFiles = acceptedFiles.filter((file) => acceptedFileTypes.includes(file.type));

    if (uploadedFiles.length === 0) {
      setAlertMessage('Only PDF, DOC, and DOCX files are supported.');
      return;
    }

    console.log('Uploaded files:', uploadedFiles);
    // Handle the uploaded files as needed
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000); // Adjust the duration as needed

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <>
      {alertMessage && (
        <Alert variant='destructive' className='mb-4'>
          <AlertTitle>Invalid File</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      <div
        {...getRootProps()}
        className={`p-6 rounded-lg text-centerw${
          isDragActive ? 'border-blue-500' : 'border-gray-300'
        }`}
        onClick={handleClick}
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          type='file'
          webkitdirectory=''
          directory=''
          multiple
          className='hidden'
        />
        <div className='flex justify-center mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 text-blue-500'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M3 3a1 1 0 011-1h12a1 1 0 011 1v6.414a1 1 0 01-.293.707l-7.414 7.414a1 1 0 01-1.414 0l-7.414-7.414a1 1 0 01-.293-.707V3zm1 1v5.586L9.293 14h1.414L16 9.586V4H4zm7 3a1 1 0 000 2H9a1 1 0 000 2h2a1 1 0 000-2H9a1 1 0 000-2h2z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <p className='text-xl font-semibold mb-2'>Drag and drop folder as collection.</p>
        <p className='text-gray-500 mb-6'>Chat with the docs in a collection.</p>
      </div>
      <div className=' flex justify-around border-t-2'>
        <button className='flex items-center justify-center flex-1 p-3 space-x-2 text-blue-500'>
          <FolderPlusIcon className='h-5 w-5' />
          <span>New Collection</span>
        </button>
      </div>
    </>
  );
};

export default FolderUpload;
