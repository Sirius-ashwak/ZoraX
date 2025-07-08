function App() {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 CredVault Debug</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>React is working! The app is loading correctly.</p>
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '1rem', 
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <p>✅ React components loading</p>
          <p>✅ CSS styles working</p>
          <p>✅ No white screen!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
