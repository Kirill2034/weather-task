import React from 'react'
import Weather from './containers/Weather/Weather'
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'


class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={'/'} component={Weather} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;