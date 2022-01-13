import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { LoadingComponent } from '../../Loading'

import { getArticle } from '../../../store/articleSlice'
import { ArticleItem } from '..'

import './ArticleList.scss'

const ArticleList = () => {
  const dispatch = useDispatch()
  const { response, loading } = useSelector((state) => state.article)

  useEffect(() => {
    dispatch(getArticle())
  }, [])

  return (
    <div className="wrapper">
      {!loading ? (
        <div className="article-list__container">
          {response.articles.map((item) => (
            <ArticleItem item={item} />
          ))}
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  )
}

export default ArticleList
