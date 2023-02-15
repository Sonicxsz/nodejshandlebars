const {Schema, model} = require('mongoose')


const user = new Schema({
    email: {
        required: true,
        type: String
    },
    name: {
        requiered: true,
        type: String
    },
    cart: {
        items: [
            {
                count: {
                    requiered: true,
                    type: Number,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    requiered:true
                }
            }
        ]
    }
})


module.exports = model('User', user)