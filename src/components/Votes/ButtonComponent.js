import React from 'react';
import {motion} from 'framer-motion';

const ButtonComponent = ({label, onClick}) => {

    return (
        <motion.div whileTap={{scale: 0.9}}>
            <button onClick={onClick}
                    className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-sm font-bold py-2 px-2 rounded box-shadow-black">
                {label}
            </button>
        </motion.div>
    );
}

export default ButtonComponent;