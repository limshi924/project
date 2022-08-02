import React, { useState } from 'react'
import NFTSell from './collections/NFTSell'
import { IPropsImage } from '../interface/interface'

const NFTGrid = (nfts: any) => {
  const [changeButton, setChangeButton] = useState('all')
  const [datas, setDatas] = useState(['1', '2', '3', '4', '5', '6'])
  return (
    <div>
      <div className="flex">
        <div className="w-[53%] bg-[#f8f9fa] mt-[16px] text-[#adb5bd] text-[14px] rounded-[8px] border-solid border-2 border-[#e9ecef]">
          <ul className="flex grid grid-cols-8  text-center justify-center items-center h-[87px] ">
            <li
              className={
                changeButton === 'all'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('all')}
            >
              <div className="border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center h-[34px]">
                  <img
                    src="/images/collections/png/all.png"
                    className="w-[20px] h-[20px]"
                  />
                </div>
                all NFTs
              </div>
            </li>
            <li
              className={
                changeButton === 'ethereum'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('ethereum')}
            >
              <div className="border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center  h-[34px]">
                  <img
                    src="/images/collections/png/ethereum.png"
                    className="w-[21px] h-[22px]"
                  />
                </div>
                Ethereum
              </div>
            </li>
            <li
              className={
                changeButton === 'arbitrum'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('arbitrum')}
            >
              <div className=" border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center  h-[34px]">
                  <img
                    src="/images/collections/png/arbitrum.png"
                    className="w-[31px] h-[27px]"
                  />
                </div>
                Arbitrum
              </div>
            </li>
            <li
              className={
                changeButton === 'avalanche'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('avalanche')}
            >
              <div className="border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center h-[34px]">
                  <img
                    src="/images/collections/png/avalanche.png"
                    className="w-[22px] h-[34px]"
                  />
                </div>
                Avalanche
              </div>
            </li>
            <li
              className={
                changeButton === 'bnb'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('bnb')}
            >
              <div className=" border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center h-[34px]">
                  <img
                    src="/images/collections/png/bnb.png"
                    className="w-[28px] h-[30px]"
                  />
                </div>
                BNB Chain
              </div>
            </li>
            <li
              className={
                changeButton === 'fantom'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('fantom')}
            >
              <div className="border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center h-[34px]">
                  <img
                    src="/images/collections/png/fantom.png"
                    className="w-[22px] h-[22px]"
                  />
                </div>
                Fantom
              </div>
            </li>
            <li
              className={
                changeButton === 'optimisim'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('optimisim')}
            >
              <div className="border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center h-[34px]">
                  <img
                    src="/images/collections/png/optimism.png"
                    className="w-[22px] h-[22px]"
                  />
                </div>
                Optimism
              </div>
            </li>
            <li
              className={
                changeButton === 'polygon'
                  ? "bg-[#E9ECEF] border-2 border-[#ADB5BD] rounded-[8px] border-solid text-[#1E1C21] font-['Circular_Std']"
                  : ''
              }
              onClick={() => setChangeButton('polygon')}
            >
              <div className="border-solid border-2 rounded-[8px] border-[#f7f8fa] hover:border-[#e9ecef] pt-1.5 pb-1.5">
                <div className="flex justify-center items-center h-[34px]">
                  <img
                    src="/images/collections/png/polygon.png"
                    className="w-[26.5px] h-[24px]"
                  />
                </div>
                Polygon
              </div>
            </li>
          </ul>
        </div>

        <div className="w-[47%] flex justify-end items-end">
          <div className="relative flex items-center">
            <div className="absolute m-[16px]">
              <img
                src="/images/collections/png/se.svg"
                className=" w-[27px] h-[20px]"
              />
            </div>
            <select className="py-[6px] px-[56px] pr-[61px] text-[18px] text-[#6C757D] cursor-pointer border-solid border-2 rounded-[8px] !border-[#e9ecef] ring-white">
              <option className="!bg-[#fff] hover:!bg-white" value="0">
                active listings
              </option>
              <option className="!bg-[#fff] hover:!bg-white" value="1">
                1
              </option>
              <option className="!bg-[#fff] hover:!bg-white" value="2">
                2
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full mb-5 mt-10">
        <div className="grid 2xl:grid-cols-5 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {datas.map((item, index) => {
            return <NFTSell key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default NFTGrid
