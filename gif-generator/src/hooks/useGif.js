import { useState, useEffect } from "react";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const useGif = (tag) => {
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState(false);
  const url_tag = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
  const url_random = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

  async function fetchData(){
    setLoading(true);
    const {data} = await axios.get(tag? url_tag : url_random);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);
    setLoading(false);
  }

  
  useEffect(() => {
    fetchData()
  }, [])
  
  return{
    gif, loading, fetchData
  };


}

export default useGif