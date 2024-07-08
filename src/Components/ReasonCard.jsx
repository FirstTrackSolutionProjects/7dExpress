
const ReasonCard = ({ title, icon}) => {
  return (
    <div className=" w-96  h-32  flex  items-center  border-b-white border-2 shadow-lg shadow-slate-900 p-1">
        <div className="w-[80px]  h-[70px] rounded-2xl bg-transparent flex items-center justify-center ml-6 ">
            <img src={`${icon}`} alt="" className="w-[80px]  h-[70px] rounded-2xl" />
        </div>
        <div className="w-72 text-[20px] items-center text-center justify-center p-6 text-sky-950 h-[90px] ">
            {title}
        </div>
        <div className="items-end mr-3 -mt-1 text-sky-950">&#10095;</div>
    </div>
  )
}

export default ReasonCard
