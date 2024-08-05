import {
    chooseFile,
    downloadFileExample,
    fillOtherFields,
    fillTheFields,
    moveFile,
    openFile,
    pressAndSelectFile,
    sheetAdditions,
    sheetExample,
    sheetReplacement,
} from "@/assets";

export const ProductsUploadInstructionsManual = () => {
    return (
        <div className="p-2">
            <div className="flex flex-col gap-4">
                <h1 className="text-base font-semibold">
                    Загрузка товаров на сайт Wonder:
                </h1>
                <a
                    className="text-sm md:text-base"
                    href="https://storage.googleapis.com/wonder-v2/new-import-product%20(2).xlsx"
                >
                    Скачать пример файла
                </a>
            </div>
            <ol className="list-decimal pl-4 mt-[19px] space-y-[19px] font-medium text-lg">
                <li>
                    <h2>Подготовьте файл со списком товаров</h2>
                    <ol className="list-decimal space-y-[30px] ml-[49px] mt-[12px] text-[15px]">
                        <li>
                            <h3>Скачайте пример файла</h3>
                            <img
                                className="ml-[-20px] mt-5"
                                src={downloadFileExample}
                                alt="download file example"
                            />
                        </li>
                        <li>
                            <h3>
                                Заполните файл в формате xlsx, xls следую
                                инструкциям в примере
                            </h3>
                            <p className="ml-[-20px] text-[15px] leading-5 mt-5">
                                <span className="inline-block py-5 px-[23px] bg-[#FFE482] rounded-[10px] max-w-[742px]">
                                    Составьте список товаров, информацию о
                                    которых необходимо загрузить. Список должен
                                    содержать только те товары, которые уже
                                    имеются в "Управление товарами" в Кaspi
                                    кабинете продавца.
                                </span>
                            </p>
                        </li>
                        <li>
                            <h3>
                                Заполните обязательные поля (Артикул, Название
                                товара, Опубликовано, Закупочная цена)
                            </h3>
                            <div className="ml-[-20px]">
                                <img
                                    src={fillTheFields}
                                    alt="fill the fields"
                                />

                                <div className="leading-5">
                                    <h4 className="mt-5 font-bold">
                                        Формат данных
                                    </h4>
                                    <p>Артикул: Уникальный код товара</p>
                                    <p>
                                        Название товара: Полное названия
                                        продаваемого товара
                                    </p>
                                    <p>
                                        Опубликовано: Принимает значения “да”,
                                        “нет” строчными буквами
                                    </p>
                                    <p>
                                        Закупочная цена: Цена по которой товар
                                        был приобретен. Принимает только
                                        цифровые значения
                                    </p>
                                </div>
                                <p className="text-[15px] leading-5 mt-5">
                                    <span className="inline-block py-5 px-[23px] bg-[#FFE482] rounded-[10px] max-w-[742px]">
                                        В случае пропуска обязательных полей
                                        система отклонит ваш файл. Пожалуйста
                                        убедитесь что все обязательные поля
                                        заполнены на всех строках
                                    </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <h3>
                                При необходимости заполните остальные поля
                                (Ссылка товара, Города)
                            </h3>
                            <div className="ml-[-20px]">
                                <img
                                    src={fillOtherFields}
                                    alt="fill other fields"
                                />
                                <div className="leading-5">
                                    <h4 className="mt-5 font-bold">
                                        Формат данных
                                    </h4>
                                    <p>
                                        Ссылка на товар: Скопированная ссылка на
                                        артикул с Каспи Магазина
                                    </p>
                                    <p className="max-w-[578px]">
                                        Города: Города в которых доступна
                                        продажа товара и их цена. Цена
                                        указывается в цифровых значениях. Каждый
                                        город прописывается в отдельную колону
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <h3>
                                После завершения заполнения сохраните файл в
                                формате xlsx или xls
                            </h3>
                        </li>
                    </ol>
                </li>

                <li>
                    <h2>Выберите способ загрузки вашего листа</h2>
                    <div className="ml-[30px] mt-[12px] text-[15px]">
                        <p className="">На странице доступны 3 опции:</p>
                        <ul className="list-disc pl-[19px]">
                            <li>Обновления листа</li>
                            <li>Замена листа</li>
                            <li>Дополнения листа</li>
                        </ul>
                        <p className="mt-3">
                            Перед загрузкой выберите подходящий для вас способ
                        </p>
                        <h3 className="mt-[18px] font-bold text-[17px]">
                            Обновления листа
                        </h3>
                        <p>
                            При выборе данного способа старые данные
                            обновляются, а новые данные добавляются в лист
                        </p>
                        <h3 className="mt-[27px] font-bold text-[17px] mb-2.5">
                            Пример
                        </h3>
                        <img src={sheetExample} alt="sheet example" />
                        <h3 className="mt-10 font-bold text-[17px]">
                            Замена листа
                        </h3>
                        <p className="leading-5 mt-2.5 mb-10">
                            При выборе данного способа все старые данные
                            сбрасываются полностью и заменяются импортированными
                            данными
                        </p>
                        <img src={sheetReplacement} alt="sheet replacement" />
                        <h3 className="mt-10 font-bold text-[17px]">
                            Дополнения листа
                        </h3>
                        <p className="leading-5 mt-2.5 mb-10 max-w-[865px]">
                            При выборе данного способа старые данные не
                            поддаются изменения, добавляются только уникальные
                            новые артикулы. Дубликаты полностью игнорируются
                        </p>
                        <img src={sheetAdditions} alt="sheet additions" />
                    </div>
                </li>

                <li>
                    <h2 className="mt-[50px]">Загрузите ваш файл на сайт</h2>
                    <div className="ml-[40px] mt-[12px] text-[15px]">
                        <p className="mb-5">
                            Перетащите ваш файл в окно загрузки
                        </p>
                        <img src={moveFile} alt="move the file" />
                        <p className="mb-5">
                            Или нажмите на окно и выберите файл
                        </p>
                        <img
                            src={pressAndSelectFile}
                            alt="press and select the file"
                        />
                        <img
                            className="mt-12"
                            src={chooseFile}
                            alt="choose the file"
                        />
                        <img
                            className="mt-12"
                            src={openFile}
                            alt="open the file"
                        />
                    </div>
                </li>
            </ol>
        </div>
    );
};
