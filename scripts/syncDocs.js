// test 测试用 替换index.md

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// 获取当前模块的文件名和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceRepoUrl = "https://github.com/yangyu-1997/my-react-project.git";

const sourceFilePath = "src"; // 文件在源仓库中的路径
const targetRepoPath = "docs"; // 目标仓库本地路径

// 1. Clone 源仓库到临时目录
const tempDir = fs.mkdtempSync(path.join(targetRepoPath, "temp-"));
execSync(`git clone ${sourceRepoUrl} ${tempDir}`);

// 2. 遍历源仓库中的 sourceRepoUrl + sourceFilePath 下的 test.md 复制到 targetRepoPath下的 index.md
const sourceFile = path.join(tempDir, sourceFilePath, 'test.md');
const targetFile = path.join(targetRepoPath, 'index.md');

if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`成功复制 ${sourceFile} 到 ${targetFile}`);
} else {
    console.error(`源文件 ${sourceFile} 不存在`);
}
fs.rmdirSync(tempDir, { recursive: true }); // 清理临时文件