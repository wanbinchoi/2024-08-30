let displayValue = '';
let maxDigits = 10;
let history = [];
let clearCount = 0;

function updateDisplay(){
    document.getElementById('display').textContent = displayValue || '0';
}
function handleClear(){
    clearCount += 1;
    if(clearCount === 1){
        clearDisplay();
    }else if(clearCount === 2){
        clearHistory();
        clearCount = 0;
    }
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}
function clearHistory() {
    history = [];
    let historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
}
function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function inputNumber(num){
    if(displayValue.length < maxDigits){
        displayValue += num;
        updateDisplay();
    }
}
function inputOperator(operator){
    if(displayValue.length > 0 && !isNaN(displayValue.slice(-1))){
        displayValue += operator;
        updateDisplay();
    }
}
function inputDecimal() {
    if(displayValue.length < maxDigits && !displayValue.includes('.')){
        displayValue += '.';
        updateDisplay();
    }
}
function calculateResult(){
    try{
        let result = eval(displayValue);
        displayValue = String(result).slice(0, maxDigits);
        updateDisplay();
        saveHistory(displayValue);
    }catch(e){
        displayValue = 'Error';
        updateDisplay();
    }
}
function saveHistory(result) {
    history.push(result);
    let historyList = document.getElementById('historyList');
    let listItem = document.createElement('li');
    listItem.textContent = result;
    historyList.appendChild(listItem);
}
