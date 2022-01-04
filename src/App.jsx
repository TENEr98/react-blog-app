import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ArticleList } from './components/Article'
import { EditProfile, SignIn, SignUp } from './components/Auth'
import { Navbar } from './components/Navbar'

import './App.scss'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<ArticleList />}>
          <Route path="article" element={<ArticleList />}>
            <Route path="new" />
            <Route path=":slug" />
            <Route path=":slug/edit" />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
