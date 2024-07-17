import React, { Children } from 'react'

import {Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'
import MovieFrom from './MovieForm'
import { useEffect } from 'react'
import { GetCurrentUser } from '../../calls/users'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'


function Admin() {

  const navigate = useNavigate();

  const checkAdmin = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        const user = response.data;
        if (user.role != "admin") {
          message.error("You are not authorized to view this page");
          navigate("/login");
        }
      }
      else{
        navigate("/login");
      }
    } catch (error) {
      message.error(error.message);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkAdmin();
  }, []);

    const tabItems = [
        { 
            key : '1',
            label : 'Movies',
            children : <MovieList/>

        },

        {
           key : '2',
           label : 'Theatres',
           children : <TheatresTable/>
        }
    ]


  return (
    <div>
        <h1>Admin Page</h1>



        <Tabs items={tabItems}/>


    </div>
  )
}

export default Admin