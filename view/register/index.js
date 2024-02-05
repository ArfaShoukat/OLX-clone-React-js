import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../config/firebase'

import './register.css'
function Register(){
const navigate = useNavigate()
const [fullname, setfullName] = useState()
const [email, setEmail] = useState()
const [password, setPassword] = useState()
const [confirmPassword, setConfirmPassword] = useState()


const signup = async ()=>{
   await register({email,password,fullname})
    navigate('/login')
}

return(
<div className='AppReg'>
<img className='imgR' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'/>
    
    <h2 className='signUp'>Google Sign up Account</h2><br/>

<input className='inp' placeholder='fullname' onChange={(e)=> setfullName(e.target.value)} /><br/><br/>
<input className='inp'  placeholder='email' onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
<input className='inp'placeholder='password' type='password' onChange={(e)=>setPassword(e.target.value)} /><br/><br/>

<input className='inp' placeholder='confirm password' type='password' onChange={(e)=>setConfirmPassword(e.target.value)} /><br/><br/>


<button className='btnReg' onClick={signup}>Register</button><br/><br/>
<p className='R'>Already have an account.
    <span className='R1' onClick={()=>navigate('/login')}>Click here to Login</span><br/>
</p><br></br><br/>
</div>


)

}
export default Register