/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { startLoader,stopLoader } from "../../store/loader"
import {Logo , Button, ImageIcon} from '../index'
import { useState } from "react"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [flag,setFlag] = useState()
  const logoutHandler = () => {
    dispatch(startLoader())
    authService.logout().then(()=>{
      dispatch(logout())
      dispatch(stopLoader())
    })
  }

  const setStatus = (para) => {
    para==="links" && navigate('/add-links')
    para==="Profile" && navigate('/add-profile-details')
    para==="Preview" && navigate('/preview')
    setFlag(para)
  }


  return (
    <div className="bg-[#FAFAFA] lg:p-6  p-2 mb-10 lg:mb-0">
          <div className="flex justify-between items-center  lg:p-4 bg-white">
            <div className="">
              <Link to="/">
                <Logo/>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <Button
                onClick={() =>setStatus("links") }
                className={`${
                  flag==="links"
                    ? "!bg-[#EFEBFF] !text-[#633CFF] "
                    : "!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "
                } lg:!w-[150px] w-[50px] flex justify-center items-center lg:mr-5 !text-[16px] p-3 lg:p-auto`}
              >
                <ImageIcon
                  className="lg:!mr-3"
                  img="icon-links-header"
                ></ImageIcon>
                <span className="hidden lg:inline-block">Links</span>
              </Button>

              <Button
                onClick={() =>setStatus("Profile")}
                className={`${
                  flag==="Profile"
                    ? "!bg-[#EFEBFF] !text-[#633CFF]"
                    : "!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "
                } lg:!w-[200px] w-[50px] flex justify-center items-center !text-[16px] ml-3 lg:ml-auto p-3 lg:p-auto`}
              >
                <ImageIcon
                  className={`lg:!mr-3 ${
                    flag==="Profile" ? "" : " hover:!text-[#633CFF] !text-[#737373] "
                  } `}
                  img="icon-profile-details-header"
                ></ImageIcon>
                
                <span className="hidden lg:inline-block">Profile Details</span>

              </Button>
            </div>
            <div className="flex justify-around">
              <Button
                onClick={() => setStatus("Preview")}
                className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] lg:!w-[200px] w-[50px] flex justify-center items-center mx-3 p-3 lg:p-auto`}
              >
                <ImageIcon
                  className={` lg:hidden ${
                    flag==="Profile" ? "" : " hover:!text-[#633CFF] !text-[#737373] "
                  } `}
                  img="icon-preview-header"
                ></ImageIcon>
                <span className="hidden lg:inline-block">Preview</span>
              </Button>
              <Button
                onClick={() => logoutHandler()}
                className={`!bg-[#fff] hover:!text-[#633CFF] p-3 lg:p-auto !text-[#737373] !text-[16px] lg:!w-[200px] w-[50px] flex justify-center items-center`}
              >
                 <ImageIcon
                  className={` lg:hidden ${
                    flag==="Profile" ? "" : " hover:!text-[#633CFF] !text-[#737373] "
                  } `}
                  img="logout_icon"
                ></ImageIcon>
                <span className="hidden lg:inline-block">Logout</span>
              </Button>
            </div>
          </div>
        </div>
  )
}

export default Header