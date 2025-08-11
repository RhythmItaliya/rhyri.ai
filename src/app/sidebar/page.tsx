import Sidebar, { SidebarItem } from './Sidebar';

export default function SidebarPage({ items }: { items: SidebarItem[] }) {
    return <Sidebar items={items} />;
}
