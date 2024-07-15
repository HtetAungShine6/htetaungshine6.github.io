var quoationData = []
 
function addItem() {
    var d = $("#newItemDescription").val()
    var u = $("#newItemPPU").val()
    var q = $("#newItemQty").val()
    console.debug(d, u, q)
    quoationData.push({
        description: d,
        quantity: Number.parseFloat(q),
        unitPrice: Number.parseFloat(u)
    })
    $('#exampleModal').modal('hide')
    saveData();
    renderTable();
}
 
function renderTable() {
    var data = quoationData;
    var subTotal = 0;
    data.forEach((e) => {
        subTotal = subTotal + (e.unitPrice * e.quantity);
    });
    var vat = (subTotal * .07).toFixed(2);
    var total = subTotal * 1.07;
 
    console.log('subTotal', subTotal);
    $("#subTotal").html("" + subTotal);
    $("#vat").html("" + vat);
    $("#total").html("" + total);
 
    var dataRows = data.map((e, i) => {
        let amount = e.quantity * e.unitPrice;
        return `<tr class="data-row">
            <td class="text-center">${e.quantity}</td>
            <td class="data">
                <button onclick="deleteItem(${i})">X</button>
                ${e.description}
            </td>
            <td class="text-right">${e.unitPrice.toFixed(2)}</td>
            <td class="text-right">${amount.toFixed(2)}</td>
        </tr>`;                        
    });
 
    // Remove existing data rows
    $(".data-row").remove();
 
    // Insert new data rows into the tbody
    dataRows.forEach((r) => {
        $('#dataTable').append(r);  // Changed from `$('#quotationTable tbody').before(r)`
    });
}
 
function deleteItem(i) {
    quoationData.splice(i, 1);
    saveData();
    renderTable();
}
 
function saveData() {
    localStorage.setItem('quotationData', JSON.stringify(quoationData));
}
 
function loadData() {
    var data = localStorage.getItem('quotationData');
    if (data) {
        quoationData = JSON.parse(data);
    }
}
 
$(document).ready(function () {
    loadData();
    renderTable();
});