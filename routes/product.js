const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {isAuth} = require('../controller/auth');
const {userId} = require("../controller/user");
const {productId, create, read, update,remove, list, image} = require("../controller/product");

// crud
router.post("/product/create", create);//verifyToken, isAuth,
router.get("/product/:productId",read);
router.put("/product/:productId",update);//requires :userId
router.delete("/product/:productId/:userId",remove);

router.get("/product/image/:productId",image);

router.get("/products",list);


router.param("userId",userId);
router.param("productId",productId);

module.exports = router;

