import { Box, Typography, styled } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { BiMessageDetail } from "react-icons/bi";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../Reducer/messageSlice";

const Message = () => {
  const dispatch = useDispatch();
  const showMess = useSelector((state) => state.messageSlice.showMessage);
  const [showConversation, setShow] = useState(false);
  const [showMess123, setShow123] = useState(false);

  useEffect(() => {}, []);

  const handleShowMessage = async () => {
    await dispatch(showMessage());
    setShow123(true);
    console.log(">>>showMess", showMess);
  };
  return (
    <Box sx={{ position: "fixed", bottom: 0, right: 20 }}>
      {!showConversation ? (
        <Badge badgeContent={4} color="error">
          <BiMessageDetail
            style={{ fontSize: "50px" }}
            onClick={() => {
              setShow(true);
            }}
          />
        </Badge>
      ) : !showMess ? (
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              Chats
            </Typography>
            <AiOutlineClose
              style={{
                fontSize: "180%",
                cursor: "pointer",
                color: "rgba(0,0,0,0.5)",
              }}
              onClick={() => {
                setShow(false);
              }}
            />
          </Box>

          <BoxElement
            onClick={() => {
              handleShowMessage();
            }}>
            <img
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/337265738_1223053261930875_507114862488518461_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sNne8Q0iKXkAX8pqF-t&_nc_ht=scontent.fhan19-1.fna&oh=00_AfAKyq7BSREd7VRHMuXeSlRbxzrQe3B6VNPWdabVF0ACvw&oe=6545758A"
              style={{ width: "55px", height: "55px", borderRadius: "50px" }}
            />
            <Box sx={{ margin: "0 0 0 10px" }}>
              <Typo15>To Van Luc</Typo15>
              <Typo12>gia dt nay bao nhieu?</Typo12>
            </Box>
          </BoxElement>
        </Container>
      ) : (
        <Conversation />
      )}
    </Box>
  );
};

export default Message;

const Container = styled(Box)(({ theme }) => ({
  width: "361px",
  height: "500px",
  border: "1px solid #cccccc",
  boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  backgroundColor: "white",
}));

const Typo15 = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "500",
}));

const Typo12 = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
}));

const BoxElement = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "6px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#cccccc",
  },
}));
