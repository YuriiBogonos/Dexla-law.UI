'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { GlobeAltIcon } from '@heroicons/react/24/solid';

const DragnDrop: FC = () => {
  const [url, setUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      setAlertMessage('Only PDF, DOC, and DOCX files are supported.');
      return;
    }
    console.log(acceptedFiles);
    simulateUpload();
  }, []);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };
  const handleUploadFromUrl = async () => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const file = new File([response.data], 'downloadedFile', { type: response.data.type });
      if (
        ![
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type)
      ) {
        setAlertMessage('Only PDF, DOC, and DOCX files are supported.');
        return;
      }
      console.log(file);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      {alertMessage && (
        <Alert variant='destructive' className='mb-4'>
          <AlertTitle>Invalid File</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      <div {...getRootProps({ className: 'dropzone' })} className='p-6 rounded-lg text-center '>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
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
            <div className='text-xl font-semibold mb-2'>Click or drag and drop to upload.</div>
            <div className='text-gray-500 mb-6'>OCR only supports English and Chinese.</div>
          </div>
        )}
        <aside className='mt-4'>
          <ul>{files}</ul>
        </aside>
      </div>
      {isUploading && (
        <div className='mt-4'>
          <Progress value={uploadProgress} />
          <div className='text-center'>{uploadProgress}%</div>
        </div>
      )}
      <div className='mt-4 flex justify-around border-t-2'>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className='flex items-center justify-center  p-3 space-x-2 text-blue-500 '
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              <GlobeAltIcon className='h-5 w-5' />
              <span>Upload files through URL</span>
            </button>
          </PopoverTrigger>
          {showUrlInput && (
            <PopoverContent>
              <div className='flex'>
                <input
                  type='text'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder='Upload a file by pasting a URL here.'
                  className='border border-gray-300 px-2 py-1 flex-1 border-r-0 rounded-l-lg outline-0'
                />
                <button onClick={handleUploadFromUrl} className='bg-blue-500 text-white px-4 py-2'>
                  Upload
                </button>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default DragnDrop;
