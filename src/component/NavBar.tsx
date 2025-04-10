import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-primaryBlue p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">ร้านค้าออนไลน์</div>
        <div className="flex gap-4">
          <Link to="/" className="text-red text-primaryRed">หน้าแรก</Link>
          <Link to="/upload" className="text-red text-primaryRed">อัพโหลดสินค้า</Link>
          <Link to="/products" className="text-red text-primaryRed">รายการสินค้า</Link>
          <Link to="/about" className="text-red text-primaryRed">เกี่ยวกับ</Link>
          <Link to="/contact" className="text-red text-primaryRed">ติดต่อเรา</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-red text-primaryRed"
            >
              ออกจากระบบ
            </button>
          ) : (
            <>
              <Link to="/login" className="text-red text-primaryRed">ล็อกอิน</Link>
              <Link to="/register" className="text-red text-primaryRed">สมัครสมาชิก</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;