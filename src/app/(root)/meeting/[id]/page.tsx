export default function Page({ params }: { params: { id: string } }) {
  return <div>Meeting Room: #{params.id}</div>;
}
