import Express from 'express'
import config from './config'
import webpack from './webpack'
import routes from './routes'
import connect from "./connect";
import error from './error'
import listen from './listen'

const app = Express()


config(app)
webpack(app)
routes(app)
connect(app)
error(app)
listen(app)
