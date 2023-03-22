// this should be configured to the actual origin
let api_origin = 'http://localhost:8100/rpc'

// this can be replaced with sweet alert or ionic toast
export let showError: (error: string) => void = alert

// this is called by each RPC client-stub
export function callRPC(name: string, input: object) {
  let promise = Promise.resolve(input)
    .then(input =>
      fetch(api_origin + '/' + name, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(input),
      }),
    )
    .then(res => res.json())
    .catch(err => ({ error: String(err) }))

  promise.then(json => {
    if (json.error) {
      showError(json.error)
    }
  })

  return promise
}
