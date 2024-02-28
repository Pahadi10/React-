import React, { useState } from 'react'
import Spinner from './Spinner';
import useGif from '../hooks/useGif';

const Tagged = () => {
  const [tag, setTag] = useState("car");
  const {gif, loading, fetchData} = useGif(tag);

  return (
    <div className='w-1/2 h-[450px] bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[10px] '>
      <h1 className='text-2xl underline uppercase font-bold'>RANDOM {tag} GIF</h1>
      {loading? (<Spinner />):(<img src= {gif} alt='Gif' className='h-[250px]'></img>)}
      <input type='text' placeholder='Search GIF' className='w-10/12 p-2 rounded-md border-none' onChange={(e)=>setTag(e.target.value)}></input>
      <button className='w-10/12 bg-slate-50 py-2 rounded-lg text-lg' onClick={()=> fetchData()}>Generate</button>
    </div>
  )
}

export default Tagged