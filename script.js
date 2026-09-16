const itemNameInput = document.getElementById('itemNameInp');
const itemPriceInput = document.getElementById('itemPriceInp');
const tableforItemNPDisplay = document.getElementById('tableforItemNPDisplay')
const calculateSumOfPrice = document.getElementById('calculateSumOfPrice');
const displaySumofCalculations = document.getElementById('displaySumofCalculations');
const forItemsNameTeller = document.getElementById('forItemsNameTeller');
const tablePannel = document.getElementById('table-pannel')
const summaryPannel = document.getElementById('summary-pannel')
const addItemButton = document.getElementById('addItemButton');
const buttonToImportFile = document.getElementById('buttonToImportFile');
const inputToImportFile = document.getElementById('inputToImportFile');
const buttonToEditPrimeDiamonds = document.getElementById('buttonToEditPrimeDiamonds');
const buttonToExportFile = document.getElementById('buttonToExportFile');
const userUIDForDisplay = document.getElementById('userUIDForDisplay');

const contentForPrimeDiamonds = `
Please Enter Your Prime Score for Better Experience of All Features.`

const contentForGetingUserUID = `
Please Enter your UID to ensure your ID Vault.

Note: This UID will be Exported with the File and you can change it any Time.`

const vaultKey1 = 'MyVaultData'
const numbersOnly = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const anchor1 = document.createElement('a');

let itemNamesArr = [];
let itemPricesArr = [];
let totalSum = 0;
let price = 0;
let indexNum = 0
let isEdit = false
let indexToEdit = 0;
let userDiamonds = 0
let unitedCombineBothArr = [];
let canISendReq = true
let isUserWantedSum = false
let forEnteringUserUID = false
let isUserWritingPrimeDiamonds = false
let UserUIDIdentity = '8292133641';

function checkisItem(paramItem) {
    let paramItemValue = paramItem.value.trim()
    if (paramItemValue !== '') {
        return paramItemValue
    }
    else {
        console.log('Item Name & Price is Required.')
        return ''
    }
}

function addItemName() {
    let verify = checkisItem(itemNameInput)
    if (verify !== '') {
        itemNamesArr.push(verify)
    }
    console.log(itemNamesArr)
}

function addItemPrice() {
    let verify = checkisItem(itemPriceInput)
    if (verify !== '') {
        itemPricesArr.push(verify)
    }
    console.log(itemPricesArr)
}

function writeItem() {
    if (itemNamesArr.length == 0 && itemPricesArr.length == 0) {
        return
    }
    tableforItemNPDisplay.innerHTML = ''
    if (itemNamesArr.length != 0) {
        tableforItemNPDisplay.innerHTML = `<tr style='margin-bottom: 4px;'><th class='tdForBorder'>Name</th><th class='tdForBorder'>Price</th></tr>`
    }
    for (let ini = 0; ini < itemNamesArr.length; ini++) {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        td1.innerHTML = itemNamesArr[ini]
        td2.innerHTML = itemPricesArr[ini]
        td3.innerHTML = 'X'
        td4.innerHTML = 'Edit'
        td1.classList = 'tdForBorder'
        td2.classList = 'tdForBorder'
        td3.classList = 'tdForSide'
        td4.classList = 'tdForSide'
        td4.style.color = 'green'
        td3.style.color = 'red'
        td3.addEventListener('click', () => { deleteElements(ini) })
        td4.addEventListener('click', () => { enableEditMode(ini) })
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td4)
        tr.appendChild(td3)
        tableforItemNPDisplay.appendChild(tr)
    }
}

function handleMatchingArr() {
    let namelen = itemNamesArr.length
    let pricelen = itemPricesArr.length
    if (namelen < pricelen) {
        itemPricesArr.pop()
    }
    else if (namelen > pricelen) {
        itemNamesArr.pop()
    }
    else {
        setDefaultValue()
    }
}

function calculateSum() {
    totalSum = 0
    itemPricesArr.forEach((price) => {
        totalSum = totalSum + parseInt(price)
    })
    console.log(totalSum)
}

function writeCalculatedSum() {
    if (userDiamonds !== 0) {
        calculateSum()
        if (itemNamesArr.length != 0) {
            displaySumofCalculations.innerHTML = totalSum
            displayAddedItemsQuantity()
        }
    }
    else if (userDiamonds === 0) {
        isUserWantedSum = true
        handlePrompts(contentForPrimeDiamonds)
    }
}

function mostExpensiveItem() {
    for (let ine = 0; ine < itemNamesArr.length; ine++) {
        if (parseInt(itemPricesArr[ine]) > parseInt(price)) {
            price = parseInt(itemPricesArr[ine])
            indexNum = ine
        }
    }
    return itemNamesArr[indexNum]
}

function mostCheapItem() {
    for (let ine = 0; ine < itemNamesArr.length; ine++) {
        if (parseInt(itemPricesArr[ine]) < parseInt(price)) {
            price = parseInt(itemPricesArr[ine])
            indexNum = ine
        }
    }
    return itemNamesArr[indexNum]
}

