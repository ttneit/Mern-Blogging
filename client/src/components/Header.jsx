import { useContext, useEffect, useState } from 'react'
import {Avatar, Button,Dropdown,Navbar,TextInput} from 'flowbite-react'
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoon,FaSun } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { signOutSuccess } from '../redux/user/userSlice';
import { ThemeContext } from '../context/themeContext';
import { UserContext } from '../context/userContext';
export default function Header() {
  const path = useLocation().pathname;
  // const dispatch = useDispatch();
  // const currentUser = useSelector(state =>state.user).currentUser;
  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext)

  const [searchTerm,setSearchTerm] = useState('');
  const location = useLocation();
  const navigate =useNavigate();
  const handleSignOut = async() => {
    try {
      const res = await fetch('/api/user/signout', {
        method : 'POST',
      })
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      }else {
        // dispatch(signOutSuccess());
        userContext.signOutSuccess()
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams  = new URLSearchParams(location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

  },[location.search]);
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'> 
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Personal Blogs</span>
        </Link>
      <form onSubmit={handleSubmit}>
          <TextInput 
              type='text'
              placeholder='Search'
              rightIcon={ AiOutlineSearch }
              className='hidden lg:inline'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill href='/search'>
            <AiOutlineSearch />
        </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray'   pill  onClick={themeContext.changeTheme}>
            {themeContext.theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        {
          userContext.currentUser ? (
            <Dropdown arrowIcon={false} inline label={
              <Avatar alt='user' img={userContext.currentUser.profilePicture} rounded />

            }>
              <Dropdown.Header>
                <span className='block text-sm'>@{userContext.currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{userContext.currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button gradientDuoTone='purpleToBlue' outline href='/signin'>
              Sign In
            </Button>
          )
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active ={path === '/'} as={'div'}>
            <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active ={path === '/about'} as={'div'}>
            <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active ={path === '/project'} as={'div'}>
            <Link to='#'>Project</Link>
        </Navbar.Link>
      </Navbar.Collapse>                      
    </Navbar>
  );
}
