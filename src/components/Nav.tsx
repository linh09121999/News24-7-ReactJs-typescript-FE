import React, { type JSX } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

type navProps = {
    classNameUl?: string;
    iconNext?: JSX.Element;
    classNameLi?: string;
    classNameA?: string;
    classNamelIActive?: string;
    classNameTitle?: string
}

const Nav: React.FC<navProps> = ({
    classNameUl,
    iconNext,
    classNameLi,
    classNameA,
    classNamelIActive,
    classNameTitle
}) => {
    const { pages, setSelectNav, selectNav, isMobile } = useGlobal();
    const navigate = useNavigate();
    return (
        <>
            {isMobile ? (<></>) : (
                <ul className={classNameUl}>
                    {pages.map((page, index) => (
                        <li key={index} className={`${classNameLi} ${selectNav === index ? `${classNamelIActive}` : "text-white "}`}>
                            <a
                                onClick={() => {
                                    navigate(page.path)
                                    setSelectNav(index)
                                }}
                                className={`${classNameA} `}
                            >
                                <div className={classNameTitle}>{iconNext} {page.title}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </>

    )
}
export default Nav