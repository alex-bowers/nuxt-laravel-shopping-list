const env = require('dotenv').config()

module.exports = {
    mode: 'universal',

    /*
    ** Customize the progress-bar color
    */
   env: env.parsed,

    /*
    ** Headers of the page
    */
    head: {
        htmlAttrs: {
            lang: 'en'
        },
        title: process.env.TITLE || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.DESCRIPTION || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /*
    ** Global CSS
    */
    css: [
        '@/assets/sass/main.scss'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~plugins/mixins/user.js'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/auth',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc: https://github.com/nuxt-community/style-resources-module
        '@nuxtjs/style-resources'
    ],
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.API_LINK,
        auth: {
            strategies: {
                local: {
                    endpoints: {
                        login: { url: 'login', method: 'post', propertyName: 'token' },
                        user: { url: 'user', method: 'get', propertyName: false },
                        logout: { url: 'logout', method: 'post' }
                    },
                }
            },
        }
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    },

    styleResources: {
        scss: [
            './assets/sass/main.scss',
        ]
    }
}
