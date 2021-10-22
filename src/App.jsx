import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ArticleList from './components/Article/ArticleList/ArticleList'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route path="/sign-in" />
        <Route path="/sign-up" />
        <Route path="/profile" />
        <Route path="/articles" />
        <Route path="/new-articles" />
        <Route path="/articles/:slug" />
        <Route path="/articles/:slug/edit" />
      </Switch>
    </Router>
  )
}

export default App
