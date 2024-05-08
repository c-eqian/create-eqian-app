import {defineConfig, loadEnv} from 'vite'
import path from 'path'
// @ts-ignore
import vueJsx from "@vitejs/plugin-vue-jsx";
// @ts-ignore
import AutoImport from "unplugin-auto-import/vite"; // 引入插件
// @ts-ignore
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import  viteCompression  from 'vite-plugin-compression'
// @ts-ignore
// import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig(({mode, _command}) => {
    const env = loadEnv(mode, process.cwd())
    const {VITE_APP_ENV} = env
    // @ts-ignore
    return {
        plugins: [
            vue(),
            vueJsx(),
            createSvgIconsPlugin({
                // 图标文件夹为src/assets/icons
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
            AutoImport({
                dts: "types/auto-imports.d.ts", // 这里是生成的global函数文件
                imports: ["vue", "vue-router", "@vueuse/core"], // 需要自动导入的插件
                dirs: [
                    './src/hooks'
                ],
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/, /\.vue\?vue/, // .vue
                    /\.md$/, // .md
                ],
                // 解决eslint报错问题
                eslintrc: {
                    // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
                    enabled: false,
                    filepath: './.eslintrc-auto-import.json', // 生成的文件路径
                    globalsPropValue: true,
                }
            }),
            Components({
                resolvers: [
                    // 自动导入 Element Plus 组件
                    ElementPlusResolver(),
                ],
                // 指定自定义组件位置(默认:src/components)
                dirs: ["src/components", "src/**/components"],
                // 配置文件位置 (false:关闭自动生成)
                // dts: false,
                dts: "./types/components.d.ts",
            }),
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: 'gzip',
                ext: '.gz',
            })
        ],
        resolve: {
            // https://cn.vitejs.dev/config/#resolve-alias
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~@': path.resolve(__dirname, '/src'),
            }
        },
        // vite 相关配置
        server: {
            port: 8686,
            host: '0.0.0.0',
            open: true,
            /** 预热常用文件，提高初始页面加载速度 */
            warmup: {
                clientFiles: [
                    './src/layout/*.vue'
                ]
            },
            proxy: {
               [env.VITE_BASE_URL]: {
                    target: env.VITE_SERVER,
                    changeOrigin: true,
                   rewrite:(path)=>{
                       return path.replace(RegExp(`^${env.VITE_BASE_URL}`), '')
                   }
                }
            },
        },
        // 预加载项目必需的组件
        optimizeDeps: {
            include: [
                "vue",
                "vue-router",
                "pinia",
                "axios",
                "@vueuse/core",
            ],
        },
        // 构建配置
        build: {
            assetsDir: 'static',
            cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
            chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
            emptyOutDir: true,
            minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
            terserOptions: {
                compress: {
                    keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
                    drop_console: true, // 生产环境去除 console
                    drop_debugger: true, // 生产环境去除 debugger
                },
                format: {
                    comments: false, // 删除注释
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@import "@/styles/mixin.scss";'
                }
            }
        },
    }
})
