// @flow

import React, { Component } from 'react'

type Props = {
	wrapClass: string,
	id: string,
	label: string,
	icon: string,
	disabled: boolean,

	btnType: string,
	btnStyle: string,

	onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void
}

class Button extends Component<Props> {
	render() {
		const { id, wrapClass, btnStyle, icon, onClick, disabled, btnType, label } = this.props
		return (
			<button id={id}
				onClick={onClick} disabled={disabled} type={btnType}
				className={`${wrapClass ? wrapClass : ''} ${btnStyle ? btnStyle : 'btn'} Button waves-effect waves-dark input-field`}
			>
				{icon && <i className={`${label ? 'right' : ''} material-icons`}>{icon}</i>}
				{label && label}
			</button>
		)
	}
}

export default Button