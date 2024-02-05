
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderNav from '../../component/headerNav';
import Footer from '../../component/footer'
import { faLocationDot, faPhone, faCommentDots, faShareNodes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import  './Detail.css'
function DetailPage() {
  const db = getFirestore();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getAdDetails = async () => {
      try {
        const docRef = doc(db, "ads", productId); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setProduct(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching ad details:", error);
      }
    };

    getAdDetails();
  }, [productId, db]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
        <><br/>
          <HeaderNav />
          <br/><br/><br/><br/><br/><br/><br/>
          <div>
            
              <img className='img1' src={product.imageUrl} alt={`Product 1`} />
        
          </div>
          <div className='Des'><br/>
            <h2 className='in'>{product.title}</h2><br/>
            <p className='in'><b>Description:</b>{product.description}</p>
            <p className='in'><b>Price:</b>{product.price}</p>
            <br />
            <br />
          </div>
          <button className='btn3'>Add To Card </button><br />

          <br />
          
          <div className='Pro'>

            <a href='https://www.facebook.com/ArfaShoakat/'><img className='Profile-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSs5LtE_s1tzYcgy7NZW7zpbLgVJARQld0i-pLUYADgSLbkkEzXw75stXLPRtofiFIOQI&usqp=CAU' alt="profile" /></a>
            <h3><a target='_blank' style={{ color: 'black' }} className='Name' href='https://www.facebook.com/ArfaShoakat/'>Arfa Shoukat</a></h3>
            <h5><a target='_blank' style={{ color: 'gray' }} className='Date1' href='https://www.facebook.com/ArfaShoakat/'>Dec 15,2023 </a></h5>
            <p><b className='see'>See Profile</b></p><br /><br></br>
            <button className='btn1'>Show Phone Number <FontAwesomeIcon icon={faPhone} /></button><br />
            <button className='btn2'>Chat <FontAwesomeIcon icon={faCommentDots} /></button>
            <br /><br /><br />

          </div>
          <div className='location'><br />
            <h2 className='l1'>Location.</h2><br /><br />

            <h4 className='l2'>     <FontAwesomeIcon icon={faLocationDot} /> Faisal Town, Lahore</h4><br /><br />
          </div>
          <div><img className='add' src="https://tpc.googlesyndication.com/simgad/1931734189880147742" /></div>

        </>
      <br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
}

export default DetailPage;
