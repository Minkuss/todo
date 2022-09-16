import { FC, useEffect } from "react";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { SubmitHandler, useForm, ValidateResult } from "react-hook-form";

import * as classes from "./RegisterForm.styles";
import classNames from "classnames";

export interface IRegisterForm {
  username: string;
  password: string;
}

export interface IRegisterFormPage {
  onSubmit: (value: { username: string; password: string }) => unknown;
  match: boolean;
}

export const RegisterForm: FC<IRegisterFormPage> = (props) => {
  const { onSubmit, match }: IRegisterFormPage = {
    ...defaultProps,
    ...props,
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IRegisterForm>();

  return (
    <Card className={classes.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          // style={
          //   errors.username?.message || errors.password?.message
          //     ? { marginTop: "0%" }
          //     : { marginTop: "4%" }
          // }
          className={classes.formGroup}
          label="Write your email or nickname"
          helperText={errors.username?.message}
        >
          <input
            {...register("username", {
              required: {
                value: true,
                message: "Please enter your email or nickname",
              },
              // validate: (value) => validateUsername(value, match),
            })}
            placeholder="best@gmail.com"
            className={classNames("bp4-input .modifier", classes.input)}
          />
          {match ? <span>bebra</span> : null}
        </FormGroup>
        <FormGroup
          helperText={errors.password?.message}
          className={classes.formGroup}
          label="Create your password"
        >
          <input
            {...register("password", {
              required: { value: true, message: "Please enter your password" },
            })}
            placeholder="Super secret password"
            className={classNames("bp4-input .modifier", classes.input)}
          />
        </FormGroup>
        <Button
          className={classes.btn}
          intent="primary"
          fill
          text="Sign up"
          type="submit"
        />
      </form>
    </Card>
  );
};

function validateUsername(username: string, match: boolean): ValidateResult {
  if (match === false) {
    return undefined;
  }
  return "Account with this username is already exists";
}

const defaultProps: Required<IRegisterFormPage> = {
  onSubmit: () => {},
  match: false,
};
