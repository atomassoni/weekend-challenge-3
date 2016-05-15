var number1 = '';
var number2 = '';
var operator = '';
var prevOperator = '';
var operatorDisplay = {
    'add': '+',
    'subtract': '-',
    'multiply': 'x',
    'divide': '/'
};
var displayCalcString = '';
var currentNumber = 1;

$(document).ready(function() {
    console.log('ready');


    $('#calculator-container').on('click', 'button', calculatorButtons);
    $('#number1').on('keyup', updateNum);
    $('#number2').on('keyup', updateNum);
    $('#calc-input').on('submit', getResult);

    //When the buttons are pressed, changes the input fields and variables
    function calculatorButtons() {

        var buttonPushed = $(this).attr('data-button');

        if (buttonPushed.length > 1) {
            operator = buttonPushed;
            currentNumber++;
            $('#display-number1').text(number1);
            $('#display-operator').text(' ' + operatorDisplay[operator] + ' ');

        } else {
            if (operator == "") {
                number1 += buttonPushed;
                $('#number').val(number1);

            } else {
                number2 += buttonPushed;
                $('#number').val(number2);
            }
        }


    }

    function updateNum() {

        if (currentNumber == 1) {
            number1 = $('#number').val();
        } else {
            number2 = $('#number').val();
        }
    }

    function calculate() {
        event.preventDefault();

        $.ajax({
                type: 'GET',
                url: '/' + operator,

                success: function(data) {

                    $('#result').text(data.solution);
                }
            });
    }

    function getResult() {
        event.preventDefault();
        if (checkData()){
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

                }
            });
        }
}

function displayCalcString() {


}

function resetNumbers(result) {
    number1 = result;
    number2 = '';
    prevOperator = operator;
    operator = '';
    currentNumber = 1;
    $('#display-number1').text(number1);
    $('#display-operator').text('');

}

function clearNums() {


}

function checkData() {
    if (number1!=''&&number2!=''&&operator!='') {
        return true;
    } else {
        return false;
    }
}

});
