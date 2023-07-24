// 1. Функция проверки длины строки

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);

// 2. Функция проверки полиндрома

function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversed = normalizedString.toLowerCase().split('').reverse().join('');
  return normalizedString === reversed;
}

isPalindrome('А роза упала на лапу Азора');

// 3. Функция извлечения числа из строки в виде целого положительного числа

function extractionNumberFromString(string) {
  const checkString = String(string);
  let numbers;
  let result = '';
  for (const i in checkString) {
    numbers = parseInt(checkString[i], 10);
    if (!Number.isNaN(numbers)) {
      result += numbers;
    }
  }
  return result;
}

extractionNumberFromString('20KeKs23');
