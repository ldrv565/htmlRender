window.onload = function () {
    capp = document.createElement("div")
    capp.className = "app"
    document.body.appendChild(capp)
    aside = document.createElement("aside")
    aside.className = "aside"
    capp.appendChild(aside)
    main = document.createElement("main")
    main.className = "main"
    capp.appendChild(main)
    footer = document.createElement("main")
    footer.className = "footer"
    capp.appendChild(footer)

    box = document.createElement("div")
    box.className = "box"
    aside.appendChild(box)
    box__head = document.createElement("div")
    box__head.className = "box__head"
    box.appendChild(box__head)
    box__body = document.createElement("div")
    box__body.className = "box__body"
    box.appendChild(box__body)

    renderBag()

    text = document.createElement("p")
    text.innerHTML = "Quick shop"
    box__body.appendChild(text)

    search = document.createElement("div")
    search.className = "search"
    box__body.appendChild(search)
    search__input = document.createElement("input")
    search__input.className = "search__input"
    search__input.onchange = function () {
        renderCards()
    }
    search.appendChild(search__input)
    search__button = document.createElement("button")
    search__button.className = "search__button"
    search__button.innerHTML = "🔍"
    search.appendChild(search__button)

    box = document.createElement("div")
    box.className = "box"
    aside.appendChild(box)
    box__head = document.createElement("div")
    box__head.className = "box__head"
    box__head.innerHTML = "Brand"
    box.appendChild(box__head)
    box__body = document.createElement("div")
    box__body.className = "box__body"
    box.appendChild(box__body)

    list = document.createElement("div")
    list.className = "list"
    box__body.appendChild(list)

    brands.forEach(function (element) {
        list__item = document.createElement("div")
        list__item.className = "list__item"
        list__item.innerHTML = element.name
        list__item.onclick = function () {
            this.classList.toggle("--active")
            element.selected = !element.selected
            renderCards()
        }
        list.appendChild(list__item)
    })

    renderCards()

    modal = document.createElement("div")
    modal.className = "modal"
    modal.onclick = function () {
        if (event.target.classList == "modal --active") {
            this.classList.toggle("--active")
        }
    }
    footer.appendChild(modal)
    modal__window = document.createElement("div")
    modal__window.className = "modal__window"
    modal.appendChild(modal__window)
}

calculate = function () {
    let totalCost = 0
    bagCards.forEach(function (element) {
        totalCost += cards[element.productID].price * element.count
    })
    return totalCost
}

var bagActivated = false

renderBag = function () {
    document.getElementsByClassName("box__head")[0].innerHTML = ""
    bag = document.createElement("div")
    bag.className = "bag"
    document.getElementsByClassName("box__head")[0].appendChild(bag)
    bag__mini = document.createElement("div")
    bag__mini.className = "bag__mini"
    bag__mini.onclick = function () {
        bag__window.classList.toggle("--active")
        bagActivated = !bagActivated
    }
    bag__mini.innerHTML = bagCards.length + " items - " + calculate() + " ш.м."
    bag.appendChild(bag__mini)
    bag__window = document.createElement("div")
    bag__window.className = "bag__window"
    bagActivated && (bag__window.className += " --active")
    bag.appendChild(bag__window)

    bagCards.forEach(function (element, i) {
        card = document.createElement("div")
        card.className = "bag__card card"
        bag__window.appendChild(card)
        card__image = document.createElement("div")
        card__image.className = "card__image"
        card.appendChild(card__image)
        img = document.createElement("img")
        img.src = cards[element.productID].imgSrc
        img.alt = "phone"
        card__image.appendChild(img)
        card__body = document.createElement("div")
        card__body.className = "card__body"
        card.appendChild(card__body)
        card__price = document.createElement("div")
        card__price.className = "card__price"
        card__price.innerHTML = cards[element.productID].price + " ш.м."
        card__body.appendChild(card__price)
        card__name = document.createElement("div")
        card__name.className = "card__name"
        card__name.innerHTML = cards[element.productID].name
        card__body.appendChild(card__name)
        card__text = document.createElement("div")
        card__text.className = "card__text"
        card__text.innerHTML = cards[element.productID].description
        card__body.appendChild(card__text)
        card__text = document.createElement("div")
        card__text.className = "card__text"
        card__text.innerHTML = "Count:"
        card__body.appendChild(card__text)
        card__btns_box = document.createElement("div")
        card__btns_box.className = "card__btns_box"
        card__body.appendChild(card__btns_box)
        counter = document.createElement("div")
        counter.className = "counter"
        card__btns_box.appendChild(counter)
        counter__decrementer = document.createElement("div")
        counter__decrementer.className = "counter__decrementer"
        counter__decrementer.innerHTML = "-"
        counter__decrementer.onclick = function () {
            if (element.count) {
                element.count--
                renderBag()
            }
        }
        counter.appendChild(counter__decrementer)
        counter__value = document.createElement("input")
        counter__value.className = "counter__value"
        counter__value.value = element.count
        counter__value.onchange = function () {
            element.count = this.value
            renderBag()
        }
        counter.appendChild(counter__value)
        counter__incrementer = document.createElement("div")
        counter__incrementer.className = "counter__incrementer"
        counter__incrementer.innerHTML = "+"
        counter__incrementer.onclick = function () {
            element.count++
            renderBag()
        }
        counter.appendChild(counter__incrementer)
        button = document.createElement("div")
        button.onclick = function () {
            bagCards.splice(i, 1)
            renderBag()
        }
        button.className = "button"
        button.innerHTML = "delete"
        card__btns_box.appendChild(button)
    });

    bag__row = document.createElement("div")
    bag__row.className = "bag__row"
    bag__window.appendChild(bag__row)
    text = document.createElement("div")
    text.innerHTML = "Всего"
    bag__row.appendChild(text)
    totalCost = document.createElement("div")
    totalCost.className = "totalCost"
    totalCost.innerHTML = calculate() + " шоколадных монет"
    bag__row.appendChild(totalCost)
    bag__row = document.createElement("div")
    bag__row.className = "bag__row"
    bag__window.appendChild(bag__row)
    button = document.createElement("div")
    button.className = "button --darkblue"
    button.innerHTML = "Оформить заказ"
    bag__row.appendChild(button)
}

