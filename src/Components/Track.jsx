// ./src/components/TrackParcel.jsx

import { useState, useEffect } from "react"


const Card = ({scan}) => {
  return (
      <>
          <div className="w-full h-16 bg-white relative items-center px-8 flex border-b space-x-4">
              <div>{scan.ScanDateTime}</div>
              <div>{scan.ScannedLocation}</div>
              <div className="absolute right-8 cursor-pointer">{scan.Instructions}</div>
          </div>
      </>
  )
}
const FlightGoCard = ({scan}) => {
  return (
      <>
       <div className="w-full h-16 bg-white relative items-center px-8 flex border-b space-x-4">
              <div>{scan.event_at}</div>
              <div>{scan.event_location}</div>
              <div className="absolute right-8 cursor-pointer">{scan.event_description}</div>
          </div>
      </>
  )
}
const MovinCard = ({scan}) => {
  return (
      <>
       <div className="w-full h-16 bg-white relative items-center px-8 flex border-b space-x-4">
              <div>{scan.timestamp}</div>
              <div className="absolute right-8 cursor-pointer">{scan.package_status}</div>
          </div>
      </>
  )
}
const ShipRocketCard = ({scan}) => {
  return (
    <>
     <div className="w-full h-16 bg-white relative items-center px-8 flex border-b space-x-4">
              <div>{scan.timestamp}</div>
              <div>{scan.location}</div>
              <div className="absolute right-8 cursor-pointer">{scan.remarks}</div>
          </div>
    </>
)
}

const Result = ({data}) => {
  useEffect(() => {
      console.log(data)
  },[data])
  return (
      <>
          <div className={`w-full p-8 overflow-hidden  `}>
                  {data?.id == 1 ? data?.data.ShipmentData[0].Shipment.Scans.slice().reverse().map((scan, index)=>(
                      <Card key={index} scan={scan.ScanDetail} />
                  )) : null}
                  {data?.id == 2 ? data?.data.docket_events.map((scan, index)=>(
                      <FlightGoCard key={index} scan={scan} />
                  )): null}
                  {data?.id == 3 ? data?.data.map((scan, index)=>(
                      <MovinCard key={index} scan={scan} />
                  )): null}
                  {data?.id == 4 ? data?.data.map((scan, index)=>(
                      <ShipRocketCard key={index} scan={scan} />
                  )): null}
          </div>
      
      </>
  )
}

const Track = () => {
  const [formData,setFormData] = useState({
    awb : ''
})

useEffect(() => {
    if (localStorage.getItem('track')){
        setFormData({id: localStorage.getItem('track'), isWaybill: true})
        localStorage.setItem('track','')
        // handleSubmit(1)
    }
}, [])

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:type === 'radio' ? checked : value
    }));
  };
const [trackingData,setTrackingData] = useState(null)
const handleSubmit = async (e) => {
    try{
        e.preventDefault();
    } catch (e) {}
    const data = await fetch('/.netlify/functions/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => response.json())
    setTrackingData(data)
}
  return (
    <>
    <div className="flex flex-col justify-center bg-transparent items-center ">
      {/*<div className="bg-white p-4 rounded-lg shadow-lg">*/}
        
        <form className="flex" onSubmit={handleSubmit}>
          <input required
            name="awb"
            value={formData.id}
            onChange={handleChange}
            type="text" 
            placeholder="Enter tracking number" 
            className="text-6px w-52 md:w-64 p-3 shadow-lg shadow-gray-400 focus:outline-none rounded-l-lg focus:border-white  text-gray-900" 
          />
          <button 
            type="submit" 
            className="bg-sky-800 text-gray-300 text-bold p-3 rounded-r-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Track
          </button>
        </form>

      </div>
      {trackingData && <Result data={trackingData} />}
      </>
    
  );
};

export default Track;
