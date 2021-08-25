const itemOperations = {
    items: [],
    /* adds an item into the array items*/
    add(itemObject) {
        this.items.push(itemObject)
    },
    /* removes the item which has the "isMarked" field set to true*/
    remove() {
        this.items.forEach((item, i) => { if (item.isMarked) this.items.splice(i, 1) })
    },
    /* searches the item with a given argument id */
    search(id) {
        return this.items.find(item => item.id === id)
    },
    /* toggle the isMarked field of the item with the given argument id*/
    markUnMark(id) {
        let item = this.items.find(item => item.id === id)
        if (item) item.toggle()
    },
    /* counts the total number of marked items */
    countTotalMarked() {
        var total = 0
        this.items.forEach(item => { if (item.isMarked) total += 1 })
        return total
    },

}