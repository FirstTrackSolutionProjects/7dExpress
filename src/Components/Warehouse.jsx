import { TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
const API_URL = import.meta.env.VITE_APP_API_URL
const AddForm = ({ setMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    internationalAddress: "",
    pin: "",
    city: "",
    state: "",
    country: "India",
    username: localStorage.getItem("username"),
  });

  const fillCityState = async (pin) => {
    try {
      if (pin.length !== 6) return;
      const resp = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await resp.json();
      if (data?.[0]?.Status === 'Success') {
        setFormData(prev => ({
          ...prev,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State
        }));
      }
    } catch (err) {}
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validatedFormData = {
      name : formData.name.trim(),
      phone : formData.phone.trim(),
      email : formData.email.trim(),
      address : formData.address.trim(),
      pin : formData.pin.trim(),
      city : formData.city.trim(),
      state : formData.state.trim(),
      country : formData.country.trim()
    }
    if (validatedFormData.phone.length !== 10) {alert("Please enter phone number with 10 digits"); return; }
    if (validatedFormData.pin.length !== 6) {alert("Please enter pincode with 6 digits"); return; }
    fetch(`${API_URL}/warehouse/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': localStorage.getItem("token"),
      },
      body: JSON.stringify(validatedFormData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Creating Warehouse...");
          setMode(0);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <div
        className={`w-full p-4 flex flex-col items-center space-y-6`}
      >
        <div className="w-[728px] h-16 px-4  relative flex">
          <div className="text-2xl font-medium">ADD WAREHOUSE</div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setMode(0);
            }}
            className="px-5 py-1 bg-blue-500 absolute rounded-3xl text-white  right-4"
          >
            X
          </div>
        </div>
        <form
          action=""
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex mb-2 flex-wrap ">
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
              <label htmlFor="name">Warehouse Name</label>
              <input required
                className="w-full border py-2 px-4 rounded-md"
                type="text"
                id="name"
                name="name"
                maxLength={36}
                placeholder="Warehouse Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex mb-2 flex-wrap ">
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
              <label htmlFor="phone">Mobile Number</label>
              <input required
                className="w-full border py-2 px-4 rounded-md"
                type="text"
                id="phone"
                name="phone"
                minLength={10}
                maxLength={10}
                placeholder="Ex. 1234567890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
              <label htmlFor="email">Email</label>
              <input required
                className="w-full border py-2 px-4 rounded-md"
                type="text"
                id="email"
                name="email"
                placeholder="Ex. merchant123@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
            <label htmlFor="address">Address</label>
            <input required
              className="w-full border py-2 px-4 rounded-md"
              type="text"
              maxLength={100}
              id="address"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex mb-2 flex-wrap ">
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
              <label htmlFor="pin">Pincode</label>
              <input required
                className="w-full border py-2 px-4 rounded-md"
                type="text"
                id="pin"
                name="pin"
                minLength={6}
                maxLength={6}
                placeholder="Enter Pincode"
                value={formData.pin}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
              <label htmlFor="city">City</label>
              <input required
                className="w-full border py-2 px-4 rounded-md"
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex mb-2 flex-wrap ">
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2 flex flex-col justify-center">
              <label htmlFor="state">State</label>
              <input required
                className="w-full border py-2 px-4 rounded-md"
                type="text"
                id="state"
                name="state"
                placeholder="Enter State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
              <label htmlFor="country">Country</label>
              <input required
                className="w-full border py-2 px-4 rounded-md"
                type="text"
                id="country"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="flex-1 mx-2 mb-2 min-w-[300px] flex justify-center space-x-3">
            <input
                className=" border py-2 px-4 rounded-md"
                type="checkbox"
                id="same"
                name="same"
                value={formData.same}
                onChange={handleChange}
              />
              <label htmlFor="same">Return address is same as Pickup address</label>
              
            </div> */}
          <button
            type="submit"
            className="border bg-white mx-2 py-2 px-4 rounded-lg"
          >
            Create Warehouse
          </button>
        </form>
      </div>
    </>
  );
};

const ManageForm = ({ isManage, setIsManage, name, address, pin, phone, city, state }) => {
  const formData = {
    name: name,
    phone: phone,
    address: address,
    pin: pin,
    city: city,
    state: state,
    country: "India"
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.4)] z-20 w-full p-4 flex flex-col items-center justify-center ${isManage ? "" : "hidden"
          }`}
      >
       <div className="p-4 bg-white rounded-lg max-h-[95%] overflow-y-auto">
       <div className="w-full md:w-[600px] h-16 px-4  relative flex">
          <div className="text-2xl font-medium">WAREHOUSE</div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setIsManage(0);
            }}
            className="px-5 py-1 bg-blue-500 absolute rounded-3xl text-white  right-4"
          >
            X
          </div>
        </div>
        <form
          action=""
          className="flex flex-col"
        >
          <div className="w-full flex mb-2 flex-wrap ">
            <div className="flex-1 mx-2 mb-2 min-w-[300px] space-y-2">
              <label htmlFor="name">Warehouse Name</label>
              <TextField
                size={'small'}
                className="w-full border py-2 px-4 rounded-3xl"
                type="text"
                value={formData.name}
              />
            </div>
          </div>
          <div className="w-full flex mb-2 flex-wrap ">
            <div className="flex-1 mx-2 mb-2 min-w-[280px] space-y-2">
              <label htmlFor="phone">Mobile Number</label>
              <TextField
                size={'small'}
                className="w-full border py-2 px-4 rounded-3xl"
                value={formData.phone}
              />
            </div>
          </div>
          <div className="flex-1 mx-2 mb-2 min-w-[280px] space-y-2">
            <label htmlFor="address">Address</label>
            <TextField
              size="small"
              className="w-full border py-2 px-4 rounded-3xl"
              type="text"
              value={formData.address}
            />
          </div>
          <div className="flex-1 mx-2 mb-2 min-w-[280px] space-y-2">
            <label htmlFor="state">City</label>
            <TextField
              size="small"
              className="w-full border py-2 px-4 rounded-3xl"
              type="text"
              value={formData.city}
            />
          </div>
          <div className="flex-1 mx-2 mb-2 min-w-[280px] space-y-2">
            <label htmlFor="address">State</label>
            <TextField
              size="small"
              className="w-full border py-2 px-4 rounded-3xl"
              type="text"
              value={formData.state}
            />
          </div>
          <div className="flex-1 mx-2 mb-2 min-w-[280px] space-y-2">
            <label htmlFor="address">Country</label>
            <TextField
              size="small"
              className="w-full border py-2 px-4 rounded-3xl"
              type="text"
              value={formData.country}
            />
          </div>
          <div className="w-full flex mb-2 flex-wrap ">
            <div className="flex-1 mx-2 mb-2 min-w-[280px] space-y-2">
              <label htmlFor="pin">Pincode</label>
              <TextField
                size="small"
                className="w-full border py-2 px-4"
                type="text"
                value={formData.pin}
              />
            </div>
          </div>
        </form>
       </div>
      </div>
    </>
  );
};

