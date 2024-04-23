import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart } from "../redux/user/userSlice"
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [ file, setFile ] = useState(undefined);
  const [filePerc, setFilePerc ] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListing] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = ( file ) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress)); 
      console.log("Upload is " + progress + "% done")
    },
    (error) => {
      setFileError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL});
        });
    }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false ) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart)
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false ){
        dispatch(deleteUserFailure(data.message))
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      } 
      console.log(data)
      setUserListing(data)
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="p3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7"> Profile </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={e => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/> 
        <img onClick={() => fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} alt="profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
          <p className='text-sm self-center'>{ fileError ? 
          (<span className="text-red-700"> Error: Image must be under 2mb </span>)
            : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700"> {`Uploading ${filePerc}%`} </span> )
            : filePerc === 100 ? (
              <span className="text-green-700"> Successful Upload! </span>)
              : ""
            }
          </p>
        <input type="text" id="username" placeholder='username' 
          defaultValue={currentUser.username} className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="text" id="email" placeholder='email' 
          defaultValue={currentUser.email}className='border p-3 rounded-lg'  onChange={handleChange}/>
        <input type="password" id="password" placeholder='password' 
          className='border p-3 rounded-lg' />
        
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg 
          p-3 uppercase hover:opacity-90 disabled:opacity-80'>
           { loading ? 'loading...' : 'Update' }
          </button>
          <Link to={"/create-listing"} className='bg-green-700
           text-white uppercase rounded-lg p-3
           text-center hover:opacity-90'> Create Listing </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'> Delete  Account </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'> Sign  Out </span>

      </div>
      <p className='text-red-700 mt-5'> {error ? error : "" } </p>
      <p className='text-green-700 mt-5'> {error ? "Update Success" : "" } </p>
      <button onClick={handleShowListings} className='text-green-700 w-full'> Show Listings </button>
      <p className='text-red-700 mt-5'> {showListingsError ? "Error showing listings" : "" } </p>

      { userListings && userListings.length > 0 &&
      <div className='flex flex-col gap-4'> 
      <h1 className='text-center mt-7 text-2xl'>Your Listings</h1>
      {userListings.map((listing) => (
        <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
        <Link to={`/listings/${listing._id}`}>
          <img className="h-16 w-16 object-contain" src={listing.imageUrls[0]} alt="listing cover" />
        </Link>
        <Link className="text-slate-700 font-semibold flex-1 hover:underline truncate" to={`/listings/${listing._id}`}>
          <p >{listing.name}</p>
        </Link>

        <div className='flex flex-col items-center'>
          <button className='text-red-700 uppercase'>Delete</button>
          <button className='text-green-700 uppercase'>Edit</button>
        </div>
        </div>
      ))}
      </div>}
    </div>
  )
}
