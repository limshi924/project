import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { chain_list } from '../../utils/utils'
import { IPropsNFTItem } from '../../interface/interface'
import LazyLoad from 'react-lazyload'
import USD from '../../public/images/USD.png'
import { checkboxClasses } from '@mui/material'
import { setUncaughtExceptionCaptureCallback } from 'process'
import { boolean } from 'yargs'

const NFTBox = ({ nft, col_url, chain }: IPropsNFTItem) => {
  const [imageError, setImageError] = useState(false)
  const [showEffect, setShowEffect] = useState(false)
  const [checkIdArray, setCheckIdArray] = useState(false)

  const checkBox = (e: any, id: any) => {
    e.stopPropagation()
    setCheckIdArray(!checkIdArray)
  }

  return (
    <div
      className="w-full border-[#F8F9FA] border-2 rounded-lg hover:bg-[#F8F9FA] hover:drop-shadow"
      onMouseEnter={() => setShowEffect(true)}
      onMouseLeave={() => {
        setShowEffect(false)
      }}
    >
      <Link href={`/collections/${col_url}/${nft.token_id}`}>
        <a>
          <div className="relative">
            <LazyLoad
              className="hover:rounded-[6px]"
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, rgba(254, 254, 255, 0.25) 0%, rgba(254, 254, 255, 0.1) 100%)',
                filter: showEffect === true ? 'blur(1px)' : '',
              }}
              placeholder={
                <img src={'/images/omnix_logo_black_1.png'} alt="nft-image" />
              }
            >
              <img
                src={
                  imageError || nft.image == null
                    ? '/images/omnix_logo_black_1.png'
                    : nft.image
                }
                alt="nft-image"
                onError={(e) => {
                  setImageError(true)
                }}
                data-src={nft.image}
              />
            </LazyLoad>
            <div
              className={
                showEffect === true
                  ? 'absolute w-[45px] h-[45px] top-2 right-[9px] flex justify-center items-center'
                  : 'hidden'
              }
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, rgba(254, 254, 255, 0.2) 0%, rgba(254, 254, 255, 0) 100%)',
              }}
            >
              <input
                className="p-[8.5px] rounded-[50%] hover:shadow-[0_0_8px_0px_rgb(0,0,0)]"
                style={{
                  backgroundColor:
                    checkIdArray === true
                      ? 'rgba(180, 68, 249, 0.7)'
                      : 'rgba(180, 68, 249, 0.1)',
                  border: '2px solid rgba(180, 68, 249, 0.7)',
                }}
                type="checkbox"
                id="myCheck"
                onClick={(e) => checkBox(e, nft.token_id)}
              />
            </div>
          </div>
          <div className="text-[#6C757D] text-sm mt-3 px-3">
            {nft.name}
            {` #${nft.token_id}`}
          </div>
          <div className="my-3 px-3">
            <div className="columns-2">
              <div className="flex items-center">
                <img src="/svgs/ethereum.svg" className="w-[18px] h-[18px]" />
                <span className="text-[#1E1C21] text-sm ml-2">
                  {' '}
                  {nft.price}
                </span>
              </div>
              <div className="flex items-center flex-row-reverse">
                {(chain === 'eth' || chain === 'rinkeby') && (
                  <img src="/svgs/ethereum.svg" className="w-[16px] h-[16px]" />
                )}
                {chain === 'bsc' && (
                  <img src="/svgs/binance.svg" className="w-[16px] h-[16px]" />
                )}
                {chain === 'matic' && (
                  <img src="/svgs/polygon.svg" className="w-[16px] h-[16px]" />
                )}
                {chain === 'avalanche' && (
                  <img src="/svgs/avax.svg" className="w-[16px] h-[16px]" />
                )}
                {chain === 'fantom' && (
                  <img src="/svgs/fantom.svg" className="w-[16px] h-[16px]" />
                )}
                {chain === 'optimism' && (
                  <img src="/svgs/optimism.svg" className="w-[16px] h-[16px]" />
                )}
                {chain === 'arbitrum' && (
                  <img src="/svgs/arbitrum.svg" className="w-[16px] h-[16px]" />
                )}
                <span className="text-[#6C757D] text-sm mr-2">Chain : </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default NFTBox
