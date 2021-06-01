import axios from 'axios';

export default axios.create({
    baseURL: "https://bloggy-api.herokuapp.com/",
    headers: {
        // !!!
        "Content-type": "application/json"
    }
})
