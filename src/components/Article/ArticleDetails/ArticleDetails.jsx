import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'

import { getArticle } from '../../../store/articleSlice'
import { Loader } from '../../Loader'
import { ArticleItem } from '../ArticleItem'

import './ArticleDetails.scss'

const ArticleDetails = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { articleItem, loading } = useSelector((state) => state.article)

  useEffect(() => {
    dispatch(getArticle(slug))
  }, [slug])

  return (
    <div className="wrapper">
      <div className="article-detail__container">
        <div className="article__back">
          <Link to="/" className="ant-btn">
            <ArrowLeftOutlined /> Back
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {articleItem.article.title ? (
              <div className="article-detail__content">
                <ArticleItem item={articleItem.article} />
                <div className="article-detail__desc">
                  {articleItem.article.description}
                </div>
              </div>
            ) : (
              <div className="article-detail__deleted">
                This post has been deleted
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ArticleDetails
