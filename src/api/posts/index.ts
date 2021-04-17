import { getAll } from './getAll'
import { getOne } from './getOne'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { publish } from './publish'
import { restore } from './restore'
import { User } from '~/api/users'
import { Category } from '~/api/category'

export type Post = {
  id: string
  author: User
  author_id: Maybe<number>
  category: Category
  category_id: Maybe<number>
  slug: Maybe<string>
  name: Maybe<string>
  intro: Maybe<string>
  body: Maybe<string>
  title: Maybe<string>
  description: Maybe<string>
  keywords: Maybe<string>
  source_url: Maybe<string>
  published_at: Maybe<string>
  updated_at: Maybe<string>
  created_at: Maybe<string>
  deleted_at: Maybe<string>
  // image: Maybe<string>
}

export type PostInput = NonNullable<Omit<Post, 'id'>>

export const posts = {
  getAll,
  getOne,
  create,
  update,
  remove,
  publish,
  restore
}
