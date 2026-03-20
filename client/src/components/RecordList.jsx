import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';


const Record = (props) => (
  <tr className="table-row">
    <td className="table-cell table-cell-name">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img 
          src={`https://ui-avatars.com/api/?name=${props.record.name}&background=random&color=fff&rounded=true&size=32`} 
          alt="Avatar"
          style={{ width: '32px', height: '32px' }}
        />
        <span style={{ fontWeight: 600 }}>{props.record.name.charAt(0).toUpperCase() + props.record.name.slice(1)}</span>
      </div>
    </td>
    <td className="table-cell table-cell-position">{props.record.position.charAt(0).toUpperCase() + props.record.position.slice(1)}</td>
    <td className="table-cell table-cell-level">
      <span className={`badge badge-${props.record.level.toLowerCase()}`}>
        {props.record.level}
      </span>
    </td>
    <td className="table-cell table-cell-actions">
      <div className="action-buttons">
        <Link className="btn-base btn-outline" style={{ height: '2rem', padding: '0 0.75rem', color: "#0ea5e9", borderColor: "#bae6fd" }} to={`/profile/${props.record._id}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Profile
        </Link>
        <Link className="btn-base btn-outline" style={{ height: '2rem', padding: '0 0.75rem' }} to={`/edit/${props.record._id}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          Edit
        </Link>
        <button
          className="btn-base btn-outline"
          style={{ height: '2rem', padding: '0 0.75rem', color: "#dc2626", borderColor: "#fecaca" }}
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          Delete
        </button>
      </div>
    </td>
  </tr>
);

Record.propTypes = {
  record: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
  }).isRequired,
  deleteRecord: PropTypes.func.isRequired,
};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    async function getRecords() {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/record/`;
        console.log("Fetching from:", apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const records = await response.json();
        console.log("Records fetched successfully:", records);
        setRecords(records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    }
    getRecords();
  }, [location]); // Refetch when location changes (navigation)

  async function deleteRecord(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function recordList() {
    return filteredRecords.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
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
        {filteredRecords.length > 0 ? (
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
