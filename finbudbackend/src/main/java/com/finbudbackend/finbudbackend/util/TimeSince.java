package com.finbudbackend.finbudbackend.util;

import java.util.Date;

public class TimeSince {
    public static String timeSince(long timeMill) {
        long seconds = (new Date().getTime() - timeMill) / 1000;

        long interval = seconds / 31536000;

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return "Just now";
    }
}

