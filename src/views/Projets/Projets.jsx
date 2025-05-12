import { Card } from "../../components/Card/Card"

export const Projets = ({data,content}) => {
   
    return(
        <div>
            <h1 className="text-3xl font-bold text-center">Mes Projets</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {data && data.map((repo) => (
                    <Card key={repo.id} repo={repo} content={content} />
                ))}
            </div>
        </div>
    )
}