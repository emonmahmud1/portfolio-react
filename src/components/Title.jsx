import React from 'react';

const Title = ({text}) => {
    return (
        <div className='text-center mb-12 group'>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-4">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                {text}
            </div>
            <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-300"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-300"></div>
            </div>
        </div>
    );
};

export default Title;