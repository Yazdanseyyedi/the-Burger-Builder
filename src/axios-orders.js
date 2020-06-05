import axios from 'axios'

const instance = axios.create(
    {
        baseURL:'https://react-my-burger-f9a86.firebaseio.com/'
    })


export default instance