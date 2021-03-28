
function createRequest() {
  var request = null;
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
      request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        console.log('no way to create XMLHttpRequest object')
      }
    }
  }

  return request;
}

function handleImcCalculateResponse(onSuccess) {
  var self = this;
  return function() {
    if (self.readyState == 4) {
      if (self.status == 200) {
        onSuccess(JSON.parse(self.responseText));
      } else {
        // if there's a problem, we'll tell the user
        alert("Sorry, can't calculate.");
      }
    }
  }
}

function calculateImcAPI(person) {
  var request = createRequest();
  if (!request) 'N/A';

  request.onreadystatechange = handleImcCalculateResponse.bind(request)(function(apiPerson) {
    person.imc = apiPerson.imc;
    person.speak(parseFloat(person.imc).toFixed(2) + ' ' + apiPerson.imcDescription);
  });
  request.open('POST', 'http://localhost:8080/imc/calculate', true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify({'height': person.height, 'weight': person.weight}));
}

function handleImcTableResponse(tblRawData) {
  if (tblRawData) {
    var tbl = document.querySelector('#imcTable');
    tbl.innerHTML = '';
      
    var tblObj = JSON.parse(tblRawData);
      
    Object.keys(tblObj).sort().forEach(function(k) {
      var newRow = tbl.insertRow(-1);
      var keyCell = newRow.insertCell(0);
      var keyText = document.createTextNode(k);
      keyCell.appendChild(keyText);

      var newCell = newRow.insertCell(1);
      var valText = document.createTextNode(tblObj[k]);
      newCell.appendChild(valText);
    });
  } else {
    // if there's a problem, we'll tell the user
    alert("Sorry, can't load the table");
  }
}

function callTableFetchAPI() {
  fetch('http://localhost:8080/imc/table')
    .then(function(rawResponse) {
      return rawResponse.json()
        .then(function(response) {
          handleImcTableResponse(JSON.stringify(response));
        });
    });
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
    calculateImcAPI(this);
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
  }
}

window.onload = function() {
  var btn = document.querySelector('.data .form button');
  btn.addEventListener('click', buildCalculateImc());
  callTableFetchAPI();
}
