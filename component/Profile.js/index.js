import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { ProfileData, updateData} from "../../config/firebase"
;
import "./profile.css";
import HeaderNav from "../headerNav";
import Footer from '../footer'

function Profile() {
 
  const [name,setName] = useState()
  const [DOB,setDOB] = useState()
  const [img,setImg] = useState()
  const [user,setUser] = useState()
  const [userData, setUserData] = useState(null);
  const [image,setImage] = useState()
  const [description,setDescription] = useState()
 


  
  useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
      console.log("user:",user)
        
          const uid = user;
          setUser(uid.email);
      

        } else {
          setUser("");
          
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
         
          console.log("Element found:", foundItem);
          setUserData(foundItem);

          if (userData && userData[0]) {
            setImage(userData[0].image);
          } else {
            setImage(null);
          } 
        } else {
        
          setImage(null)
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    }

  },[user]);
 async function go(){
  await updateData(userData,img)
  
  }
  useEffect(() => {
    if (userData && userData[0]) {
      setImage(userData[0].image);
    } else {
      setImage(null);
    }
  
},[userData]);


  return (
    <><br/>
      <HeaderNav />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
     
      <div className="Edit-pro">
        <h2 className="edit-head">Edit Profile</h2>
        <br></br>
        <hr />
        <br />
        <h2 className="edit-head">Profile Photo</h2>
        <img
          className="img-edit"
          src={image ? `${image}`:"https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"  }
        />
        <input    
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="btn-photo">
          Upload Photo
        </label>
        <p className="Photo-Det">JPEG, JPG, PNG Min:400px, Max:1024px</p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <label>Name</label>
        <br />
        <br />
        <input
       value={userData ? `${userData[0].fullname}`: ''}  className="pro-inp"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label>Date of birth</label>
        <br />
        <br />
        <input
        value='Undefine' readonly className="pro-inp"
          onChange={(e) => setDOB(e.target.value)}
        />
        <br />
        <br />
        <label>About Me</label><br/><br/>
        <textarea className="pro-inp"
         value="Undefine. " readonly 
          onChange={(e) => setDescription(e.target.value)}
          cols="50"
          rows="10"
        ></textarea>
        <br />
        <br />
        <hr />
        <br />
        <button onClick={go} className="btn-Save">
          Save Changes
        </button>
      </div>
      <br />
      <br />
      <br />
      <Footer/>
    </>
  );
}

export default Profile;