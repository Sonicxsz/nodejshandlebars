document.querySelectorAll('.price').forEach(node => {
    node.textContent = getCurrency(node.textContent)
})

function getCurrency(price){
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}



const cardRoot = document.querySelector('#cart-root')


if(cardRoot){
    cardRoot.addEventListener('click', (e) => {
        if(e.target.classList.contains('delete')){
            const id = e.target.dataset.id
            fetch('/cart/delete/' + id,{
                method: 'delete'
            })
            .then(data => data.json())
            .then(data => {
                if(data.items.length){
                    const html = data.items.map(i => {
                        return `
                        <tr>
                            <td class="title">${i.title}</td>
                            <td><span class="price">${getCurrency(i.price)}</span></td>
                            <td class="title">${i.count}шт</td>
                            <td><button class="btn btn-success delete" data-id="${i.id}">Удалить</button></td>
                        </tr>
                        `
                    }).join('')
                    cardRoot.querySelector('tbody').innerHTML = html
                    cardRoot.querySelector('.cart-price .price').textContent = getCurrency(data.price)
                }else{
                    cardRoot.innerHTML =`<h2>Корзина пуста</h2>`
                }
              })
        }
    })
}