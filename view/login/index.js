
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {login} from '../../config/firebase'
import './indexl.css'
function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const  signIn = async() =>{
        try{
            await login({email,password})
            navigate('/')
        }
        catch (e){
            alert(e.message)
        }
    }

return(

<div className="appLogin">
<img className='imgG' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'/>

    <h2 className='h2' >Google Login Account</h2><br/>
    <input className='inp' placeholder='email' onChange={(e)=>setEmail(e.target.value)} /><br/><br/><br/>
<input className='inp' placeholder='password' type='password' onChange={(e)=>setPassword(e.target.value)} /><br/><br/><br/>
<br/>
<button className='btnLogin' onClick={signIn}>Login</button><br/><br/><br/>







<p className='p'>
    Don't you have an account. 
    <span className='p1' onClick={()=>navigate('/register')}>Click here to Signup</span>
</p>

</div>

)

}
export default Login