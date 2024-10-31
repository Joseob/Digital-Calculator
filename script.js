let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}
function handleSymbol(symbol){
    switch(symbol){
        case 'AC':
            buffer = '0';
            runningTotal = 0;
            break;
        case 'FRAC':
            buffer = decimalToFraction(parseFloat(buffer));
            break;
        case '=':
            if (previousOperator == null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            break;
        case '←':
            if(buffer.length===1){
                buffer='0';
            }else{
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    });
    document.addEventListener('keydown', function (event) {
        const key = event.key;
        if (key === 'Enter') {
            buttonClick('=');
        } else if (key === 'Escape') {
            buttonClick('AC');
        } else if (key === 'Backspace') {
            buttonClick('←');
        } else if (!isNaN(key)) {
            buttonClick(key);
        }
    });
}

function decimalToFraction(decimal) {
    const tolerance = 1.0E-6;
    let numerator = 1; 
    let denominator = 1;
    let error = Math.abs(decimal - numerator / denominator);
    while (error > tolerance) {
        if (decimal > numerator / denominator) {
            numerator += 1;
        } else {
            denominator += 1;
        }
        error = Math.abs(decimal - numerator / denominator);
    }
    return `${numerator}/${denominator}`;
}


init();



