import React from 'react'
import { shallow } from 'enzyme'

import Button from './'

describe('Button', () => {
	it('should render', () => {
		const ele = shallow(<Button/>)
		expect(ele.length).toEqual(1)
	})
})