import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  UserPlus, 
  Settings, 
  Eye, 
  Shield, 
  Mail, 
  MoreVertical,
  Search,
  Filter,
  Download,
  Calendar,
  Activity,
  Lock,
  Unlock,
  Trash2,
  Edit3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload
} from 'lucide-react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock data
  const [companyData, setCompanyData] = useState({
    name: 'Acme Corporation',
    logo: null,
    plan: 'Enterprise Plan',
    employeeCount: 24,
    activeUsers: 18,
    totalProperties: 1247,
    lastActivity: '2 hours ago'
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@acme.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2 hours ago',
      joinDate: '2024-01-15',
      propertiesViewed: 145,
      reportsGenerated: 12
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@acme.com',
      role: 'Analyst',
      status: 'Active',
      lastLogin: '1 day ago',
      joinDate: '2024-02-20',
      propertiesViewed: 89,
      reportsGenerated: 8
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@acme.com',
      role: 'Viewer',
      status: 'Inactive',
      lastLogin: '1 week ago',
      joinDate: '2024-03-10',
      propertiesViewed: 23,
      reportsGenerated: 2
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      email: 'lisa.r@acme.com',
      role: 'Analyst',
      status: 'Pending',
      lastLogin: 'Never',
      joinDate: '2024-05-20',
      propertiesViewed: 0,
      reportsGenerated: 0
    }
  ]);

  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Viewer',
    message: ''
  });

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || emp.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleInviteEmployee = () => {
    const newEmployee = {
      id: employees.length + 1,
      name: inviteForm.email.split('@')[0],
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'Pending',
      lastLogin: 'Never',
      joinDate: new Date().toISOString().split('T')[0],
      propertiesViewed: 0,
      reportsGenerated: 0
    };
    
    setEmployees([...employees, newEmployee]);
    setInviteForm({ email: '', role: 'Viewer', message: '' });
    setShowInviteModal(false);
  };

  const handleRevokeAccess = (userId) => {
    setEmployees(employees.map(emp => 
      emp.id === userId ? { ...emp, status: 'Revoked' } : emp
    ));
  };

  const handleReactivateAccess = (userId) => {
    setEmployees(employees.map(emp => 
      emp.id === userId ? { ...emp, status: 'Active' } : emp
    ));
  };

  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-blue-100 text-blue-800',
      Revoked: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const styles = {
      Admin: 'bg-purple-100 text-purple-800',
      Analyst: 'bg-blue-100 text-blue-800',
      Viewer: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">WM</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Wealth Map</h1>
              </div>
              <div className="text-sm text-gray-500">
                {companyData.name} - {companyData.plan}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCompanyModal(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Settings className="w-4 h-4" />
                <span>Company Settings</span>
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite Employee</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'employees', 'permissions', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Employees</p>
                    <p className="text-2xl font-semibold text-gray-900">{companyData.employeeCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{companyData.activeUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Building2 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Properties Tracked</p>
                    <p className="text-2xl font-semibold text-gray-900">{companyData.totalProperties.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Last Activity</p>
                    <p className="text-2xl font-semibold text-gray-900">{companyData.lastActivity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">John Smith viewed 15 properties in Miami Beach</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserPlus className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">New employee Lisa Rodriguez was invited</span>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Sarah Johnson generated wealth analytics report</span>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(employee.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(employee.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>Properties: {employee.propertiesViewed}</div>
                          <div>Reports: {employee.reportsGenerated}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            {employee.status === 'Active' ? (
                              <button 
                                onClick={() => handleRevokeAccess(employee.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Lock className="w-4 h-4" />
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleReactivateAccess(employee.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Unlock className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Role Permissions</h3>
                <p className="text-sm text-gray-500">Manage what each role can access and do</p>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {['Admin', 'Analyst', 'Viewer'].map((role) => (
                    <div key={role} className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">{role}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h5 className="font-medium text-gray-700">Property Access</h5>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300" defaultChecked={role !== 'Viewer'} />
                              <span className="ml-2 text-sm text-gray-600">View property details</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300" defaultChecked={role === 'Admin'} />
                              <span className="ml-2 text-sm text-gray-600">Export property data</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300" defaultChecked={role === 'Admin'} />
                              <span className="ml-2 text-sm text-gray-600">Bulk property operations</span>
                            </label>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h5 className="font-medium text-gray-700">Analytics & Reports</h5>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300" defaultChecked={role !== 'Viewer'} />
                              <span className="ml-2 text-sm text-gray-600">Generate reports</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300" defaultChecked={role === 'Admin'} />
                              <span className="ml-2 text-sm text-gray-600">Advanced analytics</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300" defaultChecked={role === 'Admin'} />
                              <span className="ml-2 text-sm text-gray-600">Custom dashboards</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">User Activity Log</h3>
                <p className="text-sm text-gray-500">Track employee actions and system usage</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { user: 'John Smith', action: 'Viewed property details', details: '123 Ocean Drive, Miami Beach', time: '2 hours ago', type: 'view' },
                    { user: 'Sarah Johnson', action: 'Generated analytics report', details: 'Wealth Distribution - Miami Area', time: '4 hours ago', type: 'report' },
                    { user: 'John Smith', action: 'Updated user permissions', details: 'Changed Mike Chen role to Viewer', time: '1 day ago', type: 'admin' },
                    { user: 'Lisa Rodriguez', action: 'Account created', details: 'New employee onboarded', time: '2 days ago', type: 'system' },
                    { user: 'Mike Chen', action: 'Exported property data', details: '247 properties in Florida', time: '3 days ago', type: 'export' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.type === 'view' && <Eye className="w-5 h-5 text-blue-500" />}
                        {activity.type === 'report' && <Activity className="w-5 h-5 text-green-500" />}
                        {activity.type === 'admin' && <Shield className="w-5 h-5 text-purple-500" />}
                        {activity.type === 'system' && <CheckCircle className="w-5 h-5 text-gray-500" />}
                        {activity.type === 'export' && <Download className="w-5 h-5 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            <span className="text-gray-600"> {activity.action}</span>
                          </div>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{activity.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Employee Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Invite Employee</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                  placeholder="employee@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({...inviteForm, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message (Optional)</label>
                <textarea
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm({...inviteForm, message: e.target.value})}
                  placeholder="Welcome to our team!"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteEmployee}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Company Settings Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Company Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="Enterprise Plan">Enterprise Plan</option>
                    <option value="Professional Plan">Professional Plan</option>
                    <option value="Basic Plan">Basic Plan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    {companyData.logo ? (
                      <img src={companyData.logo} alt="Company Logo" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Building2 className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    <span>Upload Logo</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Access Preferences</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Allow property value estimates</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Enable wealth analytics</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-600">Share usage statistics</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCompanyModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;