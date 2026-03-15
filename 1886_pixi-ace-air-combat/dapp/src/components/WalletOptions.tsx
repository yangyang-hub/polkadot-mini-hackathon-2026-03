import { useConnect, useConnectors } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";

export function WalletOptions() {
  const connect = useConnect();
  const connectors = useConnectors();

  return connectors.map((connector) => (
    <Button
      key={connector.uid}
      onClick={() => connect.mutate({ connector: injected() })}
    >
      {connector.name}
    </Button>
  ));
}
