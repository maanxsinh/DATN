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
} from "../../Reducer/messageSlice";
import { useNavigate } from "react-router-dom";

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

  const handleShowMessage = async () => {
    await dispatch(showMessage());
    setShow123(true);
    console.log(">>>showMess", showMess);
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

          <BoxElement
            onClick={() => {
              handleShowMessage();
            }}>
            <img
              src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              style={{ width: "55px", height: "55px", borderRadius: "50px" }}
            />
            <Box sx={{ margin: "0 0 0 10px" }}>
              <Typo15>{dataConversation.imsender[0].id}</Typo15>
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
