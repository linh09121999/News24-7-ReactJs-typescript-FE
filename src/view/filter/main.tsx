import React, { type JSX } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { format } from "date-fns";

type mainProps = {
    titlePage: string;

}

const flyX = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(5px); }`

const Main: React.FC<mainProps> = ({
    titlePage
}) => {
    const { articles, totalData, icons } = useGlobal();

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

    return (
        <main className='max-w-[1350px] mx-auto my-[30px] bg-white shadow-lg p-[20px] rounded-[10px]' >
            <div className="flex gap-4 justify-between items-center mb-[20px] pb-[10px] border-b-2 border-gray-200">
                <h2 className="text-2xl text-red-800 font-bold relative ml-[12px] before:absolute before:w-[4px] before:h-full before:bg-red-800 before:left-[-10px]">{titlePage}</h2>
                <div className="text-lg bg-red-800/20 text-red-800 px-[10px] py-[5px] rounded-[15px]">total: {totalData} results</div>
            </div>
            <div className="grid grid-col-1 md:grid-cols-3 gap-6 w-full">
                {articles.map((article, index) => (
                    <Card key={index} sx={sxCard}>
                        <CardActionArea sx={sxCardActionArea}>
                            <CardMedia
                                sx={sxCardMedia}
                                component="img"
                                image={article.urlToImage}
                                alt={article.source.name}
                            />
                            <div className="absolute top-[15px] left-[15px] bg-red-800 text-white p-[5px_12px] text-sm shadow-sm rounded-full">{article.source.name}</div>
                            <CardContent >
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: '600' }}>
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {article.description}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ borderBottom: '2px solid var(--color-gray-200)', paddingY: '16px !important', paddingX: '0 !important', marginX: '16px' }}>
                                <a href={article.url} className=" flex items-center text-red-800 font-[600] transition duration-200 ease hover:text-red-900">
                                    Read more
                                    <span className=" transfrom duration-200 ease">{icons.iconNext}</span>
                                </a>
                            </CardContent>
                            <div className="p-[16px] flex justify-between">
                                <p className="text-red-800 font-[600] flex gap-2 items-center">{icons.iconUser} {article.author}</p>
                                <p className="text-black/50">{formatDate(article.publishedAt)}</p>
                            </div>
                        </CardActionArea>
                    </Card>
                ))}
            </div >
            {totalData === 0 && <p className="text-center text-gray-500 ">There is no news !</p>}
        </main >
    )
}

export default Main