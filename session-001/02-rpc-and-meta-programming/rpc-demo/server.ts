import express from 'express'
import { print } from 'listening-on'
import { router } from './api'

let app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

let port = 8200
app.listen(port, () => {
  print(port)
})
