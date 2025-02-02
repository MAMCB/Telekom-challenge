import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Details from "./Details";

interface News {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const NewsDetails = () => {

  const { id } = useParams<{ id: string }>();
      const [newsEntity, setNewsEntity] = useState<News|null>(null)
      useEffect(() => {
          fetch(`../../data.json`)
          .then((response) => response.json())
          .then((data) => setNewsEntity(data.news.find((newsEntity:News) => newsEntity.id === parseInt(id? id : ""))))
      }, [id])
  return (
    <>
      {newsEntity && (
        <Details title={newsEntity.title} description={newsEntity.description} image={newsEntity.image} />
      )}
    </>
  );
};

export default NewsDetails;
