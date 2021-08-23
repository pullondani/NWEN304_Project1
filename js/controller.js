window.addEventListener("load", init);
function init() {

    clearAll();
    loadId();
    showTotal();
    bindEvents();
}

/* this function clears the contents of the form except the ID (since ID is auto generated)*/
function clearAll() {
    document.querySelector('#name').value = ''
    document.querySelector('#price').value = ''
    document.querySelector('#desc').value = ''
    document.querySelector('#color').value = ''
    document.querySelector('#url').value = ''
}

let auto = autoGen();

/* this function automatically sets the value of ID */
function loadId() {
    document.querySelector('#id').innerText = auto.next().value;
}

/* this function populates the values of #total, #mark and #unmark ids of the form */
function showTotal() {
    document.querySelector('#total').value = itemOperations.countTotalMarked()
}

function bindEvents() {
    document.querySelector('#remove').addEventListener('click', deleteRecords);
    document.querySelector('#add').addEventListener('click', addRecord);
    document.querySelector('#update').addEventListener('click', updateRecord)
    document.querySelector('#exchange').addEventListener('change', getExchangerate)
}

/* this function deletes the selected record from itemOperations and prints the table using the function printTable*/
function deleteRecords() {
    console.log('Attempting to delete record')
    itemOperations.remove()
    printTable()
}

/* this function adds a new record in itemOperations and then calls printRecord(). showTotal(), loadId() and clearAll()*/
function addRecord() {
    let id = document.querySelector('#id').innerText
    let name = document.querySelector('#name').value
    let price = document.querySelector('#price').value
    let desc = document.querySelector('#desc').value
    let color = document.querySelector('#color').value
    let url = document.querySelector('#url').value
    let item = new Item(id, name, price, desc, color, url)

    itemOperations.items.push(item)

    printRecord(item)
    showTotal()
    loadId()
    clearAll()
}

/*this function fills (calls fillFields()) the form with the values of the item to edit after searching it in items */
function edit() {
    let id = this.getAttribute('data-itemid');
    const item = itemOperations.search(id)

    fillFields(item)
}

/*this function fills the form with the details of itemObject*/
function fillFields(itemObject) {
    console.log('FILLING THE FIELDS', itemObject.price);
    document.querySelector('#id').innerText = itemObject.id
    document.querySelector('#name').value = itemObject.name
    document.querySelector('#price').value = itemObject.price
    document.querySelector('#desc').value = itemObject.desc
    document.querySelector('#color').value = itemObject.color
    document.querySelector('#url').value = itemObject.url
}

/* this function creates icons for edit and trash for each record in the table*/
function createIcon(className, fn, id) {
    // <i class="fas fa-trash"></i>
    // <i class="fas fa-edit"></i>
    var iTag = document.createElement("i");
    iTag.className = className;
    iTag.addEventListener('click', fn);
    iTag.setAttribute("data-itemid", id);

    return iTag;
}


/*this function updates the record that is edited and then prints the table using printTable()*/
function updateRecord() {
    let id = this.getAttribute('data-itemid');
    let item = itemOperations.search(id)
    print(item, this.getAttribute('data-itemid'))
    printTable()
}

/*this function toggles the color of the row when its trash button is selected and updates the marked and unmarked fields */
function trash() {
    let id = this.getAttribute('data-itemid');
    itemOperations.markUnMark(id);
    showTotal();
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    console.log("I am Trash ", this.getAttribute('data-itemid'))
}

/* this function calls printRecord for each item of items and then calls the showTotal function*/
function printTable(items) {
    for (item in items) {
        item.printRecord()
    }

    showTotal()
}

function printRecord(item) {
    var tbody = document.querySelector('#items');
    var tr = tbody.insertRow();
    var index = 0;
    for (let key in item) {
        if (key == 'isMarked') {
            continue;
        }
        let cell = tr.insertCell(index);
        cell.innerText = item[key];
        index++;
    }
    var lastTD = tr.insertCell(index);
    lastTD.appendChild(createIcon('fas fa-trash mr-2', trash, item.id));
    lastTD.appendChild(createIcon('fas fa-edit', edit, item.id));
}

/* this function makes an AJAX call to http://apilayer.net/api/live to fetch and display the exchange rate for the currency selected*/
function getExchangerate() {

}