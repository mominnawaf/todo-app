import {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {validateEmail} from '../../../utils/validateEmail'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {loginUser, selectAuthError, selectUser} from '../userSlice'

function Login() {
  const [email,setEmail] = useState<string>('')
  const [emailError,setEmailError] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [passwordError,setPasswordError] = useState<string>('')
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const user = useAppSelector(selectUser)
  const serverError = useAppSelector(selectAuthError)

  useEffect(()=>{
    if(user.uid){
      nav('/home')
    }
  },[nav, user])

  const submit =()=>{
    if(!email && !password) {
      setEmailError('Email is required')
      setPasswordError('Password is required')
    }
    else if(!validateEmail(email)){
      setEmailError('Enter valid Email')
    }
    else if(password.length <6){
      setPasswordError('At least 6 characters are required')
    }
    else{
      setEmailError('')
      setPasswordError('')
      dispatch(
        loginUser({email,password})
      )
    }
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-cyan-200 to-yellow-100 h-screen">
      <div className="flex justify-center">
        <div className="flex justify-center flex-col items-center p-5 rounded-lg shadow-lg bg-gray-600 max-w-lg w-[22rem]">
          <h5 className="text-white text-xl leading-tight font-medium mb-2">
            Login
          </h5>
          <div className="text-sm text-red-500 mt-1">{serverError}</div>
          <input
            type="text"
            className="
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-2
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <div className="text-sm text-red-500 mt-1">{emailError}</div>
          <input
            type="password"
            className="
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-2
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
          />
           <div className="text-sm text-red-500 mt-1">{passwordError}</div>
          <button
            type="button"
            className="
            my-5
            w-full
            inline-block
            px-6 py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-normal
            uppercase
            rounded
            shadow-md
            hover:bg-blue-70
            hover:shadow-lg
            focus:bg-blue-700
            focus:shadow-lg
            focus:outline-none
            focus:ring-0
            active:bg-blue-800
            active:shadow-lg
            transition duration-150 ease-in-out"
            onClick={()=>submit()}
          >
            Sign Up
          </button>
          <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-white">
              Don't have an account?
              <Link
                to={'/'}
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-1"
                >Register</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login