
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Dashboard = {
    text: 'Dashboard',
    link: '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            text: 'Dashbord Portfolio',
            link: '/dashboard/v1'
        },
        {
            text: 'Dashbord Activity',
            link: '/dashboard/v2'
        },
        {
            text: 'Dashbord Letters',
            link: '/dashboard/v3'
        }
    ]
};

const Letters = {
    text: 'Leters',
    link: '/letters',
    icon: 'icon-note',
    label: {
        value: '2',
        classname: 'badge bg-success'
    },
    submenu: [
        {
            text: 'Settings',
            link: '/letters/settings'
        },
        {
            text: 'Guarantors',
            link: '/guarantors',
            submenu: [
                {
                    text: 'list',
                    link: '/guarantors/list'
                },
                {
                    text: 'New',
                    link: '/guarantors/newguarantor'
                }
            ]
        },
        {
            text: 'Demand Letters',
            link: '/demand',
            submenu: [
                {
                    text: 'Letters Due',
                    link: '/demand/demands'
                },
                {
                    text: 'Sent History',
                    link: '/demand/demandhistory'
                },
                /*{
                    text: 'Pre Listing',
                    link: '/demand/prelisting'
                },
                {
                    text: 'Post Listing',
                    link: '/demand/postlisting'
                },
                {
                    text: '40 Day',
                    link: '/demand/day40'
                },
                {
                    text: '90 Day',
                    link: '/demand/day90'
                }*/
            ]
        }
    ]
};

const Administration = {
    text: 'Administration',
    link: '/admin',
    icon: 'icon-settings',
    submenu: [
        {
            text: 'Users',
            link: '/users/search'
        },
        {
            text: 'Roles',
            link: '/users/roles'
        },
        {
            text: 'Approvals',
            link: '/users/approvals'
        }
    ]
};

const Elements = {
    text: 'Elements',
    link: '/elements',
    icon: 'icon-chemistry',
    submenu: [
        {
            text: 'Buttons',
            link: '/elements/buttons'
        },
        {
            text: 'Interaction',
            link: '/elements/interaction'
        },
        {
            text: 'Notification',
            link: '/elements/notification'
        },
        {
            text: 'SweetAlert',
            link: '/elements/sweetalert'
        },
        {
            text: 'Spinners',
            link: '/elements/spinners'
        },
        {
            text: 'Dropdown',
            link: '/elements/dropdown'
        },
        {
            text: 'Nav Tree',
            link: '/elements/navtree'
        },
        {
            text: 'Sortable',
            link: '/elements/sortable'
        },
        {
            text: 'Grid',
            link: '/elements/grid'
        },
        {
            text: 'Grid Masonry',
            link: '/elements/gridmasonry'
        },
        {
            text: 'Typography',
            link: '/elements/typography'
        },
        {
            text: 'Font Icons',
            link: '/elements/iconsfont'
        },
        {
            text: 'Weahter Icons',
            link: '/elements/iconsweather'
        },
        {
            text: 'Colors',
            link: '/elements/colors'
        },
        {
            text: 'Infinite Scroll',
            link: '/elements/infinitescroll'
        }
    ]
};

const Forms = {
    text: 'Forms',
    link: '/forms',
    icon: 'icon-note',
    submenu: [
        {
            text: 'Standard',
            link: '/forms/standard'
        },
        {
            text: 'Extended',
            link: '/forms/extended'
        },
        {
            text: 'Validation',
            link: '/forms/validation'
        },
        {
            text: 'Upload',
            link: '/forms/upload'
        },
        {
            text: 'Image Crop',
            link: '/forms/cropper'
        }
    ]
};

const Charts = {
    text: 'Charts',
    link: '/charts',
    icon: 'icon-graph',
    submenu: [
        {
            text: 'Flot',
            link: '/charts/flot'
        },
        {
            text: 'Radial',
            link: '/charts/radial'
        },
        {
            text: 'ChartJS',
            link: '/charts/chartjs'
        }
    ]
};

const Tables = {
    text: 'Tables',
    link: '/tables',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Standard',
            link: '/tables/standard'
        },
        {
            text: 'Extended',
            link: '/tables/extended'
        },
        {
            text: 'Data-Tables',
            link: '/tables/datatable'
        },
        {
            text: 'Angular Grid',
            link: '/tables/aggrid'
        },
        {
            text: 'NGxDatatables',
            link: '/tables/ngxdatatable'
        }
    ]
};

const Collectionrpt = {
    text: 'Collection Reports',
    link: '/collectionrpts',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Standard',
            link: '/tables/standard'
        },
        {
            text: 'Extended',
            link: '/tables/extended'
        },
        {
            text: 'Data-Tables',
            link: '/tables/datatable'
        },
        {
            text: 'Angular Grid',
            link: '/tables/aggrid'
        },
        {
            text: 'NGxDatatables',
            link: '/tables/ngxdatatable'
        }
    ]
};

const Remedialrpts = {
    text: 'Remedial Reports',
    link: '/remedialrpts',
    icon: 'icon-graph',
    submenu: [
        {
            text: 'Unactioned report',
            link: '/remedialrpts/unactionedrpt'
        },
        {
            text: 'New File Analysis',
            link: '/remedialrpts/newfileanalysis'
        },
        {
            text: 'Portfolio Movement',
            link: '/remedialrpts/portfoliomvt'
        },
        {
            text: 'Relegation Analysis',
            link: '/remedialrpts/relegationanalysis'
        },
        {
            text: 'Invoices',
            link: '/remedialrpts/invoices'
        },
        {
            text: 'Portfolio movement cc',
            link: '/remedialrpts/portfoliomvt'
        },
        {
            text: 'Relegation analysis cc',
            link: '/remedialrpts/relegationanalysis'
        }
    ]
};

