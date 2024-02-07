import React, { useState, useEffect } from "react";
import "@styles/article.css";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  favorite?: boolean;
  userId: number;
}

interface ArticleProps {
  article: Article;
  onToggleFavorite: () => void;
}

const ArticleComponent: React.FC<ArticleProps> = ({
  article,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const favoriteArticles = JSON.parse(
      localStorage.getItem("favoriteArticles") || "[]"
    );
    setIsFavorite(favoriteArticles.includes(article.id));

    async function fetchData() {
      const response = await fetch(
        `https://jsonplaceholder.org/users/${article.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setAuthor(`${data.firstname} ${data.lastname}`);
    }

    fetchData().catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  const handleToggleFavorite = () => {
    const favoriteArticles = JSON.parse(
      localStorage.getItem("favoriteArticles") || "[]"
    );
    const newFavoriteArticles = favoriteArticles.includes(article.id)
      ? favoriteArticles.filter((id: number) => id !== article.id)
      : [...favoriteArticles, article.id];
    localStorage.setItem(
      "favoriteArticles",
      JSON.stringify(newFavoriteArticles)
    );
    if (favoriteArticles.includes(article.id)) {
      const newFavoriteArticles = favoriteArticles.filter(
        (id: number) => id !== article.id
      );
      localStorage.setItem(
        "favoriteArticles",
        JSON.stringify(newFavoriteArticles)
      );
    }
    setIsFavorite(!isFavorite);
    onToggleFavorite();
  };


  return (
    <article className="card">
      <div className="card-info">
        <div className="row">
          {" "}
          <Link href={`/articles/${article.id}`}>
            <h2 className="card-title">{article.title}</h2>
          </Link>
          <button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={handleToggleFavorite}
          >
            <FaHeart />
          </button>
        </div>
        <p className="article-author">{author}</p>
        <p className="card-content">{article.content}</p>
        <div className="card-meta"></div>
      </div>
    </article>
  );
};

export default ArticleComponent;
