const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showRichBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate-wealth");

let data = [];

//fetch rand user and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

//add data to data array

function addData(obj) {
  data.push(obj);

  updateDOM();
}

//function to double everyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//sort users by richest

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//filter the non-millionaires!
function showMillionaires() {
  data = data.filter(user => {
    return user.money > 1000000;
  });

  updateDOM();
}

//calculate the entire length!
function addWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong>`;
  main.appendChild(wealthEl);
}

//function to updatedom with new data - needs to be in every function
function updateDOM(providedData = data) {
  //clear main div

  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(item => {
    const el = document.createElement("div");
    el.classList.add("person");
    el.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(el);
  });
}

function formatMoney(number) {
  return "£" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//event listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showRichBtn.addEventListener("click", showMillionaires);
calculateBtn.addEventListener("click", addWealth);
