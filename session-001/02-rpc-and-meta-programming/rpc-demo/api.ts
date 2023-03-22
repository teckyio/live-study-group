import { Router } from 'express'
import { writeFileSync } from 'fs'
import { andType, genTsType } from 'gen-ts-type'

export let router = Router()

type API = {
  name: string
  sampleInput: any
  sampleOutput: any
  fn: (input: any) => any
}

let apis: API[] = []

let code = `import { callRPC } from './sdk-utils'
`

defAPI({
  name: 'login',
  sampleInput: { username: 'alice', password: 'secret' },
  sampleOutput: { token: '123' },
})(input => {
  if (input.username == 'admin') {
    return { token: 'todo' }
  }
  throw new Error('wrong password or username')
})

defAPI({
  name: 'signup',
  sampleInput: { username: 'alice', password: 'secret' },
  sampleOutput: { token: '123' },
})(input => {
  return { token: '123' }
})

defAPI({
  name: 'createMemo',
  sampleInput: { content: 'hello world' },
  sampleOutput: { id: 1 },
})(input => {
  throw new Error('todo')
})

function defAPI<Input, Output>(api: {
  name: string
  sampleInput: Input
  sampleOutput: Output
}) {
  return (fn: (input: Input) => Output | Promise<Output>) => {
    apis.push({
      name: api.name,
      sampleInput: api.sampleInput,
      sampleOutput: api.sampleOutput,
      fn,
    })

    // add express router
    router.post('/rpc/' + api.name, async (req, res) => {
      try {
        let json = await fn(req.body)
        res.json(json)
      } catch (error) {
        res.json({ error: String(error) })
      }
    })
    router.get('/rpc/' + api.name, (req, res) => {
      res.json({ api })
    })

    // generate SDK code
    let InputType = genTsType(api.sampleInput, { format: true })

    let OutputType = genTsType(api.sampleOutput, { format: true })
    OutputType = andType(OutputType, '{ error?: string }')

    code += `
export function ${api.name}(input: ${InputType}): Promise<${OutputType}> {
  return callRPC('${api.name}', input)
}
`
  }
}

writeFileSync('sdk.ts', code)
