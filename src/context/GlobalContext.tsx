import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import type { JSX, ReactNode } from "react";
import { useMediaQuery } from "@mui/material"

import {
    FaFacebookF,
    FaLinkedinIn,
    FaUser,
    FaHome,
    FaMailBulk,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaAngleDoubleUp,
    FaLaptopCode,
    FaUsers,
    FaLightbulb,
    FaCode,
    FaHtml5,
    FaCss3Alt,
    FaGitAlt
} from "react-icons/fa";
import { FaBriefcase, FaCodeBranch } from "react-icons/fa6";
import { CgMenu } from "react-icons/cg";
import {
    IoClose,
    IoSparkles
} from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { VscVscodeInsiders, VscVscode } from "react-icons/vsc";
import { SiFramework, SiAdobeillustrator } from "react-icons/si";
import { BiLogoJavascript, BiLogoTypescript } from "react-icons/bi";
import { RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { BsLayers } from "react-icons/bs";
import { GrFormNextLink } from "react-icons/gr";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";

export interface Pages {
    id: string;
    title: string | JSX.Element;
    icon: JSX.Element;
    path: string;
}

const defaultPages: Pages[] = [
    {
        id: "General",
        title: <FaHome className="text-[28px]" />,
        icon: <FaHome />,
        path: "/"
    },
    {
        id: "Business",
        title: "Business",
        icon: <></>,
        path: "/business"
    },
    {
        id: "Entertainment",
        title: "Entertainment",
        icon: <></>,
        path: "/entertainment"
    },
    {
        id: "Health",
        title: "Health",
        icon: <></>,
        path: "/health"
    },
    {
        id: "Science",
        title: "Science",
        icon: <></>,
        path: "/science"
    },
    {
        id: "Sports",
        title: "Sports",
        icon: <></>,
        path: "/sports"
    },
    {
        id: "Technology",
        title: "Technology",
        icon: <></>,
        path: "/technology"
    }
]

export interface MyDate {
    weekday: string;
    day: number;
    month: number;
    year: number;
}

export interface Header {
    title: string;
    iconSearch: JSX.Element;
    descSearch: string;
    date: Date | null;
}

const defaultHeader: Header = {
    title: "News 24h",
    iconSearch: <IoMdSearch />,
    descSearch: "Search news",
    date: new Date()
}

export interface Icons {
    iconMenu: JSX.Element;
    iconClose: JSX.Element;
    iconBackToTop: JSX.Element;
    iconMap: JSX.Element;
    iconNext: JSX.Element;
    iconUser: JSX.Element
}

const defaultIcons: Icons = {
    iconMenu: <CgMenu />,
    iconClose: <IoClose />,
    iconBackToTop: <FaAngleDoubleUp />,
    iconMap: <FaMapMarkerAlt size={30} />,
    iconNext: <MdNavigateNext size={24} />,
    iconUser: <FaUser />
}

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface General {
    sidebarTitle: string;
    adsTitle: string;
}

const defaultGeneral: General = {
    sidebarTitle: 'Most Viewed News',
    adsTitle: 'Advertisement'
}

export interface lazyLoading {
    pageLazyLoading: number
}

export interface AboutNewsApiContent{
    title: string;
    desc: string;
    buttonText: string;
    name: string;
    logo: string;
    link: string
}

const defaultAboutNewsApiContent: AboutNewsApiContent = {
    title: "About Our News Source",
    desc: "NewsAPI is a simple HTTP REST API for searching and retrieving live articles from all over the web. It provides current and historical news articles from over 80,000 sources.",
    buttonText: "Get API Key",
    logo: "https://newsapi.org/images/n-logo-border.png",
    name: "NewsAPI.org",
    link: "https://newsapi.org"
}

export interface Footer {
    footerText: string;
    yearFull: number;
    descText: string;
    aboutNewsApiContent: AboutNewsApiContent
}

const defaultFooter: Footer = {
    footerText: "All rights reserved",
    yearFull: new Date().getFullYear(),
    descText: 'Bringing you the latest and most relevant news from around the world. Trusted by millions of readers daily for accurate and timely information.',
    aboutNewsApiContent: defaultAboutNewsApiContent
}

export interface SocialMediaContent {
    title: string;
    link: string;
    icon: JSX.Element;
}

const defaultSocialMediaContent: SocialMediaContent[] = [
    {
        title: "FaceBook",
        link: "https://www.facebook.com/ThuyLinh.09121999",
        icon: <FaFacebookF className="mx-auto" />
    },
    {
        title: "GitHub",
        link: "https://github.com/linh09121999",
        icon: <TbBrandGithubFilled className="mx-auto" />
    },
    {
        title: "LinkedIn",
        link: "https://www.linkedin.com/in/thuylinh09121999/",
        icon: <FaLinkedinIn className="mx-auto" />
    }
]

export interface SocialMedia {
    title: string;
    socialMediaContent: SocialMediaContent[]
}

const defaultSocialMedia: SocialMedia = {
    title: "SOCIAL MEDIA",
    socialMediaContent: defaultSocialMediaContent
}

export interface GlobalState {
    header: Header;
    pages: Pages[];
    isMobile: boolean;
    icons: Icons;
    keywork: string;
    setKeyword: (keywork: string) => void;
    keyApi: string,
    setSelectNav: (index: number) => void;
    selectNav: number;
    general: General;
    articles: Article[];
    setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
    totalData: number;
    setTatalData: (total: number) => void;
    footerContent: Footer;
    socialMedia: SocialMedia;
    titlePage: string;
    setTitlePage: (page: string) => void
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [keywork, setKeyword] = useState<string>("")

    const keyApi = "43e1cbf53535470e9755d9d450375588" //"c974ef460e2e46378e496ade0c22d3ae"

    const [selectNav, setSelectNav] = useState<number>(0);

    const isMobile = useMediaQuery("(max-width:768px)");

    const [articles, setArticles] = useState<Article[]>([]);
    const [totalData, setTatalData] = useState<number>(0)
    const [titlePage, setTitlePage] = useState<string>("General");

    const value = {
        pages: defaultPages,
        header: defaultHeader,
        icons: defaultIcons,
        keywork, setKeyword,
        keyApi,
        selectNav, setSelectNav,
        isMobile,
        general: defaultGeneral,
        articles, setArticles,
        totalData, setTatalData,
        footerContent: defaultFooter,
        socialMedia: defaultSocialMedia,
        titlePage, setTitlePage
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for convenience
export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};