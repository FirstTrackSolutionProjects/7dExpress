
import { FaTachometerAlt, FaWallet, FaHistory, FaUsers, FaFileAlt, FaMoneyBillAlt, FaBox, FaDollyFlatbed, FaClipboardList, FaHouseUser, FaDoorOpen, FaUserCheck, FaAddressBook, FaRegAddressCard, FaMoneyBillWave, FaShieldAlt, FaTimes, FaChevronRight } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { MdSettings } from 'react-icons/md';
import VerificationRequests from "../Components/VerificationRequests"
import MerchantManage from '../Components/MerchantManage';
import AllInternationalParcels from '../Components/AllInternationalParcels';
import AllParcels from '../Components/AllParcels';
import AllShipmentReports from '../Components/AllShipmentReports';
import AllTransactions from '../Components/AllTransactions';
import ContactSubmissions from '../Components/ContactSubmissions';
import CreateOrder from '../Components/CreateOrder';
import ChangePassword from '../Components/ChangePassword';
import CreateOrderInternational from '../Components/CreateOrderInternational';
import InternationalReports from '../Components/InternationalReports';
import ManualRecharge from '../Components/ManualRecharge';
import NDR from '../Components/NDR';
import NonVerifiedMerchantManage from '../Components/NonVerifiedMerchantManage';
import Profile from '../Components/Profile';
import TransactionHistory from '../Components/TransactionHistory';
import UpdateOrder from '../Components/UpdateOrder';
import UpdateOrderInternational from '../Components/UpdateOrderInternational';
import Warehouse from '../Components/Warehouse';
import DashboardMain from '../Components/DashboardMain';
import UpdateProfileRequest from '../Components/UpdateProfileRequest';
import UpdateProfileRequestSubmissions from '../Components/UpdateProfileRequestSubmissions';
import WeightDisputes from '../Components/WeightDisputes';
import PendingCancellations from '../Components/PendingCancellations/PendingCancellations';
import PendingRefunds from '../Components/PendingRefunds/PendingRefunds';
import CodRemittanceMerchant from '../Components/CodRemittance/CodRemittanceMerchant';
import getCodRemittanceAdmin from '../Components/CodRemittance/CodRemittanceAdmin';
import Support from '../Pages/Support';
import TicketDetail from '../Pages/TicketDetail';
import AdminSupport from '../Pages/AdminSupport';
import AdminTicketDetail from '../Pages/AdminTicketDetail';
import AdminAnalytics from '../Pages/AdminAnalytics';

export const navItems = [
    {
        name : 'Home',
        url : '/'
    },
    {
        name : 'About',
        url : '/about'
    },
    {
        name : 'Tracking',
        url : '/track',
    },
    {
        name : 'Blogs',
        url : '/blog'
    },
    {
        name : 'Pricing',
        isDropdown : false,
        url : '/pricing',
        options : [{
            name : 'Domestic',
            url : '/domestic',
        },{
            name : 'International',
            url : '/international',
        }]
    },
    
   
    {
        name : 'Contact',
        url : '/contact'
    }
]


