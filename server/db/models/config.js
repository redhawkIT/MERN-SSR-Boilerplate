import mongoose from 'mongoose'

const ConfigSchema = new mongoose.Schema({
  enums: {
    categories: { type: Array, default: ['A', 'B', 'C'] },
    organizations: { type: Object, default: {'Org A': '000', 'Org B': '111', 'Org C': '222'} }
  }
})
const Config = mongoose.model('Config', ConfigSchema)
export default Config

// Generates fakes for new DBs without data
export const dummy = (min = 1, ids = {}) => {
  Config.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Config schema: ${err}`)
    } else if (count < 1) {
      let fake = new Config({})
      Config.create(fake, (error) => {
        if (!error) { console.log(`SEED: Created fake Config scheme`) }
      })
    }
  })
}
