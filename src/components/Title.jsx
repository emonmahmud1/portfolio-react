import React from 'react';

const Title = ({text}) => {
    return (
        <div className='text-center my-5 group'>
            <h1 className='font-semibold text-2xl text-gray-600 font-serif'>{text}</h1>
            <div className="w-16 h-1 bg-gray-400 mx-auto mt-2 rounded transition-all duration-300 group-hover:w-20"></div>
        </div>
    );
};

export default Title;