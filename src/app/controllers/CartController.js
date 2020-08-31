const Cart = require('../../lib/cart')

const LoadProductsService = require('../services/LoadProductService')
const { addOne, removeOne } = require('../../lib/cart')

module.exports = {
    async index(req, res){
        try {      

            let { cart } = req.session

            cart = Cart.init(cart)

            return res.render('cart/index', { cart })

        } catch(err) {
            throw new Error(err)
        }
    },
    async addOne(req, res){
        const { id } = req.params

        const product = await LoadProductsService.load('product', { where: { id }})     
        
        let { cart } = req.session

        cart = Cart.init(cart).addOne(product)

        req.session.cart = cart

        return res.redirect('/cart')


    },
    removeOne(req, res) {
        const { id } = req.params

        let { cart } = req.session

        if(!cart) return res.redirect('/cart')

        cart = Cart.init(cart).removeOne(id)

        req.session.cart = cart

        return res.redirect('/cart')
    },
    delete(req, res){
        let { id } = req.params
        let { cart } = req.session    

        if (!cart) return

        cart = Cart.init(cart).delete(id)

        req.session.cart = cart

        return res.redirect('/cart')
    }
}