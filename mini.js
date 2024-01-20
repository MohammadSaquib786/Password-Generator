const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const SymbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelector("input[type=checkbox]");
const Symbols = "`~!@#$%^&*()_{}[]|\'/?>,.<";


let password = "";
let passwordLength = 8;
let checkCount = 1;
handleSlider();
setIndicator("#ccc");

// Set Password length
function handleSlider(){
    console.log('hi');
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    
    const min = inputSlider.min; //0
    const max = inputSlider.max;//100
    console.log(min);

    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min)) + "% 100";
    // inputSlider.style.backgroundColor='red';
}


//SET INDICATOR..........
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxshadow = `0px 0px 12px 1px ${color}`;
}


function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
    
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
   return  String.fromCharCode (getRndInteger(97, 123));

}

function generateUpperCase(){
    return  String.fromCharCode (getRndInteger(65, 91));
 
}

function generateSymbol(){
    const randNum = getRndInteger(0, Symbols.length);
    return Symbols.charAt(randNum);

}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(SymbolsCheck.checked) hasSym = true;


    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    } else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ){
        setIndicator("#ff0");
    } else{
        setIndicator("#f00");
    }
}

 //Copy Massage Display Function......
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (error) {
        copyMsg.innerText = "Failed";
    }
    // To Make copy span visible..........
    copyMsg.classList.add("active");

    setTimeout( () =>{
        copyMsg.classList.remove("active");

    }, 2000);
}

function shufflePassword(array){
    //Fisher Yates Method....
    for( let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1 ));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = ""
    array.forEach((el) => (str += el));
    return str;
}


 //ALLcheckBox EventListener........
 
 function handleCheckBoxChange (){
    checkCount = 0;
    allCheckBox.forEach( (checkbox ) => {
        if(checkbox.checked)
        checkCount++;
    })

    //Special Condication.......
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
        }


 allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
        })
}

//  Slider EventListener...........
    inputSlider.addEventListener('input', (e) => {
        passwordLength = e.target.value;
        handleSlider();
    });


    copyBtn.addEventListener('click', () => {
        if(passwordDisplay.value)
        copyContent();
        
    });


 //Generate Password EventListener...........

generateBtn.addEventListener('click', () => {
            //None of the checkbox are Selectedd...........
            if(checkCount ==0 ) 
            return;

            if(passwordLength < checkCount){
                passwordLength = checkCount;
                handleSlider();
            }

            console.log("strating the jounrye......");
           //let`s Start the new password..........
           
           //Remove Old password
            password = "";

           //let`s put the stuff mentioned by the Checkboxes.....   

        //    if(uppercaseCheck.checked){
        //     password += generateUpperCase();
        //    }

        //    if(lowercaseCheckcaseCheck.checked){
        //     password += generateLowerCase();
        //    }
        
        //    if(numbersCheck.checked){
        //     password += generateRandomNumber();
        //    }

        //    if(SymbolsCheck.checked){
        //     password += generateSymbol();
        //    }


        let funcArr = [];

        if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

        if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

        if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

        if(SymbolsCheck.checked)
        funcArr.push(generateSymbol);

      //Compulsory Additions......
      for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
      }
       console.log("Compulsory..");
      //Remaning Addiations...
      for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("RANDiNDEX.........");
        password += funcArr[randIndex]();
      }

      console.log("REMANING.....");
      //Shuffle the Password.......
      password = shufflePassword(Array.from(password));
      console.log("Shuffleing Done......");
      // Show in UL
      passwordDisplay.value = password;
      console.log("UI done......");

    //Calculate Strength.....
    calcStrength();
})
