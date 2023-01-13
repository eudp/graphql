export const PATH_FILE = './setup/mockData.json';

export const AXIOS_OPTIONS =  {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
}

export const PLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com";

export const PLACEHOLDER_GET_POSTS_URL = `${PLACEHOLDER_BASE_URL}/posts`;

export const ENCODE = 'utf8';

export const generateGetPostCommentsURL = (postId: any) =>
  `${PLACEHOLDER_GET_POSTS_URL}/${postId}/comments`;