import type { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  JSON: { input: any; output: any; }
};

export type IGenAsset = {
  __typename?: 'Asset';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  author?: Maybe<Scalars['String']['output']>;
  blurHash?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keywords?: Maybe<Scalars['String']['output']>;
  originType?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type IGenAsset_Connection = {
  __typename?: 'Asset_Connection';
  edges?: Maybe<Array<Maybe<IGenAsset_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenAsset_ConnectionEdge = {
  __typename?: 'Asset_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenAsset>;
};

export type IGenAsset_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenAsset_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenAsset_Nested_Where>>>;
  author?: InputMaybe<IGenCaisyField_String_Where>;
  blurHash?: InputMaybe<IGenCaisyField_String_Where>;
  copyright?: InputMaybe<IGenCaisyField_String_Where>;
  description?: InputMaybe<IGenCaisyField_String_Where>;
  dominantColor?: InputMaybe<IGenCaisyField_Color_Where>;
  height?: InputMaybe<IGenCaisyField_Number_WhereInt>;
  keywords?: InputMaybe<IGenCaisyField_String_Where>;
  originType?: InputMaybe<IGenCaisyField_String_Where>;
  originalName?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
  width?: InputMaybe<IGenCaisyField_Number_WhereInt>;
};

export type IGenAsset_Sort = {
  author?: InputMaybe<IGenOrder>;
  blurHash?: InputMaybe<IGenOrder>;
  copyright?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  description?: InputMaybe<IGenOrder>;
  dominantColor?: InputMaybe<IGenOrder>;
  height?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  keywords?: InputMaybe<IGenOrder>;
  originType?: InputMaybe<IGenOrder>;
  originalName?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
  width?: InputMaybe<IGenOrder>;
};

export type IGenAsset_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenAsset_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenAsset_Where>>>;
  author?: InputMaybe<IGenCaisyField_String_Where>;
  blurHash?: InputMaybe<IGenCaisyField_String_Where>;
  copyright?: InputMaybe<IGenCaisyField_String_Where>;
  description?: InputMaybe<IGenCaisyField_String_Where>;
  dominantColor?: InputMaybe<IGenCaisyField_Color_Where>;
  height?: InputMaybe<IGenCaisyField_Number_WhereInt>;
  keywords?: InputMaybe<IGenCaisyField_String_Where>;
  originType?: InputMaybe<IGenCaisyField_String_Where>;
  originalName?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
  width?: InputMaybe<IGenCaisyField_Number_WhereInt>;
};

export type IGenAuthor = {
  __typename?: 'Author';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  avatar?: Maybe<IGenAsset>;
  bio?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};


export type IGenAuthorAvatarArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenAuthor_Avatar_Where = {
  findOne?: InputMaybe<IGenAuthor_Avatar_WhereConnection>;
};

export type IGenAuthor_Avatar_WhereConnection = {
  Asset?: InputMaybe<IGenAsset_Nested_Where>;
};

