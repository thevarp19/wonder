import { WeeklyCalendar } from "@purjayadi/antd-weekly-calendar";
import { Dayjs } from "dayjs";
import { FC } from "react";
import { GetSuppliesByDate } from "../../types";

interface SupplyEvent {
    startTime: Date;
    endTime: Date;
    title: string;
    backgroundColor: string;
    eventId: string;
}

function mapDatesToEvents(dates: GetSuppliesByDate[]): SupplyEvent[] {
    const result: SupplyEvent[] = [];
    dates.forEach((date) => {
        let hour = 7;
        const formattedDate = new Date(date.date);
        const year = formattedDate.getFullYear();
        const month = formattedDate.getMonth();
        const day = formattedDate.getDate();

        date.supplies.forEach((supply) => {
            result.push({
                startTime: new Date(year, month, day, hour++),
                endTime: new Date(year, month, day, hour),
                title: supply.sellerName,
                backgroundColor:
                    supply.supplyState === "Sold" ? "red" : "green",
                eventId: supply.supplyId.toString(),
            });
        });
    });
    return result;
}

const events = mapDatesToEvents(getList());

interface SuppliesCalendarProps {}

export const SuppliesCalendar: FC<SuppliesCalendarProps> = ({}) => {
    return <WeeklyCalendar events={events} weekends />;
};

function getListData(value: Dayjs) {
    const list = getList();
    return list.find((item) => item.date === value.format("YYYY-MM-DD"));
}

