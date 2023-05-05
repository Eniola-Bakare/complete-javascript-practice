'use strict';


// working with constructor for OOP
const Person = function(firstName, lastName, YOB){
  this.firstName = firstName
  this.lastName = lastName
  this.YOB = YOB
}

const eniola = new Person('EniolaOluwa', 'Bakare', 1992)
console.log(eniola)

// prototype
Person.prototype.calcAge = function(){
  console.log(`${this.firstName} is`, 2037 - this.YOB)
}

eniola.calcAge()


Person.prototype.specie = 'Homo Sapiencs'
// console.log(eniola)
// console.log(eniola.hasOwnProperty('specie'))
// console.log(eniola.hasOwnProperty('firstName'))
// console.log(eniola.__proto__ === Person.prototype)
// console.log( Person.prototype === eniola.__proto__)


// coding challenge 1

const Car = function(make, speed){
  this.make = make
  this.speed = speed
}

Car.prototype.accelerate = function(){
  this.speed += 10
  console.log(`${this.make} is going at ${this.speed} km/h`)
}

Car.prototype.brake = function(){
  this.speed -= 5
  console.log(`${this.make} is going at ${this.speed} km/h`);
}

const camry = new Car ('Camry', 40)
console.log(camry)
// camry.accelerate()
// camry.brake()
// camry.accelerate()
// camry.brake()
// camry.accelerate()
// camry.accelerate()
// camry.brake()


// ES6 Classes

// class expression
const PersonCl = class{
  constructor(firstName, yob){
    this.firstname = firstName
    this.yob = yob
  }

  greeting(){
    console.log(`Hey ${this.firstname}, how are you today?`)
  }
}

const neyen = new PersonCl ('Neyen', 2001)
console.log(neyen)
  neyen.greeting()

// class declaration

class PersonEl {
  constructor(firstName, yob){
    this.name = firstName
    this.yob = yob
  }

  // methods (.prototype.method/property)

  calcAge(){
    console.log(2037 - this.yob)
  }

  greeting(){
    console.log(`Hey ${this.name}`)
  }
}

const jessica = new PersonEl ('Jessica', 1979)
console.log(jessica)
jessica.calcAge()
jessica.greeting()

// coding challenge 2
// re-writing coding challenge 1 with E6classes 

class Car2 {
  constructor(make, speed){
    this.make = make
    this.speed = speed
  }

  accelerate(){
    this.speed += 10
    console.log(`${this.make} is going at ${this.speed} km/h`)
  }
  
  brake (){
    this.speed -= 5
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  get speedUS(){
    this.speed /1.6
  }
  set speedUS(speed){
    this.speed = speed* 1.6
  }
}

const ford = new Car2('Ford', 120)

ford.accelerate()
ford.brake()
ford.accelerate()
ford.speedUS = 120
console.log(ford.speed)