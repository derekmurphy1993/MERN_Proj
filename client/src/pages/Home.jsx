import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import "swiper/css/bundle";
import ListingItem from '../components/ListingItem';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation])
  useEffect(() =>{
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchOfferListings();
  }, [])
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-6 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'> 
        Find your next <span className='text-pink-600'> perfect </span>
        <br /> home without hassle.</h1>
      <div className='text-gray-400 text-xs sm:text-sm' > 
        Your one stop site for finding that perfect home,
        <br /> With many properties for sale or rent, ease is our goal.
      </div>
      <Link className='text-xs sm:text-sm text-blue-400 font-bold hover:underline'
      to={'/search'}>
        Lets get started...
      </Link>
      </div>


      {/* swiper */}
    <Swiper navigation>
     { offerListings && offerListings.length > 0 && (
      offerListings.map((listing) => (
        <SwiperSlide key={listing._id}>
          <div style={{background: `url(${listing.imageUrls[0]}) 
          center no-repeat`, backgroundSize: "cover"}} className='h-[500px]' key={listing._id}>

          </div>
        </SwiperSlide>
      ))
    )} 
    </Swiper>
{    console.log(offerListings, rentListings, saleListings)
}
      {/* listing preview: offer, sale, rent */}
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
    { 
    offerListings && offerListings.length > 0 && (
      <div className=''>
        <div className='my-3'>
          <h2 className='text-2xl font-semibold text-slate-600'>RECENT OFFERS</h2>
        <Link 
          className='text-sm text-blue-800 hover:underline'
          to="/search?offer=true">
          Show More Offers
        </Link></div>
        <div className='flex flex-wrap gap-4'>
          { 
          offerListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))
          }
        </div>

        </div>
    )
    }
    { 
    rentListings && rentListings.length > 0 && (
      <div className=''>
        <div className='my-3'>
          <h2 className='text-2xl font-semibold text-slate-600'>Rentals</h2>
        <Link 
          className='text-sm text-blue-800 hover:underline'
          to="/search?type=rent">
          Show More Rentals
        </Link></div>
        <div className='flex flex-wrap gap-4'>
          { 
          rentListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))
          }
        </div>

        </div>
    )
    }

{ 
    saleListings && saleListings.length > 0 && (
      <div className=''>
        <div className='my-3'>
          <h2 className='text-2xl font-semibold text-slate-600'>Sale Listings</h2>
        <Link 
          className='text-sm text-blue-800 hover:underline'
          to="/search?type=sale">
          Show More Homes for Sale
        </Link></div>
        <div className='flex flex-wrap gap-4'>
          { 
          saleListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))
          }
        </div>

        </div>
    )
    }

    </div>

    </div>
  )
}
