"use strict";

const button = document.querySelectorAll(".btn-old");
const buttonNew = document.querySelectorAll(".btn-new");
const inc = document.querySelectorAll(".add-item");
const dec = document.querySelectorAll(".rem-item");
const counter = document.querySelectorAll(".count");
const cartContent = document.querySelector(".cart-content");
const card = document.querySelectorAll('.card');
const itemsTotal = document.querySelector('.items-num');
const itemContainer = document.querySelectorAll('.item-container');
const finalStep = document.querySelector('.final-step');
// const confirm = document.querySelector('.btn-confirm');
const itemContainer2 = document.querySelector('.item-container--2');
const overlay = document.querySelector('.overlay');
const finalCart = document.querySelector('.final-cart');

button.forEach((el) => {
  el.addEventListener("click", function () {
    el.classList.add("hidden");
    const card = el.closest(".card");
    const plus = card.querySelector(".count");
    plus.dataset.count = 1;
    const newBtn = card.querySelector(".btn-new");
    newBtn.classList.remove("hidden");
    newBtn.classList.add("btn-active");
    total++;
    display();
  });
});

let total = 0;

inc.forEach((el) => {
  el.addEventListener("click", function (e) {
    const target = e.target.closest(".btn");
    let count = target.querySelector(".count");
    count.dataset.count = Number(count.dataset.count) + 1;
    count.textContent = count.dataset.count;
    total++;
    display();
    // console.log(datasetData);
    // let quantity = Number(datasetData);
    // quantity++;
    // datasetData = quantity;
    // console.log(datasetData);
    // console.log(quantity);
  });
});

dec.forEach((el) => {
  el.addEventListener("click", function (e) {
    const target = e.target.closest(".btn");
    let count = target.querySelector(".count");
    if (count.dataset.count > 0) {
      count.dataset.count = Number(count.dataset.count) - 1;
      count.textContent = count.dataset.count;
    }
    if (Number(count.dataset.count) == 0) {
      const card = e.target.closest(".card");
      const newBtn = card.querySelector(".btn-new");
      const oldBtn = card.querySelector(".btn-old");
      // newBtn.classList.toggle('btn-active');
      newBtn.classList.toggle("hidden");
      oldBtn.classList.toggle("hidden");
      // count.dataset.count = Number(count.dataset.count) + 1;
      count.textContent = "1";
    }
    total--;
    display();
  });
});


let totalPricing = 0;
const arr = [];
const display = function () {
  let hasItems = false;
  cartContent.innerHTML = "";
  let parent;
  let hasTotal = false;
  totalPricing = 0;

  counter.forEach((el) => {

    itemsTotal.textContent = `(${total})`;
    // arrCount.push(el);
    parent = el.closest('.card');
    let details = parent.querySelector('.details').textContent;
    const price = Number(parent.querySelector('.price').textContent);
    const quantity = Number(el.dataset.count);
    let html;
    totalPricing += price*quantity;
    if (quantity > 0) {
      hasItems = true;
      html = `<div class="item-container" data-name="${details}">
                    <div class="overview">
                        <h3 class="item-name">${details}</h3>
                        <div class="total">
                            <p class="number">${quantity}x</p>
                            <div class="prices">@${price} <span style="font-weight: 700;">$${price*quantity}</span></div>
                        </div>
                    </div>
                    <div class="del-item">
                        <img src="assets/images/icon-remove-item.svg" alt="" class="del-btn">
                    </div>
                </div>
                <hr>`;
      cartContent.insertAdjacentHTML('afterbegin', html);

      if (total > 0) {
        finalStep.innerHTML = '';
          const n = `<div class="order-total">
                    <p class="pricing-text">Order Total</p>
                    <p class="pricing-number">$${totalPricing}</p>
                </div>

                <div class="carbon">
                    <img src="assets/images/icon-carbon-neutral.svg" alt="">
                    <p>This is a <span style="font-weight: bold;">carbon-neutral</span> delivery</p>
                </div>
                <div class="confirm">
                    <button class="btn-confirm">Confirm Order</button>
                </div>`;

          finalStep.insertAdjacentHTML('beforeend', n);
          const confirm = document.querySelector('.btn-confirm');
          finalConfirm(confirm);
          
      }
    } 
    
  });
  

  if (!hasItems){
    cartContent.innerHTML = "";
    finalStep.innerHTML = '';
        cartContent.innerHTML = `<div class="cart-content">
                <img src="assets/images/illustration-empty-cart.svg" alt="">
                <p>your added items will appear here</p>
                </div>`;
   }

  cartContent.addEventListener('click', function(e) {
    if (e.target.classList.contains('del-btn')) {
      const item = e.target.closest('.item-container');
      const itemName = item.dataset.name;
      
      counter.forEach(el => {
        const parent = el.closest('.card');
        const details = parent.querySelector('.details').textContent;

        if(itemName == details) {
          total -= Number(el.dataset.count);
          el.dataset.count = 0;
          el.textContent = "1";
          const newBtn = parent.querySelector('.btn-new');
          const oldBtn = parent.querySelector('.btn-old');
          newBtn.classList.add('hidden');
          oldBtn.classList.remove('hidden');
        }
      });
      display();
    }
  })
};

const finalConfirm = function (conf) {
  conf.addEventListener('click', function () {
    counter.forEach(el => {
      parent = el.closest('.card');
      let details = parent.querySelector('.details').textContent;
      const price = Number(parent.querySelector('.price').textContent);
      const quantity = Number(el.dataset.count);
      console.log(quantity);
      let html;
      totalPricing += price*quantity;
      if (quantity > 0) {
        html = `<div class="item-container" data-name="${details}">
        <div class="overview">
        <h3 class="item-name">${details}</h3>
        <div class="total">
        <p class="number">${quantity}x</p>
        <div class="prices">@${price} <span style="font-weight: 700;">$${price*quantity}</span></div>
        </div>
        </div>
        </div>
        <hr style="width: 100%">
        `;
        itemContainer2.insertAdjacentHTML('afterbegin', html);
      }
    });

    const newOrder = document.querySelector('.btn-final');
    newOrder.addEventListener('click', function() {
      window.location.reload();
      // counter.forEach(el => {
      //   if(el.dataset.count) {
      //     el.dataset.count = 0;
      //     el.textContent = "1";
      //     const newBtn = parent.querySelector('.btn-new');
      //     const oldBtn = parent.querySelector('.btn-old');
      //     newBtn.classList.add('hidden');
      //     oldBtn.classList.remove('hidden');
      //   } 
        
      // })

      // overlay.classList.toggle('hidden');
      // finalCart.classList.toggle('hidden');
      // total = 0;
      // display();
    })
    
    overlay.classList.toggle('hidden');
    finalCart.classList.toggle('hidden');
    
  });
}
