const {Router} = require('express')
const Course = require('../model/course')
const router = Router()

router.get('/', async(req, res) => {

    const courses =  await Course.getAll()

    res.render('coursespage',{
        title: 'Курсы',
        isCourses: true,
        courses
    })

})

module.exports = router