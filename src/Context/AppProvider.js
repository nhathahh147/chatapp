import React, { useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isUpdataUserVisible, setIsUpDataUserVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      comparaValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  ); 

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      comparaValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);
  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible, 
        setIsInviteMemberVisible,
        isUpdataUserVisible, 
        setIsUpDataUserVisible
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
