import React from "react";
import { useGlobal } from '../../context/GlobalContext';

const Business: React.FC = () => {

    const { text } = useGlobal();
    return (
        <div className="text-3xl font-bold underline flex items-center justify-center h-full" > {text}
        </div>
    )
}

export default Business;