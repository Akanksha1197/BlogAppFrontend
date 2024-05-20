import React, { useState, useEffect } from 'react';
import Admin from '../components/Create/Admin';
import Calendercharts from '../components/Charts/Calendercharts';
import { IoIosPeople, IoIosChatbubbles } from 'react-icons/io';
import {Link} from 'react-router-dom';

function Home1() {
    const [totalUser, setTotalUsers] = useState(0);
    const [totalPost, setTotalPost] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://blogappbackend-8v3b4h9a0-akankshas-projects-76b3734f.vercel.app/api/blogs");
                if (res.ok) {
                    const data = await res.json();
                    setTotalPost(data.length);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("https://blogappbackend-8v3b4h9a0-akankshas-projects-76b3734f.vercel.app/api/getUsers");
                if (res.ok) {
                    const data = await res.json();
                    setTotalUsers(data.length);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col md:flex-row  dark:bg-gray-800 dark:h-screen">
            <Admin toggleSidebar={toggleSidebar} />
            
            <main className="flex-grow p-3  dark:bg-gray-800  ss:hidden xs:hidden xxs:hidden">
                <div className="grid md:grid-cols-2 gap-4  dark:bg-gray-800">
                    <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6  dark:bg-gray-800">
                        <div className="mr-3">
                            <IoIosPeople className="w-12 h-12" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{totalUser}</p>
                            <p>Total User</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
                        <div className="mr-3">
                            <IoIosChatbubbles className="w-12 h-12" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{totalPost}</p>
                            <p>Total Post</p>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <div className="bg-white p-10 py-15 h-96">
                        <Calendercharts />
                    </div>
                </div>
            </main>

            <Link to="/home" className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:hidden text-white ">
          <div className="bg-black p-4 rounded-lg shadow-lg">
            <p>The Size Of Device is too Small</p>
          </div>
          <br/>
        
        </Link>
        </div>
    )
}

export default Home1;
