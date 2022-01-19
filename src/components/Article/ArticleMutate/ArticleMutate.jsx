import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { onChangeArticleForm } from '../../../store/articleSlice'

import './ArticleMutate.scss'

const ArticleMutate = () => {
  const dispatch = useDispatch()
  const { articleForm } = useSelector((state) => state.article)

  const [antForm] = Form.useForm()

  const onChangeForm = (event) => {
    dispatch(onChangeArticleForm(event))
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
              <Form.List name="tags">
                {(fields, { add, remove }) => (
                  <div className="article-mutate__tag_list_block">
                    {fields.map((field, index) => (
                      <div
                        className="article-mutate__tags_block"
                        key={field.key}
                      >
                        <Form.Item
                          label={index === 0 ? 'Tags' : ''}
                          required={false}
                        >
                          <div className="article-mutate__tag_block">
                            <Form.Item {...field}>
                              <Input placeholder="Tag" />
                            </Form.Item>
                            {fields.length >= 1 ? (
                              <Button
                                className="article-mutate__action_delete"
                                danger
                                onClick={() => remove(field.name)}
                              >
                                Delete
                              </Button>
                            ) : null}
                          </div>
                        </Form.Item>
                      </div>
                    ))}
                    <Form.Item>
                      <Button onClick={() => add()}>Add tag</Button>
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
