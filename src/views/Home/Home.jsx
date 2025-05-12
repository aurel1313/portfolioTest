import { Nav } from "../../components/Nav/Nav";
import useSWR from 'swr';
import { Projets } from "../Projets/Projets";

import { useEffect } from "react";
export const Home = () => {
 //get token from .env
const token = import.meta.env.VITE_TOKEN_GITHUB;
const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res) => res.json());
  
  const { data, error } = useSWR(`https://api.github.com/users/aurel1313/repos`, fetcher);
  //const {data : contentRepo, error: errorContent} = useSWR(`https://api.github.com/repos/aurel1313/${data?.name}/contents`, fetcher);
 // recuperer contenu de chaque repo avec useSWR
   

  if (error) return <div>Erreur : {error.message}</div>;
  return (
    <div>
      <Nav />
      <div
        className="min-h-screen fleclassName items-center justify-center text-white"
        data-aos="fade-down"
      >
        <h1 className="text-center inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 font-bold text-4xl md:text-6xl lg:text-8xl mt-10 mb-5">
          Mon portfolio
        </h1>
      </div>
      <div className="container mx-auto px-4 py-8" id="about" data-aos="fade-down">
        <h2 className="text-3xl font-bold mb-4">À propos de moi</h2>

        <p
          className=" font-sans font-medium"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          Aurélien Fabre, 26ans Je suis un développeur passionné par la création
          d'applications web et mobiles. J'aime apprendre de nouvelles
          technologies et relever des défis.
        </p>
      </div>
      <div
        id="projects"
        className="container mx-auto px-4 py-8"
        data-aos="fade-down"
      >
        <h2 className="text-3xl font-bold mb-4">Mes Projets</h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          id="cards"
        ></div>
      </div>
      <Projets data={data} error={error} content={contentRepo} />
    </div>
  );
};
