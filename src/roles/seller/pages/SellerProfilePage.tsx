import { SellerProfileEdit } from "@/modules/auth/components/SellerProfileEditForm";
import { Button, Popconfirm } from "antd";
import { FC } from "react";

interface SellerProfilePageProps {}

export const SellerProfilePage: FC<SellerProfilePageProps> = ({}) => {
    return (
        <div className="gap-4">
            <div className="w-full ">
                <h1 className="flex items-center justify-between max-w-sm mb-4 text-2xl font-semibold">
                    Edit profile{" "}
                    <Popconfirm
                        title="Do you wanna reset your password?"
                        description="You will got an email with link"
                    >
                        <Button type="primary">Reset password</Button>
                    </Popconfirm>
                </h1>
                <SellerProfileEdit />
            </div>
        </div>
    );
};
