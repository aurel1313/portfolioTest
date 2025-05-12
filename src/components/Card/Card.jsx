import './Card.css';
import useSWR from 'swr';
import img from '../../assets/img.jpeg'
export const Card = ({ repo }) => {
  if (!repo) return null;

  const token = import.meta.env.VITE_TOKEN_GITHUB;
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res) => {
      if (!res.ok) return []; // repo vide ou 404
      return res.json();
    });

  const { data: contents, error } = useSWR(
    `https://api.github.com/repos/aurel1313/${repo.name}/contents`,
    fetcher
  );
  const previewImage = Array.isArray(contents)
  ? contents.find(file =>
      file.name.endsWith('.png') || file.name.endsWith('.jpg')
    )
  : null;
    const imageUrl = previewImage ? previewImage.download_url : img;
    console.log(imageUrl);
  return (
    <div className={`card ${error ? 'error' : ''}  text-white rounded rounded-md`}  style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} >
    
   
        <h2 className="card-title">{repo.name}</h2>
        <p className="card-description">{repo.description}</p>
        <p className="card-language">Language: {repo.language}</p>
        <p className="card-date">
          Date created: {new Date(repo.created_at).toLocaleDateString()}
        </p>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          View on GitHub
        </a>

        {/* ✅ Affiche tous les fichiers du repo */}
        {/*Array.isArray(contents) && contents.length > 0 && (
          <div className="card-files">
            <h3>Fichiers :</h3>
            <ul>
              {contents.map((file) => (
                <li key={file.path}>
                  {file.type === 'file' ? '📄' : '📁'} {file.name}
                </li>
              ))}
            </ul>
          </div>
        )*/}
     
    </div>
  );
};