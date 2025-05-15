import axios from "axios";

const KeyAxios= "qgjCFzmnEOYDD9Ct7leaCe2aKD9huJm91FfIqy_9pS4"
export const fetchHits = async (query,page,signal) =>{
  const perPage = 20;
    const response = await axios.get(
    
      `https://api.unsplash.com/search/photos/?client_id=${KeyAxios}&per_page=${perPage}&query=${query}&page=${page}`
 
      , { signal } );
    
 
      return {
        hits: response.data.results,
        total: response.data.total,
        perPage
      };
    
    }