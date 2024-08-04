import { axiosAuthorized } from "@/lib/axios";
import { AnalyticsData } from "./types";

export function getAdminStatistics(duration: string) {
    return axiosAuthorized.get<AnalyticsData>(
        `/api/analytics/admin/?type=${duration}`
    );
}
