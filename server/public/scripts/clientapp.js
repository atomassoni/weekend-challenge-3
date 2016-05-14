var number1 = '';
var number2 = '';
var operator = '';
var operatorDisplay = {
    'add': '+',
    'subtract': '-',
    'multiply': 'x',
    'divide': '/'
};


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
        } else {
            if (operator == "") {
                number1 += buttonPushed;
            } else {
                number2 += buttonPushed;
            }
        }


        $('#operator').text(operatorDisplay[operator]);
        $('#number1').val(number1);
        $('#number2').val(number2);


    }

    function updateNum() {
        var num = $(this).attr('data-input');
        if (num == 'number1') {
            number1 = $('#number1').val();
        } else {
            number2 = $('#number2').val();
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
        var calculateThis = {
            'number1': number1,
            'number2': number2
        };
        $.ajax({
                type: 'POST',
                url: '/' + operator,
                data: calculateThis,
                success: function(data) {

                    $('#result').text(data.solution);
                }
            });

}

});
