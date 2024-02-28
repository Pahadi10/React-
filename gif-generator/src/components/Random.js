import Spinner from './Spinner';
import useGif from '../hooks/useGif';

const Random = () => {
  
  const {gif, loading, fetchData} = useGif();

  function clickHandler(){
    fetchData()
  }

  return (
    <div className='w-1/2 h-[400px] bg-green-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] '>
      <h1 className='text-2xl underline uppercase font-bold'>RANDOM GIF</h1>
      {loading? (<Spinner />):(<img src= {gif} alt='Gif' className='h-[250px]'></img>)}
      <button className='w-10/12 bg-slate-50 py-2 rounded-lg text-lg' onClick={clickHandler}>Generate</button>
    </div>
  )
}

export default Random