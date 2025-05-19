import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { t } from 'i18next';
import { LogOut } from 'lucide-react';

import { useEmbedding } from '@/components/embed-provider';
import { useTelemetry } from '@/components/telemetry-provider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar-shadcn';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { auth } from '@/firebase/firebaseConfig';
import { userHooks } from '@/hooks/user-hooks';
import { authenticationSession } from '@/lib/authentication-session';

export function SidebarUser() {
  const { embedState } = useEmbedding();
  const { data: user } = userHooks.useCurrentUser();
  const queryClient = useQueryClient();
  const { reset } = useTelemetry();

  const handleLogout = async () => {
    await signOut(auth);
    userHooks.invalidateCurrentUser(queryClient);
    authenticationSession.logOut();
    reset();
  };

  if (!user || embedState.isEmbedded) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Avatar className="w-8 h-8 rounded-lg">
            <AvatarFallback className="bg-gray-200 rounded-lg">
              {user.firstName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 ml-2 text-sm leading-tight text-left">
            <span className="font-semibold truncate">{user.firstName}</span>
            <span className="text-xs truncate">{user.email}</span>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="flex items-center ml-2"
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{t('Logout')}</span>
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
