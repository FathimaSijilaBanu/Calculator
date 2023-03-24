const keys = document.querySelectorAll('.key');
const show_input = document.querySelector('.display .input');
const show_output = document.querySelector('.display .output');
let input = "";
for (let key of keys) {
	const value = key.dataset.key;
	key.addEventListener('click', () => {
        switch (value) {
            case "clear":
              input = "";
              show_input.innerHTML = "";
              show_output.innerHTML = "";
              break;
            case "backspace":
              input = input.slice(0, -1);
              show_input.innerHTML = CleanInput(input);
              show_output.innerHTML="";
              break;
            case "=":
              try {
                let result = eval(PerpareInput(input));
                if (result === Infinity || result === -Infinity) {
                  show_output.innerHTML = "Cannot divide by zero";
                } else {
                  show_output.innerHTML = CleanOutput(result);
                }
              } catch {
                show_output.innerHTML = "Invalid input";
              }
              break;
            case "brackets":
              if (
                input.indexOf("(") == -1 ||
                (input.indexOf("(") != -1 &&
                  input.indexOf(")") != -1 &&
                  input.lastIndexOf("(") < input.lastIndexOf(")"))
              ) {
                input += "(";
              } else if (
                (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
                (input.indexOf("(") != -1 &&
                  input.indexOf(")") != -1 &&
                  input.lastIndexOf("(") > input.lastIndexOf(")"))
              ) {
                input += ")";
              }
              show_input.innerHTML = CleanInput(input);
              break;
            default:
              if (ValidateInput(value)) {
                input += value;
                show_input.innerHTML = CleanInput(input);
              }
          }
	})
}
function CleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;
	for (let i = 0; i < input_array_length; i++) {
        switch (input_array[i]) {
          case "*":
            input_array[i] = ` <span>x</span> `;
            break;
          case "/":
            input_array[i] = ` <span>÷</span> `;
            break;
          case "+":
            input_array[i] = ` <span>+</span> `;
            break;
          case "-":
            input_array[i] = ` <span>-</span> `;
            break;
          case "(":
            input_array[i] = `<span>(</span>`;
            break;
          case ")":
            input_array[i] = `<span>)</span>`;
            break;
          case "%":
            input_array[i] = `<span>%</span>`;
            break;
          default:
            break;
        }
      }
      return input_array.join("");  
}
function CleanOutput (output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];
	let output_array = output_string.split("");
	if (output_array.length > 3) {
		for (let i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}
	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}
	return output_array.join("");
}

// function ValidateInput(value) {
//   let last_input = input.slice(-1);
//   let operators = ["+", "-", "*", "/","%"];

//   if (value == "." && last_input == ".") {
//       return false;
//   }

//   if (operators.includes(value)) {
//       if (operators.includes(last_input)) {
//           // If last input was also an operator, replace it with the new operator
//           input = input.slice(0, -1) + value;
//           show_input.innerHTML = CleanInput(input);
//           return false;
//       } else {
//           return true;
//       }
//   }
//   return true;
// }


function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "*", "/", "%"];

  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value) && input === "") {
    if (value === "-") {
      input += value;
      show_input.innerHTML = CleanInput(input);
      return true;
    } else {
      return false;
    }
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      // If last input was also an operator, replace it with the new operator
      input = input.slice(0, -1) + value;
      show_input.innerHTML = CleanInput(input);
      return false;
    } else {
      return true;
    }
  }
  return true;
}


function PerpareInput (input) {
	let input_array = input.split("");
	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}
	return input_array.join("");
}




