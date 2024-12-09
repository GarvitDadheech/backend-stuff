interface Temperature {
    getTemperatureInFahrenheit(): number;
}
  
class CelsiusTemperature {
    getTemperatureInCelsius(): number {
        return 25; // 25°C
    }
}

class CelsiusToFahrenheitAdapter implements Temperature {
    private celsiusTemperature: CelsiusTemperature;

    constructor(celsiusTemperature: CelsiusTemperature) {
        this.celsiusTemperature = celsiusTemperature;
    }

    getTemperatureInFahrenheit(): number {
        const celsius = this.celsiusTemperature.getTemperatureInCelsius();
        return (celsius * 9/5) + 32; 
    }
}
  

const celsiusTemperature = new CelsiusTemperature();
const adapter = new CelsiusToFahrenheitAdapter(celsiusTemperature);

console.log(`Temperature in Fahrenheit: ${adapter.getTemperatureInFahrenheit()}°F`); 

  