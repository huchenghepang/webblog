const { v4: uuidv4 } = require('uuid');

// 导入公共资源
const httpStatusCodes = require("../public/json/httpStatusCodes.json");

/* 
interface ApiResponse<T = any> {
    success: boolean;              // 请求是否成功
    code: number;                 // HTTP 状态码或自定义状态码
    message: string;              // 操作结果的描述
    data: T | null;              // 返回的数据内容，泛型可以根据具体情况指定
    error: ApiError | null;      // 错误信息，如果有的话
    timestamp: string;            // 响应生成的时间戳
    requestId: string;            // 唯一的请求 ID
    meta?: ApiMeta;              // 额外的元数据（可选）
}

interface ApiError {
    code: string;                 // 错误代码
    description: string;          // 错误描述
}

interface ApiMeta {
    pagination?: Pagination;      // 分页信息（可选）
    version: string;              // API 版本号
}

interface Pagination {
    currentPage: number;          // 当前页码
    totalPages: number;           // 总页数
    totalItems: number;           // 总记录数
} 
*/




// 定义响应中间件
const responseMiddleware = function (req, res, next) {



    /**
 * 回复响应 一般是正常处理的响应
 * @date 2024-11-04 18:56:19
 * @author jeff-护城河
 *
 * @param {*} message
 * @param {*} [data=undefined] - 响应的额外数据
 * @param {number} [code=200]
 * @example 示例
 */
    function sendResponse(message, data = undefined, code = 200) {
        const timestamp = new Date().toISOString();
        const requestId = uuidv4();
        const success = code === 200 ? true : false;


        res.send({
            success,
            code: code,
            message: message,
            data: success ? data : null,
            error: success ? null : { code: 400, description: '出现错误' },
            timestamp,
            requestId,
        })
    }


    /**
     * 响应错误信息
     * @date 2024-11-04 18:53:32
     * @author jeff-护城河
     *
     * @param {*} err - error的错误 或者 err的信息
     * @param {number} [code=400] 错误的状态码
     * @example 示例
     */
    function sendError(err = "响应出现错误", code = 400) {
        res.json({
            code,
            message: httpStatusCodes[code]?.message || "未知",
            detail: httpStatusCodes[code]?.detail || null,
            ErrorMessage: err instanceof Error ? "服务器处理出现错误" : err
        });
    }



    res.sendResponse = sendResponse;
    res.sendError = sendError;
    next();
}


module.exports = responseMiddleware