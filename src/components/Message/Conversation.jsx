import React from "react";
import { Box, styled } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosSend, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { hiddenMessage } from "../../Reducer/messageSlice";

const Conversation = () => {
  const dispatch = useDispatch();
  const showMess = useSelector((state) => state.messageSlice.showMessage);
  return (
    <ConversationShow>
      <Header>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            style={{ width: "32px", height: "32px", borderRadius: "50px" }}
          />
          &nbsp;&nbsp;To Van Luc
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
      <Content>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <OwnMessage>
            dien thoai any gia bao nieuafojdsaflsdahfklsdhafbksdjafhiudshfkjsdh
          </OwnMessage>
        </Box>

        <Box sx={{ display: "flex", margin: "5px 0 0 5px" }}>
          <img
            src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            style={{ width: "27px", height: "27px", borderRadius: "50px" }}
          />
          <PartnerMessage>
            tim mot noi ma khong co ai nhin chungt ta
          </PartnerMessage>
        </Box>
      </Content>
      <TypingText>
        <IoMdAddCircle
          style={{
            fontSize: "30px",
            margin: "5px",
          }}
        />
        <Input />
        <IoIosSend
          style={{
            fontSize: "30px",
            margin: "5px",
          }}
        />
      </TypingText>
    </ConversationShow>
  );
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
