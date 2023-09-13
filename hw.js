class Vehicle {
  constructor(maxSpeed, tank, lps, kmps) {
    this.currentSpeed = 0;
    this.maxSpeed = maxSpeed;
    this.tank = tank;
    this.lps = lps;
    this.kmps = kmps;
    this.gasConsumed = 0;
    this.kmDrove = 0;
    this.expenses = 0;
    this.money = 10000; /* bani de folosit */
  }

  drive() {
    if (this.currentSpeed < this.maxSpeed) {
      this.currentSpeed += 10;
    }
    this.gasConsumed += this.lps;
    this.kmDrove += this.kmps;
  }

  putGas() {
    if (this.money > 0) {
      const gasToAdd = this.tank - this.gasConsumed;
      if (this.money >= gasToAdd) {
        this.money -= gasToAdd;
        this.gasConsumed = this.tank;
      } else {
        this.gasConsumed += this.money;
        this.money = 0;
      }
    }
  }

  pay(amount) {
    this.expenses += amount;
    this.money -= amount;
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super(120, 30, 0.3, 1.5);
  }
}

class Car extends Vehicle {
  constructor() {
    super(200, 50, 0.5, 2);
  }
}

class Truck extends Vehicle {
  constructor() {
    super(100, 100, 1, 0.9);
  }
}
const motorcycle = new Motorcycle();
const car = new Car();
const truck = new Truck();

let simulationInterval;

function startSimulation() {
    simulationInterval = setInterval(() => {
        motorcycle.drive();
        car.drive();
        truck.drive();
        motorcycle.pay(10000);
        car.pay(5000);
        truck.pay(252525);
        motorcycle.putGas();
        car.putGas();
        truck.putGas();


        updateVehicleStatus(motorcycle, 'motorcycle-speed', 'motorcycle-gas', 'motorcycle-km');
        updateVehicleStatus(car, 'car-speed', 'car-gas', 'car-km');
        updateVehicleStatus(truck, 'truck-speed', 'truck-gas', 'truck-km');

        if (motorcycle.gasConsumed >= motorcycle.tank &&
            car.gasConsumed >= car.tank &&
            truck.gasConsumed >= truck.tank) {
            stopSimulation();
            alert("All vehicles are out of gas! Simulation stopped.");
        }
    }, 1000);
}

function stopSimulation() {
    clearInterval(simulationInterval);
}

function updateVehicleStatus(vehicle, speedId, gasId, kmId) {
    const speedElement = document.getElementById(speedId);
    const gasElement = document.getElementById(gasId);
    const kmElement = document.getElementById(kmId);

    speedElement.textContent = vehicle.currentSpeed.toFixed(2);
    gasElement.textContent = vehicle.gasConsumed.toFixed(2);
    kmElement.textContent = vehicle.kmDrove.toFixed(2);
}

document.getElementById('start-button').addEventListener('click', startSimulation);
document.getElementById('stop-button').addEventListener('click', stopSimulation);
