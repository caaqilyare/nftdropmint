import Head from 'next/head'
import React from 'react'

function home() {
  return (
    <Head>
        <title>Best Template</title>
    </Head>
    
  )
}

export default home

{/* <div className='to-blue-400/20 bg-gradient-to-tr from-purple-400/20'>
<Toaster />
<div className='mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0 '>
   <header className='z-50 flex flex-col items-center justify-between border-b border-pink-400/[0.15] pb-8 md:flex-row md:pb-10'>
  <h1 className='cursor-pointer font-poppins text-sm font-extralight uppercase tracking-wider text-purple-200/75 dark:text-purple-300/50 md:text-xl'>
    THE BEST <span className='font-medium text-purple-800 dark:text-purple-400'> NFT
    </span> MINTING
  </h1>
  <div className='mt-6 flex flex-col items-center space-y-4 md:mt-0 md:flex-row md:space-y-0 md:space-x-5'>
   
    {address && (
       <p className='text-center text-sm text-amber-600 dark:text-amber-300'>
      You're logged in with wallet {address.substring(0,5)}.... {address.substring(address.length - 5)}
      </p>
      )} 
    
    <div className='flex items-center space-x-5'>
      {address ? 
      <button onClick={() => (address ? disconnect() : connectWithMetamask()) }>
      <div className='group relative'>
        <div className='animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100'></div>
        <div  className='relative flex items-center space-x-4 divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none text-black transition duration-200 hover:text-purple-500 dark:bg-black dark:text-white dark:hover:text-purple-300'> 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path> </svg> SIGN OUT 
        </div>
      </div>
    </button> : 
    <button onClick={() => (address ? disconnect() : connectWithMetamask()) }>
    <div className='group relative'>
      <div className='animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100'></div>
      <div  className='relative flex items-center space-x-4 divide-gray-600 rounded-lg bg-black px-7 py-4 leading-none text-white transition duration-200 hover:text-purple-500 dark:bg-black dark:text-white dark:hover:text-purple-300'> 
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path> </svg> SIGN IN 
      </div>
    </div>
  </button>  
    }
    </div>
  </div>
</header>
  <br /> 
<main className='bg-purple-700/20 p-12 shadow-xl shadow-green-400/20 outline outline-offset-2 outline-1 rounded-2xl'>
 <div className='grid space-x-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2'>

     <div className='flex cursor-pointer flex-col items-left transition-all duration-200 hover:scale-105'>
     <img
     className='h-60 w-60 rounded-3xl object-cover'
      src={urlFor(collection.previewImage).url()}
      alt="" />
      <div className='p-5'>
        <h2 className='text-3xl text-white'>
         {collection.nftCollectionName}
        </h2>
        <p className='mt-2 text-sm text-gray-400'>
           {collection.description}
        </p>
      </div>
   </div>
   <div className='flex cursor-pointer flex-col-4 items-center'>
      <div className='p-1 mt-1'>
        <h2 className='text-2xl text-white'>
         {collection.title}
        </h2>
       {loading ? (
       <p className='mt-16 h-16 text-md text-center text-green-400'>
            Loading Supply Please wait ....
        </p>
       ) : (
      <p className='mt-16 h-16 text-md text-center text-red-400'>
          {claimedSupply} / {totalSupply?.toString()} NFT's claimed
      </p>
       )}                  
      </div>
   </div>
 </div>
 
</main>
<button onClick={mintNft} disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} className='mt-16 h-16 w-full rounded-full bg-green-500 font-bold text-white disabled:bg-gray-400'>
              {loading ? (
                  <>Loading ..</>
              ) : claimedSupply == totalSupply?.toNumber() ? (
                  <>SOLD OUT</> 
              ) : !address ? (
                  <>Sign in to mint</>
              ) : (
                  <>Mint NFT ({priceInEth} ETH)</>
              )}
  </button>
</div>

</div> */}