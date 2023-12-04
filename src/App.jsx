import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
 
function App() {
  const [loading, setLoading] = useState(true)

  // fetch current user or any other service from backend, import useDispath() from store
  const dispatch = useDispatch()

// now we need services like auth services for login and logout 
  useEffect(()=>{
    // ask from authservice for current user info
    authService.getCurrentUser().then((userData)=>{
      if (userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    }).catch(()=>{
      console.log( "no user data found");
    }).finally(()=>{
      setLoading(false)
    })
  },[])
  
  
  return !loading ? (
    <div>setup in progress</div>
  ) : (null)
}

export default App
