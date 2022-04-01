import Head from 'next/head'
import React from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

function NftDrop() {
    // Auth token
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
  return (
  
  <div className="flex h-screen flex-col lg:grid lg:grid-cols-10"><title>NFT Drop</title>
      {/* left */}
       <div className="bg-gradient-to-br from-blue-600 to-green-300 lg:col-span-4">
           <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
               <div className='rounded-xl bg-gradient-to-br from-pink-300 to-purple-600 p-2'>
                   <img
                   className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
                    src="https://fiverrbox.com/wp-content/uploads/2021/12/nft-art.jpg-5-2c4a6d40.jpg" alt="" />
               </div>
               <div className='space-y-2 p-5 text-center'>
                   <h1 className='text-4xl font-bold text-white'>CAAQIL NTF Ape</h1>
                   <h2 className='text-xl text-gray-300'> A collection of CAAQIL NTF You can mint now</h2>
               </div>
           </div>
       </div>
       {/* righy */}
       <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
           <header className='flex item-center justify-between'>
               <h1 className='w-52 cursor-pointer tex-xl font-extralight sm:w-80'>
                  <span className='font-extrabold underline decoration-pink-500/50'>
                  CAAQIL
                   </span> NFT Market Place
               </h1>
               <button onClick={() => (address ? disconnect() : connectWithMetamask()) } className='rounded-full bg-green-500 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base'>{ address ? 'Sign Out' : 'Sign In' }</button>
           </header>
           <hr className='my-2 border' />
           {/* content */}
           <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0'>
               <img 
               className='w-80 object-cover pb-10 lg:h-40'
               src="https://www.aljazeera.com/wp-content/uploads/2021/12/nft.jpg?resize=770%2C513" alt="" />
               <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>Join CAAQIL Coding Club  </h1>
               <p className='pt-2 text-xl text-red-500'>13/21 NFT's claimed </p>
           </div>
           <button className='mt-10 h-16 w-full rounded-full bg-green-500 font-bold text-white'>
               Mint NFT (0.01 ETH)
           </button>
       </div>
   </div>
  )
}

export default NftDrop