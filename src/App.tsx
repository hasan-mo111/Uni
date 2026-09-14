import React, { useState } from 'react';
import studentPhoto from './assets/images/student_profile_photo_1789393152817.jpg';

interface ExamTimeResult {
  code: string;
  name: string;
  term: string;
  date: string;
  time: string;
  center: string;
  seat: string;
}

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Tab state: default to 'profileP' on login
  type TabType = 'profileP' | 'profileS' | 'average' | 'classes' | 'exams' | 'payments' | 'timeSearch' | 'oldReg' | 'placement' | 'military' | 'naqaba' | 'changePass' | 'updateReg' | 'chooseSpec' | 'calendar';
  const [activeTab, setActiveTab] = useState<TabType>('profileP');
  
  // Left panel UI states
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(true);
  const [studentAreaOpen, setStudentAreaOpen] = useState(true);
  const [classLecturesOpen, setClassLecturesOpen] = useState(true);
  const [examAreaOpen, setExamAreaOpen] = useState(true);
  const [studentProfileSubOpen, setStudentProfileSubOpen] = useState(true);

  // Modal for photo preview
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  // Student ID Time Search state
  const [studentIdInput, setStudentIdInput] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState<ExamTimeResult[] | null>(null);

  const mockExamSchedule: ExamTimeResult[] = [
    {
      code: 'WEB',
      name: 'تقانات الويب والتطبيقات (Web Technologies)',
      term: 'S25',
      date: '2026-10-18',
      time: '12:30 PM - 02:30 PM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 1 / Desk 08'
    },
    {
      code: 'SEC',
      name: 'أمن المعلومات والشبكات (Information Security)',
      term: 'S25',
      date: '2026-10-15',
      time: '10:00 AM - 12:00 PM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 3 / Desk 14'
    },
    {
      code: 'OPS',
      name: 'نظم التشغيل (Operating Systems)',
      term: 'F24',
      date: '2025-03-20',
      time: '01:00 PM - 03:00 PM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 2 / Desk 05'
    },
    {
      code: 'DBS',
      name: 'نظم قواعد البيانات (Database Systems)',
      term: 'F23',
      date: '2024-03-15',
      time: '09:00 AM - 11:00 AM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 1 / Desk 02'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Strict authentication rule
    if (username.trim() === 'haydaraa_116823' && password === '06200083193') {
      setIsLoggedIn(true);
      setErrorMessage('');
      setActiveTab('profileP'); // Show Personal Profile std_profileP.php immediately on login
    } else {
      setErrorMessage('الاسم أو كلمة المرور غير صحيحة (Invalid username or password)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserOtp('');
    setErrorMessage('');
  };

  const handleGetTime = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    
    if (!studentIdInput.trim()) {
      setSearchError('يرجى إدخال الرقم الجامعي للطالب (Please enter Student ID)');
      setSearchResults(null);
      return;
    }

    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
      if (studentIdInput.trim() === '116823' || studentIdInput.trim() === '116823_1' || studentIdInput.trim().length >= 4) {
        setSearchResults(mockExamSchedule);
        setSearchError('');
      } else {
        setSearchError('الرقم الجامعي غير موجود أو لا توجد جلسات امتحانية حالية');
        setSearchResults(null);
      }
    }, 400);
  };

  const handleUserChange = (val: string) => {
    setUsername(val);
    if (val.trim() === '116823' || val.trim() === 'haydaraa_116823') {
      setShowOtp(true);
    } else {
      setShowOtp(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#b7c1c5', minHeight: '100vh', fontFamily: 'Tahoma, Arial, Helvetica, sans-serif', fontSize: '11px', color: '#434343' }}>
      <table cellSpacing={0} cellPadding={0} align="center" border={0} style={{ width: '100%', maxWidth: '980px', margin: '0 auto', backgroundColor: '#ffffff' }}>
        <tbody>
          <tr>
            <td width="3%" style={{ backgroundColor: '#ffffff' }} height="108">&nbsp;</td>
            <td style={{ backgroundColor: '#ffffff', height: '108px' }}>
              {/* Header Table */}
              <table cellSpacing={0} cellPadding={0} width="772" align="center" border={0} style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ backgroundColor: '#005a82', textAlign: 'center' }}>
                      <div style={{ position: 'relative', width: '100%', minHeight: '147px', backgroundColor: '#005a82', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', boxSizing: 'border-box' }}>
                        <div style={{ textAlign: 'left' }}>
                          <h1 style={{ color: '#ffffff', margin: 0, fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                            Syrian Virtual University
                          </h1>
                          <span style={{ color: '#DEAA5A', fontSize: '13px', fontWeight: 'bold' }}>
                            الجامعة الافتراضية السورية - SVUIS Information System
                          </span>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '11px', color: '#e0e0e0' }}>
                          <div><b>SVU Information System</b></div>
                          <div>Student Portal & Academic Records</div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Horizontal Menu (#SVU_h_menu) */}
                  <tr>
                    <td id="SVU_h_menu" style={{ backgroundColor: '#005a82', borderBottom: 'solid 4px #b2a260' }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
                        <li style={{ float: 'left' }}>
                          <a 
                            href="#home" 
                            onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('profileP'); }}
                            style={{ fontWeight: 'bold', display: 'block', padding: '0px 20px', lineHeight: '30px', fontSize: '12px', color: '#ffffff', textDecoration: 'none' }}
                          >
                            Home
                          </a>
                        </li>
                        <li style={{ float: 'left' }}>
                          <a href="https://svuonline.org/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', display: 'block', padding: '0px 20px', lineHeight: '30px', fontSize: '12px', color: '#ffffff', textDecoration: 'none' }}>
                            SVU Portal
                          </a>
                        </li>
                        <li style={{ float: 'left' }}>
                          <a href="http://mail.svuonline.org/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', display: 'block', padding: '0px 20px', lineHeight: '30px', fontSize: '12px', color: '#ffffff', textDecoration: 'none' }}>
                            E-mail
                          </a>
                        </li>
                        <li style={{ float: 'left' }}>
                          <a href="https://lms.svuonline.org/login/index.php" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', display: 'block', padding: '0px 20px', lineHeight: '30px', fontSize: '12px', color: '#ffffff', textDecoration: 'none' }}>
                            LMS
                          </a>
                        </li>
                        <li style={{ float: 'left' }}>
                          <a href="https://requestsystem.svuonline.org/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', display: 'block', padding: '0px 20px', lineHeight: '30px', fontSize: '12px', color: '#ffffff', textDecoration: 'none' }}>
                            Request system
                          </a>
                        </li>
                        <li style={{ float: 'left' }}>
                          <a href="http://svu.netlanguages.com/netlang/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', display: 'block', padding: '0px 20px', lineHeight: '30px', fontSize: '12px', color: '#ffffff', textDecoration: 'none' }}>
                            English Courses
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Dotted Divider */}
              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0}>
                <tbody>
                  <tr style={{ backgroundColor: '#ffffff' }}>
                    <td height="10" style={{ paddingTop: '3px' }}>
                      <div style={{ height: '1px', borderTop: '1px dotted #808080', width: '100%' }}></div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Main Body Grid */}
              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0}>
                <tbody>
                  <tr>
                    {/* Left Sidebar Panel (#left_panel) */}
                    <td valign="top" style={{ width: leftPanelVisible ? '190px' : '20px', transition: 'width 0.2s' }}>
                      {leftPanelVisible ? (
                        <div style={{ width: '190px', display: 'block', margin: '0 auto' }} id="left_panel">
                          
                          {/* Logged in User Box */}
                          {isLoggedIn ? (
                            <table cellSpacing={0} cellPadding={0} width="100%" border={0} style={{ marginBottom: '10px', position: 'relative' }}>
                              <tbody>
                                <tr>
                                  <td width="5">&nbsp;</td>
                                  <td>
                                    <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0}>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div style={{ position: 'relative', width: '85px', marginBottom: '4px' }}>
                                              <img 
                                                src={studentPhoto} 
                                                alt="haydaraa alkadi" 
                                                width="85" 
                                                height="113" 
                                                onClick={() => setPhotoModalOpen(true)}
                                                style={{ width: '85px', height: '113px', objectFit: 'cover', border: '1px solid #CCCCCC', display: 'block', cursor: 'pointer' }}
                                                referrerPolicy="no-referrer"
                                                title="أنقر لتكبير الصورة الشخصية"
                                              />
                                            </div>
                                            <span className="smenu" style={{ color: '#3d7ab8', fontWeight: 'bold' }}>Welcome: haydaraa alkadi</span><br />
                                            <div id="chng_t_d" style={{ paddingTop: '2px' }}>
                                              <table cellPadding={0} cellSpacing={1} border={0} width="100%">
                                                <tbody>
                                                  <tr style={{ height: '16px' }}>
                                                    <td style={{ color: '#555' }}>User Login: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066', fontWeight: 'bold' }}>haydaraa_116823</td>
                                                  </tr>
                                                  <tr style={{ height: '16px' }}>
                                                    <td width="55" style={{ color: '#555' }}>Group: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066', fontWeight: 'bold' }}>Student</td>
                                                  </tr>
                                                  <tr style={{ height: '16px' }}>
                                                    <td style={{ color: '#555' }}>Last Login: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066' }}>2026-09-14 15:31:37</td>
                                                  </tr>
                                                  <tr>
                                                    <td style={{ color: '#555' }}>Login IP: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066' }}>51.158.195.11</td>
                                                  </tr>
                                                  <tr style={{ height: '16px' }}>
                                                    <td style={{ color: '#555' }}>Log out </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066' }}>
                                                      <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ color: '#FF0066', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                                        <img src="images/menu_connector_end.gif" alt="exit" style={{ width: '12px', height: '12px', display: 'inline-block' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                                                        exit from svuis
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          ) : (
                            /* Login Box Table for Unauthenticated */
                            <table cellSpacing={0} cellPadding={0} width="94%" align="center" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #C0C0C0', backgroundColor: '#F7F7F7', marginBottom: '10px' }}>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="smenu" style={{ backgroundColor: '#EDEDED', padding: '4px', fontWeight: 'bold', color: '#3a618c' }}>
                                      🔒 Login
                                    </div>
                                    <div style={{ padding: '6px' }}>
                                      {errorMessage && (
                                        <div style={{ color: 'red', backgroundColor: '#FFFFCC', border: '1px dotted red', padding: '4px', fontSize: '11px', marginBottom: '6px', textAlign: 'center', fontWeight: 'bold' }}>
                                          {errorMessage}
                                        </div>
                                      )}
                                      <form onSubmit={handleLogin}>
                                        <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                          <tbody>
                                            <tr>
                                              <td align="right"><span style={{ color: '#3a618c' }}>username</span></td>
                                              <td width="2"></td>
                                              <td align="left">
                                                <input 
                                                  type="text" 
                                                  name="user_name"
                                                  value={username}
                                                  onChange={(e) => handleUserChange(e.target.value)}
                                                  className="login_input"
                                                  style={{ fontSize: '11px', fontFamily: 'Verdana, Tahoma', width: '100px', height: '18px', padding: '0px', color: '#054B8B', border: '1px solid #7F9DB9' }}
                                                />
                                              </td>
                                            </tr>
                                            <tr style={{ height: '20px' }}>
                                              <td align="right"><span style={{ color: '#3a618c' }}>password</span></td>
                                              <td></td>
                                              <td align="left">
                                                <input 
                                                  type="password" 
                                                  name="user_pass"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  className="login_input"
                                                  style={{ fontSize: '11px', fontFamily: 'Verdana, Tahoma', width: '100px', height: '18px', padding: '0px', color: '#054B8B', border: '1px solid #7F9DB9' }}
                                                />
                                              </td>
                                            </tr>
                                            {showOtp && (
                                              <tr style={{ height: '20px' }} id="tr_otp">
                                                <td align="right"><span style={{ color: 'red' }}>OTP</span></td>
                                                <td></td>
                                                <td align="left">
                                                  <input 
                                                    type="password" 
                                                    name="user_otp"
                                                    value={userOtp}
                                                    onChange={(e) => setUserOtp(e.target.value)}
                                                    className="login_input"
                                                    style={{ fontSize: '11px', fontFamily: 'Verdana, Tahoma', width: '100px', height: '18px', padding: '0px', color: '#054B8B', border: '1px solid #7F9DB9' }}
                                                  />
                                                </td>
                                              </tr>
                                            )}
                                            <tr style={{ height: '22px' }}>
                                              <td colSpan={3} style={{ padding: '4px 0', textAlign: 'center' }}>
                                                <input 
                                                  type="submit" 
                                                  value="login" 
                                                  className="btn1"
                                                  style={{ fontSize: '10px', fontFamily: 'Verdana, Tahoma', backgroundColor: '#ffffff', border: '1px solid #7F9DB9', color: '#2A5C8B', padding: '2px 8px', cursor: 'pointer', fontWeight: 'bold' }}
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </form>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}

                          <div style={{ height: '6px' }}></div>

                          {/* Student User Guides Link */}
                          <div style={{ padding: '3px 0 5px 2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ color: '#3d7ab8', fontSize: '13px' }}>ℹ</span>
                            <a href="#guides" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('profileP'); }} style={{ color: '#3d7ab8', fontWeight: 'bold', textDecoration: 'none', fontSize: '11px' }}>
                              Student User Guides
                            </a>
                          </div>

                          {/* Register Student Menu */}
                          <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0} style={{ margin: '3px 0' }}>
                            <tbody>
                              <tr>
                                <td style={{ cursor: 'pointer', width: '16px' }} onClick={() => setRegisterMenuOpen(!registerMenuOpen)}>
                                  <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#555', fontFamily: 'monospace' }}>{registerMenuOpen ? '➖' : '➕'}</span>
                                </td>
                                <td className="smenu" style={{ cursor: 'pointer', fontSize: '11px' }} onClick={() => setRegisterMenuOpen(!registerMenuOpen)}>
                                  <b style={{ color: '#3d7ab8' }}>Register Student</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {registerMenuOpen && (
                            <div id="d3" style={{ display: 'block', paddingLeft: '12px', lineHeight: '18px' }}>
                              <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                <tbody>
                                  <tr>
                                    <td width="10" style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#oldReg" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('oldReg'); }} style={{ color: activeTab === 'oldReg' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Registration for old students
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#placement" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('placement'); }} style={{ color: activeTab === 'placement' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Registration in Placement Test
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#payments" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('payments'); }} style={{ color: activeTab === 'payments' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        student's payments
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#average" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('average'); }} style={{ color: activeTab === 'average' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Student Current Average
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#payments" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('payments'); }} style={{ color: activeTab === 'payments' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        E-Payment
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#updateReg" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('updateReg'); }} style={{ color: activeTab === 'updateReg' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Update Student Registration
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#naqaba" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('naqaba'); }} style={{ color: activeTab === 'naqaba' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        upload Naqaba File
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#military" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('military'); }} style={{ color: activeTab === 'military' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        upload Military File
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#profileP" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('profileP'); }} style={{ color: activeTab === 'profileP' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Personal Profile
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>└</td>
                                    <td>
                                      <a className="smenublue" href="#profileS" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('profileS'); }} style={{ color: activeTab === 'profileS' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Studies Profile
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {isLoggedIn && (
                            <>
                              <div style={{ height: '1px', borderTop: '1px dotted #ccc', margin: '6px 0' }}></div>
                              
                              {/* Student Area Menu */}
                              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0} style={{ margin: '3px 0' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ cursor: 'pointer', width: '16px' }} onClick={() => setStudentAreaOpen(!studentAreaOpen)}>
                                      <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#555' }}>{studentAreaOpen ? '➖' : '➕'}</span>
                                    </td>
                                    <td className="smenu" style={{ cursor: 'pointer', fontSize: '11px' }} onClick={() => setStudentAreaOpen(!studentAreaOpen)}>
                                      <b style={{ color: '#3d7ab8' }}>Student Area</b>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {studentAreaOpen && (
                                <div style={{ display: 'block', paddingLeft: '12px', lineHeight: '18px' }}>
                                  <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                    <tbody>
                                      <tr>
                                        <td width="10" style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <a 
                                            href="#chooseSpec" 
                                            onClick={(e) => { e.preventDefault(); setActiveTab('chooseSpec'); }}
                                            style={{ color: activeTab === 'chooseSpec' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}
                                          >
                                            choose Specialization
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }} onClick={() => setStudentProfileSubOpen(!studentProfileSubOpen)}>
                                            <a 
                                              href="#profileP" 
                                              onClick={(e) => { e.preventDefault(); setActiveTab('profileP'); }}
                                              style={{ color: activeTab === 'profileP' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}
                                            >
                                              Student Profile
                                            </a>
                                          </div>
                                          {studentProfileSubOpen && (
                                            <div style={{ paddingLeft: '10px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#naqaba" onClick={(e) => { e.preventDefault(); setActiveTab('naqaba'); }} style={{ color: activeTab === 'naqaba' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  upload Naqaba File
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#military" onClick={(e) => { e.preventDefault(); setActiveTab('military'); }} style={{ color: activeTab === 'military' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  upload Military File
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>└</span>
                                                <a href="#changePass" onClick={(e) => { e.preventDefault(); setActiveTab('changePass'); }} style={{ color: activeTab === 'changePass' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  Change Password
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <a 
                                            href="#profileS" 
                                            onClick={(e) => { e.preventDefault(); setActiveTab('profileS'); }}
                                            style={{ color: activeTab === 'profileS' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}
                                          >
                                            Studies Profile
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <a 
                                            href="#calendar" 
                                            onClick={(e) => { e.preventDefault(); setActiveTab('calendar'); }}
                                            style={{ color: activeTab === 'calendar' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}
                                          >
                                            Year Calendar
                                          </a>
                                        </td>
                                      </tr>

                                      {/* Class & Lectures Group */}
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer', marginTop: '2px' }} onClick={() => setClassLecturesOpen(!classLecturesOpen)}>
                                            <span style={{ fontSize: '12px' }}>👤</span>
                                            <b style={{ color: '#434343' }}>Class &amp; Lectures</b>
                                          </div>
                                          {classLecturesOpen && (
                                            <div style={{ paddingLeft: '10px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Lecture&amp;Tutor time
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Select Classes
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: activeTab === 'classes' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  My Classes
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Course &amp; Tutors
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Lecture Time Table
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>└</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Download Sessions
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>

                                      {/* Exam Area Group */}
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>└</td>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer', marginTop: '2px' }} onClick={() => setExamAreaOpen(!examAreaOpen)}>
                                            <span style={{ fontSize: '12px' }}>👤</span>
                                            <b style={{ color: '#434343' }}>Exam Area</b>
                                          </div>
                                          {examAreaOpen && (
                                            <div style={{ paddingLeft: '10px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>└</span>
                                                <a href="#exams" onClick={(e) => { e.preventDefault(); setActiveTab('exams'); }} style={{ color: activeTab === 'exams' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  Exam Time Table
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </>
                          )}

                          <div style={{ height: '14px', backgroundImage: 'url(images/dotted_pixel_horizontal.gif)', width: '100%', margin: '10px 0' }}></div>

                          {/* Social Channel Banners */}
                          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <a href="https://www.youtube.com/channel/UCJwPgp0tOp1ZqkzbmDvFSaw" target="_blank" rel="noreferrer" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                              <div style={{ backgroundColor: '#CC0000', color: '#ffffff', padding: '6px 4px', fontWeight: 'bold', borderRadius: '3px', fontSize: '11px' }}>
                                ▶ SVU YouTube Channel
                              </div>
                            </a>
                          </div>

                          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <a href="https://www.facebook.com/svuonline.org" target="_blank" rel="noreferrer" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                              <div style={{ backgroundColor: '#3b5998', color: '#ffffff', padding: '6px 4px', fontWeight: 'bold', borderRadius: '3px', fontSize: '11px' }}>
                                f SVU Facebook Page
                              </div>
                            </a>
                          </div>

                          <div style={{ marginTop: '15px' }}>
                            <button 
                              onClick={() => setLeftPanelVisible(false)}
                              style={{ fontSize: '9px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                              ◄ Hide Panel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: '5px' }}>
                          <button 
                            onClick={() => setLeftPanelVisible(true)}
                            style={{ fontSize: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}
                          >
                            ►
                          </button>
                        </div>
                      )}
                    </td>

                    <td width="1" style={{ backgroundColor: '#CCCCCC' }}></td>

                    {/* Main Content Area */}
                    <td valign="top" style={{ padding: '10px' }}>
                      {!isLoggedIn ? (
                        /* Unauthenticated Landing / Exam Time Search Form */
                        <div>
                          {/* Errors Block */}
                          {searchError && (
                            <div id="errors-block" className="msg_ok_mofadalah" style={{ backgroundColor: '#FFFFCC', color: 'red', border: '1px dotted #FF0000', textAlign: 'left', padding: '8px', marginBottom: '10px', fontWeight: 'bold' }}>
                              <ul>
                                <li>{searchError}</li>
                              </ul>
                            </div>
                          )}

                          <form name="exam_time_table" id="exam_time_table" style={{ width: '100%' }} onSubmit={handleGetTime}>
                            <table cellSpacing={0} cellPadding={0} width="98%" align="center" border={0} style={{ backgroundColor: '#EFEFEF', border: '1px solid #C0C0C0', padding: '10px' }}>
                              <tbody>
                                <tr>
                                  <td> &nbsp; </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="left" style={{ width: '20%', paddingLeft: '15px', color: '#666666', height: '22px' }}>
                                    <b>Student Id:</b>
                                  </td>
                                  <td className="gray_padd10" align="left" style={{ width: '58%', paddingLeft: '10px' }}>
                                    <input 
                                      type="number" 
                                      id="StudentID" 
                                      name="StudentID" 
                                      value={studentIdInput}
                                      onChange={(e) => setStudentIdInput(e.target.value)}
                                      className="input" 
                                      style={{ width: '75%', margin: '0px 40px', borderColor: '#a69448', borderStyle: 'solid', borderWidth: '1px', padding: '2px', fontSize: '11px' }}
                                      placeholder="e.g. 116823"
                                    />
                                  </td>
                                  <td className="gray_padd15" align="left" style={{ width: '22%', paddingLeft: '15px', color: '#666666' }}>
                                    <b>:الرقم الجامعي للطالب</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={3}> &nbsp; </td>
                                </tr>
                                <tr>
                                  <td align="center" className="tdpadding" colSpan={3} style={{ paddingLeft: '2px', paddingRight: '2px' }}>
                                    <button 
                                      type="submit" 
                                      id="cclick" 
                                      disabled={searchLoading}
                                      style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px', backgroundColor: '#005a82', color: '#ffffff', border: 'none', padding: '4px 15px', cursor: 'pointer' }}
                                    >
                                      {searchLoading ? 'Sending...' : 'Get Time'}
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="right" colSpan={3} style={{ paddingLeft: '15px', color: '#666666' }}>
                                    <h1 style={{ margin: '5px', fontSize: '12px', color: '#434d4b', fontFamily: 'tahoma, helvetica' }}>
                                      <b>تفاصيل مركز التعلم مدى الحياة </b>
                                      <a target="_blank" rel="noreferrer" href="https://svuonline.org/ar/%D8%A7%D9%84%D8%A7%D8%AA%D8%B5%D8%A7%D9%84-%D8%A2%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8-%D9%88%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%85-%D9%85%D8%AF%D9%89-%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9" style={{ color: '#0066FF', textDecoration: 'none' }}> اضغط هنا </a>
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="right" colSpan={3} style={{ paddingLeft: '15px', color: '#666666' }}>
                                    <h1 style={{ margin: '5px', fontSize: '12px', color: '#434d4b', fontFamily: 'tahoma, helvetica' }}>
                                      <b>تفاصيل مراكز النفاذ الداخلية على موقع الجامعة </b>
                                      <a target="_blank" rel="noreferrer" href="https://svuonline.org/ar/%D9%85%D8%B1%D8%A7%D9%83%D8%B2-%D8%A7%D9%84%D9%86%D9%81%D8%A7%D8%B0/%D8%AF%D8%A7%D8%AE%D9%84%D9%8A%D8%A9" style={{ color: '#0066FF', textDecoration: 'none' }}> اضغط هنا </a>
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="right" colSpan={3} style={{ paddingLeft: '15px', color: '#666666' }}>
                                    <h1 style={{ margin: '5px', fontSize: '12px', color: '#434d4b', fontFamily: 'tahoma, helvetica' }}>
                                      <b>تفاصيل مراكز النفاذ الخارجية على موقع الجامعة </b>
                                      <a target="_blank" rel="noreferrer" href="https://svuonline.org/ar/%D9%85%D8%B1%D8%A7%D9%83%D8%B2-%D8%A7%D9%84%D9%86%D9%81%D8%A7%D8%B0/%D8%AE%D8%A7%D8%B1%D8%AC%D9%8A%D8%A9" style={{ color: '#0066FF', textDecoration: 'none' }}> اضغط هنا </a>
                                    </h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </form>

                          <br />

                          {/* Results Table (#results) */}
                          {searchResults && searchResults.length > 0 && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px', textAlign: 'center' }}>
                                📅 جدول مواعيد الامتحانات للطالب (Student ID: {studentIdInput}) - حيدرة العلي (Haydara Al Ali)
                              </div>
                              <table id="results" dir="ltr" width="98%" border={5} cellSpacing={0} cellPadding={4} align="center" style={{ borderCollapse: 'collapse', border: '3px solid #20639b', textAlign: 'center', backgroundColor: '#ffffff', margin: '0 auto', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold' }}>
                                    <td width="10%">رمز المقرر</td>
                                    <td width="30%">اسم المقرر (Course Title)</td>
                                    <td width="10%">الفصل</td>
                                    <td width="15%">تاريخ الامتحان</td>
                                    <td width="15%">التوقيت (Time)</td>
                                    <td width="15%">مركز الامتحانات</td>
                                    <td width="10%">القاعة / المقعد</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {searchResults.map((item, idx) => (
                                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#F7F7F7' : '#ffffff' }}>
                                      <td><b>{item.code}</b></td>
                                      <td style={{ textAlign: 'right', paddingRight: '8px' }}>{item.name}</td>
                                      <td>{item.term}</td>
                                      <td>{item.date}</td>
                                      <td>{item.time}</td>
                                      <td>{item.center}</td>
                                      <td>{item.seat}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Authenticated Student Portal */
                        <div>
                          {/* Navigation Tabs for Pages */}
                          <div style={{ borderBottom: '2px solid #005a82', marginBottom: '12px', display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
                            <button 
                              onClick={() => setActiveTab('profileP')}
                              style={{ 
                                backgroundColor: activeTab === 'profileP' ? '#005a82' : '#EDEDED', 
                                color: activeTab === 'profileP' ? '#ffffff' : '#333333',
                                border: '1px solid #A8CADC',
                                borderBottom: 'none',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              الملف الشخصي (std_profileP.php)
                            </button>
                            <button 
                              onClick={() => setActiveTab('profileS')}
                              style={{ 
                                backgroundColor: activeTab === 'profileS' ? '#005a82' : '#EDEDED', 
                                color: activeTab === 'profileS' ? '#ffffff' : '#333333',
                                border: '1px solid #A8CADC',
                                borderBottom: 'none',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              العلامات والملف (std_profileS.php)
                            </button>
                            <button 
                              onClick={() => setActiveTab('average')}
                              style={{ 
                                backgroundColor: activeTab === 'average' ? '#005a82' : '#EDEDED', 
                                color: activeTab === 'average' ? '#ffffff' : '#333333',
                                border: '1px solid #A8CADC',
                                borderBottom: 'none',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              المعدلات (std_current_average.php)
                            </button>
                            <button 
                              onClick={() => setActiveTab('classes')}
                              style={{ 
                                backgroundColor: activeTab === 'classes' ? '#005a82' : '#EDEDED', 
                                color: activeTab === 'classes' ? '#ffffff' : '#333333',
                                border: '1px solid #A8CADC',
                                borderBottom: 'none',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              الصفوف الافتراضية (std_classes.php)
                            </button>
                            <button 
                              onClick={() => setActiveTab('exams')}
                              style={{ 
                                backgroundColor: activeTab === 'exams' ? '#005a82' : '#EDEDED', 
                                color: activeTab === 'exams' ? '#ffffff' : '#333333',
                                border: '1px solid #A8CADC',
                                borderBottom: 'none',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              جدول الامتحانات (exam_calendar.php)
                            </button>
                            <button 
                              onClick={() => setActiveTab('payments')}
                              style={{ 
                                backgroundColor: activeTab === 'payments' ? '#005a82' : '#EDEDED', 
                                color: activeTab === 'payments' ? '#ffffff' : '#333333',
                                border: '1px solid #A8CADC',
                                borderBottom: 'none',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              المدفوعات (student_payments.php)
                            </button>
                            <button 
                              onClick={() => setActiveTab('timeSearch')}
                              style={{ 
                                backgroundColor: activeTab === 'timeSearch' ? '#005a82' : '#EDEDED', 
                                color: activeTab === 'timeSearch' ? '#ffffff' : '#333333',
                                border: '1px solid #A8CADC',
                                borderBottom: 'none',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              بحث مواعيد الامتحانات (course_time_tutor.php)
                            </button>
                          </div>

                          {/* TAB 0: std_profileP.php (Personal Profile) */}
                          {activeTab === 'profileP' && (
                            <div>
                              <div className="smenu" style={{ marginBottom: '6px', color: '#6f7b79', fontWeight: 'bold' }}>
                                &nbsp;<b>Student Section: <i>Personal Profile (std_profileP.php):</i></b>
                              </div>

                              {/* Student Summary Pink Box */}
                              <table cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginBottom: '10px' }}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div style={{ padding: '8px', border: '1px solid #FEB8AE', backgroundColor: '#FFF3EF', lineHeight: '18px' }}>
                                        Student ID: <span style={{ color: '#0077FF', fontWeight: 'bold' }}>116823</span><br />
                                        Student Name: <span style={{ color: '#0077FF', textTransform: 'capitalize', fontWeight: 'bold' }}>haydaraa yaqub alkadi (حيدرة يعقوب القاضي)</span><br />
                                        Login Name: <span style={{ color: '#0077FF' }}>haydaraa_116823</span><br />
                                        Baclurea Marks: <span style={{ color: '#0077FF' }}>Baclurea Marks</span><br />
                                        Degree(s) : <span style={{ color: '#0077FF' }}>ثانوية عامة</span> - <span style={{ color: '#0077FF' }}>فرع علمي 2013</span><br />
                                        Degree Specialization : <span style={{ color: '#0077FF' }}>فرع علمي 2013 فرع ثانوي</span><br />
                                        Registration Date: <span style={{ color: '#0077FF' }}>2018-10-24 13:53:31</span><br />
                                        Last Access Date: <span style={{ color: '#0077FF' }}>2026-09-14 15:31:39</span><br />
                                        Registration Term: <span style={{ color: '#0077FF' }}>F18</span><br />
                                        Student Status: <span style={{ color: '#FF00FF', fontWeight: 'bold' }}>active</span><br />
                                        Email Status: <span style={{ color: '#FF00FF', fontWeight: 'bold' }}>Active</span><br />
                                        Student Scholarship: <span style={{ color: '#ff0004' }}>-</span><br />
                                        Old Student ID: <span style={{ color: '#0077FF' }}>0</span><br />
                                        
                                        <div style={{ marginTop: '6px' }}>
                                          Student in Program (s):
                                          <div style={{ color: '#0077FF', padding: '5px 0', border: '0px solid #cccccc' }}>
                                            <table cellPadding={3} cellSpacing={0} border={1} width="100%" style={{ borderCollapse: 'collapse', borderColor: '#cccccc' }}>
                                              <tbody>
                                                <tr style={{ backgroundColor: '#FEF9DF', color: '#333' }}>
                                                  <td><b>Program Info</b></td>
                                                  <td><b>Degree</b></td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    Bachelor of Law (BL) / BL: [<span style={{ color: 'blue', fontWeight: 'bold' }}>Registered</span>, avg.= ,men.=, No= , Date=,Fix_avg.=UnFixed] (Order:1)<br />
                                                    Profile validated by coordinator
                                                  </td>
                                                  <td>ثانوية عامة - فرع علمي 2013 فرع ثانوي</td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    Bachelor in Economics (BSCE) / : [<span style={{ color: 'orange', fontWeight: 'bold' }}>Conditional</span>, avg.= ,men.=, No= , Date=,Fix_avg.=UnFixed] (Order:2)<br />
                                                    Profile validated by coordinator
                                                  </td>
                                                  <td>ثانوية عامة - فرع علمي 2013 فرع ثانوي</td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    Bachelor in Mass Communication (BMC) / BMC_Com_spec: [<span style={{ color: 'orange', fontWeight: 'bold' }}>Conditional</span>, avg.= ,men.=, No= , Date=,Fix_avg.=UnFixed] (Order:3)<br />
                                                    Profile validated by coordinator
                                                  </td>
                                                  <td>ثانوية عامة - فرع علمي 2013 فرع ثانوي</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>

                                        <hr style={{ border: 0, height: '1px', backgroundColor: '#CCCCCC', margin: '8px 0' }} />

                                        Student Account ID: <span style={{ color: '#0077FF', fontWeight: 'bold' }}>226089</span><br />
                                        Student Account Currency: <span style={{ color: '#0077FF' }}>Syrian Pound [SYP]</span><br />
                                        Student Account Balance: <span style={{ color: '#0077FF' }}>0.00</span><br />
                                        Student Account Status: <span style={{ color: '#339900', fontWeight: 'bold' }}>Active</span><br />
                                      </div>
                                    </td>
                                    <td width="10"></td>
                                    <td width="95" valign="top">
                                      <div style={{ padding: '5px', border: '1px solid #FEB8AE', backgroundColor: '#FFF3EF', textAlign: 'center' }}>
                                        <img 
                                          src={studentPhoto} 
                                          alt="haydaraa alkadi" 
                                          width="85" 
                                          height="113" 
                                          onClick={() => setPhotoModalOpen(true)}
                                          style={{ width: '85px', height: '113px', objectFit: 'cover', border: '1px solid #FEB8AE', cursor: 'pointer', display: 'block', margin: '0 auto' }} 
                                          referrerPolicy="no-referrer"
                                          title="أنقر لمشاهدة الصورة الشخصية بحجم كامل"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {/* Personal Profile Details Grid */}
                              <table cellSpacing={0} cellPadding={4} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px' }}>
                                <tbody>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '20%' }}>First Name</td>
                                    <td className="tdpadding_h" style={{ width: '30%' }}>haydaraa</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '20%' }}>In Arabic</td>
                                    <td className="tdpadding_h" style={{ width: '30%' }}>حيدرة</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Father Name</td>
                                    <td className="tdpadding_h">yaqub</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>In Arabic</td>
                                    <td className="tdpadding_h">يعقوب</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Mother Name</td>
                                    <td className="tdpadding_h">hanan</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>In Arabic</td>
                                    <td className="tdpadding_h">حنان</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Surname</td>
                                    <td className="tdpadding_h">alkadi</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>In Arabic</td>
                                    <td className="tdpadding_h">القاضي</td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Place Of Birth</td>
                                    <td className="tdpadding_h">اللاذقية</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Date Of Birth</td>
                                    <td className="tdpadding_h">2000-02-20</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Gender</td>
                                    <td className="tdpadding_h">ذكر (Male)</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Martial Status</td>
                                    <td className="tdpadding_h">أعزب (Single)</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Military Status</td>
                                    <td className="tdpadding_h">مؤجل بالدراسة</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Military Office</td>
                                    <td className="tdpadding_h">اللاذقية</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Civil Place &amp; Num.</td>
                                    <td className="tdpadding_h" colSpan={3}>جبلة 28</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Nationality</td>
                                    <td className="tdpadding_h">Syrian / سوري</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>SID (الرقم الوطني)</td>
                                    <td className="tdpadding_h"><b>06200083193</b></td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Country</td>
                                    <td className="tdpadding_h">Syria</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>City</td>
                                    <td className="tdpadding_h">Latakia</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Address</td>
                                    <td className="tdpadding_h">اللاذقية</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>ZIP/Postal Code</td>
                                    <td className="tdpadding_h">-</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Phone</td>
                                    <td className="tdpadding_h">04141564207</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Mobile</td>
                                    <td className="tdpadding_h">0991187851</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Email</td>
                                    <td className="tdpadding_h">haydaraa554@gmail.com</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Fax</td>
                                    <td className="tdpadding_h">-</td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>صورة الوثيقة / الشهادة 1</td>
                                    <td className="tdpadding_h" colSpan={3}>
                                      <a href="#view" onClick={(e) => e.preventDefault()} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_Degree_1_06200083193.jpg
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>صورة عن الهوية الشخصية</td>
                                    <td className="tdpadding_h" colSpan={3}>
                                      <a href="#view" onClick={(e) => e.preventDefault()} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_SID_.jpg
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>صورة شخصية</td>
                                    <td className="tdpadding_h" colSpan={3}>
                                      <a href="#view" onClick={(e) => e.preventDefault()} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        <span onClick={() => setPhotoModalOpen(true)} style={{ cursor: 'pointer' }}>upload_PHOTO_06200083193.jpg</span>
                                      </a>
                                    </td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>ملاحظات التنسيق والتدقيق</td>
                                    <td className="tdpadding" colSpan={3}>
                                      <textarea 
                                        readOnly 
                                        value={`تم قبول ملف الطالب\n\n Your Student ID is : 116823\n\n You can reprint your application using the following link:\n https://svuis.svuonline.org/SVUIS/print_student_info.php?newStd=1&student_id=116823&s=06200083193\n **__** WROTE BY: bit_coor** TIME: 2019-01-15 12:13:49 \n ######################## \n\n\nملاحظة التدقيق:\nيرجى فتح رابط الطلب والتأكد من البيانات والأوراق المرفقة\n\n Your Student ID is : 116823\n\n You can reprint your application using the following link:\n https://svuis.svuonline.org/SVUIS/print_student_info.php?newStd=1&student_id=116823&s=06200083193\n **__** WROTE BY: bmc_coor** TIME: 2018-10-25 12:47:38 \n ######################## `}
                                        style={{ width: '100%', height: '140px', fontSize: '11px', fontFamily: 'Tahoma, Arial', color: '#434343' }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 1: std_profileS.php */}
                          {activeTab === 'profileS' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📋 كشف العلامات وسجل المقررات الدراسية (Student Academic Record - std_profileS.php)
                              </div>

                              <table cellSpacing={1} cellPadding={4} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td width="8%">رمز المقرر</td>
                                    <td width="32%" style={{ textAlign: 'right' }}>اسم المقرر (Course Title)</td>
                                    <td width="12%">الفصل (Term)</td>
                                    <td width="10%">العملي (30)</td>
                                    <td width="10%">النظري (70)</td>
                                    <td width="10%">المجموع (100)</td>
                                    <td width="10%">النتيجة (Status)</td>
                                    <td width="8%">النقاط</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ backgroundColor: '#F7F7F7', textAlign: 'center' }}>
                                    <td><b>DBS</b></td>
                                    <td style={{ textAlign: 'right' }}>نظم قواعد البيانات (Database Systems)</td>
                                    <td>F23</td>
                                    <td>28</td>
                                    <td>60</td>
                                    <td style={{ fontWeight: 'bold', color: '#0000FF' }}>88</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>ناجح</td>
                                    <td>4.0</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#ffffff', textAlign: 'center' }}>
                                    <td><b>SEN</b></td>
                                    <td style={{ textAlign: 'right' }}>هندسة البرمجيات (Software Engineering)</td>
                                    <td>F23</td>
                                    <td>29</td>
                                    <td>63</td>
                                    <td style={{ fontWeight: 'bold', color: '#0000FF' }}>92</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>ناجح</td>
                                    <td>4.0</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F7F7F7', textAlign: 'center' }}>
                                    <td><b>CNE</b></td>
                                    <td style={{ textAlign: 'right' }}>شبكات الحاسوب (Computer Networks)</td>
                                    <td>S24</td>
                                    <td>26</td>
                                    <td>58</td>
                                    <td style={{ fontWeight: 'bold', color: '#0000FF' }}>84</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>ناجح</td>
                                    <td>3.5</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#ffffff', textAlign: 'center' }}>
                                    <td><b>WEB</b></td>
                                    <td style={{ textAlign: 'right' }}>تقانات الويب والتطبيقات (Web Technologies)</td>
                                    <td>S24</td>
                                    <td>27</td>
                                    <td>65</td>
                                    <td style={{ fontWeight: 'bold', color: '#0000FF' }}>92</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>ناجح</td>
                                    <td>4.0</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F7F7F7', textAlign: 'center' }}>
                                    <td><b>OPS</b></td>
                                    <td style={{ textAlign: 'right' }}>نظم التشغيل (Operating Systems)</td>
                                    <td>F24</td>
                                    <td>25</td>
                                    <td>60</td>
                                    <td style={{ fontWeight: 'bold', color: '#0000FF' }}>85</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>ناجح</td>
                                    <td>3.7</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#ffffff', textAlign: 'center' }}>
                                    <td><b>AI1</b></td>
                                    <td style={{ textAlign: 'right' }}>الذكاء الاصطناعي (Artificial Intelligence)</td>
                                    <td>F24</td>
                                    <td>28</td>
                                    <td>62</td>
                                    <td style={{ fontWeight: 'bold', color: '#0000FF' }}>90</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>ناجح</td>
                                    <td>4.0</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 2: std_current_average.php */}
                          {activeTab === 'average' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📊 المعدل الفصلي والتراكمي (Student Current Average - std_current_average.php)
                              </div>

                              <table cellSpacing={1} cellPadding={6} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #A8CADC', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <tbody>
                                  <tr style={{ backgroundColor: '#F4F4F4' }}>
                                    <td width="30%"><b>المعدل التراكمي العام (GPA):</b></td>
                                    <td width="70%" style={{ fontSize: '14px', fontWeight: 'bold', color: '#005a82' }}>88.57 % (امتياز)</td>
                                  </tr>
                                  <tr>
                                    <td><b>الساعات المنجزة (Completed Credits):</b></td>
                                    <td style={{ fontWeight: 'bold' }}>124 / 140 ساعة معتمدة</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F4F4F4' }}>
                                    <td><b>معدل فصل الخريف F24:</b></td>
                                    <td style={{ color: '#0077FF', fontWeight: 'bold' }}>87.50 %</td>
                                  </tr>
                                  <tr>
                                    <td><b>معدل فصل الربيع S24:</b></td>
                                    <td style={{ color: '#0077FF', fontWeight: 'bold' }}>88.00 %</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F4F4F4' }}>
                                    <td><b>معدل فصل الخريف F23:</b></td>
                                    <td style={{ color: '#0077FF', fontWeight: 'bold' }}>90.00 %</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 3: std_classes.php */}
                          {activeTab === 'classes' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🏫 الصفوف الافتراضية والمقررات المسجلة (My Virtual Classes - std_classes.php)
                              </div>

                              <table cellSpacing={1} cellPadding={4} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>رمز المقرر</td>
                                    <td style={{ textAlign: 'right' }}>اسم المقرر</td>
                                    <td>رقم الصف (Class)</td>
                                    <td>المدرس (Tutor)</td>
                                    <td>توقيت الجلسة (Class Time)</td>
                                    <td>رابط الجلسة</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td><b>WEB</b></td>
                                    <td style={{ textAlign: 'right' }}>تقانات الويب والتطبيقات</td>
                                    <td>C1</td>
                                    <td>د. محمد أحمد</td>
                                    <td>الأحد 08:00 PM</td>
                                    <td><a href="https://lms.svuonline.org" target="_blank" rel="noreferrer" style={{ color: '#0066FF' }}>دخول الصف</a></td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
                                    <td><b>SEC</b></td>
                                    <td style={{ textAlign: 'right' }}>أمن المعلومات والشبكات</td>
                                    <td>C2</td>
                                    <td>د. سامر حسن</td>
                                    <td>الثلاثاء 06:00 PM</td>
                                    <td><a href="https://lms.svuonline.org" target="_blank" rel="noreferrer" style={{ color: '#0066FF' }}>دخول الصف</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 4: exam_calendar.php */}
                          {activeTab === 'exams' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📅 برنامج الامتحانات الفاصلة (Exam Calendar - exam_calendar.php)
                              </div>

                              <table cellSpacing={1} cellPadding={4} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #20639b', backgroundColor: '#ffffff', fontSize: '11px', textAlign: 'center' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold' }}>
                                    <td>المقرر</td>
                                    <td>الفصل</td>
                                    <td>التاريخ</td>
                                    <td>التوقيت</td>
                                    <td>المركز الامتحان</td>
                                    <td>القاعة والمقعد</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ backgroundColor: '#F7F7F7' }}>
                                    <td><b>WEB - تقانات الويب</b></td>
                                    <td>S25</td>
                                    <td>2026-10-18</td>
                                    <td>12:30 PM - 02:30 PM</td>
                                    <td>مركز المزة - دمشق</td>
                                    <td>Lab 1 / Desk 08</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#ffffff' }}>
                                    <td><b>SEC - أمن المعلومات</b></td>
                                    <td>S25</td>
                                    <td>2026-10-15</td>
                                    <td>10:00 AM - 12:00 PM</td>
                                    <td>مركز المزة - دمشق</td>
                                    <td>Lab 3 / Desk 14</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 5: student_payments.php */}
                          {activeTab === 'payments' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                💳 كشف الحساب والمدفوعات المالية (Student Payments - student_payments.php)
                              </div>

                              <table cellSpacing={1} cellPadding={5} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #A8CADC', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>رقم الإيصال</td>
                                    <td>التاريخ</td>
                                    <td>البيان / السبب</td>
                                    <td>المبلغ (SYP)</td>
                                    <td>حالة الدفع</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td>REC-98231</td>
                                    <td>2025-10-01</td>
                                    <td>رسم تسجيل مقررات فصل F25</td>
                                    <td>450,000</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مدفوع (Paid)</td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
                                    <td>REC-81204</td>
                                    <td>2025-03-10</td>
                                    <td>رسم تسجيل مقررات فصل S24</td>
                                    <td>380,000</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مدفوع (Paid)</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 6: timeSearch */}
                          {activeTab === 'timeSearch' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🔍 استعلام مواعيد الامتحانات بالرقم الجامعي (course_time_tutor.php)
                              </div>

                              <form onSubmit={handleGetTime}>
                                <table cellSpacing={0} cellPadding={4} width="100%" style={{ backgroundColor: '#EFEFEF', border: '1px solid #C0C0C0' }}>
                                  <tbody>
                                    <tr>
                                      <td width="20%"><b>Student Id:</b></td>
                                      <td width="60%">
                                        <input 
                                          type="text" 
                                          value={studentIdInput} 
                                          onChange={(e) => setStudentIdInput(e.target.value)}
                                          style={{ width: '80%', padding: '3px', border: '1px solid #a69448' }}
                                          placeholder="116823"
                                        />
                                      </td>
                                      <td width="20%"><b>:الرقم الجامعي</b></td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3} align="center">
                                        <button type="submit" style={{ backgroundColor: '#005a82', color: 'white', border: 'none', padding: '4px 15px', fontWeight: 'bold', cursor: 'pointer' }}>
                                          {searchLoading ? 'Sending...' : 'Get Time'}
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>

                              {searchResults && (
                                <table width="100%" border={1} cellPadding={4} style={{ marginTop: '10px', borderCollapse: 'collapse', borderColor: '#20639b', fontSize: '11px', textAlign: 'center' }}>
                                  <thead>
                                    <tr style={{ backgroundColor: '#005a82', color: 'white' }}>
                                      <td>رمز المقرر</td>
                                      <td>اسم المقرر</td>
                                      <td>الفصل</td>
                                      <td>التاريخ</td>
                                      <td>التوقيت</td>
                                      <td>المركز</td>
                                      <td>القاعة/المقعد</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {searchResults.map((r, i) => (
                                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#F7F7F7' : '#ffffff' }}>
                                        <td><b>{r.code}</b></td>
                                        <td>{r.name}</td>
                                        <td>{r.term}</td>
                                        <td>{r.date}</td>
                                        <td>{r.time}</td>
                                        <td>{r.center}</td>
                                        <td>{r.seat}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                          {/* TAB 7: oldReg */}
                          {activeTab === 'oldReg' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📝 التسجيل للطلاب القدامى (Registration for Old Students - old_std_reg.php)
                              </div>
                              <div style={{ padding: '10px', border: '1px solid #FEB8AE', backgroundColor: '#FFF3EF', fontSize: '11px', marginBottom: '10px' }}>
                                <b>بيانات تسجيل الطالب:</b> حيدرة يعقوب القاضي (116823)<br />
                                <b>الفصل الأكاديمي الحاضر:</b> S25<br />
                                <b>الحالة الأكاديمية:</b> مسجل / فعال (Active Registered)<br />
                                <b>عدد المقررات المسجلة بالفصل:</b> 3 مقررات (Law BL, Economics BSCE, Mass Comm BMC)
                              </div>
                              <table cellSpacing={1} cellPadding={4} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>رمز البرنامج</td>
                                    <td>اسم البرنامج الأكاديمي</td>
                                    <td>الدرجة العلميّة</td>
                                    <td>حالة التسجيل</td>
                                    <td>الرسوم الإجمالية</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td><b>BL</b></td>
                                    <td>الإجازة في الحقوق (Bachelor of Law)</td>
                                    <td>إجازة جامعية</td>
                                    <td style={{ color: 'blue', fontWeight: 'bold' }}>مؤكد (Registered)</td>
                                    <td>145,000 SYP</td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
                                    <td><b>BSCE</b></td>
                                    <td>الإجازة في الاقتصاد (Bachelor in Economics)</td>
                                    <td>إجازة جامعية</td>
                                    <td style={{ color: 'orange', fontWeight: 'bold' }}>مشروط (Conditional)</td>
                                    <td>120,000 SYP</td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td><b>BMC</b></td>
                                    <td>الإجازة في الإعلام (Bachelor in Mass Communication)</td>
                                    <td>إجازة جامعية</td>
                                    <td style={{ color: 'orange', fontWeight: 'bold' }}>مشروط (Conditional)</td>
                                    <td>120,000 SYP</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 8: placement */}
                          {activeTab === 'placement' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                ✏️ اختبار تحديد المستوى (Placement Test Registration - pt_std_courses.php)
                              </div>
                              <div style={{ padding: '10px', border: '1px solid #A8CADC', backgroundColor: '#F9F9F9', fontSize: '11px', lineHeight: '20px' }}>
                                <b>اسم الطالب:</b> haydaraa alkadi (116823)<br />
                                <b>اختبار تحديد المستوى في اللغة الإنكليزية (English Placement Test):</b> معفى / مستوفى بنجاح<br />
                                <b>اختبار مهارات الحاسوب (ICDL / Computer Skills Test):</b> ناجح<br />
                                <b>مركز الامتحان المعين:</b> دمشق - المزة (Damascus - Mezzeh Exam Center)<br />
                                <b>حالة الطلب:</b> مكتمل ومثبت برقم المرجعية <b>PT-116823-2026</b>
                              </div>
                            </div>
                          )}

                          {/* TAB 9: military */}
                          {activeTab === 'military' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🪖 رفع وحالة شعبة التجنيد (Upload Military Document - update_documentMilitary_st.php)
                              </div>
                              <table cellSpacing={0} cellPadding={6} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px', backgroundColor: '#ffffff' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '25%' }}>شعبة التجنيد</td>
                                    <td>شعبة تجنيد اللاذقية</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>حالة التأجيل الدراسية</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مؤجل بدواعي الدراسة لعام 2026/2027</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>اسم الوثيقة المرفوعة</td>
                                    <td>
                                      <a href="#photo" onClick={(e) => { e.preventDefault(); setPhotoModalOpen(true); }} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_Military_116823.jpg
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>تاريخ الاعتماد من المنسق</td>
                                    <td>2026-01-10 10:15:00 (تم التدقيق والتصديق)</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 10: naqaba */}
                          {activeTab === 'naqaba' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📜 رفع وثيقة النقابة (Upload Naqaba File - update_documentNaqaba_st.php)
                              </div>
                              <table cellSpacing={0} cellPadding={6} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px', backgroundColor: '#ffffff' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '25%' }}>جهة النقابة / الهيئة</td>
                                    <td>نقابة المحامين / الحقوقيين في سوريا</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>الحالة والاعتماد</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مصدق ومقبول (Verified)</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>الملف المرفوع</td>
                                    <td>
                                      <a href="#photo" onClick={(e) => { e.preventDefault(); setPhotoModalOpen(true); }} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_Naqaba_116823.jpg
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 11: changePass */}
                          {activeTab === 'changePass' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🔐 تغيير كلمة المرور (Change Password - reset_password.php)
                              </div>
                              <form onSubmit={(e) => { e.preventDefault(); alert('تم تحديث كلمة المرور بنجاح للمستخدم haydaraa_116823'); }}>
                                <table cellSpacing={0} cellPadding={6} width="100%" style={{ backgroundColor: '#F9F9F9', border: '1px solid #C0C0C0', fontSize: '11px' }}>
                                  <tbody>
                                    <tr>
                                      <td width="25%"><b>Current Password:</b></td>
                                      <td><input type="password" defaultValue="06200083193" style={{ border: '1px solid #7F9DB9', padding: '2px 5px', width: '180px' }} /></td>
                                    </tr>
                                    <tr>
                                      <td><b>New Password:</b></td>
                                      <td><input type="password" placeholder="••••••••" style={{ border: '1px solid #7F9DB9', padding: '2px 5px', width: '180px' }} /></td>
                                    </tr>
                                    <tr>
                                      <td><b>Confirm New Password:</b></td>
                                      <td><input type="password" placeholder="••••••••" style={{ border: '1px solid #7F9DB9', padding: '2px 5px', width: '180px' }} /></td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2} align="center" style={{ paddingTop: '10px' }}>
                                        <button type="submit" style={{ backgroundColor: '#005a82', color: '#ffffff', border: 'none', padding: '4px 20px', fontWeight: 'bold', cursor: 'pointer' }}>
                                          Update Password
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>
                            </div>
                          )}

                          {/* TAB 12: updateReg */}
                          {activeTab === 'updateReg' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                ⚙️ تحديث بيانات التسجيل (Update Student Registration - sa_app_reg_auth.php)
                              </div>
                              <table cellSpacing={0} cellPadding={6} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px', backgroundColor: '#ffffff' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '25%' }}>رقم الهاتف المحمول</td>
                                    <td><input type="text" defaultValue="0991187851" style={{ width: '200px', border: '1px solid #ccc', padding: '2px' }} /></td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>البريد الإلكتروني</td>
                                    <td><input type="text" defaultValue="haydaraa554@gmail.com" style={{ width: '250px', border: '1px solid #ccc', padding: '2px' }} /></td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>العنوان السكني</td>
                                    <td><input type="text" defaultValue="اللاذقية - جبلة" style={{ width: '300px', border: '1px solid #ccc', padding: '2px' }} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} align="center" style={{ backgroundColor: '#F9F9F9' }}>
                                      <button onClick={() => alert('تم حفظ البيانات وتعديلها بنجاح')} style={{ backgroundColor: '#005a82', color: '#ffffff', border: 'none', padding: '4px 15px', fontWeight: 'bold', cursor: 'pointer' }}>
                                        تحديث البيانات
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 13: chooseSpec */}
                          {activeTab === 'chooseSpec' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🎓 اختيار الاختصاص للبرامج الأكاديمية (Choose Specialization)
                              </div>
                              <div style={{ padding: '10px', backgroundColor: '#FFF3EF', border: '1px solid #FEB8AE', fontSize: '11px', lineHeight: '20px' }}>
                                <b>البرنامج الرئيسي الحالي:</b> Bachelor of Law (BL) - الإجازة في الحقوق<br />
                                <b>حالة الاختصاص:</b> تم اعتماد مسار القانون العام / القانون الخاص لمرحلة التخرج.<br />
                                <b>الرغبات الثانوية المسجلة:</b> 1. Economics (BSCE) | 2. Mass Communication (BMC)
                              </div>
                            </div>
                          )}

                          {/* TAB 14: calendar */}
                          {activeTab === 'calendar' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📅 التقويم الجامعي السنوي (SVU Academic Year Calendar 2026/2027)
                              </div>
                              <table cellSpacing={1} cellPadding={6} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>الحدث الأكاديمي</td>
                                    <td>تاريخ البدء</td>
                                    <td>تاريخ الانتهاء</td>
                                    <td>الملاحظات</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ backgroundColor: '#F7F7F7', textAlign: 'center' }}>
                                    <td style={{ textAlign: 'right' }}><b>التسجيل واختيار المقررات (S25)</b></td>
                                    <td>2026-09-01</td>
                                    <td>2026-09-25</td>
                                    <td>مستمر</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#ffffff', textAlign: 'center' }}>
                                    <td style={{ textAlign: 'right' }}><b>بدء المحاضرات والصفوف الافتراضية</b></td>
                                    <td>2026-10-01</td>
                                    <td>2027-01-15</td>
                                    <td>عبر منصة SVU LMS</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F7F7F7', textAlign: 'center' }}>
                                    <td style={{ textAlign: 'right' }}><b>امتحانات الفصل الدراسي النهائي</b></td>
                                    <td>2027-02-01</td>
                                    <td>2027-02-28</td>
                                    <td>المراكز الامتحانية المعتمدة</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer */}
              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0} style={{ marginTop: '20px' }}>
                <tbody>
                  <tr style={{ backgroundColor: '#6f7b79', height: '2px' }}>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="30" align="center" style={{ fontFamily: 'Trebuchet MS, Verdana, Tahoma', fontSize: '11px', color: '#555555' }}>
                      Copyright © 2011-2026, Syrian Virtual University (SVU) All rights reserved.<br />
                      <small style={{ color: '#0066CC', fontSize: '10px' }}>Powered by SVU Information System (SVUIS)</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="3%" style={{ backgroundColor: '#ffffff' }} height="108">&nbsp;</td>
          </tr>
        </tbody>
      </table>
      {/* Photo Preview Modal Popup */}
      {photoModalOpen && (
        <div 
          onClick={() => setPhotoModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              border: '3px solid #005a82',
              borderRadius: '6px',
              padding: '15px',
              maxWidth: '450px',
              width: '90%',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              textAlign: 'center',
              direction: 'rtl'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #005a82', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: '#005a82', fontSize: '13px' }}>
                📷 الصورة الشخصية للطالب - حيدرة القاضي (116823)
              </span>
              <button 
                onClick={() => setPhotoModalOpen(false)}
                style={{
                  backgroundColor: '#cc0000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✖ إغلاق
              </button>
            </div>

            <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #ECE6C4', padding: '10px', borderRadius: '4px', display: 'inline-block' }}>
              <img 
                src={studentPhoto} 
                alt="الصورة الشخصية" 
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '420px', borderRadius: '3px', border: '1px solid #A8CADC' }} 
              />
            </div>

            <div style={{ marginTop: '12px', fontSize: '11px', color: '#555555' }}>
              <b>الاسم:</b> حيدرة يعقوب القاضي | <b>اسم المستخدم:</b> haydaraa_116823<br />
              <b>الرقم الجامعي:</b> 116823 | <b>حالة الصورة:</b> مصدقة ومقبولة رسمياً
            </div>

            <button 
              onClick={() => setPhotoModalOpen(false)}
              style={{
                marginTop: '12px',
                backgroundColor: '#005a82',
                color: '#ffffff',
                border: 'none',
                padding: '5px 20px',
                fontWeight: 'bold',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              موافق / تم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
