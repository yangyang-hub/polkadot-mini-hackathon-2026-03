import { Button } from "@/components/ui/button";
import { useConnection, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Connection() {
  const { address } = useConnection();
  const disconnect = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <p>
          {ensName
            ? `${ensName} (${address.slice(0, 5)}***${address.slice(-3)})`
            : `${address.slice(0, 5)}***${address.slice(-3)}`}
        </p>
      )}
      <Button onClick={() => disconnect.mutate()}>Disconnect</Button>
    </div>
  );
}
