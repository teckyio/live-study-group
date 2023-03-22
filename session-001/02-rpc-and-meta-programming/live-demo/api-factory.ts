import { Router } from 'express'
import { writeFileSync } from 'fs'
import { genTsType } from 'gen-ts-type'

export let apiRouter = Router()

let code = `
let api_origin = 'http://localhost:8100'

async function callRPC(name: string, input: object){
	let res = await fetch(api_origin + '/rpc/' + name, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(input)
	})
	let json = await res.json()
	return json
}
`

export function defAPI<Input, Output>(input: {
  name: string
  sampleInput: Input
  sampleOutput: Output
  fn: (input: Input) => Output | Promise<Output>
}) {
  let inputType = genTsType(input.sampleInput, { format: true })
  let outputType = genTsType(input.sampleOutput, { format: true })

  code += `
export async function ${input.name}(input: ${inputType}): Promise<${outputType}> {
	return callRPC('${input.name}', input)
}
`

  apiRouter.get('/rpc/' + input.name, (req, res) => {
    res.json({
      name: input.name,
      sampleInput: input.sampleInput,
      sampleOutput: input.sampleOutput,
    })
  })

  apiRouter.post('/rpc/' + input.name, async (req, res) => {
    try {
      let json = await input.fn(req.body)
      res.json(json)
    } catch (error) {
      res.json({ error: String(error) })
    }
  })
}

export function generateSDK() {
  writeFileSync('sdk.ts', code)
  console.log('saved to sdk.ts')
}