const WarehouseServiceCard = ({ name, id, isCreated }) => {
  return (
    <>
      <div className="text-center bg-gray-600 rounded-lg py-3 px-3 font-bold text-white">
        {name}<br />{isCreated ? <p className="text-green-400">Warehouse Online</p> : <p className="text-red-500">Failed to Create Warehouse</p>}
      </div>
    </>
  )
}

const WarehouseServiceList = ({ wid, setCheckWarehouse }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allSuccess, setAllSuccess] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryWarehouseCreation = async () => {
    setIsRetrying(true);
    const retryRequest = await fetch(`${API_URL}/warehouse/create/retry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ wid })
    })
    const retryResponse = await retryRequest.json();
    if (retryResponse.success) {
      setAllSuccess(retryResponse.all_created);
      setServices(retryResponse.response)
    }
    setIsRetrying(false)
  }
  useEffect(() => {
    const getServices = async () => {
      const checkWarehouse = await fetch(`${API_URL}/warehouse/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ wid }),
      })
        .then((response) => response.json())
        .catch((error) => console.error(error));
      setServices(checkWarehouse.response);
      setAllSuccess(checkWarehouse.all_created)
      setIsLoading(false);
    };
    getServices();
  }, [wid]);
  return (
    <>
      <div className="w-full relative pt-6">
        <div
          className="absolute top-3 right-3 w-9 h-6 bg-slate-600 text-white flex justify-center items-center rounded-lg"
          onClick={() => setCheckWarehouse(false)}
        >
          X
        </div>
        {!allSuccess ? <div className="flex items-center bg-yellow-500 px-3 justify-center">
          <div>Warehouse failed to create on some services</div>
          <div onClick={isRetrying ? () => { } : () => { retryWarehouseCreation() }} className="p-3 bg-yellow-500 font-bold">{isRetrying ? "Creating..." : "Retry"}</div>
        </div> : ""}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {(services && services.length) ? services.map((service, index) => (
            <WarehouseServiceCard key={index} name={service.service_name} id={service.service_id} isCreated={service.warehouse_created} />
          )) : isLoading ? "Loading..." : "Something went wrong while fetching services"}
        </div>
      </div>
    </>
  )
}

