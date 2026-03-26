import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const dashboardStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f4f2',
    fontFamily: "'Inter', sans-serif",
    color: '#2d3748',
  };

  const sidebarStyle = {
    width: '380px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    padding: '40px 30px',
    position: 'sticky',
    top: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 10px rgba(0,0,0,0.02)'
  };

  const mainContentStyle = {
    flex: 1,
    padding: '40px 60px',
    overflowY: 'auto',
  };

  return (
    <div style={dashboardStyle}>
      <aside style={sidebarStyle}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#10b981', margin: 0 }}>
            MintNotes
          </h1>
          <p style={{ fontSize: '14px', color: '#718096', marginTop: '4px' }}>
            Organize your thoughts cleanly.
          </p>
        </div>

        <NoteForm fetchNotes={fetchNotes} />
      </aside>

      <main style={mainContentStyle}>
        <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between' }}>
          <h2>Your Notes</h2>
          <div>{notes.length} Active Notes</div>
        </header>

        <NoteList notes={notes} fetchNotes={fetchNotes} />
      </main>
    </div>
  );
}

export default App;