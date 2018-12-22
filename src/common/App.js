import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from 'common/settings/routes'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					{routes.map(({path, component}) => <Route key={path} path={path} component={component} />)}
				</Switch>
			</div>
		)
	}
}

export default App