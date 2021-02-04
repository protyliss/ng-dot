import {Subscription} from 'rxjs';

/**
 * Unsubscribe Subscription, If Declared Subscription
 * @param subscription
 * @param newSubscription
 */
export function checkSubscription(subscription: Subscription | Subscription[], newSubscription?: Subscription) {
	if (subscription) {
		if (Array.isArray(subscription)) {
			subscription.map(unsubscribeMapper);
		} else {
			subscription.unsubscribe();
		}
	}
	
	return newSubscription || null;
}

function unsubscribeMapper(subscription: Subscription) {
	subscription.unsubscribe();
}