const CompressionPlugin = require('compression-webpack-plugin');
const isProd = process.env.NODE_ENV !== 'development';

/**
 * 获取对应的 CDN 资源
 * @param {string} key
 * @param {any} defaults 默认值
 * @returns {[]}
 */
const getAssetsCDN = (key, defaults = []) => {
    const data = assetsCDN[key];
    let res = data.env || defaults;
    if (data[process.env.NODE_ENV]) {
        res = res instanceof Array ? [...res, ...data[process.env.NODE_ENV]] : {...res, ...data[process.env.NODE_ENV]};
    }
    return res;
};

const assetsCDN = {
    externals: {
        env: {
            'lodash': '_',
            'bignumber.js': 'BigNumber',
            'jschardet': 'jschardet'
        },
        production: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'ant-design-vue': 'antd'
        }
    },
    css: {
        env: []
    },
    js: {
        env: [
            '//cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
            '//cdn.jsdelivr.net/npm/bignumber.js@9.0.1/bignumber.min.js',
            '//cdn.jsdelivr.net/npm/jschardet@2.1.1/dist/jschardet.min.js'
        ],
        production: [
            '//cdn.jsdelivr.net/npm/vue@3.2.19/dist/vue.global.min.js',
            '//cdn.jsdelivr.net/npm/vue-router@3.5.2/dist/vue-router.min.js',
            '//cdn.jsdelivr.net/npm/vuex@4.0.2/dist/vuex.global.min.js',
            '//cdn.jsdelivr.net/npm/axios@0.22.0/dist/axios.min.js',
            '//cdn.jsdelivr.net/npm/ant-design-vue@2.2.8/dist/antd.min.js'
        ]
    }
};

module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: process.env.VUE_APP_OUTPUT_DIR,
    assetsDir: 'static',
    runtimeCompiler: true,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api_base': {
                target: '/',
                changeOrigin: true, // 允许 webSockets 跨域
                secure: false,
                pathRewrite: {
                    '^/api_base': ''
                }
            }
        },
        watchOptions: {
            ignored: /node_modules|dist|.git|.idea/,
            poll: true
        }
    },
    configureWebpack: {
        externals: getAssetsCDN('externals', {}),
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css)$/,
                filename: '[path][base].gz',
                threshold: 10240,
                deleteOriginalAssets: false
            })
        ],
        performance: {
            hints: false
        }
    },
    chainWebpack: (config) => {
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITLE;
            args[0].cdn = {};
            args[0].cdn.css = getAssetsCDN('css');
            args[0].cdn.js = getAssetsCDN('js');
            return args;
        });
    },
    productionSourceMap: !isProd, // 生产环境是否生成 sourceMap 文件
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // Button
                    'btn-shadow': 'none',
                    'btn-primary-shadow': 'none',
                    'btn-text-shadow': 'none'
                },
                javascriptEnabled: true
            },
            sass: {
                prependData: `@import '~@/assets/styles/vars.scss';`
            }
        }
    }
};
