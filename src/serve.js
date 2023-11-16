import express from 'express'
import { DynamicsRoutes } from './dynamics.router'

class Serve {
  constructor () {
    this.expressInstance = express()

    this.dynamicsRoutes = new DynamicsRoutes()

    this.setRoutes()
  }

  /**
   * attach all dynamics routes to the server
   */
  setRoutes () {
    this.dynamicsRoutes.setupRoutes()
    this.dynamicsRoutes.attachToApp(this.expressInstance)
  }

  /**
   * expose the server on the port specifies in the environments variables or default port 3000
   */
  createServer () {
    const serverPort = process.env.APP_PORT || 3000
    this.expressInstance.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`)
    })
  }
}

const server = new Serve()
server.createServer()