function displayAddedItemsQuantity() {
    let tempValueIn1 = (userDiamonds - totalSum) > 0 ? `Your Wasted Diamonds: ${userDiamonds} - ${totalSum} = ${userDiamonds - totalSum}` : `You have Expected More Diamonds: ${totalSum} - ${userDiamonds} = ${totalSum - userDiamonds}`
    forItemsNameTeller.innerHTML = ''
    forItemsNameTeller.innerHTML = `
    Total Items: ${itemNamesArr.length}
    <br>
    Most Expensive Item: ${mostExpensiveItem()} of ${price} ${(price > 1) ? 'Diamonds' : 'Diamond'}
    <br>
    Most Cheap Item: ${mostCheapItem()} of ${price} ${(price > 1) ? 'Diamonds' : 'Diamond'}
    <br>
    ${tempValueIn1}
    `
}

function deleteName(deleteNameIndex) {
    itemNamesArr.splice(deleteNameIndex, 1)
}

function deletePrice(deletePriceIndex) {
    itemPricesArr.splice(deletePriceIndex, 1)
}

function deleteElements(deleteMe) {
    deleteName(deleteMe)
    deletePrice(deleteMe)
    writeItem()
    writeCalculatedSum()
    blocker()
    if (parseInt(deleteMe) == parseInt(indexToEdit)) {
        isEdit = false
        addItemButton.value = 'Add Item'
        setDefaultValue()
    }
    VerifyIsExportable()
}

function blocker() {
    if (itemNamesArr.length == 0 && itemPricesArr.length == 0) {
        calculateSumOfPrice.style.display = 'none'
        tablePannel.style.display = 'none'
        summaryPannel.style.display = 'none'
    }
    else if (itemNamesArr.length != 0 && itemPricesArr.length != 0) {
        calculateSumOfPrice.style.display = ''
        tablePannel.style.display = ''
        summaryPannel.style.display = ''
    }
}

function enableEditMode(valueToEdit) {
    addItemButton.value = 'Edit Item'
    itemNameInput.value = itemNamesArr[valueToEdit]
    itemPriceInput.value = itemPricesArr[valueToEdit]
    isEdit = true
    indexToEdit = parseInt(valueToEdit)
    return valueToEdit
}

function handlePrompts(content, anyTempValue) {
    if (isUserWritingPrimeDiamonds == true) {
        if (userDiamonds == 0) {
            anyTempValue = anyTempValue ? `\n Diamond Points you entered Before: ${anyTempValue}` : ''
            let tempValue = prompt(`${content}${anyTempValue}`)
            checkIsOnlyNumbersInPrompt(tempValue, userDiamonds, content)
            if (isUserWantedSum == true) {
                writeCalculatedSum()
                isUserWantedSum = false
                VerifyIsPrimeDiamonds()
            }
        }
        isUserWritingPrimeDiamonds = false
    }
    if (forEnteringUserUID == true) {
        let tempValueC = prompt(`${content}`)
        userUIDForDisplay.innerHTML = tempValueC
        forEnteringUserUID = false
    }
}

function checkIsOnlyNumbersInPrompt(tempValue, userDiamond, tempContent) {
    if (parseInt(tempValue) == tempValue) {
        userDiamonds = tempValue
        isUserWritingPrimeDiamonds = false
    }
    else if (tempValue == null) {
        isUserWantedSum = false
        isUserWritingPrimeDiamonds = false
        userDiamonds = userDiamond
        return
    }
    else if (parseInt(tempValue) !== tempValue) {
        isUserWantedSum = false
        userDiamonds = 0
        handlePrompts(tempContent)
    }
}

function VerifyIsPrimeDiamonds() {
    if (userDiamonds == 0) {
        buttonToEditPrimeDiamonds.style.display = 'none'
    }
    else if (userDiamonds > 0) {
        buttonToEditPrimeDiamonds.style.display = ''
    }
}

function handleAddition() {
    addItemName()
    addItemPrice()
    handleMatchingArr()
    writeItem()
    blocker()
    if (canISendReq == true) {
        isUserWritingPrimeDiamonds = true
        handlePrompts(contentForPrimeDiamonds)
        console.log('Request Gone.')
        isUserWritingPrimeDiamonds = false
    }
    buildArray3ToCombineArr1andArr2()
    exportArrayInJSON()
    VerifyIsPrimeDiamonds()
    VerifyIsExportable()
    if (forItemsNameTeller.innerHTML !== '') {
        writeCalculatedSum()
    }
    canISendReq = false
    console.clear()
}

function buildArray3ToCombineArr1andArr2() {
    unitedCombineBothArr = itemNamesArr.map((itemName, index) => {
        return { itemName: itemName, itemPrice: itemPricesArr[index] }
    })
    console.log(unitedCombineBothArr)
}

