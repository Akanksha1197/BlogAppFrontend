import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { categories } from '../../../Data/data';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const [isLoading , setLoading]=useState(false);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
setLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch("https://blogappbackend-8v3b4h9a0-akankshas-projects-76b3734f.vercel.app/api/upload", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        toast('Blog Created Successfully');
        navigate('/home');
      } else {
        throw new Error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to create blog');
      alert("File Size is too large it should be less than 5MB ");

    } finally{
      setLoading(false);
    }
  };

  return (
    <div className=' dark:bg-gray-800 dark:h-screen'>
      <div className='relative dark:bg-gray-800 '>

        {file && file.type.startsWith('image/') ? (
          <img
            src={URL.createObjectURL(file)}
            className='sm:w-full  ss:w-screen  sm:h-96 xxs:h-96 ss:h-64 xs:h-64   dark:bg-gray-800'
            alt="image"
          />
        ) : file && file.type.startsWith('video/') ? (
          <video controls className='sm:w-full h-96  ss:w-screen xxs:h-96 ss:h-64 xs:h-64  dark:bg-gray-800'>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            className='sm:w-full sm:h-80 xxs:h-80 ss:h-64 ss:w-screen xs:h-64  dark:bg-gray-800'
            alt="image"
          />
        )}

      </div>

       <div>
        <form onSubmit={handleSubmit} className=' dark:bg-gray-800 '>
          <div className='flex   dark:bg-gray-800'>
            <div className='mt-3 flex ss:ml-2 sm:ml-6 justify-center border border-gray-300 sm:rounded-full ss:rounded-lg  dark:bg-gray-800' onClick={() => document.getElementById('file_input')?.click()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <div className='w-full mt-2  dark:bg-gray-800 '>
                <span className="text-sm text-center  text-gray-400  mt-6  dark:bg-gray-800 dark:text-white">Upload</span>
              </div>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleFileChange} />
            </div>
            {/* <div className='flex space-x-20 bg-slate-600 w-full '> */}
            <div className=' sm:ml-96 ss:ml-1 xs:ml-1  dark:bg-gray-800 '>
              <select value={category} onChange={(e: any) => setCategory(e.target.value)} className="block w-64 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 mt-3 ">
                <option value="">Select Your Blog Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.type}>{category.type}</option>
                ))}
              </select>
            </div>
            <div className='ml-30 float-right w-full ss:hidden xs:hidden xxs:hidden'>
            <button type='submit' className={` bg-blue-500 h-8  px-3 mt-5  text-white float-right  rounded-md uppercase ss:hidden xs:hidden xxs:hidden ${isLoading ? 'opacity-50 pointer-events-none':''} `}>
            {isLoading ? 'Publishing...':'Publish Blog'}</button>
{/* </div> */}
</div>
          </div>  
            
          
           

          <div className=' xxs:ml-10 sm:ml-10 ss:ml-8 xs:ml-8 mt-2  dark:bg-gray-800 dark:text-white'>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='w-full mt-2 ml-1 outline-none text-2xl  dark:bg-gray-800' type="text" placeholder='Title' />
          </div>
          <div className='my-3 ml-8   dark:bg-gray-800'>
            <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} className="resize-none  rounded-md p-2 focus:outline-none w-full text-xl  dark:bg-gray-800 dark:text-white" placeholder='Tell your story... '></textarea>
          </div>
          <button type='submit' className={ `bg-blue-500 h-8 px-3 mt-5  text-white float-right mr-5 rounded-md uppercase  sm:hidden ${isLoading ? 'opacity-50 pointer-events-none':''}` }>
            {isLoading ? 'Publishing...':'Publish Blog'}</button> 

        </form>
      </div> 
    </div>
  );
}

export default CreateBlog;
