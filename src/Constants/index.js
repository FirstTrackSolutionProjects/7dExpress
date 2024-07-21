
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
        icon : "images/logo1.png",
        name : "Dashboard",
        isDropdown : false,
        menuID : [0],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Wallet Recharge",
        isDropdown : false,
        menuID : [8],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Create Shipment",
        isDropdown : false,
        menuID : [1],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Warehouse",
        isDropdown : false,
        menuID : [2],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Parcels",
        isDropdown : false,
        menuID : [3],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Transaction History",
        isDropdown : false,
        menuID : [4],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Reports",
        isDropdown : false,
        menuID : [5],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Merchant Manage",
        isDropdown : true,
        admin : true,
        menuID : [9],
        dropDownOptions : [{
            icon : "images/logo1.png",
            name : "Verified Merchants",
            isDropdown : false,
            menuID : [9,0],
            dropDownOptions : [{}]
        },
        {
            icon : "images/logo1.png",
            name : "Non-Verified Merchants",
            isDropdown : false,
            menuID : [9,1],
            dropDownOptions : [{}]
        },
        {
            icon : "images/logo1.png",
            name : "Merchant Transactions",
            isDropdown : false,
            menuID : [9,2],
            dropDownOptions : [{}]
        },
        {
            icon : "images/logo1.png",
            name : "Unshipped Shipments",
            isDropdown : false,
            menuID : [9,3],
            dropDownOptions : [{}]
        },
        {
            icon : "images/logo1.png",
            name : "Shipment Reports",
            isDropdown : false,
            menuID : [9,4],
            dropDownOptions : [{}]
        }]
    },
    {
        icon : "images/logo1.png",
        name : "Users",
        admin : true,
        isDropdown : true,
        menuID : [10],
        dropDownOptions : [{
            icon : "images/logo1.png",
            name : "Accounts",
            isDropdown : false,
            menuID : [10,0],
            dropDownOptions : [{}]
        },{
            icon : "images/logo1.png",
            name : "Admin",
            isDropdown : false,
            menuID : [10,1],
            dropDownOptions : [{}]
        },]
    },
    {
        icon : "images/logo1.png",
        name : "Submission",
        isDropdown : true,
        admin : true,
        // menuID : [11],
        dropDownOptions : [{
            icon : "images/logo1.png",
            name : "Merchant Verification",
            isDropdown : false,
            admin : true,
            menuID : [11,0],
            dropDownOptions : [{}]
        },
        {
            icon : "images/logo1.png",
            name : "Contact Submission",
            isDropdown : false,
            admin : true,
            menuID : [11,1],
            dropDownOptions : [{}]
        },
        {
            icon : "images/logo1.png",
            name : "KYC Requests",
            isDropdown : false,
            admin : true,
            menuID : [11,2],
            dropDownOptions : [{}]
        }
    ]
    },
    {
        icon : "images/logo1.png",
        name : "Manual Recharge",
        isDropdown : false,
        admin : true,
        menuID : [12],
        dropDownOptions : [{}]
    },
    {
        icon : "images/logo1.png",
        name : "Settings",
        isDropdown : true,
        dropDownOptions : [
            {
                icon : "images/logo1.png",
                name : "Profile",
                isDropdown : false,
                menuID : [6,0],
                dropDownOptions : [{}]
            },
            {
                icon : "images/logo1.png",
                name : "Change Password",
                isDropdown : false,
                menuID : [6,1],
                dropDownOptions : [{}]
            },
        ]
    },
    {
        icon : "images/logo1.png",
        name : "Logout",
        isDropdown : false,
        menuID : [7],
        dropDownOptions : [{}]
    },



]