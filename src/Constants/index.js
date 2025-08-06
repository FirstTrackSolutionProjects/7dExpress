
import { FaTachometerAlt, FaWallet, FaHistory, FaUsers,FaFileAlt,FaMoneyBillAlt, FaChevronDown, FaChevronUp, FaBars, FaTimes, FaBox, FaDollyFlatbed, FaClipboardList, FaHouseUser, FaDoorOpen } from 'react-icons/fa';
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
            icon : "/logo.webp",
            name : "Domestic",
            isDropdown : false,
            url : 'order/domestic/create',
            component : CreateOrder,
            dropDownOptions : [{}]
        },{
            icon : "/logo.webp",
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
            icon : "/logo.webp",
            name : "Domestic",
            isDropdown : false,
            url : 'parcels/domestic',
            component : UpdateOrder,
            dropDownOptions : [{}]
        },
        {
            icon : "/logo.webp",
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
      icon : "/logo.webp",
      name : "Weight Disputes",
      isDropdown : false,
      url : 'weight-disputes',
      component : WeightDisputes,
      dropDownOptions : [{}]
    },
    {
        icon : FaClipboardList,
        name : "Reports",
        isDropdown : false,
        merchantOnly : true,
        url : 'shipment/reports',
        component : NDR,
        dropDownOptions : [{
            icon : "/logo.webp",
            name : "Domestic Reports",
            isDropdown : false,
            url : 'shipment/domestic/reports',
            component : NDR,
            dropDownOptions : [{}]
        },{
            icon : "/logo.webp",
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
            icon : "/logo.webp",
            name : "Verified Merchants",
            isDropdown : false,
            url : 'manage/merchant/verified',
            component : MerchantManage,
            dropDownOptions : [{}]
        },
        {
            icon : "/logo.webp",
            name : "Non-Verified Merchants",
            isDropdown : false,
            url : 'manage/merchant/non-verified',
            component : NonVerifiedMerchantManage,
            dropDownOptions : [{}]
        },
        {
            icon : "/logo.webp",
            name : "Merchant Transactions",
            isDropdown : false,
            url : 'manage/merchant/transactions',
            component : AllTransactions,
            dropDownOptions : [{}]
        },
        {
            icon : "/logo.webp",
            name : "Shipments",
            isDropdown : false,
            url : 'manage/merchant/shipments',
            component : AllParcels,
            dropDownOptions : [{
                icon : "/logo.webp",
                name : "Domestic",
                isDropdown : false,
                url : 'manage/merchant/shipments/domestic',
                component : AllParcels,
                dropDownOptions : [{}]
            },{
                icon : "/logo.webp",
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
                icon : "/logo.webp",
                name : "Domestic Reports",
                isDropdown : false,
                url : 'manage/merchant/shipments/domestic/reports',
                component : AllShipmentReports,
                dropDownOptions : [{}]
            },{
                icon : "/logo.webp",
                name : "International Reports",
                isDropdown : false,
                url : 'manage/merchant/shipments/international/reports',
                component : InternationalReports,
                dropDownOptions : [{}]
            },]
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
            icon : "/logo.webp",
            name : "Merchant Verification",
            isDropdown : false,
            admin : true,
            url : 'submissions/merchant-verification',
            component : VerificationRequests,
            dropDownOptions : [{}]
        },
        {
            icon : "/logo.webp",
            name : "Update Profile Requests",
            isDropdown : false,
            admin : true,
            url : 'submissions/merchant-update-profile-requests',
            component : UpdateProfileRequestSubmissions,
            dropDownOptions : [{}]
        },
        {
            icon : "/logo.webp",
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
        url : 'manual-recharge',
        component : ManualRecharge,
        dropDownOptions : [{}]
    },
    {
        icon : MdSettings,
        name : "Settings",
        isDropdown : true,
        url : 'settings',
        dropDownOptions : [
            {
                icon : "/logo.webp",
                name : "Profile",
                isDropdown : false,
                url : 'settings/profile',
                component : Profile,
                dropDownOptions : [{}]
            },
            {
                icon : "/logo.webp",
                name : "Profile Update",
                isDropdown : false,
                url : 'settings/profile-update-request',
                component : UpdateProfileRequest,
                merchantOnly : true,
                dropDownOptions : [{}]
            },
            {
                icon : "/logo.webp",
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
        url : 'logout',
        dropDownOptions : [{}]
    },
  ]