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

              toast("You have seccessfully claimed NFT Collection", {
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
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main >
      <div className='to-blue-400/20 bg-gradient-to-tr from-purple-400/20'>
          <Toaster />
        <div className='mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0 '>
            <header className='flex item-center justify-between'>
                 <Link href='/'>
                <h1 className='lg:mb-10 lg:text-4xl w-52 cursor-pointer tex-xl font-extralight sm:w-80 text-white'> 
                <span className='font-extrabold underline decoration-pink-600/50'>
                        CAAQIL
                </span> NFT Market Place   
                </h1>
                </Link>
                { address ?
                <button onClick={() => (address ? disconnect() : connectWithMetamask()) } className=' rounded-2xl bg-red-500 px-4 py-2 text-xs font-bold text-white lg:px-10 lg:py-6 lg:mt-0 lg:h-16 lg:text-sm'>Sign Out</button>
                : 
                <button onClick={() => (address ? disconnect() : connectWithMetamask()) } className='rounded-2xl bg-green-500 px-4 py-2 text-xs font-bold text-white lg:px-10 lg:py-6 lg:mt-0 lg:h-16 lg:text-sm'>Sing In</button>
                }
            </header>
            {address && (
               <p className='text-center text-sm text-green-400'>
               You're logged in with wallet {address.substring(0,5)}.... {address.substring(address.length - 5)}
             </p>
           )}
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
  