import {
    datauserNotfilled,
    parametrskaspi,
    parametrskaspi2,
    saveuserKaspi,
    sellerKabinet,
    userdataFilled,
    usersKaspi,
} from "@/assets";
import { FC, useState } from "react";

export const ProductsUploadInstructionsAuto: FC = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold">
                Загрузка товаров на сайт Wonder:
            </h2>
            <div className="flex flex-col gap-4">
                <h2 className="text-lg">
                    Для автоматической импортации данных требуется предоставить
                    доступ к Кабинету продавца Каспи
                </h2>
                <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500">
                    <h2>
                        Перед началом совершения передачи данных, пожалуйста
                        ознакомитесь с политикой конфиденциальности
                    </h2>
                </div>
            </div>
            <div className="max-w-xl p-6 mx-auto bg-white border rounded-lg shadow-md ">
                <h2 className="mb-4 text-2xl font-semibold">
                    Политика конфиденциальности
                </h2>
                <p className="mb-4 text-sm">
                    Дата вступления в силу: 20.07.2024
                </p>

                <div className="mb-4 space-y-4 text-sm">
                    <div>
                        <h3 className="font-semibold">1. Введение</h3>
                        <p>
                            Настоящая Политика конфиденциальности описывает, как
                            компания Wonder ("Компания", "мы", "нас" или "наш")
                            собирает, использует и защищает вашу личную
                            информацию, которую вы предоставляете через наш
                            веб-сайт [URL веб-сайта] ("Сайт").
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">2. Сбор информации</h3>
                        <p>
                            Мы можем собирать и обрабатывать следующую
                            информацию:
                            <ul className="pl-5 list-disc">
                                <li>
                                    Личные данные, которые вы предоставляете при
                                    регистрации на нашем Сайте, включая ваше
                                    имя, адрес электронной почты, номер телефона
                                    и другие контактные данные.
                                </li>
                                <li>
                                    Логин и пароль для доступа к вашему аккаунту
                                    на маркетплейсе Kaspi.kz, которые вы
                                    предоставляете нам через наш Сайт.
                                </li>
                            </ul>
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            3. Использование информации
                        </h3>
                        <p>
                            Мы используем собранную информацию для следующих
                            целей:
                            <ul className="pl-5 list-disc">
                                <li>
                                    Для предоставления и управления нашими
                                    услугами.
                                </li>
                                <li>
                                    Для аутентификации вашего аккаунта на
                                    маркетплейсе Kaspi.kz.
                                </li>
                                <li>
                                    Для связи с вами и предоставления информации
                                    о наших услугах и обновлениях.
                                </li>
                            </ul>
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">4. Защита информации</h3>
                        <p>
                            Мы предпринимаем разумные меры для защиты вашей
                            личной информации от несанкционированного доступа,
                            использования или раскрытия. Это включает в себя
                            использование шифрования, защитных технологий и
                            процедур безопасности.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            5. Раскрытие информации
                        </h3>
                        <p>
                            Мы не продаем, не торгуем и не передаем вашу личную
                            информацию третьим лицам без вашего согласия, за
                            исключением случаев, предусмотренных
                            законодательством или когда это необходимо для
                            выполнения наших услуг.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">6. Ваши права</h3>
                        <p>
                            Вы имеете право на доступ, исправление или удаление
                            вашей личной информации, которую мы храним. Вы
                            можете связаться с нами, чтобы реализовать свои
                            права.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            7. Изменения в Политике конфиденциальности
                        </h3>
                        <p>
                            Мы оставляем за собой право обновлять настоящую
                            Политику конфиденциальности в любое время. Изменения
                            вступают в силу с момента их публикации на нашем
                            Сайте. Мы рекомендуем вам регулярно проверять нашу
                            Политику конфиденциальности на предмет изменений.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            8. Контактная информация
                        </h3>
                        <p>
                            Если у вас есть вопросы или предложения по поводу
                            нашей Политики конфиденциальности, пожалуйста,
                            свяжитесь с нами: [Контакты]
                        </p>
                    </div>
                </div>

                <div className="flex items-start mt-4">
                    <input
                        type="checkbox"
                        id="agree"
                        className="mt-1 mr-2"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="agree" className="text-sm">
                        Я подтверждаю, что предоставляю логин и пароль для моего
                        аккаунта на маркетплейсе Kaspi.kz компании Wonder
                        добровольно и осознаю, что данная информация будет
                        использована в соответствии с{" "}
                        <a href="#" className="text-blue-500 underline">
                            Политикой конфиденциальности
                        </a>
                        .
                    </label>
                </div>
            </div>
            <div className="flex flex-col ">
                <h2 className="mb-4 text-xl font-semibold">
                    1. Ознакомьтесь с политикой конфиденциальности и подтвердите
                    согласие.
                </h2>

                <h3 className="mb-4 text-xl font-semibold">
                    2. Авторизуйтесь в кабинете продавца Каспи
                </h3>
                <div className="flex flex-col gap-3 mb-4">
                    <h3>
                        Авторизуйтесь в кабинете Продавца Каспи через аккаунт
                        Админа
                    </h3>
                    <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500">
                        <p>
                            Аккаунт Админа - Главный аккаунт, имеющий доступ ко
                            всем настройкам Kaspi магазина. Авторизация на
                            аккаунт Админа производится через номер телефона.
                        </p>
                    </div>

                    <img
                        src={sellerKabinet}
                        alt="Кабинет продавца"
                        className="ms-5 mb-4 w-[400px] h-[252px] rounded-xl"
                    />
                </div>

                <h3 className="mb-4 text-xl font-semibold">
                    3. Создайте аккаунт Менеджера для доступа на сайт Каспи
                </h3>
                <div className="flex flex-col gap-4">
                    <h3 className="ps-10">
                        3.1. Зайдите в раздел “Пользователи” (Левое оконное
                        меню)
                    </h3>
                    <img
                        src={usersKaspi}
                        alt="users продавца"
                        className="ms-10 mb-4 w-[355px] h-[358px] rounded-xl"
                    />
                    <h3 className="ps-10">
                        3.2. Введите данные по нижеуказанным инструкциям
                    </h3>
                    <div>
                        <h3 className="ps-10">
                            Имя пользователя- “Wonder FBO”
                        </h3>
                        <h3 className="ps-10">
                            Email- Доступная вам почта не привязанная к Кабинету
                            Продавца
                        </h3>
                        <h3 className="ps-10">
                            Каспи Номер телефона - Доступный вам номер телефона
                        </h3>
                    </div>
                    <img
                        src={datauserNotfilled}
                        alt="Кабинет продавца"
                        className="ms-10 mb-4 w-[745px] h-[220px]"
                    />
                    <h3 className="ps-10">Пример заполнения:</h3>
                    <img
                        src={userdataFilled}
                        alt="Кабинет продавца"
                        className="ms-10 mb-4 w-[745px] h-[230px]"
                    />
                    <h3 className="ps-10">
                        3.3. Выберите все нижеуказанные параметры
                    </h3>

                    <img
                        src={parametrskaspi}
                        alt="Кабинет продавца"
                        className="ms-10 mb-4 w-[442px] h-[280px]"
                    />
                    <img
                        src={parametrskaspi2}
                        alt="Кабинет продавца"
                        className="ms-10 mb-4 w-[442px] h-[220px]"
                    />
                    <h3 className="ps-10">3.4. Сохраните пользователя</h3>
                    <img
                        src={saveuserKaspi}
                        alt="Кабинет продавца"
                        className="ms-10 mb-4 w-[312px] h-[138px]"
                    />

                    <div>
                        <h3 className="mb-3 ps-10">3.5. Получите пароль</h3>
                        <p className="mb-3 ps-10">
                            На вышеуказанную вами почту придет сообщение с
                            паролем.
                        </p>
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 ms-10">
                            <p>
                                Данный пароль нужно будет указать позже в
                                текстовом поле. Следуйте инструкции.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-semibold">
                            4. Введите данные в текстовом поле
                        </h3>

                        <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500 ms-10">
                            <p>
                                Ниже инструкции будут доступны текстовые поля.
                                После ознакомления с инструкцией, пожалуйста,
                                заполните данные поля корректно.
                            </p>
                        </div>

                        <p className="mb-4 text-sm ps-10">
                            4.1. Укажите Почту. Укажите почту, которую вы
                            использовали при создании пользователя. На данную
                            почту вы ранее получали пароль (пункт 3.5).
                        </p>
                        <p className="mb-4 text-sm ps-10">
                            4.2. Укажите Пароль. Укажите пароль, который вы
                            получили на почту (пункт 3.5). Введите пароль в
                            текстовое поле.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-semibold">
                            5. Подтвердите данные. Нажмите кнопку “Подтвердить”
                            для завершения заполнения данных.
                        </h3>
                        <p></p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-semibold">
                            6. Ожидайте завершения импортирования данных
                        </h3>
                        <p className="mb-4 ps-10">
                            Процесс импортирования данных может занять от 10 до
                            40 минут. Просим вас ожидать и не вносить изменения
                            на страницу сайте Kaspi в "Кабинете Продавца".
                        </p>
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 ms-10">
                            <p>
                                Внесение корректировок в параметры и данные
                                пользователя могут вызвать ошибку в процессе
                                импортирования данных.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
