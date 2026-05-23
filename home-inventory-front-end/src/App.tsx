import { useEffect, useState } from 'react';

function App() {
  // State to store the message from FastAPI
  const [backendMessage, setBackendMessage] = useState('Connecting to server...');
  // State to capture and display any loading errors
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // Relative URL works for both local Vite proxy and FastAPI static hosting
    fetch('/api')
      .then((response) => {
        // Always check if the HTTP status code is successful (200-299)
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Access the "message" key from {"message": "Hello World"}
        setBackendMessage(data.message);
      })
      .catch((error) => {
        console.error('API Fetch Failed:', error);
        setFetchError('Could not reach the backend server.');
      });
  }, []); // Empty dependency array ensures this runs exactly once when the page loads

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🏡 Home Inventory Tool</h1>
      </header>
      
      <main style={styles.card}>
        <h3>Backend Connection Status:</h3>
        {fetchError ? (
          <p style={styles.errorText}>{fetchError}</p>
        ) : (
          <p style={styles.successText}>
            Received: <strong>{backendMessage}</strong>
          </p>
        )}
      </main>
    </div>
  );
}

// Simple inline styles to make it presentable
const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    maxWidth: '600px',
    margin: '4rem auto',
    padding: '0 1rem',
    textAlign: 'center',
  },
  header: {
    marginBottom: '2rem',
    color: '#333',
  },
  card: {
    background: '#f9f9f9',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
  },
  successText: {
    color: '#2e7d32',
    fontSize: '1.2rem',
  },
  errorText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
};

export default App;
