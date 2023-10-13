import { CheckoutComponent } from '../components/checkout/checkout.component';

export const checkoutGuard = (component: CheckoutComponent) => {
    if (component.checkoutForm.dirty && !component.isSubmitted) {
        return confirm(
            "You'll lose the data you entered, are you accountable?"
        );
    }
    return true;
};
