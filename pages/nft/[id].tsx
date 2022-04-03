import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAddress, useDisconnect, useMetamask ,useNFTDrop } from "@thirdweb-dev/react";
import Link from 'next/link';
import { sanityClient , urlFor } from "../../sanity"
import { Collection } from "../../typing"
import { GetServerSideProps, GetStaticProps } from 'next';
import { BigNumber } from 'ethers'
import toast , { Toaster } from 'react-hot-toast'

interface Props {
  collection: Collection
}

function NFTDrop({collection} : Props) {
    const [claimedSupply , setClaimSupply] = useState<number>(0);
    const [totalSupply , setTotalSupply] = useState<BigNumber>();
    const [priceInEth , setPriceInEth] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const nftDrop = useNFTDrop(collection.address)
      // Auth token
      const connectWithMetamask = useMetamask();
      const address = useAddress();
      const disconnect = useDisconnect();

      useEffect(() => {
          if(!nftDrop) return;

          const fetchPrice = async () => {
              const claimConditions = await nftDrop.claimConditions.getAll();
              setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
          }

          fetchPrice();
      }, [nftDrop])

      useEffect(() =>{
          if (!nftDrop) return;

          const fetchNFTDropData = async () => {
              setLoading(true);
              const claimed = await nftDrop.getAllClaimed();
              const total = await nftDrop.totalSupply();

              setClaimSupply(claimed.length);
              setTotalSupply(total);

              setLoading(false);
          }

          fetchNFTDropData();
      },[nftDrop])


      const mintNft = () => {
          if(!nftDrop || !address) return;
          const quantity = 1
          setLoading(true);
          const notification = toast.loading('Minting...', {
            style:{
              background: 'white',
              color: 'green',
              fontWeight: 'bolder',
              fontSize: '17px',
              padding: '20px',
          }
        })

          nftDrop
          .claimTo(address,quantity)
          .then(async (tx) => {
              const receipt = tx[0].receipt
              const claimedToken = tx[0].id
              const claimedNFT = await tx[0].data()

              toast("You have seccessfully claimed NFT Collection Check Your Opensea Profile Now", {
                duration: 8000,
                style: {
                  background: 'green',
                  color: 'white',
                  fontWeight: 'bolder',
                  fontSize: '17px',
                  padding: '20px', }
              })

              console.log(receipt)
              console.log(claimedToken)
              console.log(claimedNFT)
          })
          .catch((err) => {
              console.error(err)
              toast("Whoops... something went wrong ", { 
                style: {
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px', }
              }) 
          }).finally(() => {
              setLoading(false)
              toast.dismiss(notification);
          })
      }

  return (
    <div className="min-h-screen bg-black">
    <Head>
    <title>NFTDrop Challenge</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main >
     <div className='to-blue-400[0.35] to-blue-400[0.25] bg-gradient-to-tr from-purple-400/[0.35] '>
       <div className='mx-auto flex min-h-screen max-w-7xl flex-col p-8'>
       <header className='z-50 flex flex-col items-center justify-between border-b border-pink-400/[0.15] pb-8 md:flex-row md:pb-10'>
            <h1 className='cursor-pointer font-poppins text-sm font-extralight uppercase tracking-wider text-white md:text-xl'>
              THE BEST <span className='font-medium text-purple-800'> NFT
              </span> COLLECTION
            </h1>
            <div className='mt-6 flex flex-col items-center space-y-4 md:mt-0 md:flex-row md:space-y-0 md:space-x-5'>
             
              {address && (
                 <p className='text-center text-sm text-amber-600'>
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
          {/* section */}
          <Toaster />
          <div className='mt-8 flex flex-grow items-center justify-center md:mt-0 md:pt-12'>
            <div className='position: fixed; z-index: 9999; inset: 16px; pointer-events: none;'></div>
            <section className='grid w-full grid-cols-2 items-center gap-0 rounded-xl   p-6 md:grid-cols-4 md:gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-12'>
              <div className='col-span-2'>
                <div className='my-auto rounded-xl bg-gradient-to-bl p-1.5 transition duration-500 ease-in-out hover:rotate-1 from-pink-600/[0.1] to-blue-400/[0.1] md:p-3'>
                  <span className='box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;'>
                    <span className='box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 100% 0px 0px;'></span>
                    <img
                    className='lg:h-full lg:w-full'
                    src={urlFor(collection.mainImage).url()} alt="" />
                  </span>
                </div>
               
              </div>
              <div className='col-span-2 flex flex-col justify-center md:col-span-2 lg:col-span-3'>
                  <div className='flex flex-grow flex-col items-center px-1 pt-8 md:px-0 md:pt-0'>
                    <br /> <br />
                    <h1 className='font-poppins text-4xl font-medium text-white lg:text-4xl '>
                      {collection.nftCollectionName}
                    </h1> <br />
                    <p className='text-md font-poppins font-extralight uppercase tracking-wider text-amber-600 lg:text-lg'>
                      {collection.title}
                    </p> <br />
                    <p className='ont-poppins text-white/75 text-center'>
                      {collection.description}
                    </p> <br />
                    {loading ? (
                       <p className='inline-block w-auto animate-pulse rounded-md py-3 px-4 font-poppins text-lg font-medium uppercase shadow-lg bg-black text-green-500 lg:mb-0'>
                       Loading supply count ...
                       </p>
                    ):(
                      <p className='mb-6 mt-2 inline-block w-auto rounded-md py-3 px-4 font-poppins text-lg font-medium uppercase text-green-600 shadow-lg bg-black  lg:mb-0'>
                                        {claimedSupply} / {totalSupply?.toString()} NFT's claimed
                                        </p>
                    ) }
                    <br /> <br /> <br /> <br /> <br /> 
                    <div className='space-between flex w-full flex-col items-center gap-3 md:gap-4 lg:flex-row lg:pb-2'>
                      <div className='group relative w-full cursor-pointer'>
                        <div className='relative flex items-center space-x-4 divide-gray-600 rounded-2xl px-7 py-4 leading-none text-white transition duration-200 hover:text-purple-500 text-white hover:text-purple-30'>
                          <button onClick={mintNft} disabled={loading || claimedSupply === totalSupply?.toNumber() || !address}   className=' items-center relative flex w-full cursor-pointer items-center justify-between space-x-4 divide-gray-600 rounded-lg px-7 py-4 leading-none transition duration-200  disabled:cursor-not-allowed disabled:bg-gray-400/50 disabled:hover:text-black bg-black text-white  disabled: hover:text-white lg:justify-start'>
                            {loading ? (
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path> </svg> 
                            )}
                          <span className='font-poppins text-lg capitalize tracking-wider transition duration-200 '>
                          {loading ? (
                            
                                  <>Loading ..</>
                              ) : claimedSupply == totalSupply?.toNumber() ? (
                                  <>SOLD OUT</> 
                              ) : !address ? (
                                  <>Sign in to mint</>
                              ) : (
                                  <>MINT ({priceInEth} ETH)</>
                              )}
                          </span>
                          </button>
                        </div>
                      </div>
                      <Link href='/'>
                        <div className='group relative w-full cursor-pointer'>
                          <div className='relative flex items-center space-x-4 divide-gray-600 rounded-2xl px-7 py-4 leading-none text-white transition duration-200 hover:text-purple-500 text-white hover:text-purple-30'>
                            <button   className=' items-center relative flex w-full cursor-pointer items-center justify-between space-x-4 divide-gray-600 rounded-lg px-7 py-4 leading-none transition duration-200  disabled:hover:text-black bg-black text-white  disabled: hover:text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            <span className='font-poppins text-lg capitalize tracking-wider transition duration-200 '>
                              GO BACK
                            </span>
                            </button>
                          </div>
                        </div>
                      </Link>
                     
                    </div>
                    
                  </div>
                </div>
            </section>
          </div>
          <div>
          </div>
       </div>
       <footer className='border-t border-pink-400/[0.15] py-6 text-center font-poppins text-sm font-medium uppercase bg-black/25 text-white'>
          MADE BY <span className='text-purple-400'> MUNASAR ABUUKAR</span>
        </footer>
     </div>
    </main>
  </div>
  )
}

export default NFTDrop


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
  