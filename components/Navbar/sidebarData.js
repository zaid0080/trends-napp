import React from 'react';
import { FaHome, FaQuestion} from 'react-icons/fa';
import { TiGroup } from 'react-icons/ti';

export const sidebarData = [
    {
        id: 1,
        title: 'Home',
        path: '/',
        icon:  <FaHome />
    },
    {   
        id: 2,
        title: 'About',
        path: '/about',
        icon:  <TiGroup />
    },
    {
        id: 3,
        title: 'Faq',
        path: '/faq',
        icon:  <FaQuestion />
    }
]
