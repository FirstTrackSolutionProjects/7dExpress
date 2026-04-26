import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import getFilterStartDate from '../helpers/getFilterStartDate';
import getTodaysDate from '../helpers/getTodaysDate';
import convertToUTCISOString from '../helpers/convertToUTCISOString';

const API_URL = import.meta.env.VITE_APP_API_URL;
const PAGE_SIZE = 50;

const columns = [
  { field: 'date', headerName: 'Date', flex: 1, renderCell: p => new Date(p.row.date).toLocaleString(), minWidth: 175 },
  { field: 'type', headerName: 'Type', flex: 1, minWidth: 100 },
  { field: 'order_id', headerName: 'Order ID', flex: 1, minWidth: 120 },
  { 
    field: 'merchant_details', 
    headerName: 'Merchant Details', 
    minWidth: 250,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', whiteSpace: 'normal', lineHeight: 1.3, height: 80, justifyContent: 'center' }}>
        <div className="font-bold text-gray-800">{params.row.fullName}</div>
        <div className="text-xs text-gray-500">{params.row.email}</div>
      </Box>
    )
  },
  { 
    field: 'shipment_details', 
    headerName: 'Shipment Details', 
    minWidth: 200,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', whiteSpace: 'normal', lineHeight: 1.3, height: 80, justifyContent: 'center' }}>
        {params.row.service_name && <div className="text-sm font-medium">Service: {params.row.service_name}</div>}
        {params.row.awb && <div className="text-xs text-blue-600 font-semibold">AWB: {params.row.awb}</div>}
      </Box>
    )
  },
  { field: 'amount', headerName: 'Amount', flex: 1, renderCell: p => {
      const v = Number(p.value);
      if (isNaN(v)) return '';
      let sign = '+';
      let cls = 'text-green-600';
      if (['expense', 'dispute_charge', 'extra', 'rto'].includes(p.row.type)) {
        sign = '-';
        cls = 'text-red-600';
      } else if (p.row.type === 'manual' && v < 0) {
        sign = '-';
        cls = 'text-red-600';
      }
      return <span className={`font-bold ${cls}`}>{sign}{Math.abs(v)}</span>;
    }, minWidth: 100 },
  { field: 'reason', headerName: 'Reason', flex: 1, minWidth: 150 },
];

const AllTransactions = () => {
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    type: 'all',
    order_id: '',
    merchant_email: '',
    startDate: getFilterStartDate(),
    endDate: getTodaysDate()
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        ...filters,
        page,
        startDate: convertToUTCISOString(`${filters.startDate}T00:00:00`),
        endDate: convertToUTCISOString(`${filters.endDate}T23:59:59.999`)
      }).toString();
      const res = await fetch(`${API_URL}/wallet/transactions/admin?${query}`, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await res.json();
      if (result.success) {
        setRows(result.data.rows);
        setRowCount(result.data.totalRecords);
        setTotalPages(result.data.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(`${API_URL}/wallet/report/download/all`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') 
        },
        body: JSON.stringify({
            startDate: convertToUTCISOString(`${filters.startDate}T00:00:00`),
            endDate: convertToUTCISOString(`${filters.endDate}T23:59:59.999`),
            merchant_email: filters.merchant_email
        })
      });
      const result = await res.json();
      if (result.success) {
        const worksheet = XLSX.utils.json_to_sheet(result.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, `Transactions_${filters.startDate}_to_${filters.endDate}.xlsx`);
      }
    } catch (err) {
      alert("Failed to download report");
    }
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const addPage = (num) => pages.push({ number: num, isCurrent: num === currentPage });
    addPage(1);
    if (totalPages <= 7) {
      for (let i = 2; i < totalPages; i++) addPage(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) addPage(i);
        pages.push({ number: '...', isCurrent: false });
      } else if (currentPage >= totalPages - 3) {
        pages.push({ number: '...', isCurrent: false });
        for (let i = totalPages - 4; i < totalPages; i++) addPage(i);
      } else {
        pages.push({ number: '...', isCurrent: false });
        for (let i = currentPage - 1; i <= currentPage + 1; i++) addPage(i);
        pages.push({ number: '...', isCurrent: false });
      }
    }
    if (totalPages > 1) addPage(totalPages);
    return (
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-4 pb-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md text-sm ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Prev
        </button>
        {pages.map((p, idx) => (
          <button
            key={idx}
            onClick={() => p.number !== '...' && onPageChange(p.number)}
            className={`min-w-[32px] px-2 py-1 rounded-md text-sm ${p.number === '...' ? 'cursor-default' : p.isCurrent ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100 border'}`}
            disabled={p.number === '...'}
          >
            {p.number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className='py-10 w-full flex flex-col items-center bg-gray-50 min-h-screen'>
      <div className='w-full max-w-7xl px-4 flex flex-col gap-4 mt-8'>
        <h1 className='text-3xl font-semibold text-center'>Admin Transactions</h1>
        <div className='bg-blue-600 text-white p-4 rounded-lg flex flex-wrap gap-3 items-center shadow-md'>
            <select name='type' value={filters.type} onChange={handleFilterChange} className='p-2 rounded text-black bg-white focus:outline-none'>
              <option value='all'>All Types</option>
              <option value='recharge'>Recharge</option>
              <option value='manual'>Manual Recharge</option>
              <option value='expense'>Expense</option>
              <option value='refund'>Refund</option>
              <option value='dispute_charge'>Dispute Charge</option>
              <option value='rto'>RTO Charge</option>
            </select>
            <input name='order_id' value={filters.order_id} onChange={handleFilterChange} placeholder='Order ID' className='p-2 rounded text-black bg-white flex-1 min-w-[150px] focus:outline-none'/>
            <input name='merchant_email' value={filters.merchant_email} onChange={handleFilterChange} placeholder='Merchant Email' className='p-2 rounded text-black bg-white flex-1 min-w-[200px] focus:outline-none'/>
            <input type='date' name='startDate' value={filters.startDate} onChange={handleFilterChange} className='p-2 rounded text-black bg-white focus:outline-none'/>
            <input type='date' name='endDate' value={filters.endDate} onChange={handleFilterChange} className='p-2 rounded text-black bg-white focus:outline-none'/>
            <IconButton onClick={handleDownload} sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } }}>
              <DownloadIcon />
            </IconButton>
        </div>
        <div style={{ width: '100%', background: 'white' }} className='rounded-xl border shadow-sm overflow-hidden'>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            loading={loading}
            paginationMode='server'
            rowCount={rowCount}
            hideFooterPagination
            rowHeight={80}
            disableRowSelectionOnClick
            sx={{
                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8fafc', fontWeight: 'bold' },
                '& .MuiDataGrid-cell': { borderBottom: '1px solid #f1f5f9' },
                border: 'none'
            }}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;
