const {Router} = require('express')
const Course = require('../model/course')
const Cart = require('../model/cart')

const router = Router()



router.get('/', async(req, res) => {
    const cart = await Cart.fetch()
    
    res.render('cart-page', {
        title: 'Корзина курсов',
        price: cart.price,
        items: cart.items
    })
    return 
})

router.delete('/delete/:id', async(req, res) =>{
     
    const items = await Cart.delete(req.params.id)
    res.status(200).json(items)
})

router.post('/add', async(req, res) => {
    const item = await Course.getById(req.body.id)
    await Cart.add(item)
    res.redirect('/cart')
    
})


module.exports = router