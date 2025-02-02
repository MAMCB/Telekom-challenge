interface DetailsProps{
    title:string;
    image:string;
    description:string;
}

const Details = ({title,image,description}:DetailsProps) => {
  return (
    <div className="p-5">
      <h1 className="telekom-title">{title}</h1>
      <div className="flex justify-center align-center p-4">
        <img
          src={image}
          alt={title}
          className="rounded-lg w-1/2"
        />
        <p className="self-center m-4 text-xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Details