import * as readline from 'node:readline'; 
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({
    input,
    output
});

let totalAmountByDate = 0;


const transaction = [
  {
    transaction_id: 1,
    transaction_date: "2006-03-25",
    transaction_amount: 120.5,
    transaction_type: "pass",
    transaction_description: "Grocery shoping", 
    merchant_name: "Yandex",
    card_type: "debit"
  },
  {
    transaction_id: 2,
    transaction_date: "2025-08-18",
    transaction_amount: 200,
    transaction_type: "flow",
    transaction_description: "Online shoping",
    merchant_name: "Temu",
    card_type: "credit"
  },
  {
    transaction_id: 3,
    transaction_date: "2011-09-11",
    transaction_amount: 111,
    transaction_type: "pass",
    transaction_description: "Air shoping",
    merchant_name: "Islam",
    card_type: "debit"
  }
]
// 
function getUniqueTransactionTypes(transactions){
  return [... new Set(transactions.map(t => t.transaction_type))]  // сохраняет уникальные значения типов, 
                                                                  //  создаётся массив типов, а set убирает повторяющиеся значения; ... - делит на значения 
}
function calculateTotalAmount(transactions){
  return transactions.reduce((sum,t) => sum + t.transaction_amount, 0) //  метод .reduce выолняет свёртку значений в одно по => правило 
}
function getTransactionByCardType(transactions, cardType){
  return transactions.filter(t => t.card_type === cardType);
}
function getTransactionByType(transactions, type){
  return transactions.filter(t => t.transaction_type === type) // .filter создаёт массив из элементов, которые проходят проверку по правилу =>
}
function getTransactionInDateRange(transactions, startDate, endDate){
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);                     // new - создаёт новый объект, который связывается с конструктором
    return date >= new Date(startDate) && date <= new Date(endDate);
  })
}
function getTransactionByMerchant(transactions, merchantName){
  return transactions.filter(t => t.merchant_name === merchantName);
}

function calculateTotalAmountByDate(transaction, year, month, day){
  return calculateTotalAmount(transaction.filter( t => {
    const date = new Date(t.transaction_date);
    return (year === undefined || date.getFullYear() == year) && 
      (month === undefined || date.getMonth()+1 === month) &&
      (day === undefined || date.getDate() === day);
  }
  ));
};

function calculateAverageTransactionAmount(transactions){
  return transactions.length === 0 ? 0 : calculateTotalAmount(transactions) / transactions.length; // условие ? выражение1 (если верное) : выражение2 (если ложно) 
}  
function getTruncusctionsByAmountRange(transactions, minAmount, maxAmount){
  return transactions.filter(t => {
    return t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
  })
}
function calculateTotalDebitAmount(transactions){
  return calculateTotalAmount(getTransactionByCardType(transactions, "debit"));
}
function findMostTransactionMonth(transactions){
  const max = Math.max(...transactions.map(t => t.transaction_amount));
  return transactions.filter(t => max === t.transaction_amount)
}


function findMostDebitTransactionMonth(transactions){
  return findMostTransactionMonth(getTransactionByCardType(transactions, "debit"))
  }
function mostTransactionType(transactions){
  const debitCount = getTransactionByCardType(transactions, "debit");
  const creditCount = getTransactionByCardType(transactions, "credit");
  return debitCount > creditCount ? "debit" : creditCount < debitCount ? "credit" : "equal" ;  
}   

function getTransactionBeforeDate(transactions, date){
  return transactions.filter(t => new Date(t.transaction_date) < new Date(date)) // Date преобразует t.transaction_date в объект, который будет корректно сравниваться
}

function findTransactionById(transactions, id){
  return transactions.find(t => t.transaction_id === id || 0) // .find находит первый элемент из t.transaction_id
}
function mapTransactionDescriptions(transactions){
  return transactions.map(t => t.transaction_description);
}
function questionAsync(query) {
  return new Promise((resolve) => {   // 
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}
console.log(`Уникальные значения типов - ${getUniqueTransactionTypes(transaction)}`)
console.log(calculateTotalAmount(transaction));
let transactionByType = getTransactionByType(transaction, "pass");
console.log(transactionByType);
let typeOfTransaction = await questionAsync("По какому типу вы хотите проверить сумму транзакций? (pass / flow) ")
getTransactionByType(transaction, typeOfTransaction);
console.log(`Сумма транзакций типа ${ typeOfTransaction} =`, calculateTotalAmount(transactionByType));
//console.log(calculateTotalAmountByDate(transaction, 2006, 3, 25));
let year,month,day;
const amountForDate = await questionAsync("Введите year / month / day ");
if (amountForDate === "year"){
  year = await questionAsync("Введите год ");
  totalAmountByDate = calculateTotalAmountByDate(transaction, year);
  console.log(`Сумма транзакций за ${year} - ${totalAmountByDate}`);
} 
else if (amountForDate === "month") {
  year = await questionAsync("Введите год ");
  month = Number(await questionAsync("Введите месяц "));
  totalAmountByDate = calculateTotalAmountByDate(transactionByType, year, month);
  console.log(`Сумма транзакций за ${month} ${year} - ${totalAmountByDate}`);
} 
else if (amountForDate === "day") {
  year = await questionAsync("Введите год ");
  month = Number(await questionAsync("Введите месяц "));
  day = Number(await questionAsync("Введите день "));
  totalAmountByDate = calculateTotalAmountByDate(transactionByType, year, month, day);
  console.log(`Сумма транзакций за ${day} ${month} ${day} - ${totalAmountByDate}`);
} else console.log("Неверные данные"); 

const minRange = await questionAsync("Введите нижний порог диапозона (запись в формате 2025-03-24)");
const maxRange = await questionAsync("Введите верхний порог диапазона (запись в формате 2025-03-24)");
const transactionInDateRange = getTransactionInDateRange(transaction, minRange, maxRange);
console.log(transactionInDateRange);

const merchName = await questionAsync("Введите имя магазина ");
console.log(getTransactionByMerchant(transaction, merchName));

console.log("Среднее значение - ",calculateAverageTransactionAmount(transaction));

const minAmount = Number(await questionAsync("Введите нижний порог суммы транзакций "));
const maxAmount = Number(await questionAsync("Введите верхний порог суммы транзакций "));
console.log(`Транзакции в диапазоне от ${minAmount} до ${maxAmount} - `, getTruncusctionsByAmountRange(transaction, minAmount, maxAmount));

console.log("Сумма всех дебитовых транзакций - ", calculateTotalDebitAmount(transaction));

console.log("Самый богатый месяц - ", findMostTransactionMonth(transaction));

console.log("Самый богатый дебитовый месяц - ", findMostDebitTransactionMonth(transaction));

console.log("Самый частый вид карт - ",mostTransactionType(transaction));

const dateOfRange = await questionAsync("Введите дату, до который выведятся транзакции ");
console.log(`До ${dateOfRange}, `, getTransactionBeforeDate(transaction, dateOfRange));

const id = Number(await questionAsync("Введите айди "));
console.log(`Транзакция, соответствующая id ${id} - `,findTransactionById(transaction, id));

console.log("Массив, содержащие только описания:", mapTransactionDescriptions(transaction));
