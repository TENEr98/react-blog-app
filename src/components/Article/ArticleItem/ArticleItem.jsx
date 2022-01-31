import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib/icons'
import { Button, message, Popconfirm } from 'antd'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { createLikeArticle, deleteArticle } from '../../../store/articleSlice'

import './ArticleItem.scss'

const ArticleItem = ({ item }) => {
  const dispatch = useDispatch()

  const navigation = useNavigate()

  const { slug } = useParams()
  const token = localStorage.getItem('t')

  const confirm = async () => {
    if (slug) {
      const response = await dispatch(deleteArticle(slug)).unwrap()

      if (response.status === 204) {
        message
          .success('Article has been deleted', 2)
          .then(() => navigation('/'))
      } else {
        message.error(response.data.message, 2)
      }
    } else {
      message.error('Article is not found', 2)
    }
  }

  const onLike = async (slug) => {
    await dispatch(createLikeArticle(slug))
  }

  return (
    <div className="article-item__content">
      <div className="article-item__header">
        <div className="article-item__title_block">
          <div className="article-item__title">
            <a href={`/article/${item.slug}`} title={item.title}>
              {item.title}
            </a>
            <div className="article-item__title_like_block">
              <div onClick={() => onLike(item.slug)}>
                {item?.favorityBy?.length > 0 ? (
                  <HeartFilled style={{ color: '#FF0707' }} />
                ) : (
                  <HeartOutlined />
                )}
              </div>
              <span>{item.favoritesCount}</span>
            </div>
          </div>
          <div className="article-item__tag_block">
            <ul className="article-item__tag_list">
              {item.tagList.map((tag, idx) => (
                <li
                  className="article-item__tag"
                  key={`${item.title}${tag}${idx}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="article-item__profile_block">
          <div className="article-item__profile_details">
            <h6>{item.author.username}</h6>
            <span>{format(new Date(item.updatedAt), 'MMMM dd, yyyy')}</span>
          </div>
          <div className="article-item__profile_img_block">
            <img
              src={item.author.image}
              alt={item.author.username}
              className="article-item__profile_img"
            />
          </div>
        </div>
      </div>
      <div className="article-item__main">
        <p>{item.body}</p>
        {token && slug && (
          <div className="article-item__action_block">
            <Popconfirm
              placement="bottomLeft"
              title="Are you sure to delete this article?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <NavLink className="ant-btn" to={`/article/${slug}/edit`}>
              Edit
            </NavLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleItem
