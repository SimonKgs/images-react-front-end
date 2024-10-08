import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/user.service';
import { UserImages } from '../../components/UserImages.component';
import styles from './User.module.css'
import { useAuth } from '../../context/AuthContext';
import { UploadImage } from '../../components/UploadImage.component';

export interface CurrentUser {
    name: string;
    email: string;
}

export const User: React.FC = () => {
    
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [refreshImages, setRefreshImages] = useState<boolean>(false); // to manage reload
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Failed to get the user")
                logout()
            }
        }
        fetchUser()
    }, [logout])
    
    // Function to trigger image reload
    const handleImageUploadSuccess = () => {
        setRefreshImages(prev => !prev); // <-- Toggle state to refresh images
    };

    return (
        <div className={styles["user-page-container"]}>
            {
                user &&
                <h1>Welcome { user.name }</h1>
            }
            <UploadImage onImageUploadSuccess={handleImageUploadSuccess}/>
            <UserImages refreshImages={refreshImages} />
            
        </div>
    );
};

