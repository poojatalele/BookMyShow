import { Tabs } from 'antd';
import Bookings from './Bookings';
import { useEffect } from 'react';
import { GetCurrentUser } from '../../calls/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        const user = response.data;
        if (user.role === "admin" || user.role === "partner") {
          message.error("You are not authorized to view this page");
          navigate("/"+user.role);
        }
      }
    } catch (error) {
      message.error(error.message);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

    // const onChange = (key) => {
    //     console.log(key);
    //   };
      const items = [
        {
          key: '1',
          label: 'Bookings',
          children: <Bookings/>,
        },
        // {
        //   key: '3',
        //   label: 'Tab 3',
        //   children: 'Content of Tab Pane 3',
        // },
      ];

    return (
        <>
        <h1>User Profile Page</h1>
            <Tabs defaultActiveKey="2" items={items} />
        </>
    )
}

export default Profile;