// https://github.com/sahat/hackathon-starter
import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import autopopulate from 'mongoose-autopopulate'
import faker from 'faker'

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  username: String,
  email: { type: String, lowercase: true },
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Model' }],
  /*
  Tokens and the google object are used by Oauth for the google (dev) strategy
  You should use a more robust scheme for production
  */
  tokens: Array
})
UserSchema.plugin(autoref, ['reservations.user'])
UserSchema.plugin(autopopulate)
const User = mongoose.model('User', UserSchema)
export default User

// Generates fakes for new DBs without data
export const dummy = (min = 1, ids = {}, developer = {}) => {
  User.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Decision schema: ${err}`)
    } else if (count < min) {
      let fakes = []
      for (let i of fakes) {
        fakes[i] = new User({
          _id: ids.user[i],
          name: faker.name.findName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          reservations: [ids.reservation[i], ids.reservation[i]]
        })
      }
      //  Create a special user for the webdev's profile
      fakes.push(new User({...developer}))
      User.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake User (${fakes.length})`) }
      })
    }
  })
}
export { dummyUsers }
