'use strict';

import CrystalDropdown from 'bower:crystal-dropdown/src/Dropdown';
import Dropdown from '../src/Dropdown';

describe('Dropdown', function() {
	it('should export CrystalDropdown', function() {
		assert.strictEqual(CrystalDropdown, Dropdown);
	});
});
