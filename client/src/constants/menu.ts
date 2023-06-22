export type MenuItemTypes = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
};

const MENU_ITEMS: MenuItemTypes[] = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        badge: { variant: 'success', text: '9+' },
        url: '/dashboard',
    },

    { key: 'apps', label: 'Apps', isTitle: true },
    {
        key: 'apps-screener',
        label: 'Screener',
        isTitle: false,
        icon: 'mdi mdi-calendar-blank-outline',
        url: '/apps/screener',
    },
    { key: 'market', label: 'Market', isTitle: true },
    {
        key: 'market',
        label: 'Market',
        isTitle: false,
        icon: 'mdi mdi-briefcase-outline',
        url: '/market',
    },
    {
        key: 'charts',
        label: 'Charts',
        isTitle: false,
        icon: 'mdi mdi-chart-donut-variant',
        children: [
            {
                key: 'market-apex',
                label: 'Apex Charts',
                url: '/market/apex',
                parentKey: 'market',
            },
            {
                key: 'market-chartjs',
                label: 'Chartjs',
                url: '/market/chartjs',
                parentKey: 'market',
            },
        ],
    },
    { key: 'watchlist', label: 'Watchlist', isTitle: true },
    {
        key: 'watchlist',
        label: 'Watchlist',
        isTitle: false,
        icon: 'mdi mdi-gift-outline',
        url: '/watchlist',
    },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard',
        url: '/dashboard',
    },
    {
        key: 'watchlist',
        icon: 'mdi mdi-invert-colors',
        label: 'Watchlist',
        isTitle: false,
        url: '/watchlist',
    },
    {
        key: 'apps',
        icon: 'fe-grid',
        label: 'Apps',
        isTitle: true,
        children: [
            {
                key: 'apps-screener',
                label: 'Screener',
                isTitle: false,
                url: '/apps/screener',
                parentKey: 'apps',
            },
        ],
    },
    {
        key: 'market',
        icon: 'mdi mdi-lifebuoy',
        label: 'Market',
        isTitle: true,
        children: [
            {
                key: 'charts',
                label: 'Charts',
                isTitle: false,
                parentKey: 'market',
                children: [
                    {
                        key: 'chart-apex',
                        label: 'Apex Charts',
                        url: '/market/apex',
                        parentKey: 'market',
                    },
                    {
                        key: 'chart-chartjs',
                        label: 'Chartjs',
                        url: '/market/chartjs',
                        parentKey: 'market',
                    },
                ],
            },
        ],
    },
];

export { MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
