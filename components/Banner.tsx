import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import classNames from '../helpers/classNames'
import Setting from '../public/images/setting.png'
import Twitter from '../public/images/twitter.png'
import Web from '../public/images/web.png'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/reducers/userReducer'
import UserEdit from './user/UserEdit'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Carousel from './carousel'

type BannerProps = {
  slides: Array<React.ReactNode>
  blur: boolean
  menu: string
}

const useStyles = makeStyles({
  paper: {
    // padding: '2rem',
    width: '90%',
    maxWidth: '100%',
  },
})

const Banner = ({ slides, blur, menu }: BannerProps): JSX.Element => {
  const classes = useStyles()
  const user = useSelector(selectUser)
  const [avatarError, setAvatarError] = useState(false)
  const [bOpenModal, setOpenModal] = React.useState(false)
  const [bShowSettingIcon, setShowSettingIcon] = React.useState(false)

  const updateModal = (name: string): void => {
    setOpenModal(false)
  }

  return (
    <>
      <div
        className={classNames(
          'w-full',
          'mt-[134px]',
          blur && menu === 'home' ? 'blur-sm' : ''
        )}
      >
        <div
          onMouseEnter={() => setShowSettingIcon(true)}
          onMouseLeave={() => setShowSettingIcon(false)}
        >
          <Carousel slides={slides} />
        </div>
        {menu === 'home' && (
          <div className="flex justify-center w-full ">
            <div className="flex justify-between justify-center fw-60 mt-5 relative">
              {bShowSettingIcon && (
                <div
                  className="-top-[7rem] left-[1rem] absolute"
                  onMouseEnter={() => setShowSettingIcon(true)}
                  onMouseLeave={() => setShowSettingIcon(false)}
                >
                  <a
                    className="cursor-pointer"
                    onClick={() => setOpenModal(true)}
                  >
                    <div className="p-2 rounded-full bg-[#adb5bd]/[.5] w-[50px] h-[50px]">
                      <Image src={Setting} alt="avatar" />
                    </div>
                  </a>
                </div>
              )}
              <div className="-top-[10rem] left-[5rem] absolute">
                <Image
                  src={
                    avatarError
                      ? '/images/default_avatar.png'
                      : process.env.API_URL + user.avatar
                  }
                  alt="avatar"
                  onError={(e) => {
                    user.avatar && setAvatarError(true)
                  }}
                  width={200}
                  height={200}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-[26px] ml-[19rem] text-slate-800 ">
                  {/* {user.username} */}
                  <p className="font-semibold">{user.username ? user.username : 'username'}</p>
                  <p className="ml-[22px] text-[16px]">
                    {/* livin de life one day at a time skyrim 4 lyfe */}
                    {user.bio ? user.bio : 'livin delife one day at a time skyrim 4 lyfe'}
                  </p>
                </div>
                {/* <div className="text-[#6C757D] ml-[18.7rem] bg-[#f8f9fa] text-[16px]  mt-3 w-[96%] h-[75px] rounded-[8px] ">
                  {user.bio} */}
                {/* <div className="pl-[22px] mt-[12px]"></div> */}

                {/* </div> */}
              </div>
              <div className="flex items-center ml-[]">
                <Link href={user.twitter ? user.twitter : ''}>
                  <a>
                    <div className="mr-6">
                      <Image src={Twitter} alt="twitter" />
                    </div>
                  </a>
                </Link>
                <Link href={user.website ? user.website : ''}>
                  <a>
                    <div className="mr-6">
                      <Image src={Web} alt="website" />
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full md:w-auto">
        <Dialog
          open={bOpenModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="simple-dialog-title"
          maxWidth={'xl'}
          classes={{ paper: classes.paper }}
        >
          <UserEdit updateModal={updateModal} />
        </Dialog>
      </div>
    </>
  )
}

export default Banner
