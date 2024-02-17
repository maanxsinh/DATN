import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { MdHomeFilled } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import CreatePost from "../../components/EditUser/CreatePost";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSend } from "react-icons/io";
import {
  getCommentThunk,
  getPostThunk,
  sendCommentThunk,
  setContent,
  setOwnerCommentId,
  setPostId,
  setTimeComment,
} from "../../Reducer/buyerSlice";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/commonUtils";

const Post = () => {
  const [postSort, setPostSort] = useState("all");
  const [showCmt, setShowCmt] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getPostSlice.post);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const commentInf = useSelector((state) => state.sendCommentSlice.comment);
  const commentData = useSelector((state) => state.getCommentSlice.commentData);

  useEffect(() => {
    if (!currentUser?.data?.id) {
      navigate("/login");
    }
    dispatch(getPostThunk());
  }, []);

  const handelSortMyPost = () => {
    if (!currentUser) {
      navigate("/login");
    }
    dispatch(getPostThunk(currentUser?.data?.id));
    setPostSort("my-post");
  };
  const handelSortAllPost = () => {
    dispatch(getPostThunk());
    setPostSort("all");
  };
  const handleChangeComment = (e) => {
    dispatch(setContent(e.target.value));
  };
  const handleSendComment = (postId) => {
    const date = new Date();
    dispatch(setTimeComment(date));
    if (!commentInf.content || commentInf.content === "") {
    } else {
      dispatch(sendCommentThunk(commentInf));
      dispatch(setContent(""));
      dispatch(getCommentThunk(postId));
      if (showCmt === false) {
        setShowCmt(true);
      }
    }
  };

  const handleGetComment = (postId) => {
    if (showCmt === false) {
      setShowCmt(true);
      dispatch(getCommentThunk(postId));
    } else {
      setShowCmt(false);
    }
  };

  const handleTest = () => {
    console.log(">>>comment:", commentData);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box
            sx={{
              borderRight: "1px solid #cccccc",
              height: "100%",
              // display: "flex",
              // justifyContent: "center",
            }}>
            <Item
              sx={postSort === "all" && { backgroundColor: "rgba(0,0,0,0.2)" }}
              onClick={() => handelSortAllPost()}>
              <MdHomeFilled style={{ fontSize: "230%", marginRight: "10px" }} />
              Home
            </Item>
            <Item
              onClick={() => handelSortMyPost()}
              sx={
                postSort === "my-post" && { backgroundColor: "rgba(0,0,0,0.2)" }
              }>
              <MdAccountCircle
                style={{ fontSize: "230%", marginRight: "10px" }}
              />
              My Post
            </Item>

            {/* <Item>
              <IoIosCreate style={{ fontSize: "210%", marginRight: "10px" }} />
              Post
            </Item> */}
            <CreatePost />
            <Item>
              <IoIosSearch style={{ fontSize: "230%", marginRight: "10px" }} />
              Search
            </Item>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {data && data.length > 0 ? (
            data.map((item) => {
              return (
                <Box key={item.id}>
                  <ItemPost>
                    <Box sx={{ display: "flex" }}>
                      <img
                        alt="avatar"
                        src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                        style={{ width: "48px", height: "48px" }}
                      />
                      <Box>
                        <Typo16>{item.User.fullName}</Typo16>
                        <Typo12>{formatDate(item.timePost)}</Typo12>
                      </Box>
                    </Box>
                    <Typo14>{item.content}</Typo14>
                    <Box>
                      <FaRegHeart style={{ fontSize: "25px" }} />
                      <AiOutlineMessage
                        style={{ fontSize: "25px", marginLeft: "10px" }}
                      />
                    </Box>
                    <Box
                      sx={{ display: "flex", cursor: "pointer" }}
                      onClick={() => handleGetComment(item.id)}>
                      <Typo12>Show comment</Typo12>
                      <FaChevronDown
                        style={{ margin: "3px 0 0 2px", fontSize: "12px" }}
                      />
                    </Box>
                    {commentData &&
                      commentData.length > 0 &&
                      commentData.map((itemCmt) => {
                        if (itemCmt.postId === item.id) {
                          return (
                            <Box
                              sx={
                                !showCmt
                                  ? { display: "none" }
                                  : { display: "flex" }
                              }>
                              <Typo14
                                sx={{ fontWeight: 500, marginRight: "10px" }}>
                                {itemCmt.User.fullName}
                              </Typo14>
                              <Typo14>{itemCmt.content}</Typo14>
                            </Box>
                          );
                        }
                      })}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IoIosSend
                        style={{ fontSize: "175%" }}
                        onClick={() => handleSendComment(item.id)}
                      />
                      <Input
                      name
                        placeholder="Add a comment..."
                        onChange={(e) => handleChangeComment(e)}
                        onFocus={() => {
                          dispatch(setPostId(item.id));
                          dispatch(setOwnerCommentId(currentUser?.data?.id));
                        }}
                      />
                    </Box>
                  </ItemPost>
                  {/* <button onClick={() => handleTest()}>test</button> */}
                </Box>
              );
            })
          ) : (
            <Box>No Post</Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Post;

const Item = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
  margin: "10px 10px",
  padding: "10px",
  height: "48px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
}));

const ItemPost = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
  margin: "10px 10px",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
}));
const Input = styled("input")(({ theme }) => ({
  fontSize: "14px",
  color: "black",
  // border: "none",
  backgroundColor: "white",
  width: "590px",
  padding: "8px 8px",
  outline: "none",
  "&:active": {
    border: "none",
  },
}));

const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
  fontWeight: 500,
}));

const Typo14 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "black",
}));
const Typo12 = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "black",
}));