function getList() {
    return [
        {
            date: "2024-04-02",
            supplies: [
                {
                    supplyId: 3,
                    sellerName: "Fiona",
                    sellerId: 36,
                    supplyState: "Available",
                },
                {
                    supplyId: 4,
                    sellerName: "Diana",
                    sellerId: 200,
                    supplyState: "Sold",
                },
            ],
        },
        {
            date: "2024-04-02",
            supplies: [
                {
                    supplyId: 11,
                    sellerName: "Bob",
                    sellerId: 438,
                    supplyState: "Available",
                },
                {
                    supplyId: 12,
                    sellerName: "Diana",
                    sellerId: 435,
                    supplyState: "Sold",
                },
                {
                    supplyId: 13,
                    sellerName: "Evan",
                    sellerId: 827,
                    supplyState: "Sold",
                },
                {
                    supplyId: 14,
                    sellerName: "Hannah",
                    sellerId: 544,
                    supplyState: "Available",
                },
                {
                    supplyId: 15,
                    sellerName: "George",
                    sellerId: 844,
                    supplyState: "Available",
                },
            ],
        },
        {
            date: "2024-04-03",
            supplies: [
                {
                    supplyId: 42,
                    sellerName: "Charlie",
                    sellerId: 740,
                    supplyState: "Sold",
                },
                {
                    supplyId: 43,
                    sellerName: "Evan",
                    sellerId: 749,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-03",
            supplies: [
                {
                    supplyId: 9,
                    sellerName: "Alice",
                    sellerId: 638,
                    supplyState: "Pending",
                },
                {
                    supplyId: 10,
                    sellerName: "Alice",
                    sellerId: 515,
                    supplyState: "Sold",
                },
            ],
        },
        {
            date: "2024-04-05",
            supplies: [
                {
                    supplyId: 22,
                    sellerName: "Hannah",
                    sellerId: 830,
                    supplyState: "Sold",
                },
                {
                    supplyId: 23,
                    sellerName: "Hannah",
                    sellerId: 448,
                    supplyState: "Sold",
                },
                {
                    supplyId: 24,
                    sellerName: "Charlie",
                    sellerId: 435,
                    supplyState: "Available",
                },
                {
                    supplyId: 25,
                    sellerName: "Fiona",
                    sellerId: 294,
                    supplyState: "Available",
                },
                {
                    supplyId: 26,
                    sellerName: "Bob",
                    sellerId: 38,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-06",
            supplies: [
                {
                    supplyId: 49,
                    sellerName: "Bob",
                    sellerId: 748,
                    supplyState: "Available",
                },
                {
                    supplyId: 50,
                    sellerName: "George",
                    sellerId: 574,
                    supplyState: "Sold",
                },
                {
                    supplyId: 51,
                    sellerName: "Diana",
                    sellerId: 354,
                    supplyState: "Available",
                },
                {
                    supplyId: 52,
                    sellerName: "Bob",
                    sellerId: 277,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-07",
            supplies: [
                {
                    supplyId: 39,
                    sellerName: "Charlie",
                    sellerId: 60,
                    supplyState: "Sold",
                },
                {
                    supplyId: 40,
                    sellerName: "Diana",
                    sellerId: 563,
                    supplyState: "Sold",
                },
                {
                    supplyId: 41,
                    sellerName: "Charlie",
                    sellerId: 783,
                    supplyState: "Sold",
                },
            ],
        },
        {
            date: "2024-04-08",
            supplies: [
                {
                    supplyId: 5,
                    sellerName: "Bob",
                    sellerId: 629,
                    supplyState: "Sold",
                },
                {
                    supplyId: 6,
                    sellerName: "Charlie",
                    sellerId: 875,
                    supplyState: "Pending",
                },
                {
                    supplyId: 7,
                    sellerName: "Fiona",
                    sellerId: 774,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-10",
            supplies: [
                {
                    supplyId: 31,
                    sellerName: "Fiona",
                    sellerId: 746,
                    supplyState: "Pending",
                },
                {
                    supplyId: 32,
                    sellerName: "Alice",
                    sellerId: 491,
                    supplyState: "Sold",
                },
                {
                    supplyId: 33,
                    sellerName: "George",
                    sellerId: 975,
                    supplyState: "Sold",
                },
                {
                    supplyId: 34,
                    sellerName: "Hannah",
                    sellerId: 566,
                    supplyState: "Pending",
                },
                {
                    supplyId: 35,
                    sellerName: "George",
                    sellerId: 725,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-10",
            supplies: [
                {
                    supplyId: 54,
                    sellerName: "Alice",
                    sellerId: 525,
                    supplyState: "Available",
                },
                {
                    supplyId: 55,
                    sellerName: "Alice",
                    sellerId: 350,
                    supplyState: "Sold",
                },
                {
                    supplyId: 56,
                    sellerName: "Alice",
                    sellerId: 334,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-14",
            supplies: [
                {
                    supplyId: 37,
                    sellerName: "Charlie",
                    sellerId: 783,
                    supplyState: "Pending",
                },
                {
                    supplyId: 38,
                    sellerName: "Diana",
                    sellerId: 529,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-23",
            supplies: [
                {
                    supplyId: 16,
                    sellerName: "Fiona",
                    sellerId: 613,
                    supplyState: "Sold",
                },
            ],
        },
        {
            date: "2024-04-24",
            supplies: [
                {
                    supplyId: 27,
                    sellerName: "Alice",
                    sellerId: 306,
                    supplyState: "Pending",
                },
                {
                    supplyId: 28,
                    sellerName: "Charlie",
                    sellerId: 39,
                    supplyState: "Sold",
                },
                {
                    supplyId: 29,
                    sellerName: "Alice",
                    sellerId: 654,
                    supplyState: "Available",
                },
                {
                    supplyId: 30,
                    sellerName: "Charlie",
                    sellerId: 608,
                    supplyState: "Available",
                },
            ],
        },
        {
            date: "2024-04-24",
            supplies: [
                {
                    supplyId: 53,
                    sellerName: "George",
                    sellerId: 587,
                    supplyState: "Available",
                },
            ],
        },
        {
            date: "2024-04-24",
            supplies: [
                {
                    supplyId: 57,
                    sellerName: "Evan",
                    sellerId: 975,
                    supplyState: "Available",
                },
                {
                    supplyId: 58,
                    sellerName: "Bob",
                    sellerId: 945,
                    supplyState: "Sold",
                },
                {
                    supplyId: 59,
                    sellerName: "Hannah",
                    sellerId: 823,
                    supplyState: "Pending",
                },
                {
                    supplyId: 60,
                    sellerName: "Fiona",
                    sellerId: 526,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-25",
            supplies: [
                {
                    supplyId: 36,
                    sellerName: "Alice",
                    sellerId: 282,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-26",
            supplies: [
                {
                    supplyId: 44,
                    sellerName: "Charlie",
                    sellerId: 895,
                    supplyState: "Sold",
                },
                {
                    supplyId: 45,
                    sellerName: "Hannah",
                    sellerId: 530,
                    supplyState: "Available",
                },
                {
                    supplyId: 46,
                    sellerName: "George",
                    sellerId: 458,
                    supplyState: "Sold",
                },
                {
                    supplyId: 47,
                    sellerName: "Diana",
                    sellerId: 391,
                    supplyState: "Pending",
                },
                {
                    supplyId: 48,
                    sellerName: "George",
                    sellerId: 627,
                    supplyState: "Pending",
                },
            ],
        },
        {
            date: "2024-04-28",
            supplies: [
                {
                    supplyId: 17,
                    sellerName: "Bob",
                    sellerId: 931,
                    supplyState: "Pending",
                },
                {
                    supplyId: 18,
                    sellerName: "Bob",
                    sellerId: 994,
                    supplyState: "Sold",
                },
                {
                    supplyId: 19,
                    sellerName: "Alice",
                    sellerId: 564,
                    supplyState: "Available",
                },
                {
                    supplyId: 20,
                    sellerName: "Evan",
                    sellerId: 433,
                    supplyState: "Pending",
                },
                {
                    supplyId: 21,
                    sellerName: "Charlie",
                    sellerId: 413,
                    supplyState: "Sold",
                },
            ],
        },
        {
            date: "2024-04-29",
            supplies: [
                {
                    supplyId: 8,
                    sellerName: "Charlie",
                    sellerId: 272,
                    supplyState: "Sold",
                },
            ],
        },
        {
            date: "2024-04-29",
            supplies: [
                {
                    supplyId: 1,
                    sellerName: "Diana",
                    sellerId: 933,
                    supplyState: "Available",
                },
                {
                    supplyId: 2,
                    sellerName: "Evan",
                    sellerId: 805,
                    supplyState: "Pending",
                },
            ],
        },
    ];
}
