import {Dates, DateLike} from './dates';

const periodGlue = '~';

export type PeriodLike = Period | DateLike;

export interface SplitedPeriod {
	past?: Period;
	future?: Period;
}

/**
 * pair of Dates as meaning of period
 */
export class Period {
	begin: Dates;
	end: Dates;

	static by(begin: PeriodLike, end?: DateLike);
	static by(begin, end?) {
		if (begin instanceof Period) {
			return begin;
		}
		if (end instanceof Period) {
			throw new Error('the `end` cannot be Period Instance');
		}
		return new Period(begin, end);
	}

	static timestamp(begin: Period | DateLike, end?: DateLike);
	static timestamp(begin, end?) {
		return Period.by(begin, end).timestamp();
	}

	constructor(begin: DateLike, end?: DateLike);
	constructor(begin, end?) {
		if (!end) {
			if (typeof begin === 'string') {
				if (this.hasGlue(begin)) {
					const periodString = (begin as string).split(periodGlue);

					begin = periodString[0] || new Dates;
					end = periodString[1] || new Dates;
				}
			} else {
				end = new Dates;
			}
		}
		
		this.begin = Dates.by(begin);
		this.end = Dates.by(end);
	}

	/**
	 * check the `DateLike` string has glue
	 * @param date
	 */
	protected hasGlue(date: DateLike) {
		if (typeof date === 'string') {
			return date.indexOf(periodGlue) > -1;
		}
		return false;
	}

	/**
	 * get period string
	 */
	timestamp() {
		return this.begin.timestamp() + '~' + this.end.timestamp();
	}

	/**
	 * split the period to past and future period
	 * @param separator
	 */
	split(separator?: DateLike): SplitedPeriod;
	split(separator = new Dates) {
		separator = separator.onTime();

		const {begin, end} = this;
		if (begin < separator) {
			const past = new Period(begin, separator);
			if (end > separator) {
				return {
					past,
					future: new Period(separator, end)
				};
			}
			return {
				past
			};
		}
		return {
			future: this
		};
	}
}
