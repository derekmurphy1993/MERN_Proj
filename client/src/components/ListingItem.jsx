import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg 
        transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]'>
        <Link to={`/listing/${listing._id}`}>
    <img src={listing.imageUrls[0] || 
        "data:image/jpeg;base64,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"
    } alt="listing cover photo" 
        className='h-[320px] sm:h-[220px] w-full object-cover 
        hover:scale-105 transition-scale duration-300' />

        <div className='p-3 flex flex-col gap-2 w-full'>             
            <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
            <div className='flex items-center gap-2'>
                <MdLocationOn className='h-4 w-4 text-green-700' /> 
                <p className='text-sm text-gray-600 w-full truncate'>{listing.address}</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
            <p className='text-slate-500 mt-2 font-semibold flex items-center'> 
            $ {listing.offer ? listing.discountPrice.toLocaleString("en-us") : 
            listing.regularPrice.toLocaleString("en-us")}
            {listing.type === 'rent' && " / month"} </p>
            <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs '>
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` 
                : `${listing.bedrooms} bed` }
            </div>
            <div className='font-bold text-xs '>
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` 
                : `${listing.bathrooms} bath` }
            </div>
            </div>
        </div>
        </Link>    
    </div>
  )
}
