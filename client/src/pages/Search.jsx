import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-6 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2 '>
                    <label className='whitespace-nowrap font-semibold'> Search Term</label>
                    <input type='text'
                        id='searchTerm'
                        placeholder='Search...'
                        className='border rounded-lg p-3 w-full'
                        />
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div>
                        <input type='checkbox' id='all' className='w-5' />
                        <span>Rent and Sale</span>
                    </div>
                    <div>
                        <input type='checkbox' id='rent' className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div>
                        <input type='checkbox' id='sale' className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div>
                        <input type='checkbox' id='offer' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div>
                        <input type='checkbox' id='parking' className='w-5' />
                        <span>parking</span>
                    </div>
                    <div>
                        <input type='checkbox' id='furnished' className='w-5' />
                        <span>furnished</span>
                    </div>
                </div>
                <div>
                    <label className='font-semibold'>Sort: </label>
                    <select id='sort_order' className='border rounded-lg p-3'>
                        <option>Price, High to Low</option>
                        <option>Price, Low to High</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>
                    Search
                </button>
            </form>
        </div>

        <div className=''>
            <h1 className='text-3xl font-semibold border-b mt-5 p-3 text-slate-700'>Listing Results:</h1>
        </div>
    </div>
  )
}
