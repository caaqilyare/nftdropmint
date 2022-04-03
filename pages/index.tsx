import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient , urlFor } from "../sanity"
import { Collection } from "../typing"
import { useAddress, useDisconnect, useMetamask ,useNFTDrop } from "@thirdweb-dev/react";
interface Props {
  collections: [Collection]
}
export default function  Home ({ collections }: Props) {
   // Auth token
   const connectWithMetamask = useMetamask();
   const address = useAddress();
   const disconnect = useDisconnect();
  return (
    
    <div className="min-h-screen bg-black">
      <Head>
        <title>NFTDrop Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='to-blue-400[0.35] to-blue-400[0.25] bg-gradient-to-tr from-purple-400/[0.35] from-purple-400/[0.15] text-white'>
        <div className='mx-auto flex min-h-screen max-w-7xl flex-col p-8'>
          <header className='z-50 flex flex-col items-center justify-between border-b border-pink-400/[0.15] pb-8 md:flex-row md:pb-10'>
            <h1 className='cursor-pointer font-poppins text-sm font-extralight uppercase tracking-wider text-white md:text-xl'>
              THE BEST <span className='font-medium text-purple-800'> NFT
              </span> COLLECTION
            </h1>
            <div className='mt-6 flex flex-col items-center space-y-4 md:mt-0 md:flex-row md:space-y-0 md:space-x-5'>
             
              {address && (
                 <p className='text-center text-sm text-amber-600 text-amber-300'>
                You're logged in with wallet {address.substring(0,5)}.... {address.substring(address.length - 5)}
                </p>
                )} 
              
              <div className='flex items-center space-x-5'>
                {address ? 
                <button onClick={() => (address ? disconnect() : connectWithMetamask()) }>
                <div className='group relative'>
                  <div className='animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100'></div>
                  <div  className='relative flex items-center space-x-4 divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none text-black transition duration-200 hover:text-purple-500 bg-black text-white hover:text-purple-300'> 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path> </svg> SIGN OUT 
                  </div>
                </div>
              </button> : 
              <button onClick={() => (address ? disconnect() : connectWithMetamask()) }>
              <div className='group relative'>
                <div className='animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100'></div>
                <div  className='relative flex items-center space-x-4 divide-gray-600 rounded-lg bg-black px-7 py-4 leading-none text-white transition duration-200 hover:text-purple-500 bg-black text-white hover:text-purple-300'> 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path> </svg> SIGN IN 
                </div>
              </div>
            </button>  
              }
              </div>
            </div>
          </header>
          <div className='grid flex-grow items-center gap-0 pb-12 md:grid-cols-2 md:gap-24 md:pb-48 md:pt-24'>
            <div className='col-span-1 mb-12 mt-16 flex flex-col space-y-6 rounded-xl text-center md:mb-0 md:text-left lg:justify-center lg:space-y-2'>
              <h1 className='font-poppins text-3xl font-extralight text-white md:max-w-md md:text-6xl'>
                The best <span className='font-bold text-purple-500'> NFTS</span>  in one place
              </h1>
            </div>
            <div className='col-span-1'>
              <div className='grid grid-cols-3 gap-3 md:gap-6'>
                <div className='flex flex-col gap-3 pt-24 md:gap-6'>
                  <div className='origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1'>
                    <span className='box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative'>
                      <span className='box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;padding-top:100%'>
                        <img 
                        className='position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%'
                        src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2F8.jpg&w=640&q=75" alt="" />
                      </span>
                    </span>
                  </div>
                  <div className='origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1'>
                    <span className='box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative'>
                      <span className='box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;padding-top:100%'>
                        <img 
                        className='position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%'
                        src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2F6.jpg&w=640&q=75" alt="" />
                      </span>
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-3 pt-12 md:gap-6'>
                  <div className='origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1'>
                    <span className='box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative'>
                      <span className='box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;padding-top:100%'>
                        <img 
                        className='position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%'
                        src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2F2.jpg&w=640&q=75" alt="" />
                      </span>
                    </span>
                  </div>
                  <div className='origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1'>
                    <span className='box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative'>
                      <span className='box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;padding-top:100%'>
                        <img 
                        className='position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%'
                        src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2F11.jpg&w=640&q=75" alt="" />
                      </span>
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-3 md:gap-6'>
                  <div className='origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1'>
                    <span className='box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative'>
                      <span className='box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;padding-top:100%'>
                        <img 
                        className='position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%'
                        src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2F4.jpg&w=640&q=75" alt="" />
                      </span>
                    </span>
                  </div>
                  <div className='origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1'>
                    <span className='box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative'>
                      <span className='box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;padding-top:100%'>
                        <img 
                        className='position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%'
                        src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2Fportfolio-02.jpg&w=640&q=75" alt="" />
                      </span>
                    </span>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
          <div className='pt-12 pb-24 md:grid md:grid-cols-4'>
            <div className='md:col-span-4 xl:col-span-3 xl:col-start-2'>
              <section className='pb-12 lg:pb-16'>
                <h1 className='text-center font-poppins text-3xl font-extralight text-white md:text-left md:text-4xl'> 
                <span className='font-bold text-purple-500'> Explore</span>  the collections:
                </h1>
              </section>
              <div className='flex flex-col items-stretch justify-center space-y-8 md:space-y-24'>
                <div className='grid gap-6 sm:grid-cols-2 md:gap-8'>
                  {/* secction post */}
                  {collections.map((collection) => (
                     <Link href={`/nft/${collection.slug.current}`}>
                  <div className='group relative cursor-pointer transition duration-500 ease-in-out hover:rotate-1 hover:scale-105'>
                    <div className='animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-80'></div>
                    <div className='relative flex items-center justify-between space-x-4 divide-gray-600 rounded-xl bg-black px-1.5 leading-none text-blue-200 transition duration-200 hover:text-purple-300 bg-black sm:p-2'>
                      <div className='duration-600 w-full origin-top-left rounded-2xl p-3 sm:w-auto md:w-full'>
                        <div className='flex items-center gap-4 sm:flex-col md:flex-row md:gap-6'>
                          <div className='items-center rounded-1xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5'>
                            <img 
                            className='lg:w-24 lg:h-24 h-16 flex-shrink rounded-2xl sm:h-48 sm:w-48'
                            src={urlFor(collection.previewImage).url()} alt="" />
                          </div>
                          <div className='text-left sm:text-center md:text-left lg:py-8'>
                            <h1 className='font-poppins text-3xl text-amber-500 md:text-3xl xl:text-2xl'>
                            {collection.title}
                            </h1>
                            <p className='mt-2 hidden font-poppins text-xs font-extralight text-white sm:block'>
                            {collection.description.substring(0,45)}
                            </p>
                            <p className='mt-2 font-poppins font-medium text-purple-600'>
                            {collection.nftCollectionName}
                            </p>

                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                  </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='border-t border-pink-400/[0.15] bg-black/25 py-6 text-center font-poppins text-sm font-medium uppercase bg-black/25 text-white'>
          MADE BY <span className='text-purple-400'> MUNASAR ABUUKAR</span>
        </footer>
      </div>
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
