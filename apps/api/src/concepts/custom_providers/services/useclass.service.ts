import { Injectable } from '@nestjs/common';

/**
  The useClass provider is useful when you need to bind an interface or abstract class to different implementations dynamically. This pattern is valuable for cases where you might swap out implementations, such as using different service classes based on the environment (e.g., real vs. mock services), or for testing purposes where you need a mock implementation.
 */

export interface PaymentService {
  processPayment(amount: number): string;
}

// Production implementation
@Injectable()
export class StripePaymentService implements PaymentService {
  processPayment(amount: number): string {
    return `Processing $${amount} payment with Stripe.`;
  }
}

// Devlopment Implementation
@Injectable()
export class MockPaymentService implements PaymentService {
  processPayment(amount: number): string {
    return `Mock payment processed for $${amount}.`;
  }
}
