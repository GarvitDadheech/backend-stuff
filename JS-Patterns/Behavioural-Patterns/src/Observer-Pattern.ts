interface Observer {
    update(temperature: number): void;
}
  
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

class WeatherStation implements Subject {
    private observers: Observer[] = [];
    private temperature: number = 0;

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    setTemperature(temp: number): void {
        this.temperature = temp;
        this.notify();
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this.temperature);
        }
    }
}

class Display implements Observer {
    constructor(private name: string) {}

    update(temperature: number): void {
        console.log(`${this.name} Display: Current temperature is ${temperature}°C`);
    }
}

const station = new WeatherStation();
const phoneDisplay = new Display("Phone");
const tvDisplay = new Display("TV");

station.attach(phoneDisplay);
station.attach(tvDisplay);

station.setTemperature(25); // Both displays will be notified
station.detach(phoneDisplay);
station.setTemperature(30); // Only TV display is notified
  