"use client";

import React, { useEffect, useState } from "react";
import ArticleComponent from "@components/article";
import FavoriteCounter from "@components/favoriteCounter";
import styled from "styled-components";

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  favorite?: boolean;
  userId: number;
}

interface ArticlesPageProps {
  articles?: Article[];
}

const CardsWrapper = styled.div`
  .wrapper {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3rem;
    padding: 4rem;
    margin: 0 auto;
    width: 100%;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .navbar {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: flex-start;
    align-content: flex-start;
    overflow: auto;
    flex-direction: row;
    margin-top: 20px;
  }
  .title {
    text-transform: capitalize;
    color: #000;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 1;
    font-size: 30px;
  }
`;

const ArticlesPage: React.FC<ArticlesPageProps> = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const [favoriteArticles, setFavoriteArticles] = useState<number[]>([]);
  const [favoriteCounter, setFavoriteCounter] = useState<number>(0);

  useEffect(() => {
    const favoriteArticlesJson = localStorage.getItem("favoriteArticles");

    if (favoriteArticlesJson) {
      setFavoriteArticles(JSON.parse(favoriteArticlesJson));
    }

    setFavoriteCounter(favoriteArticles.length);
  }, [favoriteCounter]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://jsonplaceholder.org/posts");
      const data = await response.json();
      setArticles(data);
    }

    fetchData();
  }, []);

  return (
    <CardsWrapper>
      <div className="navbar">
        <h1 className="title">Articles</h1>
        <FavoriteCounter count={favoriteArticles.length} />
      </div>
      <div className="wrapper">
        {" "}
        {articles &&
          articles.map((article) => (

        <ArticleComponent
              key={article.id}
              article={article}
              onToggleFavorite={() => {
                setFavoriteCounter(favoriteCounter + 1);
              }}
            />

          ))}
      </div>
    </CardsWrapper>
  );
};

export default ArticlesPage;
