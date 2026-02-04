const Title = ({text}) => {
    return (
        <div className='text-center'>
            <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                {text}
            </span>
        </div>
    );
};

export default Title;