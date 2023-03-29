function isEmail(email) {
  let parts = email.split('@')
  if (parts.length != 2) return false
  let [username, domain] = parts
  if (!username.match(/^[\w-\.]+$/)) return false
  parts = domain.split('.')
  if (parts.length < 2) return false
  for (let part of parts) {
    if (part.length < 1) return false
  }
  let tld = parts.pop()
  if (tld.length < 2) return false
  return true
}

let tests = [
  'alice@gmail.com',
  'alice@.',
  'alice-wong@gmail.co',
  'alice.wong@gmail.c',
  'alice_wong@gmail.co',
  'alice wong@gmail.co',
  'alice!wong@gmail.co',
  'alice_wong@gmail',
  'alice_wong.gmail',
]

for (let test of tests) {
  console.log({
    test,
    result: isEmail(test),
  })
}
