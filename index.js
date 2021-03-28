function translateImc() {
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
    return this.weight / this.height ** 2;
  }

  this.imc = this.calculateImc();
}

Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function calculateImc() {
  var height = parseFloat(document.getElementById('altura').value);
  var weight = parseFloat(document.getElementById('peso').value);

  var person1 = new Dietician(height, weight);
  console.log('person1 is Person?');
  console.log(person1 instanceof Person);
  person1.speak(parseFloat(person1.imc).toFixed(2) + ' ' + translateImc.bind(person1)(imc));
}

window.onload = function() {
  var btn = document.querySelector('.data .form button');
  btn.addEventListener('click', calculateImc);
}
