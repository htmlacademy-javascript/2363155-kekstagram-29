// 1. Функция проверки длины строки

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);

// 2. Функция проверки полиндрома

function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversed = normalizedString.split('').reverse().join('');
  return normalizedString === reversed;
}

isPalindrome('А роза упала на лапу Азора');

// 3. Функция извлечения числа из строки в виде целого положительного числа

function extractionNumberFromString(string) {
  const checkString = String(string);
  let elem;
  let result = '';
  for (const i in checkString) {
    elem = parseInt(checkString[i], 10);
    if (!Number.isNaN(elem)) {
      result += elem;
    }
  }
  return result;
}

extractionNumberFromString('20KeKs23');
