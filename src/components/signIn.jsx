import React, { useState } from 'react'
import './signUp.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {

  const navigate = useNavigate()

  const [signupEmail,setSignupEmail] = useState("")
  const [signupPass, setSignupPass] = useState("")

  const handleCreateSignup = async() =>{
    try{
      await signInWithEmailAndPassword(
        auth,
        signupEmail,
        signupPass
      )
      setSignupEmail("")
      setSignupPass("")
      navigate("/notes")

    } catch(err){
      alert(err.message)
      console.log(err.message)
    }
  }

  return (
    <>
    <div className='signup-div'>
      <div>
        <div className='signup-header'>Log In</div>
        <div className='signup-inputs'>
          <input type="text" placeholder='Enter Your Email' onChange={(e)=>setSignupEmail(e.target.value)}/>
          <input type='password' placeholder='Enter Your Password' onChange={(e)=>setSignupPass(e.target.value)}/>
        </div>
        <div className='signup-button'>
          <button onClick={handleCreateSignup}>Log In</button>
        </div>
        <span>If You Don't Have an Account? <Link to="/">Sign Up</Link></span> 
      </div>
    </div>
    </>
  )
}

export default SignIn