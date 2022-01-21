import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import {
  createArticle,
  editArticle,
  getArticle,
  onAddArticleTag,
  onChangeArticleForm,
  onChangeArticleTagList,
  onRemoveArticleTag
} from '../../../store/articleSlice'

import './ArticleMutate.scss'

const ArticleMutate = () => {
  const dispatch = useDispatch()
  const { articleForm } = useSelector((state) => state.article)

  const { slug } = useParams()
  const [antForm] = Form.useForm()

  useEffect(() => {
    ;(async () => {
      const response = await dispatch(getArticle(slug)).unwrap()
      antForm.setFieldsValue({
        title: response.article.title,
        description: response.article.description,
        body: response.article.body,
        tagList: response.article.tagList
      })
    })()
  }, [slug])

  const onChangeForm = (event) => {
    dispatch(onChangeArticleForm(event))
  }

  const onChangeTag = (idx, event) => {
    dispatch(onChangeArticleTagList({ idx, event }))
  }

  const onAddTag = (addFn) => {
    addFn()
    dispatch(onAddArticleTag(''))
  }

  const onRemoveTag = (removeFn, fieldName, idx) => {
    removeFn(fieldName)
    dispatch(onRemoveArticleTag(idx))
  }

  const onSubmit = async () => {
    if (slug) {
      const editArticleResponse = await dispatch(
        editArticle({ slug, articleForm })
      )
      if (editArticleResponse.payload.status === 200) {
        message.success('Article has been edited', 2)
      } else {
        message.error(
          `${Object.entries(editArticleResponse.payload.data.errors)
            .join(' ')
            .replace(',', ' ')}`,
          2
        )
      }
    } else {
      const response = await dispatch(createArticle(articleForm))
      if (response.payload.status === 200) {
        message.success('Article has been created', 2)
      } else {
        message.error(
          `${Object.entries(response.payload.data.errors)
            .join(' ')
            .replace(',', ' ')}`,
          2
        )
      }
    }
  }

  return (
    <div className="wrapper">
      <div className="article-mutate__container">
        <div className="article__back">
          <Link to="/" className="ant-btn">
            <ArrowLeftOutlined /> Back
          </Link>
        </div>
        <div className="article-mutate__content">
          <div className="article-mutate__title_block">
            <h2>Create new article</h2>
          </div>
          <div className="article-mutate__form_block">
            <Form
              layout="vertical"
              form={antForm}
              onFinish={onSubmit}
              initialValues={articleForm}
              scrollToFirstError={{
                block: 'center'
              }}
            >
              <Form.Item
                name="title"
                label="Title"
                validateStatus="validating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Title!'
                  }
                ]}
              >
                <Input
                  name="title"
                  value={articleForm.title}
                  onChange={onChangeForm}
                  autoFocus
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Short description"
                validateStatus="validating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Short description!'
                  }
                ]}
              >
                <Input
                  name="description"
                  value={articleForm.description}
                  onChange={onChangeForm}
                />
              </Form.Item>
              <Form.Item
                name="body"
                label="Body"
                validateStatus="validating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Body!'
                  }
                ]}
              >
                <Input.TextArea
                  name="body"
                  value={articleForm.body}
                  onChange={onChangeForm}
                  rows={6}
                />
              </Form.Item>
              <Form.List name="tag">
                {(fields, { add, remove }) => (
                  <div className="article-mutate__tag_list_block">
                    {fields.map((field, index) => (
                      <div
                        className="article-mutate__tags_block"
                        key={field.key}
                      >
                        <Form.Item
                          label={index === 0 && 'tagList'}
                          required={false}
                        >
                          <div className="article-mutate__tag_block">
                            <Form.Item {...field}>
                              <Input
                                placeholder="Tag"
                                name={index}
                                value={articleForm[index]}
                                onChange={(event) => onChangeTag(index, event)}
                              />
                            </Form.Item>
                            {fields.length >= 1 && (
                              <Button
                                className="article-mutate__action_delete"
                                danger
                                onClick={() =>
                                  onRemoveTag(remove, field.name, index)
                                }
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </Form.Item>
                      </div>
                    ))}
                    <Form.Item>
                      <Button onClick={() => onAddTag(add)}>Add tag</Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
              <Form.Item className="article-mutate__submit_block">
                <Button type="primary" htmlType="submit">
                  Sent
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleMutate
