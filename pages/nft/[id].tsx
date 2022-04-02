import Head from 'next/head'
import React from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import Link from 'next/link';
import { sanityClient , urlFor } from "../../sanity"
import { Collection } from "../../typing"
import { GetServerSideProps, GetStaticProps } from 'next';

interface Props {
  collection: Collection
}

function NftDrop({collection} : Props) {
    // Auth token
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
  return (
  
  <div className="flex h-screen flex-col lg:grid lg:grid-cols-10"><title>NFT Drop</title>
      {/* left */}
       <div className="bg-gradient-to-br from-purple-900 to-purple-800 lg:col-span-4">
           <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
               <div className='rounded-xl bg-gradient-to-br from-pink-300 to-purple-600 p-2'>
                   <img
                   className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
                    src={urlFor(collection.previewImage).url()} alt="" />
               </div>
               <div className='space-y-2 p-5 text-center'>
                   <h1 className='text-4xl font-bold text-white'>{collection.nftCollectionName}</h1>
                   <h2 className='text-xl text-gray-300'>{collection.description}</h2>
               </div>
           </div>
       </div>
       {/* righy */}
       <div className='flex flex-1 flex-col p-12 lg:col-span-6 bg-gradient-to-tr from-pink-800 to-blue-900'>
           <header className='flex item-center justify-between'>
               <h1 className='text-white w-52 cursor-pointer tex-xl font-extralight sm:w-80'>
                  <span className='font-extrabold underline decoration-pink-500/50'>
                      <Link href='/'>
                         CAAQIL
                      </Link>
                  
                   </span> NFT Market Place
               </h1>
               { address ?
                <button onClick={() => (address ? disconnect() : connectWithMetamask()) } className='rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base'>Sign Out</button>
                : 
                <button onClick={() => (address ? disconnect() : connectWithMetamask()) } className='rounded-full bg-green-500 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base'>Sing In</button>
                }
              
           </header>
           <hr className='my-2 border' />
           {address && (
               <p className='text-center text-sm text-green-400'>
               You're logged in with wallet {address.substring(0,5)}.... {address.substring(address.length - 5)}
             </p>
           )}
           {/* content */}
           <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0'>
               <img 
               className='w-80 object-cover pb-30 lg:h-60'
               src={urlFor(collection.mainImage).url()} alt="" />
               <h1 className='text-3xl text-white font-bold lg:text-5xl lg:font-extrabold'>{collection.title}  </h1>
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


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const query = `
    *[_type == "collection" && slug.current == $id][0]{
        _id,
        title,
        address,
        description,
        nftCollectionName,
        mainImage {
            asset
        },
        previewImage {
            asset
        },
        slug {
            current
        },
        creator-> {
            _id,
            name,
            address,
            slug {
               current
            },
        },
      }
    `;
        const collection = await sanityClient.fetch(query, { 
          id: params?.id,
        });
  
        if (!collection) {
          return {
            notFound: true,
           }
          };
       
        return  { props: { collection } 
        }
        
  }
  