export type IGenAuthor_Connection = {
  __typename?: 'Author_Connection';
  edges?: Maybe<Array<Maybe<IGenAuthor_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenAuthor_ConnectionEdge = {
  __typename?: 'Author_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenAuthor>;
};

export type IGenAuthor_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenAuthor_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenAuthor_Nested_Where>>>;
  bio?: InputMaybe<IGenCaisyField_String_Where>;
  name?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenAuthor_Sort = {
  avatar?: InputMaybe<IGenOrder>;
  bio?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  name?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenAuthor_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenAuthor_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenAuthor_Where>>>;
  avatar?: InputMaybe<IGenAuthor_Avatar_Where>;
  bio?: InputMaybe<IGenCaisyField_String_Where>;
  name?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenBlogArticle = {
  __typename?: 'BlogArticle';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  author?: Maybe<IGenAuthor>;
  category?: Maybe<IGenCategory>;
  featured?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  tags?: Maybe<Array<Maybe<IGenBlogArticle_Tags>>>;
  teaserDesciption?: Maybe<Scalars['String']['output']>;
  teaserHeadline?: Maybe<Scalars['String']['output']>;
  teaserImage?: Maybe<IGenAsset>;
  text?: Maybe<IGenBlogArticle_Text>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenBlogArticleAuthorArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenBlogArticleCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenBlogArticleTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenBlogArticleTeaserImageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenBlogArticleTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenBlogArticle_Author_Where = {
  findOne?: InputMaybe<IGenBlogArticle_Author_WhereConnection>;
};

export type IGenBlogArticle_Author_WhereConnection = {
  Author?: InputMaybe<IGenAuthor_Nested_Where>;
};

export type IGenBlogArticle_Category_Where = {
  findOne?: InputMaybe<IGenBlogArticle_Category_WhereConnection>;
};

export type IGenBlogArticle_Category_WhereConnection = {
  Category?: InputMaybe<IGenCategory_Nested_Where>;
};

export type IGenBlogArticle_Connection = {
  __typename?: 'BlogArticle_Connection';
  edges?: Maybe<Array<Maybe<IGenBlogArticle_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenBlogArticle_ConnectionEdge = {
  __typename?: 'BlogArticle_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenBlogArticle>;
};

export type IGenBlogArticle_Sort = {
  author?: InputMaybe<IGenOrder>;
  category?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  featured?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  tags?: InputMaybe<IGenOrder>;
  teaserDesciption?: InputMaybe<IGenOrder>;
  teaserHeadline?: InputMaybe<IGenOrder>;
  teaserImage?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenBlogArticle_Tags_Where = {
  findOne?: InputMaybe<IGenBlogArticle_Tags_WhereConnection>;
};

export type IGenBlogArticle_Tags_WhereConnection = {
  BlogPostTag?: InputMaybe<IGenBlogPostTag_Nested_Where>;
};

export type IGenBlogArticle_TeaserImage_Where = {
  findOne?: InputMaybe<IGenBlogArticle_TeaserImage_WhereConnection>;
};

export type IGenBlogArticle_TeaserImage_WhereConnection = {
  Asset?: InputMaybe<IGenAsset_Nested_Where>;
};

export type IGenBlogArticle_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenBlogArticle_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenBlogArticle_Where>>>;
  author?: InputMaybe<IGenBlogArticle_Author_Where>;
  category?: InputMaybe<IGenBlogArticle_Category_Where>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<IGenBlogArticle_Tags_Where>;
  teaserDesciption?: InputMaybe<IGenCaisyField_String_Where>;
  teaserHeadline?: InputMaybe<IGenCaisyField_String_Where>;
  teaserImage?: InputMaybe<IGenBlogArticle_TeaserImage_Where>;
  text?: InputMaybe<IGenCaisyField_Richtext_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenBlogArticle_Tags = IGenBlogPostTag;

export type IGenBlogArticle_Text = {
  __typename?: 'BlogArticle_text';
  connections?: Maybe<Array<Maybe<IGenBlogArticle_Text_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenBlogArticle_TextConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenBlogArticle_Text_Connections = IGenAsset | IGenCodeBlock;

export type IGenBlogPostTag = {
  __typename?: 'BlogPostTag';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  background?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type IGenBlogPostTag_Connection = {
  __typename?: 'BlogPostTag_Connection';
  edges?: Maybe<Array<Maybe<IGenBlogPostTag_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenBlogPostTag_ConnectionEdge = {
  __typename?: 'BlogPostTag_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenBlogPostTag>;
};

export type IGenBlogPostTag_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenBlogPostTag_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenBlogPostTag_Nested_Where>>>;
  background?: InputMaybe<IGenCaisyField_Color_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenBlogPostTag_Sort = {
  background?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenBlogPostTag_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenBlogPostTag_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenBlogPostTag_Where>>>;
  background?: InputMaybe<IGenCaisyField_Color_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCaisyDocument_Meta = {
  __typename?: 'CaisyDocument_Meta';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  locales?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IGenCaisyField_Color_Where = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCaisyField_Number_WhereInt = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type IGenCaisyField_Richtext_Where = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCaisyField_String_Where = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCaisy_Field_Tag = {
  __typename?: 'Caisy_Field_Tag';
  color?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type IGenCategory = {
  __typename?: 'Category';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type IGenCategory_Connection = {
  __typename?: 'Category_Connection';
  edges?: Maybe<Array<Maybe<IGenCategory_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenCategory_ConnectionEdge = {
  __typename?: 'Category_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCategory>;
};

export type IGenCategory_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCategory_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCategory_Nested_Where>>>;
  name?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCategory_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  name?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCategory_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
  name?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCodeBlock = {
  __typename?: 'CodeBlock';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type IGenCodeBlock_Connection = {
  __typename?: 'CodeBlock_Connection';
  edges?: Maybe<Array<Maybe<IGenCodeBlock_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenCodeBlock_ConnectionEdge = {
  __typename?: 'CodeBlock_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCodeBlock>;
};

export enum IGenCodeBlock_Language {
  Javascript = 'javascript',
  Typescript = 'typescript'
}

export type IGenCodeBlock_Language_Where = {
  eq?: InputMaybe<IGenCodeBlock_Language>;
};

export type IGenCodeBlock_Sort = {
  code?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  language?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCodeBlock_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCodeBlock_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCodeBlock_Where>>>;
  code?: InputMaybe<IGenCaisyField_String_Where>;
  language?: InputMaybe<IGenCodeBlock_Language_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export enum IGenOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type IGenPageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type IGenQuery = {
  __typename?: 'Query';
  Asset?: Maybe<IGenAsset>;
  Author?: Maybe<IGenAuthor>;
  BlogArticle?: Maybe<IGenBlogArticle>;
  BlogPostTag?: Maybe<IGenBlogPostTag>;
  Category?: Maybe<IGenCategory>;
  CodeBlock?: Maybe<IGenCodeBlock>;
  Tag?: Maybe<IGenCaisy_Field_Tag>;
  allAsset?: Maybe<IGenAsset_Connection>;
  allAuthor?: Maybe<IGenAuthor_Connection>;
  allBlogArticle?: Maybe<IGenBlogArticle_Connection>;
  allBlogPostTag?: Maybe<IGenBlogPostTag_Connection>;
  allCategory?: Maybe<IGenCategory_Connection>;
  allCodeBlock?: Maybe<IGenCodeBlock_Connection>;
  allTags?: Maybe<IGenTag_Connection>;
};


export type IGenQueryAssetArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryAuthorArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryBlogArticleArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryBlogPostTagArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCodeBlockArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryTagArgs = {
  id: Scalars['ID']['input'];
};


export type IGenQueryAllAssetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenAsset_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenAsset_Where>>>;
};


export type IGenQueryAllAuthorArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenAuthor_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenAuthor_Where>>>;
};


export type IGenQueryAllBlogArticleArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenBlogArticle_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenBlogArticle_Where>>>;
};


export type IGenQueryAllBlogPostTagArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenBlogPostTag_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenBlogPostTag_Where>>>;
};


export type IGenQueryAllCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenCategory_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
};


export type IGenQueryAllCodeBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenCodeBlock_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenCodeBlock_Where>>>;
};


export type IGenQueryAllTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type IGenTag_Connection = {
  __typename?: 'Tag_Connection';
  edges?: Maybe<Array<Maybe<IGenTag_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenTag_ConnectionEdge = {
  __typename?: 'Tag_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCaisy_Field_Tag>;
};

export type IGenBlogArticleMetaFragment = { __typename?: 'BlogArticle', id?: string | null, teaserDesciption?: string | null, teaserHeadline?: string | null, title?: string | null, _meta?: { __typename?: 'CaisyDocument_Meta', publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', name?: string | null, id?: string | null } | null, teaserImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'BlogPostTag', id?: string | null, title?: string | null, background?: string | null } | null> | null };

export type IGenAllBlogArticleByLocaleQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenAllBlogArticleByLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', cursor?: string | null, node?: (
        { __typename?: 'BlogArticle' }
        & IGenBlogArticleMetaFragment
      ) | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null, hasPreviousPage?: boolean | null, startCursor?: string | null } | null } | null };

export type IGenAllBlogArticlesByCategoryAndLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  categoryName: Scalars['String']['input'];
}>;


export type IGenAllBlogArticlesByCategoryAndLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: (
        { __typename?: 'BlogArticle' }
        & IGenBlogArticleMetaFragment
      ) | null } | null> | null } | null };

export type IGenAllBlogArticlesByTagAndLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  tagName: Scalars['String']['input'];
}>;


export type IGenAllBlogArticlesByTagAndLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: (
        { __typename?: 'BlogArticle' }
        & IGenBlogArticleMetaFragment
      ) | null } | null> | null } | null };

export type IGenAllBlogPostTagsByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
}>;


