// hooks
import { usePageTitle } from '../../hooks';






const Watchlist = () => {
    // set pagetitle
    usePageTitle({
        title: 'Wathlist',
        breadCrumbItems: [
            {
                path: '/watchlist',
                label: 'Watchlist',
                active: true,
            },
        ],
    });

    return (
        <>
            
        </>
    );
};

export default Watchlist;
