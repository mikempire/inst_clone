import React from 'react';
import {Bars} from "react-loader-spinner";
import './styles.css';

const Loader = () => {
    return (
        <div className="cnLoader">
            <Bars color="#000BFF" width={80} height={80}/>
        </div>
    );
};

export default Loader;