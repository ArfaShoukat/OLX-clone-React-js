import { useState } from "react"
import { useNavigate } from "react-router"

import {sell1} from '../../config/firebase'
import './sell.css'
function Sell(){
const navigate= useNavigate()
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const[description, setDescription] =useState()
    const[image, setImage] = useState()
    const add =() =>{
        console.log('image', image)
        sell1({price, title,description ,image})
        navigate('/')
     }
return(
<>
<div className="app">
<h1 className="h1">Enter your Detail</h1><br/><br/>
<div className="main-container">
<label>Title</label><br/><br/>
<input placeholder='title' onChange={(e)=> setTitle(e.target.value)} /><br/><br/>
<label>Price</label><br/><br/>
<input placeholder='price' onChange={(e)=> setPrice(e.target.value)} /><br/><br/>
<label>Description</label><br/><br/>
<textarea onChange={(e)=> setDescription(e.target.value)} ></textarea><br/>
<br/><br/>
<input onChange={(e)=> setImage(e.target.files[0])}type='file'  />
</div><button className="btn" onClick={add}>Post</button></div>
</>
)

}
export default Sell