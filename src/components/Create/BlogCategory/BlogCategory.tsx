import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import HomeImages from '../../Home/HomeImage/HomeImage';
import CreateBlogButton from '../CreateBlogButton/CreateBlogButton';
import Category from '../Category';
import PostCard from '../Posts/PostCard';

interface Post {
  image: string;
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
}
const BlogCategory: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`https://blogappbackend-8v3b4h9a0-akankshas-projects-76b3734f.vercel.app/api/searchcategory/${category}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 401) {
        throw new Error('Unauthorized: Token not provided');
      }
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <>
      <HomeImages />
      <CreateBlogButton />
      <div className="flex dark:bg-gray-800">
        <div>
          <Category />
        </div>
        <div className='sm:px-8 w-full'>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default BlogCategory;
