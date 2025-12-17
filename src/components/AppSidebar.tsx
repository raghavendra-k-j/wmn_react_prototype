import React from 'react';
import {
  Home,
  LayoutDashboard,
  Users,
  Calendar,
  UserCog,
  Shield,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'All Patients', icon: Users, badge: 128 },
  { id: 'appointments', label: 'Appointments', icon: Calendar, badge: 5 },
  { id: 'staff', label: 'Staff Management', icon: UserCog },
  { id: 'roles', label: 'Role Management', icon: Shield },
];

const bottomNavItems: NavItem[] = [
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (id: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isCollapsed,
  onToggle,
  activeItem,
  onItemClick,
}) => {
  return (
    <nav className={`app-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="app-sidebar-header">
        <div className="app-logo">
          <Building2 size={28} />
          {!isCollapsed && <span>WMN Healthcare</span>}
        </div>
        <button className="app-sidebar-toggle" onClick={onToggle}>
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="app-nav-section">
        {!isCollapsed && <div className="nav-section-label">Main Menu</div>}
        <ul className="app-nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`app-nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => onItemClick(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </>
                )}
                {isCollapsed && item.badge && (
                  <span className="nav-badge-dot"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="app-nav-section app-nav-bottom">
        {!isCollapsed && <div className="nav-section-label">System</div>}
        <ul className="app-nav-list">
          {bottomNavItems.map((item) => (
            <li key={item.id}>
              <button
                className={`app-nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => onItemClick(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </>
                )}
                {isCollapsed && item.badge && (
                  <span className="nav-badge-dot"></span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* User Profile */}
        <div className="app-user-profile">
          <div className="user-avatar">DS</div>
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name">Dr. Smith</span>
              <span className="user-role">Obstetrician</span>
            </div>
          )}
          {!isCollapsed && (
            <button className="logout-btn" title="Logout">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
