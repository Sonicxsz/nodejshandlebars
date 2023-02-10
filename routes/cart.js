const {Router} = require('express')
const Course = require('../model/course')
const Cart = require('../model/cart')

const router = Router()



router.get('/', async(req, res) => {
    const cart = await Cart.fetch()
    console.log(cart)
    res.render('cart-page', {
        title: 'Корзина курсов',
        price: cart.price,
        items: cart.items
    })
    return 
})

router.post('/add', async(req, res) => {
    const item = await Course.getById(req.body.id)
    await Cart.add(item)
    res.redirect('/cart')
    return 
})


module.exports = router