const App: React.FC = () => {
  const sendMessage = () => {
    parent.postMessage(
      { pluginMessage: { type: "greet", content: "Hello Figma!" } },
      "*",
    );
  };

  return (
    <div>
      <h1>Figma Plugin</h1>
      <button type="button" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default App;
