import REST from './'
import { Config } from '../../models'

export default class Configs extends REST {
  constructor () {
    super(Config)
  }
}
