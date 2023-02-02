const isAdmin = (user: { role: 'employee' | 'admin' }) => user.role === 'admin';

export default isAdmin;
