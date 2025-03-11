const socket = io();
let local;
let remote;
let peerConnection;
const rtcSettings = {
  iceServer: [{ urls: "stun:stun.l.google.com:19302" }],
};

const initialize = async () => {
  // Fixed typo in function name: "initalize" -> "initialize"
  socket.on("signalingMessage", handleSignalingMessage); // Fixed typo in function name: "handleSingalingMessage" -> "handleSignalingMessage"

  // media access
  try {
    local = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    initiateOffer();
  } catch (err) {
    console.error("Error accessing media devices: ", err);
  }
};

const initiateOffer = async () => {
  await createPeerConnection();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("signalingMessage", JSON.stringify({ type: "offer", offer }));
};

const createPeerConnection = async () => {
  peerConnection = new RTCPeerConnection(rtcSettings);
  remote = new MediaStream();

  // Fixed typo: "docoument" -> "document"
  document.querySelector("#remoteVideo").srcObject = remote;
  document.querySelector("#remoteVideo").style.display = "block";
  document.querySelector("#localVideo").classList.add("smallFrame");

  local.getTracks().forEach((track) => {
    peerConnection.addTrack(track, local);
  });

  peerConnection.ontrack = (event) =>
    event.streams[0].getTracks().forEach((track) => {
      remote.addTrack(track);
    });

  peerConnection.onicecandidate = (event) =>
    event.candidate &&
    socket.emit(
      "signalingMessage",
      JSON.stringify({ type: "candidate", candidate: event.candidate })
    );
};

const handleSignalingMessage = async (message) => {
  // Fixed typo in function name: "handleSingalingMessage" -> "handleSignalingMessage"
  const { type, offer, answer, candidate } = JSON.parse(message);

  if (type === "offer") handleOffer(offer);
  if (type === "answer") handleAnswer(answer); // Fixed typo: "handleOffer" -> "handleAnswer" for answer handling
  if (type === "candidate" && peerConnection) {
    peerConnection.addIceCandidate(candidate);
  }
};

const handleOffer = async (offer) => {
  await createPeerConnection();
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer(); // Fixed missing "await"
  await peerConnection.setLocalDescription(answer);
  socket.emit(
    "signalingMessage",
    JSON.stringify({ type: "answer", answer: answer })
  );
};

const handleAnswer = async (answer) => {
  // Fixed this to handleAnswer instead of handleOffer
  if (!peerConnection.currentRemoteDescription) {
    await peerConnection.setRemoteDescription(answer); // Fixed missing "await"
  }
};

window.addEventListener("beforeunload", () => socket.disconnect());

initialize(); // Fixed typo in calling initialize function instead of initalize
