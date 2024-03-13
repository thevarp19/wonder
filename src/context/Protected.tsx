import { Loading } from "@/components/ui/Loading";
import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

interface ProtectedProps {
    checkAction: () => Promise<boolean>;
    navigate: () => void;
}

export const Protected: FC<ProtectedProps> = ({ checkAction, navigate }) => {
    const [loading, setLoading] = useState(true);

    async function handleCheckAction() {
        try {
            const isValid = await checkAction();
            if (!isValid) {
                throw new Error("Auth credentials are not valid");
            }
        } catch (error) {
            navigate();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleCheckAction();
    }, []);

    if (loading) {
        return <Loading className="w-screen h-screen" />;
    }

    return <Outlet />;
};
