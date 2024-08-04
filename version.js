// 存储当前脚本标签的哈希值集合
let scriptHashes = new Set();
let timer = undefined;
/**
 * 从首页获取脚本标签的哈希值集合
 * @returns {Promise<Set<string>>} 返回包含脚本标签的哈希值的集合
 */
async function fetchScriptHashes() {
    // 获取首页HTML内容
    const html = await fetch('/').then((res) => res.text());
    // 正则表达式匹配所有<script>标签
    const scriptRegex = /<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi;
    // 获取匹配到的所有<script>标签内容
    const scripts = html.match(scriptRegex) ?? [];
    console.log(scripts)
    // 将脚本标签内容存入集合并返回
    return new Set(scripts);
}

/**
 * 比较当前脚本标签的哈希值集合与新获取的集合，检测是否有更新
 */
async function compareScriptHashes() {
    // 获取新的脚本标签哈希值集合
    const newScriptHashes = await fetchScriptHashes();

    if (scriptHashes.size === 0) {
        // 初次运行时，存储当前脚本标签哈希值
        scriptHashes = newScriptHashes;
    } else if (
        scriptHashes.size !== newScriptHashes.size ||
        ![...scriptHashes].every((hash) => newScriptHashes.has(hash))
    ) {
        // 如果脚本标签数量或内容发生变化，则认为有更新
        console.info('更新了', {
            oldScript: [...scriptHashes],
            newScript: [...newScriptHashes],
        });
        // 清除定时器
        clearInterval(timer);
        // 提示用户更新
        updateNotice();
    } else {
        // 没有更新
        console.info('没更新', {
            oldScript: [...scriptHashes],
        });
    }
}
compareScriptHashes()
// 每60秒检查一次是否有新的脚本标签更新
// timer = setInterval(compareScriptHashes, 10000);