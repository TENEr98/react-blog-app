import { HeartOutlined } from '@ant-design/icons/lib/icons'
import { Button, message, Popconfirm } from 'antd'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteArticle } from '../../../store/articleSlice'

import './ArticleItem.scss'

const ArticleItem = ({ item }) => {
  const dispatch = useDispatch()
  const { deleteItem } = useSelector((state) => state.article)

  const navigation = useNavigate()

  const { slug } = useParams()
  const token = localStorage.getItem('t')

  const confirm = async () => {
    if (slug) {
      await dispatch(deleteArticle(slug))
      if (deleteItem.status === 200) {
        message
          .success('Article has been deleted', 2)
          .then(() => navigation('/'))
      } else {
        message.error(deleteItem.data.message, 2)
      }
    } else {
      message.error('Article is not found', 2)
    }
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
              <HeartOutlined />
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
            <span>{format(new Date(item.updatedAt), 'MMMM,dd,yyyy')}</span>
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
            <Button>Edit</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleItem
