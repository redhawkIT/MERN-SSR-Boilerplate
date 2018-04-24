import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import faker from 'faker'

const ModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
ModelSchema.plugin(autoref, [
  'user.models'
])
const Model = mongoose.model('Model', ModelSchema)
export default Model

// Generates fakes for new DBs without data
export const dummy = (min = 1, ids = {}, developer = {}) => {
  Model.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Model schema: ${err}`)
    } else if (count < min) {
      let fakes = []
      for (let i of fakes) {
        fakes[i] = new Model({
          _id: ids.model[i],
          name: faker.company.bsNoun(),
          user: ids.user[i]
        })
      }
      //  Create will push our fakes into the DB.
      Model.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Model (${fakes.length})`) }
      })
    }
  })
}
