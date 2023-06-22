import { Notification, ProfileMenu, SearchOptions } from '../types';

// images
import avatar1 from '../../assets/images/users/user-1.jpg';


// get the notifications
// const notifications: Notification[] = [
//     {
//         id: 4,
//         text: 'New user registered.',
//         subText: '5 hours ago',
//         icon: 'mdi mdi-account-plus',
//         bgColor: 'warning',
//     },
//     {
//         id: 5,
//         text: 'Caleb Flakelar commented on Admin',
//         subText: '1 min ago',
//         icon: 'mdi mdi-comment-account-outline',
//         bgColor: 'info',
//     },
//     {
//         id: 6,
//         text: 'Carlos Crouch liked Admin',
//         subText: '13 days ago',
//         icon: 'mdi mdi-heart',
//         bgColor: 'secondary',
//     },
// ];

// get the profilemenu
const profileMenus: ProfileMenu[] = [
    {
        label: 'My Account',
        icon: 'fe-user',
        redirectTo: '/apps/contacts/profile',
    },
    {
        label: 'Lock Screen',
        icon: 'fe-lock',
        redirectTo: '/auth/lock-screen',
    },
    {
        label: 'Logout',
        icon: 'fe-log-out',
        redirectTo: '/auth/logout',
    },
];

const searchOptions: SearchOptions[] = [
    { value: '1', label: 'Analytics Report', icon: 'fe-home', type: 'report' },
    {
        value: '2',
        label: 'How can I help you?',
        icon: 'fe-aperture',
        type: 'help',
    },
    {
        value: '3',
        label: 'User profile settings',
        icon: 'fe-settings',
        type: 'settings',
    },
];

export {  profileMenus, searchOptions };
