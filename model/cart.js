const fs = require('fs')
const path = require('path')



const p = path.join(__dirname, '..', 'data', 'cart.json')

class Cart {

    static async add(course){
        const cart = await Cart.fetch()
        const ind = cart.items.findIndex(el => el.id === course.id)

        if(cart.items[ind]){
            cart.items[ind].count++
        }else{
            course.count = 1
            cart.items.push(course)
        }

        cart.price = +cart.price + +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
                JSON.stringify(cart),
                (err) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }
            )
        })

    }

    static async fetch(){
        return await new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if(err){
                    return reject(err)
                }else{
                    return resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Cart