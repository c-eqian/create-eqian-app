
import fs from 'node:fs' // 文件处理
import path from 'node:path' //路径处理
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'// 处理命令行参数
import prompts from 'prompts' // 终端交互
import {
    blue,
    cyan,
    green,
    lightBlue,
    lightGreen,
    lightRed,
    magenta,
    red,
    reset,
    yellow,
} from 'kolorist' // 用于着色stdinstdout的小实用程序,可以将颜色放入stdin和stdout中

/**
 * 解析命令行参数
 * 如 npm create eqian@latest my-vue-app --template vue
 * 得到
 * { _: [ 'my-vue-app' ], template: 'vue' }
 * 其中_是一个数组，为用户输入的未带前缀属性的值 如my-vue-app
 * 使用 slice(2) 方法从 process.argv 数组中取出从索引 2 开始的所有元素。
 * 这意味着它移除了 'node' 和 JavaScript 文件的路径，只保留了命令行参数。
 * 第二个参数目的是将 -（单独出现或作为其他参数值的一部分）当作字符串来处理
 */
const argv = minimist(process.argv.slice(2), {string: ['-']})
// { _: [ 'my-vue-app' ], template: 'vue' }
// console.log('argv: ', argv)

/**
 * 定义框架
 * variants是框架下的不同脚手架实现，如js,ts版本
 * 其中各字段用处为：
 * name：模板名，用于vite找到最终模板
 * display：用于命令行展示的名称
 * color：命令行展示时的文字颜色
 * customCommand：需要执行的命令
 */
const FRAMEWORKS = [
    {
        name : 'vue',
        display: 'Vue',
        color: green,
        variants: [
            {
                name : 'vue-ts',
                display: 'TypeScript',
                color: blue,
            },
            {
                name: 'vue',
                display: 'JavaScript',
                color: yellow,
            },
        ]
    }, {
        name: 'react',
        display: 'React',
        color: cyan,
        variants: [
            {
                name: 'react-ts',
                display: 'TypeScript',
                color: blue,
            },
            {
                name: 'react',
                display: 'JavaScript',
                color: yellow,
            }
        ],
    }
]
/**
 * 根据框架名称遍历模板项目名称和颜色 后面用到
 * 放到一个模板数组里面
 * 如：
 * [
 *    {
 *        name: 'react-ts',
 *        color: color
 *    }
 * ]
 */
const TEMPLATES = FRAMEWORKS.flatMap(
    (f) => (f.variants && f.variants.map((v) => {
        return {
            name:v.name,
            color: v.color
        }
    })) || [{
        name:f.name,
        color: f.color
    }]
);
// console.log('TEMPLATES: ', TEMPLATES)
/**
 * 默认项目名称
 * 如果没有输入名称，使用默认的
 * @type {string}
 */
const defaultTargetDir = 'eqian-project'

/**
 * 初始化脚手架
 * @returns {Promise<void>}
 */
