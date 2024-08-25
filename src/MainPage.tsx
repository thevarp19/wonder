import { FC } from "react";

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
    return (
        <div className="flex flex-col justify-center w-screen h-screen bg-[#F7F9FB]">
            {/* <HeaderLogo />
            <div className="flex justify-center w-full h-full md:pt-[70px] pt-0">
                <section className="flex flex-col items-center gap-10 pt-10">
                    <div className="flex flex-col items-center gap-[80px]">
                        <p className="text-[30px] font-semibold text-center">
                            Добро пожаловать!
                        </p>
                        <p className="text-2xl">Войти как</p>
                    </div>
                    <div className={cn("flex md:flex-row flex-col items-center md:gap-5 gap-10")}>
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
            </div> */}
        </div>
    );
};
