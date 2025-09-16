import React, { useEffect } from "react";
import { useGlobal } from '../../context/GlobalContext';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Main from "./main";

const Technology: React.FC = () => {
    const { pages, general, keyApi, articles, setArticles, totalData, setTatalData, icons } = useGlobal();

    // lazy loading chua lam

    const Api_findCategory = async (key: string) => {
        try {
            const response = await axios.get("https://newsapi.org/v2/top-headlines", {
                params: {
                    country: 'us',        // hoặc 'gb', 'vn' tùy quốc gia
                    category: `${key}`,   // <-- key sẽ là business, entertainment, health...
                    apiKey: `${keyApi}`
                }
            })
            if (response.data.articles && response.data.articles.length > 0) {
                setTatalData(response.data.totalResults)
                setArticles(response.data.articles);
            }
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message)
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    useEffect(() => {
        Api_findCategory(pages[6].id.toLocaleLowerCase())
    }, [])
    return (
        <>
            <Main titlePage={pages[6].id} />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Technology;