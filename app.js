//
// ─── ELEMENTS ───────────────────────────────────────────────────────────────────
//
let input = document.querySelector('#show'); //* Display
let btnNumbers = document.querySelectorAll(".num"); //* Number Buttons
let clearAllBtn = document.querySelector("#C"); //* Button C (Clear all the display)
let deleteBtn = document.querySelector('#delete'); //* Button < (Delete the last value)
let form = document.querySelector('form'); //* Form (contain all the buttons)
let values = []; //* Values ​​to calculate
let attr; //* The attribute of the operation
let regexp = /\s*[a-zA-Z]/; //* Regular expression to disallow letter writing
let btnOperation = document.querySelectorAll(".op"); //* All operation buttons
let dotBtn = document.querySelector("#dot"); //* Dot Button
let btnSwitch = document.querySelector('#switch'); //* Switch value button
let result; //* The total of the operation
let btnEqual = document.querySelector('#submit'); //* Equal button
let statusPikachu = document.querySelector('#state'); //*Status Pikachu (image)
let caption = document.querySelector('#caption'); //* The caption below the image 

//
// ─── BUTTONS ────────────────────────────────────────────────────────────────────
//

//*Number Buttons callback

btnNumbers.forEach(btn => {
    btn.addEventListener('click',(e)=>{
        greenLight();
        let valueNumb = btn.getAttribute('data-num');
        input.innerText += valueNumb ;
    });
});

   
//*Clear All Button callback

clearAllBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    input.innerText = "";
});

//* < Button (Delete 1 value) callback

deleteBtn.addEventListener('click',()=>{
    let newvalue = input.innerText.slice(0,-1);
    input.innerText = newvalue;
});

//? Prevent the page from reloading 

form.addEventListener('submit',(e)=>{
    e.preventDefault();
});

//? Get the operation buttons, their attribute and the first value entered.

btnOperation.forEach(element => {
    element.addEventListener('click',(e)=>{
       
        //* Attribute (operation)
        attr = e.target.getAttribute('data-op');
        
        if(!regexp.test(input.innerText)){ 
                        
            if(input.innerText != '' && input.innerText != '-'){ 

                yellowLight(); //* Change calculator state to processing
                values.push(Number(input.innerText)) //* Add new number to memory.
                input.innerText = '';
            };
        };
    });
});

//* Dot Button (.) callback

dotBtn.addEventListener('click',()=>{
    greenLight(); //* Change calculator state to writing
    let valueDot = dotBtn.getAttribute('data-sp');
    
    if(input.innerText === ''){ //* Add a dot at the beginning if I don't have a previous value
        input.innerText += 0+valueDot;
    }

    if(!input.innerText.includes('.')){ //* Only one dot in the display
        input.innerText += valueDot; 
    };
});

//* Switch value Button (+/-) callback

btnSwitch.addEventListener('click',()=>{
    
        if(input.innerText.includes('-') && input.innerText.charAt(0) == '-'){
            
            input.innerText = input.innerText.substr(1);

        }else{

            if(input.innerText.charAt(0) != '-'){

                input.innerText = '-'+input.innerText;

            }
        }
});

//* Equal Button callback

btnEqual.addEventListener('click',()=>{
    
    if(input.innerText != '' && values.length == 1){ //? I need a previous value to operate with first
        if(input.innerText != '-'){//? The negative operator cannot go alone 

            values.push(Number(input.innerText));
        }
    }

    if(values.length == 2 && attr != ''){ 

        operation(attr);
        let shortResult = String(result).substr(0, 8); //? Shorten the result within the screen 
        result= Number(shortResult);
        input.innerText = result ;
        blueLight();

        while(values.length > 0){ //? Reset of values ​​to operate again.
            values.pop();
            attr = '';
        } 
    };
});

//* Operation function

const operation = (attribute)=>{
    switch (attribute) {
        case 'add':
            result = values[0]+values[1]
            break;
        case 'divide':
            result = values[0]/values[1]
        break;
        
        case 'multiply':
            result = values[0]*values[1]
        break;
        
        case 'subtract':
            result = values[0]-values[1]
        break;

        default:
            break;
    };
};

//* Form callback (To validate errors)

form.addEventListener('click',()=>{
        
    if(input.innerText.length > 8){
        
        console.error('Syntax.error')
        input.innerText = 'Out.of.Memory';
        input.style.letterSpacing = '0px';
        input.style.fontSize = '1.8rem';
        redLight();
        
    };

    if(input.innerText == '-.'){
        input.innerText = 'Syntax.error';
        input.style.letterSpacing = '0px';
        input.style.fontSize = '1.8rem';
        redLight();
    }
});

//* Lights function

const greenLight = () =>{
    document.querySelector('.l-green').classList.remove('l-green-on');
    void document.querySelector('.l-green').offsetWidth;
    document.querySelector('.l-green').classList.add('l-green-on');
    input.style.letterSpacing = '2px'; //? Reset the values ​​after an error.
    input.style.fontSize = '2.5rem'; //? Reset the values ​​after an error.
}

const yellowLight = () =>{
    document.querySelector('.l-yellow').classList.remove('l-yellow-on');
    void document.querySelector('.l-yellow').offsetWidth;
    document.querySelector('.l-yellow').classList.add('l-yellow-on');
    statusPikachu.src = './assets/waiting.jpg'; //? Status Pikachu
    caption.innerText = `Calculating...`;
}

const redLight = () =>{
    document.querySelector('.l-red').classList.remove('l-red-on');
    void document.querySelector('.l-red').offsetWidth;
    document.querySelector('.l-red').classList.add('l-red-on');
    statusPikachu.src = './assets/error.jpg'; //? Status Pikachu
    caption.innerText = `Something it's wrong`;
    setTimeout(()=>{
        statusPikachu.src = './assets/idle.jpg'; //? Reset the values ​​after an error.
        caption.innerText = 'Calculate something'; //? Reset the values ​​after an error.
    },2000)
}

const blueLight = () =>{
    document.querySelector('.l-blue').classList.remove('l-blue-on');
    void document.querySelector('.l-blue').offsetWidth;
    document.querySelector('.l-blue').classList.add('l-blue-on');
    statusPikachu.src = './assets/success.jpg'; //? Status Pikachu
    caption.innerText = 'I gotcha!!!';
    setTimeout(()=>{
        statusPikachu.src = './assets/idle.jpg'; //? Reset the values ​​after an error.
        caption.innerText = 'Calculate something'; //? Reset the values ​​after an error.
    },1000)
}
