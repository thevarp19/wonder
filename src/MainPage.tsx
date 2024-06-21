import { cn } from "@/utils/shared.util";
import { Button } from "antd";
import { FC } from "react";
import { HeaderLogo } from "./components/shared/HeaderLogo";

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
    return (
        <div className="flex flex-col justify-center w-screen h-screen bg-[#F7F9FB]">
            <HeaderLogo />
            <div className="flex justify-center w-full h-full">
                <section className="flex flex-col items-center gap-10 pt-10">
                    <div className="flex flex-col items-center gap-[80px]">
                        <p className="text-[30px] font-semibold">
                            Добро пожаловать!
                        </p>
                        <p className="text-2xl">Войти как</p>
                    </div>
                    <div className={cn("flex items-center gap-5")}>
                        <Button
                            type="primary"
                            size="large"
                            href="/admin"
                            className="min-w-[218px]"
                        >
                            Администратор
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            href="/seller"
                            className="min-w-[218px]"
                        >
                            Продавец
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            href="/employee"
                            className="min-w-[218px]"
                        >
                            Сотрудник
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};
