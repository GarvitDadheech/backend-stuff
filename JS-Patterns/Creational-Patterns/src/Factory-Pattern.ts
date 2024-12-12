interface Vehicle {
    drive(): void;
  }

class Car implements Vehicle {
    drive(): void {
        console.log("Driving a car!");
    }
}

class Bike implements Vehicle {
    drive(): void {
        console.log("Riding a bike!");
    }
}
  
class VehicleFactory {
    static createVehicle(type: string): Vehicle {
        switch (type) {
        case "car":
            return new Car();
        case "bike":
            return new Bike();
        default:
            throw new Error("Invalid vehicle type");
        }
    }
}

const car = VehicleFactory.createVehicle("car");
car.drive(); // Output: Driving a car!

const bike = VehicleFactory.createVehicle("bike");
bike.drive(); // Output: Riding a bike!
  