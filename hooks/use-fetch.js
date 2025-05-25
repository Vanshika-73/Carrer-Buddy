const { useState } = require("react")

const useFetch = (cb) =>{
    const [data, setData] = useState(undefined);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    try {
        const fn = async()=>{
            const response = await cb(...args);
            setData(response);
        }
        return []
    } catch (error) {
        
    }
}