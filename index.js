const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars')
const mainRouter = require('./routes/main')
const addRouter = require('./routes/add')
const courseRouter = require('./routes/course')
const cartRouter = require('./routes/cart')
const hbs = handlebars.create({defaultLayout: 'main', extname:'hbs'})

const app = express()

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(__dirname, + '/public'))
app.use(express.urlencoded({extended: true}))

app.use('/', mainRouter)
app.use('/add/course',addRouter)
app.use('/courses',courseRouter)
app.use('/cart',cartRouter)





const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
