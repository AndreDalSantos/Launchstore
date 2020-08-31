const { formatPrice } = require('./utils')

const Cart = {
    init(oldCart) {
        if(oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }

        return this
    },
    addOne(product) {
        let inCart = this.getCartItem(product.id)

        if(!inCart) {
            inCart = {
                product: {
                    ...product,
                    formattedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }

        // max quantity exceeded
        if(inCart.quantity >= product.quantity) return this

        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        return this

    },
    removeOne(productId) {
        // pegar o item do carrinho
        const inCart = this.getCartItem(productId)

        if(!inCart) return this

        // atualizar o item
        inCart.quantity--
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        // atualizar o carrinho
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        if(inCart.quantity < 1) {
            // const itemIndex = this.items.indexOf(inCart)
            // this.items.splice(itemIndex, 1)

            // OU

            this.items = this.items.filter(item => 
                item.product.id != inCart.product.id)
            return this
        }

        return this
    },
    delete(productId) {
        const inCart = this.getCartItem(productId)
        if(!inCart) {
            return this
        }

        if(this.items.length > 0) {
            this.total.quantity -= inCart.quantity
            this.total.price -= (inCart.product.price * inCart.quantity)
            this.total.formattedPrice = formatPrice(this.total.price)
        }

        this.items = this.items.filter(item => inCart.product.id != item.product.id)

        return this
    },
    getCartItem(productId) {
        return this.items.find(item => item.product.id == productId)
    }
}

module.exports = Cart

// testes:

// const product = {
//     id: 1,
//     price: 199,
//     quantity: 2
// }

// const product2 = {
//     id: 2,
//     price: 229,
//     quantity: 1
// }

// console.log('add first cart item')
// let oldCart = Cart.init().addOne(product)
// console.log(oldCart)

// console.log('add second cart item')
// oldCart = Cart.init(oldCart).addOne(product)
// console.log(oldCart)

// console.log('delete cart item')
// oldCart = Cart.init(oldCart).delete(product.id)
// console.log(oldCart)


// console.log('add third cart item')
// oldCart = Cart.init(oldCart).addOne(product2)
// console.log(oldCart)

// console.log('add fourth cart item')
// oldCart = Cart.init(oldCart).addOne(product)
// console.log(oldCart)

// console.log('remove one item')
// oldCart = Cart.init(oldCart).removeOne(product.id)
// console.log(oldCart)

// console.log('remove second item')
// oldCart = Cart.init(oldCart).removeOne(product.id)
// console.log(oldCart)

// console.log('remove one item')
// oldCart = Cart.init(oldCart).removeOne(product2.id)
// console.log(oldCart)
