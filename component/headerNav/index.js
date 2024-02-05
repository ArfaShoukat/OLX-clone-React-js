import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import { ProfileData } from "../../config/firebase";


import './index.css'

function HeaderNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const authInstance = getAuth();
  const [profilePicture, setProfilePicture] = useState('https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [authInstance]);

  const handleLogout = async () => {
    try {
      await signOut(authInstance);
      setUser(null);
      alert('Sign-out successful.');
    } catch (error) {
      console.error('Error during sign-out:', error);
      alert('Error occurred during sign-out.');
    }
  };

  // const [user,setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [image,setImage] = useState("null")
// const navigate = useNavigate();
useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
    console.log("user:",user)
      
        const uid = user;
        setUser(uid.email);
        
      } else {
        setUser(null);
     setImage("null")
      
      }
  });
},[]);

useEffect(() => {
FetchData();

async function FetchData() {
  try {
    const pdata = await ProfileData();
    console.log("pdata:", pdata);

    const foundItem = pdata.filter((res) => res.email === user);
    
    if (foundItem) {
      // The element was found, and you can do something with it
      console.log("Element found:", foundItem);
      setUserData(foundItem);
      if (userData && userData[0]) {
        setImage(userData[0].image);
      } else {
        setImage(null);
      }
    
    } else {
      // The element was not found
      console.log("Element not found");
      setImage("null")
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

},[user]);

useEffect(() => {
if (userData && userData[0]) {
  setImage(userData[0].image);
} else {
  setImage(null);
}

},[userData]);
    return(

    <div className="container-fluid">
  <div className='first'>
    <div  className="header">
      <div  className="navbar">
        <img className='olx-logo' src="https://majestic-jelly-9755c2.netlify.app/images/olx1.JPG" alt="" />
        <div  className="countryselect" id="country">
          <div  className="select">
          

            <p id="text-mobile">Select your country</p>
            <i  className="fa-solid fa-down" id="moving"></i>
          </div>
        </div>
        <div  className="searchbox">
          <input
            type="text"
            className="searchclass"
            placeholder="Find Car, mobile phone and more.."
          />
          <FontAwesomeIcon className='search' icon={faMagnifyingGlass} />
        </div>
        <div  className="language"><br/><br/>
        {user ? (
          <>
         
          <div className='olx-img1'>
          <img className='img-olx-nav' onClick={() => navigate('./Profile')} src={image == "null" ? "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png" :`${image}` }/>
        

          
          <div className='hide1'>
            
            <img  onClick= {()=>navigate('./Profile')} src={image == "null" ? "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png" :`${image}` }/>
            <p className='hello'>Hello,</p><br/><br/>
          <h3>{user}
          </h3><br/>
          <p><a href="#" onClick={() => navigate('/Profile')}>
              view and edit your profile
            </a></p> <hr/><br/>
            <button className="btn-logout" onClick={handleLogout}>logout</button></div>
         
            </div>
          </>
        ) : (
          <p className="login">
            <a href="#" onClick={() => navigate('/login')}>
              Login
            </a>
          </p>
        )}
   

  
      
         </div>

        
        <div  className="sellingpage">
          
          <button  onClick={()=>navigate('/sell')}  ><p>+ SELL</p></button>
          
        </div>
      </div>
    </div>
   <div>
   </div>

   <div className='second'>

      <div  className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div  className="navbar-nav">
         
          <select className='category' name="" id="">
            <option value="" >All Categories</option> 
        
       <option>   <a  className="active" href="#">laptop</a> </option>
       <option>    <a  className="active" href="#about">Cars</a></option>
       <option>   <a  className="active" href="#services">Motorcycles</a></option>
       <option>   <a  className="active" href="#blog">Houses</a></option>
       <option>   <a  className="active" href="#skills">Tablets</a></option>
       <option>    <a  className="active" href="#contact">land</a> </option></select>
        </div>
      </div>

       <div  className="list">
        <ul>
          <li>Laptop</li>
          <li>Cars</li>
          <li>Motorcycles</li>
          <li>Houses</li>
          <li>TV -Video -Audio</li>
          <li>Tablets</li>
          <li>Land & Plots</li> 
        </ul>
      </div> 
    </div> 
    </div>
    <div  className="adimg" >
      <div  className="col-md- text-center">
        <img src="https://images.olx.com.pk/thumbnails/423979386-800x600.webp" alt="" />
      </div>
      
    </div>
    </div>
    
  )
}
export default HeaderNav;

