import { Box, Typography, styled } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { BiMessageDetail } from "react-icons/bi";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import {
  showMessage,
  showAllMessage,
  hiddenAll,
  getAllConversation,
  getMessage,
  setPartner,
  setConversationId,
  setSenderId,
  setReceiverId,
} from "../../Reducer/messageSlice";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const Message = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const dataConversation = useSelector((state) => state.messageSlice.data);

  const showMess = useSelector((state) => state.messageSlice.showMessage);
  const showAll = useSelector((state) => state.messageSlice.showAll);

  const [showConversation, setShow] = useState(false);
  const [showMess123, setShow123] = useState(false);

  const handleShowMessage = async (conversationId, receiverId) => {
    const userId = currentUser.data.id;
    socket.emit("join_room", conversationId);
    dispatch(showMessage());
    dispatch(getMessage({ conversationId, userId }));
    dispatch(setConversationId(conversationId));
    dispatch(setSenderId(userId));
    dispatch(setReceiverId(receiverId));
    setShow123(true);
    console.log(">>>showMess", conversationId, userId);
  };

  const handleTest = () => {
    console.log("---SOCKET:", socket.id);
  };
  return (
    <Box sx={{ position: "fixed", bottom: 0, right: 20 }}>
      {!showAll ? (
        <Badge badgeContent={4} color="error">
          <BiMessageDetail
            style={{ fontSize: "50px" }}
            onClick={() => {
              dispatch(showAllMessage());
              dispatch(getAllConversation(currentUser.data.id));
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
                dispatch(hiddenAll());
              }}
            />
          </Box>
          {dataConversation &&
            dataConversation.imsender.length > 0 &&
            dataConversation.imsender.map((item) => {
              return (
                <BoxElement
                  key={item.id}
                  onClick={() => {
                    handleShowMessage(item.id, item.member?.id);
                    dispatch(setPartner(item.member?.fullName));
                  }}>
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50px",
                    }}
                  />
                  <Box sx={{ margin: "0 0 0 10px" }}>
                    <Typo15>{item.member.fullName}</Typo15>
                    <Typo12>gia dt nay bao nhieu?</Typo12>
                  </Box>
                </BoxElement>
              );
            })}
          {dataConversation &&
            dataConversation.imreceiver.length > 0 &&
            dataConversation.imreceiver.map((item) => {
              return (
                <BoxElement
                  key={item.id}
                  onClick={() => {
                    handleShowMessage(item.id, item.master?.id);
                    dispatch(setPartner(item.master?.fullName));
                  }}>
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50px",
                    }}
                  />
                  <Box sx={{ margin: "0 0 0 10px" }}>
                    <Typo15>{item.master?.fullName}</Typo15>
                    <Typo12>gia dt nay bao nhieu?</Typo12>
                  </Box>
                </BoxElement>
              );
            })}
          <button onClick={() => handleTest()}>test</button>
        </Container>
      ) : (
        <Conversation socket={socket} />
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
