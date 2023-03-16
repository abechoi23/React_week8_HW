import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Post from "../components/Post";
import { DataContext } from "../contexts/DataProvider";

export default function PostSingle() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);
  const { getPost } = useContext(DataContext);

  useEffect(() => {
    async function handleLoad() {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (err) {
        setError(true);
      }
    }
    handleLoad();
  }, []);

  return (
    <div>
      {error ? (
        <>
          <h2>404 Not Found</h2>
          <p>Post with Id {id} could not be found</p>
        </>
      ) : (
        <>
          <h1>Car Id: {id} </h1>
          <Post post={post} hideLink={true} />
        </>
      )}
    </div>
  );
}
