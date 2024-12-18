const fs = require('fs');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

/**
 * 生成 Markdown 内容的摘要和目录（TOC）。
 * @date 2024-11-07 13:21:05
 * @param {{ filePath?: string; content?: string; }} [param0={}]
 * @param {string} [param0.filePath=''] - 文件路径
 * @param {string} [param0.content=''] - 传入的 Markdown 内容
 *
 * @returns {{ toc: Array<{level: string, title: string}>, summary: string }} - 包含目录和摘要的对象
 * @example const result = generateSummaryAndTOC({ filePath: '../files/notes/测试.md' });
 */
function generateSummaryAndTOC({ filePath = '', content = '' } = {}) {
  try {
    // 如果既没有路径也没有内容，抛出错误
    if (!filePath && !content) {
      throw new Error('No input provided');
    }

    // 如果提供了文件路径，读取文件内容
    if (filePath) {
      content = fs.readFileSync(filePath, 'utf-8');
    }

    // 如果内容仍然为空，返回默认结果
    if (!content) {
      return { toc: [], summary: '' };
    }

    // 初始化 markdown-it 和插件
    const md = new MarkdownIt();
    const headers = [];
    md.use(markdownItAnchor, {
      level: [1, 2, 3], // 只提取 H1, H2, H3 级别标题
      callback: (token, info) => {
        headers.push({
          level: token.tag || '', // 标题等级（如 H1, H2）; 如果获取失败返回空字符串
          title: info.title || '', // 标题文本；如果获取失败返回空字符串
        });
      },
    });

    // 渲染 Markdown 内容以触发插件生成目录
    md.render(content);

    // 生成摘要
    const summary = content.slice(0, 200);

    // 根据结果生成输出，处理空的情况
    const toc = headers.map(header => ({
      level: header.level || '',
      title: header.title || '',
    }));

    return {
      toc,
      summary,
    };
  } catch (error) {
    // 在发生错误时返回默认值
    return {
      toc: [],
      summary: '',
    };
  }
}

module.exports = generateSummaryAndTOC;
