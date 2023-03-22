import { createMemo, getMemoList } from './sdk'

async function main() {
  let { id } = await createMemo({
    title: 'my first post',
    content: 'hello world from client',
  })
  console.log('new memo id:', id)

  let { memos } = await getMemoList({ page: 1, count: 5 })
  console.log('memo list:', memos)
}
main().catch(e => console.error(e))
