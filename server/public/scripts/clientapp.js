var number1 = '';
var number2 = '';
var operator = '';

var operatorDisplay = {
    'add': '+',
    'subtract': '-',
    'multiply': 'x',
    'divide': '/'
};

var currentNumber = 1;



$(document).ready(function() {
    console.log('ready');

    //Allows for inputs to be changed with the buttons
    $('#calculator-container').on('click', 'button', calculatorButtons);

    //Allows for inputs to be changed with the keyboard
    $('#number').on('keyup', updateNum);

    //Pressed buttons run functions
    $('#calc-input').on('submit', getResult);
    $('#clear').on('click', clearAllNumbers);
    $('#clear-input').on('click', clearInputOnly);


    //When the buttons are pressed, changes the input fields and variables
    function calculatorButtons() {

        var buttonPushed = $(this).attr('data-button');

        if (buttonPushed.length > 1) {
            operator = buttonPushed;
            currentNumber++;
            $('#display-number1').text(number1);
            $('#display-operator').text(' ' + operatorDisplay[operator] + ' ');

        } else {
            if (operator == "" && currentNumber==1) {
                number1 += buttonPushed;
                $('#number').val(number1);

            } else {
                number2 += buttonPushed;
                $('#number').val(number2);
            }
        }


    }

    //Changes the input number when each number is pressed on the keyboard
    function updateNum() {

        if (currentNumber == 1) {
            number1 = $('#number').val();
        } else {
            number2 = $('#number').val();
        }
    }


    //Goes to the server to get some results
    function getResult() {
        event.preventDefault();
        if (checkData()) {
            var calculateThis = {
                'number1': number1,
                'number2': number2
            };
            $.ajax({
                type: 'POST',
                url: '/' + operator,
                data: calculateThis,
                success: function(data) {
                    var result = data.solution;
                    resetNumbers(result);
                    currentNumber=2;

                }
            });
        }
    }


    //Clear function for resetting numbers and fields
    function resetNumbers(num) {
        number1 = num;
        number2 = '';
        operator = '';
        currentNumber = 1;

        $('#display-number1').text(num);
        $('#display-operator').text(operator);
        $('#number').val('0');

    }

    //Clears all fields and resets experience
    function clearAllNumbers() {
        resetNumbers('');

    }

    //Only clears the input the user is working on
    function clearInputOnly() {
        if (currentNumber==1) {
            resetNumbers('');
        } else {
            resetNumbers(number1);
            currentNumber=2;
        }
    }

    //checks to see if the user has set all the inputs
    function checkData() {
        if (number1 != '' && number2 != '' && operator != '') {
            return true;
        } else {
            return false;
        }
    }



});