export type IGenAllBlogPostTagsByLocaleQuery = { __typename?: 'Query', allBlogPostTag?: { __typename?: 'BlogPostTag_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'BlogPostTag_ConnectionEdge', node?: { __typename?: 'BlogPostTag', id?: string | null, background?: string | null, title?: string | null, _meta?: { __typename?: 'CaisyDocument_Meta', locale?: string | null } | null } | null } | null> | null } | null };

export type IGenAllCategoriesByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
}>;


export type IGenAllCategoriesByLocaleQuery = { __typename?: 'Query', allCategory?: { __typename?: 'Category_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Category_ConnectionEdge', node?: { __typename?: 'Category', id?: string | null, name?: string | null, _meta?: { __typename?: 'CaisyDocument_Meta', locale?: string | null } | null } | null } | null> | null } | null };

export type IGenBlogArticleByLocaleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  locale: Scalars['String']['input'];
}>;


export type IGenBlogArticleByLocaleQuery = { __typename?: 'Query', BlogArticle?: (
    { __typename?: 'BlogArticle' }
    & IGenBlogArticleMetaFragment
  ) | null };

export type IGenFeaturedBlogArticlesByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  featured?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type IGenFeaturedBlogArticlesByLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: (
        { __typename?: 'BlogArticle' }
        & IGenBlogArticleMetaFragment
      ) | null } | null> | null } | null };

