import { scannerUrl } from "@/config/site";

export function toScanBox() {
    window.location.href = `${scannerUrl}&type=single&step=1`;
}

export function toScanCell() {
    window.location.href = `${scannerUrl}&type=single&step=2`;
}

export function toScanProducts() {
    window.location.href = `${scannerUrl}&type=multiple&step=3`;
}
