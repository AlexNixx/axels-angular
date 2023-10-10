type Configure = {
    OperatingSystem: string;
    NumbersSIM: string;
    ScreenType: string;
    ScreenDiagonal: string;
    ScreenResolution: string;
};

export type Product = {
    id: number | string;
    title: string;
    price: number;
    image: string;
    configure: Configure;
};
