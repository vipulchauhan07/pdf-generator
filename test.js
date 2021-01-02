// function add(num1, num2) {
//     return num1 + num2;
// }

// function multiply(num1, num2) {
//     return num1 * num2;
// }

// function substract(num1, num2) {
//     return Math.abs(num2-num1);
// }

// function calculator(num1, num2, operator) {
//     return operator(num1, num2);
// }

// console.log("Add : " + calculator(2, 3, add));
// console.log("substract : " + calculator(2, 3, substract));
// console.log("Multiply : " + calculator(4, 5, multiply));


var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for(var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var audio = new Audio("Big_Thwack.mp3");
        // var audio2 = new Audio("Boom_Chuk_130.mp3")
        audio.play();
        // audio2.play();
    })
}

var houseKeeper1 = {
    age: 14,
    name: "shubham",
    cleaningThings: ["bathroom", "room", "kitchen"],
    knownLanguages : ["hindi", "english"]
}

function HouseKeeper(age, name, cleaningThings, knownLanguages) {
    this.age = age;
    this.name = name;
    this.cleaningThings = cleaningThings;
    this.knownLanguages = knownLanguages;
    this.cleaning = function () {
        console.log(".......Cleaning in Progress......");
    }
}

var houseKeeper2 = new HouseKeeper(23, "vipul chauhan", ["room", "bed"], ["hindi", "english"]);

console.log(houseKeeper2.cleaning());

document.addEventListener("keypress", function (e) {
    console.log(e);
});