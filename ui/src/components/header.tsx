function SendButton() {
  return (
  <button>
    Connect
  </button>
  );
}

export default function ChatApp() {
  return (
    <>
      <p style={{ fontStyle: 'italic' }}>Provides communication between blockchains</p>
      <SendButton/>
    </>
  );
}
