import { login } from './sdk'

export class LoginPage {
  data = {
    username: '',
    password: '',
  }

  async login() {
    let json = await login(this.data)
    if (json.error) return
    history.pushState({}, '', '/profile')
  }
}
