import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient , urlFor } from "../sanity"
import { Collection } from "../typing"

interface Props {
  collections: [Collection]
}
export default function  Home ({ collections }: Props) {
  return (
    
    <div className="min-h-screen bg-black">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <div className='to-blue-400/20 bg-gradient-to-tr from-purple-400/20'>
          <div className='mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0'>
           <h1 className='mb-10 text-4xl font-extralight text-white'>
             <span className='font-extrabold underline decoration-pink-600/50'>
               CAAQIL
             </span> NFT Market Place
           </h1>
           <main className='bg-purple-700/20 p-10 shadow-xl shadow-green-400/20 outline outline-offset-2 outline-1 rounded-3xl'>
             <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
               {collections.map((collection) => (
                <Link href={`/nft/${collection.slug.current}`}>
                 <div className='flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105'>
                 <img
                 className='h-96 w-60 rounded-2xl object-cover'
                  src={urlFor(collection.mainImage).url()} 
                  alt="" />
                  <div className='p-5'>
                    <h2 className='text-3xl text-white'>
                      {collection.title}
                    </h2>
                    <p className='mt-2 text-sm text-gray-400'>
                       {collection.description}
                    </p>
                  </div>
               </div>
                </Link>
               ))}
             </div>
           </main>
          </div>

        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "collection"]{
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
  `
  const collections = await sanityClient.fetch(query) ;
  return {
    props:{
      collections,
    },
  };

  
}
