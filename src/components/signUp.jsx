import React, { useState } from 'react'
import './signUp.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {

  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPass, setSignupPass] = useState("")

  const handleCreateSignup = async() =>{
    try{
      await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPass
      )
      updateProfile(auth.currentUser,{
        displayName : firstName
      })
      setSignupEmail("")
      setSignupPass("")
      navigate('/notes')
    } catch(err){
      alert(err.message)
      console.log(err.message)
    }
  }

  return (
    <>
    <div className='signup-div'>
      <div>
        <div className='signup-header'>Create a New Account</div>
        <div className='signup-inputs'>
          <input type='text' placeholder='Enter Your Name' onChange={(e)=>setFirstName(e.target.value)}/>
          <input type="text" placeholder='Enter Your Email' onChange={(e)=>setSignupEmail(e.target.value)}/>
          <input type='password' placeholder='Enter Your Password' onChange={(e)=>setSignupPass(e.target.value)}/>
        </div>
        <div className='signup-button'>
          <button onClick={handleCreateSignup}>Sign Up</button>
        </div>
        <span>If You Already Have an Account? <Link to="/signin">Sign In</Link></span> 
      </div>
    </div>
    </>
  )
}

export default SignUp