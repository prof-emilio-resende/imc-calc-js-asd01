var translateImc = function() {
  if (isNaN(this.imc)) return 'N/A';

  if (this.imc < 18.5) return 'magreza';
  if (this.imc < 24.9) return 'normal';
  if (this.imc < 30) return 'sobrepeso';
  if (this.imc >= 30) return 'obesidade';
}

function Person(height, weight) {
  if (typeof(height) !== 'number' || isNaN(height))
    throw Error('height must be a number!');
  if (typeof(weight) !== 'number' || isNaN(weight))
    throw Error('weight must be a number!');

  this.height = height;
  this.weight = weight;
  this.speak = function(text) {
    console.log(this);
    console.log(this.constructor);
    document.getElementById('imc').innerText = text;
  }
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
  this.calculateImc = function() {
    this.imc = this.weight / this.height ** 2;
    return this.imc;
  }

  this.calculateImc();
}

Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function buildCalculateImc() {
  var heightElement = document.getElementById('altura');
  var weightElement = document.getElementById('peso');
  var person = new Dietician(0.00, 0.00);
  console.log('person is Person?');
  console.log(person instanceof Person);

  return function() {
    person.height = parseFloat(heightElement.value);
    person.weight = parseFloat(weightElement.value);
    person.calculateImc();

    person.speak(parseFloat(person.imc).toFixed(2) + ' ' + translateImc.bind(person)());
  }
}

window.onload = function() {
  var btn = document.querySelector('.data .form button');
  btn.addEventListener('click', buildCalculateImc());
}
