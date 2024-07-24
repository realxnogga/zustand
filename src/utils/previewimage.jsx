

import { useState } from "react";

export const PreviewImage = ({ targetFile, design }) => {

    const [userProfilePreview, setUserProfilePreview] = useState(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setUserProfilePreview(reader.result);
        };
        if (targetFile) {
            reader.readAsDataURL(targetFile);
        }

    return (
        userProfilePreview && <img
            src={userProfilePreview}
            alt="Profile Preview"
            className={`${design} h-[4rem] w-[4rem] mb-1 object-contain`}
        />
    )
}