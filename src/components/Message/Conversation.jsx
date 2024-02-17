import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosSend, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  hiddenMessage,
  sendMessageThunk,
  setArrDataMessage,
  setMessage,
  setTimeSend,
} from "../../Reducer/messageSlice";
import { formatDate } from "../../utils/commonUtils";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:8080");

const Conversation = ({ socket }) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(null);
  const [arrMsg, setArrMsg] = useState([]);
  const [count, setCount] = useState(0);
  const dataMessage = useSelector((state) => state.messageSlice.dataMessage);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const showMess = useSelector((state) => state.messageSlice.showMessage);
  const partner = useSelector((state) => state.messageSlice.partner);
  const dataSend = useSelector((state) => state.sendMessageSlice.dataSend);
  const userId = currentUser.data.id;
  const messagesEndRef = useRef(null);
  const lastMess = useRef(null);
  const socketId = socket.id;

  useEffect(() => {
    socket.on("receive_message", (Message) => {
      setArrMsg((oldArr) => [...oldArr, Message]);
      // dispatch(setArrDataMessage(Message));
      // setMsg(Message);
    });
    console.log("socket:", typeof socketId);
  }, [socketId]);

  useEffect(() => {
    lastMess.current?.scrollIntoView({ behavior: "smooth" });
  }, [dataMessage]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [arrMsg]);
  const handleSendMessage = async () => {
    // const socket = io.connect("http://localhost:8080");
    const today = new Date();
    let timeSend = formatDate(today);
    dispatch(setTimeSend(today));
    if (
      dataSend?.content === "" ||
      dataSend?.content === undefined ||
      dataSend?.content === null
    ) {
    } else {
      dispatch(sendMessageThunk(dataSend));
      // await socket.emit("send_message", dataSend);

      console.log("success");
    }
    if (msg !== "") {
      const messagedata = {
        conversationId: dataSend.conversationId,
        senderId: currentUser.data.id,
        content: msg,
        timeSend: timeSend,
      };
      await socket.emit("send_message", messagedata);
    }

    setMsg("");
    dispatch(setMessage(""));
    // socket.disconnect();
  };
  const handleTest = () => {
    // console.log("---send message:", dataSend);
    // console.log("---msg:", msg);
    // console.log("---arrMsg:", arrMsg);
    console.log("---socket:", socket);
    // console.log("---time send message:", formatDate(dataSend.timeSend));
  };
  if (dataMessage && dataMessage.length > 0) {
    return (
      <ConversationShow>
        <Header>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              style={{ width: "32px", height: "32px", borderRadius: "50px" }}
            />
            &nbsp;&nbsp;{partner}
          </Box>
          <AiOutlineClose
            style={{
              fontSize: "180%",
              cursor: "pointer",
              color: "rgba(0,0,0,0.5)",
            }}
            onClick={() => {
              dispatch(hiddenMessage());
              socket.emit("leave_room");
            }}
          />
        </Header>
        <Content>
          {dataMessage.map((item) => {
            if (item.senderId === userId) {
              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    width: "344.2px",
                  }}>
                  <Typo12 sx={{ maxWidth: "215px", marginLeft: "150px" }}>
                    {item.timeSendMessage}
                  </Typo12>
                  <OwnMessage>{item.content}</OwnMessage>
                </Box>
              );
            } else {
              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    margin: "5px 0 0 5px",
                    flexDirection: "column",
                  }}>
                  {/* <img
                    src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                    style={{
                      width: "27px",
                      height: "27px",
                      borderRadius: "50px",
                    }}
                  /> */}
                  <Typo12 sx={{ marginLeft: "5px" }}>
                    {item.timeSendMessage}
                  </Typo12>
                  <PartnerMessage>{item.content}</PartnerMessage>
                </Box>
              );
            }
          })}
          {arrMsg.map((item) => {
            if (item?.senderId === currentUser.data.id) {
              return (
                <Box>
                  <Typo12 sx={{ maxWidth: "215px", marginLeft: "150px" }}>
                    {item.timeSend}
                  </Typo12>
                  <OwnMessage>{item.content}</OwnMessage>
                </Box>
              );
            } else {
              return (
                <Box>
                  <Typo12 sx={{ marginLeft: "5px" }}>{item.timeSend}</Typo12>
                  <PartnerMessage>{item.content}</PartnerMessage>
                </Box>
              );
            }
          })}
          <div ref={messagesEndRef} />
          <div ref={lastMess} />
        </Content>
        <TypingText>
          <IoMdAddCircle
            style={{
              fontSize: "30px",
              margin: "5px",
            }}
          />
          <Input
            value={dataSend?.content}
            type="text"
            onChange={(e) => {
              dispatch(setMessage(e.target.value));
              setMsg(e.target.value);
              console.log("value message:", e.target.value);
            }}
          />
          <Box onClick={() => handleSendMessage()}>
            <IoIosSend
              style={{
                fontSize: "30px",
                margin: "5px",
              }}
            />
          </Box>
          {/* <button onClick={() => handleTest()}>TEST</button> */}
        </TypingText>
      </ConversationShow>
    );
  } else {
    return (
      <ConversationShow>
        <Header>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              style={{ width: "32px", height: "32px", borderRadius: "50px" }}
            />
            &nbsp;&nbsp;{partner}
          </Box>
          <AiOutlineClose
            style={{
              fontSize: "180%",
              cursor: "pointer",
              color: "rgba(0,0,0,0.5)",
            }}
            onClick={() => {
              dispatch(hiddenMessage());
            }}
          />
        </Header>
        <Content></Content>
        <TypingText>
          <IoMdAddCircle
            style={{
              fontSize: "30px",
              margin: "5px",
            }}
          />
          <Input type="text" />
          <Box>
            <IoIosSend
              style={{
                fontSize: "30px",
                margin: "5px",
              }}
            />
          </Box>
        </TypingText>
      </ConversationShow>
    );
  }
};

export default Conversation;

const ConversationShow = styled(Box)(({ theme }) => ({
  position: "fixed",
  zIndex: 1,
  width: "361px",
  height: "460px",
  border: "1px solid #cccccc",
  borderRadius: "10px",
  boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
  backgroundColor: "white",
  bottom: 0,
  right: 20,
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "15px",
  fontWeight: "500",
  padding: "10px",
}));

const Content = styled(Box)(({ theme }) => ({
  borderTop: "1px solid #999999",
  height: "355px",
  overflow: "auto",
}));

const OwnMessage = styled(Box)(({ theme }) => ({
  backgroundColor: "var(--pinky)",
  maxWidth: "215px",
  wordBreak: "break-all",
  color: "white",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "14px",
  margin: "0 0 0 150px ",
}));
const Typo12 = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  margin: "5px 5px 0 0 ",
}));

const PartnerMessage = styled(Box)(({ theme }) => ({
  backgroundColor: "var(--lightPink)",
  maxWidth: "215px",
  wordBreak: "break-all",
  padding: "8px 12px",
  borderRadius: "10px",
  margin: "0 0 0 5px",
  fontSize: "14px",
}));

const TypingText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0 0 5px 0",
}));

const Input = styled("input")(({ theme }) => ({
  height: "35px",
  borderRadius: "10px",
}));
