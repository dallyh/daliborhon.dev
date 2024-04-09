export function getBlogPostDateTime(locale: string, pubDateTime: string | Date, modDatetime: string | Date | null) {
    const myDatetime = wasPostUpdated(pubDateTime, modDatetime) ? new Date(modDatetime!) : new Date(pubDateTime);

    const date = myDatetime.toLocaleDateString(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const time = myDatetime.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
    });

    return {
        iso: myDatetime.toISOString(),
        date: date,
        time: time,
    };
}

export function wasPostUpdated(pubDateTime: string | Date, modDatetime: string | Date | null) {
    if (modDatetime && pubDateTime) {
        const updated = !(new Date(pubDateTime).getTime() === new Date(modDatetime).getTime());
        return updated;
    }

    return false;
}
