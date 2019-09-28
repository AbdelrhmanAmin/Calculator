const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display');

keys.addEventListener('click', e => {
  if (e.target.matches('button')){
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }
    if(
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
      ){
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          const calcValue = calculate(firstValue, operator, secondValue)
          display.textContent = calcValue
          calculator.dataset.firstValue = calcValue
        } else {
          calculator.dataset.firstValue = displayedNum
        }
        key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
      }
      if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.'
          console.log('work22')
        } if(
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          console.log('work11')
          display.textContent = '0.'
        }
      
        calculator.dataset.previousKeyType = 'decimal'
      }
      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum
      
        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
          }
          display.textContent = calculate(firstValue, operator, secondValue)
        }
      
        // Set modValue attribute
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
      }
      if (action === 'clear') {
        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = ''
          calculator.dataset.modValue = ''
          calculator.dataset.operator = ''
          calculator.dataset.previousKeyType = ''
        } else {
          key.textContent = 'AC'
        }
      
        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'
      }
        if (action !== 'clear') {
          const clearButton = calculator.querySelector('[data-action=clear]')
          clearButton.textContent = 'CE'
        }
      Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  }})
const calculate = (n1,opt,n2)=>{
  let result = '';
  let num1 = parseFloat(n1);
  let num2 = parseFloat(n2);
  if(opt === 'add'){ result = num1 + num2}
  if(opt === 'subtract'){result = num1 - num2}
  if(opt === 'multiply'){result = num1 * num2}
  if(opt === 'divide'){result = num1 / num2}
  return result;
}