const Card = ({ name, address, pin, phone, wid, justCreated, state, city }) => {
  const [isManage, setIsManage] = useState(false);
  const [checkWarehouse, setCheckWarehouse] = useState(justCreated ? true : false);
  useEffect(() => {
    const seenJustCreated = async () => {
      await fetch(`${API_URL}/warehouse/new/seen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ wid }),
      })
        .then((response) => response.json())
        .catch((error) => console.error(error))
    }
    if (justCreated) {
      seenJustCreated();
    }
  }, [])
  return (
    <>
      <ManageForm isManage={isManage} setIsManage={setIsManage} name={name} address={address} pin={pin} phone={phone} wid={wid} state={state} city={city} />
      <div className="w-full h-16 bg-white relative items-center px-8 flex border-b">
        <div>{name}</div>
        <div className="absolute right-8 flex space-x-2 items-center">
          
          <div className="cursor-pointer py-1 px-2 rounded-lg bg-blue-500 text-white" onClick={() => setCheckWarehouse(true)}>Check</div>
          <div className="cursor-pointer p-2 rounded-lg bg-blue-500 text-white" onClick={() => setIsManage(true)}><FaEye/></div>
        </div>
      </div>
      {checkWarehouse ? <WarehouseServiceList wid={wid} setCheckWarehouse={setCheckWarehouse} /> : null}
    </>
  );
};

import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Listing = ({ setMode }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isManage, setIsManage] = useState(false);
  const [checkWarehouse, setCheckWarehouse] = useState(false);
  
  const isAdmin = (() => {
    const role = localStorage.getItem('role')?.toUpperCase();
    const username = localStorage.getItem('username')?.toLowerCase();
    const token = localStorage.getItem('token');
    let tokenAdmin = false;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        tokenAdmin = decoded.admin === true || decoded.admin === 1;
      } catch (e) {}
    }
    return role === 'ADMIN' || username === 'admin' || tokenAdmin;
  })();

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/warehouse/warehouses${isAdmin ? '/all' : ''}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("token"),
      },
    }).then(res => res.json()).catch(() => ({rows: []}));
    setWarehouses(response.rows || []);
    setIsLoading(false);
  };

  const columns = [
    { field: 'wid', headerName: 'ID', width: 70 },
    ...(isAdmin ? [
      { field: 'merchantName', headerName: 'Merchant', width: 180 },
      { field: 'merchantEmail', headerName: 'Merchant Email', width: 200 },
    ] : []),
    { field: 'warehouseName', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'state', headerName: 'State', width: 120 },
    { field: 'pin', headerName: 'Pincode', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => {
              setSelectedWarehouse(params.row);
              setCheckWarehouse(true);
            }}
          >
            Check
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => {
              setSelectedWarehouse(params.row);
              setIsManage(true);
            }}
          >
            Manage
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ width: '100%', p: 4 }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <h2 className="text-2xl font-medium">WAREHOUSES</h2>
          <Button variant="contained" onClick={() => setMode(1)}>Add Warehouse</Button>
        </Box>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={warehouses}
            columns={columns}
            getRowId={(row) => row.wid}
            loading={isLoading}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#3b82f6',
                color: 'white',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                color: 'white',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#3b82f6',
              },
              '& .MuiDataGrid-iconButtonContainer .MuiButtonBase-root': {
                color: 'white',
              },
              '& .MuiDataGrid-menuIcon .MuiButtonBase-root': {
                color: 'white',
              }
            }}
          />
        </Box>
      </Paper>
      {selectedWarehouse && (
        <>
          <ManageForm 
            isManage={isManage} 
            setIsManage={setIsManage} 
            name={selectedWarehouse.warehouseName} 
            address={selectedWarehouse.address} 
            pin={selectedWarehouse.pin} 
            phone={selectedWarehouse.phone} 
            city={selectedWarehouse.city} 
            state={selectedWarehouse.state} 
          />
          <Dialog 
            open={checkWarehouse} 
            onClose={() => setCheckWarehouse(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <div>Check Services</div>
                <IconButton onClick={() => setCheckWarehouse(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <WarehouseServiceList 
                wid={selectedWarehouse.wid} 
                setCheckWarehouse={setCheckWarehouse} 
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
};

const Warehouse = () => {
  const [mode, setMode] = useState(0);
  return (
    <div className="py-16 w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto">
      {mode == 0 ? <Listing setMode={setMode} /> : <AddForm setMode={setMode} />}
    </div>
  );
};

export default Warehouse;
