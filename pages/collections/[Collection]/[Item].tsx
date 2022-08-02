import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

//material ui dialog
import Dialog from '@mui/material/Dialog'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import {
  getNFTInfo,
  selectNFTInfo,
} from '../../../redux/reducers/collectionsReducer'
import LazyLoad from 'react-lazyload'

import PngAlert from '../../../public/images/collections/alert.png'
import PngLike from '../../../public/images/collections/like.png'
import PngLink from '../../../public/images/collections/link.png'
import PngView from '../../../public/images/collections/view.png'

import PngEtherBg from '../../../public/images/collections/ethereum_bg.png'
import PngEther from '../../../public/images/collections/ethereum.png'
import PngOmni from '../../../public/images/collections/omni.png'
import PngCheck from '../../../public/images/collections/check.png'
import PngType1 from '../../../public/images/collections/type1.png'
import PngType2 from '../../../public/images/collections/type2.png'
import PngPolygon from '../../../public/images/collections/polygon.png'

import PngIcon1 from '../../../public/images/collections/dbanner1.png'
import PngIcon2 from '../../../public/images/collections/dbanner2.png'
import PngIcon3 from '../../../public/images/collections/dbanner3.png'

const Item: NextPage = () => {
  const [imageError, setImageError] = useState(false)
  const [currentTab, setCurrentTab] = useState<string>('items')
  const [open, setOpen] = React.useState(false)
  const [expandedMenu, setExpandedMenu] = useState(0)
  const [tag, setTag] = useState(false)
  const [displaydropdowncoin, setDisplayDropdownCoin] = React.useState(false)
  const [displaydropdownDay, setDisplayDropdownDay] = React.useState(false)
  const [coinvalue, setCoinDropdown] = React.useState('OMMI')
  const [dayValue, setDayDropdown] = React.useState('1 Week')
  const [coinImage, setCoinImage] = React.useState(PngOmni)

  const router = useRouter()
  const dispatch = useDispatch()

  const col_url = router.query.Collection as string
  const token_id = router.query.Item as string

  const nftInfo = useSelector(selectNFTInfo)

  useEffect(() => {
    if (col_url && token_id) {
      dispatch(getNFTInfo(col_url, token_id) as any)
    }
  }, [col_url, token_id])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const changeTag = (data: any) => {
    setTag(data)
  }

  const onClickDownSpan = () => {
    setDisplayDropdownCoin(!displaydropdowncoin)
  }
  const onClickDownSpanDay = () => {
    setDisplayDropdownDay(!displaydropdownDay)
  }
  return (
    <>
      {nftInfo && nftInfo.nft && (
        <div className="w-full mt-40 pr-[70px] pb-[120px]">
          <div className="w-full 2xl:px-[10%] xl:px-[5%] lg:px-[2%] md:px-[2%]">
            <div className="flex">
              <div className="w-[480px]">
                <LazyLoad
                  className="w-[480px]"
                  placeholder={
                    <img
                      src={'/images/omnix_logo_black_1.png'}
                      alt="nft-image"
                    />
                  }
                >
                  <img
                    src={
                      imageError
                        ? '/images/omnix_logo_black_1.png'
                        : nftInfo.nft.image
                    }
                    alt="nft-image"
                    onError={(e) => {
                      setImageError(true)
                    }}
                    data-src={nftInfo.nft.image}
                  />
                </LazyLoad>
              </div>
              <div className="w-[820px] ml-12">
                <div className="px-6 py-3 bg-[#F8F9FA]">
                  <div className="flex mb-5">
                    <h1 className="text-[#1E1C21] text-[32px] font-bold">
                      {nftInfo.collection.name}
                    </h1>
                    <div className="flex items-center ml-8">
                      <Image src={PngCheck} alt="" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#0a0a0b] text-[23px] font-normal underline">
                      {nftInfo.nft.name}
                    </h1>
                    {/* <div className="flex items-center ml-16">
                      <Image src={PngLike} alt="" />
                    </div>
                    <span className="ml-5 text-[#ADB5BD] text-[20px]">
                      24.5k
                    </span>
                    <div className="flex items-center ml-8">
                      <Image src={PngView} alt="" />
                    </div>
                    <span className="ml-2 text-[#ADB5BD] text-[20px]">
                      12.2k
                    </span> */}
                    <div className="flex items-center ml-8">
                      <Image src={PngLink} alt="" />
                    </div>
                    {/* <div className="flex items-center ml-8">
                      <Image src={PngAlert} alt="" />
                    </div> */}
                  </div>
                </div>
                <div className="flex px-6 py-5 mt-5 bg-[#F8F9FA]">
                  <div
                    className="pr-[61px]"
                    style={{ borderRight: '1px solid #ADB5BD' }}
                  >
                    <div className="flex justify-start items-center">
                      <h1 className="text-[#1E1C21] text-[20px] font-bold">
                        owner:
                      </h1>
                      <h1 className="text-[#B444F9] text-[20px] font-normal underline ml-4">
                        BOOBA.ETH
                      </h1>
                    </div>
                    <div className="flex mt-6">
                      <h1
                        style={{ letterSpacing: '7px' }}
                        className="text-[#1E1C21] text-[60px] font-['Roboto Mono'] font-normal"
                      >
                        69.5
                      </h1>
                      <div className="flex items-center ml-6">
                        <img
                          style={{ maxWidth: '40px', height: '42px' }}
                          src="/images/collections/ethereum_bg.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="">
                      <h1
                        style={{ letterSpacing: '2px' }}
                        className="mt-[-20px] text-[#1E1C21] text-[16px] font-normal"
                      >
                        $175,743.58
                      </h1>
                    </div>
                    <div className="mt-5">
                      <div className="flex justify-start items-center">
                        <h1
                          style={{ letterSpacing: '2px' }}
                          className="flex justify-between mr-1 font-semibold w-[145px]"
                        >
                          Highest Bid: <span className="font-normal">45</span>
                        </h1>
                        <Image src={PngEther} width={15} height={16} alt="" />
                      </div>
                      <div className="flex justify-start items-center mt-[7px]">
                        <h1
                          style={{ letterSpacing: '2px' }}
                          className="mr-1 font-semibold flex justify-between w-[145px]"
                        >
                          Last Sale: <span className="font-normal">42</span>
                        </h1>
                        <Image src={PngEther} width={15} height={16} alt="" />
                      </div>
                    </div>
                    <div className="mt-7">
                      <div className="flex justify-start items-center 2xl:ml-[125px] xl:ml-[125px] lg:ml-20 md:ml-20">
                        {/* <button
                          className="w-[95px] px-5 py-2 bg-[#1E1C21] text-[#FEFEFF] font-['Roboto Mono'] font-semibold text-[30px] rounded-[8px] border-2 border-[#1E1C21] z-10"
                          // onClick={handleClickOpen}
                        >
                          buy
                        </button> */}
                        <button className="w-[95px] pl-7 pr-[33px] py-[6px] bg-[#ADB5BD] text-[#FFFFFF] font-['Circular Std'] font-semibold text-[18px] rounded-[4px]">
                          bid
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pl-14 pr-2">
                    <div className="flex mb-[22px]">
                      <h1 className="text-[#000000] font-[18px] text-[18px] font-bold mr-[70px]">
                        account
                      </h1>
                      <h1 className="text-[#000000] text-[18px] font-bold mr-[40px]">
                        chain
                      </h1>
                      <h1 className="text-[#000000] text-[18px] font-bold">
                        bid
                      </h1>
                    </div>
                    <div className="flex items-center mb-4">
                      <h1 className="text-[#000000] text-[14px] font-['Circular Std'] font-bold pr-12">
                        0xdh3skfhn3...
                      </h1>
                      <img width="22px" height="27px" src="/images/collections/type2.png" alt="" />
                      <div className="pl-[59px] flex justify-between">
                        <div className="flex mr-8 items-center">
                          <img
                            width="24px"
                            src="/images/collections/omni.png"
                            alt=""
                          />
                          <h1 className="ml-2 text-[#000000] text-[14px] font-['Circular Std'] font-bold">
                            45,700.00
                          </h1>
                        </div>
                        <button className="w-[63px] px-2 bg-[#ADB5BD] text-[#FFFFFF] font-['Circular Std'] font-normal text-[14px] rounded-[4px]">
                          accept
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <h1 className="text-[#000000] text-[14px] font-['Circular Std'] font-bold pr-12">
                        0xdh3skfhn3...
                      </h1>
                      <img width="22px" height="27px" src="/images/collections/type2.png" alt="" />
                      <div className="pl-[59px] flex justify-between">
                        <div className="flex mr-8 items-center">
                          <img
                            width="24px"
                            src="/images/collections/omni.png"
                            alt=""
                          />
                          <h1 className="ml-2 text-[#000000] text-[14px] font-['Circular Std'] font-bold">
                            45,700.00
                          </h1>
                        </div>
                        <button className="w-[63px] px-2 bg-[#ADB5BD] text-[#FFFFFF] font-['Circular Std'] font-normal text-[14px] rounded-[4px]">
                          accept
                        </button>
                      </div>
                    </div><div className="flex items-center mb-4">
                      <h1 className="text-[#000000] text-[14px] font-['Circular Std'] font-bold pr-12">
                        0xdh3skfhn3...
                      </h1>
                      <img width="22px" height="27px" src="/images/collections/type2.png" alt="" />
                      <div className="pl-[59px] flex justify-between">
                        <div className="flex mr-8 items-center">
                          <img
                            width="24px"
                            src="/images/collections/omni.png"
                            alt=""
                          />
                          <h1 className="ml-2 text-[#000000] text-[14px] font-['Circular Std'] font-bold">
                            45,700.00
                          </h1>
                        </div>
                        <button className="w-[63px] px-2 bg-[#ADB5BD] text-[#FFFFFF] font-['Circular Std'] font-normal text-[14px] rounded-[4px]">
                          accept
                        </button>
                      </div>
                    </div><div className="flex items-center mb-4">
                      <h1 className="text-[#000000] text-[14px] font-['Circular Std'] font-bold pr-12">
                        0xdh3skfhn3...
                      </h1>
                      <img width="22px" height="27px" src="/images/collections/type2.png" alt="" />
                      <div className="pl-[59px] flex justify-between">
                        <div className="flex mr-8 items-center">
                          <img
                            width="24px"
                            src="/images/collections/omni.png"
                            alt=""
                          />
                          <h1 className="ml-2 text-[#000000] text-[14px] font-['Circular Std'] font-bold">
                            45,700.00
                          </h1>
                        </div>
                        <button className="w-[63px] px-2 bg-[#ADB5BD] text-[#FFFFFF] font-['Circular Std'] font-normal text-[14px] rounded-[4px]">
                          accept
                        </button>
                      </div>
                    </div><div className="flex items-center mb-4">
                      <h1 className="text-[#000000] text-[14px] font-['Circular Std'] font-bold pr-12">
                        0xdh3skfhn3...
                      </h1>
                      <img width="22px" height="27px" src="/images/collections/type2.png" alt="" />
                      <div className="pl-[59px] flex justify-between">
                        <div className="flex mr-8 items-center">
                          <img
                            width="24px"
                            src="/images/collections/omni.png"
                            alt=""
                          />
                          <h1 className="ml-2 text-[#000000] text-[14px] font-['Circular Std'] font-bold">
                            45,700.00
                          </h1>
                        </div>
                        <button className="w-[63px] px-2 bg-[#ADB5BD] text-[#FFFFFF] font-['Circular Std'] font-normal text-[14px] rounded-[4px]">
                          accept
                        </button>
                      </div>
                    </div><div className="flex items-center mb-4">
                      <h1 className="text-[#000000] text-[14px] font-['Circular Std'] font-bold pr-12">
                        0xdh3skfhn3...
                      </h1>
                      <img width="22px" height="27px" src="/images/collections/type2.png" alt="" />
                      <div className="pl-[59px] flex justify-between">
                        <div className="flex mr-8 items-center">
                          <img
                            width="24px"
                            src="/images/collections/omni.png"
                            alt=""
                          />
                          <h1 className="ml-2 text-[#000000] text-[14px] font-['Circular Std'] font-bold">
                            45,700.00
                          </h1>
                        </div>
                        <button className="w-[63px] px-2 bg-[#ADB5BD] text-[#FFFFFF] font-['Circular Std'] font-normal text-[14px] rounded-[4px]">
                          accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1310px] mt-10">
              <div className="ml-10">
                <ul className="flex flex-wrap relative justify-item-stretch text-sm font-medium text-center text-gray-500">
                  <li
                    className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${
                      currentTab === 'items'
                        ? 'bg-slate-200 text-[#1E1C21]'
                        : 'bg-slate-100'
                    }`}
                    onClick={() => setCurrentTab('items')}
                  >
                    properties
                  </li>
                  <li
                    className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${
                      currentTab === 'activity'
                        ? 'bg-slate-200 text-[#1E1C21]'
                        : 'bg-slate-100'
                    }`}
                    onClick={() => setCurrentTab('activity')}
                  >
                    activity
                  </li>
                  <li
                    className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${
                      currentTab === 'info'
                        ? 'bg-slate-200 text-[#1E1C21]'
                        : 'bg-slate-100'
                    }`}
                    onClick={() => setCurrentTab('info')}
                  >
                    info
                  </li>
                  <li
                    className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${
                      currentTab === 'stats'
                        ? 'bg-slate-200 text-[#1E1C21]'
                        : 'bg-slate-100'
                    }`}
                    onClick={() => setCurrentTab('stats')}
                  >
                    stats
                  </li>
                </ul>
              </div>
              <div className="border-2 border-[#E9ECEF] bg-[#F8F9FA] px-10 py-8">
                {currentTab == 'items' && (
                  <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4">
                    {Object.entries(nftInfo.nft.attributes).map((item, idx) => {
                      const attrs = nftInfo.collection.attrs
                      const attr = attrs[item[0]].values
                      const trait = attr[(item[1] as string).toLowerCase()]
                      return (
                        <div
                          className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px]"
                          key={idx}
                        >
                          <p className="text-[#B444F9] text-[12px] font-bold">
                            {item[0]}
                          </p>
                          <div className="flex justify-start items-center mt-2">
                            <p className="text-[#1E1C21] text-[18px] font-bold">
                              {item[1]}
                              <span className="ml-3 font-normal">
                                [{trait[1]}%]
                              </span>
                            </p>
                            <p className="ml-5 mr-3 text-[#1E1C21] text-[18px] ml-auto">
                              {nftInfo.price}
                            </p>
                            <Image src={PngEther} alt="" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div
              className="flex justify-between pt-5 pb-10 px-8"
              style={{ alignItems: 'center' }}
            >
              <div
                className="px-0 py-0"
                id="alert-dialog-title"
                style={{
                  fontFamily: 'Circular Std',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '28px',
                  lineHeight: '35px',
                  color: tag === true ? '#1E1C21' : '#ADB5BD',
                }}
              >
                {'List item for sale'}
              </div>
              <div
                className="flex"
                style={{
                  background: '#f8f9fA',
                  border: '2px solid #ADB5BD',
                  borderRadius: '8px',
                  alignItems: 'center',
                }}
              >
                <div
                  className="px-4 p-2 cursor-pointer"
                  style={
                    tag === true? {background: '#E9ECEF',borderRight: '2px solid #ADB5BD',borderRadius: '8px',}: {}
                  }
                >
                  <p
                    style={{
                      color: '#ADB5BD',
                      fontFamily: 'Circular Std',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '16px',
                      lineHeight: '20px',
                    }}
                    onClick={() => changeTag(false)}
                  >
                    fixed price
                  </p>
                </div>
                <div
                  className="px-4 p-2 cursor-pointer"
                  style={
                    tag == false? {background: '#E9ECEF',borderLeft: '2px solid #ADB5BD',borderRadius: '8px',}: {}
                  }
                >
                  <p
                    style={{
                      color: '#ADB5BD',
                      fontFamily: 'Circular Std',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '16px',
                      lineHeight: '20px',
                    }}
                    onClick={() => changeTag(true)}
                  >
                    auction
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-8">
              <div>
                <div>
                  <p
                    className="pb-3 pt-2"
                    style={{
                      color: tag === true ? '#6C757D' : '#ADB5BD',
                      fontFamily: 'Circular Std',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '18px',
                      lineHeight: '23px',
                    }}
                  >
                    {tag ? 'Starting Price' : 'Sale Price'}
                  </p>
                  <div
                    className="flex text-center"
                    style={{ alignItems: 'center' }}
                  >
                    <div
                      className={`text-center ${
                        expandedMenu == 2 ? 'active' : ''
                      }`}
                      style={{
                        width: '180px',
                        alignItems: 'center',
                      }}
                      //   disabled={tag === true ? false : true}
                    >
                      <div
                        className={`flex justify-between text-center p-1 ${
                          expandedMenu == 2 ? 'active' : ''
                        }`}
                        style={{
                          background: '#F8F9FA',
                          width: '180px',
                          border: '2px solid #E9ECEF',
                          borderRadius: '8px',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          style={{ padding: '10px', width: '20px' }}
                          src={coinImage}
                          alt=""
                        />
                        <p
                          className="pl-1 py-2 pr-16"
                          style={{
                            color: tag === true ? '#1E1C21' : '#ADB5BD',
                            fontFamily: 'Circular Std',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '16px',
                            lineHeight: '20px',
                          }}
                        >
                          {coinvalue}
                        </p>
                        <span
                          onClick={() => onClickDownSpan()}
                          style={{
                            background: '#F8F9FA',
                            borderLeft: '1px solid #E9ECEF',
                          }}
                          className="p-1 pull-right"
                        >
                          <i
                            style={{ color: '#ADB5BD' }}
                            className={`p-1 ${
                              displaydropdowncoin
                                ? 'fa fa-chevron-up'
                                : 'fa fa-chevron-down'
                            }`}
                          ></i>
                        </span>
                      </div>
                      <div
                        className={'dropdown-coin'}
                        style={{
                          marginTop: '-3px',
                          opacity: '0.6',
                          position: 'absolute',
                          display: displaydropdowncoin ? 'block' : 'none',
                        }}
                      >
                        <div
                          onClick={() => {
                            setCoinImage(PngOmni)
                            setDisplayDropdownCoin(false)
                            setCoinDropdown('OMMI')
                          }}
                          className={`flex text-center p-1 ${
                            expandedMenu == 2 ? 'active' : ''
                          }`}
                          style={{
                            background: '#F8F9FA',
                            border: '1px solid #E9ECEF',
                            borderTop: 'none',
                            borderBottom: 'none',
                            width: '180px',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Image
                            style={{ padding: '10px', width: '20px' }}
                            src={PngOmni}
                            alt=""
                          />
                          <p
                            className="pl-1 py-2 pr-16"
                            style={{
                              color: tag === true ? '#1E1C21' : '#ADB5BD',
                              fontFamily: 'Circular Std',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '16px',
                              lineHeight: '20px',
                            }}
                          >
                            OMMI
                          </p>
                        </div>
                        <div
                          onClick={() => {
                            setCoinImage(PngEther)
                            setDisplayDropdownCoin(false)
                            setCoinDropdown('ETHER')
                          }}
                          className={`flex text-center p-1 ${
                            expandedMenu == 2 ? 'active' : ''
                          }`}
                          style={{
                            background: '#F8F9FA',
                            border: '1px solid #E9ECEF',
                            borderTop: 'none',
                            borderBottom: 'none',
                            width: '180px',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Image
                            style={{ padding: '10px', width: '20px' }}
                            src={PngEther}
                            alt=""
                          />
                          <p
                            className="pl-1 py-2 pr-16"
                            style={{
                              color: tag === true ? '#1E1C21' : '#ADB5BD',
                              fontFamily: 'Circular Std',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '16px',
                              lineHeight: '20px',
                            }}
                          >
                            ETHER
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className={`flex text-center ml-6 p-1 ${
                        expandedMenu == 2 ? 'active' : ''
                      }`}
                      style={{
                        width: '23%',
                        background: '#F8F9FA',
                        padding: '10px',
                        border: '2px solid #E9ECEF',
                        borderRadius: '8px',
                        alignItems: 'center',
                        color: tag === true ? '#000000' : '#ADB5BD',
                      }}
                      value="40.50"
                      disabled={tag === true ? false : true}
                    />
                    <p
                      className="ml-14"
                      style={{
                        color: '#ADB5BD',
                        fontFamily: 'Roboto Mono',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px',
                      }}
                    >
                      ~ $40.50 USD
                    </p>
                  </div>
                </div>
                <div
                  className="pt-10"
                  style={
                    tag === true ? { display: 'none' } : { display: 'block' }
                  }
                >
                  <p
                    className="pb-3"
                    style={{
                      color: '#ADB5BD',
                      fontFamily: 'Circular Std',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '18px',
                      lineHeight: '23px',
                    }}
                  >
                    Reserve Price
                  </p>
                  <div
                    className="flex text-center"
                    style={{ alignItems: 'center' }}
                  >
                    <div
                      className={`flex text-center p-1 ${
                        expandedMenu == 2 ? 'active' : ''
                      }`}
                      style={{
                        background: '#F8F9FA',
                        width: '180px',
                        border: '2px solid #E9ECEF',
                        borderRadius: '8px',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        style={{ padding: '10px', width: '20px' }}
                        src={PngEther}
                        alt=""
                      />
                      <p
                        className="pl-1 py-2 pr-16"
                        style={{
                          color: '#ADB5BD',
                          fontFamily: 'Circular Std',
                          fontStyle: 'normal',
                          fontWeight: '500',
                          fontSize: '16px',
                          lineHeight: '20px',
                        }}
                      >
                        OMNI
                      </p>
                    </div>
                    <input
                      type="text"
                      className={`flex text-center ml-6 p-1 ${
                        expandedMenu == 2 ? 'active' : ''
                      }`}
                      style={{
                        width: '23%',
                        background: '#F8F9FA',
                        padding: '10px',
                        border: '2px solid #E9ECEF',
                        borderRadius: '8px',
                        alignItems: 'center',
                        color: '#ADB5BD',
                      }}
                      value="40.50"
                      disabled
                    />
                    <p
                      className="ml-14"
                      style={{
                        color: '#ADB5BD',
                        fontFamily: 'Roboto Mono',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px',
                      }}
                    >
                      ~ $40.50 USD
                    </p>
                  </div>
                </div>

                <div
                  style={
                    tag === false
                      ? { display: 'none' }
                      : { display: 'block', padding: '20px' }
                  }
                >
                  <p
                    style={{
                      fontFamily: 'Roboto Mono',
                      fontStyle: 'italic',
                      fontWeight: '300',
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#ADB5BD',
                    }}
                  >
                    *sale funds are recieved on the blockchain the NFT is
                    currently hosted on
                  </p>
                </div>
                <div>
                  <p
                    className="pb-3 pt-10"
                    style={{
                      color: '#ADB5BD',
                      fontFamily: 'Circular Std',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '18px',
                      lineHeight: '23px',
                    }}
                  >
                    Duration
                  </p>
                  <div
                    className="flex text-center"
                    style={{ alignItems: 'center' }}
                  >
                    <div
                      className={`text-center ${
                        expandedMenu == 2 ? 'active' : ''
                      }`}
                      style={{
                        width: '180px',
                        alignItems: 'center',
                      }}
                      //   disabled={tag === true ? false : true}
                    >
                      <div
                        className={`flex justify-between text-center p-1 ${
                          expandedMenu == 2 ? 'active' : ''
                        }`}
                        style={{
                          background: '#F8F9FA',
                          width: '180px',
                          border: '2px solid #E9ECEF',
                          borderRadius: '8px',
                          alignItems: 'center',
                        }}
                      >
                        <p
                          className="pl-1 py-2 pr-16"
                          style={{
                            color: tag === true ? '#1E1C21' : '#ADB5BD',
                            fontFamily: 'Circular Std',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '16px',
                            lineHeight: '20px',
                          }}
                        >
                          {dayValue}
                        </p>
                        <span
                          onClick={() => onClickDownSpanDay()}
                          style={{
                            background: '#F8F9FA',
                            borderLeft: '1px solid #E9ECEF',
                          }}
                          className="p-1 pull-right"
                        >
                          <i
                            style={{ color: '#ADB5BD' }}
                            className={`p-1 ${
                              displaydropdownDay
                                ? 'fa fa-chevron-up'
                                : 'fa fa-chevron-down'
                            }`}
                          ></i>
                        </span>
                      </div>
                      <div
                        className={'dropdown-coin'}
                        style={{
                          marginTop: '-3px',
                          position: 'absolute',
                          opacity: '0.6',
                          display: displaydropdownDay ? 'block' : 'none',
                        }}
                      >
                        <div
                          onClick={() => {
                            setDisplayDropdownDay(false)
                            setDayDropdown('1 Week')
                          }}
                          className={`flex text-center p-1 ${
                            expandedMenu == 2 ? 'active' : ''
                          }`}
                          style={{
                            background: '#F8F9FA',
                            border: '1px solid #E9ECEF',
                            borderTop: 'none',
                            borderBottom: 'none',
                            width: '180px',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <p
                            className="pl-1 py-2 pr-16"
                            style={{
                              color: tag === true ? '#1E1C21' : '#ADB5BD',
                              fontFamily: 'Circular Std',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '16px',
                              lineHeight: '20px',
                            }}
                          >
                            1 Week
                          </p>
                        </div>
                        <div
                          onClick={() => {
                            setDisplayDropdownDay(false)
                            setDayDropdown('1 Month')
                          }}
                          className={`flex text-center p-1 ${
                            expandedMenu == 2 ? 'active' : ''
                          }`}
                          style={{
                            background: '#F8F9FA',
                            border: '1px solid #E9ECEF',
                            borderTop: 'none',
                            borderBottom: 'none',
                            width: '180px',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <p
                            className="pl-1 py-2 pr-16"
                            style={{
                              color: tag === true ? '#1E1C21' : '#ADB5BD',
                              fontFamily: 'Circular Std',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '16px',
                              lineHeight: '20px',
                            }}
                          >
                            1 Month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <LazyLoad
                  placeholder={
                    <img
                      src={'/images/omnix_logo_black_1.png'}
                      alt="nft-image"
                    />
                  }
                  style={{ width: '200px' }}
                >
                  <img
                    src={
                      imageError
                        ? '/images/omnix_logo_black_1.png'
                        : nftInfo.nft.image
                    }
                    alt="nft-image"
                    onError={(e) => {
                      setImageError(true)
                    }}
                    data-src={nftInfo.nft.image}
                  />
                </LazyLoad>
                <p className="text-[#6C757D] text-[14px]">
                  {nftInfo.nft.name}
                  {' #123'}
                </p>
              </div>
            </div>
            <div
              className="pt-8 flex justify-between px-8 pb-10"
              style={{ alignItems: 'center' }}
            >
              <button
                className="py-1 px-7"
                style={{
                  background: tag === true ? '#B00000' : '#ADB5BD',
                  borderRadius: '4px',
                  color: '#FFFFFF',
                }}
              >
                list
              </button>
              <div>
                <div
                  className="flex"
                  style={{
                    paddingLeft: '100px',
                    fontFamily: 'Roboto Mono',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#ADB5BD',
                  }}
                >
                  <p>service fee:</p>
                  <p style={{ fontWeight: '300' }}>1.50% *</p>
                </div>
                <div
                  className="flex"
                  style={{
                    paddingLeft: '100px',
                    fontFamily: 'Roboto Mono',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#ADB5BD',
                  }}
                >
                  <p>creator fee:</p>
                  <p style={{ fontWeight: '300' }}>2.00% *</p>
                </div>
                <p
                  style={{
                    width: '200px',
                    fontFamily: 'Roboto Mono',
                    fontStyle: 'italic',
                    fontWeight: '300',
                    fontSize: '12px',
                    lineHeight: '16px',
                    textAlign: 'right',
                    color: '#ADB5BD',
                  }}
                >
                  *purchases using $OMNI reduce buyer’s platform tax from 2% to
                  1.5%
                </p>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  )
}

export default Item
