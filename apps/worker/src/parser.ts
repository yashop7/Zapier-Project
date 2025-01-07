export function parse(
  text: string,
  values: any,
  startDelimeter = "{",
  endDelimeter = "}"
) {
  // You received {comment.amount} momey from {comment.link}
  let startIndex = 0;
  let endIndex = 1;

  let finalString = "";
  while (endIndex < text.length) {
    if (text[startIndex] === startDelimeter) {
      let endPoint = startIndex + 2;
      while (text[endPoint] !== endDelimeter) {
        endPoint++;
      }
      let stringHoldingValue = text.slice(startIndex + 1, endPoint);
      const keys = stringHoldingValue.split(".");
      let localValues = {
        ...values,
      };
      for (let i = 0; i < keys.length; i++) {
        if (typeof localValues === "string") {
          localValues = JSON.parse(localValues);
        }
        localValues = localValues[keys[i]];
      }
      finalString += localValues;
      startIndex = endPoint + 1;
      endIndex = endPoint + 2;
    } else {
      finalString += text[startIndex];
      startIndex++;
      endIndex++;
    }
  }
  if (text[startIndex]) {
    finalString += text[startIndex];
  }
  return finalString;
}

//Amazing Logic
// https://chatgpt.com/c/677cf741-0e5c-8008-ac60-d20778144a94

// // Suppose we have a template text with placeholders:
// const template = "You received {comment.amount} money from {comment.link}";

// // And an object that matches these placeholders:
// const data = {
//   comment: {
//     amount: 1000,
//     link: "John Doe"
//   }
// };

// // Parsing the template replaces each placeholder with the relevant value.
// const result = parse(template, data);
// console.log(result);
// // Expected output: "You received 1000 money from John Doe"
