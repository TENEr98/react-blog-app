import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { ArticleItem } from '..'
import { getArticleList } from '../../../store/articleSlice'
import { Loader } from '../../Loader'
import './ArticleList.scss'

const ArticleList = () => {
  const dispatch = useDispatch()
  const { articleList } = useSelector((state) => state.article)

  useEffect(() => {
    dispatch(getArticleList({ limit: 20, offset: 0 }))
  }, [])

  if (!articleList) return <Loader />

  return (
    <div className="wrapper">
      <div className="article-list__container">
        {articleList.articles.map((item, idx) => (
          <ArticleItem item={item} key={idx} />
        ))}
        <div className="article-pagination">
          <Pagination
            current={1}
            total={articleList.articlesCount}
            pageSize={20}
          />
        </div>
      </div>
    </div>
  )
}

export default ArticleList
