let seatCount = 0;
let totalPrice = 0;
let grandTotal = 0;
let discount = 0;
let totalDiscount = 0;
let seatsLeft = 40;
let couponActive = false;
const numberInput = document.getElementById("number");
const seatAvailability = [];
for (let i = 0; i < 40; i++) {
  seatAvailability.push(false);
}

function jumpToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

function buttonPressed() {
  const clickedButtonId = event.target.id;
  if (seatAvailability[clickedButtonId] === false) {
    if (seatCount > 3) {
      alert("Maximum limit reached");
      limitReached();
    } else {
      select(clickedButtonId);
      if(!couponActive){
        couponButtonAvailability()
      }
      nextButtonAvailability();
    }
  } else if (seatAvailability[clickedButtonId] === true) {
    deselect(clickedButtonId);
    if(!couponActive){
      couponButtonAvailability()
    }
    nextButtonAvailability();
  }
}

function select(clickedButtonId) {
  seatAvailability[clickedButtonId] = true;
  seatCount++;
  seatsLeft--;
  totalPrice += 550;
  grandTotalCalculation(discount);
  addButtonColorbyID(clickedButtonId);
  seatsSelectedCount();
  seatsLeftCount();
  totalPriceCount();
  if (couponActive) {
    selectElementbyID("total-discount", totalDiscount);
  }
  grandTotalCountDisplay();
  addTicketsInfo(clickedButtonId);
}

function deselect(clickedButtonId) {
  seatAvailability[clickedButtonId] = false;
  seatCount--;
  seatsLeft++;
  totalPrice -= 550;
  grandTotalCalculation(discount);
  removeButtonColorbyID(clickedButtonId);
  seatsSelectedCount();
  seatsLeftCount();
  totalPriceCount();
  if (couponActive) {
    selectElementbyID("total-discount", totalDiscount);
  }
  grandTotalCountDisplay();
  removeTicketsInfo(clickedButtonId);
}

function limitReached() {
  const clickedButtonId = event.target.id;
  if (seatAvailability[clickedButtonId] === true) {
    deselect(clickedButtonId);
  }
}

function addButtonColorbyID(id) {
  const button = document.getElementById(id);
  button.classList.add("bg-btnColor");
  button.classList.add("text-white");
}

function removeButtonColorbyID(id) {
  const button = document.getElementById(id);
  button.classList.remove("bg-btnColor");
  button.classList.remove("text-white");
}

function seatsSelectedCount() {
  selectElementbyID("seatsSelectedCount", seatCount);
}

function seatsLeftCount() {
  selectElementbyID("seats-left", seatsLeft);
}

function totalPriceCount() {
  selectElementbyID("total-price", totalPrice);
}

function grandTotalCountDisplay() {
  selectElementbyID("grand-total", grandTotal);
}

function selectElementbyID(id, innerText) {
  const element = document.getElementById(id);
  element.innerText = innerText;
}

function addTicketsInfo(id) {
  const buttoninfo = document.getElementById(id);
  const seatName = buttoninfo.innerText;
  const parentDiv = document.getElementById("tickets-info");

  const gridHtml = `
  <div class="grid grid-cols-3 mb-4 text-gray-600" id="${id}a">
    <p class="text-left">${seatName}</p>
    <p class="pl-5">Economy</p>
    <p class="text-right">550</p>
  </div>
`;

  parentDiv.innerHTML += gridHtml;
}

function removeTicketsInfo(id) {
  const parentElement = document.getElementById("tickets-info");
  const childToRemove = document.getElementById(id + "a");

  parentElement.removeChild(childToRemove);
}

function removeCouponDiv() {
  const parentElement = document.getElementById("tickets");
  const childToRemove = document.getElementById("couponDiv");

  parentElement.removeChild(childToRemove);
  couponActive = true;
}

function addDiscountDiv() {
  const parentDiv = document.getElementById("discount-div");

  const gridHtml = `
    <div class="flex justify-between">
    <p>Discount</p>
    <p>BDT <span id="total-discount">${totalDiscount}</span></p>
    </div>
  `;

  parentDiv.innerHTML += gridHtml;
}

function couponEntered() {
  const couponInputValue = document.getElementById("couponInput").value;
  if (couponInputValue === "NEW15") {
    removeCouponDiv();
    discount = 0.15;
    grandTotalCalculation(discount);
    addDiscountDiv();
  } else if (couponInputValue === "Coupon 20") {
    removeCouponDiv();
    discount = 0.2;
    grandTotalCalculation(discount);
    addDiscountDiv();
  } else {
    alert("Please give proper input.");
  }
}

function grandTotalCalculation(discount) {
  grandTotal = totalPrice - totalPrice * discount;
  totalDiscount = totalPrice - grandTotal;
  grandTotalCountDisplay();
}

function nextButtonAvailability() {
  const button = document.getElementById("next-button")
  if (seatCount === 0 || numberInput.value.trim() == "") {
    buttonColorChange(button,"bg-btnColor", "bg-gray-200");
    button.disabled = true;
  }
  if (numberInput.value.length > 0 && seatCount > 0) {
    buttonColorChange(button, "bg-gray-200","bg-btnColor");
    button.disabled = false;
  }
}

function couponButtonAvailability(){
  const button = document.getElementById("coupon-button")
  if (seatCount == 4) {
    buttonColorChange(button,"bg-gray-200","bg-btnColor");
    button.disabled = false;
  }
  if(seatCount < 4){
    buttonColorChange(button,"bg-btnColor", "bg-gray-200");
    button.disabled = true;
  }
}


function buttonColorChange(button, removeColor, addColor) {
  button.classList.remove(removeColor);
  button.classList.add(addColor);
}

numberInput.addEventListener("input", function() {
  nextButtonAvailability()
});

