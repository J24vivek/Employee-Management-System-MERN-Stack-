import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "Intern",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const id = params.id?.toString() || undefined;
        if (!id) {
          setIsNew(true);
          setForm({ name: "", position: "", level: "Intern" });
          return;
        }
        setIsNew(false);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        const response = await fetch(
          `${baseUrl}/record/${id}`
        );
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const record = await response.json();
        if (!record) {
          console.warn(`Record with id ${id} not found`);
          navigate("/");
          return;
        }
        setForm({
          name: record.name || "",
          position: record.position || "",
          level: record.level || "Intern"
        });
      } catch (error) {
        console.error("Error fetching record:", error);
        navigate("/");
      }
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
      let response;
      if (isNew) {
        response = await fetch(`${baseUrl}/record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`${baseUrl}/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
      alert("Failed to save record. Please check your connection and try again.");
    }
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="section-header">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M12 11l2 2 4-4"/></svg>
          {isNew ? "Add New Employee" : "Update Employee Details"}
        </h3>
      </div>

      <div className="form-layout">
        <form onSubmit={onSubmit} className="form-card">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-input"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position" className="form-label">Job Position</label>
            <input
              type="text"
              name="position"
              id="position"
              className="form-input"
              placeholder="e.g. Senior Developer"
              value={form.position}
              onChange={(e) => updateForm({ position: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Experience Level</label>
            <div className="radio-group">
              {[
                { label: 'Intern', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20"/><path d="m4.93 4.93 14.14 14.14M4.93 19.07 19.07 4.93"/></svg> },
                { label: 'Junior', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { label: 'Senior', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 15l-2 5 2 2 2-2-2-5z"/><path d="M12 15V3"/><path d="m12 15 4 1 1-4-5-2-5 2 1 4 4-1z"/></svg> }
              ].map((lvl) => (
                <label key={lvl.label} className={`radio-card ${form.level === lvl.label ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="level"
                    value={lvl.label}
                    checked={form.level === lvl.label}
                    onChange={(e) => updateForm({ level: e.target.value })}
                  />
                  <div style={{ color: form.level === lvl.label ? '#0f172a' : '#64748b', transition: 'all 0.3s' }}>
                    {lvl.icon}
                  </div>
                  <span className="radio-label-text">{lvl.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn-base btn-primary" style={{ flex: 1, height: '3rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              {isNew ? "Create Employee" : "Save Changes"}
            </button>
            <button 
              type="button" 
              className="btn-base btn-outline" 
              style={{ flex: 1, height: '3rem' }}
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="form-image-container">
          <img 
            className="form-illustration" 
            src="data:image/jpeg;base64,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" 
            alt="Management Illustration" 
          />
          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '0.75rem', borderLeft: '4px solid #0f172a', borderRight: '4px solid #0f172a' }}>
            <h4 style={{ marginBottom: '0.25rem', color: '#0f172a', fontSize: '0.95rem' }}>Quick Tip</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>
              Make sure to double-check the employee&apos;s position and level before saving. Accurate records help everyone stay on the same page!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