export type IGenQ_PaginatedBlogArticlesByLocaleQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenQ_PaginatedBlogArticlesByLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', cursor?: string | null, node?: (
        { __typename?: 'BlogArticle' }
        & IGenBlogArticleMetaFragment
      ) | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type IGenRecentBlogArticlesByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  first: Scalars['Int']['input'];
}>;


export type IGenRecentBlogArticlesByLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: (
        { __typename?: 'BlogArticle' }
        & IGenBlogArticleMetaFragment
      ) | null } | null> | null } | null };

export const BlogArticleMetaFragmentDoc = gql`
    fragment blogArticleMeta on BlogArticle {
  _meta {
    publishedAt
    updatedAt
    locale
  }
  author(locale: $locale) {
    bio
    id
    name
  }
  category(locale: $locale) {
    name
    id
  }
  id
  teaserDesciption
  teaserHeadline
  teaserImage {
    height
    width
    title
    src
    blurHash
    description
  }
  text(locale: $locale) {
    json
  }
  title
  tags(locale: $locale) {
    ... on BlogPostTag {
      id
      title
      background
    }
  }
}
    `;
export const AllBlogArticleByLocaleDocument = gql`
    query allBlogArticleByLocale($locale: String, $after: String) {
  allBlogArticle(
    sort: {updatedAt: DESC, publishedAt: DESC}
    locale: $locale
    after: $after
  ) {
    edges {
      cursor
      node {
        ...blogArticleMeta
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    totalCount
  }
}
    ${BlogArticleMetaFragmentDoc}`;
