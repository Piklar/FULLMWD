// JS Objects, JSON, and ES^ Updates
// JSON = JavaScript Object Notation

let personArray = ["Ernz", 21, true];
console.log(personArray);

let personObject = {
    name: "Ernz",
    age: 21,
    isHandsome: true
}

console.log(personObject);

let student = {
    firstName: "Kristenz",
    middleName: "R.",
    lastName: "Mingoy",
    year: 3,
    section: "A",
    address: {
        houseNo: 98,
        street: "Matalino",
        brgy: "CeeEsEs",
        city: "Candaba",
        province: "Pampanga",
        country: "Philippines"
    },
    contact: [{
        phone: "639290663791",
        email: "krmingoy.student@ua.edu.ph"
    }]
}

console.log(student); // Output: {firstName: 'Kristenz', ...}

// Accessing object property value using dot notation

console.log(student.firstName, student.middleName, student.lastName, student.address.city); // Output: Kristenz R. Mingoy Candaba
console.log(student.contact[0].phone); // Output: 639290663791

// Object Constructor
// "this" and "new" keyword
// "this" Keyword embraces the object property
// "new" Keyword pertains to the duplication of the constructor

function Pet(name, breed, age, color, animalType) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.color = color;
    this.animalType = animalType; // Added animalType property
    this.talk = function() {
        if (this.animalType == "dog") {
            console.log("Arghf Arghf Arghf!!!");
        } else if (this.animalType == "bird") {
            console.log("Tweet Tweet!!!");
        }
    }
}

let Alvin = new Pet("Alvin", "Shitzu", 15, "Black", "dog");
let Ljay = new Pet("Ljay", "Askal", 35, "Red", "dog");
let Nephets = new Pet("Nephets", "Parrot", 42, "Red", "bird");

console.log(Alvin, Ljay, Nephets);
Nephets.talk(); // Calls the talk function for Nephets
console.log(Alvin.color, Ljay.color, Nephets.color);
Alvin.talk(); // Calls the talk function for Alvin

// ES6 Updates
// Template Literal vs Concatenation

let name = "Jack";
console.log("My name is " + name);

console.log(`My name is ${name}`);

console.log(`I have a pet named ${Alvin.name} and he is ${Alvin.age}.`);