// https://wa.me/85298765432?text=Hello I want to purchase product X

function extractTels(text, msg) {
  let params = new URLSearchParams()
  params.set('text', msg)
  return text
    .match(/ ?([\d- ]{8,})/g)
    .map(part => part.replace(/^852 /, '').replace(/ |-/g, ''))
    .map(tel => `https://wa.me/852${tel}?${params}`)
}

let text = `
98765432

9876-5432

852 9876 5432

+852 9876 5432

(+852) 9876 5432

(+852) 98765432

(+852) 9876-5432
`

console.log(extractTels(text, 'Hello, we have a new promotion'))
