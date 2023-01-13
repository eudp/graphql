import axios from "axios";
import fs from "fs";
import {
  AXIOS_OPTIONS,
  ENCODE,
  generateGetPostCommentsURL,
  PATH_FILE,
  PLACEHOLDER_GET_POSTS_URL,
} from "./contants";

const writeToJsonFile = (data: any, pathFile: string) => {
  fs.writeFileSync(pathFile, JSON.stringify(data), ENCODE);
};

const formatData = (posts: any) => {
  const postsFormatted = posts.map((post: any) => {
    const comments = post.comments.map(({ name, email, body }: any) => ({
      name,
      email,
      body,
    }));
    return { title: post.title, body: post.body, comments };
  });
  return { posts: postsFormatted };
};

const start = async () => {
  try {
    const { data: posts } = await axios.get(
      PLACEHOLDER_GET_POSTS_URL,
      AXIOS_OPTIONS
    );

    const postsWithComments = await Promise.all(
      posts.map(async (post: any) => {
        const url = generateGetPostCommentsURL(post.id);
        const { data: comments } = await axios.get(url, AXIOS_OPTIONS);
        return { ...post, comments };
      })
    );

    const dataFormatted = formatData(postsWithComments);

    writeToJsonFile(dataFormatted, PATH_FILE);

    console.log("Mocked data generated successfully!");
  } catch (error) {
    console.log(error);
  }
};

start();
