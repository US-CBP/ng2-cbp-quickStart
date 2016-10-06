import { HeaderMenuItem } from './header-menu-item.model';

export interface HeaderMenu {
    id: number;
    html: string;
    title: string;
    href: string;
    route: string;
    className: string;
    menu: HeaderMenuItem[]
}
