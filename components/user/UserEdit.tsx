import React, { useEffect, useRef, useState, useCallback } from 'react'

import Cropper from 'react-easy-crop'

import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Slider from '@material-ui/core/Slider'

import { getCroppedImg } from './CanvasUtils'

import Image from 'next/image'
import Close from '../../public/images/close.png'
import Default from '../../public/images/banner-1.png'
import Twitter from '../../public/images/twitter.png'
import Web from '../../public/images/web.png'
import Photo from '../../public/images/photo.png'
import useWallet from '../../hooks/useWallet'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUser,
  getUser,
  selectUser,
} from '../../redux/reducers/userReducer'
import classNames from '../../helpers/classNames'
import editStyle from '../../styles/useredit.module.scss'
import UserSVG from '../../public/svgs/user.svg'
import AlertSVG from '../../public/svgs/alert.svg'
import PaymentSVG from '../../public/svgs/payment.svg'

import PngEther from '../../public/images/collections/ethereum.png'
import PngOmni from '../../public/images/collections/omni.png'

interface IUserEditProps {
  updateModal: (arg: string) => void
}
const UserEdit: React.FC<IUserEditProps> = ({ updateModal }) => {
  const updateProfileFormRef = useRef<HTMLFormElement>(null)
  const [avatar, setAvatar] = useState(
    process.env.API_URL + 'uploads\\default_avatar.png'
  )
  const [banner_1, setBanner_1] = useState(
    process.env.API_URL + 'uploads\\default_banner.png'
  )
  const [banner_2, setBanner_2] = useState(
    process.env.API_URL + 'uploads\\default_banner.png'
  )
  const [banner_3, setBanner_3] = useState(
    process.env.API_URL + 'uploads\\default_banner.png'
  )
  const [bannerSelected, setBannerSelect] = useState(0)
  const [username, setUserName] = useState('')
  const [bio, setBio] = useState('')
  const [twitter, setTwitter] = useState('')
  const [website, setWebsite] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)
  const [expandedMenu, setExpandedMenu] = useState(0)

  const [cropDlgOpen, setCropDlgOpen] = useState(false)
  const [imageSrc, setImageSrc] = React.useState<string>('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const [tag, setTag] = useState(false)
  const [displaydropdowncoin, setDisplayDropdownCoin] = React.useState(false)
  const [displaydropdowncoinBid, setDisplayDropdownCoinBid] =
    React.useState(false)

  const [coinvalue, setCoinDropdown] = React.useState('OMNI')
  const [coinImage, setCoinImage] = React.useState(PngOmni)
  const [coinvalue1, setCoinDropdown1] = React.useState('OMNI')
  const [coinImage1, setCoinImage1] = React.useState(PngOmni)

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const router = useRouter()

  const context = useWallet()

  useEffect(() => {
    if (context.address != undefined) {
      dispatch(getUser(context.address) as any)
    }
  }, [context.address])

  useEffect(() => {
    if (user.address != undefined) {
      setAvatar(process.env.API_URL + user.avatar)
      setBanner_1(process.env.API_URL + user.banners[0])
      setBanner_2(process.env.API_URL + user.banners[1])
      setBanner_3(process.env.API_URL + user.banners[2])
      setUserName(user.username)
      setBio(user.bio)
      setTwitter(user.twitter)
      setWebsite(user.website)
    }
  }, [user.address])

  // This function will be triggered when the file field change
  const onChangeAvatar = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0])
    }
  }
  const onChangeBanner_1 = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = await readFile(file)

      setCropDlgOpen(true)
      setImageSrc(imageDataUrl)
      setBannerSelect(1)
    }
  }

  const onChangeBanner_2 = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = await readFile(file)

      setCropDlgOpen(true)
      setImageSrc(imageDataUrl)
      setBannerSelect(2)
    }
  }
  const onChangeBanner_3 = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = await readFile(file)

      setCropDlgOpen(true)
      setImageSrc(imageDataUrl)
      setBannerSelect(3)
    }
  }
  const onClickAvatar = () => {
    document.getElementById('image_avatar')?.click()
  }
  const onClickBanner_1 = () => {
    document.getElementById('image_banner_1')?.click()
  }
  const onClickBanner_2 = () => {
    document.getElementById('image_banner_2')?.click()
  }
  const onClickBanner_3 = () => {
    document.getElementById('image_banner_3')?.click()
  }

  const updateProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (updateProfileFormRef.current !== null) {
      const fileBanner_1 = await getFileFromUrl(banner_1, 'banner1.png')
      const fileBanner_2 = await getFileFromUrl(banner_2, 'banner2.png')
      const fileBanner_3 = await getFileFromUrl(banner_3, 'banner3.png')

      const formData = new FormData(updateProfileFormRef.current)
      const address = context.address ? context.address : ''
      formData.append('address', address)
      formData.append('banner_1', fileBanner_1 as any)
      formData.append('banner_2', fileBanner_2 as any)
      formData.append('banner_3', fileBanner_3 as any)

      dispatch(updateUser(formData) as any)
      // router.push('/')
      updateModal('Micheal')
    }
  }

  const getFileFromUrl = async (
    url: string,
    name: string,
    defaultType = 'image/jpeg'
  ) => {
    try {
      const response = await fetch(url)
      const data = await response.blob()
      return new File([data], name, {
        type: data.type || defaultType,
      })
    } catch (err) {
      console.log('getFileFromUrl err?', err)
    }
  }

  const readFile = async (file: Blob) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => resolve(reader.result as string),
        false
      )
      reader.readAsDataURL(file)
    })
  }

  const cropDlgClose = () => {
    setCropDlgOpen(false)
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      switch (bannerSelected) {
      case 1:
        setBanner_1(croppedImage as string)
        break
      case 2:
        setBanner_2(croppedImage as string)
        break
      case 3:
        setBanner_3(croppedImage as string)
        break
      }
      setCropDlgOpen(false)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels])

  const onClickDownSpanBid = () => {
    setDisplayDropdownCoinBid(!displaydropdowncoinBid)
  }

  const onClickDownSpan = () => {
    setDisplayDropdownCoin(!displaydropdowncoin)
  }
  return (
    <>
      <div className="w-full flex flex-row min-h-[750px] bg-[#FEFEFF]">
        <div className={classNames('basis-1/6', editStyle.sidemenu)}>
          <ul>
            <li
              className={selectedTab == 0 ? classNames(editStyle.current) : ''}
            >
              <button
                onClick={() => setSelectedTab(0)}
                className="flex justify-start p-0 items-center"
              >
                <div>
                  <UserSVG className="inline" />
                </div>
                <span className="ml-[18.33px] leading-[35px] not-italic ">
                  profile
                </span>
              </button>
            </li>
            <li
              className={selectedTab == 1 ? classNames(editStyle.current) : ''}
            >
              <button
                onClick={() => setSelectedTab(1)}
                className="flex justify-start"
              >
                <div>
                  <AlertSVG className="inline" />
                </div>
                <span className="ml-4 text-[28px]">alert</span>
              </button>
            </li>
            <li
              className={selectedTab == 2 ? classNames(editStyle.current) : ''}
            >
              <button
                onClick={() => setSelectedTab(2)}
                className="flex justify-start"
              >
                <div>
                  <PaymentSVG className="inline" />
                </div>
                <span className="ml-4 text-[28px]">payment</span>
              </button>
            </li>
          </ul>
        </div>
        <Dialog
          onClose={cropDlgClose}
          aria-labelledby="simple-dialog-title"
          open={cropDlgOpen}
          maxWidth={'lg'}
        >
          <DialogTitle id="simple-dialog-title">Crop Image</DialogTitle>
          <div className="w-[800px] h-[600px]">
            <div className="relative h-[500px]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropSize={{ width: 800, height: 354 }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-[2rem]">
              <div className="col-span-3 px-[10%]">
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.01}
                  aria-labelledby="Zoom"
                  // classes={{ root: classes.slider }}
                  onChange={(e, z) => setZoom(z as number)}
                />
              </div>
              <div className="col-span-1">
                <button
                  onClick={showCroppedImage}
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Crop
                </button>
              </div>
            </div>
          </div>
        </Dialog>
        <div className="basis-5/6 pl-4 pt-[39px] pr-[59px]">
          {selectedTab == 0 && (
            <form ref={updateProfileFormRef} onSubmit={updateProfile}>
              <input
                id="image_banner_1"
                accept="image/*"
                type="file"
                onChange={onChangeBanner_1}
                className="hidden"
              />
              <input
                id="image_banner_2"
                accept="image/*"
                type="file"
                onChange={onChangeBanner_2}
                className="hidden"
              />
              <input
                id="image_banner_3"
                accept="image/*"
                type="file"
                onChange={onChangeBanner_3}
                className="hidden"
              />
              <div className="border-gray-300 bg-[#E9ECEF] border-2 p-5 px-10">
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div>
                    <div
                      className="border-[#B444F9] mb-5 relative cursor-pointer"
                      onClick={onClickBanner_1}
                    >
                      <div className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2">
                        <Image src={Photo} alt="photo" />
                      </div>
                      <div className="border-image">
                        <Image
                          src={
                            typeof banner_1 == 'string'
                              ? banner_1
                              : URL.createObjectURL(banner_1)
                          }
                          alt="first image"
                          layout="responsive"
                          width={200}
                          height={100}
                        />
                      </div>
                    </div>
                    <div className="rounded-full mx-auto bg-[#B444F9] text-white center w-[47px] h-[47px] text-2xl text-center p-2">
                      1
                    </div>
                  </div>
                  <div>
                    <div
                      className="border-[#B444F9] mb-5 relative cursor-pointer"
                      onClick={onClickBanner_2}
                    >
                      <div className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2">
                        <Image src={Photo} alt="photo" />
                      </div>
                      <div className="border-image">
                        <Image
                          src={
                            typeof banner_2 == 'string'
                              ? banner_2
                              : URL.createObjectURL(banner_2)
                          }
                          alt="first image"
                          layout="responsive"
                          width={200}
                          height={100}
                        />
                      </div>
                    </div>
                    <div className="rounded-full mx-auto bg-[#B444F9] text-white center w-[47px] h-[47px] text-2xl text-center p-2">
                      2
                    </div>
                  </div>
                  <div>
                    <div
                      className="border-[#B444F9] mb-5 relative cursor-pointer"
                      onClick={onClickBanner_3}
                    >
                      <div className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2">
                        <Image src={Photo} alt="photo" />
                      </div>
                      <div className="border-image">
                        <Image
                          src={
                            typeof banner_3 == 'string'
                              ? banner_3
                              : URL.createObjectURL(banner_3)
                          }
                          alt="first image"
                          layout="responsive"
                          width={200}
                          height={100}
                        />
                      </div>
                    </div>
                    <div className="rounded-full mx-auto bg-[#B444F9] text-white center w-[47px] h-[47px] text-2xl text-center p-2">
                      3
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mt-5 w-full">
                <div>
                  <div
                    className="relative cursor-pointer"
                    onClick={onClickAvatar}
                  >
                    <div className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2">
                      <Image src={Photo} alt="photo" />
                    </div>
                    <Image
                      src={
                        typeof avatar == 'string'
                          ? avatar
                          : URL.createObjectURL(avatar)
                      }
                      alt="avatar"
                      width={250}
                      height={250}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <input
                  id="image_avatar"
                  accept="image/*"
                  type="file"
                  onChange={onChangeAvatar}
                  className="hidden"
                  name="avatar"
                />
                <div className="ml-7 w-full">
                  <div className="w-full mb-3">
                    <div className="text-[#6C757D]">username:</div>
                    <input
                      type="text"
                      name="username"
                      className="user-input"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="text-[#6C757D]">
                    <div>bio:</div>
                    <textarea
                      className="user-textarea w-full"
                      placeholder="(200 characters max)"
                      name="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-3 mt-3 flex items-center">
                    <div className="text-[#6C757D] mr-2">
                      <Image src={Twitter} alt="tiwitter" />
                    </div>
                    <input
                      type="text"
                      className="user-input"
                      name="twitter"
                      placeholder="https://"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-5 flex items-center">
                    <div className="text-[#6C757D] mr-2">
                      <Image src={Web} alt="web" />
                    </div>
                    <input
                      type="text"
                      name="website"
                      className="user-input"
                      placeholder="https://"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 justify-end mb-5">
                <button
                  type="submit"
                  className="inline-block bg-[#B444F9] text-white text-[28px] leading-[35px] pl-[46px] pr-[46px] font-['Circular_Std']  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bottom-[52px] right-[59]"
                >
                  save
                </button>
              </div>
            </form>
          )}
          {selectedTab == 1 && (
            <form ref={updateProfileFormRef} onSubmit={updateProfile}>
              <div className="flex flex-col pl-4 pr-4 pb-4">
                <div className="flex flex-row">
                  <div className="flex items-center">
                    <input
                      className="bg-[#FEFEFF] text-[#B444F9] w-[22px] h-[23px] rounded border-2 border-[#ADB5BD]"
                      type="checkbox"
                    />
                  </div>
                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      Item Sold
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      an NFT of yours is purchased
                    </p>
                  </div>
                </div>
                <div className="flex flex-row my-4">
                  <div className="flex items-center">
                    <input
                      className="bg-[#FEFEFF] text-[#B444F9] w-[22px] h-[23px] rounded border-2 border-[#ADB5BD]"
                      type="checkbox"
                    />
                  </div>
                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      Bids
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      a bid is placed on your NFT
                    </p>
                  </div>
                </div>
                <div className="flex flex-row my-4">
                  <div className="flex items-center">
                    <input
                      className="bg-[#FEFEFF] text-[#B444F9] w-[22px] h-[23px] rounded border-2 border-[#ADB5BD]"
                      type="checkbox"
                    />
                  </div>
                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      Outbid
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      a user exceeds your offer on an NFT you bid on
                    </p>
                  </div>
                </div>
                <div className="flex flex-row my-4">
                  <div className="flex items-center">
                    <input
                      className="bg-[#FEFEFF] text-[#B444F9] w-[22px] h-[23px] rounded border-2 border-[#ADB5BD]"
                      type="checkbox"
                    />
                  </div>
                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      Succesful Purchase
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      an NFT is succesfully bought
                    </p>
                  </div>
                </div>
                <div className="flex flex-row my-4">
                  <div className="w-[22px]"></div>
                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      Minimum Bid
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      no alerts unless bid exceeds this value:
                    </p>

                    <span
                      // className={classNames('basis-1/6', 'items-center', editStyle.etherspan)}
                      className={classNames(
                        'basis-1/6',
                        'items-center',
                        editStyle.etherspan
                      )}
                    >
                      <input
                        className="w-32 my-4 font-['Circular_Std'] not-italic text-[16px] leading-[20px] text-[#ADB5BD]"
                        type="text"
                        defaultValue="0.0005"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 justify-end mb-5">
                <button
                  type="submit"
                  className="inline-block absolute  bg-[#ADB5BD] text-white text-[28px] leading-[35px] pl-[46px] pr-[46px] font-['Circular_Std'] rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bottom-[52px] right-[59]"
                >
                  save
                </button>
              </div>
            </form>
          )}
          {selectedTab == 2 && (
            <form ref={updateProfileFormRef} onSubmit={updateProfile}>
              <div className="flex flex-col pl-4 pr-4 pb-4">
                <div className="flex flex-row  mb-5">
                  <div className="flex items-center">
                    <input
                      className="bg-[#FEFEFF] text-[#B444F9] w-[22px] h-[23px] rounded border-2 border-[#ADB5BD]"
                      type="checkbox"
                    />
                  </div>
                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      Accept Credit Card Payments
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      KYC verification required
                    </p>
                  </div>
                </div>
                <div className="flex flex-row my-4">
                  <div className="flex items-center">
                    <input
                      className="bg-[#FEFEFF] text-[#B444F9] w-[22px] h-[23px] rounded border-2 border-[#ADB5BD]"
                      type="checkbox"
                    />
                  </div>

                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      Set Default Token for Payments
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      a bid is placed on your NFT
                    </p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div
                    className="flex text- ml-9"
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
                          src={coinImage1}
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
                          {coinvalue1}
                        </p>
                        <span
                          onClick={() => onClickDownSpanBid()}
                          style={{
                            background: '#F8F9FA',
                            borderLeft: '1px solid #E9ECEF',
                          }}
                          className="p-1 pull-right"
                        >
                          <i
                            style={{ color: '#ADB5BD' }}
                            className={`p-1 ${
                              displaydropdowncoinBid
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
                          // opacity: '0.6',
                          position: 'absolute',
                          display: displaydropdowncoinBid ? 'block' : 'none',
                        }}
                      >
                        <div
                          onClick={() => {
                            setCoinImage1(PngOmni)
                            setDisplayDropdownCoinBid(false)
                            setCoinDropdown1('OMNI')
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
                            OMNI
                          </p>
                        </div>
                        <div
                          onClick={() => {
                            setCoinImage1(PngEther)
                            setDisplayDropdownCoinBid(false)
                            setCoinDropdown1('ETHER')
                          }}
                          className={`flex text-center p-1 ${
                            expandedMenu == 2 ? 'active' : ''
                          }`}
                          style={{
                            background: '#F8F9FA',
                            border: '1px solid #E9ECEF',
                            borderTop: 'none',
                            borderBottom: 'none',
                            borderBottomRightRadius: '8px',
                            borderBottomLeftRadius: '8px',
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
                  </div>
                </div>
                <div className="flex flex-row mb-4 mt-7">
                  <div className="flex items-center">
                    <input
                      className="bg-[#FEFEFF] text-[#B444F9] w-[22px] h-[23px] rounded border-2 border-[#ADB5BD]"
                      type="checkbox"
                    />
                  </div>
                  <div className="inline-block align-middle ml-4">
                    <p className="text-lg leading-6 font-medium text-[#ADB5BD]">
                      List Prices by Default in:
                    </p>
                    <p className="text-[#ADB5BD] text-base leading-5">
                      a user exceeds your offer on an NFT you bid on
                    </p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div
                    className="flex text- ml-9"
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
                          // opacity: '0.6',
                          position: 'absolute',
                          display: displaydropdowncoin ? 'block' : 'none',
                        }}
                      >
                        <div
                          onClick={() => {
                            setCoinImage(PngOmni)
                            setDisplayDropdownCoin(false)
                            setCoinDropdown('OMNI')
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
                            OMNI
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
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 justify-end mb-5">
                <button
                  type="submit"
                  className="inline-block absolute bg-[#ADB5BD] text-white text-[28px] leading-[35px] pl-[46px] pr-[46px] font-['Circular_Std']  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bottom-[52px] right-[59]"
                >
                  save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default UserEdit
