'use strict';

import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import EventHandler from 'bower:metal/src/events/EventHandler';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Dropdown.soy';

class Dropdown extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
		this.eventHandler_ = new EventHandler();
	}

	attached() {
		super.attached();
		this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
	}

	detached() {
		super.detached();
		this.eventHandler_.removeAllListeners();
	}

	close() {
		dom.removeClasses(this.element, 'open');
	}

	isOpen() {
		return dom.hasClass(this.element, 'open');
	}

	/**
	 * Handles document click in order to hide menu.
	 * @param {Event} event
	 */
	handleDocClick_(event) {
		if (this.element.contains(event.target)) {
			return;
		}
		this.close();
	}

	open() {
		dom.addClasses(this.element, 'open');
	}

	syncPosition(position, oldPosition) {
		if (oldPosition) {
			dom.removeClasses(this.element, 'drop' + oldPosition.toLowerCase());
		}
		dom.addClasses(this.element, 'drop' + position.toLowerCase());
	}

	toggle() {
		dom.toggleClasses(this.element, 'open');
	}

	validatePosition_(position) {
		switch (position.toLowerCase()) {
			case 'up':
			case 'down':
				return true;
			default:
				return false;
		}
	}
}

Dropdown.ATTRS = {
	body: {},

	header: {},

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
