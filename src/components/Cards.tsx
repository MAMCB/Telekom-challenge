import { Link } from "react-router-dom";

interface CardProps {
    route: string;
    img: string;
    title: string;
    description: string;
    miniature?: boolean;
    }

const Cards = ({route,img,title,description,miniature=false}:CardProps) => {
  return (
    <Link to={route}>
      {!miniature ? (
        <div
          className="background-image p-6 flex justify-end"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="p-2 lg:p-5 cardText lg:mr-52">
            <h1 className="telekom-title">{title}</h1>
            <p className="hidden md:block">{description}</p>
          </div>
        </div>
      ) : (
        <div className="background-image p-6" style={{ backgroundImage: `url(${img})` }}>
          <h1 className="telekom-title cardText p-2 ">{title}</h1>
        </div>
      )}
    </Link>
  );
}

export default Cards