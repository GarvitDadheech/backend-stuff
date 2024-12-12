interface PaymentStrategy {
    pay(amount: number): void;
}
  
// Concrete Strategies
class CreditCardPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid ${amount} using Credit Card.`);
    }
}

class PayPalPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class GooglePayPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid ${amount} using Google Pay.`);
    }
}

// Context Class
class PaymentProcessor {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    processPayment(amount: number): void {
        this.strategy.pay(amount);
    }
}
  

const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.processPayment(100); // Paid 100 using Credit Card.

paymentProcessor.setStrategy(new PayPalPayment());
paymentProcessor.processPayment(200); // Paid 200 using PayPal.

paymentProcessor.setStrategy(new GooglePayPayment());
paymentProcessor.processPayment(300); // Paid 300 using Google Pay.
  