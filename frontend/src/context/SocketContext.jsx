import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// Create the Socket Context
const SocketContext = createContext();

// Custom Hook (fixes HMR issue)
const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:3000", {
        query: { userId: authUser._id },
      });

      // Set socket before using it
      setSocket(newSocket);

      // Attach event listener correctly
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => newSocket.close();
    } else {
      setSocket(null);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocketContext };
export default SocketContextProvider;
