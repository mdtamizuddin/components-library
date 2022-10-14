const StatisticsCard = ({ color, icon , tColor , data}) => {
    return (
        <div
            className={`${color} border h-[113px] flex items-center justify-around shadow rounded-md`}>
            <div className="flex flex-col items-center">
                <h1 className="text-[35px] text-white font-bold py-0 my-0">{data.number}</h1>
                <p className="font-bold text-white">{data.name}</p>
            </div>
            <div className="flex items-center justify-center bg-white w-10 h-10 rounded-full">
                <i className={`fa-solid ${tColor} ${icon}`}></i>
            </div>
        </div>
    );
}

export default StatisticsCard;