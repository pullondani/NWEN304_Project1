const itemOperations = {
    items: [],
    /* adds an item into the array items*/
    add(itemObject) {
        this.items.push(itemObject)
    },
    /* removes the item which has the "isMarked" field set to true*/
    remove() {
        const ind = this.items.findIndex(item => item.isMarked)
        console.log(ind);
        this.items.splice(ind, 1)
    },
    /* searches the item with a given argument id */
    search(id) {
        return this.items.find(item => item.id === id)
    },
    /* toggle the isMarked field of the item with the given argument id*/
    markUnMark(id) {
        this.items.find(item => item.id === id).toggle()
    },
    /* counts the total number of marked items */
    countTotalMarked() {
        var total = 0
        this.items.forEach(item => { if (item.isMarked) total += 1 })
        return total
    },

}