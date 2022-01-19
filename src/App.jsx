import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  ArticleDetails,
  ArticleList,
  ArticleMutate
} from './components/Article'
import { EditProfile, SignIn, SignUp } from './components/Auth'
import { Navbar } from './components/Navbar'

import './App.scss'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index path="/" element={<ArticleList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/article">
          <Route index element={<ArticleList />} />
          <Route index={false} path="new" element={<ArticleMutate />} />
          <Route index={false} path=":slug" element={<ArticleDetails />} />
          <Route index={false} path=":slug/edit" />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
