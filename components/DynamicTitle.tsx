'use client';

import { useEffect } from 'react';

export default function DynamicTitle() {
    useEffect(() => {
        const originalTitle = "Obscura";
        const titleMessages = ["Come back!", "Register now!"];
        let currentMessageIndex = 0;
        let titleInterval: NodeJS.Timeout | null = null;

        const startTitleAnimation = () => {
            if (!titleInterval) {
                titleInterval = setInterval(() => {
                    document.title = titleMessages[currentMessageIndex];
                    currentMessageIndex = (currentMessageIndex + 1) % titleMessages.length;
                }, 1000);
            }
        };

        const stopTitleAnimation = () => {
            if (titleInterval) {
                clearInterval(titleInterval);
                titleInterval = null;
            }
            document.title = originalTitle;
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                startTitleAnimation();
            } else {
                stopTitleAnimation();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', startTitleAnimation);
        window.addEventListener('focus', stopTitleAnimation);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', startTitleAnimation);
            window.removeEventListener('focus', stopTitleAnimation);
        };
    }, []);

    return null;
}
