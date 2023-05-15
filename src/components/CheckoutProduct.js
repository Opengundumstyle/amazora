import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket,removeFromBasket } from '../slices/basketSlice'

const CheckoutProduct = ({
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime
}) => {
  const dispatch = useDispatch()

  const addItemToBasket = ()=>{ 
     const product = {
        id,
        title,
        price,
        rating,
        description,
        category,
        image,
        hasPrime
     }
     // push item to redux
     dispatch(addToBasket(product))
  }

  const removeItemfromBasket =()=>{
       dispatch(removeFromBasket({id}))
  }


  return (
    <div className='grid grid-cols-5 '>
          <Image src={image} height={200} width={200} style={{objectFit:"contain"}}/>

          {/**Middle */}
           <div className='col-span-3 mx-5'>
               <p>{title}</p>
               <div className='flex'>
                  {Array(rating).fill().map((_,i)=>(
                        <StarIcon key={i} className='h-5 text-yellow-500'/>
                  ))}
               </div>
               <p className='text-xs mt-2 my-2 line-clamp-3'>
                 {description}
               </p>
               <Currency quantity={price} currency='USD'/>
               {hasPrime &&(
                  <div className='flex items-center space-x-2'>
                      <img
                        loading="lazy"
                        className='w-12'
                        src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052018/untitled-1_282.png?zBgfG0XEfdsPUq33GRuhu6udfY3Yu_rs&itok=39OQ7JCF"
                        alt=""
                      />
                      <p className='text-xs text-gray-500'>Free Next Day Delivery</p>
                  </div>
               )}
           </div>
        {/**right add/remove buttons */}
           <div className='flex flex-col space-y-2 my-auto justity-self-end'>
                <button className='button' onClick={addItemToBasket}>Add to basket</button>
                <button className='button' onClick={removeItemfromBasket}> Remove from Basket</button>
           </div>
    </div>
  )
}

export default CheckoutProduct
