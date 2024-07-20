function SendButton() {
  return <button>Connect</button>;
}

export default function ChatApp() {
  return (
    <>
      <h1>Polka Chatt</h1>
      <p style={{ fontStyle: "italic" }}>
        Provides communication between blockchains
      </p>
      <SendButton />
    </>
  );
}
