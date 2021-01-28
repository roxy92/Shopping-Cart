buttonActionHandller('phone-buttons');
buttonActionHandller('case-buttons');
updateGrandTotalSection();
activatingDeleteButton();

function buttonActionHandller(targetSectionID){

    let selectedGroup = document.getElementById(targetSectionID);

    //targeting related plus & minus buttons
    let btns = selectedGroup.querySelectorAll('button');

    //targeting related counter
    let itemCounter = selectedGroup.querySelector('.item-counter');

    //targeting related price section
    let itemPrice = selectedGroup.querySelector('.item-price');

    //storing per unit price on stat-up
    const unitPrice = parseFloat(itemPrice.innerText);

    //adding click events on buttons
    for (let i=0; i<btns.length; i++){
        btns[i].addEventListener('click', function () {

            let delta = 1;

            if(this.firstElementChild.classList.contains('fa-minus')){
                delta = -1;
            }

            let currentCounter = parseFloat(itemCounter.value);

            if(currentCounter === 0 && delta === -1){
                return;
            }

            currentCounter = currentCounter + delta;

            itemCounter.value = currentCounter;

            itemPrice.innerText = unitPrice * currentCounter;

            updateGrandTotalSection();

        })
    }

}

function updateGrandTotalSection(){
    //targeting ToTal Calculation Section

    let subTotal = document.getElementById('subTotal');

    let tax = document.getElementById('tax');

    let taxRate = document.getElementById('tax-rate');

    let grandTotal = document.getElementById('grandTotal');

    let currentSubtotal = 0;
    let taxRateValue = parseFloat(taxRate.innerText);

    document.querySelectorAll('.item-price').forEach(function (item) {
        currentSubtotal  = currentSubtotal + parseFloat(item.innerText);
    })

    let currentTax = parseFloat(currentSubtotal * 5/100);

    subTotal.innerText = currentSubtotal;
    tax.innerText = currentTax;

    grandTotal.innerText = (currentSubtotal + currentTax);
}

function activatingDeleteButton() {
    document.querySelectorAll('.remove-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var targetRow = item.closest('.cart-item');
            targetRow.parentElement.removeChild(targetRow);
            updateGrandTotalSection();
        })
    })
}