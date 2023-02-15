const {Router} = require('express')
const Course = require('../model/course')
const router = Router()

router.get('/', (req, res) => {
    res.render('addpage', {
        title: 'Добавить',
        isAddCourse: true
    })
})

router.post('/', async(req, res) => {
   

    try{
        const {title, price, image} = req.body
        const course = new Course({title, price, image, userId: req.user})
        course.save()
        res.redirect('/')
        
    }catch(err){
        console.log(err)
    }
})

module.exports = router