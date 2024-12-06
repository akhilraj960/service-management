import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrapper } from "@/components/wrapper";

export default function ServiceView() {
  return (
    <Wrapper>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Service View</CardTitle>
        </CardHeader>
      </Card>
    </Wrapper>
  );
}
