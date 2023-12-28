const {
  openSbTrue,
  severityWarning,
  severitySuccess,
  setSnackbarMessage,
} = require("../Reducer/snackbarSlice");

const moment = require("moment");

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const bufferToBase64 = (img) => {
  const imageShow = new Buffer(img, "base64").toString("binary");
  return imageShow;
};

const createConversation = async (currentUser, navigate, axios, ID1, ID2) => {
  if (!currentUser) {
    navigate("/login");
  }
  const bothID1 = `${ID1}&${ID2}`;
  const bothID2 = `${ID2}&${ID1}`;
  const conversationInf1 = {
    idMaster: ID1,
    conversationName: `${ID1}&${ID2}`,
  };
  const conversationInf2 = {
    idMaster: ID2,
    conversationName: `${ID2}&${ID1}`,
  };
  let isExist1 = await axios.post(
    `${process.env.REACT_APP_PORT_API}/conversationExist`,
    { bothID: bothID1 }
  );
  let isExist2 = await axios.post(
    `${process.env.REACT_APP_PORT_API}/conversationExist`,
    { bothID: bothID2 }
  );

  if (!isExist1.data.isExist && !isExist2.data.isExist) {
    let data = await axios.post(
      `${process.env.REACT_APP_PORT_API}/createConversation`,
      { idMaster: ID1, conversationName: `${ID1}&${ID2}` }
    );
  }
  console.log(">>>isExist1:", isExist1.data.isExist);
  console.log(">>>isExist2:", isExist2.data.isExist);
};

const toVnd = (price) => {
  const priceConvert = price.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return priceConvert;
};

const setSnackbar = (severity, message, dispatch) => {
  dispatch(openSbTrue());
  if (severity === "warning") {
    dispatch(severityWarning());
  } else {
    dispatch(severitySuccess());
  }
  dispatch(setSnackbarMessage(message));
};

const formatDate = (myDate) => {
  var date = new Date("2017-02-17T22:32:25.000Z");
  var dateSource = new Date(myDate);
  // console.log("typeof date:", dateSource);
  // console.log("typeof date:", typeof dateSource);
  var formatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  var dateString = dateSource.toLocaleDateString("en-US", formatOptions);
  // console.log("---data format is:", dateString);
  return dateString;
};

module.exports = {
  getBase64: getBase64,
  bufferToBase64: bufferToBase64,
  createConversation: createConversation,
  toVnd: toVnd,
  setSnackbar: setSnackbar,
  formatDate: formatDate,
};
