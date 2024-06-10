import { cn } from "@/utils/shared.util";
import { Button } from "antd";
import { FC } from "react";
import { Logo } from "./components/shared/Logo";

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
    return (
        <div className="flex justify-center w-screen h-screen">
            <section className="flex flex-col items-center gap-5 absolute top-[20vh]">
                <Logo />
                <p className="text-xl">Войти как</p>
                <div className={cn("flex items-center gap-5")}>
                    <Button type="primary" size="large" href="/admin">
                        Администратор
                    </Button>
                    <Button type="primary" size="large" href="/seller">
                        Продавец
                    </Button>
                    <Button type="primary" size="large" href="/employee">
                        Сотрудник
                    </Button>
                </div>
            </section>
        </div>
    );
};