renderCards = function () {
    document.getElementsByClassName("main")[0].innerHTML = ""
    selectedBrands = brands.filter(function (element) {
        return element.selected
    })
    cards.forEach(function (element, i) {
        if (selectedBrands.length) {
            if (!selectedBrands.find(function (selectedBrand) {
                    return selectedBrand.name == element.brand
                })) {
                return
            }
        }

        searchValue = document.getElementsByClassName("search__input")[0].value

        if (!(element.name.indexOf(searchValue) + 1)) {
            return
        }

        card = document.createElement("div")
        card.className = "card"
        main.appendChild(card)
        card__image = document.createElement("div")
        card__image.className = "card__image"
        card.appendChild(card__image)
        img = document.createElement("img")
        img.src = element.imgSrc
        img.alt = "phone"
        card__image.appendChild(img)
        card__body = document.createElement("div")
        card__body.className = "card__body"
        card.appendChild(card__body)
        card__title = document.createElement("div")
        card__title.className = "card__title"
        card__body.appendChild(card__title)
        card__name = document.createElement("div")
        card__name.className = "card__name"
        card__name.innerHTML = element.name
        card__title.appendChild(card__name)
        card__price = document.createElement("div")
        card__price.className = "card__price"
        card__price.innerHTML = element.price + " ш.м."
        card__title.appendChild(card__price)
        card__text = document.createElement("div")
        card__text.className = "card__text"
        card__text.innerHTML = element.description
        card__body.appendChild(card__text)
        card__btns_box = document.createElement("div")
        card__btns_box.className = "card__btns_box"
        card__body.appendChild(card__btns_box)
        button = document.createElement("div")
        button.className = "button --darkblue"
        button.onclick = function () {
            bagCard = bagCards.find(function (element) {
                if (element.productID == i) {
                    return element
                }
            })
            if (bagCard) {
                bagCard.count++
            } else {
                bagCards.push({
                    productID: i,
                    count: 1,
                })
            }
            renderBag()
        }
        button.innerHTML = "Buy now!"
        card__btns_box.appendChild(button)
        button = document.createElement("div")
        button.className = "button"
        button.innerHTML = "More"
        button.onclick = function () {
            renderModal(element, i)
        }
        card__btns_box.appendChild(button)
    });
}

renderModal = function (element, i) {
    modal__window = document.getElementsByClassName("modal__window")[0]
    modal__window.innerHTML = ""
    modal = document.getElementsByClassName("modal")[0]
    modal.classList.toggle("--active")

    card = document.createElement("div")
    card.className = "modal__card card"
    modal__window.appendChild(card)
    card__image = document.createElement("div")
    card__image.className = "card__image"
    card.appendChild(card__image)
    img = document.createElement("img")
    img.src = element.imgSrc
    img.alt = "phone"
    card__image.appendChild(img)
    card__body = document.createElement("div")
    card__body.className = "card__body"
    card.appendChild(card__body)
    card__title = document.createElement("div")
    card__title.className = "card__title"
    card__body.appendChild(card__title)
    card__name = document.createElement("div")
    card__name.className = "card__name"
    card__name.innerHTML = element.name
    card__title.appendChild(card__name)
    card__price = document.createElement("div")
    card__price.className = "card__price"
    card__price.innerHTML = element.price + " ш.м."
    card__title.appendChild(card__price)
    card__text = document.createElement("div")
    card__text.className = "card__text"
    card__text.innerHTML = element.description
    card__body.appendChild(card__text)
    card__btns_box = document.createElement("div")
    card__btns_box.className = "card__btns_box"
    card__body.appendChild(card__btns_box)
    button = document.createElement("div")
    button.className = "button --darkblue"
    button.onclick = function () {
        bagCard = bagCards.find(function (element) {
            if (element.productID == i) {
                return element
            }
        })
        if (bagCard) {
            bagCard.count++
        } else {
            bagCards.push({
                productID: i,
                count: 1,
            })
        }
        renderBag()
    }
    button.innerHTML = "Buy now!"
    card__btns_box.appendChild(button)
}


cards = [{
        imgSrc: "img/man.jpg",
        price: 527 * 30,
        name: "Айфон стетхам",
        description: "убийца",
        brand: "гучи",
    },
    {
        imgSrc: "img/man1.jpg",
        price: 115 * 30,
        name: "Айфон шварцнегер",
        description: "машина",
        brand: "эппл",
    },
    {
        imgSrc: "img/man3.jpg",
        price: 12 * 30,
        name: "Айфон жанклод",
        description: "вандам",
        brand: "адик",
    },
    {
        imgSrc: "img/man2.jpg",
        price: 15 * 30,
        name: "Айфон Макконахи",
        description: "номер 1 в россии",
        brand: "xiaomi",
    }
]

bagCards = [{
        productID: 0,
        count: 1,
    },
    {
        productID: 1,
        count: 2,
    },
]

brands = [{
        name: "гучи",
        selected: false
    },
    {
        name: "xiaomi",
        selected: false
    },
    {
        name: "эппл",
        selected: false
    },
    {
        name: "адик",
        selected: false
    },
]