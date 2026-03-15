import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const [record, setRecord] = useState(null);
  const [stats, setStats] = useState({
    workingDays: 0,
    performance: 0,
    projects: 0,
    leaveBalance: 0
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecord() {
      const response = await fetch(`http://localhost:5050/record/${params.id}`);
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        navigate("/");
        return;
      }
      const data = await response.json();
      setRecord(data);
      
      // Generate random but realistic data for the profile
      setStats({
        workingDays: Math.floor(Math.random() * (310 - 200) + 200), // Random days between 200-310
        performance: Math.floor(Math.random() * (98 - 85) + 85), // Random % between 85-98
        projects: Math.floor(Math.random() * (12 - 3) + 3),
        leaveBalance: Math.floor(Math.random() * (24 - 5) + 5)
      });
    }
    fetchRecord();
  }, [params.id, navigate]);

  if (!record) return <div className="container">Loading profile...</div>;

  const attendancePercentage = ((stats.workingDays / 365) * 100).toFixed(1);

  return (
    <div className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="section-header">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Employee Profile
        </h3>
        <Link to="/" className="btn-base btn-outline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="profile-layout">
        {/* Left Column: Avatar and Basic Info */}
        <div className="profile-card profile-main">
          <div className="profile-avatar-container">
            <img 
              src={`https://ui-avatars.com/api/?name=${record.name}&background=random&color=fff&rounded=true&size=200`} 
              alt={record.name}
              className="profile-avatar-large"
            />
          </div>
          <h2 className="profile-name-large">{record.name}</h2>
          <p className="profile-position-badge">{record.position}</p>
          
          <div className="profile-meta">
            <div className="meta-item">
              <span className="meta-label">Experience</span>
              <span className={`badge badge-${record.level.toLowerCase()}`}>{record.level} Level</span>
            </div>
          </div>

          <div className="profile-actions-row">
            <Link to={`/edit/${record._id}`} className="btn-base btn-primary" style={{ flex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Right Column: Stats and Attendance */}
        <div className="profile-details-grid">
          {/* Working Days Card */}
          <div className="profile-card stats-card highlight">
            <div className="stats-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <div className="stats-content">
              <span className="stats-label">Annual Attendance</span>
              <div className="stats-value-row">
                <span className="stats-number">{stats.workingDays}</span>
                <span className="stats-total">/ 365 Days</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${attendancePercentage}%` }}></div>
              </div>
              <span className="stats-percentage">Consistent Attendance Performance</span>
            </div>
          </div>

          {/* Projects Card */}
          <div className="profile-card stats-card">
            <div className="stats-icon-wrapper accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="stats-content">
              <span className="stats-label">Active Projects</span>
              <span className="stats-number">{stats.projects}</span>
              <p className="stats-desc">Currently assigned cross-functional initiatives.</p>
            </div>
          </div>

          {/* Leave Card */}
          <div className="profile-card stats-card">
            <div className="stats-icon-wrapper info">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
            <div className="stats-content">
              <span className="stats-label">Available Leaves</span>
              <span className="stats-number">{stats.leaveBalance}</span>
              <p className="stats-desc">Remaining paid time off for the current fiscal year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
