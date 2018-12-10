export let config = {
    odoo: {
        authenUrl: '/web/session/authenticate',
        versionInfo: '/web/webclient/version_info',
        sessionInfo: '/web/session/get_session_info',
        getList: '/web/database/get_list',
        searchRead: '/web/dataset/search_read',
        callKW: '/web/dataset/call_kw',
        getDBList: '/web/database/list',
    },
    application: {
        APP_NAME: "PNEWS",
        STATUS_COLOR: "#8E24AA",
        FACEBOOK_API_URL: "https://graph.facebook.com/v3.1",
        FACEBOOK_ID: "1926025767450787",
        NAVIGATION_TRANSITION: {
            name: "fade",
            duration: 400
        }
    }
};
