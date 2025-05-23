
import { mongoose } from '@typegoose/typegoose';
import { LANG } from './enums';
import { LocaleReturnFixForAny } from './interfaces/ILocale';

// export function isGeoApiResponse(data: unknown): data is LibResponse {
//   return (
//     typeof data === 'object' &&
//     (data?.results === undefined || Array.isArray(data?.results)) &&
//     (data?.query === undefined || typeof data?.query === 'object')
//   );
// }

// validate accept language header parameter
export const getValidLangFromAcceptLanguage = function (
  acceptLanguage: string | undefined | null,
  languagesArr: string[],
): string {
  let lng = '';

  if (acceptLanguage) {
    acceptLanguage = acceptLanguage.replaceAll(/\s*/g, '');
    const langsArr = acceptLanguage.split(';');
    const supportedLangs = [...languagesArr, LANG.ALL];

    let allLangs: string[] = [];
    for (const item of langsArr) {
      const new_arr = item.split(',');
      allLangs = allLangs.concat(new_arr);
    }
    allLangs = allLangs.filter((item) => supportedLangs.includes(item));

    // define the first language on the client's list
    if (isValid(allLangs)) {
      lng = allLangs[0];
    }
  }
  return lng;
};

export const isAccepLanguageValid = function (acceptLanguage: string | null | undefined): boolean {
  if (!isValid(acceptLanguage)) return false;
  if (typeof acceptLanguage != 'string') return false;
  return true;
};

export const isParameterDefined = function (param: string | null | undefined): boolean {
  // const type = typeof param;
  console.log('param', param);
  if (param == undefined || param == '') return false;
  return true;
};

export const getAllLanguages = function (): string[] {
  const languages = [LANG.PT, LANG.ES, LANG.EN];
  return languages;
};

// validate coordinates
export const isCoordinate = function (param: string): boolean {
  const _param = param;
  const regex = /^([-]?[\d]{1,3}\.{1}[\d]+)|([-]?[\d]{1,3})$/;
  const arr = regex.exec(_param);
  if (!isArray(arr)) return false;
  return true;
};

export const isLongitude = function (param: number): boolean {
  if (!isValid(param)) return false;
  const paramStr = String(param)
  if (!isCoordinate(paramStr)) return false;
  if (param < -180 || param > 180) return false;
  return true;
};

export const isLatitude = function (param: number): boolean {
  if (!isValid(param)) return false;
  const paramStr = String(param)
  if (!isCoordinate(paramStr)) return false;
  if (param < -90 || param > 90) return false;
  return true;
};

// validate model's id
export const isObjectID = function (param: string): boolean {
  if (mongoose.Types.ObjectId.isValid(param)) {
    return true;
  }
  return false;
};

// validate variable types
export const isBoolean = function (param: string | null | undefined): boolean {
  if (!isValid(param)) return false;
  if (typeof param == 'boolean') return true;
  return false;
};

export const isString = function (param: unknown): boolean {
  if (!isValid(param)) return false;
  if (typeof param == 'string') return true;
  return false;
};

export const parseBoolean = function (param: unknown): boolean | -1 {
  let _param: string

  if (isString(param)) {
    _param = param as string;
    const regex = /^true|false$/i;
    const match = regex.exec(_param);
    console.log('match', match);
    if (isArray(match)) {
      const bool: boolean = JSON.parse(_param) as LocaleReturnFixForAny
      return bool;
    }
    return -1;
  }
  return -1;
};

export const isValid = function (param: unknown): boolean {
  if (
    !param ||
    param == '' ||
    JSON.stringify(param) == '{}' ||
    JSON.stringify(param) == '[]'
  ) {
    return false;
  }
  return true;
};

export const isArray = function (param: unknown): boolean {
  if (!isValid(param)) return false;
  if (!(param instanceof Array)) return false;
  return true;
};
