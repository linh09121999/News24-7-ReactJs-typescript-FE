import React from "react";
import { useGlobal } from '../../context/GlobalContext';

const Entertainment: React.FC = () => {

    const { text } = useGlobal();
    return (
        <div className="text-3xl font-bold underline flex items-center justify-center h-full" > {text}
        </div>
    )
}

export default Entertainment;