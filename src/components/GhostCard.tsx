const GhostCard = (props: { h: string }) => {
  return (
    <div
      className={"ml-2 rounded shadow-lg w-md rounded-t bg-indigo-700 opacity-60"}
      style={{ height: "min-content" }}
    >
      <div className="mt-2 p-3 rounded">
        <div className="bg-gray-400 animate-pulse" style={{ height: props.h + "rem" }} />
      </div>
      <div className="h-20 p-2 m-2 rounded bg-gray-400 animate-pulse" />
    </div>
  );
};

export default GhostCard;
