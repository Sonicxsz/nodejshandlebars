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


user.methods.addToCart = function (course){
    const items = [...this.cart.items]
    const idx = items.findIndex(i => {
        return i.courseId.toString() === course._id.toString()
    })

    if(items[idx]){
        items[idx].count = items[idx].count + 1
    }else{
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    this.cart = {items}
    return this.save()
}


user.methods.removeCartItem = async function(id){
    let items =  [...this.cart.items]
    const idx = items.findIndex(i => {
        return i.courseId.toString() === id.toString()
    })

    if(items[idx].count > 1){
        items[idx].count--
    }else{
        items = items.filter(i => {
            return i.courseId.toString() !== id.toString()
        })
    }
    this.cart = {items}
    return this.save()

}
 

module.exports = model('User', user)