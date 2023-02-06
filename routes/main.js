const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('mainpage', {
        title:'Главная',
        isMain: true
    })
})

module.exports = router