function exportArrayInJSON() {
    const exportData = [...unitedCombineBothArr, UserUIDIdentity]
    let jsonDataOfArr3 = JSON.stringify(exportData, null, 2)
    // importFromJSONExport(jsonDataOfArr3)
    const blob = new Blob([jsonDataOfArr3], { type: 'application/json' })

    const downloadURL = URL.createObjectURL(blob)

    anchor1.href = downloadURL;
    anchor1.download = `arr3${Math.floor(2032434 + Math.random() * 3243434)}.json`
    anchor1.style.color = 'white'
    anchor1.style.textDecoration = ''
    buttonToExportFile.appendChild(anchor1)
}

function importFromJSONExport(param) {
    const file = param.target.files[0]

    if (!file) return;

    const reader = new FileReader()

    reader.readAsText(file)

    reader.onload = (e) => {
        const content = e.target.result;
        console.log('filename: ', file.name)
        console.log(content)
        extractArrayFromImport(content)
    }
}

function extractArrayFromImport(param) {
    const jsonData = JSON.parse(param)
    getUserUIDFromJSON(jsonData)
    putJSONDataInNameArr(jsonData)
    putJSONDataInPriceArr(jsonData)
    handleMatchingArr()
    handleAddition()
    if (forItemsNameTeller.innerHTML !== '') {
        writeCalculatedSum()
    }
}

function putJSONDataInNameArr(jsonData) {
    for (let uni = 0; uni < jsonData.length; uni++) {
        let currently = jsonData[uni].itemName
        if (currently) {
            itemNamesArr.push(currently)
            console.log(uni, currently)
            console.log('_______-')
        }
    }
    console.log('mayName')
}

function putJSONDataInPriceArr(jsonData) {
    for (let uni = 0; uni < jsonData.length; uni++) {
        let currently = jsonData[uni].itemPrice
        if (currently) {
            itemPricesArr.push(currently)
            console.log(uni, currently)
            console.log('_______-')
        }
    }
    console.log('mayPrice')
}

function writeEdit() {
    writeItem()
    if (forItemsNameTeller.innerHTML !== '') {
        writeCalculatedSum()
    }
}

function handleEdit() {
    if (itemNameInput.value != '' && itemPriceInput.value !== '') {
        itemNamesArr[indexToEdit] = itemNameInput.value.trim()
        itemPricesArr[indexToEdit] = itemPriceInput.value.trim()
    }
    isEdit = false
    addItemButton.value = 'Add Item'
    writeEdit()
}

function getUserUIDFromJSON(param) {
    let newEditedParamTempVar = (parseInt(param.length)) - 1
    UserUIDIdentity = String(param[newEditedParamTempVar])
    userUIDForDisplay.textContent = UserUIDIdentity
}

function handleFunctions() {
    if (isEdit == false) {
        handleAddition()
    }
    else if (isEdit == true) {
        handleEdit()
    }
}

function setDefaultValue() {
    itemNameInput.value = ''
    itemPriceInput.value = ''
}

function VerifyIsExportable() {
    if (itemNamesArr.length == 0) {
        buttonToExportFile.style.display = 'none'
    }
    else if (itemNamesArr.length > 0) {
        buttonToExportFile.style.display = ''
    }
}

function StarterFunctions() {
    blocker()
    VerifyIsPrimeDiamonds()
    VerifyIsExportable()
    console.clear()
}

function handleUserUID() {
    forEnteringUserUID = true
    handlePrompts(contentForGetingUserUID, '2')
    if (userUIDForDisplay.textContent.trim() !== '') {
        UserUIDIdentity = userUIDForDisplay.textContent.trim()
    }
    console.log(UserUIDIdentity)
    forEnteringUserUID = false
}

itemPriceInput.addEventListener('keypress', (e) => {
    console.log(e.key)
    if ((parseInt(e.key) in numbersOnly) == false) {
        e.preventDefault()
    }
    if (e.key == 'Enter') {
        handleAddition()
    }
})

userUIDForDisplay.addEventListener('click', () => {
    handleUserUID()
})

calculateSumOfPrice.addEventListener('click', () => {
    isUserWritingPrimeDiamonds = true
    writeCalculatedSum()
    isUserWritingPrimeDiamonds = false
})

buttonToImportFile.addEventListener('click', () => {
    inputToImportFile.click()
})

inputToImportFile.addEventListener('change', (event) => {
    importFromJSONExport(event)
})

buttonToExportFile.addEventListener('click', () => {
    buildArray3ToCombineArr1andArr2()
    exportArrayInJSON()
    anchor1.click()
})

buttonToEditPrimeDiamonds.addEventListener('click', () => {
    isUserWritingPrimeDiamonds = true
    let tempValue = userDiamonds
    userDiamonds = 0;
    handlePrompts(contentForPrimeDiamonds, tempValue);
    isUserWritingPrimeDiamonds = false
    if (forItemsNameTeller.innerHTML !== '') {
        writeCalculatedSum()
    }
})

StarterFunctions()