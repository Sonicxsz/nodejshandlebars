const express = require('express');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const User = require('./model/user')
const mongoose = require('mongoose');
const handlebars = require('express-handlebars')
const mainRouter = require('./routes/main')
const addRouter = require('./routes/add')
const courseRouter = require('./routes/course')
const cartRouter = require('./routes/cart')


const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
const app = express()

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(__dirname, + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(async(req, res, next) => {
    try{
        const user = await User.findById('63eab928a243cc54455c5112')
        req.user = user
        next()
    }catch(err){
        console.log(err)
    }
})
app.use('/', mainRouter)
app.use('/add/course',addRouter)
app.use('/courses',courseRouter)
app.use('/cart',cartRouter)


async function start() {
    try{
    const PORT = process.env.PORT || 3000
    const url = 'mongodb+srv://arbi:mufufyx9JVuEERyD@cluster0.mzxasfc.mongodb.net/?retryWrites=true&w=majority'
    await mongoose.set('strictQuery', false);
    await mongoose.connect(url, {useNewUrlParser: true})
    const condidate = await User.findOne()
    if(!condidate){
        const user = new User({
            email: 'arbih@mail.ru',
            name: 'Arbi',
            cart: {
                items:[]
            }
        })
        await user.save()
    }
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
    }catch(err){
        console.log(err)
    }
    
}

start()




