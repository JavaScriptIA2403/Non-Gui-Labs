# Лабораторная работа №2. Основы работы с массивами, функциями и объектами в JavaScript

## Запуск проекта

1. Открыть файл `main.js` в редакторе кода.
2. Запустить код через Node.js командой `node main.js`.

## Цель работы

Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.

## Оглавление

1. [Создание массива транзакций](#создание-массива-транзакций)
2. [Реализация функций для анализа транзакций](#реализация-функций-для-анализа-транзакций)
3. [Тестирование функций](#тестирование-функций)

## Создание массива транзакций

Создан массив объектов, где каждая транзакция содержит:

- `transaction_id` - уникальный идентификатор транзакции.
- `transaction_date` - дата транзакции.
- `transaction_amount` - сумма транзакции.
- `transaction_type` - тип транзакции (приход или расход).
- `transaction_description` - описание транзакции.
- `merchant_name` - название магазина или сервиса.
- `card_type` - тип карты (кредитная или дебетовая).

## Реализация функций для анализа транзакций

### 1. Получение уникальных типов транзакций

```javascript
function getUniqueTransactionTypes(transactions){
  return [...new Set(transactions.map(t => t.transaction_type))];
}
```

**Описание:**

- `map()` создаёт массив типов транзакций.
- `Set()` удаляет дубликаты.
- Оператор `...` разворачивает `Set` обратно в массив.

### 2. Вычисление общей суммы транзакций

```javascript
function calculateTotalAmount(transactions){
  return transactions.reduce((sum,t) => sum + t.transaction_amount, 0);
}
```

**Описание:**

- `reduce()` сворачивает массив в одно значение, суммируя `transaction_amount`.

### 3. Вычисление суммы транзакций за указанный год, месяц, день

```javascript
function calculateTotalAmountByDate(transaction, year, month, day){
  return calculateTotalAmount(transaction.filter( t => {
    const date = new Date(t.transaction_date);
    return (year === undefined || date.getFullYear() == year) && 
      (month === undefined || date.getMonth()+1 === month) &&
      (day === undefined || date.getDate() === day);
  }));
}
```

**Описание:**

- `filter()` выбирает транзакции по дате.
- `calculateTotalAmount()` суммирует их.

### 4. Получение транзакций по типу

```javascript
function getTransactionByType(transactions, type){
  return transactions.filter(t => t.transaction_type === type);
}
```

**Описание:**

- `filter()` создаёт новый массив с транзакциями указанного типа.

### 5. Получение транзакций в диапазоне дат

```javascript
function getTransactionInDateRange(transactions, startDate, endDate){
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);
    return date >= new Date(startDate) && date <= new Date(endDate);
  });
}
```

**Описание:**

- `filter()` выбирает транзакции между `startDate` и `endDate`.

### 6. Получение транзакций по имени магазина

```javascript
function getTransactionByMerchant(transactions, merchantName){
  return transactions.filter(t => t.merchant_name === merchantName);
}
```

**Описание:**

- `filter()` ищет транзакции, соответствующие `merchantName`.

### 7. Средняя сумма транзакций

```javascript
function calculateAverageTransactionAmount(transactions){
  return transactions.length === 0 ? 0 : calculateTotalAmount(transactions) / transactions.length;
}
```

**Описание:**

- Делит сумму транзакций на их количество.

### 8. Получение транзакций в диапазоне сумм

```javascript
function getTruncusctionsByAmountRange(transactions, minAmount, maxAmount){
  return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}
```

**Описание:**

- `filter()` выбирает транзакции, находящиеся в диапазоне `minAmount` - `maxAmount`.

### 9. Вычисление общей суммы дебетовых транзакций

```javascript
function calculateTotalDebitAmount(transactions){
  return calculateTotalAmount(getTransactionByCardType(transactions, "debit"));
}
```

**Описание:**

- `getTransactionByCardType()` выбирает дебетовые транзакции.
- `calculateTotalAmount()` суммирует их.

### 10. Поиск месяца с наибольшей суммой транзакций

```javascript
function findMostTransactionMonth(transactions){
  const max = Math.max(...transactions.map(t => t.transaction_amount));
  return transactions.filter(t => max === t.transaction_amount);
}
```

**Описание:**

- `map()` создаёт массив сумм транзакций.
- `Math.max()` находит максимум.
- `filter()` выбирает транзакции с этой суммой.

### 11. Поиск месяца с наибольшей суммой дебетовых транзакций

```javascript
function findMostDebitTransactionMonth(transactions){
  return findMostTransactionMonth(getTransactionByCardType(transactions, "debit"));
}
```

**Описание:**

- Использует `findMostTransactionMonth()` для дебетовых транзакций.

### 12. Определение наиболее частого типа транзакций

```javascript
function mostTransactionType(transactions){
  const debitCount = getTransactionByCardType(transactions, "debit").length;
  const creditCount = getTransactionByCardType(transactions, "credit").length;
  return debitCount > creditCount ? "debit" : creditCount < debitCount ? "credit" : "equal";
}
```

**Описание:**

- Сравнивает количество дебетовых и кредитных транзакций.

### 13. Получение транзакций до указанной даты

```javascript
function getTransactionBeforeDate(transactions, date){
  return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
}
```

**Описание:**

- `filter()` выбирает транзакции, совершённые до указанной даты.

### 14. Поиск транзакции по ID

```javascript
function findTransactionById(transactions, id){
  return transactions.find(t => t.transaction_id === id) || null;
}
```

**Описание:**

- `find()` находит первую транзакцию с указанным ID.

### 15. Получение массива описаний транзакций

```javascript
function mapTransactionDescriptions(transactions){
  return transactions.map(t => t.transaction_description);
}
```

**Описание:**

- `map()` создаёт новый массив из описаний транзакций.

### 16. Функция ввода

```javascript
function questionAsync(query) {
  return new Promise(resolve => {
    rl.question(query, answer => resolve(answer));
  });
}
```

**Описание:**

- Возвращает `Promise`, который позволяет асинхронно получать ввод пользователя.

## Тестирование функций

### 1. Уникальные типы транзакций
```javascript
console.log(`Уникальные значения типов - ${getUniqueTransactionTypes(transaction)}`);
```

### 2. Общая сумма транзакций
```javascript
console.log(calculateTotalAmount(transaction));
```

### 3. Получение транзакций по типу
```javascript
let transactionByType = getTransactionByType(transaction, "pass");
console.log(transactionByType);
```

### 4. Подсчет суммы транзакций по заданному типу
```javascript
let typeOfTransaction = await questionAsync("По какому типу вы хотите проверить сумму транзакций? (pass / flow) ");
getTransactionByType(transaction, typeOfTransaction);
console.log(`Сумма транзакций типа ${typeOfTransaction} =`, calculateTotalAmount(transactionByType));
```

### 5. Подсчет суммы транзакций по дате
```javascript
let year, month, day;
const amountForDate = await questionAsync("Введите year / month / day ");
if (amountForDate === "year") {
  year = await questionAsync("Введите год ");
  totalAmountByDate = calculateTotalAmountByDate(transaction, year);
  console.log(`Сумма транзакций за ${year} - ${totalAmountByDate}`);
} else if (amountForDate === "month") {
  year = await questionAsync("Введите год ");
  month = Number(await questionAsync("Введите месяц "));
  totalAmountByDate = calculateTotalAmountByDate(transactionByType, year, month);
  console.log(`Сумма транзакций за ${month} ${year} - ${totalAmountByDate}`);
} else if (amountForDate === "day") {
  year = await questionAsync("Введите год ");
  month = Number(await questionAsync("Введите месяц "));
  day = Number(await questionAsync("Введите день "));
  totalAmountByDate = calculateTotalAmountByDate(transactionByType, year, month, day);
  console.log(`Сумма транзакций за ${day} ${month} ${year} - ${totalAmountByDate}`);
} else console.log("Неверные данные");
```

### 6. Получение транзакций в заданном диапазоне дат
```javascript
const minRange = await questionAsync("Введите нижний порог диапазона (запись в формате 2025-03-24)");
const maxRange = await questionAsync("Введите верхний порог диапазона (запись в формате 2025-03-24)");
const transactionInDateRange = getTransactionInDateRange(transaction, minRange, maxRange);
console.log(transactionInDateRange);
```

### 7. Получение транзакций по имени магазина
```javascript
const merchName = await questionAsync("Введите имя магазина ");
console.log(getTransactionByMerchant(transaction, merchName));
```

### 8. Среднее значение транзакций
```javascript
console.log("Среднее значение - ", calculateAverageTransactionAmount(transaction));
```

### 9. Получение транзакций в заданном диапазоне сумм
```javascript
const minAmount = Number(await questionAsync("Введите нижний порог суммы транзакций "));
const maxAmount = Number(await questionAsync("Введите верхний порог суммы транзакций "));
console.log(`Транзакции в диапазоне от ${minAmount} до ${maxAmount} - `, getTruncusctionsByAmountRange(transaction, minAmount, maxAmount));
```

### 10. Подсчет суммы всех дебитовых транзакций
```javascript
console.log("Сумма всех дебитовых транзакций - ", calculateTotalDebitAmount(transaction));
```

### 11. Самый прибыльный месяц
```javascript
console.log("Самый богатый месяц - ", findMostTransactionMonth(transaction));
```

### 12. Самый прибыльный месяц по дебетовым транзакциям
```javascript
console.log("Самый богатый дебитовый месяц - ", findMostDebitTransactionMonth(transaction));
```

### 13. Самый часто используемый тип карт
```javascript
console.log("Самый частый вид карт - ", mostTransactionType(transaction));
```

### 14. Получение транзакций до определенной даты
```javascript
const dateOfRange = await questionAsync("Введите дату, до которой выведутся транзакции ");
console.log(`До ${dateOfRange}, `, getTransactionBeforeDate(transaction, dateOfRange));
```

### 15. Поиск транзакции по ID
```javascript
const id = Number(await questionAsync("Введите ID "));
console.log(`Транзакция, соответствующая ID ${id} - `, findTransactionById(transaction, id));
```

### 16. Получение массива с описаниями транзакций
```javascript
console.log("Массив, содержащий только описания:", mapTransactionDescriptions(transaction));
```

