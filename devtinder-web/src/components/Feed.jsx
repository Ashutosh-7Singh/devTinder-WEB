import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed",{
        withCredentials:true
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      // TODO ERROR PAGE
    }
  };
  useEffect(() => {
    getFeed();
  }, [])
  if(feed?.length <= 0) return <h1 className='flex justify-center my-10'>No more users in feed 🎉</h1>
  // return (
  //   feed?.length > 0 ? (
  //     <div className='flex justify-center my-10'>
  //       <UserCard user={feed[0]} />
  //     </div>
  //   ) : (
  //     <div className='text-center text-lg mt-10'></div>
  //   )
  // );
  
  return (
  feed && (
      <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
  )
  )
}

export default Feed