import React, { useState, useEffect } from "react";

const WarehouseSelect = ({ value, onChange }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchWarehouses = async () => {
      const response = await fetch(`${API_URL}/warehouse/warehouses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        }
      }).then(res => res.json());
      setWarehouses(response.rows || []);
    };
    fetchWarehouses();
  }, []);

  const filtered = warehouses.filter(w => 
    w.warehouseName.toLowerCase().includes(query.toLowerCase())
  );

  const selectedName = warehouses.find(w => w.wid == value)?.warehouseName || "Select Warehouse...";

  return (
    <div className="relative w-full">
      <div 
        className="w-full border py-2 px-4 rounded-md cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedName}
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <input 
            className="w-full p-2 border-b sticky top-0 bg-gray-50"
            placeholder="Search warehouse..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filtered.map(w => (
            <div 
              key={w.wid}
              className="p-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                onChange(w.wid);
                setIsOpen(false);
              }}
            >
              <div className="font-medium">{w.warehouseName}</div>
              <div className="text-xs text-gray-500">{w.city}, {w.pin}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WarehouseSelect;