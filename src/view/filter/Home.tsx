import React, { useEffect, useState, useCallback } from "react";
import { useGlobal } from '../../context/GlobalContext';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { format } from "date-fns";

const flyX = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(5px); }`


const General: React.FC = () => {

    const {
        keyApi,
        setArticles,
        currentPage,
        setCurrentPage,
        setTatalData,
        titlePage,
        articles,
        totalData,
        icons,
        pageSize,
        searchType,
        keyword
    } = useGlobal();

    const sxCard: SxProps<Theme> = {
        height: '100%',
        borderRadius: '15px',
        transition: 'all 0.3s ease',
        ':hover': {
            transform: 'translateY(-3px)'
        },
        ':hover span': {
            animation: `${flyX} 0.6s ease-in-out infinite alternate`,
        }
    }

    const sxCardActionArea: SxProps<Theme> = {
        position: 'relative',
        display: 'grid',
        height: '100%',
        ':hover .MuiCardMedia-media': {
            transform: 'scale(1.05)',
        }
    }

    const sxCardMedia: SxProps<Theme> = {
        height: '250px',
        transition: 'transform 0.5s ease',
    }

    const formatDate = (isoString: string) =>
        format(new Date(isoString), "MM/dd/yyyy hh:mm a");

    const [loading, setLoading] = useState<boolean>(false)

    const Api_findCategory = useCallback(async (key: string, page: number) => {
        try {
            setLoading(true);
            const response = await axios.get("https://news247-be.onrender.com/api/headlines", {
                params: {
                    country: "us",
                    category: key,
                    apiKey: keyApi,
                    pageSize,
                    page, // <-- dùng page truyền vào, không phụ thuộc state cũ
                },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            if (response.data.articles && response.data.articles.length > 0) {
                setTatalData(response.data.totalResults);
                if (page === 1) {
                    setArticles(response.data.articles);
                } else {
                    setArticles((prev) => [...prev, ...response.data.articles]);
                }
                setCurrentPage(page); // cập nhật page hiện tại sau khi load xong
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const Api_findkeyword = useCallback(async (key: string, page: number) => {
        try {
            setLoading(true);
            const response = await axios.get("https://news247-be.onrender.com/api/everything", {
                params: {
                    q: key,
                    sortBy: "publishedAt",
                    apiKey: keyApi,
                    pageSize,
                    page,

                },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            if (response.data.articles && response.data.articles.length > 0) {
                setTatalData(response.data.totalResults);
                if (page === 1) {
                    setArticles(response.data.articles);
                } else {
                    setArticles((prev) => [...prev, ...response.data.articles]);
                }
                setCurrentPage(page); // cập nhật page hiện tại sau khi load xong
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        Api_findCategory(titlePage.toLowerCase(), 1);
    }, [])

    // load page 1 khi đổi category
    useEffect(() => {
        if (searchType === "category" && titlePage) {
            setCurrentPage(1); // reset page khi đổi category
            Api_findCategory(titlePage.toLowerCase(), 1);
        } else if (searchType === "word" && titlePage) {
            setCurrentPage(1); // reset page khi đổi category
            Api_findkeyword(keyword, 1)
        }
    }, [titlePage, searchType, Api_findCategory, Api_findkeyword]);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (loading) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                const totalPages = Math.ceil(totalData / pageSize);
                if (currentPage < totalPages) {
                    if (searchType === "category") Api_findCategory(titlePage.toLowerCase(), currentPage + 1); // gọi page mới
                    else if (searchType === "word") Api_findkeyword(keyword, currentPage + 1)
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, currentPage, totalData, titlePage, Api_findCategory, Api_findkeyword]);

    return (
        <>
            <main className='min-h-[33vh] my-[30px] p-[20px]' >
                <div className="max-w-[1350px] mx-auto justify-between flex items-center gap-4 mb-[20px] pb-[10px] border-b-2 border-gray-200">
                    <h2 className="text-2xl text-red-800 font-bold relative ml-[12px] before:absolute before:w-[4px] before:h-full before:bg-red-800 before:left-[-10px]">{titlePage}</h2>
                    <div className="text-lg bg-red-800/20 text-red-800 px-[10px] py-[5px] rounded-[15px]">total: {totalData} results</div>
                </div>
                <div className="max-w-[1350px] mx-auto grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 gap-6 w-full">
                    {articles.map((article, index) => (
                        <Card key={index} sx={sxCard}>
                            <CardActionArea sx={sxCardActionArea}
                                component="a"
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className='self-start'>
                                    <CardMedia
                                        sx={sxCardMedia}
                                        component="img"
                                        image={article.urlToImage}
                                        alt={article.source.name}
                                    />
                                    <div className="absolute top-[15px] left-[15px] bg-red-800 text-white p-[5px_12px] text-sm shadow-sm rounded-full">{article.source.name}</div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: '600' }}>
                                            {article.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {article.description}
                                        </Typography>
                                    </CardContent>
                                </div>

                                <div className='self-end'>
                                    <CardContent sx={{ borderBottom: '2px solid var(--color-gray-200)', paddingY: '16px !important', paddingX: '0 !important', marginX: '16px' }}>
                                        <a href={article.url} className=" flex items-center text-red-800 font-[600] transition duration-200 ease hover:text-red-900">
                                            Read more
                                            <span className=" transfrom duration-200 ease">{icons.iconNext}</span>
                                        </a>
                                    </CardContent>
                                    <div className="p-[16px] flex justify-between self-end">
                                        <p className="text-red-800 font-[600] flex gap-2 items-center">{icons.iconUser} {article.author}</p>
                                        <p className="text-black/50">{formatDate(article.publishedAt)}</p>
                                    </div>
                                </div>

                            </CardActionArea>
                        </Card>
                    ))}

                </div >
                {totalData === 0 && <p className="text-center text-gray-500 ">There is no news !</p>}
                {loading && <p className="text-center py-4 text-gray-500">loading more...</p>}
            </main >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default General;