export const AllBlogArticlesByCategoryAndLocaleDocument = gql`
    query allBlogArticlesByCategoryAndLocale($locale: String!, $categoryName: String!) {
  allBlogArticle(
    sort: {updatedAt: DESC, publishedAt: DESC}
    where: {AND: {category: {findOne: {Category: {name: {eq: $categoryName}}}}}}
  ) {
    edges {
      node {
        ...blogArticleMeta
      }
    }
  }
}
    ${BlogArticleMetaFragmentDoc}`;
export const AllBlogArticlesByTagAndLocaleDocument = gql`
    query allBlogArticlesByTagAndLocale($locale: String!, $tagName: String!) {
  allBlogArticle(
    sort: {updatedAt: DESC, publishedAt: DESC}
    where: {AND: {tags: {findOne: {BlogPostTag: {title: {eq: $tagName}}}}}}
  ) {
    edges {
      node {
        ...blogArticleMeta
      }
    }
  }
}
    ${BlogArticleMetaFragmentDoc}`;
export const AllBlogPostTagsByLocaleDocument = gql`
    query allBlogPostTagsByLocale($locale: String!) {
  allBlogPostTag(locale: $locale) {
    totalCount
    edges {
      node {
        id
        background
        title
        _meta {
          locale
        }
      }
    }
  }
}
    `;
export const AllCategoriesByLocaleDocument = gql`
    query allCategoriesByLocale($locale: String!) {
  allCategory(locale: $locale) {
    edges {
      node {
        id
        name
        _meta {
          locale
        }
      }
    }
    totalCount
  }
}
    `;
export const BlogArticleByLocaleDocument = gql`
    query blogArticleByLocale($id: ID!, $locale: String!) {
  BlogArticle(id: $id, locale: $locale) {
    ...blogArticleMeta
  }
}
    ${BlogArticleMetaFragmentDoc}`;
export const FeaturedBlogArticlesByLocaleDocument = gql`
    query featuredBlogArticlesByLocale($locale: String!, $first: Int!, $featured: Boolean = true) {
  allBlogArticle(
    where: {OR: {featured: $featured}}
    sort: {updatedAt: DESC, publishedAt: DESC}
    first: $first
  ) {
    edges {
      node {
        ...blogArticleMeta
      }
    }
  }
}
    ${BlogArticleMetaFragmentDoc}`;
