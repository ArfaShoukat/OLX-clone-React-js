


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../view/card/index';
import { getAds } from '../../config/firebase';
import HeaderNav from '../../component/headerNav';
import Footer from '../../component/footer';
import Category from '../../component/category';
function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async ()=>{
    const ads = await getAds()
    console.log('ads in component', ads)
    setProducts(ads)
  }

  const handleCardClick = (productId) => {
    navigate(`/DetailPage/${productId}`);
  };

  if (!products.length) {
   return <img src='https://motiongraphicsphoebe.files.wordpress.com/2018/10/giphy.gif'/>
  }

  return (
    <div>
      <br/>
<HeaderNav/>
<br/><br/><br/><br/><br/>
<Category/><br/>

      {products.map((item )=> {
       return <Card 
        
          onClick={() => handleCardClick(item.id)}
        
          title={item.title}
       imageUrl={item.imageUrl}
          description={item.description}
          price={item.price}
        />
        } )}
        <Footer/>
    </div>
  );
}

export default Dashboard;