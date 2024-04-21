import {  Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import Form from "../Form/Form";

export default function PrivateRoute({ children }) {
    const { currentUser} = useAuth()

  return currentUser ? <Form/> : <Navigate to="/login" />;
}