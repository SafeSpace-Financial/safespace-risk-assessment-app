// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
import { useAuth } from './AuthContext';

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
  // Add other fields as needed (e.g. riskProfile, income, etc.)
}

interface UserContextType {
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile | null) => void;
    isLoading: boolean;
    refreshUserProfile: () => Promise<void>; // ⬅️ NEW
}

const UserContext = createContext<UserContextType>({
    userProfile: null,
    setUserProfile: () => {},
    isLoading: true,
    refreshUserProfile: async () => {}, // ⬅️ NEW
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const fetchUserProfile = async () => {
        if (!user) return;
    
        setIsLoading(true);
        try {
            const response = await api.get("/users/me");
            const data = response.data;
            const accountResponse = await api.get("/accounts/me")
            const accountData = accountResponse.data;
            setUserProfile({
                id: data.id,
                firstName: data.first_name, 
                lastName: data.last_name, 
                phoneNumber: data.phone_number,
                role: accountData.role
            });       
            } catch (err) {
            console.error("Failed to fetch user profile", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [user]);

    return (
        <UserContext.Provider
            value={{
                userProfile,
                setUserProfile,
                isLoading,
                refreshUserProfile: fetchUserProfile, 
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
