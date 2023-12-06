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
    <div className="bg-[#FAFAFA] p-6 ">
          <div className="flex justify-between items-center  p-4 bg-white">
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
                } !w-[150px] flex justify-center items-center mr-5 !text-[16px]`}
              >
                <ImageIcon
                  className="!mr-3"
                  img="icon-links-header"
                ></ImageIcon>
                Links
              </Button>

              <Button
                onClick={() =>setStatus("Profile")}
                className={`${
                  flag!=="links"
                    ? "!bg-[#EFEBFF] !text-[#633CFF]"
                    : "!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "
                } !w-[200px] flex justify-center items-center !text-[16px]`}
              >
                <ImageIcon
                  className={`!mr-3 ${
                    flag!=="links" ? "" : " hover:!text-[#633CFF] !text-[#737373] "
                  } `}
                  img="icon-profile-details-header"
                ></ImageIcon>
                Profile Details
              </Button>
            </div>
            <div className="flex justify-around">
              <Button
                onClick={() => setStatus("Preview")}
                className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-[200px] flex justify-center items-center mx-3`}
              >
                Preview
              </Button>
              <Button
                onClick={() => logoutHandler()}
                className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-[200px] flex justify-center items-center`}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
  )
}

export default Header