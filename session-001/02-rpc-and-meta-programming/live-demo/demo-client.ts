import { createMemo } from './sdk'

async function main() {
  let { id } = await createMemo({
    title: 'my first post',
    content: 'hello world from client',
  })
  console.log('new memo id:', id)
}
main().catch(e => console.error(e))
