import { Container } from "@/components/shared";

export default function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <>
    <Container className="mt-10">
      <p>Product {id}</p>
    </Container>
  </>;
}
