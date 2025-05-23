const BASE_URL = "https://api.currencylayer.com/convert?access_key=e411b1507dd825ccb20ccc7300ab1dcd"
const dropDowns = document.querySelectorAll(".drop-down select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropDowns){
  for (currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
      }
    select.append(newOption);
  }
  select.addEventListener("change" , (evt) =>{
    updateFlag(evt.target);
  })
}


const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img"); 
  img.src = newSrc;
}

btn.addEventListener("click" , async (event) =>{
  event.preventDefault();
  let amount = document.querySelector(".amount input");
  let amntVal = amount.value;
  if(amntVal === "" || amntVal < 1){
      amntVal = 1;
      amntVal.value = "1";
  }

  const URL = `${BASE_URL}&from=${fromCurr.value}&to=${toCurr.value}&amount=${amntVal}`
  let response = await fetch(URL)
  let data = await response.json();
  let rate = data.result;
  msg.innerText = `${amntVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
  
});
