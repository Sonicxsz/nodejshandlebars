const {Router} = require('express')
const Course = require('../model/course')
const User = require('../model/user')
const router = Router()

function getCartData(cart){
    return cart.items.map(i => {
        return {count: i.count, title: i.courseId.title, price: i.courseId.price, id: i.courseId._id}
    })
}

function getTotalCartPrice(cart){
    return cart.items.reduce((acc, i) => {
        return acc += i.count * i.courseId.price
    }, 0)
}

router.get('/', async(req, res) => {
    const user = await req.user
    .populate(['cart.items.courseId'])

    const cart = getCartData(user.cart)
    const price = getTotalCartPrice(user.cart)
    
    res.render('cart-page', {
        title: 'Корзина курсов',
        price,
        items: cart
    })
    return 
})

router.delete('/delete/:id', async(req, res) =>{
     
    await req.user.removeCartItem(req.params.id)
    const user = await req.user.populate(['cart.items.courseId'])
    const items = getCartData(user.cart)
    const cart = {
        items, price: getTotalCartPrice(user.cart)
    }
    res.status(200).json(cart)
})

router.post('/add', async(req, res) => {
    const item = await Course.findById(req.body.id)
   
    await req.user.addToCart(item)
    res.redirect('/courses') 
    
})


module.exports = router