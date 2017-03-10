import { HeaderMenu }   from './header-menu.model';
import { HeaderUser }   from './header-user.model';

export interface Header {
    user: HeaderUser;
    cbpMenu: HeaderMenu[];
    userMenu: HeaderMenu[];
    appMenu: HeaderMenu[];
}
