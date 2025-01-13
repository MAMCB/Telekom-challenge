interface CardProps {
    route: string;
    img: string;
    title: string;
    description: string;
    }

const Cards = ({route,img,title,description}:CardProps) => {
  return (
    <a href={route}>
     
      <div className="background-image p-6 flex justify-end" style={{ backgroundImage: `url(${img})` }}>
        <div className="cardText mr-52  p-5">
          <h1 className="telekom-title">{title}</h1>
          <p >{description}</p>
        </div>

      </div>
    </a>
  );
}

export default Cards