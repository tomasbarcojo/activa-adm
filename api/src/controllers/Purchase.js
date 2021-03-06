const { Purchase, Supplier, Article } = require('../db.js')
const { Op } = require('sequelize')

module.exports = {
  async getPurchases(req, res) {
    try {
      const purchase = await Purchase.findAll();
      if (purchase && purchase.length === 0) {
        return res.status(404).send({ message: 'No price lists', status: 404 })
      }
      return res.status(200).send({ purchase, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get price lists' })
    }
  },

  async getPriceListsWithData(req, res) {
    try {
      const pricelist = await Userpricelist.findAll({ include: [Article, Pricelist] });
      if (pricelist && pricelist.length === 0) {
        return res.status(404).send({ message: 'No price lists', status: 404 })
      }
      return res.status(200).send({ pricelist, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get price lists' })
    }
  },

  async createPurchase(req, res) {
    try {
      const { data } = req.body;
      if (!data) return res.status(400).send({ message: 'Necesary data required', status: 400 });
      const purchaseData = { quantities, supplierId, articleId }
      const result = await Purchase.create({ priceListName: priceListName });
      const newPurchase = await Purchase.create(purchaseData);
      // let createdUPL = [];
      //   for (const e of data) {
      //     const item = await Userpricelist.create({ percentage: e.percentage, pricelistId: result.id, articleId: e.articleId });
      //     // createdUPL.push(item);
      //   }
      // const pricelistId = createdUPL[0].pricelistId
      // const arrData = await Userpricelist.findAll({ where: { pricelistId: pricelistId }, include: [Article, Pricelist] });
      return res.status(201).send({ newPurchase, status: 201 })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to create price list' });
    }
  },

  async createPurchase(req, res) {
    try {
      const { priceListName, data } = req.body;
      if (!priceListName || !data) return res.status(400).send({ message: 'Necesary data required', status: 400 });
      const ifExistPL = await Pricelist.findOne({ where: { priceListName: priceListName } });
      if (ifExistPL) {
        return res.status(400).send({ message: "Price list already exists", status: 400 });
      }
      const result = await Pricelist.create({ priceListName: priceListName });
      // let createdUPL = [];
      for (const e of data) {
        const item = await Userpricelist.create({ percentage: e.percentage, pricelistId: result.id, articleId: e.articleId });
        // createdUPL.push(item);
      }
      // const pricelistId = createdUPL[0].pricelistId
      // const arrData = await Userpricelist.findAll({ where: { pricelistId: pricelistId }, include: [Article, Pricelist] });
      return res.status(201).send({ result, status: 201 })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to create price list' });
    }
  },

  async editPricelist(req, res) {
    try {
      const { data } = req.body
      const { id } = req.params
      console.log(data.length)
      if (!data || data.length === 0) {
        return res.status(400).send({ message: 'Necesary data required', status: 400 })
      }
      for (const e of data) {
        Userpricelist.findOne({ where: { pricelistId: id, articleId: e.articleId } }).then(userPL => {
          userPL.percentage = e.percentage;
          userPL.save()
        })
      }
      return res.status(201).send({ message: 'Todo ok', status: 204 })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to edit price list' });
    }
  },

  async getPriceListsById(req, res) {
    try {
      const { id } = req.params;
      await Userpricelist.findAll({ where: { pricelistId: id }, include: [Article, Pricelist] })
        .then((pricelist) => {
          if (!pricelist) return res.status(404).send({ message: 'Invalid id', status: 404 })
          return res.status(200).send({ pricelist, status: 200 })
        })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to get price list by id' });
    }
  },

  async deletePriceList(req, res) {
    try {
      const pricelist = await Pricelist.findByPk(req.params.id)
      if (!pricelist) {
        return res.status(404).send({ message: 'Price list not found with provided id', status: 404 })
      }
      pricelist.destroy() // deleting on cascade (userpricelists)
      return res.status(200).send({ pricelist, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(500).send({ message: 'Failed to delete price list by id', status: 500 });
    }
  }
}