import "./main.css";

const PostItem = ({ post }) => {
  return (
    <div className="post-block">
      <div className="post-owner">
        <h3 className="post-owner__name">{post.user_firstName}</h3>
        {/* <h5 className="post-owner__user-name">{post.user_username}</h5> */}
      </div>

      <div className="post-item">
        <div className="post-header">{post.post_postHeader}</div>
        <div className="post-description">{post.post_postDescr}</div>
        <div className="post-imageUrl">
          <img src={post.post_postImageUrl} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