const Maps = {
    text: 'Maps',
    link: '/maps',
    icon: 'icon-map',
    submenu: [
        {
            text: 'Google',
            link: '/maps/google'
        },
        {
            text: 'Vector',
            link: '/maps/vector'
        }
    ]
};

const Pages = {
    text: 'Pages',
    link: '/pages',
    icon: 'icon-doc',
    submenu: [
        {
            text: 'Login',
            link: '/login'
        },
        {
            text: 'Register',
            link: '/register'
        },
        {
            text: 'Recover',
            link: '/recover'
        },
        {
            text: 'Lock',
            link: '/lock'
        },
        {
            text: '404',
            link: '/404'
        },
        {
            text: '500',
            link: '/500'
        },
        {
            text: 'Maintenance',
            link: '/maintenance'
        }
    ]
};

const Blog = {
    text: 'Blog',
    link: '/blog',
    icon: 'icon-notebook',
    submenu: [
        {
            text: 'List',
            link: '/blog/list'
        },
        {
            text: 'Post',
            link: '/blog/post'
        },
        {
            text: 'Articles',
            link: '/blog/articles'
        },
        {
            text: 'Article View',
            link: '/blog/articleview'
        }
    ]
};

const Work = {
    text: 'Work Queue',
    link: '/work',
    icon: 'icon-briefcase',
    submenu: [
        {
            text: 'View all',
            link: '/work/viewall'
        },
        {
            text: 'My allocations',
            link: '/work/myallocations'
        },
        {
            text: 'Todays',
            link: '/work/todays'
        },
        {
            text: 'Pre Delinquent',
            link: '/work/predelinquent'
        },
        {
            text: 'New to arrears',
            link: '/work/newtoarrears'
        },
        {
            text: 'PTP Due',
            link: '/work/ptps'
        },
        {
            text: 'With funds',
            link: '/work/withfunds'
        }
    ]
};

const Ecommerce = {
    text: 'Ecommerce',
    link: '/ecommerce',
    icon: 'icon-basket-loaded',
    submenu: [
        {
            text: 'Orders',
            link: '/ecommerce/orders'
        },
        {
            text: 'Order View',
            link: '/ecommerce/orderview'
        },
        {
            text: 'Products',
            link: '/ecommerce/products'
        },
        {
            text: 'Product View',
            link: '/ecommerce/productview'
        },
        {
            text: 'Checkout',
            link: '/ecommerce/checkout'
        }
    ]
};

const Extras = {
    text: 'Extras',
    link: '/extras',
    icon: 'icon-cup',
    submenu: [
        {
            text: 'Contacts',
            link: '/extras/contacts'
        },
        {
            text: 'Contact details',
            link: '/extras/contactdetails'
        },
        {
            text: 'Projects',
            link: '/extras/projects'
        },
        {
            text: 'Projects details',
            link: '/extras/projectsdetails'
        },
        {
            text: 'Team Viewer',
            link: '/extras/teamviewer'
        },
        {
            text: 'Social Board',
            link: '/extras/socialboard'
        },
        {
            text: 'Vote links',
            link: '/extras/votelinks'
        },
        {
            text: 'Bug tracker',
            link: '/extras/bugtracker'
        },
        {
            text: 'Faq',
            link: '/extras/faq'
        },
        {
            text: 'Help center',
            link: '/extras/helpcenter'
        },
        {
            text: 'Followers',
            link: '/extras/followers'
        },
        {
            text: 'Settings',
            link: '/extras/settings'
        },
        {
            text: 'Plans',
            link: '/extras/plans'
        },
        {
            text: 'File manager',
            link: '/extras/filemanager'
        },
        {
            text: 'Forum',
            link: '/extras/forum'
        },
        {
            text: 'Mailbox',
            link: '/extras/mailbox'
        },
        {
            text: 'Timeline',
            link: '/extras/timeline'
        },
        {
            text: 'Calendar',
            link: '/extras/calendar'
        },
        {
            text: 'Invoice',
            link: '/extras/invoice'
        },
        {
            text: 'Search',
            link: '/extras/search'
        },
        {
            text: 'Todo list',
            link: '/extras/todolist'
        },
        {
            text: 'Profile',
            link: '/extras/profile'
        },
        {
            text: 'Code editor',
            link: '/extras/codeeditor'
        }
    ]
};


const headingMain = {
    text: 'Main Navigation',
    heading: true
};

const headingComponents = {
    text: 'Work Queue',
    heading: true
};

const headingMore = {
    text: 'Reports',
    heading: true
};

// user permissions
// const userperm = JSON.parse(localStorage.getItem('userpermission'));
// console.log('menu', userperm[0].attr);

// this.menuitems = '';

const user_mgmt_menu = [
    headingMain,
    Home,
    // Dashboard,
    Administration,
    // Letters,
    // headingComponents,
    // Work,
    // Pages,
   /* Elements,
    Forms,
    Charts,
    Blog,
    Maps,*/
    headingMore,
    Collectionrpt,
    Remedialrpts
    // Tables,
   // Ecommerce,
   // Extras
];

export const user_mgmt = user_mgmt_menu;