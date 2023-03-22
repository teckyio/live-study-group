import express from 'express'
import { print } from 'listening-on'
import { apiRouter, defAPI, generateSDK } from './api-factory'

let app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(apiRouter)

type Memo = {
  id: number
  title: string
  content: string
}

let memos = new Map<number, Memo>()

defAPI({
  name: 'createMemo',
  sampleInput: { title: 'demo post', content: 'hello world' },
  sampleOutput: { id: 1 },
  fn: input => {
    let id = memos.size + 1
    memos.set(id, { id, title: input.title, content: input.content })
    return { id }
  },
})

defAPI({
  name: 'getMemoList',
  sampleInput: {},
  sampleOutput: {
    memos: [{ id: 1, title: 'sample title', content: 'sample content' }],
  },
  fn: input => {
    return { memos: Array.from(memos.values()) }
  },
})

generateSDK()

let port = 8100
app.listen(port, () => {
  print(port)
})
