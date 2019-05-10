let nav = [
    {
        title: 'dashboard',
        icon: 'dashboard',
        to: '/'
    },
    {
        title: '模拟入库',
        icon: 'open_in_browser',
        to: '/entry_car'
    },
    {
        title: '停车场',
        icon: 'directions_car',
        active: false,
        children: [
            {
                title: '停车记录',
                to: '/park'
            },
            {
                title: '设置',
                to: '/park_setting'
            }
        ]
    },
    {
        title: '账号信息',
        icon: 'account_circle',
        to: '/account'
    }
];

export default nav;
