
const ReasonCard = ({ title, icon}) => {
  return (
    <div className="relative  h-20  md:h-32 mt-2 flex  items-center  border-b-white border-2 shadow-lg shadow-slate-900 p-1">
        <div className="md:w-[80px]  md:h-[70px] rounded-2xl bg-transparent flex items-center justify-center ml-6 ">
            <img src={`${icon}`} alt="" className="w-[60px] h-[50px] md:w-[80px]  md:h-[70px] rounded-2xl" />
        </div>
        <div className="flex-1 text-[14px] md:text-[20px] items-center text-center justify-center p-7 text-sky-950 ">
            {title}
        </div>
        <div className="absolute right-3 text-sky-950">&#10095;</div>
    </div>
  )
}

export default ReasonCard
