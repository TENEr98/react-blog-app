import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { ArticleItem } from '..'
import { getArticle } from '../../../store/articleSlice'
import { LoadingComponent } from '../../Loading'
import './ArticleList.scss'

const ArticleList = () => {
  const dispatch = useDispatch()
  const { response, loading } = useSelector((state) => state.article)

  useEffect(() => {
    dispatch(getArticle({ limit: 20, offset: 0 }))
  }, [])

  console.log(response)
  return (
    <div className="wrapper">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="article-list__container">
<<<<<<< HEAD
          {response.articles.map((item, idx) => (
            <ArticleItem item={item} key={idx} />
          ))}
          <div className="article-pagination">
            <Pagination
              current={1}
              total={response.articlesCount}
              pageSize={10}
            />
          </div>
=======
          {/* {response.articles.map((item) => (
            <ArticleItem item={item} />
          ))} */}
>>>>>>> b6686f0525f42f61a3e5cbb7d43a9ba4d0c10693
        </div>
      )}
    </div>
  )
}

export default ArticleList
