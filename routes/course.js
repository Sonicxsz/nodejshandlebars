const {Router} = require('express')
const Course = require('../model/course')
const router = Router()

router.get('/', async(req, res) => {
    const courses = await Course.find().populate('userId', 'name email')
    console.log(courses)
    res.render('courses-page',{
        title: 'Курсы',
        isCourses: true,
        courses
    })   

})


router.get('/:id', async(req, res) => {

    const course = await Course.findById(req.params.id)
    
    res.render('full-page', {
        course

    })
})

router.get('/:id/edit', async(req, res) => {
    if(!req.query.allowed){
        res.redirect('/')
        return
    }
    const course = await Course.findById(req.params.id)
    
    
    res.render('edit-page', {
        title: course.title,
        course

    })
})

router.post('/remove', async(req, res) => {
    await Course.deleteOne({_id: req.body._id})
    res.redirect('/courses')
})

router.post('/edit', async(req, res) => {
    const {id, title, image, price} = req.body
    await Course.findByIdAndUpdate(id, {title, image, price})
    res.redirect('/')
    return
})

module.exports = router