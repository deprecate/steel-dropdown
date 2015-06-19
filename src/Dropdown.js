'use strict';

import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Dropdown.soy';

class Dropdown extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}

	close() {
		dom.removeClasses(this.element, 'open');
	}

	open() {
		dom.addClasses(this.element, 'open');
	}

	toggle() {
		dom.toggleClasses(this.element, 'open');
	}

	syncPosition(position, oldPosition) {
		if (oldPosition) {
			dom.removeClasses(this.element, 'drop' + oldPosition.toLowerCase());
		}
		dom.addClasses(this.element, 'drop' + position.toLowerCase());
	}

	validatePosition_(position) {
		switch(position.toLowerCase()) {
			case 'up':
			case 'down':
				return true;
			default:
				return false;
		}
	}
}

Dropdown.ATTRS = {
	body: {
	},

	header: {
	},

	position: {
		value: 'down',
		validator: 'validatePosition_'
	}
};

/**
 * Default dropdown elementClasses.
 * @default dropdown
 * @type {String}
 * @static
 */
 Dropdown.ELEMENT_CLASSES = 'dropdown';

ComponentRegistry.register('Dropdown', Dropdown);

export default Dropdown;
