import axios from 'axios'

// prod => https://spacetime-fwwg.onrender.com

// dev =>   'http://192.168.1.6:3333'
export const api = axios.create({
  baseURL: 'https://spacetime-fwwg.onrender.com',
})
