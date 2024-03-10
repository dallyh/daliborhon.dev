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
  Date: { input: Date; output: Date; }
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
  description?: Maybe<Scalars['String']['output']>;
  featured?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  previewImage?: Maybe<IGenAsset>;
  tags?: Maybe<Array<Maybe<IGenCaisy_Field_Tag>>>;
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


export type IGenBlogArticlePreviewImageArgs = {
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

export type IGenBlogArticle_PreviewImage_Where = {
  findOne?: InputMaybe<IGenBlogArticle_PreviewImage_WhereConnection>;
};

export type IGenBlogArticle_PreviewImage_WhereConnection = {
  Asset?: InputMaybe<IGenAsset_Nested_Where>;
};

export type IGenBlogArticle_Sort = {
  author?: InputMaybe<IGenOrder>;
  category?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  description?: InputMaybe<IGenOrder>;
  featured?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  previewImage?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  tags?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenBlogArticle_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenBlogArticle_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenBlogArticle_Where>>>;
  author?: InputMaybe<IGenBlogArticle_Author_Where>;
  category?: InputMaybe<IGenBlogArticle_Category_Where>;
  description?: InputMaybe<IGenCaisyField_String_Where>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  previewImage?: InputMaybe<IGenBlogArticle_PreviewImage_Where>;
  tags?: InputMaybe<IGenCaisyField_String_Where>;
  text?: InputMaybe<IGenCaisyField_Richtext_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

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

export type IGenBlogArticle_Text_Connections = IGenAsset;

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

export type IGenCaisy_Field_DateTime_Where = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IGenCaisy_Field_Document_NotFound = {
  __typename?: 'Caisy_Field_Document_NotFound';
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
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
  description?: Maybe<Scalars['String']['output']>;
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
  description?: InputMaybe<IGenCaisyField_String_Where>;
  name?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCategory_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  description?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  name?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCategory_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
  description?: InputMaybe<IGenCaisyField_String_Where>;
  name?: InputMaybe<IGenCaisyField_String_Where>;
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

export type IGenProject = {
  __typename?: 'Project';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  description?: Maybe<IGenProject_Description>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<IGenAsset>;
  projectSourceUrl?: Maybe<Scalars['String']['output']>;
  projectStartDate?: Maybe<Scalars['Date']['output']>;
  projectTags?: Maybe<Array<Maybe<IGenProject_ProjectTags>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenProjectDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenProjectImageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenProjectProjectTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenProjectTag = {
  __typename?: 'ProjectTag';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  color?: Maybe<Scalars['String']['output']>;
  cssColor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type IGenProjectTag_Connection = {
  __typename?: 'ProjectTag_Connection';
  edges?: Maybe<Array<Maybe<IGenProjectTag_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenProjectTag_ConnectionEdge = {
  __typename?: 'ProjectTag_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenProjectTag>;
};

export type IGenProjectTag_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenProjectTag_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenProjectTag_Nested_Where>>>;
  color?: InputMaybe<IGenCaisyField_Color_Where>;
  cssColor?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenProjectTag_Sort = {
  color?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  cssColor?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenProjectTag_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenProjectTag_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenProjectTag_Where>>>;
  color?: InputMaybe<IGenCaisyField_Color_Where>;
  cssColor?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenProject_Connection = {
  __typename?: 'Project_Connection';
  edges?: Maybe<Array<Maybe<IGenProject_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenProject_ConnectionEdge = {
  __typename?: 'Project_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenProject>;
};

export type IGenProject_ProjectTags_Where = {
  findOne?: InputMaybe<IGenProject_ProjectTags_WhereConnection>;
};

export type IGenProject_ProjectTags_WhereConnection = {
  ProjectTag?: InputMaybe<IGenProjectTag_Nested_Where>;
};

export type IGenProject_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  image?: InputMaybe<IGenOrder>;
  projectSourceUrl?: InputMaybe<IGenOrder>;
  projectStartDate?: InputMaybe<IGenOrder>;
  projectTags?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenProject_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenProject_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenProject_Where>>>;
  description?: InputMaybe<IGenCaisyField_Richtext_Where>;
  projectSourceUrl?: InputMaybe<IGenCaisyField_String_Where>;
  projectStartDate?: InputMaybe<IGenCaisy_Field_DateTime_Where>;
  projectTags?: InputMaybe<IGenProject_ProjectTags_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenProject_Description = {
  __typename?: 'Project_description';
  connections?: Maybe<Array<Maybe<IGenProject_Description_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenProject_DescriptionConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenProject_Description_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenProject_ProjectTags = IGenProjectTag;

export type IGenQuery = {
  __typename?: 'Query';
  Asset?: Maybe<IGenAsset>;
  Author?: Maybe<IGenAuthor>;
  BlogArticle?: Maybe<IGenBlogArticle>;
  Category?: Maybe<IGenCategory>;
  Project?: Maybe<IGenProject>;
  ProjectTag?: Maybe<IGenProjectTag>;
  Tag?: Maybe<IGenCaisy_Field_Tag>;
  allAsset?: Maybe<IGenAsset_Connection>;
  allAuthor?: Maybe<IGenAuthor_Connection>;
  allBlogArticle?: Maybe<IGenBlogArticle_Connection>;
  allCategory?: Maybe<IGenCategory_Connection>;
  allProject?: Maybe<IGenProject_Connection>;
  allProjectTag?: Maybe<IGenProjectTag_Connection>;
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


export type IGenQueryCategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryProjectArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryProjectTagArgs = {
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


export type IGenQueryAllCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenCategory_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
};


export type IGenQueryAllProjectArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenProject_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenProject_Where>>>;
};


export type IGenQueryAllProjectTagArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenProjectTag_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenProjectTag_Where>>>;
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

export type IGenBlogArticleMetaFragment = { __typename?: 'BlogArticle', id?: string | null, description?: string | null, title?: string | null, featured?: boolean | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: Date | null, publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null, previewImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null> | null };

export type IGenCategoryMetaFragment = { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null };

export type IGenProjectMetaFragment = { __typename?: 'Project', projectStartDate?: Date | null, projectSourceUrl?: string | null, title?: string | null, _meta?: { __typename?: 'CaisyDocument_Meta', locale?: string | null } | null, description?: { __typename?: 'Project_description', json?: any | null } | null, image?: { __typename?: 'Asset', blurHash?: string | null, description?: string | null, src?: string | null, title?: string | null, width?: number | null, height?: number | null } | null, projectTags?: Array<{ __typename?: 'ProjectTag', id?: string | null, cssColor?: string | null, color?: string | null, title?: string | null } | null> | null };

export type IGenTagMetaFragment = { __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null };

export type IGenAllBlogArticleByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenAllBlogArticleByLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', cursor?: string | null, node?: { __typename?: 'BlogArticle', id?: string | null, description?: string | null, title?: string | null, featured?: boolean | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: Date | null, publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null, previewImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null> | null } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type IGenAllBlogArticlesByCategoryAndLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  categoryName: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenAllBlogArticlesByCategoryAndLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: { __typename?: 'BlogArticle', id?: string | null, description?: string | null, title?: string | null, featured?: boolean | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: Date | null, publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null, previewImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null> | null } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type IGenAllBlogArticlesByTagAndLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  tagId: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenAllBlogArticlesByTagAndLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: { __typename?: 'BlogArticle', id?: string | null, description?: string | null, title?: string | null, featured?: boolean | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: Date | null, publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null, previewImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null> | null } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type IGenAllCategoriesByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenAllCategoriesByLocaleQuery = { __typename?: 'Query', allCategory?: { __typename?: 'Category_Connection', edges?: Array<{ __typename?: 'Category_ConnectionEdge', cursor?: string | null, node?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage?: boolean | null, endCursor?: string | null } | null } | null };

export type IGenAllProjectsByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenAllProjectsByLocaleQuery = { __typename?: 'Query', allProject?: { __typename?: 'Project_Connection', edges?: Array<{ __typename?: 'Project_ConnectionEdge', node?: { __typename?: 'Project', projectStartDate?: Date | null, projectSourceUrl?: string | null, title?: string | null, _meta?: { __typename?: 'CaisyDocument_Meta', locale?: string | null } | null, description?: { __typename?: 'Project_description', json?: any | null } | null, image?: { __typename?: 'Asset', blurHash?: string | null, description?: string | null, src?: string | null, title?: string | null, width?: number | null, height?: number | null } | null, projectTags?: Array<{ __typename?: 'ProjectTag', id?: string | null, cssColor?: string | null, color?: string | null, title?: string | null } | null> | null } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type IGenAllTagsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenAllTagsQuery = { __typename?: 'Query', allTags?: { __typename?: 'Tag_Connection', edges?: Array<{ __typename?: 'Tag_ConnectionEdge', node?: { __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type IGenBlogArticleByLocaleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  locale: Scalars['String']['input'];
}>;


export type IGenBlogArticleByLocaleQuery = { __typename?: 'Query', BlogArticle?: { __typename?: 'BlogArticle', id?: string | null, description?: string | null, title?: string | null, featured?: boolean | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: Date | null, publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null, previewImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null> | null } | null };

export type IGenFeaturedBlogArticlesByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  featured?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type IGenFeaturedBlogArticlesByLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: { __typename?: 'BlogArticle', id?: string | null, description?: string | null, title?: string | null, featured?: boolean | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: Date | null, publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null, previewImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null> | null } | null } | null> | null } | null };

export type IGenGetArticlesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenGetArticlesCountQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', totalCount?: number | null } | null };

export type IGenGetProjectsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenGetProjectsCountQuery = { __typename?: 'Query', allProject?: { __typename?: 'Project_Connection', totalCount?: number | null } | null };

export type IGenRecentBlogArticlesByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  first: Scalars['Int']['input'];
}>;


export type IGenRecentBlogArticlesByLocaleQuery = { __typename?: 'Query', allBlogArticle?: { __typename?: 'BlogArticle_Connection', edges?: Array<{ __typename?: 'BlogArticle_ConnectionEdge', node?: { __typename?: 'BlogArticle', id?: string | null, description?: string | null, title?: string | null, featured?: boolean | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: Date | null, publishedAt?: Date | null, updatedAt?: Date | null, locale?: string | null } | null, author?: { __typename?: 'Author', bio?: string | null, id?: string | null, name?: string | null } | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null, description?: string | null } | null, previewImage?: { __typename?: 'Asset', height?: number | null, width?: number | null, title?: string | null, src?: string | null, blurHash?: string | null, description?: string | null } | null, text?: { __typename?: 'BlogArticle_text', json?: any | null } | null, tags?: Array<{ __typename?: 'Caisy_Field_Tag', color?: string | null, id?: string | null, name?: string | null } | null> | null } | null } | null> | null } | null };

export type IGenRecentProjectsByLocaleQueryVariables = Exact<{
  locale: Scalars['String']['input'];
  first: Scalars['Int']['input'];
}>;


export type IGenRecentProjectsByLocaleQuery = { __typename?: 'Query', allProject?: { __typename?: 'Project_Connection', edges?: Array<{ __typename?: 'Project_ConnectionEdge', node?: { __typename?: 'Project', projectStartDate?: Date | null, projectSourceUrl?: string | null, title?: string | null, _meta?: { __typename?: 'CaisyDocument_Meta', locale?: string | null } | null, description?: { __typename?: 'Project_description', json?: any | null } | null, image?: { __typename?: 'Asset', blurHash?: string | null, description?: string | null, src?: string | null, title?: string | null, width?: number | null, height?: number | null } | null, projectTags?: Array<{ __typename?: 'ProjectTag', id?: string | null, cssColor?: string | null, color?: string | null, title?: string | null } | null> | null } | null } | null> | null } | null };

export const CategoryMetaFragmentDoc = gql`
    fragment categoryMeta on Category {
  id
  name
  description
}
    `;
export const TagMetaFragmentDoc = gql`
    fragment tagMeta on Caisy_Field_Tag {
  color
  id
  name
}
    `;
export const BlogArticleMetaFragmentDoc = gql`
    fragment blogArticleMeta on BlogArticle {
  _meta {
    createdAt
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
    ...categoryMeta
  }
  id
  description
  previewImage {
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
  tags {
    ...tagMeta
  }
  featured
}
    `;
export const ProjectMetaFragmentDoc = gql`
    fragment projectMeta on Project {
  _meta {
    locale
  }
  description {
    json
  }
  image {
    blurHash
    description
    src
    title
    width
    height
  }
  projectStartDate
  projectSourceUrl
  title
  projectTags {
    ... on ProjectTag {
      id
      cssColor
      color
      title
    }
  }
}
    `;
export const AllBlogArticleByLocaleDocument = gql`
    query allBlogArticleByLocale($locale: String!, $after: String) {
  allBlogArticle(
    locale: $locale
    after: $after
    sort: {updatedAt: DESC, publishedAt: DESC}
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
    ${BlogArticleMetaFragmentDoc}
${CategoryMetaFragmentDoc}
${TagMetaFragmentDoc}`;
export const AllBlogArticlesByCategoryAndLocaleDocument = gql`
    query allBlogArticlesByCategoryAndLocale($locale: String!, $categoryName: String!, $after: String) {
  allBlogArticle(
    locale: $locale
    after: $after
    sort: {updatedAt: DESC, publishedAt: DESC}
    where: {AND: {category: {findOne: {Category: {name: {eq: $categoryName}}}}}}
  ) {
    edges {
      node {
        ...blogArticleMeta
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${BlogArticleMetaFragmentDoc}
${CategoryMetaFragmentDoc}
${TagMetaFragmentDoc}`;
export const AllBlogArticlesByTagAndLocaleDocument = gql`
    query allBlogArticlesByTagAndLocale($locale: String!, $tagId: String!, $after: String) {
  allBlogArticle(
    locale: $locale
    sort: {updatedAt: DESC, publishedAt: DESC}
    where: {tags: {eq: $tagId}}
    after: $after
  ) {
    edges {
      node {
        ...blogArticleMeta
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${BlogArticleMetaFragmentDoc}
${CategoryMetaFragmentDoc}
${TagMetaFragmentDoc}`;
export const AllCategoriesByLocaleDocument = gql`
    query allCategoriesByLocale($locale: String!, $after: String) {
  allCategory(locale: $locale, after: $after, sort: {name: DESC}) {
    edges {
      node {
        ...categoryMeta
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CategoryMetaFragmentDoc}`;
export const AllProjectsByLocaleDocument = gql`
    query allProjectsByLocale($locale: String!, $after: String) {
  allProject(locale: $locale, after: $after, sort: {projectStartDate: DESC}) {
    edges {
      node {
        ...projectMeta
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${ProjectMetaFragmentDoc}`;
export const AllTagsDocument = gql`
    query allTags($after: String) {
  allTags(after: $after) {
    edges {
      node {
        ...tagMeta
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${TagMetaFragmentDoc}`;
export const BlogArticleByLocaleDocument = gql`
    query blogArticleByLocale($id: ID!, $locale: String!) {
  BlogArticle(id: $id, locale: $locale) {
    ...blogArticleMeta
  }
}
    ${BlogArticleMetaFragmentDoc}
${CategoryMetaFragmentDoc}
${TagMetaFragmentDoc}`;
export const FeaturedBlogArticlesByLocaleDocument = gql`
    query featuredBlogArticlesByLocale($locale: String!, $first: Int!, $featured: Boolean = true) {
  allBlogArticle(
    locale: $locale
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
    ${BlogArticleMetaFragmentDoc}
${CategoryMetaFragmentDoc}
${TagMetaFragmentDoc}`;
export const GetArticlesCountDocument = gql`
    query getArticlesCount {
  allBlogArticle {
    totalCount
  }
}
    `;
export const GetProjectsCountDocument = gql`
    query getProjectsCount {
  allProject {
    totalCount
  }
}
    `;
export const RecentBlogArticlesByLocaleDocument = gql`
    query recentBlogArticlesByLocale($locale: String!, $first: Int!) {
  allBlogArticle(
    locale: $locale
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
    ${BlogArticleMetaFragmentDoc}
${CategoryMetaFragmentDoc}
${TagMetaFragmentDoc}`;
export const RecentProjectsByLocaleDocument = gql`
    query recentProjectsByLocale($locale: String!, $first: Int!) {
  allProject(locale: $locale, first: $first, sort: {projectStartDate: DESC}) {
    edges {
      node {
        ...projectMeta
      }
    }
  }
}
    ${ProjectMetaFragmentDoc}`;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    allBlogArticleByLocale(variables: IGenAllBlogArticleByLocaleQueryVariables, options?: C): Promise<IGenAllBlogArticleByLocaleQuery> {
      return requester<IGenAllBlogArticleByLocaleQuery, IGenAllBlogArticleByLocaleQueryVariables>(AllBlogArticleByLocaleDocument, variables, options) as Promise<IGenAllBlogArticleByLocaleQuery>;
    },
    allBlogArticlesByCategoryAndLocale(variables: IGenAllBlogArticlesByCategoryAndLocaleQueryVariables, options?: C): Promise<IGenAllBlogArticlesByCategoryAndLocaleQuery> {
      return requester<IGenAllBlogArticlesByCategoryAndLocaleQuery, IGenAllBlogArticlesByCategoryAndLocaleQueryVariables>(AllBlogArticlesByCategoryAndLocaleDocument, variables, options) as Promise<IGenAllBlogArticlesByCategoryAndLocaleQuery>;
    },
    allBlogArticlesByTagAndLocale(variables: IGenAllBlogArticlesByTagAndLocaleQueryVariables, options?: C): Promise<IGenAllBlogArticlesByTagAndLocaleQuery> {
      return requester<IGenAllBlogArticlesByTagAndLocaleQuery, IGenAllBlogArticlesByTagAndLocaleQueryVariables>(AllBlogArticlesByTagAndLocaleDocument, variables, options) as Promise<IGenAllBlogArticlesByTagAndLocaleQuery>;
    },
    allCategoriesByLocale(variables: IGenAllCategoriesByLocaleQueryVariables, options?: C): Promise<IGenAllCategoriesByLocaleQuery> {
      return requester<IGenAllCategoriesByLocaleQuery, IGenAllCategoriesByLocaleQueryVariables>(AllCategoriesByLocaleDocument, variables, options) as Promise<IGenAllCategoriesByLocaleQuery>;
    },
    allProjectsByLocale(variables: IGenAllProjectsByLocaleQueryVariables, options?: C): Promise<IGenAllProjectsByLocaleQuery> {
      return requester<IGenAllProjectsByLocaleQuery, IGenAllProjectsByLocaleQueryVariables>(AllProjectsByLocaleDocument, variables, options) as Promise<IGenAllProjectsByLocaleQuery>;
    },
    allTags(variables?: IGenAllTagsQueryVariables, options?: C): Promise<IGenAllTagsQuery> {
      return requester<IGenAllTagsQuery, IGenAllTagsQueryVariables>(AllTagsDocument, variables, options) as Promise<IGenAllTagsQuery>;
    },
    blogArticleByLocale(variables: IGenBlogArticleByLocaleQueryVariables, options?: C): Promise<IGenBlogArticleByLocaleQuery> {
      return requester<IGenBlogArticleByLocaleQuery, IGenBlogArticleByLocaleQueryVariables>(BlogArticleByLocaleDocument, variables, options) as Promise<IGenBlogArticleByLocaleQuery>;
    },
    featuredBlogArticlesByLocale(variables: IGenFeaturedBlogArticlesByLocaleQueryVariables, options?: C): Promise<IGenFeaturedBlogArticlesByLocaleQuery> {
      return requester<IGenFeaturedBlogArticlesByLocaleQuery, IGenFeaturedBlogArticlesByLocaleQueryVariables>(FeaturedBlogArticlesByLocaleDocument, variables, options) as Promise<IGenFeaturedBlogArticlesByLocaleQuery>;
    },
    getArticlesCount(variables?: IGenGetArticlesCountQueryVariables, options?: C): Promise<IGenGetArticlesCountQuery> {
      return requester<IGenGetArticlesCountQuery, IGenGetArticlesCountQueryVariables>(GetArticlesCountDocument, variables, options) as Promise<IGenGetArticlesCountQuery>;
    },
    getProjectsCount(variables?: IGenGetProjectsCountQueryVariables, options?: C): Promise<IGenGetProjectsCountQuery> {
      return requester<IGenGetProjectsCountQuery, IGenGetProjectsCountQueryVariables>(GetProjectsCountDocument, variables, options) as Promise<IGenGetProjectsCountQuery>;
    },
    recentBlogArticlesByLocale(variables: IGenRecentBlogArticlesByLocaleQueryVariables, options?: C): Promise<IGenRecentBlogArticlesByLocaleQuery> {
      return requester<IGenRecentBlogArticlesByLocaleQuery, IGenRecentBlogArticlesByLocaleQueryVariables>(RecentBlogArticlesByLocaleDocument, variables, options) as Promise<IGenRecentBlogArticlesByLocaleQuery>;
    },
    recentProjectsByLocale(variables: IGenRecentProjectsByLocaleQueryVariables, options?: C): Promise<IGenRecentProjectsByLocaleQuery> {
      return requester<IGenRecentProjectsByLocaleQuery, IGenRecentProjectsByLocaleQueryVariables>(RecentProjectsByLocaleDocument, variables, options) as Promise<IGenRecentProjectsByLocaleQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;