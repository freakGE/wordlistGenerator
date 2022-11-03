import fs from "fs";

const fileName = "custom-wordlist.txt";

const minSentenceLength = 2;
const maxSentenceLength = 3;
const extraLength = 1;

const wordListLength = 500;

let arrayOfWords = [];
let arrayOfSentences = [];

const fillArrayOfWords = (file = fileName) => {
  let word = fs.readFileSync(file).toString();
  arrayOfWords = word.split("\n");
};
fillArrayOfWords();

const filteredWords = arrayOfWords.filter(word => word.length > 2);

const generateRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomWord = (array = filteredWords) =>
  array[Math.floor(Math.random() * array.length)].toLowerCase().trim();

const randomSentence = (extra = 0) => {
  const length = generateRandomInteger(
    minSentenceLength,
    maxSentenceLength + extra
  );

  let sentence = "";

  for (let i = 0; i < length; i++) {
    const word = randomWord();

    if (word.includes(" ")) {
      sentence = word;
      break;
    }

    sentence += i === 0 ? word : ` ${word}`;
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

for (let i = 0; i < wordListLength; i++) {
  i % 10 === 0
    ? arrayOfSentences.push(randomSentence(extraLength))
    : arrayOfSentences.push(randomSentence());
}

const newWordList = arrayOfSentences.join(", ");

const createFile = (fileName, text) => {
  fs.writeFile(`./wordlists/${fileName}.txt`, text, err => {
    if (err) console.log(err);

    console.log(`File "${fileName}" created!`);
  });
};

const date = new Date().getTime();

const args = process.argv.slice(2);

args.includes("-n")
  ? createFile(args[1], newWordList)
  : createFile(`wordlist-${date}`, newWordList);
