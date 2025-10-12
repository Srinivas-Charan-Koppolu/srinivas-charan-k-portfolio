import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import storiesData from "./story.js";
import "./Stories.css";

const Stories = () => {
  const { id } = useParams();
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState(null);

  // Disable right-click and blur on tab change effects
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Blur content when tab hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.filter = "blur(10px)";
      } else {
        document.body.style.filter = "none";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.body.style.filter = "none";
    };
  }, []);

  const isStoryVisible = (story) => {
    if (!story) return false;
    const now = new Date();

    switch (story.visibility) {
      case "visible":
        return true;
      case "hidden":
        return false;
      case "unlisted":
        return !!id;
      case "changable":
        if (!story.makeVisibleAfter) return false;
        return now >= new Date(story.makeVisibleAfter);
      default:
        return false;
    }
  };

  useEffect(() => {
    setStories(storiesData);

    if (id) {
      const currentStory = storiesData.find((story) => story.id === id);
      setStory(currentStory);
    }
  }, [id]);

  const visibleStories = stories.filter((s) => isStoryVisible(s));

  return (
    <div className="stories-container">
      {/* Watermark overlay */}
      {/* <div className="watermark watermark-1">SrinivasCharanK</div>
      <div className="watermark watermark-2">SrinivasCharanK</div>
      <div className="watermark watermark-3">SrinivasCharanK</div> */}

      {!id ? (
        <>
          <h1 className="stories-heading">Stories</h1>

          <div className="stories-grid">
            {visibleStories.map((story) => (
              <Link
                key={story.id}
                to={`/stories/${story.id}`}
                className="stories-container__story-card"
                tabIndex={0}
              >
                <h2 className="stories-container__story-title">{story.title} <p className="stories-container__story-author"> · By {story.author}</p></h2>
                <p className="stories-container__story-snippet">
                  {story.content.trim().slice(0, 51)}
                  {story.content.trim().length > 51 ? "…" : ""}
                </p>
              </Link>
            ))}

            {visibleStories.length === 0 && (
              <p className="no-stories-text">No stories are available right now.</p>
            )}
          </div>
        </>
      ) : story ? (
        isStoryVisible(story) ? (
          <div className="story-detail">
            <div className="story-detail-header">
              <Link to="/stories" className="back-link-top" aria-label="Back to stories">
                &lt;
              </Link>
              <h1 className="story-detail__title">{story.title}</h1>
              <p className="story-detail__author"> · By {story.author}</p>
            </div>
            <hr className="story-detail__divider" />
            <p className="story-detail__content">{story.content}</p>
            {story.moral && (
              <>
                <hr className="story-detail__divider" />
                <p className="story-detail__moral">{story.moral}</p>
              </>
            )}
            <Link to="/stories" className="back-link">
              ← Back to all stories
            </Link>
          </div>
        ) : story.visibility === "changable~" ? (
          <div className="story-detail">
            <h1>{story.title}</h1>
            <p className="story-locked">
              This story will be available after{" "}
              {new Date(story.makeVisibleAfter).toLocaleString()}.
            </p>
            <Link to="/stories" className="back-link">
              ← Back to all stories
            </Link>
          </div>
        ) : (
          <div className="story-detail">
            <h1>Story not available</h1>
            <p className="story-locked">
              This story is currently hidden or restricted or not found.
            </p>
            <Link to="/stories" className="back-link">
              ← Back to all stories
            </Link>
          </div>
        )
      ) : (
        <div className="story-detail">
          <h1>Story not found</h1>
          <Link to="/stories" className="back-link">
            ← Back to all stories
          </Link>
        </div>
      )}
    </div>
  );
};

export default Stories;
