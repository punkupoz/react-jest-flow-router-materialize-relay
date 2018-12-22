import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { AUTH_TOKEN } from 'common/utils/types'

let {
	REACT_APP_API_ENDPOINT,
	REACT_APP_WS_ENDPOINT,
	REACT_APP_JWT_HEADER,
	REACT_APP_JWT_BEARER
} = process.env

const fetchQuery = (operation, variables) => {
	return fetch(REACT_APP_API_ENDPOINT, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			[REACT_APP_JWT_HEADER]:`${REACT_APP_JWT_BEARER} ${localStorage.getItem(AUTH_TOKEN)}`
		},
		body: JSON.stringify({
			query: operation.text,
			variables
		})
	})
	.then(res => res.json())
	.then(json => {
		if (operation.operationKind === 'mutation' && json.errors) return Promise.reject(json.errors)

		return Promise.resolve(json)
	})
	.catch(e => {
		if(!e.length) throw [{ message: 'Application error, please retry'}]

		throw e
	})
}

const subscriptionHandler = (config, variables, cacheConfig, observer) => {
	const query = config.text
	const subscriptionClient = new SubscriptionClient(REACT_APP_WS_ENDPOINT, {reconnect: true})

	subscriptionClient.subscribe({query, variable}, (err, result) => {
		observer.onNext({data: result})
	})
}

export default new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource())
})