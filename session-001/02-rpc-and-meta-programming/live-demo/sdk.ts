
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

export async function createMemo(input: {
  title: string;
  content: string;
}): Promise<{
  id: number;
}> {
	return callRPC('createMemo', input)
}

export async function getMemoList(input: {
  page: number;
  count: number;
}): Promise<{
  memos: Array<{
    id: number;
    title: string;
    content: string;
  }>;
}> {
	return callRPC('getMemoList', input)
}
