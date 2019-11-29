const express = require('express')
const router = express.Router();
const Product = require('../../database/db').product;
const auth = require('../auth').extractToken
const { check, validationResult } = require('express-validator');
const BadRequestError = require('../errors/BadRequestError')
const ItemAlreadyExist = require('../errors/ItemAlreadyExist')
const ProductCategory = require('../../database/db').productCategory
const DatabaseError = require('../errors/DatabaseError')



router.get('/', auth, async (req, res) => {
    try {
        const productList = await Product.findAll({
            attributes: ['productId', 'name', 'price', 'type', 'productCategoryId'], where: { isDeleted: false }
        })
        res.status(200).send(productList)

    } catch (error) {
        res.status(error.status).json({ error: error.message })
    }

});

router.get('/:productId', auth, async (req, res) => {
    const productId = req.params.productId
    try {
        const product = await Product.findOne({
            attributes: ['name', 'price', 'type', 'productCategoryId'], where: { isDeleted: false, productId: productId }
        })

        await res.status(200).send(product)

    } catch (error) {
        res.status(error.status).json({ error: error.message })
    }

});


router.post('/', auth, async (req, res, next) => {
    await check('name').isString().withMessage("Should be String").isLength({ min: 5 }).withMessage("String with min 5 letters").run(req);
    await check('price').isNumeric().withMessage("Should be numeric").run(req);
    await check('type').isLength({ min: 5 }).run(req);
    await check('productCategoryId').isNumeric().withMessage("Should be number").run(req);

    let isNull;
    let reqData = req.body
    try {
        if (!validationResult(req).isEmpty()) throw new BadRequestError(validationResult(req).errors);

        isNull = await Product.findOne(
            { where: { name: reqData.name } }
        )
        // if (isNull !== null) throw new ItemAlreadyExist('Product already exits.');
        // isNull = await ProductCategory.findOne(
        //     { where: { name: reqData.name } }
        // )
        if (isNull !== null) throw new ItemAlreadyExist('Product already exits.');

        let result
        await Product.create(reqData).then(obj => result = obj).catch(err => { throw new DatabaseError() })


        res.json(result)

    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
    console.log("came hereee")


});


module.exports = router