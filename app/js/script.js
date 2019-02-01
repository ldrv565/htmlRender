window.onload = function () {
    app = create("app")
    document.body.appendChild(app)
    aside = create("aside")
    app.appendChild(aside)
    main = create("main")
    app.appendChild(main)

    box = create("box").addChild("head").addChild("body")
    aside.appendChild(box)

    bag = create("bag").addChild("mini").addChild("window")
    bag.mini.innerHTML = "2 items 1000$"
    box.head.appendChild(bag)

    card = createCard().mix(bag)
    bag.window.appendChild(card)

    card = createCard().mix(bag)
    bag.window.appendChild(card)

    card = createCard().mix(bag)
    bag.window.appendChild(card)

    bag.window.addChild("row")

    toggleModifier(bag.window, "--active")

    console.log(card)
}

createCard = function () {
    card = create("card").addChild("image").addChild("body")
    card.body.addChild("price").addChild("name").addChild("text").addChild("btns_box")
    card.price.innerHTML = "$123"
    card.name.innerHTML = "Iphone X"
    card.text.innerHTML = "Количество: "
    card.btns_box.appendChild(createCounter())
    card.btns_box.appendChild(createButton("delete"))
    return card
}

createCounter = function () {
    counter = create("counter").addChild("decrementer").addChild("value", "input").addChild("incrementer")
    counter.decrementer.innerHTML = "-"
    counter.incrementer.innerHTML = "+"
    return counter
}

createButton = function (inner) {
    button = create("button")
    button.innerHTML = inner
    return button
}


create = function (block, element, modifier, tag) {
    let component = document.createElement(tag || "div")
    if (typeof (block) === "string") {
        component.className = block
        component.addChild = function (childName, tag) {
            childComponent = create(component, childName, undefined, tag)
            component[childName] = childComponent
            component.appendChild(childComponent)
            childComponent.addChild = function (grandchildName) {
                grandchild = create(component, grandchildName)
                component[grandchildName] = grandchild
                childComponent.appendChild(grandchild)
                return childComponent
            }
            return component
        }
        component.mix = function (parent) {
            component.className = parent.className + "__" + component.className + " " + component.className
            return component
        }
    } else {
        component.className = block.className
    }
    component.className += element && ("__" + element) || ""
    component.className += modifier && (" --" + modifier) || ""

    return component
}

toggleModifier = function (component, modifier) {
    component.classList.toggle(modifier)
}