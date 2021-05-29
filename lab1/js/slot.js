let balance = 1000;
const spin_cost = 100;

function runSlots() {
    var slotOne;
    var slotTwo;
    var slotThree;


    var images = ["img/elephant_for_slot.png", "img/rhino_for_slot.png", "img/leo_for_slot.png"];

    slotOne = Math.floor(Math.random() * 3) + 1;
    slotTwo = Math.floor(Math.random() * 3) + 1;
    slotThree = Math.floor(Math.random() * 3) + 1;


    $('.spin').html('SPIN');
    $($('.slot')[0]).html('<img src = "' + images[slotOne-1] + '">');
    $($('.slot')[1]).html('<img src = "' + images[slotTwo-1] + '">');
    $($('.slot')[2]).html('<img src = "' + images[slotThree-1] + '">');

    if(!(slotOne === slotTwo && slotTwo === slotThree)){
        balance-=spin_cost;
    }else {
        if (slotOne == 1){
            balance += 300;
            $('.logger').html("Выигрыш! + 300\n");
            $('.logger').append("Баланс: " + balance);
        }else if(slotTwo == 2){
            balance += 400;
            $('.logger').html("Выигрыш! + 400\n");
            $('.logger').append("Баланс: " + balance);
        }else if(slotThree == 3){
            balance += 500;
            $('.logger').html("Выигрыш! + 500\n");
            $('.logger').append("Баланс: " + balance);
        }
        return null;
    }

    if(balance <= 0){
        $('.logger').html("Баланс закончился\nПопробовать еще?");
        $('.spin').html('Попробовать').click(
            balance = 1000
        );
        return null;
    }

    $('.logger').html("Баланс: " + balance);

    return [slotOne, slotTwo, slotThree];
}

$(document).ready(function() {
    $('.spin').click(function() {
        runSlots();
    });
});