import {checkSubscription} from './check-subscription';
import {Subscription} from 'rxjs';

/**
 * checkSubscription and make new Subscription
 * @param subscription
 */
export function resetSubscription(subscription: Subscription | Subscription[]) {
	checkSubscription(subscription);
	return new Subscription();
}