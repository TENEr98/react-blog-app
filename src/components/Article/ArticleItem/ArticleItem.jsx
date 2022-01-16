import { HeartOutlined } from '@ant-design/icons/lib/icons'
import { format } from 'date-fns'

import './ArticleItem.scss'

const ArticleItem = ({ item }) => {
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
      </div>
    </div>
  )
}

export default ArticleItem
