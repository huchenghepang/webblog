const express = require('express');
const { getPermissionsHandler, addPermissionHandler, updatePermissionHandler, deletePermissionHanlder } = require('../router_handler/permission');
const { permissionSchema } = require('../schema/permission');
const router = express.Router();

// 1. 查询所有权限
router.get('/getpermissions', async (req, res) => {
   await getPermissionsHandler(req,res);
});

// 2. 插入新权限
router.post('/addpermission', async (req, res) => {
    const {value,error} = permissionSchema.validate(req.body);
    if(!error){
        await addPermissionHandler(value,res);
    }else{
        res.sendError(error.details[0].message) 
    }
});

// 3. 更新权限
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    // 验证请求体
    const { error, value } = permissionSchema.validate(req.body);
    if (error && !id) {
      return res.sendError('错误的更新',error.details[0].message);
    }else{
        await  updatePermissionHandler(value,id,res)
    }
  });

// 4. 删除权限
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await deletePermissionHanlder(id,res)
    
});

module.exports = router