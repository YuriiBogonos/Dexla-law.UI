function Sidebar() {
  return (
    <aside className='bg-white h-full p-4 border-r border-gray-200'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search file name'
          className='w-full p-2 border border-gray-300 rounded'
        />
      </div>
      <div className='space-y-2'>
        <div className='flex items-center justify-between p-2 border border-gray-300 rounded'>
          <div>
            <span>[SAMPLE] ChatDOC User Guide</span>
            <div className='text-xs text-gray-500'>2024-05-24 13:33:17</div>
          </div>
          <span className='text-green-500'>&#10003;</span>
        </div>
        <div className='flex items-center justify-between p-2 border border-gray-300 rounded'>
          <span>[SAMPLE] Collection</span>
          <span className='text-green-500'>&#10003;</span>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
