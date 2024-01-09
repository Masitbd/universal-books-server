export type IResultField = {
  label: string;
  value: string;
};

export type ISensitivity = {
  value: string;
  label: string;
  description: string;
  result_option: IResultField[];
};
