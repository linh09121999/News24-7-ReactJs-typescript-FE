import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    IconButton,
} from '@mui/material'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import type { SxProps, Theme } from "@mui/material/styles";

const Header: React.FC = () => {
    const { header,
        keywork, setKeyword,
        keyApi,
        isMobile,
        icons,
        setSelectNav,
        pages,
        setArticles,
        setTatalData,
        setVisibleArticles,
        pageSize,
        setCurrentPage
    } = useGlobal()

    const navigate = useNavigate();

    const formatDate = (date: Date | null): string => {
        if (!date) return "No date selected";
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
    };

    const formatDateToYYYYMMDD = (date: Date | null): string => {
        if (!date) return "No date selected";
        return date.toISOString().split("T")[0];
    }

    const sxTextField: SxProps<Theme> = {
        width: "100%",
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: "var(--color-red-800)",
            padding: '3px 8px',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: 'none',
        },

        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            border: 'none'
        },

        '& .MuiOutlinedInput-input': {
            padding: 0
        },

        '& .MuiInputBase-input': {
            color: 'white',
            paddingLeft: '14px',
            fontSize: 'var(--text-lg)',
            border: 'none',
        },
    }

    const sxTextFieldMenu: SxProps<Theme> = {
        padding: '20px',
        width: "100%",
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: "white",
            border: '1px solid var(--color-red-800)',
            padding: '3px 8px',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
        },

        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            border: 'none'
        },

        '& .MuiOutlinedInput-input': {
            padding: 0
        },

        '& .MuiInputBase-input': {
            color: 'var(--color-red-800)',
            paddingLeft: '14px',
            fontSize: 'var(--text-lg)',
            border: 'none',
        },
    }

    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            width: '100vw',
            left: '0 !important',
            right: '0 !important',
            top: '108px !important',
            maxWidth: 'calc(100% - 16px)'
        },
    }

    const MenuListProps: SxProps<Theme> = {
        sx: {
            paddingY: 0.5,
        },
    }

    const sxMenuItem: SxProps<Theme> = {
        justifyContent: 'start',
        paddingY: '10px',
        paddingLeft: '20px',
        color: 'var(--color-red-800)',
        '&:hover': {
            backgroundColor: 'var(--color-red-800)',
            color: 'white',
        },
    }

    const handleSearchGeneral = async () => {
        if (!keywork.trim()) {
            toast.error("You have not entered the search keyword")
            return;
        }
        try {
            const response = await axios.get("https://newsapi.org/v2/everything", {
                params: {
                    q: `${keywork}`,
                    // from: '2025-08-16',
                    // to: `${formatDateToYYYYMMDD(header.date)}`,
                    sortBy: "publishedAt",
                    apiKey: `${keyApi}`
                }
            })
            setTatalData(response.data.totalResults)
            setArticles(response.data.articles);
            setVisibleArticles(response.data.articles.slice(0, pageSize));
            setCurrentPage(1);
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
        setSelectNav(0)
        // setTitlePage(keywork)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchGeneral();
        }
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <header className='bg-red-700 max-md:top-0 max-md:sticky z-100'>
                <div className='max-w-[1350px] mx-auto py-[20px] justify-between flex items-center max-[1350px]:px-[20px]'>
                    <div className='flex items-center gap-4 max-md:grid max-md:gap-1'>
                        <h1 className='text-3xl font-bold text-white md:relative after:absolute after:w-[1px] after:h-full after:bg-white/40 after:right-[-10px]'>{header.title}</h1>
                        <p className='text-lg text-yellow-200 '>{formatDate(header.date)}</p>
                    </div>
                    {isMobile ? (
                        <>
                            <button className="text-3xl text-white"
                                onClick={handleClick}
                            >
                                {icons.iconMenu}
                            </button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
                            >
                                <TextField
                                    placeholder={header.descSearch}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{ color: 'var(--color-red-800)' }}
                                                        onClick={handleSearchGeneral}>
                                                        {header.iconSearch}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={sxTextFieldMenu}
                                    value={keywork}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                {pages.map((page, index) => (
                                    <MenuItem key={index}
                                        onClick={() => {
                                            setAnchorEl(null);
                                            navigate(page.path);
                                            setSelectNav(index)
                                        }}
                                        sx={sxMenuItem}><div className='flex gap-4 items-center text-xl'>{page.icon}{page.id}</div></MenuItem>
                                ))}

                            </Menu></>

                    ) : (
                        <div>
                            <TextField
                                placeholder={header.descSearch}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{ color: 'white' }}
                                                    onClick={handleSearchGeneral}>
                                                    {header.iconSearch}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={sxTextField}
                                value={keywork}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    )}
                </div>
            </header >
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Header