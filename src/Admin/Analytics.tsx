import React, { useEffect, useState } from 'react';
import Admin from '../components/Create/Admin';
import { IoIosPeople, IoIosChatbubbles } from 'react-icons/io';
import Geochart from '../components/Charts/Geochart';
import PieChart from '../components/Charts/Piecharts';
import {Link} from 'react-router-dom';
const Analytics: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://blogappbackend-8v3b4h9a0-akankshas-projects-76b3734f.vercel.app/api/getUsers');
      if (response.ok) {
        const data=await response.json();
        setTotalUsers(data.length);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
        const response = await fetch('https://blogappbackend-8v3b4h9a0-akankshas-projects-76b3734f.vercel.app/api/comment/getcomment');
        if (response.ok) {
            const data=await response.json();
    
        setTotalComments(data.length);
      }
    };
    
    fetchComment();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
};
  return (
    <div className="bg-gray-100 h-screen sm:w-full  ">
      <div className="flex ss:w-full ss:hidden xs:hidden xxs:hidden">
        <Admin  toggleSidebar={toggleSidebar}/>
        <main className="flex-grow p-3  dark:bg-gray-800">
          <div className="grid sm:grid-cols-2 ss:gap-2 sm:gap-4">
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
              <div className="mr-3">
                <IoIosPeople className="w-12 h-12" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalUsers}</p>
                <p>Total Visitors</p>
              </div>
            </div>
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
              <div className="mr-3">
                <IoIosChatbubbles className="w-12 h-12" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalComments}</p>
                <p>Total Comments</p>
              </div>
            </div>
          </div>
          <div className="sm: w-full ss:w-full flex justify-center mt-4">
        {/* <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-6">
              <Geochart />
            </div> */}
            <div className="  w-full bg-white p-6">
              <PieChart />
            </div>
          </div>
        </main>
      </div>

      <Link to="/home" className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:hidden text-white ">
          <div className="bg-black p-4 rounded-lg shadow-lg">
            <p>The Size Of Device is too Small</p>
          </div>
          <br/>
        
        </Link>
        
    </div>
  );
};

export default Analytics;

