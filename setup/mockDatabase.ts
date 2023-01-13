import axios from "axios";
import fs from 'fs'
import { connectToDatabase } from "../src/database";
import { Comment, Post } from "../src/models";
import mockData from './mockData.json';

const mockDatabase = async () => {
  try {
    const {posts} = mockData;

    await Promise.all(posts.map(async({title, body, comments })=> {
        const post = await Post.create({
            title,
            body,
        });

        await Promise.all(comments.map(async({name, email, body})=> {
            const comment = await Comment.create({
               name, 
               email, body,
               post : post.id
            });

            await comment.save();
            // @ts-ignore - TODO: Fix typing issue
            post.comments.push(comment)

            return comment
        }));

        
        return post.save();
    }))

    console.log('Mocked database successfully!')
  } catch (error) {
    console.log(error);
  }
};

export default mockDatabase;