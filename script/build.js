import {exec, execSync} from "node:child_process";
import {join, resolve} from "node:path";
import fs from 'node:fs' // 文件处理
import { consola } from 'consola';
import {fileURLToPath} from "node:url";
const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const DIR_ROOT = resolve(__dirname, '..');
/**
 * 构建源代码
 * @returns {Promise<void>}
 */
async function build(){
    consola.info('Build ...');
    execSync('npm run build', { stdio: 'inherit' });
}
async function gitPush() {
    /**
     * 如果由于无法提交推送，手动操作即可
     */
    const ROOT_PKG = join(DIR_ROOT, 'package.json');
    const { version } =  JSON.parse(fs.readFileSync(ROOT_PKG, 'utf-8'));
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' });
    exec(`git show-ref --tags v${version}`, (error, stdout) => {
        if (!error && stdout !== '') {
            execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' });
        }
        execSync(`git push origin master v${version}`, { stdio: 'inherit' });
        let command = 'npm publish --access public';
        execSync(command, { stdio: 'inherit', cwd: join(DIR_ROOT, 'dist') });
        consola.success('Published');
    });
}
async function run(){
    await build()
    await gitPush()
}
run()
