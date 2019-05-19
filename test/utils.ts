import { expect } from 'chai';

import { getSpecialCharPosition } from '../src/utils';

describe('utils', () => {
	describe('getSpecialCharPosition', () => {
		it('finds special char position in middle', () => {
			expect(getSpecialCharPosition('x @foo x', 6)).to.be.equals(2);
		});

		it('finds special char position in beginning', () => {
			expect(getSpecialCharPosition('@foo x', 5)).to.be.equals(0);
		});

		it('finds second char position', () => {
			expect(getSpecialCharPosition('x @foo x @foo x', 14)).to.be.equals(9);
		});

		it('accepts email addresses', () => {
			expect(getSpecialCharPosition('x @foo@company.com x', 20)).to.be.equals(2);
		});
	});
});
