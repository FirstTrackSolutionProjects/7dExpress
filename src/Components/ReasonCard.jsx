
const ReasonCard = ({ title, icon}) => {
  return (
    <div className=" w-80 h-20 md:w-96  md:h-32 mt-2 flex  items-center  border-b-white border-2 shadow-lg shadow-slate-900 p-1">
        <div className="md:w-[80px]  md:h-[70px] rounded-2xl bg-transparent flex items-center justify-center ml-6 ">
            <img src={`${icon}`} alt="" className="w-[60px] h-[50px] md:w-[80px]  md:h-[70px] rounded-2xl" />
        </div>
        <div className="md:w-72 text-[14px] md:text-[20px] items-center text-center justify-center p-7 text-sky-950 h-[90px] ">
            {title}
        </div>
        <div className="items-end mr-3 -mt-1 text-sky-950">&#10095;</div>
    </div>
  )
}

export default ReasonCard
