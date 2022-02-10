export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'collapse',
                    icon: 'feather icon-home',
                    children: [
                        {
                            id: 'default',
                            title: 'Default',
                            type: 'item',
                            url: '/dashboard/default'
                        },
                       
                    ]
                },
                {
                    id: 'gode',
                    title: 'Gods & Goddess',
                    type: 'collapse',
                    icon: 'feather icon-layers',
                    children: [
                        {
                            id: 'add-dieties',
                            title: 'Add Dieties',
                            type: 'item',
                            url: '/admin/add-dieties'
                        },
                        {
                            id: 'list-dieties',
                            title: 'List Dieties',
                            type: 'item',
                            url: '/admin/list-dieties'
                        },
                        {
                            id: 'list-disable',
                            title: 'List Disable',
                            type: 'item',
                            url: '/admin/list-disable',
                            
                        }
                    ]
                },
                {
                    id: 'temple',
                    title: 'Temple Categories',
                    type: 'collapse',
                    icon: 'feather icon-layers',
                    children: [
                        {
                            id: 'temple-categories',
                            title: 'Add Categories',
                            type: 'item',
                            url: '/admin/add-categories'
                        },
                    ]
                },
                {
                    id: 'pilgrimage-centres',
                    title: 'Pilgrimage Centres',
                    type: 'collapse',
                    icon: 'feather icon-layers',
                    children: [
                        {
                            id: 'pilgrimage-centres',
                            title: 'Add Pilgrimage',
                            type: 'item',
                            url: '/admin/add-pilgrimage'
                        },
                    ]
                },

                {
                    id: 'add-temple',
                    title: 'Temple',
                    type: 'collapse',
                    icon: 'feather icon-layers',
                    children: [
                        {
                            id: 'add-temple',
                            title: 'Add Temple',
                            type: 'item',
                            url: '/admin/add-temple'
                        },
                    ]
                },
                
            ]
        },

        
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'club',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'collapse',
                    icon: 'feather icon-home',
                    children: [
                        {
                            id: 'default',
                            title: 'Default',
                            type: 'item',
                            url: '/dashboard/club'
                        },
                       
                    ]
                },
                {
                    id: 'member',
                    title: 'Member',
                    type: 'collapse',
                    icon: 'feather icon-users',
                    children: [
                        {
                            id: 'add-member',
                            title: 'Add Member',
                            type: 'item',
                            url: '/member/add-member',
                            breadcrumbs: false
                        },
                        {
                            id: 'approved-member',
                            title: 'Approved Member',
                            type: 'item',
                            url: '/member/approved-member'
                        },
                        {
                            id: 'bulk-upload',
                            title: 'Bulk Upload',
                            type: 'item',
                            url: '/member/bulk-upload'
                        },
                        {
                            id: 'member-credentials',
                            title: 'Member Credentials',
                            type: 'item',
                            url: '/member/member-credentials'
                        },
                        {
                            id: 'membership',
                            title: 'Membership',
                            type: 'item',
                            url: '/member/membership'
                        }
                    ]
                },
                
            ]
        },


       
{
    id: 'navigation',
    title: 'Navigation',
    type: 'homepage',
    icon: 'icon-navigation',
    children: [
        {
            id: 'temple',
            title: 'Temple',
            type: 'collapse',
            icon: 'feather icon-home',
            breadcrumbs: false,
            children: [
                {
                    id: 'pouranic',
                    title: 'Pouranic',
                    type: 'collapse',
                    // url: '/pouranic'
                    children: [
                        {
                            id: 'vaishnavism',
                            title: 'Vaishnavism',
                            type: 'item',
                            url: 'temples/pouranic',
                            target: true,
                        },
                        {
                            id: 'shaivism',
                            title: 'Shaivism',
                            type: 'item',
                            url: 'temples/shaivism',
                            target: true,
                        },
                        {
                            id: 'shaktism',
                            title: 'Shaktism',
                            type: 'item',
                            url: 'temples/shaktism',
                            target: true,
                        },
                        {
                            id: 'smartism',
                            title: 'Smartism',
                            type: 'item',
                            url: 'temples/smartism',
                            target: true,
                        }
                    ]
                },
                {
                    id: 'prachin',
                    title: 'Prachin',
                    type: 'collapse',
                    //url: '/prachin',
                    children: [
                        {
                            id: 'vaishnavism',
                            title: 'Vaishnavism',
                            type: 'item',
                            url: 'temples/pouranic',
                            target: true,
                        },
                        {
                            id: 'shaivism',
                            title: 'Shaivism',
                            type: 'item',
                            url: 'temple/shaivism',
                            target: true,
                        },
                        {
                            id: 'shaktism',
                            title: 'Shaktism',
                            type: 'item',
                            url: 'temples/shaktism',
                            target: true,
                        },
                        {
                            id: 'smartism',
                            title: 'Smartism',
                            type: 'item',
                            url: 'temples/smartism',
                            target: true,
                        }
                    ]
                },
                {
                    id: 'akhada',
                    title: 'Akhada',
                    type: 'collapse',
                    //url: '/akhada',
                    children: [
                        {
                            id: 'Shaiva (Dashanami) Akhadas ',
                            title: 'Shaiva (Dashanami) Akhadas ',
                            type: 'collapse',
                            url: 'akhada/shaiva',

                            children: [
                                {
                                    id: 'maha nirvani ',
                                    title: 'Maha Nirvani ',
                                    type: 'item',
                                    url: 'shaivaakhadas/mahanirvani',
                                   
                                },
                                {
                                    id: 'atal ',
                                    title: 'Atal ',
                                    type: 'item',
                                    url: 'shaivaakhadas/atal',
                                  
                                },
                                {
                                    id: 'niranjani  ',
                                    title: 'Niranjani  ',
                                    type: 'item',
                                    url: 'shaivaakhadas/niranjani',
                                   
                                },
                                {
                                    id: 'avahan ',
                                    title: 'Avahan ',
                                    type: 'item',
                                    url: 'shaivaakhadas/avahan',
                                  
                                },
                                {
                                    id: 'agni  ',
                                    title: 'Agni  ',
                                    type: 'item',
                                    url: 'shaivaakhadas/agni',
                                    
                                }
                                
                            ]
                           
                        },
                        {
                            id: 'Sects of Shaivism ',
                            title: 'Sects of Shaivism ',
                            type: 'item',
                            url: 'akhada/sects',
                          
                        },
                        {
                            id: 'Vaishnav Akhadas  ',
                            title: 'Vaishnav Akhadas  ',
                            type: 'item',
                            url: 'akhadas/vaishnav',
                           
                        },
                        {
                            id: 'Vaishnav sect ',
                            title: 'Vaishnav sect ',
                            type: 'item',
                            url: 'akhadas/vaishnav',
                          
                        },
                        {
                            id: 'Udasin Akhadas  ',
                            title: 'Udasin Akhadas  ',
                            type: 'item',
                            url: 'akhadas/udasin',
                            
                        }
                        
                    ]
                },
                {
                    id: 'local',
                    title: 'Local',
                    type: 'item',
                    url: 'temples/local',
                },
                {
                    id: 'private',
                    title: 'Private',
                    type: 'item',
                    url: 'temples/private',
                }
               
            ]
        },
      
    ]
}














    ]
}