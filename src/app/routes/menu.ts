
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
        }
    ]
};

const DashboardAdmin = {
    text: 'Dashboard',
    link: '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            text: 'Performance Metrics',
            link: '/dashboard/v3'
        }
    ]
};

const Letters = {
    text: 'Letters',
    link: '/letters',
    icon: 'icon-note',
    submenu: [
        /*{
            text: 'Settings',
            link: '/letters/settings'
        },*/
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
    ],
    'alert': '23',
    'label': 'badge badge-warning'
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
        },
        {
            text: 'Branches',
            link: '/users/branches'
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
            text: 'Reports',
            link: '/reports/allreports'
        },
        {
            text: 'Dashboards',
            link: '/reports/dashboards'
        }
    ]
};

const Remedialrpts = {
    text: 'Remedial Reports',
    link: '/collectionrpts',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Unactioned report',
            link: '/tables/standard'
        },
        {
            text: 'New File Analysis',
            link: '/tables/extended'
        },
        {
            text: 'Portfolio Movement',
            link: '/tables/datatable'
        },
        {
            text: 'Relegation Analysis',
            link: '/tables/aggrid'
        },
        {
            text: 'Relegation analysis cc',
            link: '/tables/ngxdatatable'
        },
        {
            text: 'Portfolio movement cc',
            link: '/tables/aggrid'
        },
        {
            text: 'Invoices',
            link: '/tables/ngxdatatable'
        },
        {
            text: 'More',
            link: '/tables/ngxdatatable',
            submenu: [
                {
                    text: 'Unactioned report',
                    link: '/tables/standard'
                }
            ]
        }
    ]
};

const Remedialrpt = {
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
            link: '/work/viewall',
            'alert': '23',
            'label': 'badge badge-warning'
        },
        {
            text: 'My allocations',
            link: '/work/myallocations'
        },
        {
            text: 'My worklist',
            link: '/work/myworklist'
        },
        {
            text: 'Todays',
            link: '/work/todays'
        },
        {
            text: 'Pre Delinquent',
            link: '/work/predelq'
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

const Work_cc = {
    text: 'Work Queue',
    link: '/creditcards',
    icon: 'icon-credit-card',
    submenu: [
        {
            text: 'View all',
            link: '/creditcards/viewall',
            'alert': '23',
            'label': 'badge badge-warning'
        },
        {
            text: 'My allocations',
            link: '/creditcards/myallocations'
        },
        {
            text: 'My Worklist',
            link: '/creditcards/myworklist'
        },
        {
            text: 'View all cards',
            link: '/creditcards/allcards'
        },
        {
            text: 'Cards Cr/Zero Bal',
            link: '/creditcards/zerobalance'
        },
        {
            text: 'View all loans',
            link: '/creditcards/loans'
        }
        ,
        {
            text: 'Demand Letters',
            link: '/creditcards/creditcarddemands',
            icon: 'icon-note',
            submenu: [
                {
                    text: 'Demands due',
                    link: '/creditcards/creditcarddemands/demandsdue'
                },
                {
                    text: 'Demands history',
                    link: '/creditcards/creditcarddemands/demandshistory'
                }
            ]
        },
        {
            text: 'Reports Credit cards',
            link: '/creditcards/reports',
            icon: 'icon-chart',
            submenu: [
                {
                    text: 'Collector activity',
                    link: '/creditcards/reports/activity'
                },
                {
                    text: 'Daily notes',
                    link: '/creditcards/reports/dailynotes'
                },
                {
                    text: 'bulk notes',
                    link: '/creditcards/reports/bulknotes'
                },
                {
                    text: 'Amount collected',
                    link: '/creditcards/reports/amntcollected'
                },
                {
                    text: 'Allocation summary',
                    link: '/creditcards/reports/allocation summary'
                },
                {
                    text: 'Overdue report',
                    link: '/creditcards/reports/overduereportcc'
                }
            ]
        }
    ]
};

const Remedial = {
    text: 'Remedial',
    link: '/remedial',
    icon: 'icon-equalizer',
    submenu: [
        {
            text: 'View all',
            link: '/work/viewall',
            'alert': '23',
            'label': 'badge badge-warning'
        },
        {
            text: 'My allocations',
            link: '/work/myallocations'
        },
        {
            text: 'My worklist',
            link: '/work/myworklist'
        },
        {
            text: 'Todays',
            link: '/work/todays'
        },
        {
            text: 'Pre Delinquent',
            link: '/work/predelq'
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

const serviceproviders = {
    text: 'Service Providers',
    link: '/serviceproviders',
    icon: 'icon-drawer',
    submenu: [
        {
            text: 'List',
            link: '/blog/list'
        },
        {
            text: 'Post',
            link: '/blog/post'
        }
    ]
};

const mcoopcash = {
    text: 'M-Coop Cash',
    link: '/mcoopcash',
    icon: 'icon-wallet',
    submenu: [
        {
            text: 'List',
            link: '/blog/list'
        },
        {
            text: 'Post',
            link: '/blog/post'
        }
    ]
};

const Demandletters = {
    text: 'Demand Letters',
    link: '/letters/settings',
    icon: 'icon-envelope-letter'
};

const Allocations = {
    text: 'Account allocations',
    link: '/configurations/allocations',
    icon: 'icon-people'
};

const SMS = {
    text: 'SMS',
    link: '/configurations/sms',
    icon: 'icon-note'
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

const headingConfigurations = {
    text: 'Configurations',
    heading: true
};

// user permissions
const userperm = JSON.parse(localStorage.getItem('userpermission'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// console.log('menu', userperm);
// console.log('currentUser', currentUser);

let menuitems = [];

const user_mgmt_menu = [
    headingMain,
    Home,
    DashboardAdmin,
    Administration
];

const collection_menu = [
    headingMain,
    Home,
    Dashboard,
    Letters,
    headingComponents,
    Work,
    Remedial,
    mcoopcash,
    serviceproviders,
    headingMore,
    Collectionrpt,
    headingConfigurations,
    Demandletters,
    Allocations,
    SMS
];

const creditcards_menu = [
    headingMain,
    Home,
    Dashboard,
    headingComponents,
    Work_cc
];

const remedial_menu = [
    headingMain,
    Home,
    Dashboard,
    Letters,
    headingComponents,
    Work,
    headingMore,
    Collectionrpt
];

const teamleader_menu = [
    headingMain,
    Home,
    Dashboard,
    Letters,
    headingComponents,
    Work,
    headingMore,
    Collectionrpt,
    headingConfigurations,
    Demandletters,
    Allocations,
    SMS
];
// console.log('menu role==>', currentUser.role);
if (currentUser !== null) {
    if (currentUser.role === 'admin' ) {
        menuitems = user_mgmt_menu;
    } else if (currentUser.role === 'remedial') {
        menuitems = remedial_menu;
    } else if (currentUser.role === 'creditcards') {
        menuitems = creditcards_menu;
    } else if (currentUser.role === 'teamleader') {
        menuitems = teamleader_menu;
    } else {
        menuitems = collection_menu;
    }
} else {
    menuitems = collection_menu;
}


export const menu = menuitems;
