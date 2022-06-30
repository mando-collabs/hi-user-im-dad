import type { FormMethod } from "@remix-run/react";

export interface FormComponentProps {
  action?: string;
  method?: FormMethod;
}
