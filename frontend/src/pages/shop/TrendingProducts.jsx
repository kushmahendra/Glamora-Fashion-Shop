import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards'
// import products  from '../../data/products.json'
import { getBaseUrl } from '../../utils/baseURL'

const TrendingProducts = () => {
    const [visibleProducts,setVisibleProducts]=useState(10)
    const [products,setProducts] = useState(null);

    const fetchAllProducts = async ()=>{
      try {
        const response = await fetch(getBaseUrl()+'/api/products',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        const data = await response.json();
        if(response.ok){
          // console.log('products data',data);
          setProducts(data.data);
        }
        else{
          console.warn('failed to fetch products');
        }
      } catch (error) {
        console.error('Error',error)
      }
    }

    const loadMoreProducts=()=>
    {
        setVisibleProducts(prevCount=>prevCount + 4 )
    }

    useEffect(()=>{
     fetchAllProducts()
    },[])
    
  return (
   <>
   <section className='section__container product__container'>
    <h2 className='section__header'>Trending Products</h2>
    <p className='section__subheader mb-12'>Discover the Hottest Picks:
         Elevate Your Style with our curated collection of Trending Women's Fashion Products</p>

{/* products card */}
<div className='m-12'>
<ProductCards products={products &&products.slice(0,visibleProducts)}/>
</div>

{/* load more products btn */}
<div className='product__btn'>
  {
    visibleProducts<products && products.length && (
    <button className='btn' onClick={loadMoreProducts}>Load More</button>
    )
  }
</div>
   </section>
   </>
  )
}

export default TrendingProducts