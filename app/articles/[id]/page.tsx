"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import "@styles/articleDetails.css";

interface ArticleProps {
  article: {
    id: number;
    title: string;
    content: string;
    publishedAt: string;
  };
}

function Article() {
  const pathname = usePathname();
  const articleId = pathname ? pathname.split("/")[2] : null;
  const [article, setArticle] = useState<ArticleProps["article"] | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (!articleId) return;

    const fetchData = async () => {
      const favoriteArticles = JSON.parse(
        localStorage.getItem("favoriteArticles") || "[]"
      );
      setIsFavorite(favoriteArticles.includes(parseInt(articleId)));

      const response = await fetch(
        `https://jsonplaceholder.org/posts/${articleId}`
      );
      const data = await response.json();
      setArticle(data);
      console.log(data);

      const response_autor = await fetch(
        `https://jsonplaceholder.org/users/${articleId}`
      );

      const data_autor = await response_autor.json();
      setAuthor(`${data_autor.firstname} ${data_autor.lastname}`);
    };

    fetchData();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

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
  };

  return (
    <article className="cardPage">
      <div className="card-info-page">
        <div className="row">
          {" "}
          <h2 className="card-title-page">{article.title}</h2>
          <button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={handleToggleFavorite}
          >
            <FaHeart />
          </button>
        </div>
        <p className="article-author">{author}</p>
        <p className="card-content-page">{article.content}</p>
        <p className="card-date-page">{article.publishedAt}</p>
      </div>
    </article>
  );
}

export default Article;
