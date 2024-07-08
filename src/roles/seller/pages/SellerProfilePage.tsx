// import { axiosAuthorized } from "@/lib/axios";
// import { useGetSellerProfile } from "@/modules/seller/queries";
import { profileImage } from "@/assets";
import { Image } from "@/components/ui/Image";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import { FC, useState } from "react";
import PhoneInput from "react-phone-input-2";

interface SellerProfilePageProps {}

export const SellerProfilePage: FC<SellerProfilePageProps> = ({}) => {
    // const { data } = useGetSellerProfile();
    // const { message } = App.useApp();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Алишер",
        lastName: "Калиев",
        phone: "+7 777 777 77 77",
        kaspiApi: "2E34DGDG6RY78",
        login: "Login@gmail.com",
        password: "hello",
        email: "Login@gmail.com",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        console.log("Сохраненные данные:", formData);
        setIsEditing(false);
    };

    // const handleClick = () => {
    //     axiosAuthorized
    //         .get("/api/products/xml")
    //         .then((response) => {
    //             console.log("XML data:", response.data);
    //             message.success("XML файл успешно сгенерирован");
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching XML:", error);
    //             message.error("Ошибка при генерации XML файла");
    //         });
    // };

    return (
        <div className="sm:pb-0 pb-[68px]">
            <h1 className="text-[18px] font-[600]">Профиль</h1>
            <div className="flex mt-5 gap-7">
                <Image
                    className="w-[100px] h-[100px]"
                    src={profileImage}
                    alt="profile"
                />
                <div className="flex flex-col justify-center h-auto">
                    <h2 className="text-[20px] font-[600]">QIT</h2>
                    <p className="text-[16px] font-[500] text-[#4B4B4B]">
                        ID:00101299323
                    </p>
                </div>
            </div>
            <Button
                style={{
                    border: "none",
                    color: "#4B4B4B",
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: 0,
                }}
                className="absolute bottom-0 left-2"
            >
                <span className="underline underline-offset-[3px]">
                    Поменять фото
                </span>
            </Button>
            <div className="flex flex-col gap-5 mt-10 md:flex-row md:gap-10">
                <div className="flex flex-col w-full gap-5 md:w-1/3">
                    <div>
                        Имя
                        <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Алишер"
                            style={{
                                fontSize: "18px",
                                marginTop: "8px",
                                minWidth: "200px",
                            }}
                        />
                    </div>
                    <div>
                        Фамилия
                        <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Калиев"
                            style={{
                                fontSize: "18px",
                                marginTop: "8px",
                                minWidth: "200px",
                            }}
                        />
                    </div>
                    <PhoneInput
                        specialLabel="Номер телефона"
                        onlyCountries={["kz"]}
                        masks={{ kz: "... ... .. .." }}
                        defaultMask="+7 777 777 77 77"
                        placeholder="+7 777 777 77 77"
                        value={formData.phone}
                        onChange={(phone) =>
                            setFormData({ ...formData, phone })
                        }
                        inputClass={`w-full min-w-[200px] border-[1px] border-[#d9d9d9] rounded-md p-1 pl-3 mt-[8px] text-[18px] outline-none ${
                            isEditing
                                ? "hover:border-[#EF7214] focus:border-[#EF7214]"
                                : "text-[#00000040] bg-[#0000000A] cursor-not-allowed"
                        }`}
                        disabled={!isEditing}
                    />
                    <div>
                        Kaspi API
                        <Input
                            name="kaspiApi"
                            value={formData.kaspiApi}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="2E34DGDG6RY78"
                            style={{
                                fontSize: "18px",
                                marginTop: "8px",
                                minWidth: "200px",
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-5 md:w-1/3">
                    <div>
                        Логин
                        <Input
                            name="login"
                            value={formData.login}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Login@gmail.com"
                            style={{
                                fontSize: "18px",
                                marginTop: "8px",
                                minWidth: "200px",
                            }}
                        />
                    </div>
                    <div>
                        Пароль
                        <Input.Password
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Введите пароль"
                            style={{
                                fontSize: "18px",
                                marginTop: "8px",
                                minWidth: "200px",
                            }}
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        />
                    </div>
                    <div className="">
                        E-mail
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Login@gmail.com"
                            style={{
                                fontSize: "18px",
                                marginTop: "8px",
                                minWidth: "200px",
                            }}
                        />
                    </div>
                </div>
            </div>
            {!isEditing ? (
                <Button
                    className="md:w-[200px] w-full h-[50px] mt-12"
                    type="primary"
                    onClick={handleEditClick}
                >
                    Редактировать
                </Button>
            ) : (
                <div className="flex flex-col gap-4 mt-12 md:flex-row">
                    <Button
                        className="w-full md:w-[200px]"
                        type="primary"
                        onClick={handleSaveClick}
                    >
                        Сохранить
                    </Button>
                    <Button
                        className="w-full md:w-[200px] h-[50px]"
                        onClick={handleCancelClick}
                    >
                        Отмена
                    </Button>
                </div>
            )}
        </div>
    );
};
