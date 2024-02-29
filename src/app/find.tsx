import { unstable_noStore as noStore } from "next/cache";
async function CrudShowcase() {
  noStore();
  const hello = await api.claim.hello.query({ text: "from tRPC" });
  const latestClaim = await api.claim.getLatest.query();
  return (
    <div className="w-full max-w-xs">
      {latestClaim ? (
        <p className="truncate">
          {JSON.stringify(latestClaim.tokenFiatNftBalance).toString()}
        </p>
      ) : (
        <p>You have no claims yet.</p>
      )}

      {/* <CreatePost /> */}
    </div>
  );
}
