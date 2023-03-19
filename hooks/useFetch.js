import { useEffect, useState } from "react";
import PropTypes from "prop-types";


const url = "https://bakesaleforgood.com/api/deals";

// create a custom hook to fetch data
// export function useFetcher (url){
export function useFetcher (){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState();
    
    useEffect(()=>{

        fetch(url)
        .then(res => {
            if (!res.ok){
                setIsError(true);
                throw new Error("Fail to fetch");
            }
            return res.json();
        })
        .then(data => {
            setIsLoading(false);
            setIsError(null);
            return setData(data);
        }).catch(err => {
            setData(null);
            setIsError(err);
        })
        .finally(()=>{
            setIsLoading(false);
        });

    });

    return {data, isLoading, isError};
}


export function FetchDealDetails (key) {
    return fetch(url +`/${key}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            return data ;})
        .catch(err => console.log(err));
}



useFetcher.propTypes = {
    url: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.string.isRequired,
    term: PropTypes.string,
    key: PropTypes.string.isRequired,
};
