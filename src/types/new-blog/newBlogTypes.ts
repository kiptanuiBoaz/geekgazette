import { IReportOptions } from 'notiflix';

export interface PostFormPros {
    postId: string | undefined;
}

export interface ICustomReportOptions extends IReportOptions {
    buttonBackground: string;
    svgColor: string;
    titleColor: string;
    backOverlayColor: string;
}

export const options: ICustomReportOptions = {
    buttonBackground: "#4d7e3e",
    svgColor: " #4d7e3e",
    titleColor: " #4d7e3e",
    backOverlayColor: " rgba(76, 76, 76, 0.82)",
    // specify other allowed properties from IReportOptions
};