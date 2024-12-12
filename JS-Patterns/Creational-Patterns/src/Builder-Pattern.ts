class Pizza {
    size: string = "";
    toppings: string[] = [];
  
    showDetails(): void {
      console.log(`Pizza Size: ${this.size}, Toppings: ${this.toppings.join(", ")}`);
    }
  }
  
// Builder: Helps to build the Pizza step by step
class PizzaBuilder {
    private pizza: Pizza;

    constructor() {
        this.pizza = new Pizza();
    }

    setSize(size: string): PizzaBuilder {
        this.pizza.size = size;
        return this;
    }

    addTopping(topping: string): PizzaBuilder {
        this.pizza.toppings.push(topping);
        return this;
    }

    build(): Pizza {
        return this.pizza; 
    }
}

// Client Code
const pizza = new PizzaBuilder()
    .setSize("Large")
    .addTopping("Cheese")
    .addTopping("Pepperoni")
    .build();

pizza.showDetails(); // Output: Pizza Size: Large, Toppings: Cheese, Pepperoni
