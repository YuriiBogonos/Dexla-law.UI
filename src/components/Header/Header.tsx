import Head from 'next/head';

function Header() {
  return (
    <>
      <Head>
        <title>DeltaTech</title>
      </Head>
      <header>
        <div className='bg-white w-full p-4 border-b border-gray-200'>
          <div className='text-lg font-bold'>DexlaTech</div>
        </div>
      </header>
    </>
  );
}
export default Header;
