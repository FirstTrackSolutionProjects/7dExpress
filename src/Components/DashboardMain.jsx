// import DashboardStatement from "./DashboardStatement"
import { useAuth } from "../context/AuthContext"
// import AnnoucementCard from "./AnnoucementCard"
import DashboardSummary from "./DashboardSummary"
// import OwnerAnnoncement from "./OwnerAnnoncement"
import Profile from "./Profile"
// import RazorpayPayment from "./Razorpay"
const DashboardMain = () => {
  const { admin } = useAuth();
  return (
    <div className=" py-16 w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto">
      {/* <Profile /> */}
      {/* {admin ? <OwnerAnnoncement /> : null} */}
      <AnnoucementCard />
      <DashboardSummary />
      {/* <DashboardStatement /> */}
      {/* <RazorpayPayment/> */}
    </div>
  )
}

export default DashboardMain
