import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';



const capitalize = (str) => {
  if (typeof str !== 'string' || !str) return "";
  return str.split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const RecordComponent = ({ record, deleteRecord }) => {
  if (!record) return null;

  const name = capitalize(record.name || "Unknown");
  const position = capitalize(record.position || "No Position");
  const level = record.level || "Intern";
  const id = record._id;

  return (
    <tr className="table-row">
      <td className="table-cell table-cell-name">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&rounded=true&size=32`} 
            alt="Avatar"
            style={{ width: '32px', height: '32px' }}
          />
          <span style={{ fontWeight: 600 }}>{name}</span>
        </div>
      </td>
      <td className="table-cell table-cell-position">{position}</td>
      <td className="table-cell table-cell-level">
        <span className={`badge badge-${level.toLowerCase()}`}>
          {level}
        </span>
      </td>
      <td className="table-cell table-cell-actions">
        <div className="action-buttons">
          <Link className="btn-base btn-outline" style={{ height: '2rem', padding: '0 0.75rem', color: "#0ea5e9", borderColor: "#bae6fd" }} to={`/profile/${id}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Profile
          </Link>
          <Link className="btn-base btn-outline" style={{ height: '2rem', padding: '0 0.75rem' }} to={`/edit/${id}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            Edit
          </Link>
          <button
            className="btn-base btn-outline"
            style={{ height: '2rem', padding: '0 0.75rem', color: "#dc2626", borderColor: "#fecaca" }}
            type="button"
            onClick={() => deleteRecord(id)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

RecordComponent.propTypes = {
  record: PropTypes.object.isRequired,
  deleteRecord: PropTypes.func.isRequired,
};

const Record = React.memo(RecordComponent);

Record.displayName = 'Record';

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    async function getRecords() {
      setIsLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        const response = await fetch(`${baseUrl}/record/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch records: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (isMounted) {
          setRecords(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching records:", err);
          setError(err.message);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    getRecords();
    return () => { isMounted = false; };
  }, [location]);

  const deleteRecord = useCallback(async (id) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
      const response = await fetch(`${baseUrl}/record/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete record");
      setRecords((prevRecords) => prevRecords.filter((el) => el._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record. Please try again.");
    }
  }, []);

  const filteredRecords = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return records;
    
    return records.filter((record) =>
      (record.name || "").toLowerCase().includes(query) ||
      (record.position || "").toLowerCase().includes(query) ||
      (record.level || "").toLowerCase().includes(query)
    );
  }, [records, searchQuery]);

  function recordList() {
    return filteredRecords.map((record, index) => {
      return (
        <Record
          record={record}
          deleteRecord={deleteRecord}
          key={record._id || `record-${index}`}
        />
      );
    });
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Employee Records 
          </h3>
          <div className="search-container">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search by name, position or level..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{filteredRecords.length} found</span>
      </div>

      <div className="table-container">
        {isLoading ? (
          <div className="empty-state">
            <div className="loader"></div>
            <p className="empty-state-text">Loading employee records...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="empty-state-text" style={{ color: '#dc2626' }}>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-base btn-outline">Retry</button>
          </div>
        ) : filteredRecords.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="table-header-cell table-cell-name">Employee</th>
                <th className="table-header-cell table-cell-position">Position</th>
                <th className="table-header-cell table-cell-level">Level</th>
                <th className="table-header-cell table-cell-actions" style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        ) : (
          <div className="empty-state">
            <img 
              className="empty-state-img" 
              src="https://cdni.iconscout.com/illustration/premium/thumb/searching-no-result-illustration-download-in-svg-png-gif-formats--empty-state-search-not-found-nothing-pack-network-communication-illustrations-4719601.png" 
              alt="No records found" 
            />
            <p className="empty-state-text">No employees found. Start by adding a new record!</p>
            <Link to="/create" className="btn-base btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Add First Employee
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
