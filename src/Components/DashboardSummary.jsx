import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "../contexts/AuthContext"
const API_URL = import.meta.env.VITE_APP_API_URL
const DashboardSummaryCard = ({title, number}) => {
  return (
    <div className="rounded-xl border-purple-500 border-2 flex-1 m-2  min-w-64 max-w-64 h-32 transition-all flex space-x-5 p-8 items-center duration-300 text-purple-500 font-medium bg-white hover:text-white hover:bg-purple-500">
      {/* <img src="images/logo1.png" alt=""className="w-16" /> */}
      <div>
        <div className="text-lg">{title}</div>
        <div className="text-xl">{number}</div>
      </div>
    </div>
  )
}


const DashboardSummary = () => { 
  const [summary, setSummary] = useState(null)
  const {authState} = useAuth()
  useEffect(() => {
      const getStatistics = async () => {
        await fetch(`${API_URL}/getStatistics`, {
          method: 'POST',
          headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          }
        }).then(response => response.json()).then(response => setSummary(response));
      }
      getStatistics()
  },[])
    return (
        <div className="w-full max-w-[1220px] flex flex-wrap justify-center px-4">
            {authState?.admin ? <DashboardSummaryCard title="Total Merchants" number={summary?summary.merchant:0} /> : null}
            <DashboardSummaryCard title="Total Warehouses" number={summary?summary.warehouse:0} />
            <DashboardSummaryCard title="Total Shipments" number={summary?summary.shipment:0} />
            <DashboardSummaryCard title="Total Delivered" number={summary?summary.delivered:0} />
            <DashboardSummaryCard title="Pending Pickups" number={summary?summary.unDelivered:0} />
            <DashboardSummaryCard title={authState.admin?`Total Revenue`:`Total Wallet Recharge`} number={summary? (authState.admin ? summary.revenue : summary.total_recharge) :0}/>
            <DashboardSummaryCard title="Parcel on process" number={summary?summary.inTransit:0} />
            <DashboardSummaryCard title="Parcel Return" number="0" />
            <DashboardSummaryCard title="NDR Parcel" number="0" />
        </div>
    )
}

export default DashboardSummary