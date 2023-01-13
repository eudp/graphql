import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { Comment, Post } from "./models";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export const schema = buildSchema(`
  type Query {
    getPost(page: Int): [Post!]!
  }

  type Mutation {
    createComment(input: CommentInput): Comment!
    createPost(input: PostInput): Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    comments: [ID!]!
  }

  type Comment {
    id: ID!
    name: String!
    email: String!
    body: String!
    postId: ID!
  }

  input CommentInput {
    name: String!
    email: String!
    body: String!
    postId: ID!
  }

  input PostInput {
    title: String!
    body: String!
  }
`);

type TypeGetPosts = {
  page: number;
};

type TypeCreateComment = {
  name: string;
  email: string;
  body: string;
  postId: string;
};

type InputCreateComment = {
  input: TypeCreateComment;
};

type TypeCreatePost = {
  title: string;
  body: string;
};

type InputCreatePost = {
  input: TypeCreatePost;
};

const root = {
  getPost: ({ page }: TypeGetPosts) => {
    return Post.find({})
      .skip(page || 1)
      .limit(10);
  },
  createComment: async ({ input }: InputCreateComment) => {
    const comment = await Comment.create(input);
    const post = await Post.findById(input.postId);
    const updatedComments = post?.comments.push(comment.id);
    Post.findByIdAndUpdate(input.postId, { comments: updatedComments });
    return comment;
  },
  createPost: async ({ input }: InputCreatePost) => {
    if (input.title.length > 10)
      throw new Error(
        "Attempted to create a post with title length more than 10 characters"
      );
    return Post.create(input);
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export { app };
