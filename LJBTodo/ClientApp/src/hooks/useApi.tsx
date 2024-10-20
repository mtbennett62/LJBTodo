import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";


export const useApi = <T,>(url: string, options?: AxiosRequestConfig) => {
const [data, setData] = useState<T | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState(null);


const fetchData = async () => {
    setIsLoading(true);

    await axios(url, options).then(response => {
        setData(response.data);
        setIsLoading(false);
    }).catch(error => {
        setError(error);
    });
};

    useEffect(() => {
        fetchData();
    }, []);

    return { data, isLoading, error };
}