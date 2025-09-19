import React, { type JSX } from 'react';

type socialMediaProps = {
    indexProp: number;
    listLink: string;
    listIcon?: JSX.Element;
    listTitle?: string;
    className?: string;
    classNameIcon?: string;
    classNameTitle?: string;
}

const SocialMedia: React.FC<socialMediaProps> = ({
    indexProp = 0,
    listIcon,
    listLink,
    listTitle,
    className,
    classNameIcon,
    classNameTitle
}) => {
    return (
        <li key={indexProp}>
            <a href={`${listLink}`}
                className={className}>
                <div className={classNameIcon}>{listIcon}</div>
                <div className={classNameTitle}>{listTitle}</div>
            </a>
        </li>
    )
}

export default SocialMedia