import { useState, useEffect } from "react";



const getLocalValue = (key:string, initValue:any) => {
    // case of SSR on nextJS
    if (typeof window === undefined) return initValue;

    // if a value is already stored
    const localValue = JSON.parse(localStorage.getItem(key)||"")
    if (localValue) return localValue;

    //result of a funciton
    if (initValue instanceof Function) return initValue();
 
}


const useLocalStorage = ( key:string, initValue:any) => {
    const [value, setValue] = useState(()=>{
        return getLocalValue(key, initValue)
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage;