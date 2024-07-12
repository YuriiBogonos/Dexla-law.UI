import Sidebar from '@/components/Sidebar/Sidebar';
import UploadFiles from '@/components/UploadFiles/UploadFiles';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default function Home() {
  return (
    <div className='bg-gray-100 h-full'>
      <ResizablePanelGroup direction='horizontal' className='h-full'>
        <ResizablePanel defaultSize={25} maxSize={30} minSize={20} className='bg-white h-full'>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} maxSize={80} className='flex-1 h-full'>
          <UploadFiles />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