export const Q_PaginatedBlogArticlesByLocaleDocument = gql`
    query q_paginatedBlogArticlesByLocale($locale: String, $first: Int!, $after: String) {
  allBlogArticle(
    sort: {updatedAt: DESC, publishedAt: DESC}
    locale: $locale
    first: $first
    after: $after
  ) {
    edges {
      cursor
      node {
        ...blogArticleMeta
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    ${BlogArticleMetaFragmentDoc}`;
export const RecentBlogArticlesByLocaleDocument = gql`
    query recentBlogArticlesByLocale($locale: String!, $first: Int!) {
  allBlogArticle(sort: {updatedAt: DESC, publishedAt: DESC}, first: $first) {
    edges {
      node {
        ...blogArticleMeta
      }
    }
  }
}
    ${BlogArticleMetaFragmentDoc}`;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    allBlogArticleByLocale(variables?: IGenAllBlogArticleByLocaleQueryVariables, options?: C): Promise<IGenAllBlogArticleByLocaleQuery> {
      return requester<IGenAllBlogArticleByLocaleQuery, IGenAllBlogArticleByLocaleQueryVariables>(AllBlogArticleByLocaleDocument, variables, options) as Promise<IGenAllBlogArticleByLocaleQuery>;
    },
    allBlogArticlesByCategoryAndLocale(variables: IGenAllBlogArticlesByCategoryAndLocaleQueryVariables, options?: C): Promise<IGenAllBlogArticlesByCategoryAndLocaleQuery> {
      return requester<IGenAllBlogArticlesByCategoryAndLocaleQuery, IGenAllBlogArticlesByCategoryAndLocaleQueryVariables>(AllBlogArticlesByCategoryAndLocaleDocument, variables, options) as Promise<IGenAllBlogArticlesByCategoryAndLocaleQuery>;
    },
    allBlogArticlesByTagAndLocale(variables: IGenAllBlogArticlesByTagAndLocaleQueryVariables, options?: C): Promise<IGenAllBlogArticlesByTagAndLocaleQuery> {
      return requester<IGenAllBlogArticlesByTagAndLocaleQuery, IGenAllBlogArticlesByTagAndLocaleQueryVariables>(AllBlogArticlesByTagAndLocaleDocument, variables, options) as Promise<IGenAllBlogArticlesByTagAndLocaleQuery>;
    },
    allBlogPostTagsByLocale(variables: IGenAllBlogPostTagsByLocaleQueryVariables, options?: C): Promise<IGenAllBlogPostTagsByLocaleQuery> {
      return requester<IGenAllBlogPostTagsByLocaleQuery, IGenAllBlogPostTagsByLocaleQueryVariables>(AllBlogPostTagsByLocaleDocument, variables, options) as Promise<IGenAllBlogPostTagsByLocaleQuery>;
    },
    allCategoriesByLocale(variables: IGenAllCategoriesByLocaleQueryVariables, options?: C): Promise<IGenAllCategoriesByLocaleQuery> {
      return requester<IGenAllCategoriesByLocaleQuery, IGenAllCategoriesByLocaleQueryVariables>(AllCategoriesByLocaleDocument, variables, options) as Promise<IGenAllCategoriesByLocaleQuery>;
    },
    blogArticleByLocale(variables: IGenBlogArticleByLocaleQueryVariables, options?: C): Promise<IGenBlogArticleByLocaleQuery> {
      return requester<IGenBlogArticleByLocaleQuery, IGenBlogArticleByLocaleQueryVariables>(BlogArticleByLocaleDocument, variables, options) as Promise<IGenBlogArticleByLocaleQuery>;
    },
    featuredBlogArticlesByLocale(variables: IGenFeaturedBlogArticlesByLocaleQueryVariables, options?: C): Promise<IGenFeaturedBlogArticlesByLocaleQuery> {
      return requester<IGenFeaturedBlogArticlesByLocaleQuery, IGenFeaturedBlogArticlesByLocaleQueryVariables>(FeaturedBlogArticlesByLocaleDocument, variables, options) as Promise<IGenFeaturedBlogArticlesByLocaleQuery>;
    },
    q_paginatedBlogArticlesByLocale(variables: IGenQ_PaginatedBlogArticlesByLocaleQueryVariables, options?: C): Promise<IGenQ_PaginatedBlogArticlesByLocaleQuery> {
      return requester<IGenQ_PaginatedBlogArticlesByLocaleQuery, IGenQ_PaginatedBlogArticlesByLocaleQueryVariables>(Q_PaginatedBlogArticlesByLocaleDocument, variables, options) as Promise<IGenQ_PaginatedBlogArticlesByLocaleQuery>;
    },
    recentBlogArticlesByLocale(variables: IGenRecentBlogArticlesByLocaleQueryVariables, options?: C): Promise<IGenRecentBlogArticlesByLocaleQuery> {
      return requester<IGenRecentBlogArticlesByLocaleQuery, IGenRecentBlogArticlesByLocaleQueryVariables>(RecentBlogArticlesByLocaleDocument, variables, options) as Promise<IGenRecentBlogArticlesByLocaleQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;