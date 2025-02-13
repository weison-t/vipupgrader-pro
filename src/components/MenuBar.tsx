
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate, useLocation } from 'react-router-dom';

export const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 mb-4">
      <MenubarMenu>
        <MenubarTrigger className={`font-bold ${location.pathname === '/' ? 'text-primary' : ''}`} onClick={() => navigate('/')}>
          VIP Status
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className={`font-bold ${location.pathname === '/privilege' ? 'text-primary' : ''}`} onClick={() => navigate('/privilege')}>
          VIP Privilege
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className={`font-bold ${location.pathname === '/only-you' ? 'text-primary' : ''}`} onClick={() => navigate('/only-you')}>
          Only You
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
