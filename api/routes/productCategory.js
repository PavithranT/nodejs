const express = require('express');
const router = express.Router();
const ProductCategory = require('../../database/db').productCategory
const auth = require('../auth').extractToken
const { check, validationResult } = require('express-validator');

const BadRequestError = require('../errors/BadRequestError')
const ItemNotFoundError = require('../errors/ItemNotFoundError')
const ItemAlreadyExist = require('../errors/ItemAlreadyExist')

router.get('/', auth, async (req, res) => {
    try {
        const productCategoryList = await ProductCategory.findAll({
            attributes: ['name', 'productCategoryId'], where: { isDeleted: false }
        })
        res.status(200).send(productCategoryList)
    } catch (error) {
        res.status(error.status).json(error)
    }

})

router.get('/:pcId', auth, async (req, res) => {
    const productCategoryId = req.params.pcId
    try {
        const productCategoryList = await ProductCategory.findOne(
            {
                attributes: ['name', 'productCategoryId'],
                where: { productCategoryId: productCategoryId, isDeleted: false }
            }
        )
        if (productCategoryList === null) throw new ItemNotFoundError(`There is no product category in id ${productCategoryId}`)

        res.status(200).json(productCategoryList)
    } catch (error) {
        console.log(error)
        res.status(error.status).json(error)
    }
})

router.post('/', auth, async (req, res) => {
    let reqData = req.body
    let createdData = null;
    let isNull;


    await check('name').isString().withMessage("Should be String").isLength({ min: 5 }).withMessage("Name should be min 5 letters..").run(req);

    try {
        if (!validationResult(req).isEmpty())
            throw new BadRequestError(validationResult(req).errors);

        isNull = await ProductCategory.findOne(
            {
                attributes: ['name', 'productCategoryId'],
                where: { name: reqData.name }
            }
        )
        if (isNull !== null) throw new ItemAlreadyExist('Product Category name already exits.');

        createdData = await ProductCategory.create(reqData)
        res.json({ message: "Successfully Created..." })
    } catch (error) { res.status(error.status).json(error) }
})


router.put('/:pcId', auth, async (req, res) => {
    let reqData = req.body
    const productCategoryId = req.params.pcId
    let isNull;
    await check('name').isString().withMessage("Should be String").isLength({ min: 5 }).withMessage("Name should be min 5 letters..").run(req);
    try {
        if (!validationResult(req).isEmpty())
            throw new BadRequestError();

        isNull = await ProductCategory.findOne({ where: { productCategoryId: productCategoryId, isDeleted: false } })
        if (isNull === null) throw new ItemNotFoundError('Product Category not found.');
        await ProductCategory.update({ name: reqData.name }, { where: { productCategoryId: productCategoryId } })

        res.json({ message: 'Updated Successfully' })
    } catch (error) { res.status(error.status).json(error) }
})


router.delete('/:pcId', auth, async (req, res) => {
    const productCategoryId = req.params.pcId
    let isNull;
    try {
        isNull = await ProductCategory.findOne({ where: { productCategoryId: productCategoryId, isDeleted: false } })
        if (isNull === null) throw new ItemNotFoundError('Product Category not found.');
        await ProductCategory.update({ isDeleted: true }, { where: { productCategoryId: productCategoryId } })

        res.json({ message: 'Deleted Successfully' })
    } catch (error) { res.status(error.status).json(error) }
})

module.exports = router