async function init() {
    // 获取不带前缀的参数，如一般是项目名称
    const argTargetDir = formatTargetDir(argv._[0])
    /**
     * 获取模板名称，如输入 ----template vue
     * 得到 {
     *     template：’vue‘
     * }
     */
    // console.log('argv.template: ',argv.template) // vue
    // console.log('argv.t: ',argv.t)
    const argTemplate = argv.template || argv.t
    // 如果没有输入项目名称，使用默认的
    let targetDir = argTargetDir || defaultTargetDir
    // 获取真实项目名称 如果使用. 将设置当前所在目录作为项目的路径
    const getProjectName = () =>
        targetDir === '.' ? path.basename(path.resolve()) : targetDir
    // 默认配置覆盖。如果用户输入覆盖参数，则不会出现提示覆盖的选择
    prompts.override({
        overwrite: argv.overwrite,
    })
    let result
    try {
        result = await prompts([
            // 项目名称
            {
                type: argTargetDir ? null : 'text', // 交互类型
                name: 'projectName',// 显示名称
                message: reset('Project name'), //提示显示消息
                initial: defaultTargetDir,// 默认字符串值
                onState: (state)=> { // 在状态更改回调时。函数签名具有两个属性：和object value aborted
                    targetDir = formatTargetDir(state.value) || defaultTargetDir
            }
            },
            // 校验项目目录是否为空，不为空用户确认
            {
                type: () =>
                    !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select',
                name: 'overwrite',// 如果模板路径不为空，是否覆盖
                message: () =>
                    (targetDir === '.'
                        ? 'Current directory'
                        : `Target directory "${targetDir}"`) +
                    ` is not empty. Please choose how to proceed:`,
                initial: 0,// 默认选择第一项
                choices: [
                    {
                        title: 'Remove existing files and continue',
                        value: 'yes',
                    },
                    {
                        title: 'Cancel operation',
                        value: 'no',
                    },
                    {
                        title: 'Ignore files and continue',
                        value: 'ignore',
                    },
                ],
            },
            // 确认是否覆盖
            {
                type: (_, { overwrite }) => {
                    /**
                     * 基于上一个提示 (overwrite) 的响应来动态确定的提示类型。如果 overwrite 的值为 'no'，
                     * 则抛出一个错误并取消操作。否则，类型为 null，表示不显示此提示。
                     */
                    if (overwrite === 'no') {
                        throw new Error(red('✖') + ' Operation cancelled')
                    }
                    return null
                },
                name: 'overwriteChecker',
            },
            // 包名称是否合法
            {
                /**
                 * 如果项目名称符合包名称的语法，则会默认使用项目名称作为包名称
                 * 否则，需要用户进行命名包名称
                 * @returns {null|string}
                 */
                type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
                name: 'packageName',
                message: reset('Package name:'),
                initial: () => toValidPackageName(getProjectName()),
                validate: (dir) =>
                    /**
                     * 接收用户输入。如果值有效，则应返回，否则应返回错误消息。如果返回，则显示默认错误消息true String false
                     * @param dir
                     * @returns {boolean|string}
                     */
                    isValidPackageName(dir) || 'Invalid package.json name',
            },
        //   是否已经有选择模板参数 没有提示选择
            {
                type:
                    argTemplate && TEMPLATES.map(v=> v.name).includes(argTemplate) ? null : 'select',
                name: 'framework',
                message:
                    // 如果输入模板框架不在默认框架里，提示重新选择
                    typeof argTemplate === 'string' && !TEMPLATES.map(v=> v.name).includes(argTemplate)
                        ? reset(
                            `"${argTemplate}" isn't a valid template. Please choose from below: `,
                        )
                        : reset('Select a framework:'),
                initial: 0,
                choices: TEMPLATES.map((framework) => {
                    const frameworkColor = framework.color
                    return {
                        title: frameworkColor(framework.name),
                        value: framework.name,
                    }
                }),
            },
            {
                onCancel: () => {
                    throw new Error(red('✖') + ' Operation cancelled')
                },
            },
        ])
    } catch (e) {
        console.log(e)
        console.log(e.message)
        return
    }
    const { framework, overwrite, packageName } = result
    // console.log(framework, overwrite, packageName)
    const root = path.join(process.cwd(), targetDir)
    if (overwrite === 'yes') {
        setEmptyDir(root)
    } else if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true })
    }
    // 确定模板
    let template = framework || argTemplate
    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
    // 包管理器
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
    // console.log(pkgManager)
    // const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')
    // 模板目录
    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../..',
        `template/template-${template}`,
    )
    // console.log(templateDir)
    /**
     * 文件写入
     * @param file 需要写入的路径文件
     * @param content 是否使用content作为写入内容
     */
    const fileWrite = (file, content) =>{
        // 获取目标文件路径 xxx/targetDir/xxx
        const targetPath = path.join(root, renameGitignoreFiles[file] ?? file)
        if (content){
            fs.writeFileSync(targetPath, content)
        } else {
            copyFile(path.join(templateDir, file), targetPath)
        }
    }
    // 新增判断模板项目是否存在
    if (!fs.existsSync(templateDir)){
        throw new Error(`${template} not exist`)
    }
    // 读取模板目录下的所有文件
    const files = fs.readdirSync(templateDir)
    // 先排除复制模板项目的package.json，待将包名称修改完成后再复制过来
    for (const file of files.filter((f) => f !== 'package.json')) {
        fileWrite(file)
    }
    // 读取模板项目下的package.json内容
    const pkg = JSON.parse(
        fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
    )
    pkg.name = packageName || getProjectName()
    // 将修改后的package.json复制到指定目标目录
    fileWrite('package.json', JSON.stringify(pkg, null, 2) + '\n')
    // 返回相对于第一条路径的第二个路径的路径 如 /app/a, /app/b ==>  ../b
    const cdProjectName = path.relative(process.cwd(), root)
    console.log(`\nDone. Now run:\n`)
    // 如果目标路径不是当前路径下，需要提示cd命令切换到目标路径
    if (root !== process.cwd()) {
        console.log(
            `  cd ${
                cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
            }`,
        )
    }
    // 处理当前用户使用的包管理器
    switch (pkgManager) {
        case 'yarn':
            console.log('  yarn')
            console.log('  yarn dev')
            break
        default:
            console.log(`  ${pkgManager} install`)
            console.log(`  ${pkgManager} run dev`)
            break
    }
}

