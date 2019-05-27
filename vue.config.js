const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    assetsDir: 'static/',
    crossorigin: 'anonymous',

    devServer: {
        open: true,
    },


    css: {
        loaderOptions: {
            sass: {
                data: `@import '@/assets/sass/abstracts/_abstracts.sass'`,
            },
        },
    },

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa#configuration
    pwa: {
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppStatusBarStyle: 'default',
        // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'service-worker.js',
        },
    },
    chainWebpack: config => {
        // config.entry('service-worker')
        //     .add('./src/service-worker.ts')
        //     .end()

        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader')

        // @see https://www.npmjs.com/package/vue-svg-inline-loader
        config.module
            .rule('vue')
            .use('vue-svg-inline-loader')
            .loader('vue-svg-inline-loader')
            .options({
                inline: {
                    keyword: 'inline',
                    strict: true,
                },
                svgo: true,
            })
    },

    pluginOptions: {
        svgSprite: {
            dir: 'src/assets/img/svg-sprite',
            test: /\.(svg)(\?.*)?$/,
            loaderOptions: {
                extract: true,
                spriteFilename: 'static/img/svg-sprite.[hash:8].svg',
            },
            pluginOptions: {
                plainSprite: true,
            },
        },
        lintStyleOnBuild: true,
    },

    configureWebpack: {
        plugins: [
            new StyleLintPlugin({
                fix: false,
                files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            }),
        ],
    },
}
