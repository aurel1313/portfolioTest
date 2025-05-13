import useSWR from "swr";
export const Modal = ({ onClose, repo, id }) => {
  const token = import.meta.env.VITE_TOKEN_GITHUB;
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res) => res.json());

  const idRepo = id;
  //get repo by id//
  const { data: depot, error } = useSWR(
    `https://api.github.com/repos/aurel1313/${repo.name}/contents`,
    fetcher
  );
 const detailsFile = ()=>{
    const file = depot.find((file) => file.name === repo.name);
    

 }
  return (
    { idRepo } && (
      <div
        className="modal-overlay text-black "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <button className="close-button bg-red-500" onClick={onClose}>
          X
        </button>

        <div
          className="modal-content"
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "80%",
            maxWidth: "600px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ✅ Affiche tous les fichiers du repo */}
          {Array.isArray(depot) && depot.length > 0 && (
            <div className="card-files">
              <h3>Fichiers :</h3>
              <ul>
                {depot.map((file) => (
                  <li key={file.path}>
                    {file.type === "file" ? "📄" : "📁"} {file.name}
                    {file.type === "file" && (
                      <button
                        className="details-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={detailsFile}
                      >
                        Details
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  );
};
