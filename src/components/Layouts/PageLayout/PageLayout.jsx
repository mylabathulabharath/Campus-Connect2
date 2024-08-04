import { baseTheme, Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../../SideBar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/firebase'
import Navbar from '../../Navbar/Navbar'
const PageLayout = ({ children }) => {
    const {pathname} = useLocation()
    const [user,loading,error] = useAuthState(auth)
    const canRenderSidebar = pathname !== '/auth' && user;
    const canRenderNavbar = !user && !loading && pathname !== '/auth'
    const checkngUserIsAuth = !user && loading ;

    if (checkngUserIsAuth) return <PageLayoutSpinner />;

    return (
    <Flex flexDir={canRenderNavbar ? 'column' : 'row'}>
        {canRenderSidebar ? (
            
                <Box w={{base:'70px',md:'240px'}} >
                    <Sidebar />
                </Box>
                ) : null}
            {
                canRenderNavbar ? <Navbar /> :null
            }
            <Box flex={1} w={{ base:"cacl(100% - 70px')",md:"cacl(100% - 240px)"}} mx='auto'>
                {children}
            </Box>
    </Flex>
    )
}

const   PageLayoutSpinner = () =>{
    return (
        <Flex flexDir={'column'} h='100vh' alignItems={'center'} justifyContent='center'>
            <Spinner size={'xl'} color={'blue.500'} />
        </Flex>
    )
}

export default PageLayout