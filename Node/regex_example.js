/cat/.test("my cat is cute"); // true
/dog/.test("my cat is cute"); // false


let text = "My phone number is 123-456-7890";
let match = text.match(/\d{3}-\d{3}-\d{4}/);
console.log(match[0]); // "123-456-7890"


let newStr = "I like cats".replace(/cats/, "dogs");
console.log(newStr); // "I like dogs"


let words = "apple, banana; orange".split(/[;,]\s*/);
console.log(words); // ["apple", "banana", "orange"]
