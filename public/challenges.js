
const challengesarray = [
  {
    "id": 1,
    "title": "Reverse String",
    "difficulty": "Easy",
    "description": "Write a function that reverses a string. The input string is given as an array of characters",
    "starterCode": "function reverseString(str){}",
    "testCases": [
      { input: "reverseString('hello')", expected: "'olleh'" },
      { input: "reverseString('world')", expected: "'dlrow'" }
    ]
  },

  {
    "id": 2,
    "title": "findMaximum",
    "difficulty": "Easy",
    "description": "Write a function that find the maximum in a Given array",
    "starterCode": "function FindMaximum(arr){}",

    "testCases": [
      { input: "findMaximum([1,2,3,4,5])", expected: "'5'" },
      { input: "findMaximum([6,4,7])", expected: "'7'" }
    ]

  },

  {
    "id": 3,
    "title": "palindromeChecker",
    "difficulty": "Easy",
    "description": "Write a function that checks the palindrome in a string.",
    "starterCode": "function PalindromeChecker(str){}",
    "testCases": [
      { input: "palindromeChecker('hell')", expected: "'false'" },
      { input: "palindromeChecker('malayalam')", expected: "'true'" }
    ]

  },
  {
    "id": 4,
    "title": "arraySum",
    "difficulty": "Easy",
    "description": "Write a function that calculates the sum of the array",
    "starterCode": "function ArraySum(nums){}",
    "testCases": [
      { input: "arraySum([1,2,3,4])", expected: "'10'" },
      { input: "arraySum([4,5,6,1])", expected: "'16'" }
    ]
  }
]

function set(arr, id) {
  for (let i = 0; i < arr.length; i++) {

    if (arr[i].id == id) {
      window.codeEditor.setValue(arr[i].starterCode);
      break;
    }
  }

}
let arri = null;

const list = document.getElementById('challengesContainer');
function setChallenges(arr) {
  for (let i = 0; i < arr.length; i++) {
    let newDiv = document.createElement('div');
    newDiv.textContent =
      arr[i].title + " (" + arr[i].difficulty + ")";
    newDiv.addEventListener('click', function (event) {
      set(arr, arr[i].id);
      arri = arr[i].id;
    });

    newDiv.style.padding = '10px';
    newDiv.style.margin = '5px';
    newDiv.style.border = '1px solid #ccc';
    newDiv.style.cursor = 'pointer';
    list.appendChild(newDiv);
  }
}

setChallenges(challengesarray);
function get() {
  let i = 0;
  while (i < challengesarray.length) {
    if (challengesarray[i].id === arri) {
      return challengesarray[i].testCases;
    }
    i++;
  }
}
function usercode() {
  return window.codeEditor.getValue();
}
function evaluate() {
   if(!arri){
    console.log("Select challenge first");
    return;
   }
  const val = usercode();
  const atx = get();
  if(!atx){
    console.log("Error spotted");
    return ;
  }
  for (let i = 0; i < atx.length; i++) {

    try {

      const func = new Function('return  '  +  val)();
      const res = func(atx[i].input);

      if (res === atx[i].expected) {
        console.log("Test case " + (i + 1) + "passed");

      }
      if (res!== atx[i].expected) {
        console.log("Test case " + (i + 1) + "failed");
      }
    } catch (error) {
      return "Error:" + error.message;
    }
  }


}
const tesButton = document.getElementById('testButton');
tesButton.addEventListener('click', function (event) {

   evaluate();
});



