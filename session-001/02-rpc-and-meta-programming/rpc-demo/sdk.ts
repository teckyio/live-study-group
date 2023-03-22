import { callRPC } from './sdk-utils'

export function login(input: {
  username: string;
  password: string;
}): Promise<{
  token: string;
} & { error?: string }> {
  return callRPC('login', input)
}

export function signup(input: {
  username: string;
  password: string;
}): Promise<{
  token: string;
} & { error?: string }> {
  return callRPC('signup', input)
}
