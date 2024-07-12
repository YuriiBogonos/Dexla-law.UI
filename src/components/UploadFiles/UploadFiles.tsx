import DragnDrop from '@/components/DragnDrop/DragnDrop';
import FolderUpload from '@/components/FolderUpload/FolderUpload';

function UploadFiles() {
  return (
    <main className='p-4 flex-1'>
      <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4'>
        <div className='flex-1 flex flex-col justify-end bg-white border border-gray-300 rounded-lg text-center'>
          <DragnDrop />
        </div>
        <div className='flex-1 flex flex-col justify-end bg-white border border-gray-300 rounded-lg text-center'>
          <div className='mt-4'>
            <FolderUpload />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='flex flex-col md:flex-row justify-center items-baseline p-6 gap-2'>
          <div className='text-xl font-semibold mb-2 text-blue-500'>Support: pdf |</div>
          <div className='text-gray-500 font-semibold text-xl flex flex-wrap gap-2 md:gap-6'>
            <p>doc</p>
            <p>docx</p>
            <p>markdown</p>
            <p>epub</p>
            <p>txt</p>
            <p>website</p>
            <p>OCR</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UploadFiles;
