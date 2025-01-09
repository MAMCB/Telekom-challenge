interface CardProps {
    id: number;
    img: string;
    title: string;
    description: string;
    }

const Cards = ({id,img,title,description}:CardProps) => {
  return (
    <a href={`/project/${id}`}>	
      <div>
        <img src={img} alt={title} />
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </a>
  );
}

export default Cards