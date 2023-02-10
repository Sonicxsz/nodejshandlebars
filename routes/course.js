const {Router} = require('express')
const Course = require('../model/course')
const router = Router()

router.get('/', async(req, res) => {

    const courses =  await Course.getAll()
    
    res.render('courses-page',{
        title: 'Курсы',
        isCourses: true,
        courses
    })   

})


router.get('/:id', async(req, res) => {

    const course = await Course.getById(req.params.id)
    
    res.render('full-page', {
        course

    })
})

router.get('/:id/edit', async(req, res) => {
    if(!req.query.allowed){
        res.redirect('/')
        return
    }
    const course = await Course.getById(req.params.id)
    
    
    res.render('edit-page', {
        title: course.title,
        course

    })
})

router.post('/edit', async(req, res) => {
    await Course.update(req.body)
    res.redirect('/')
    return
})

module.exports = router