import axios from 'axios'

// const APIKEY = process.env.REACT_APP_APIKEY
// nakryt
// const APIKEY = '899faf1e-8103-4326-83eb-26b0efce15f9'
// pestov
const APIKEY = '3f464b2c-7a2b-40f3-a2be-eedd11fda3b2'
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": APIKEY
    }
})

export default instance
