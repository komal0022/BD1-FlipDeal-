const express = require('express');
let cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

//Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(result.toString());
});

//Endpoint 2 : Apply a discount based on membership status
function DiscountedPrice(cartTotal) {
  let discountPercentage = 10;
  let DiscountedPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  return DiscountedPrice;
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if(isMember === 'true'){
    res.send(DiscountedPrice(cartTotal).toString());
  }else{
    res.send(cartTotal.toString());
  }
});


//Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 5;
  let taxedPrice = cartTotal * (taxRate/100);
  res.send(taxedPrice.toString());
});


//Endpoint 4 : Estimate delivery time based on shipping method
function standardDelivery(distance){
  let days = Math.ceil(distance / 50) ;
  return days;
}
function expressDelivery(distance){
  let days = Math.ceil(distance / 100);
  return days;
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if(shippingMethod === 'standard'){
    res.send(standardDelivery(distance).toString());
  }else if(shippingMethod === 'express'){
    res.send(expressDelivery(distance).toString());
  }
});


//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});


//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalityRate = 2;
  let result = purchaseAmount * loyalityRate;
  res.send(result.toString());
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
