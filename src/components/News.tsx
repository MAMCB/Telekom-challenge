import { Tabs } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import Cards from "./Cards";

interface News {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const News = () => {
  const [news, setNews] = useState<News[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
      fetch(`../../data.json`)
        .then((response) => response.json())
        .then((data) => setNews(data.news));
    }, []);
    useEffect(()=>{
       const uniqueCategories = Array.from(
         new Set(news.map((newsEntity) => newsEntity.category))
       );
       setCategories(uniqueCategories);
    },[news])
  return (
    <div className="p-5">
      <h1 className="telekom-title">News</h1>
      <h2 className="text-2xl font-bold">What is new in Deutsche Telekom</h2>
      <Tabs aria-label="Tabs with underline" variant="underline">
        {categories &&
          categories.map((category) => (
            <Tabs.Item title={category}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {news
                  .filter((newsEntity) => newsEntity.category === category)
                  .map((newsEntity) => (
                    <Cards
                      key={newsEntity.id}
                      route={`/news/${newsEntity.id}`}
                      img={newsEntity.image}
                      title={newsEntity.title}
                      description={newsEntity.description}
                    />
                  ))}
              </div>
            </Tabs.Item>
          ))}
      </Tabs>
    </div>
  );
};

export default News;
