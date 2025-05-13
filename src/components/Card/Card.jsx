import './Card.css';
import useSWR from 'swr';
import img from '../../assets/img.jpeg'
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
export const Card = ({ repo }) => {
  if (!repo) return null;
  const[click,setClick] = useState(false)
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
    console.log(repo.id);
  return (
    <div className={`card ${error ? 'error' : ''} text-white rounded rounded-md`} id={repo.id}  style={{
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

    <button className="card-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setClick(true)} >
        Details
        </button>
        {click && (
           <Modal repo={repo}  contents={contents} id={parseInt(repo.id)} onClose={()=>setClick(false)}  /> 
        )}


     
     
    </div>
  );
};