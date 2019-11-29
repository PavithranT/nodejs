const express = require('express')
const router = express.Router();
const Product = require('../../database/db').product;
const auth = require('../auth').extractToken
const { check, validationResult } = require('express-validator');
const BadRequestError = require('../errors/BadRequestError')
const ItemAlreadyExist = require('../errors/ItemAlreadyExist')
const ItemNotFoundError = require('../errors/ItemNotFoundError')
const ProductCategory = require('../../database/db').productCategory
const DatabaseError = require('../errors/DatabaseError')
const ExtractObjects = require('../service/service').ExtractObjects



router.get('/', auth, async (req, res) => {
    try {
        Product.belongsTo(ProductCategory, { foreignKey: 'productCategoryId' })
        let productList = await Product.findAll({
            // attributes: ['productId', 'name', 'price', 'productCategoryId'],
            where: { isDeleted: false }, include: [{ model: ProductCategory, attributes: ["name"] }]
        })
        // productList=ExtractObjects(productList,productList.Product_Category)


        res.status(200).json({ productList })

    } catch (error) {
        res.status(error.status||400).json({ error: error.message })
    }

});

router.get('/:productId', auth, async (req, res) => {
    const productId = req.params.productId
    try {
        const product = await Product.findOne({
            attributes: ['productId', 'name', 'price', 'productCategoryId'],
            where: { isDeleted: false, productId: productId },
            include: [{ model: ProductCategory, attributes: ["name"] }]
        })

        res.status(200).send(product)

    } catch (error) {
        res.status(error.status).json({ error: error.message })
    }

});


router.post('/', auth, async (req, res, next) => {
    await check('name').isString().withMessage("Should be String").isLength({ min: 5 }).withMessage("String with min 5 letters").run(req);
    await check('price').isNumeric().withMessage("Should be numeric").run(req);
    await check('type').isLength({ min: 5 }).run(req);
    await check('productCategoryId').isNumeric().withMessage("Should be number").run(req);

    let productCtgry;
    let reqData = req.body
    try {
        if (!validationResult(req).isEmpty()) throw new BadRequestError(validationResult(req).errors);

        productCtgry = await Product.findOne(
            { where: { name: reqData.name } }
        )
        if (productCtgry !== null) throw new ItemAlreadyExist('Product already exits.');

        productCtgry = await ProductCategory.findOne(
            { where: { productCategoryId: reqData.productCategoryId } }
        )
        if (productCtgry === null) throw new ItemNotFoundError('Product category doesnt exits.');

        let result
        await Product.create(reqData).then(obj => result = obj).catch(err => { throw new DatabaseError() })


        res.json(result)

    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }


});


router.put('/:productId', auth, async (req, res, next) => {
    await check('name').isString().withMessage("Should be String").isLength({ min: 5 }).withMessage("String with min 5 letters").run(req);
    await check('price').isNumeric().withMessage("Should be numeric").run(req);
    await check('type').isLength({ min: 5 }).run(req);
    await check('productCategoryId').isNumeric().withMessage("Should be number").run(req);
    let productId = req.params.productId
    let productCtgry;
    let reqData = req.body
    try {
        if (!validationResult(req).isEmpty()) throw new BadRequestError(validationResult(req).errors);
        let values = { name: reqData.name, price: reqData.price, type: reqData.type, productCategoryId: reqData.productCategoryId }
        let validateSelector = { where: { productCategoryId: reqData.productCategoryId } }
        let updateSelector = { where: { productId: productId } }

        productCtgry = await ProductCategory.findOne(validateSelector)
        if (productCtgry === null) throw new ItemNotFoundError('Product category doesnt exits.');


        await Product.update(values, updateSelector)
            .then(obj => res.json({ message: "Successfully Updated", ...obj }))
            .catch(err => { throw new DatabaseError() })


        res.json(result)

    } catch (error) {
        res.status(error.status || 404).json({ error: error.message });
    }


});


router.delete('/:productId', auth, async (req, res, next) => {
    let productId = req.params.productId
    try {
        if (!validationResult(req).isEmpty()) throw new BadRequestError(validationResult(req).errors);
        let validateSelector = { where: { isDeleted: false, productId: productId } }
        let updateSelector = { where: { productId: productId } }
        let values = { isDeleted: true }


        productCtgry = await Product.findOne(validateSelector)
        if (productCtgry === null) throw new ItemNotFoundError('Product category doesnt exits.');


        await Product.update(values, updateSelector)
            .then(obj => res.json({ message: "Deleted Successfully" }))
            .catch(err => { throw new DatabaseError() })



    } catch (error) {
        res.status(error.status || 400).json({ error: error });
    }


});


module.exports = router