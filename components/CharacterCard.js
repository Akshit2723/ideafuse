export default function CharacterCard({ name, worldview }) {
  return (
    <div style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
      <h2>{name}</h2>
      <p>{worldview}</p>
    </div>
  );
}
