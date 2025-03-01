export default function Produtos({
  handleCloseSidebar,
}: {
  handleCloseSidebar: any;
}) {
  return (
    <div onClick={handleCloseSidebar}>
      <h1>Produtos</h1>
    </div>
  );
}
