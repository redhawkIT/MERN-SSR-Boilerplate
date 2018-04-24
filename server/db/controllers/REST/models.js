import REST from './'
import { Model } from '../../models'

export default class Models extends REST {
  constructor () {
    super(Model)
  }
}
