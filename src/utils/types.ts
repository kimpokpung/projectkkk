export interface IResponse<T = unknown> {
  result: T;
  responseMessage: string;
  status: number;
}

export type TError = IResponse<{ errorMessage: string }>;

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUserInfo {
  grantType: "Bearer";
  accessToken: string;
  refreshToken: string;
  role: TRole;
}

export interface ISignInParams {
  email: string;
  password: string;
}

export interface ISignUpParams {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  defaultAddress: string;
}

export interface IPageList<T> {
  content: T;
  page: number;
  totalCount: number;
}

export interface IProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  productNum: string;
  price: number;
  discountRate: number;
  description: string;
  imageUrl: string;
}

export interface IProductSearchParams {
  id?: string;
  category?: string;
  productName?: string;
  brand?: string;
  content?: string;
  page?: number;
  size?: number;
}

export interface IMember {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export interface IMemberInfo {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: string;
  gender: string;
  birthDate: string;
  defaultAddress: string;
  secondAddress: string | null;
  thirdAddress: string | null;
  grade: string;
  point: number;
}

export interface IMemberSearchParams {
  name?: string;
  email?: string;
  phone?: string;
  role?: TRole;
  page?: number;
  size?: number;
}

export interface IAccount {
  id: number;
  role: TRole;
  name: string;
}

export interface ICategory {
  id: number;
  code: string;
  name: string;
  level: number;
  parent: null | number;
  children: ICategory[];
}

export interface IBrand {
  id: number;
  name: string;
  brand: string;
  category: string;
  productNum: string;
  price: number;
  discountRate: number;
  description: string;
  imageUrl: string;
  productCouponResponse: {
    id: 1;
    productNum: "20231018BR반000100";
    couponId: 1;
    issuedAt: "2024-10-18T17:06:25";
    usedAt: null;
    used: false;
  }[];
}

export type TRole = "center" | "admin" | "user";

export type INonNullable<T> = {
  [K in keyof T]: NonNullable<K>;
};

export interface Coupon {
  id: number;
  name: string;
  discountRate: number;
  startDate: string;
  endDate: string;
  assignBy: string;
}
