import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import Nav from './Nav';
import SocialMedia from "./SocialMedia"

const Footer: React.FC = () => {
    const { footerContent, header, socialMedia } = useGlobal()

    return (
        <footer className='border-t-4 border-red-800'>
            <div className='max-w-[1350px] mx-auto mt-[10px] pb-[20px] max-[1350px]:px-4'>
                <div className='relative after:absolute after:w-full after:h-px after:bg-gray-200 after:bottom-[-20px]'>
                    <Nav
                        classNameUl='flex list-none self-start justify-between w-full relative after:absolute after:w-full after:h-[5px] after:bg-gray-200 after:bottom-[-3px]'
                        classNameLi='px-[20px] py-[10px] transiton-all duration-300'
                        classNameA='text-xl cursor-pointer'
                        classNamelIActive='text-black '
                        classNameTitle='text-black hover:text-red-800 css-icon'
                    />
                    <div className='grid items-center my-[30px] grid-col-1 md:grid-cols-2 gap-10'>
                        <div className='max-w-[500px] grid gap-6 max-md:max-w-full self-start'>
                            <p className='text-4xl font-bold text-red-800/70 max-md:text-center'>{header.title}</p>
                            <p>{footerContent.descText}</p>
                            <ul className='flex gap-4 max-md:justify-center '>
                                {socialMedia.socialMediaContent.map((social, index) => (
                                    <SocialMedia
                                        className='text-xl size-2xl hover:text-red-800 css-icon transition-all duration-300 ease-in-out text-white/70 w-[40px] h-[40px] rounded-full bg-blue'
                                        indexProp={index} listLink={social.link} listIcon={social.icon}
                                        classNameIcon='css-icon backdrop-blur-[4px] text-red-800 bg-red-800/15 size-[40px] rounded-full justify-items-center content-center transition-all duration-500 ease hover:bg-red-800 hover:text-white'
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className='max-w-[500px] grid gap-6 max-md:max-w-full justify-self-end'>
                            <p className='text-4xl font-bold text-red-800/70 max-md:text-center'>{footerContent.aboutNewsApiContent.title}</p>
                            <div className="flex items-center">
                                <img className='h-[30px] mr-[10px]' src={`${footerContent.aboutNewsApiContent.logo}`} alt="NewsAPI Logo" />
                                <span>{footerContent.aboutNewsApiContent.name}</span>
                            </div>
                            <p>{footerContent.aboutNewsApiContent.desc}</p>
                            <div className="css-icon bg-red-800/80 px-[20px] py-[10px] text-white rounded-[20px] w-fit">
                                <a href={`${footerContent.aboutNewsApiContent.link}`} target='_blank' className=''>
                                    {footerContent.aboutNewsApiContent.buttonText}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="text-center w-full text-xl text-black/70">
                    <p>&copy; {footerContent.yearFull}{' '} {footerContent.footerText}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;