/**
 * 复制文件到指定目录下
 * @param src
 * @param dest
 */
function copyFile(src, dest) {
    // 文件信息状态
    const stat  =fs.statSync(src)
    // 如果是目录
    if (stat.isDirectory()){
    //     继续获取该目录下的文件，并递归创建目标目录
    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
        const srcFile = path.resolve(src, file)
        const destFile = path.resolve(dest, file)
        copyFile(srcFile, destFile)
    }
    } else {
        fs.copyFileSync(src, dest)
    }
}
/**
 * 格式化项目名称
 * 将最后的/替换为空
 * @param targetDir
 * @returns {string | undefined}
 */
function formatTargetDir(targetDir) {
    return targetDir?.trim().replace(/\/+$/g, '')
}

/**
 * 校验有效项目名称 因为包名称默认是基于项目名称
 * @param projectName
 * @returns {boolean}
 */
function isValidPackageName(projectName) {
    return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
        projectName,
    )
}

/**
 * 转换有效包名称
 * @param projectName
 * @returns {string}
 */
function toValidPackageName(projectName) {
    return projectName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^[._]/, '')
        .replace(/[^a-z\d\-~]+/g, '-')
}

/**
 * 预处理_gitignore文件，转为正确的gitignore
 * @type {{_gitignore: string}}
 */
const renameGitignoreFiles= {
    _gitignore: '.gitignore',
}
/**
 * 清空目录列表
 * @param dir
 */
function setEmptyDir(dir) {
    if (!fs.existsSync(dir)) {
        return
    }
    for (const file of fs.readdirSync(dir)) {
        if (file === '.git') {
            continue
        }
        fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
    }
}

/**
 * 获取用户当前环境的node包管理器
 * @param userAgent
 * @returns {undefined|{name: *, version: *}}
 */
function pkgFromUserAgent(userAgent) {
    if (!userAgent) return undefined
    const pkgSpec = userAgent.split(' ')[0]
    const pkgSpecArr = pkgSpec.split('/')
    return {
        name: pkgSpecArr[0],
        version: pkgSpecArr[1],
    }
}
/**
 * 判断当前路径是否为空
 * @param path
 * @returns {boolean}
 */
function isEmpty(path) {
    const files = fs.readdirSync(path)
    return files.length === 0 || (files.length === 1 && files[0] === '.git')
}
init().catch((e) => {
    console.error(e)
})