export const menuItems = [
    {
        icon : FaTachometerAlt,
        name : "Dashboard",
        isDropdown : false,
        url : '',
        component : DashboardMain,
        dropDownOptions : [{}]
    },
    {
        icon : FaWallet,
        name : "Wallet Recharge",
        isDropdown : false,
        url : 'wallet-recharge',
        dropDownOptions : [{}]
    },
    // {
    //     icon : FaWallet,
    //     name : "KYC Update",
    //     isDropdown : false,
    //     merchantOnly : true,
    //     url : 'kyc-update',
    //     component : "",
    //     dropDownOptions : [{}]
    // },
    {
        icon : FaBox,
        name : "Create Shipment",
        isDropdown : false,
        merchantOnly : true,
        url : 'order/create',
        component : CreateOrder,
        dropDownOptions : [{
            icon : FaBox,
            name : "Domestic",
            isDropdown : false,
            url : 'order/domestic/create',
            component : CreateOrder,
            dropDownOptions : [{}]
        },{
            icon : FaDollyFlatbed,
            name : "International",
            isDropdown : false,
            url : 'order/international/create',
            component : CreateOrderInternational,
            dropDownOptions : [{}]
        },]
    },
    {
        icon : FaHouseUser,
        name : "Warehouse",
        isDropdown : false,
        merchantOnly : true,
        url : 'warehouse',
        component : Warehouse,
        dropDownOptions : [{}]
    },
    {
        icon : FaDollyFlatbed,
        name : "Parcels",
        isDropdown : false,
        merchantOnly : true,
        url : 'parcels',
        component : UpdateOrder,
        dropDownOptions : [{
            icon : FaBox,
            name : "Domestic",
            isDropdown : false,
            url : 'parcels/domestic',
            component : UpdateOrder,
            dropDownOptions : [{}]
        },
        {
            icon : FaDollyFlatbed,
            name : "International",
            isDropdown : false,
            url : 'parcels/international',
            component : UpdateOrderInternational,
            dropDownOptions : [{}]
        },]
    },
    {
        icon : FaHistory,
        name : "Transaction History",
        isDropdown : false,
        url : 'transaction-history',
        component : TransactionHistory,
        dropDownOptions : [{}]
    },
    {
      icon : FaShieldAlt,
      name : "Weight Disputes",
      isDropdown : false,
      url : 'weight-disputes',
      component : WeightDisputes,
      dropDownOptions : [{}]
    },
    {
        icon : FaMoneyBillTransfer,
        name : "COD Remittance",
        isDropdown : false,
        admin : true,
        url : 'cod-remittance-manage',
        component : getCodRemittanceAdmin,
        dropDownOptions : [{}]
    },
    {
        icon : FaMoneyBillWave,
        name : "COD Remittance",
        isDropdown : false,
        merchantOnly : true,
        url : 'cod-remittance-history',
        component : CodRemittanceMerchant,
        dropDownOptions : [{}]
    },
    {
        icon : FaMoneyBillAlt,
        name : "Cancellations/Refunds",
        isDropdown : true,
        admin : true,
        // url : 'cancellations-refunds',
        // component : DashboardMain,
        dropDownOptions : [
            {
                icon : FaTimes,
                name : "Pending Cancellations",
                isDropdown : false,
                url : 'pending-cancellations',
                component : PendingCancellations,
                dropDownOptions : [{}]
            },
            {
                icon : FaMoneyBillAlt,
                name : "Pending Refunds",
                isDropdown : false,
                url : 'pending-refunds',
                component : PendingRefunds,
                dropDownOptions : [{}]
            }
        ]
    },
    {
        icon : FaClipboardList,
        name : "Reports",
        isDropdown : false,
        merchantOnly : true,
        url : 'shipment/reports',
        component : NDR,
        dropDownOptions : [{
            icon : FaClipboardList,
            name : "Domestic Reports",
            isDropdown : false,
            url : 'shipment/domestic/reports',
            component : NDR,
            dropDownOptions : [{}]
        },{
            icon : FaClipboardList,
            name : "International Reports",
            isDropdown : false,
            url : 'shipment/international/reports',
            component : InternationalReports,
            dropDownOptions : [{}]
        },]
    },
    {
        icon : FaUsers,
        name : "Merchant Manage",
        isDropdown : true,
        admin : true,
        url : 'manage/merchant',
        dropDownOptions : [{
            icon : FaUserCheck,
            name : "Verified Merchants",
            isDropdown : false,
            url : 'manage/merchant/verified',
            component : MerchantManage,
            dropDownOptions : [{}]
        },
        {
            icon : FaUsers,
            name : "Non-Verified Merchants",
            isDropdown : false,
            url : 'manage/merchant/non-verified',
            component : NonVerifiedMerchantManage,
            dropDownOptions : [{}]
        },
        {
            icon : FaHistory,
            name : "Merchant Transactions",
            isDropdown : false,
            url : 'manage/merchant/transactions',
            component : AllTransactions,
            dropDownOptions : [{}]
        },
        {
            icon : FaBox,
            name : "Shipments",
            isDropdown : false,
            url : 'manage/merchant/shipments',
            component : AllParcels,
            dropDownOptions : [{
                icon : FaBox,
                name : "Domestic",
                isDropdown : false,
                url : 'manage/merchant/shipments/domestic',
                component : AllParcels,
                dropDownOptions : [{}]
            },{
                icon : FaDollyFlatbed,
                name : "International",
                isDropdown : false,
                url : 'manage/merchant/shipments/international',
                component : AllInternationalParcels,
                dropDownOptions : [{}]
            },]
        },
        {
            icon : FaClipboardList,
            name : "Shipment Reports",
            isDropdown : false,
            url : 'manage/merchant/shipments/reports',
            component : AllShipmentReports,
            dropDownOptions : [{
                icon : FaClipboardList,
                name : "Domestic Reports",
                isDropdown : false,
                url : 'manage/merchant/shipments/domestic/reports',
                component : AllShipmentReports,
                dropDownOptions : [{}]
            },{
                icon : FaClipboardList,
                name : "International Reports",
                isDropdown : false,
                url : 'manage/merchant/shipments/international/reports',
                component : InternationalReports,
                dropDownOptions : [{}]
            },]
        },
        {
            icon : FaHouseUser,
            name : "Warehouses",
            isDropdown : false,
            url : 'manage/merchant/warehouses',
            component : Warehouse,
            dropDownOptions : [{}]
        }]
    },
    // {
    //     icon : "/logo.webp",
    //     name : "Users",
    //     admin : true,
    //     isDropdown : true,
    //     menuID : [10],
    //     dropDownOptions : [{
    //         icon : "/logo.webp",
    //         name : "Accounts",
    //         isDropdown : false,
    //         menuID : [10,0],
    //         dropDownOptions : [{}]
    //     },{
    //         icon : "/logo.webp",
    //         name : "Admin",
    //         isDropdown : false,
    //         menuID : [10,1],
    //         dropDownOptions : [{}]
    //     },]
    // },
    {
        icon : FaFileAlt,
        name : "Submission",
        isDropdown : true,
        admin : true,
        url : 'submissions',
        dropDownOptions : [{
            icon : FaUserCheck,
            name : "Merchant Verification",
            isDropdown : false,
            admin : true,
            url : 'submissions/merchant-verification',
            component : VerificationRequests,
            dropDownOptions : [{}]
        },
        {
            icon : FaRegAddressCard,
            name : "Update Profile Requests",
            isDropdown : false,
            admin : true,
            url : 'submissions/merchant-update-profile-requests',
            component : UpdateProfileRequestSubmissions,
            dropDownOptions : [{}]
        },
        {
            icon : FaAddressBook,
            name : "Contact Submission",
            isDropdown : false,
            admin : true,
            url : 'submissions/contact-submission',
            component : ContactSubmissions,
            dropDownOptions : [{}]
        },
        // {
        //     icon : "/logo.webp",
        //     name : "KYC Requests",
        //     isDropdown : false,
        //     admin : true,
        //     url : 'submissions/kyc-requests',
        //     component : "",
        //     dropDownOptions : [{}]
        // }
    ]
    },
    {
        icon : FaWallet,
        name : "Manual Recharge",
        isDropdown : false,
        admin : true,
        url : 'manual-recharge', // Corrected path to match component
        component : ManualRecharge,
        dropDownOptions : [{}]
    },
    {
        icon : FaClipboardList,
        name : "Support",
        isDropdown : true,
        admin : true,
        url : 'admin/support',
        dropDownOptions : [
            {
                icon : FaClipboardList,
                name : "Ticket Overview",
                isDropdown : false,
                url : 'admin/support',
                component : AdminSupport,
                dropDownOptions : [{}]
            },
            {
                icon : FaFileAlt,
                name : "Support Analytics",
                isDropdown : false,
                url : 'admin/support/analytics',
                component : AdminAnalytics,
                dropDownOptions : [{}]
            },
            {
                icon : FaClipboardList,
                name : "Ticket Detail",
                isDropdown : false,
                url : 'admin/support/:id',
                component : AdminTicketDetail,
                dropDownOptions : [{}],
                hidden: true
            }
        ]
    },
    {
        icon : FaClipboardList,
        name : "Support",
        isDropdown : false,
        merchantOnly : true,
        url : 'support',
        component : Support,
        dropDownOptions : [
            {
                icon : FaClipboardList,
                name : "Ticket Detail",
                isDropdown : false,
                url : 'support/:id',
                component : TicketDetail,
                dropDownOptions : [{}],
                hidden: true
            }
        ]
    },
    {
        icon : MdSettings,
        name : "Settings",
        isDropdown : true,
        url : 'settings',
        dropDownOptions : [
            {
                icon : MdSettings,
                name : "Profile",
                isDropdown : false,
                url : 'settings/profile',
                component : Profile,
                dropDownOptions : [{}]
            },
            {
                icon : MdSettings,
                name : "Profile Update",
                isDropdown : false,
                url : 'settings/profile-update-request',
                component : UpdateProfileRequest,
                merchantOnly : true,
                dropDownOptions : [{}]
            },
            {
                icon : MdSettings,
                name : "Change Password",
                isDropdown : false,
                url : 'settings/change-password',
                component : ChangePassword,
                dropDownOptions : [{}]
            },
        ]
    },
    {
        icon : FaDoorOpen,
        name : "Logout",
        isDropdown : false,
        url : 'logout', // This will be handled by App.jsx or Sidebar2.jsx
        dropDownOptions : [{}]
    },
  ]