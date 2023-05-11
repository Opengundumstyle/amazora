import Image from "next/dist/client/image"
import { StarIcon } from "@heroicons/react/solid"
import { useState } from "react"
import Currency from 'react-currency-formatter'

const MAX_RATING = 5
const MIN_RATING = 1

const Product = ({id,title,price,description,category,image}) => {

const [rating] = useState(
     Math.floor(Math.random()*(MAX_RATING - MIN_RATING + 1)) * MIN_RATING
)

const [hasPrime] = useState(Math.random() < 0.5)

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">



       <div>
          <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
       </div>
       <div>
         <Image 
            src={image} 
            height={200} 
            width={200} 
            style={{objectFit:"contain"}}
            />
        </div>
        <div>
          <h4 className="my-3">{title}</h4>
       </div>

       <div className="flex">
        {Array(rating).fill().map((_,i)=>(
            <StarIcon key={i} className="h-5 text-yellow-500"/>
        ))}
       </div>

       <div>
         <p className="text-xs my-2 line-clamp-2">{description}</p>
       </div>

       <div className="mb-5">
          <Currency quantity={price} currency="USD"/>
       </div>

       <div>
         {hasPrime && (
            <div className="flex items-center space-x-2 -mt-5">
                  <div>
                     <img className="w-12" src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052018/untitled-1_282.png?zBgfG0XEfdsPUq33GRuhu6udfY3Yu_rs&itok=39OQ7JCF" alt=""/>
                  </div>
                  <div> 
                     <p className="text-xs text-gray-500">Free Next-day Delivery</p> 
                  </div>
            </div>
         )}
       </div>
       <div>
          <button className="mt-auto button">Add to Basket</button>
       </div>

    </div>
  )
}

export default Product
