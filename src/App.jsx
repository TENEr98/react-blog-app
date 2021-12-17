import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ArticleList from './components/Article/ArticleList/ArticleList'
import SignIn from './components/Auth/SignIn/SignIn'
import SignUp from './components/Auth/SignUp/SignUp'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route path="/articles" />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/profile" />
        <Route path="/new-articles" />
        <Route path="/articles/:slug" />
        <Route path="/articles/:slug/edit" />
      </Switch>
    </Router>
  )
}

export default App
