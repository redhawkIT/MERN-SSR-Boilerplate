import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../services'

import { Card, CardTitle, CardText } from 'react-md'

@compose(
  connect(state => ({
    room: state.db.room
  })),
  connectRequest((props) => api.get('room', { id: props.params.id }))
)
class Room extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }
  static defaultProps = {
    room: {}
  }
  render ({ room } = this.props) {

    return (
      <article>
        <Helmet title='Room' />
        <Card className='md-block-centered'>
          <CardTitle title={`Room: ${model.name}`} subtitle={`In ${model.name}`} />
          <CardText>
            <pre>
              <code>{JSON.stringify(room)}</code>
            </pre>
          </CardText>
        </Card>
      </article>
    )
  }
}

export default Room
